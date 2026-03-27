<!-- eslint-disable max-len -->
<!-- eslint-disable vue/no-parsing-error -->

<template>
<body style="background-color: transparent!important;">
    <div class="collect-container"ref="target" id="#background">
    <div id="heading">
      <h1 style="z-index:999;">FUTURE VISION LAB</h1>
    </div>
    <div id="hoverText" v-if="hoveredText">
        {{ hoveredText }} &nbsp {{artistName}}
      </div>
  </div>
</body>
</template>

<script setup>
import axios from 'axios';
import {ref, onMounted} from 'vue';
// import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
// import {Scene} from 'three';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {gsap} from 'gsap';
// import {ScrollTrigger} from "gsap/ScrollTrigger";
import router from '../router/index.js';
import store from '../store.js';


const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.outputColorSpace = THREE.SRGBColorSpace;


renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const target = ref();
const scene = new THREE.Scene();
// scene.background = new THREE.Color(0x87CEEB);
// eslint-disable-next-line max-len
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(30, 6, 10);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 5;
controls.maxDistance = 30;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate =false;
controls.target = new THREE.Vector3(0, 1, 0);
controls.update();

const spotLight = new THREE.SpotLight(0xffffff, 3000, 100, 2, 1);
spotLight.position.set(0, 25, 0);
spotLight.castShadow = false;
spotLight.shadow.bias = -0.0001;
scene.add(spotLight);

const pointlight = new THREE.PointLight(0xffffff, 1000, 150);
pointlight.position.set(20, 0, 0);
spotLight.castShadow = false;
// spotLight.shadow.bias = -0.0001;
scene.add(pointlight);

const al = new THREE.AmbientLight(0xffffff, 2.5);
scene.add(al);

const planes = new THREE.Group();

let plane; let plane1; let plane2; let plane3; let plane4; let plane5;
let title; let title1; let title2; let title3; let title4; let title5;
let artist; let artist1; let artist2; let artist3; let artist4; let artist5;
let workid; let workid1; let workid2; let workid3; let workid4; let workid5;


// //////1/////////
const geometry = new THREE.BoxGeometry(8, 6, 0.1);
axios.get( 'https://unzip-clab-api.clab.org.tw/api/v1/schedules/3/works?page=0&limit=25')
    .then((response) => {
      console.log(store.state.images);
      console.log(response.data);
      console.log(store.state.test);
      title = response.data.results[0].index;
      workid = response.data.results[0].workid;
      const imgUrl = 'https://unzip-clab-api.clab.org.tw/'+response.data.results[0].photo_1;
      // console.log(imgUrl);
      const texture = new THREE.TextureLoader().load(imgUrl);
      // eslint-disable-next-line max-len
      const material = new THREE.MeshLambertMaterial({map: texture, side: THREE.DoubleSide});
      plane = new THREE.Mesh(geometry, material);
      plane.position.set(0, 3, -3);
      planes.add(plane);

      const images = response.data.results.map((results) => ({
        title: results.work_zh.title,
        imgUrl: 'https://unzip-clab-api.clab.org.tw/'+results.photo_1,
      }));
      store.dispatch('updateImages', images); // 保存到 Vuex Store
      console.log(store.state.images);
    });

axios.get( 'https://unzip-clab-api.clab.org.tw/api/v1/artists?search=%E6%A6%8A%E5%8E%9F%E6%BE%84%E4%BA%BA')
    .then((response) => {
      console.log(response.data);
      artist = response.data[0].artist_zh.name;
      const artists = response.data.results.map((results) => ({
        artist: results.work_zh.name,
      }));
      store.dispatch('updateArtist', artists); // 保存到 Vuex Store
      console.log(store.state.artists);
    });
// /////////

