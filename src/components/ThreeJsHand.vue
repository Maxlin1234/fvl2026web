<script type="module" setup>
import { ref, onBeforeUnmount, onMounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import vertexShader from '../shader/vertex.glsl';
import fragmentShader from '../shader/fragment.glsl';

// import {gsap} from 'gsap';

// import { _numWithUnitExp } from 'gsap/gsap-core';




const target = ref(null);
const scene = new THREE.Scene();

// scene.environment.fog = new THREE.Fog( 0xcccccc,20,1000);
// scene.fog = new THREE.Fog(0xc0f0ff,0.0015);

/**
 * 背景貼圖：Canvas 高斯模糊 + 淡色疊加，模擬霧磨砂玻璃（只處理 panorama 貼圖，不模糊前景模型）
 */
function textureWithFrostedGlassEffect(texture, options = {}) {
  const blurPx = options.blurPx ?? 20;
  const frostAlpha = options.frostAlpha ?? 0.12;
  const maxDim = options.maxDim ?? 2400;

  const img = texture.image;
  if (!img || !img.complete || !img.width) return texture;

  let w = img.naturalWidth || img.width;
  let h = img.naturalHeight || img.height;
  const scale = Math.min(1, maxDim / Math.max(w, h));
  w = Math.round(w * scale);
  h = Math.round(h * scale);

  const pad = Math.ceil(blurPx * 1.6);
  const cw = w + pad * 2;
  const ch = h + pad * 2;

  const canvas = document.createElement('canvas');
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext('2d', { alpha: false });
  ctx.fillStyle = '#060d14';
  ctx.fillRect(0, 0, cw, ch);
  ctx.filter = `blur(${blurPx}px) saturate(1.08)`;
  ctx.drawImage(img, pad, pad, w, h);
  ctx.filter = 'none';
  ctx.fillStyle = `rgba(232, 242, 252, ${frostAlpha})`;
  ctx.fillRect(0, 0, cw, ch);

  const out = new THREE.CanvasTexture(canvas);
  out.mapping = THREE.EquirectangularReflectionMapping;
  out.colorSpace = THREE.SRGBColorSpace;
  out.minFilter = THREE.LinearMipmapLinearFilter;
  out.magFilter = THREE.LinearFilter;
  out.generateMipmaps = true;
  return out;
}

// Background：等距長條圖（取代 space.hdr）
const textureLoader = new THREE.TextureLoader();
textureLoader.load(
  '/test/model/space.jpg',
  (map) => {
    map.mapping = THREE.EquirectangularReflectionMapping;
    map.colorSpace = THREE.SRGBColorSpace;

    const bgTex = textureWithFrostedGlassEffect(map, {
      blurPx: 0,
      frostAlpha: 0.001,
      maxDim: 2400,
    });
    if (bgTex !== map) map.dispose();

    scene.background = bgTex;
    scene.environment = bgTex;

    const blueOverlay = new THREE.Mesh(
      new THREE.SphereGeometry(500, 32, 16),
      new THREE.MeshBasicMaterial({
        color: 0x0a50ff,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide,
        depthWrite: false,
      }),
    );
    blueOverlay.renderOrder = -999;
    scene.add(blueOverlay);
  },
  undefined,
  (err) => {
    console.error('[ThreeJsHand] Failed to load space.jpg:', err);
  },
);
// Camera
// eslint-disable-next-line max-len
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
camera.position.set(1, 0, -20);
camera.lookAt(new THREE.Vector3(0, 0, 0));



// eslint-disable-next-line max-len
// GSAP for DOME-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// GSAP text
// GSAP text end



// GSAP CAMERA END


// Renderer (safe init: avoid crashing when WebGL context fails)
let renderer = null;
try {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
} catch (err) {
  console.error('[ThreeJsHand] Failed to create WebGLRenderer:', err);
}

/** 煙霧層數；0 = 關閉（較省 draw call）。若要輕量恢復可改 10～12（原 36）。 */
const HAZE_PLANE_COUNT = 0;

/** Hero 區可見時才畫 WebGL，避免捲動到下方時仍每幀渲染與捲動搶主執行緒 */
let heroWebglVisible = true;
let heroIntersectionObserver = null;

let hazeGroup = null;
let hazeMats = [];

function createHaze() {
  const count = HAZE_PLANE_COUNT;
  if (!count || count <= 0) {
    hazeMats = [];
    return null;
  }

  // 讓單片煙霧「約半個視窗大」
  const fov = THREE.MathUtils.degToRad(camera.fov);
  const aspect = getAspect();
  const distance = 10.0; // 放在鏡頭前方的距離（只用來算尺寸）
  const viewHeight = 2.0 * distance * Math.tan(fov / 2.0);
  const viewWidth = viewHeight * aspect;
  const planeW = viewWidth * 0.55;
  const planeH = viewHeight * 0.55;

  const hazeVertex = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const hazeFragment = `
    precision mediump float;
    uniform float uTime;
    uniform vec3 uColor;
    varying vec2 vUv;

    float hash(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.5;
      for (int i = 0; i < 5; i++) {
        v += a * noise(p);
        p *= 2.0;
        a *= 0.5;
      }
      return v;
    }

    void main() {
      vec2 uv = vUv;
      vec2 p = uv * 2.2;
      float t = uTime * 0.08;
      p += vec2(t, -t * 0.55);

      float n = fbm(p + fbm(p * 1.6 + t));

      // 柔邊：看起來像瀰漫，不是一張片
      float r = length(uv - 0.5);
      float radial = smoothstep(0.65, 0.15, r);

      float alpha = smoothstep(0.40, 0.85, n) * radial;
      alpha *= 0.16; // 不要太濃

      gl_FragColor = vec4(uColor, alpha);
    }
  `;

  const group = new THREE.Group();
  group.position.set(0, 0, 0);

  const geo = new THREE.PlaneGeometry(planeW, planeH, 1, 1);
  const color = new THREE.Color(0.78, 0.88, 1.0); // 淡藍白霧

  hazeMats = [];
  for (let i = 0; i < count; i++) {
    const mat = new THREE.ShaderMaterial({
      vertexShader: hazeVertex,
      fragmentShader: hazeFragment,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.NormalBlending, // 不發光
      uniforms: {
        uTime: {value: 0},
        uColor: {value: color},
      },
      side: THREE.DoubleSide,
    });
    hazeMats.push(mat);

    const plane = new THREE.Mesh(geo, mat);
    // 分佈在球/手周圍的前後景，堆疊出「瀰漫」
    plane.position.set(
      (Math.random() - 0.5) * 10.0,
      (Math.random() - 0.5) * 5.0,
      (Math.random() - 0.5) * 10.0,
    );
    plane.rotation.z = Math.random() * Math.PI;
    plane.renderOrder = 50;
    group.add(plane);
  }

  return group;
}


// Box
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// cube.position.set(0,1,0)
// scene.add(cube);;


// Control
let controls = null;
if (renderer) {
  controls = new OrbitControls(camera, renderer.domElement);
  // 阻尼
  controls.enableDamping = true;

  // 右鍵平移
  controls.enablePan = false;
  controls.enabled = true;

  // controls.DragControls=f;
  // 禁止縮放 (若也想可縮放，改成 true)
  controls.enableZoom = false;

  // 最小距離
  controls.minDistance = 1;
  // 最大距離
  controls.maxDistance = 100;
  controls.minPolarAngle = 0.5;
  controls.maxPolarAngle = 1.5;
  controls.autoRotate = false;
  controls.target = new THREE.Vector3(0, 1, 0);
  controls.update();
}


// Scroll


// eslint-disable-next-line max-len
// GLTF Loader-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const loader = new GLTFLoader();

// 用來做「BALL 緩慢自動來回旋轉」
let ballMesh = null;

loader.load('/test/model/GLTF.glb', (gltfScene) => {
  gltfScene.scene.position.set(0,-1,0,);
  const ballMaterialTemplate = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: {value: 0},
      uScale: {value: 512}, // 控制噪波「解析度/縮放」，可自行調
      uSteps: {value: 12},  // 1~25
      uColorBias: {value: new THREE.Vector3(0, 0, 0)},
      uAces: {value: 0},
      uFrostStrength: { value: 0.6 }, // 0=清透, 1=霧玻璃（霧化但不透明）
      uFrostRadius: { value: 0.5 }, // 霧化半徑（像素概念），2~6 較自然
    },
    side: THREE.DoubleSide,
    transparent: false,
    depthWrite: true,
  });

  const textureLoader = new THREE.TextureLoader();
  const polyTex = textureLoader.load('/textures/poly.png');
  polyTex.colorSpace = THREE.SRGBColorSpace;
  const maxAnisotropy = renderer?.capabilities?.getMaxAnisotropy?.() || 1;
  polyTex.anisotropy = Math.min(maxAnisotropy, 8);

  const handMaterial = new THREE.MeshStandardMaterial({
    map: polyTex,
    color: new THREE.Color('#ffffff'),
    roughness: 0.9,
    metalness: 0.0,
    envMapIntensity: 0.08,
  });

  console.log('loading model');
  // console.log(THREE.REVISION);
  const mesh = gltfScene.scene;
  mesh.scale.set(0.6,0.6,0.6);

  /**
   * gltfpack 常把「BALL」收成只有名字的父節點，實際 Mesh 在無名子節點上。
   * 需沿 parent 鏈檢查，並用原始材質名稱（如 Ball）當備援。
   */
  function meshIsBallPart(obj) {
    let p = obj;
    while (p) {
      const nm = (p.name || '').toUpperCase();
      if (nm === 'BALL' || nm.includes('BALL')) return true;
      p = p.parent;
    }
    const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
    for (const m of mats) {
      if (m && m.name && m.name.toUpperCase().includes('BALL')) return true;
    }
    return false;
  }

  // 只對 BALL 子樹（或材質名含 Ball）套用 shader，其餘為手部材質
  mesh.traverse((child) => {
    if (child.isMesh) {
      if (meshIsBallPart(child)) {
        child.material = ballMaterialTemplate.clone();
        if (!ballMesh) ballMesh = child;
      } else {
        child.material = handMaterial;
      }

      // 保險：若球或其他部件仍是 PBR 材質，統一降低反射
      // (某些 glb 可能有多個球子網格或命名不同，避免漏套而過亮/過反光)
      const mat = child.material;
      if (mat && (mat.isMeshStandardMaterial || mat.isMeshPhysicalMaterial)) {
        mat.metalness = 0.0;
        mat.roughness = Math.max(mat.roughness ?? 0.0, 0.85);
        if ('envMapIntensity' in mat) mat.envMapIntensity = Math.min(mat.envMapIntensity ?? 1.0, 0.08);
      }

      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  // Center model and frame it with the camera
  const box = new THREE.Box3().setFromObject(mesh);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  mesh.position.sub(center);

  const maxDim = Math.max(size.x, size.y, size.z);
  const fov = THREE.MathUtils.degToRad(camera.fov);
  const fitDistance = (maxDim / 2) / Math.tan(fov / 2);
  const distance = fitDistance * 1.4; // padding

  camera.near = Math.max(0.01, distance / 100);
  camera.far = distance * 100;
  camera.updateProjectionMatrix();
  // camera.position.set(distance, distance * 0.6, distance);
  camera.lookAt(0, 0, 0);

  if (controls) {
    controls.target.set(0, 0, 0);
    controls.update();
  }

  scene.add(mesh);
}, function(xhr) {
  console.log((xhr.loaded/xhr.total*100)+'% loaded');
}, function(error) {
  console.log('An error occurred', error);
});


// 上方主光，打亮整體
// const spotLight = new THREE.SpotLight(0xffffff, 1200, 1200, Math.PI / 3, 0.5);
// spotLight.position.set(0, 10, 0);
// spotLight.castShadow = true;
// spotLight.shadow.bias = -0.0001;
// spotLight.target.position.set(0, 0, 0);
// scene.add(spotLight);
// scene.add(spotLight.target);

// 前方補光，專門打亮前方兩隻手
const frontLight = new THREE.SpotLight(0xffffff, 4500, 900, Math.PI / 4, 0.7);
frontLight.position.set(0, 4, 10);
frontLight.castShadow = false;
frontLight.target.position.set(0, 0, 0);
scene.add(frontLight);
scene.add(frontLight.target);

// 環境光，讓陰影不會太黑
scene.add(new THREE.AmbientLight(0xffffff, 0.2));

// const axesHelper = new THREE.AxesHelper(500)
// scene.add(axesHelper)


// let delta = 0;

// Camera is framed after model load

const clock = new THREE.Clock();

const amplitude = 0.5; // The height of the movement
const frequency = 0.5; // The speed of the movement

// 球的「緩慢來回旋轉」設定
const ballRotRange = 0.90; // 旋轉幅度（弧度），0.35 約 20 度
const ballRotSpeed = 0.4; // 來回頻率（越小越慢）
// eslint-disable-next-line require-jsdoc
function animate() {
  requestAnimationFrame(animate);
  if (!heroWebglVisible || !renderer) return;

  const elapsedTime = clock.getElapsedTime();
  if (scene) {
    scene.position.y = Math.sin(elapsedTime * frequency) * amplitude;
    if (ballMesh) {
      ballMesh.rotation.y = Math.sin(elapsedTime * ballRotSpeed) * ballRotRange;
    }
    const t = performance.now() * 0.001;
    scene.traverse((obj) => {
      if (obj.isMesh && obj.material && obj.material.uniforms && obj.material.uniforms.uTime) {
        obj.material.uniforms.uTime.value = t;
      }
    });
  }
  if (hazeGroup) {
    const t = performance.now() * 0.001;
    for (const mat of hazeMats) {
      if (mat && mat.uniforms && mat.uniforms.uTime) mat.uniforms.uTime.value = t;
    }
    hazeGroup.children.forEach((p) => p.lookAt(camera.position));
  }
  if (controls) controls.update();
  renderer.render(scene, camera);
}

let resizeObserver = null;
function getAspect() {
  const el = target.value;
  if (!el) return 1;
  const w = el.clientWidth || 1;
  const h = el.clientHeight || 1;
  return w / h;
}

function resize() {
  const el = target.value;
  if (!el || !renderer) return;
  const w = el.clientWidth || 1;
  const h = el.clientHeight || 1;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

onMounted(() => {
  if (!target.value) return;
  if (!renderer) {
    console.warn('[ThreeJsHand] WebGL unavailable, skip 3D rendering.');
    return;
  }
  target.value.appendChild(renderer.domElement);
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.pointerEvents = 'none';

  hazeGroup = createHaze();
  if (hazeGroup) scene.add(hazeGroup);

  resize();
  resizeObserver = new ResizeObserver(() => resize());
  resizeObserver.observe(target.value);

  heroIntersectionObserver = new IntersectionObserver(
    (entries) => {
      const e = entries[0];
      heroWebglVisible = !!(e && e.isIntersecting);
    },
    { threshold: 0, rootMargin: '48px 0px 64px 0px' },
  );
  heroIntersectionObserver.observe(target.value);

  animate();
});

onBeforeUnmount(() => {
  if (heroIntersectionObserver && target.value) {
    heroIntersectionObserver.unobserve(target.value);
  }
  heroIntersectionObserver = null;
  if (resizeObserver && target.value) resizeObserver.unobserve(target.value);
  resizeObserver = null;
  if (controls) controls.dispose();
  if (renderer) renderer.dispose();
});


</script>

<template>
  <div ref="target" class="threejs-hand"></div>
</template>


<style>
.threejs-hand {
  position: relative;
  width: 100%;
  height: 100%;
}

</style>
