<!-- eslint-disable vue/no-parsing-error -->
<!-- eslint-disable max-len -->
<template>
  <div class="about">
<nav-bar style="background-color: #000 !important;"></nav-bar>
    <language-switch v-model="isEnglish"></language-switch>
    <!-- ---------CSS animation About us-------------- -->
    <div class="animation" style="width: 100%;overflow: hidden;padding-top: 82px;">
      <div class="slider">
        <div class="item" style="position: relative;">
          <h4
            style="font-size:10vw;font-weight: 800;white-space:nowrap;color:transparent;-webkit-text-stroke: 0.8px #4A9EFF;">
            About us</h4>
        </div>
        <div class="item" style="position: relative;">
          <h4 style="font-size:10vw;font-weight: 800;white-space:nowrap;color: #4A9EFF;">About us</h4>
        </div>
        <div class="item" style="position: relative;">
          <h4
            style="font-size:10vw;font-weight: 800;white-space:nowrap;color:transparent;-webkit-text-stroke: 0.8px #4A9EFF;">
            About us</h4>
        </div>
        <div class="item" style="position: relative;">
          <h4 style="font-size:10vw;font-weight: 800;white-space:nowrap;color: #4A9EFF;">About us</h4>
        </div>
        <div class="item" style="position: relative;">
          <h4
            style="font-size:10vw;font-weight: 800;white-space:nowrap;color:transparent;-webkit-text-stroke: 0.8px #4A9EFF;">
            About us</h4>
        </div>
      </div>
    </div>
    <!-- -----------------CSS animation About us end ------------------- -->

    <section class="pg-about section-padding sub-bg">
      <div class="container1">
        <div class="card1"> <!--卡片最外層-->
          <div class="flip-card-container" style="height:100%;width:100%;position: relative;border:none;">
            <!--包裝卡片正反面的容器-->
            <div class="front">
              <img id="aboutImage" style="height:100%;width:100%;object-fit:cover;">
            </div>
            <div class="back">
              <img id="aboutImage2" style="height: 100%;width: 100%;object-fit:cover;">
            </div>
          </div>
        </div>
        <div class="card2"> <!--卡片最外層-->
          <div class="flip-card-container" style="height:100%;width:100%;position:relative;border:none;">
            <!--包裝卡片正反面的容器-->
            <div class="front">
              <img id="aboutImage3" style="height: 100%;width: 100%;object-fit:cover;">
            </div>
            <div class="back"">
              <img id="aboutImage4" style="height: 100%;width: 100%;object-fit:cover;">
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="container2 "
      style="width:90%; padding:10px 10px;display:flex;flex-direction:column;height:100%;margin-bottom: 5em;justify-content: center;">

      <div class="ab_zh" v-show="!isEnglish">
        <p class="org-description is-size-4" style="font-weight:bold;font-size:28px;background-color: #4A9EFF;color:white;padding:0.8rem;">關於未來實驗室</p>
        <div class="about_fvl_zh" v-html="apiData7" ></div>
      </div>

      <div class="ab_en" v-show="isEnglish">
        <p class="org-description is-size-4" style="font-weight:bold;margin-top: 2rem;font-size:28px;background-color: #4A9EFF;color: white;padding:0.8rem;">ABOUT FUTURE VISION LAB </p>
        <div class="about_fvl_en" v-html="apiData7En"></div>
      </div>

      <iframe src="https://www.youtube.com/embed/AYAP7x3XrdU?si=okQqkIkMJb5PLZed" title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin" style="height:600px;margin-bottom: 2em;width:100%;"></iframe>


    </div>
    <foot-bar2></foot-bar2>
  </div>
  <!-- <info-bar></info-bar> -->
</template>


