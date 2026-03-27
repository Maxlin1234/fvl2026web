<!-- eslint-disable max-len -->
<template>
  <div class="about" style="overflow-x: hidden;background-color: black;">
    <!-- <nav-bar2></nav-bar2> -->
    <!-- ---------CSS animation About us-------------- -->
    <!-- -----------------CSS animation About us end ------------------- -->
    <!-- <div class="banner-back" style="filter:blur(30px);transform: scale(1.2);position: fixed;z-index:0;">
               <banner-background></banner-background>
               </div> -->

    <section class="pg-about section-padding sub-bg">
      <div class="dropdown" style="position: fixed;">
        <button class="dropbtn" @click="change_en">
          EN
        </button>
      </div>
      <div class="title_img_intro_wrap" style="position: relative;">
        <!-- 液態流動背景 canvas -->
        <div ref="liquidBg" class="liquid-bg"></div>
        <div class="container" style="margin: 0; position: relative; z-index: 1;">
          <div class="space_title">
            <!-- 只有前兩張圖 -->
            <template v-if="thirdImage == null">
              <div class="container2">
                <div class="pic1" style="width:100%;height:100%">
                  <div class="space_img1">
                    <div class="bg-img radius-10 md-mb50"
                      style="display: flex;justify-content: flex-start;height:auto;width:100%;height: 100%;object-fit: cover;border-radius: 25px;">
                      <img class="first-image" :class="{ 'fade-in': isFirstImageLoaded }" 
                        :src="'https://unzip-clab-api.clab.org.tw/' + firstImage"
                        style="border-radius: 25px;" @load="onFirstImageLoad">
                    </div>
                  </div>
                </div>

                <div class="img_1" style="width:100%;height:380px;">
                  <img class="second-image" :class="{ 'fade-in': isSecondImageLoaded }"
                    :src="'https://unzip-clab-api.clab.org.tw/' + secondImage"
                    style="width: 100%;max-height:380px; object-fit:cover;border-radius: 25px;" @load="onSecondImageLoad">
                </div>
              </div>
            </template>
            <!-- 只有第一張圖 -->
            <template v-else-if="secondImage == null">
              <div class="container2">
                <div class="pic1">
                  <div class="space_img1">
                    <div class="bg-img radius-10 md-mb50"
                      style="display: flex;justify-content: flex-start;height:100%;">
                      <img class="first-image" :class="{ 'fade-in': isFirstImageLoaded }" 
                        :src="'https://unzip-clab-api.clab.org.tw/' + firstImage"
                        style="border-radius: 25px;" @load="onFirstImageLoad">
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <!-- 三張圖都有 -->
            <template v-else>
              <div class="container2">
                <div class="pic1">
                  <div class="space_img1">
                    <div class="bg-img radius-10 md-mb50"
                      style="display: flex;justify-content: flex-start;width:100%;height:100%;">
                      <img class="first-image" :class="{ 'fade-in': isFirstImageLoaded }" 
                        :src="'https://unzip-clab-api.clab.org.tw/' + firstImage"
                        style="border-radius: 25px;" @load="onFirstImageLoad">
                    </div>
                  </div>
                </div>

                <div class="imgs">
                  <div class="img_1">
                    <img class="second-image" :class="{ 'fade-in': isSecondImageLoaded }"
                      :src="'https://unzip-clab-api.clab.org.tw/' + secondImage"
                      style="width:100%;height: 100%;object-fit:cover;border-radius: 25px;" @load="onSecondImageLoad">
                  </div>
                  <div class="img_2">
                    <img class="third-image" :class="{ 'fade-in': isThirdImageLoaded }"
                      :src="'https://unzip-clab-api.clab.org.tw/' + thirdImage"
                      style="width:100%;height: 100%;object-fit:cover;border-radius: 25px;" @load="onThirdImageLoad">
                  </div>
                </div>
              </div>
            </template>

            <!-- <h4 class="artist_title" style="font-weight:900;margin-left:60%;">藝術家介紹</h4> -->
            <div class="container3">
              <div class="about_artwork">
                <div class="title-content">
                  <p class="org-description is-size-4" style="font-weight:bold;color:black;text-align: left;">
                    {{ products.work_zh.title }}
                  </p>
                </div>
                <!-- <div v-html="apiData7" style="color:black;margin-top: 1rem;"></div> -->
                <div style="color:black;padding:0.5rem;font-weight: 300;" v-html="htmlContent" />
              </div>

              <div class="about_artist">
                <p class="org-description is-size-4"
                  style="font-weight:bold;color:black;text-align: left;padding: 0.5rem;">
                  藝術家介紹
                </p>
                <!-- <p class="org-description is-size-4" style="color:black;text-align: left;font-size:0.2rem">{{ $route.params.artist}}</p> -->
                <div style="color:black;padding: 0.5rem;" v-html="artistContent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <hr style="color: aliceblue;">
    <info-bar />
    <foot-bar2 />
  </div>
