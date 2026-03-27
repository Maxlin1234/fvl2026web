<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable require-jsdoc -->
<!-- eslint-disable max-len -->
<!-- eslint-disable vue/multi-word-component-names -->
<script type="module" setup>
// eslint-disable-next-line object-curly-spacing
import { ref, onMounted } from 'vue';
import {Scene} from 'three';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {ImprovedNoise} from 'improved-noise/index';
// import  {particlesJS} from "particles.js";
// import{particleCursor} from 'https:/build/threejs-toys.module.cdn.min.js';
// import { _numWithUnitExp } from 'gsap/gsap-core';


gsap.registerPlugin(ScrollTrigger);


const target = ref();
// Scene
const scene = new Scene();


// Camera
// eslint-disable-next-line max-len
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = 5;
camera.position.set(10, 1, 10);
camera.lookAt(new THREE.Vector3(0, 0, 0));


// GSAP for DOME-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x0000);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);


// Box
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// cube.position.set(0,1,0)
// scene.add(cube);;


// Control
const controls = new OrbitControls(camera, renderer.domElement);
// 阻尼
controls.enableDamping = false;

// 右鍵平移
controls.enablePan =true;

controls.enabled =false;

// controls.DragControls=f;
// 禁止縮放
controls.enableZoom = true;


// 最小距離
controls.minDistance = 1;
// 5

// 最大距離
controls.maxDistance = 100;
// 20
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate =false;
controls.target = new THREE.Vector3(0, 1, 0);
controls.update();


// Scroll


// GLTF Loader-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// GLTF Loader END------------------------------------------------------------------------------------------------------------------------


// //DARCO Loader----------------------------------------------------------------------------------------------------------------


// Sphere
// const SphereGeometry  =new THREE.SphereGeometry(1,20,20);
// const SphereMaterial = new THREE.PointsMaterial({
//   size:0.02,
//   sizeAttenution:true
// })
// const particles = new THREE.Points(SphereGeometry,SphereMaterial)
// particles.position.set(0,0,0);
// scene.add(particles)


// Particles

// const particlesGeometry = new THREE.SphereGeometry(1000,100,50);
// const particlesMaterial = new THREE.PointsMaterial({
//   size:2.0,
//   transparency:true,
//   opacity:0.7
// })
// const particles = new THREE.Points(particlesGeometry,particlesMaterial)
// scene.add(particles)

// ////////////////////////////////////////////
// const particleCount = 1000;
// const geometry = new THREE.BufferGeometry();
// const vertices = [];

// for (let i = 0; i < particleCount; i++) {
//     const x = Math.random() * 10 - 5;
//     const y = Math.random() * 10 - 5;
//     const z = Math.random() * 10 - 5;

//     vertices.push(x, y, z);
// }

// geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

// const material = new THREE.PointsMaterial({
//     color: 0xffffff,
//     size: 0.05,
//     transparent: true
// });

// const particles = new THREE.Points(geometry, material);
// scene.add(particles);

// ////////////////////////////////////////////


// const particlesGeometry = new THREE.BufferGeometry();
// const count = 5000;
// const positions = new Float32Array(count*3)
// const colors = new Float32Array(count*3)

// for(let i=0;i<count*3;i++){
//   positions[i]=(Math.random() - 0.5)*10
//   colors[i] = Math.random()
// }
// particlesGeometry.setAttribute('position',new THREE.BufferAttribute(positions))
// particlesGeometry.setAttribute('color',new THREE.BufferAttribute(colors))
// const particlesMaterial = new THREE.PointsMaterial({
//   size:0.05,
//   sizeAttenuation:true,
//   transparent:true,
//   alphaMap:particleTexture,
//   depthWrite:false,
//   blending:THREE.AdditiveBlending,
//   vertexColors:true

// })

// const sphere = new THREE.BufferGeometry();
// const particles = new THREE.Points(particlesGeometry,particlesMaterial)

// scene.add(particles)

// ---------------------------------------------------------------------
const gridSize =100;
const gap = 0.06;
// eslint-disable-next-line no-unused-vars
const cols = [];
const coords =[];
const colors = [];
const points = [];
const Noise = new ImprovedNoise();
let x;
let y;
let z=0;
let r;
let g;
let b;
let point ={
  position: {},
  rate: 0.0,
};


const offset = {x: -0.0, y: -0.0};
let ns;
for (let i = -gridSize; i<gridSize; i += 1) {
  for (let j = -gridSize; j<gridSize; j += 1) {
    x = offset.x +i * gap;
    y = offset.y +j * gap;
    ns = Noise.noise(x * 1, y * 1, 0);
    // z=0;
    z = ns;
    r = Math.random();
    g=Math.random();
    b =Math.random();
    point={
      position: {
        x,
        y,
        z,
      },
      color: new THREE.Color(r, g, b),
    };
    points.push(point);
    coords.push(x, y, z);
    colors.push(r, g, b);
  }
}