// //////2/////////
const geometry1 = new THREE.BoxGeometry(8, 6, 0.1);
axios.get( 'https://unzip-clab-api.clab.org.tw/api/v1/schedules/3/works?page=0&limit=25')
    .then((response) => {
      console.log(response.data);
      title1 = response.data.results[1].work_zh.title;
      workid1 = response.data.results[1].work_id;
      const imgUrl = 'https://unzip-clab-api.clab.org.tw/'+response.data.results[1].photo_1;
      console.log(imgUrl);
      const texture = new THREE.TextureLoader().load(imgUrl);
      // eslint-disable-next-line max-len
      const material1 = new THREE.MeshLambertMaterial({map: texture, side: THREE.DoubleSide});
      plane1 = new THREE.Mesh(geometry1, material1);
      plane1.position.set(0, 3, -1);
      planes.add(plane1);
    });
axios.get('https://unzip-clab-api.clab.org.tw/api/v1/artists?search=%E8%8E%8A%E7%A6%BE')
    .then((response) => {
      console.log(response.data);
      artist1 = response.data[0].artist_zh.name;
    });
// /////////

// //////3/////////
const geometry2 = new THREE.BoxGeometry(8, 6, 0.1);
axios.get( 'https://unzip-clab-api.clab.org.tw/api/v1/schedules/3/works?page=0&limit=25')
    .then((response) => {
      console.log(response.data);
      title2 = response.data.results[2].work_zh.title;
      workid2 = response.data.results[2].work_id;
      const imgUrl = 'https://unzip-clab-api.clab.org.tw/'+response.data.results[2].photo_1;
      console.log(imgUrl);
      const texture = new THREE.TextureLoader().load(imgUrl);
      // eslint-disable-next-line max-len
      const material2 = new THREE.MeshLambertMaterial({map: texture, side: THREE.DoubleSide});
      plane2 = new THREE.Mesh(geometry2, material2);
      plane2.position.set(0, 3, 1);
      planes.add(plane2);
    });
axios.get('https://unzip-clab-api.clab.org.tw/api/v1/artists?search=%E5%90%B3%E5%85%8B%E8%BB%8D')
    .then((response) => {
      console.log(response.data);
      artist2 = response.data[0].artist_zh.name;
    });
// /////////

// //////4/////////
const geometry3 = new THREE.BoxGeometry(8, 6, 0.1);
axios.get( 'https://unzip-clab-api.clab.org.tw/api/v1/schedules/3/works?page=0&limit=25')
    .then((response) => {
      console.log(response.data);
      title3 = response.data.results[3].work_zh.title;
      workid3 = response.data.results[3].work_id;
      const imgUrl = 'https://unzip-clab-api.clab.org.tw/'+response.data.results[3].photo_1;
      console.log(imgUrl);
      const texture = new THREE.TextureLoader().load(imgUrl);
      // eslint-disable-next-line max-len
      const material3 = new THREE.MeshLambertMaterial({map: texture, side: THREE.DoubleSide});
      plane3 = new THREE.Mesh(geometry3, material3);
      plane3.position.set(0, 3, 3);
      planes.add(plane3);
    });
axios.get('https://unzip-clab-api.clab.org.tw/api/v1/artists?search=%E9%99%B3%E8%98%87%E6%A5%8A')
    .then((response) => {
      console.log(response.data);
      artist3 = response.data[0].artist_zh.name;
    });
// /////////

// //////5/////////
const geometry4 = new THREE.BoxGeometry(8, 6, 0.1);
axios.get( 'https://unzip-clab-api.clab.org.tw/api/v1/schedules/3/works?page=0&limit=25')
    .then((response) => {
      console.log(response.data);
      title4 = response.data.results[4].work_zh.title;
      workid4 = response.data.results[4].work_id;
      const imgUrl = 'https://unzip-clab-api.clab.org.tw/'+response.data.results[4].photo_1;
      console.log(imgUrl);
      const texture = new THREE.TextureLoader().load(imgUrl);
      // eslint-disable-next-line max-len
      const material4 = new THREE.MeshLambertMaterial({map: texture, side: THREE.DoubleSide});
      plane4 = new THREE.Mesh(geometry4, material4);
      plane4.position.set(0, 3, 5);
      planes.add(plane4);
    });
