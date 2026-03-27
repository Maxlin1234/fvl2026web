<!-- eslint-disable max-len -->
<!-- eslint-disable require-jsdoc -->
<!-- eslint-disable max-len -->
<script type="module" setup>
import {ref, onMounted} from 'vue';
import {Scene} from 'three';
import * as THREE from 'three';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import vertexShader from '../shaders/vertex.glsl';
import fragmentShader from '../shaders/fragment.glsl';
import {Timer} from 'three/examples/jsm/misc/Timer';
// import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass';
// eslint-disable-next-line max-len
// import {EffectComposer} from'three/examples/jsm/postprocessing/EffectComposer'


gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(gsap);


const target = ref();
// Scene
const scene = new Scene();


// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = 5;
// camera.position.set(4, 3, 3);
camera.position.set(5, 3, 1);
camera.lookAt(new THREE.Vector3(0, 0, 0));


// Post-processing
// const renderScene = new RenderPass(scene,camera);
// const composer = new EffectComposer(renderer);
// co

// GSAP for DOME-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// GSAP CAMERA END


// Renderer
const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setClearColor(0x00FFFFFF);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);


// Control
// const controls = new OrbitControls(camera, renderer.domElement);
// 阻尼
// controls.enableDamping = true;

// 右鍵平移
// controls.enablePan =false;

// controls.enabled = false;

// // controls.DragControls=f;
// //禁止縮放
// controls.enableZoom =false;


// //最小距離
// controls.minDistance = 1;
// //5

// //最大距離
// controls.maxDistance = 100;
// //20
// controls.minPolarAngle = 0.5;
// controls.maxPolarAngle = 1.5;
// controls.autoRotate =false;
// controls.target = new THREE.Vector3(0, 1, 0);
// controls.update();


// Scroll


// Sphere-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// var sgeometry = new THREE.SphereGeometry(10,32,32);
// var smeterial = new THREE.ShaderMaterial({
//    extensions:{
//     derivatives:"#extension GL_OES_standard_derivatives : enable"
//    },
//    side:THREE.DoubleSide,
//    unifroms:{
//     time:{value:0},
//     resolution:{value: new THREE.Vector4()},
//    },
//    vertextShader:vertex,
//    fragmentShader:fragment
// });


// sphere = new THREE.Mesh(sgeometry,smeterial);
// scene.add(sphere);


// GLTF Loader END------------------------------------------------------------------------------------------------------------------------

const geometry = new THREE.IcosahedronGeometry(3, 200);
const material = new THREE.ShaderMaterial( {
  extensions: {
    derivatives: '#extension GL_OES_standard_dirviatives:enable',
  },
  side: THREE.DoubleSide,
  uniforms: {
    time: {value: 0},
    adepth: {value: 20.0},
    uHoverState: {value: 0.0},
    resolution: {value: new THREE.Vector4()},
  },
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
} );
material.uniforms.adepth = {value: 2.0};
material.uniforms.uTime = {value: 0};
// material.uniforms.uHover = {value:0}
material.uniforms.uRadius = {value: 0.8};
const ico = new THREE.Mesh( geometry, material );
// ico.position.set(0,2,0)
scene.add( ico );


const geometry2 = new THREE.IcosahedronGeometry(3, 100);
const material2 = new THREE.ShaderMaterial( {
  extensions: {
    derivatives: '#extension GL_OES_standard_dirviatives:enable',
  },
  side: THREE.DoubleSide,
  uniforms: {
    time: {value: 0},
    adepth: {value: 20.0},
    uHoverState: {value: 0.0},
    resolution: {value: new THREE.Vector4()},
  },
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
} );
material2.uniforms.adepth = {value: 2.0};
material2.uniforms.uTime = {value: 0};
// material.uniforms.uHover = {value:0}
material2.uniforms.uRadius = {value: 0.8};
const ico2 = new THREE.Mesh( geometry2, material2 );
ico2.scale.set(1, 0.5, 0.5);
ico2.position.set(-6, 2, 8);
scene.add( ico2 );


// raycaster
const raycaster = new THREE.Raycaster();
// const pointer = new THREE.Vector2();

const onMousemove = (event) =>{
  const coords = new THREE.Vector2(
      (event.clientX / renderer.domElement.clientWidth)*2 -1-
                (event.clientY / renderer.domElement.clientHeight)*2 + 1,
  );

  raycaster.setFromCamera(coords, camera);

  const intersections = raycaster.intersectObjects(scene.children, true);
  for (let i=0; i<intersections.length; i++) {
    // intersections[i].object.scale.set(2.2,2)
  }

  if (intersections.length > 0) {
    // const intersectedObject = intersections[0].object;
    console.log(intersections);
    gsap.to(material.uniforms.uHoverState, {
      value: 1.0,
      duration: 1,
      ease: 'expo.inOut',
    });
    // const selectedObject = intersections[0].object;
  } else {
    gsap.to(material.uniforms.uHoverState, {
      value: 0.0,
      duration: 1,
      ease: 'expo.inOut',
    });
  }
};
window.addEventListener('mousemove', onMousemove);


// Time

const timer = new Timer();
//  useTick(({ timestamp, timeDiff }) => {
//     const time = timestamp / 10000
//     material.userData.shader.uniforms.uTime.value = time
//   })


// //DARCO Loader----------------------------------------------------------------------------------------------------------------


// const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
// groundGeometry.rotateX(-Math.PI / 2);
// const groundMaterial = new THREE.MeshPhysicalMaterial({
//   // color: 0xff2929,
//   roughness:0,
//   transparent: true,
//   opacity: 0.2,
//   roughness: 0.5,
//   transmission: 1,
//   thickness: 1,
// });
// const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
// groundMesh.castShadow = false;
// groundMesh.receiveShadow = true;
// scene.add(groundMesh);


// const spotLight = new THREE.SpotLight(0xffffff,3000, 300, 0.3, 1);
// spotLight.position.set(0,20, 0);
// spotLight.castShadow = true;
// spotLight.shadow.bias = -0.0001;
// scene.add(spotLight);

// var ambientLight = new THREE.AmbientLight( '#ffffff' ); //建立環境光
// scene.add( ambientLight ); //把環境光添加到場景


const light = new THREE.DirectionalLight(0xfff0dd, 1);
light.position.set(0, 2, 0);
scene.add(light);

// const axesHelper = new THREE.AxesHelper(500)
// scene.add(axesHelper)


camera.position.z = 5;


function animate(timestamp) {
  requestAnimationFrame(animate);
  timer.update( timestamp );
  const time = timestamp/10000;
  material.uniforms.uTime.value = time;

  material2.uniforms.uTime.value = time;
  // useTick(({timestamp,timeDiff})=>{
  //             const time = timestamp/1000
  //             material.uniforms.uTime.value = time
  //            })


  // controls.update();


  renderer.render(scene, camera);
}

onMounted(() => {
  target.value.appendChild(renderer.domElement);
  animate();
});


</script>

<template>

<body style="background-color: transparent !important;">
    <!-- <div class="gsap-container"
     ref="target" style="position: relative;width:100vw;height:100vh;"> -->
      <div class="gsap-container"
      ref="target"
      style="width:100vw;
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


</style>