<script>
import axios from 'axios';
import {InfoBar, FootBar2, NavBar, LanguageSwitch} from '../components';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'About',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    'info-bar': InfoBar,
    'foot-bar2': FootBar2,
    'nav-bar': NavBar,
    'language-switch': LanguageSwitch,
  },
  data() {
    return {
      msg: 'FUTURE VISION LAB ',
      isEnglish: false,
      schedules: [],
      apiData1: {},
      apiData2: {},
      apiData3: {},
      apiData4: {},
      apiData5: {},
      apiData6: {},
      apiData7: '',
      apiData7En: '',
    };
  }, mounted() {
    axios.all([
      axios.get('https://unzip-clab-api.clab.org.tw/api/v1/activities?search=FUTURE%20VISION%20LAB%202024'),
      axios.get('https://unzip-clab-api.clab.org.tw/api/v1/schedules/4'),
      axios.get('https://unzip-clab-api.clab.org.tw/api/v1/works/6162e143-f315-4a45-a9b4-830c8b3d8704'),
      axios.get('https://unzip-clab-api.clab.org.tw/activity-photo/dW5kZWZpbmVkLTE2OTE1NzcyMTAyMzA=.jpeg', {responseType: 'blob'}),
      axios.get('https://unzip-clab-api.clab.org.tw/activity-photo/dW5kZWZpbmVkLTE2ODI0MTc0NjgwNDM=.jpeg', {responseType: 'blob'}),
      axios.get('https://unzip-clab-api.clab.org.tw/api/v1/activities/443e7a5e-6d51-4d39-9bc0-fd71e579da09'),
      axios.get('https://unzip-clab-api.clab.org.tw/api/v1/works/87db0364-e198-4abb-b4e9-d6c3c70ebd68'),
      axios.get('https://unzip-clab-api.clab.org.tw/work-photo/1ae1a839-6db4-42f8-a6e3-831c59623ca7/MDIuU19fMjQxNjY0MTEuanBnLTE2MzMxNzA4MDYzNDgtMzU4Mw==.jpeg', {responseType: 'blob'}),
      axios.get('https://unzip-clab-api.clab.org.tw/work-photo/235751d1-db09-4101-b515-847d4d41e7b9/a3bcc1df37aa55d8c47098fd1095afe18210-1728030191477.png', {responseType: 'blob'}),
      axios.get('https://unzip-clab-api.clab.org.tw/work-photo/3bd35127-dc5e-4bcc-8b49-41d68a9468f5/1e05716931a83e2612b94290c562c28a6e17-1732870914190.jpeg', {responseType: 'blob'}), // 未來視覺派對
    ])
        // eslint-disable-next-line max-len
        .then(axios.spread((response1, response2, response3, response4, response5, response6, response7, response8, response9, response10) => {
        //  const reader = FileReader();
        // 宣告Filereader
          this.apiData1 = response1.data;
          this.apiData2 = response2.data;
          this.apiData3 = response3.data;
          this.apiData4 = response4.data;
          this.apiData5 = response5.data;
          this.apiData6 = response6.data;
          this.apiData7 = response7.data.work_zh.proposal;
          this.apiData7En = response7.data.work_en.proposal;
          this.apiData8 = response8.data;
          this.apiData9 = response9.data;
          this.apiData10 = response10.data;
          const imageNode = document.getElementById('aboutImage');
          const imageNode2 = document.getElementById('aboutImage2');
          const imageNode3 = document.getElementById('aboutImage3');
          const imageNode4 = document.getElementById('aboutImage4');
          const imgUrl = URL.createObjectURL(response5.data);
          const imgUrl2 = URL.createObjectURL(response8.data);
          const imgUrl3 = URL.createObjectURL(response9.data);
          const imgUrl4 = URL.createObjectURL(response10.data);
          imageNode.src = imgUrl;
          imageNode2.src = imgUrl2;
          imageNode3.src = imgUrl3;
          imageNode4.src = imgUrl4;

          console.log(this.apiData1);
          console.log(this.apiData2);
          console.log(this.apiData3);
          console.log(this.apiData4);
          console.log(this.apiData5);
          console.log(this.apiData6);
          console.log(this.apiData7);
          console.log(this.apiData8);
          console.log(this.apiData9);
          console.log(this.apiData10);
        }));
    //  .catch(err=>{
    //    console.log(err.response);
    //    });
  },
};
</script>
<style lang="scss" scoped>
.about {
  background-color: white;
  overflow-y: hidden;
}

.space_title {
  padding: 10px 10px;
  position: relative;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}

.title_background {
  width: 6rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: larger;
  background-color: #4A9EFF;
  color: black;
}

.space_img_info {
  color: #4A9EFF;
  width: 50%;
  height: auto;
  display: flex;
  flex-direction: column;
  font-size: 1.5em;
}

.read-more {
  width: 10em;
  height: auto;
  background: #4A9EFF;
  color: black;
  border: none;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: center;
  font-weight: bolder;
  text-decoration: none;
  cursor: pointer;
}

.card1 {
  height: 100%;
  width:50%;
  perspective: 1000px;
  border: none !important;
  box-shadow: none !important;
}