axios.get( 'https://unzip-clab-api.clab.org.tw/api/v1/artists?search=%E8%AC%9D%E7%88%BE%E8%93%8B%EF%BC%8E%E6%99%AE%E7%BE%85%E7%A7%91%E8%8F%B2%E8%80%B6%E5%A4%AB' )
    .then((response) => {
      console.log(response.data);
      artist4 = response.data[0].artist_zh.name;
    });
// /////////

// //////5/////////
const geometry5 = new THREE.BoxGeometry(8, 6, 0.1);
// let material5;
axios.get( 'https://unzip-clab-api.clab.org.tw/api/v1/schedules/3/works?page=0&limit=25')
    .then((response) => {
      console.log(response.data);
      title5 =response.data.results[5].work_zh.title;
      workid5 = response.data.results[5].work_id;
      const imgUrl = 'https://unzip-clab-api.clab.org.tw/'+response.data.results[5].photo_1;
      console.log(imgUrl);
      const texture = new THREE.TextureLoader().load(imgUrl);
      // eslint-disable-next-line max-len
      const material5 = new THREE.MeshLambertMaterial({map: texture, side: THREE.DoubleSide});
      plane5 = new THREE.Mesh(geometry5, material5);
      plane5.position.set(0, 3, 7);
      planes.add(plane5);
    });
axios.get('https://unzip-clab-api.clab.org.tw/api/v1/artists?search=%E8%95%AD%E5%8A%9B%E7%B6%BA' )
    .then((response) => {
      console.log(response.data);
      artist5 = response.data[0].artist_zh.name;
    });

planes.add(plane);
planes.add(plane1);
planes.add(plane2);
planes.add(plane3);
// planes.add(plane4);
// planes.add(plane5);
scene.add(planes);

// eslint-disable-next-line no-unused-vars
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let hoveredObject = null;
const originalPosition = new THREE.Vector3();
const hoveredText = ref('');
const artistName = ref('');
document.addEventListener('click', onClick);

// eslint-disable-next-line require-jsdoc
function onClick(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(planes.children);

  // eslint-disable-next-line require-jsdoc
  function isMobile() {
    return window.innerWidth <= 768; // 判斷是否為手機版
  };
  if (!isMobile()) {
    if (intersects.length > 0) {
      const selectedObject = intersects[0].object;
      // 根據選中的物件跳轉到不同的頁面
      if (selectedObject === plane) {
        router.push({
          name: 'Aboutwork_All',
          params: {
            workId: workid,
          }});
      } else if (selectedObject === plane1) {
      // eslint-disable-next-line max-len
      // router.push('/fvl-fest-2024/Aboutwork/1/ee49880c-1541-4554-8f97-5bc78ac051a1');
        router.push({
          name: 'Aboutwork_All',
          params: {
            workId: workid1,
          }});
      } else if (selectedObject === plane2) {
      // eslint-disable-next-line max-len
        router.push({
          name: 'Aboutwork_All',
          params: {
            workId: workid2,
          }});
      } else if (selectedObject === plane3) {
        router.push({
          name: 'Aboutwork_All',
          params: {
            workId: workid3,
          }});
      } else if (selectedObject === plane4) {
        router.push({
          name: 'Aboutwork_All',
          params: {
            workId: workid4,
          }});
      } else if (selectedObject === plane5) {
        router.push({
          name: 'Aboutwork_All',
          params: {
            workId: workid5,
          }});
      }
    }
  }
}

// document.addEventListener('click',onClick);
// let x;
// const xFinal = 12;


// ///////////以下Hover備用

document.addEventListener('mousemove', onmousemove);