</template>

<script>
import {BannerBackground, InfoBar, FootBar2} from '../components';
import axios from 'axios';
import * as THREE from 'three';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'News',
  components: {
    'info-bar': InfoBar,
    'foot-bar2': FootBar2,
    //  'nav-bar2':NavBar2,
    // eslint-disable-next-line vue/no-unused-components
    'banner-background': BannerBackground,
  },

  props: {
    id: {
      type: String,
    },
    title: {
      type: String,
    },
    wordId: {
      type: String,
    },
  },

  data() {
    return {
      msg: 'FUTURE VISION LAB ',
      products: [],
      firstImage: {},
      secondImage: {},
      thirdImage: {},
      schedules: [],
      isFirstImageLoaded: false,
      isSecondImageLoaded: false,
      isThirdImageLoaded: false,
      liquidRenderer: null,
      liquidScene: null,
      liquidCamera: null,
      liquidBgAnimId: null,
    };
  },
  computed: {
    htmlContent() {
      // 从路由参数获取内容
      // return this.$route.params.word || '';
      return this.products.work_zh.proposal || '';
    },
    artistContent() {
      // 从路由参数获取内容
      return this.products.work_zh.note || '';
    },

  },
  created() {
    console.log('關於作品創建');
  },
  mounted() {
    // let id = this.$route.query.index
    // this.index = index
    // console.log(this.$route.params)
    // eslint-disable-next-line camelcase
    const work_id = this.$route.params.workId;
    // eslint-disable-next-line camelcase
    axios.get('https://unzip-clab-api.clab.org.tw/api/v1/works/' + work_id, {responseType: 'json'}).then((response) => {
      this.products = response.data;
      const firstImage = this.products.photo_1;
      this.firstImage = firstImage;

      const secondImage = this.products.photo_2;
      this.secondImage = secondImage;

      const thirdImage = this.products.photo_3;
      this.thirdImage = thirdImage;

      console.log(firstImage);
      console.log(this.products);
    }).catch((err) => {
      console.log(err.response);
    });
    // 初始化液態流動背景
    this.initLiquidBg();
  },
  methods: {
    change_en() {
      this.$router.push({name: 'Aboutwork_en_All'}).then(() => {
        window.location.reload();
      });
    },
    onFirstImageLoad() {
      this.isFirstImageLoaded = true;
    },
    onSecondImageLoad() {
      this.isSecondImageLoaded = true;
    },
    onThirdImageLoad() {
      this.isThirdImageLoaded = true;
    },
    initLiquidBg() {
      // 取得容器
      const container = this.$refs.liquidBg;
      if (!container) return;
      // 設定尺寸
      const width = container.offsetWidth || container.clientWidth || 900;
      const height = container.offsetHeight || container.clientHeight || 500;
      // 建立 renderer
      this.liquidRenderer = new THREE.WebGLRenderer({ alpha: true });
      this.liquidRenderer.setSize(width, height);
      this.liquidRenderer.setClearColor(0x000000, 0); // 透明
      container.appendChild(this.liquidRenderer.domElement);
      // 建立場景、相機
      this.liquidScene = new THREE.Scene();
      this.liquidCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      // 建立 shader 材質
      const uniforms = {
        u_time: { value: 0.0 },
        u_resolution: { value: new THREE.Vector2(width, height) }
      };
      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          precision highp float;
          varying vec2 vUv;
          uniform float u_time;
          uniform vec2 u_resolution;
          void main() {
            vec2 uv = vUv;
            uv -= 0.5;
            uv.x *= u_resolution.x / u_resolution.y;
            float t = u_time * 0.25;
            float r = 0.5 + 0.5 * sin(uv.x * 4.0 + t) * cos(uv.y * 4.0 - t);
            float g = 0.5 + 0.5 * cos(uv.x * 6.0 - t) * sin(uv.y * 6.0 + t);
            float b = 0.5 + 0.5 * sin(uv.x * 8.0 + t) * sin(uv.y * 8.0 - t);
            float mask = smoothstep(0.2, 0.5, length(uv));
            vec3 color = mix(vec3(r, g, b), vec3(0.0), mask);
            gl_FragColor = vec4(color, 0.85);
          }
        `,
        transparent: true
      });
      // 建立平面
      const geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, material);
      this.liquidScene.add(mesh);
      // 動畫
      const animate = () => {
        material.uniforms.u_time.value = performance.now() * 0.001;
        this.liquidRenderer.render(this.liquidScene, this.liquidCamera);
        this.liquidBgAnimId = requestAnimationFrame(animate);
      };
      animate();
    },
  },
  beforeUnmount() {
    if (this.liquidBgAnimId) cancelAnimationFrame(this.liquidBgAnimId);
    if (this.liquidRenderer) this.liquidRenderer.dispose();
  },
};
</script>
<style lang="scss" scoped>
.dropbtn {
  background-color: transparent;
  color: rgb(255, 255, 255);
  padding: 15px;
  width: 8rem;
  height: 3rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dropdown {
  position: fixed !important;
  right: 5%;
  top: 5%;
  display: inline-block;
  z-index: 4;
}

.title_img_intro_wrap {
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.pic1 {
  width: 40%;
  object-fit: cover;
  // height: 350px;
}

.about {
  background-color: rgb(255, 255, 255);
  overflow-y: hidden;
}

.space_title {
  position: relative;
  width: 100%;
  margin-top: 6rem;
  z-index: 1;
}

.title_background {
  width: 6rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: larger;
  background-color: #000000;
  border-radius: 40px;

}

.title {
  color: white !important;
}

.hero-body {
  width: 100%;
  height: auto;
  background-color: rgb(255, 255, 255);
  display: block;
  position: relative;
  overflow: hidden;
}

.aboutImage {
  display: block;
  max-width: 100%;
  max-height: 100%;
  position: static;
  width: 100%;
  height: auto;
}

.container {
  max-width: 2560px !important;
  width: 100%;
  padding-right: var(--bs-gutter-x, .75rem);
  padding-left: var(--bs-gutter-x, .75rem);
  margin-right: auto;
  margin-left: auto;
  margin-top: 1rem;
}

.container2 {
  height: auto;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
  z-index: 1;
}

.container3 {
  background-color: white;
  width: 100%;
  height: 100%;
  padding-right: var(--bs-gutter-x, .75rem);
  padding-left: var(--bs-gutter-x, .75rem);
  margin-right: auto;
  margin-left: auto;
  margin-top: 1em;
  margin-bottom: 20%;
  display: flex;
  justify-content: flex-start;
  border-radius: 25px;
  padding: 2rem;
  gap: 2em;
  z-index: 1;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: 0.5s;
}

.about_artwork {
  width: 50%;
  height: auto;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  z-index: 1;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: 0.7s;
}

.title-content {
  padding: 0.5rem;
}

.about_artist {
  display: flex;
  flex-direction: column;
  width: 50%;
  height: auto;
  position: relative;
  z-index: 1;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: 0.9s;
}

.tag {
  width: auto;
  height: 1.5rem;
  background-color: aliceblue;
  border: 1px solid black;
  color: black;
  border-radius: 30px;
}

.tag:hover {
  background-color: #000000;
  color: aliceblue;
}

.space_img1 {
  flex: 0 0 auto;
  width: 100%;

}

.first-image, .second-image, .third-image {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  position: static;
  width: 100%;
  height: auto;
}

.fade-in {
  opacity: 1;
  transform: translateY(0);
}

.col-lg-8 {
  flex: 0 0 auto;
  width: 66.66666667%;
}

img {
  min-height: 380px;
}

.pg-about .bg-img {
  height: 220px;
  background-size: cover;
  background-position: center center;
}

.slider {
  animation-name: future-vision-lab;
  animation-duration: 150s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-delay: 0;
  display: flex;
}

.item {
  position: relative;
  padding: 0 30px;
  display: flex;
}

@keyframes future-vision-lab {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-100%);
  }
}

.videobox {
  position: relative;
  margin-bottom: 5rem;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;

}

.videobox iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.space_imgs {
  width: 70vw;
  height: 40vh;
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: flex-start;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5rem;
  margin-bottom: 5rem;
}

.imgs {
  width: 60%;
  // max-height: 380px;
  height: 100%;
  display: flex;
  align-items: flex-end;
  flex-direction: row;
  gap: 10px;
  overflow: hidden;
}

.img_1, .img_2 {
  width: 100%;
  height: 100%;
  border-radius: 25px !important;
}

.images {
  width: 50%;
  height: 50%;
  position: relative;
  display: flex;
  align-items: center;
}

.title-content p {
  position: relative;
  display: inline-block;
}

.title-content p::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: #20ff96;
  transition: width 0.3s ease;
}

.title-content p:hover::after {
  width: 100%;
}

.dropbtn {
  transition: all 0.3s ease;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius:25px;
}

.dropbtn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: white;
  transform: translateY(-2px);
}

@media (max-width:2560px){
}
@media (max-width:1920px){
}
@media(max-width:920px) {
}
@media(max-width:768px) {
}
@media(max-width:720px) {
}
@media(max-width:414px) {
  .title_img_intro_wrap{
    width:90%;
  }.container2{
    flex-direction:column;
    height:auto;
  }
  .pic1{
    width:100%;
    height: auto;
  }
  .imgs{
    flex-direction: column;
    height: auto;
    width:100%;
    max-height:none;
  }
.container3{
  width: 100%;
  flex-direction: column;
}
.about_artwork{
  width: 100%;
}
.title_content p{
  font-size:2em;
}
.about_artist{
  width:100%;
}
}
@media(max-width: 375px) {
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.liquid-bg {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  border-radius: 25px;
  overflow: hidden;
}

</style>
<style lang="css" scoped src="../bootstrap.min.css"></style>