// points
const geo = new THREE.BufferGeometry();
const mat = new THREE.PointsMaterial({size: 0.08, vertexColors: true});
geo.setAttribute('position', new THREE.Float32BufferAttribute(coords, 3));
geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
const pointsObj = new THREE.Points(geo, mat);

// const simplePos = new THREE.Vector3(pos.x,pos.y,0);
// const offsetZ = Math.random() *3;
// const rate = Math.random()*0.05+0.02;
// function updateray(t){
//    simplePos.set(obj.postion.x,obj.postion.y,0);
//    const distance = simplePos.distanceTo(mousePos);
//    if(distance<5.0){
//     goalZpos = (5.0 - distance) * 2 +offsetZ;
//    }else{
//     goalZpos = 0;
//    }
//    obj.position.z -=(obj.position.z - goalZpos)*rate;
// }
// function createComposition(){
//   const group = new THREE.Group();
//   return group;
// }
// const boxes = createComposition();
// scene.add(boxes);


// /////////////////////////////////////////////
// const pointer = new THREE.Vector2();
// const raycaster = new THREE.Raycaster();
// window.addEventListener('mousemove',onMouseMove);

// const onMouseMove = (event)=>{
//   pointer.x =(event.clientX / window.innerWidth) * 2 -1;
//   pointer.y =-(event.clientY/window.innerHeight) * 2 +1;

//   raycaster.setFromCamera(pointer, scene.camera);
//   const intersects = raycaster.intersectObject(scene.children);

//   for(let a=0;a<intersects.length;a++){
//     console.log(intersects)

//   }

// }


// eslint-disable-next-line require-jsdoc
function updatePoints(t) {
  const coords = [];
  const cols = [];
  let ns;
  const nScale = 0.8;
  const zPosScale = 1.8;
  const lowColor = new THREE.Color(0.0, 0.2, 0.1);
  const highColor = new THREE.Color(1, 1.5, 1.5);
  points.forEach((p, i) => {
    ns = Noise.noise(p.position.x * nScale, p.position.y * nScale, t);
    p.position.z = ns * zPosScale;
    p.color.lerpColors(lowColor, highColor, ns * 1.5);
    const {r, g, b} = p.color;
    cols.push(r, g, b);
    const {x, y, z} = p.position;
    coords.push(x, y, z);
  });
  geo.setAttribute('position', new THREE.Float32BufferAttribute(coords, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
}
scene.add(pointsObj);

const timeMult = 0.0005;


scene.add(pointsObj);

// Ground

// const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
// groundGeometry.rotateX(-Math.PI / 2);
// const groundMaterial = new THREE.MeshStandardMaterial({
//   color: 0xffffff,
//   side: THREE.DoubleSide
// });
// const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
// groundMesh.castShadow = false;
// groundMesh.receiveShadow = true;
// scene.add(groundMesh);

// const spotLight = new THREE.SpotLight(0xffffff,100, 300, 0.2, 1);
// spotLight.position.set(0,20, 0);
// spotLight.castShadow = true;
// spotLight.shadow.bias = -0.0001;
// scene.add(spotLight);


const sunlight = new THREE.DirectionalLight(0xffffff);
sunlight.position.y = 2;
scene.add(sunlight);

const axesHelper = new THREE.AxesHelper(500);
scene.add(axesHelper);


camera.position.z = 2;
camera.position.y = 0;
camera.position.x = 2;


function animate(timeStep) {
  requestAnimationFrame(animate);
  updatePoints(timeStep * timeMult);
  renderer.render(scene, camera);
}

onMounted(() => {
  target.value.appendChild(renderer.domElement);
  animate();
});


</script>

<template>

<body>
    <!-- <div class="gsap-container"
     ref="target" style="position: relative;width:100vw;height:100vh;"> -->
      <div class="gsap-container"
      ref="target"
      style="position:relative;
      width:100vw;
      height:100vh;
      z-index: 0;
      display: flex;">
            </div>
</body>


</template>


<style>

/* pin spacer test 未測試*/
.pin-spacer{
  margin-bottom: 0 !important;
}

.h1 {
  color:white;
  font-size: 4em;
  margin: 0px;
  font-weight: 100;
}
#heading{
  margin-top: 5rem;
  opacity: 0;
  position:absolute;
  padding:32px;
  display: flex;
  flex-wrap: nowrap;
  flex-direction:column;
  pointer-events: none;
  align-items: center;
  top: 0;
}


.card{
  width: 300px;
  height:auto;
  pointer-events: fill;
  /* margin-top: 2em; */
}
.gsap-container{
  width: 100%;
  height: 100%;
  margin-bottom: 2em;
}
.change{
  border-radius: 20px;
  cursor: pointer;
   text-transform: uppercase;
   background-color:white;
   border: 0;
   color:black;
   padding: 0.5rem 1rem;
   margin-top: 2em;
}
.change:hover{
  background-color: black;
  color:white;
}
.shadow{
  margin-top: -45px;
}


@media only screen and (min-width:1024px) {
#heading{
    margin-left:10%;
  }
}

#particles-js{
  width: 100%;
  height: 100%;
  background: #111111;
}


</style>