// eslint-disable-next-line require-jsdoc
function onmousemove(event) {
  const pointer = new THREE.Vector2;
  const raycaster = new THREE.Raycaster();
  pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(planes.children);
  console.log(intersects);
  if (intersects.length > 0) {
    if (hoveredObject !== intersects[0].object) {
      if (hoveredObject) {
        gsap.to(hoveredObject.scale, {x: 1, y: 1, z: 1, duration: 1});
        gsap.to(hoveredObject.position, {x: 0, duration: 1});
      }
      hoveredObject = intersects[0].object;
      originalPosition.copy(hoveredObject.position);
      gsap.to(hoveredObject.scale, {x: 1.2, y: 1.2, z: 1.2, duration: 1});
      gsap.to(hoveredObject.position, {x: 6, duration: 1}); // 移動位置


      // 設置對應的中文字
      if (hoveredObject === plane) {
        hoveredText.value = title;
        artistName.value = artist;
      } else if (hoveredObject === plane1) {
        hoveredText.value = title1;
        artistName.value = artist1;
      } else if (hoveredObject === plane2) {
        hoveredText.value = title2;
        artistName.value = artist2;
      } else if (hoveredObject === plane3) {
        hoveredText.value = title3;
        artistName.value = artist3;
      } else if (hoveredObject === plane4) {
        hoveredText.value = title4;
        artistName.value = artist4;
      } else if (hoveredObject === plane5) {
        hoveredText.value = title5;
        artistName.value = artist5;
      }

      // setTimeout(() => {
      //   gsap.to(hoveredObject.scale, {x: 1.2, y: 1.2, z: 1.2, duration: 1});
      //   gsap.to(hoveredObject.position, {x: 0, duration: 0.01});
      //   hoveredObject = null;
      // }, 1000); // 暫停1秒後返回原本位置
    }
  } else if (intersects.length ===0) { // 自行新增
    if (hoveredObject) {
      gsap.to(hoveredObjectd.scale, {x: 1, y: 1, z: 1, duration: 1});
      gsap.to(hoveredObject.position, {x: 0, duration: 0.5});
    }
  } else {
    if (hoveredObject) {
      gsap.to(hoveredObject.scale, {x: 1, y: 1, z: 1, duration: 1});
      gsap.to(hoveredObject.position, {x: 0, duration: 0.5});
      hoveredObject = null;
    }
  }
}

// eslint-disable-next-line require-jsdoc
function resetMaterials() {
  for (let i =0; i< scene.children.length; i++) {
    if (scene.children[i].material) {
      scene.children[i].material.opacity = 1.0;
    }
  }
}

const axis = new THREE.AxesHelper(10);
scene.add(axis);


window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  updateCameraPosition();
});

// eslint-disable-next-line require-jsdoc
function updateCameraPosition() {
  if (window.innerWidth < 768) {
    camera.position.set(20, 0, 10); // 手機版攝影機位置
  } else {
    camera.position.set(18, 7, 10); // 桌面版攝影機位置
  }
}

// eslint-disable-next-line require-jsdoc
function animate() {
  // if (fvlLogoMesh) {
  //   fvlLogoMesh.rotation.y += 0.01; // 自動旋轉
  // }
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
  resetMaterials();
}


onMounted(() => {
  target.value.appendChild(renderer.domElement);
  // eslint-disable-next-line new-cap
  animate();
  updateCameraPosition();
});


</script>

<style>
#background{
  position: absolute;
  width: 100%;
  height: 100%;
  top:0;
  left: 0;
  z-index:999;
}
#hoverText {
  position: absolute;
  bottom:5%;
  left:2%;
  font-size:1.5em;
  font-weight:700;
  color: white;
  background-color:rgb(66, 255, 91);
  padding: 5px;
  border-radius: 5px;
  pointer-events: none;
  z-index: 1000;
}
.h1 {
  color:rgb(212, 95, 95);
  font-size: 4em;
  margin: 0px;
  font-weight: 100;
}
.collect-container{
  position: relative;
  width: 100vw;
  height: 100vh;
}
#heading{
  margin-top: 5rem;
  position:absolute;
  color: black;
  z-index: 999;
  padding:32px;
  display: flex;
  flex-wrap: wrap;
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

.shadow{
  margin-top: -45px;
}
@media only screen and (max-width:768px){

#hoveredText{
  position: absolute;
  top:0;
  left: 0;
  font-size: 1em;
  color: black;
  background-color:rgb(185, 255, 79);
  padding: 5px;
  border-radius: 5px;
  pointer-events: none;
  z-index: 1000;
}
}

@media only screen and (min-width:1024px) {
#heading{
    margin-left:10%;
  }
}


</style>
