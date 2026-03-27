<script type="module" setup>
import {ref, onMounted} from 'vue';
import {Scene} from 'three';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
// import { _numWithUnitExp } from 'gsap/gsap-core';


gsap.registerPlugin(ScrollTrigger);


const target = ref();
// Scene
const scene = new Scene();


// Camera
// eslint-disable-next-line max-len
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = 5;
camera.position.set(3, 2, 3);
camera.lookAt(new THREE.Vector3(0, 0, 0));


// eslint-disable-next-line max-len
// GSAP for DOME-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// GSAP text
// GSAP text end

const time = gsap.timeline();
// GSAP CAMERA
time.to(camera.position, {
  x: -4,
  y: 2,
  z: 1,
  duration: 2,
  onUpdate: function() {
    camera.lookAt(new THREE.Vector3(0, 0, 0));
  },
});
time.to(camera.position, {
  x: 5,
  y: 2,
  z: 0,
  duration: 3,
  onUpdate: function() {
    camera.lookAt(new THREE.Vector3(0, 0, 0));
  },
});


const tl = gsap.timeline();


tl.to(camera.position, {
  x: -4,
  y: 2,
  z: 1,
  duration: 2,
  scrollTrigger: {
    trigger: '.gsap-container',
    start: '30% 70%',
    end: '30% 50%',
    toggleActions: 'play pause resume reverse',
    //   //toggle可用：play pause resume reverse restart reset complete none
    scrub: 4,
    //   markers:{
    //   startColor:"yellow",
    //  endColor:"orange"
    //   }
  },
  onUpdate: function() {
    camera.lookAt(0, 0, 0);
  },
});

gsap.to(camera.position, {
  x: -1,
  y: 5,
  z: 0,
  duration: 1,
  scrollTrigger: {
    trigger: '.gsap-container',
    start: '+=1200',
    end: '+=1250',
    toggleActions: 'play pause resume reverse',
    //   //toggle可用：play pause resume reverse restart reset complete none
    scrub: 4,
    delay: 5,
    //  markers:{
    //   startColor:"blue",
    //   endColor:"white"
    //  }
  },
  onUpdate: function() {
    camera.lookAt(0, 0, 0);
  },
});

// GSAP CAMERA END


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
controls.enableDamping = true;

// 右鍵平移
controls.enablePan =false;

controls.enabled = false;

// controls.DragControls=f;
// 禁止縮放
controls.enableZoom = false;


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


// eslint-disable-next-line max-len
// GLTF Loader-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const loader = new GLTFLoader().setPath('test/model/');


loader.load('domeg-ktx.glb', (glb) => {
  console.log('loading model');
  console.log(THREE.REVISION);
  const mesh = glb.scene;
  mesh.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  mesh.position.set(1, 0.5, 0);
  mesh.scale.set(3, 3, 3);
  scene.add(mesh);
}, function(xhr) {
  console.log((xhr.loaded/xhr.total*100)+'% loaded');
}, function(error) {
  console.log('An error occurred');
});

// eslint-disable-next-line max-len
// GLTF Loader END------------------------------------------------------------------------------------------------------------------------


// eslint-disable-next-line max-len
// //DARCO Loader----------------------------------------------------------------------------------------------------------------


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

const spotLight = new THREE.SpotLight(0xffffff, 5000, 300, 0.2, 1);
spotLight.position.set(0, 20, 0);
spotLight.castShadow = true;
spotLight.shadow.bias = -0.0001;
scene.add(spotLight);


// const axesHelper = new THREE.AxesHelper(500)
// scene.add(axesHelper)


camera.position.z = 5;


// eslint-disable-next-line require-jsdoc
function animate() {
  requestAnimationFrame(animate);
  controls.update();
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
   ref="target"
   style="position:relative;
   width:100vw;height:100vh;"> -->
      <div class="gsap-container"
       ref="target"
       style="position:relative;
       width:100vw;
       height:100vh;
       z-index:0;
       display: flex;">
        <div id="heading" style="z-index: 1;">
          <div class="dome_title">
            <div class="dome">
              <h1
              style="color: rgb(215, 215, 215);
              font-size: 4em;
              margin: 0px;
              font-weight:800;"></h1>
            </div>
            <div class="shadow">
              <h1
              style="color: transparent;
              font-size: 4em;
              margin: 0px;
              font-weight:800;
              transform: scale(1, -1);
              background: linear-gradient(to top, #000000, #d76d77, #ffaf7b);
              background-clip: text;margin-top: 1.5rem;"></h1>
            </div>
            
          </div>
             <!-- rgba(255,255,255,0.22) -->
            <div class="card"
              style="background: rgba(0, 0, 0, 0.7);
              border-radius:16px;
              box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
              backdrop-filter: blur(4.2px);
              -webkit-backdrop-filter: blur(4.2px);
              border: 1px solid rgba(255, 255, 255, 0.3);">
              <div class="card-words" style="padding: 15px;color: white;">
                <section id="my-text" style="font-size: 1em;">
                  <p></p>
                </section>
                <button id="change" >Read More
                </button>
              </div>
            </div>
          </div>

              <div class="tg-use"
              style="width:50%;
              height:50%;
              background-color:transparent;
              z-index: 3;
              position: absolute;
              border: 2px transparent solid;
              top: 50%;"></div>
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
  margin-top: 0px !important;
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
  width:auto;
  height:auto;
  pointer-events: fill;
  /* margin-top: 2em; */
}
.gsap-container{
  width: 100%;
  height: 100%;
  margin-bottom: 2em;
}
#change{
  font-weight: 700;
  border-radius: 20px;
  cursor: pointer;
  text-transform: uppercase;
  background-color: #4A9EFF;
  border: 0;
  color: white;
  padding: 0.5rem 1rem;
  margin-top: 2em;
  z-index: 999;
  transition: all 0.3s ease;
}
#change:hover {
  background-color:rgb(255, 255, 255);
  color: black;
  text-shadow: 0 0 10px rgba(74, 158, 255, 0.5);
  box-shadow: 0 0 10px rgba(74, 158, 255, 0.3);
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