.card2 {
  height: 100%;
  width:50%;
  perspective: 1000px;
  border: none !important;
  box-shadow: none !important;
}

.flip-card-container {
  position: relative;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  border: gray solid 1px;
  transform-style: preserve-3d;
  transition: transform 0.8s;
}

.card1:hover .flip-card-container {
 transform: scale(1.05) translateY(-5px);
    box-shadow: 0 5px 15px #00bcd450;
}
.card2:hover .flip-card-container {
  transform: scale(1.05) rotate(2deg);
  box-shadow: 0 0 25px #991cff50;
}

.front {
  //  background-color:transparent;
  background-image: image(aboutImage);
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  backface-visibility: hidden;
}

.back {
  transform: rotateY(180deg);
  backface-visibility: hidden;
  // background-color:greenyellow;
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  backface-visibility: hidden;
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
  position: absolute;
  width: 100%;
  bottom: 0;
}
.container1 {
  display: flex;
  flex-direction: row;
  max-width:3840px;
  width: 90%;
  padding-right: var(--bs-gutter-x, .75rem);
  padding-left: var(--bs-gutter-x, .75rem);
  margin-right: auto;
  margin-left: auto;
  height:300px;
  gap:2em;
}

.container2 {
  display: flex;
  flex-direction:column;
  max-width:3840px;
  width: 100%;
  padding-right: var(--bs-gutter-x, .75rem);
  padding-left: var(--bs-gutter-x, .75rem);
  margin-right: auto;
  margin-left: auto;
  height:300px;
  gap:2em;
}
.about_fvl_zh{
  font-size: 16px;
  font-weight: normal;
  line-height: 1.6;
}
.about_fvl_en{
  font-size: 16px;
  font-weight: normal;
  line-height: 1.6;
}

.col-lg-4 {
  flex: 0 0 auto;
  width: 33.33333333%;
}

.col-lg-8 {
  flex: 0 0 auto;
  width: 66.66666667%;
}

.row {
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(var(--bs-gutter-y) * -1);
  margin-right: calc(var(--bs-gutter-x) * -.5);
  margin-left: calc(var(--bs-gutter-x) * -.5);
}

.section-padding {
  padding: 50px 0;
}

img {
  height: 290px;
}

.md-mb50 {
  margin-bottom: 90px;
}

.pg-about .bg-img {
  height: 100%;
  background-size: cover;
  background-position: center center;
}

.slider {
  animation-name: future-vision-lab;
  animation-duration: 60s;
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
@media(max-width:3840px){
  .container1{
    height: 600px;
  }
  .ab_zh{
    font-size: 16px;
  }
  .ab_en{
    font-size: 16px;
  }
  .is-size-4{
    font-size: 32px !important;
  }
}

@media(max-width:2560px) {
  .container{
    max-width: 2560px  !important;
    justify-content: center;
  }
  .ab_zh{
    font-size: 16px;
  }
  .ab_en{
    font-size: 16px;
  }
  .is-size-4{
    font-size: 32px !important;
  }
  .card1{
    width: 40%;
  }
  .card2{
    width: 40%;
  }
}
@media(max-width:1920px) {
  .container1{
    height:300px;
  }
  .ab_zh{
    font-size: 16px;
  }
  .ab_en{
    font-size: 16px;
  }
  .is-size-4{
    font-size: 32px !important;
  }
}
@media(max-width:1280px) {
  .container1{
    height:300px;
  }
  .ab_zh{
    font-size: 16px;
  }
  .ab_en{
    font-size: 16px;
  }
  .is-size-4{
    font-size: 32px !important;
  }
}
@media(max-width:1200px) {

}
@media(max-width:1024px) {

}
@media(max-width:920px) {
  .container1{
  flex-direction: column;
  gap:1em;
  }

}
@media(max-width: 768px) {
  .container1{
  flex-direction: column;
  gap:1em;
  }


@media only screen and (max-width:767px) {
  .row {
    justify-content: center;
    align-items: center;
  }

  .md-mb50 {
    margin-bottom: 0 !important;
  }

  #aboutImage {
    padding: 20px;
    height: 100%;
    width: 100%;
  }

  #aboutImage2 {
    padding: 20px;
    height: 100%;
    width: 100%;
  }

  #aboutImage3 {
    padding: 20px;
    height: 100%;
    width: 100%;
  }

  #aboutImage4 {
    padding: 20px;
    height: 100%;
    width: 100%;
  }
}
}
@media(max-width:414px) {
  .container1{
    flex-direction: column;
    gap:1em;
  }
  .card1{
    width: 100%;
  }
  .card2{
    width: 100%;
  }
  #aboutImage {
    padding:0;

  }

  #aboutImage2 {
    padding:0;
  }

  #aboutImage3 {
    padding:0;
  }

  #aboutImage4 {
    padding:0;
  }
}
@media(max-width: 375px) {
  .container{
    flex-direction: column;
  }
}

// 新增動畫效果
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

// 應用動畫到元素
.animation {
  animation: fadeInUp 1s ease-out;
}

.card1, .card2 {
  animation: float 6s ease-in-out infinite;
  transition: all 0.3s ease;
  
  &:hover {
    animation: pulse 1s ease-in-out;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
}

.ab_zh {
  animation: slideInLeft 1s ease-out;
}

.ab_en {
  animation: slideInRight 1s ease-out;
}

.preview__text__link__btn {
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
}

// 為圖片添加動畫效果
.flip-card-container {
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: scale(1.02);
  }
}

// 為標題添加動畫效果
.org-description {
  position: relative;
  display: inline-block;
  color: #4A9EFF;
}

// 為內文添加動畫效果
.about_fvl_zh, .about_fvl_en {
  opacity: 0;
  animation: fadeInUp 1s ease-out forwards;
  animation-delay: 0.5s;
}

// 為 iframe 添加動畫效果
iframe {
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
}

// 響應式動畫調整
@media(max-width: 768px) {
  .card1, .card2 {
    animation: none;
    
    &:hover {
      animation: none;
      transform: scale(1.02);
    }
  }
  
  .ab_zh, .ab_en {
    animation: fadeInUp 1s ease-out;
  }
}

.zoom-wrapper {
  height: 200px;
  display: flex;
  justify-content: center;
  width: 80%;
  margin-top: 0.5rem;
  overflow: hidden;
  position: relative;
}

.preview1, .preview2, .preview3, .preview4 {
  position: absolute;
  z-index: 0;
  top: 0%;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: transparent;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: row;
  object-fit: cover;
  align-items: center;
  opacity: 1;
  font-size: 1em;
  transition: transform 0.8s ease;
  transform-origin: center;
}

.preview1:hover, .preview2:hover, .preview3:hover, .preview4:hover {
  transform: scale(1.1);
}

.preview__text {
  width: 80%;
  margin-left: 20%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  opacity: 0;
  transition: opacity 0.5s ease;
  z-index: 2;
  position: relative;
}

.preview1:hover .preview__text,
.preview2:hover .preview__text,
.preview3:hover .preview__text,
.preview4:hover .preview__text {
  opacity: 1;
}

// 修改卡片容器樣式
.card1, .card2 {
  height: 100%;
  width: 50%;
  perspective: 1000px;
  border: none !important;
  box-shadow: none !important;
  overflow: hidden;
}

.flip-card-container {
  position: relative;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  border: gray solid 1px;
  transform-style: preserve-3d;
  transition: transform 0.8s;
  overflow: hidden;
}

.front, .back {
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  backface-visibility: hidden;
  overflow: hidden;
}

.front img, .back img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s ease;
}

.card1:hover .flip-card-container {
  transform: scale(1.02);
  box-shadow: 0 5px 15px #00bcd450;
}

.card2:hover .flip-card-container {
  transform: scale(1.02);
  box-shadow: 0 0 25px #991cff50;
}

// 響應式調整
@media(max-width: 2560px) {
  .zoom-wrapper {
    height: 400px !important;
  }
}

@media(max-width: 768px) {
  .zoom-wrapper {
    width: 90% !important;
  }
  
  .preview1:hover, .preview2:hover, .preview3:hover, .preview4:hover {
    transform: scale(1.05);
  }
}

.space_img1 {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 0 rgba(255, 255, 255, 0);
}

.space_img1:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3),
              0 0 40px rgba(255, 255, 255, 0.2),
              0 0 60px rgba(255, 255, 255, 0.1);
}

.space_img1 img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.space_img1:hover img {
  filter: brightness(1.1);
}

// 移除標題的 hover 底線效果
.title-content p::after {
  display: none;
}

.title-content p:hover::after {
  display: none;
}

</style>
<style lang="css" scoped src="../bootstrap.min.css"></style>
