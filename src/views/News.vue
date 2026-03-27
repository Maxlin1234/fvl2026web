<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable max-len -->
<!-- eslint-disable max-len -->
<!-- eslint-disable max-len -->
<template>
  <div class="about">
    <nav-bar  style="background-color: #000 !important;"></nav-bar>
    <language-switch v-model="isEnglish"></language-switch>
<!-- ---------CSS animation About us-------------- -->
<div class="animation" style="width: 100%;overflow: hidden;padding-top: 82px;">
         <div class="slider">
             <div class="item" style="position: relative;">
               <h4
               style="font-size:10vw;
               font-weight: 800;
               white-space:nowrap;
               color:transparent;
               -webkit-text-stroke: 0.8px #4A9EFF;">Our space</h4>
             </div>
             <div class="item"  style="position: relative;">
             <h4
             style="font-size:10vw;
             font-weight:800;
             white-space:nowrap;
             color: #4A9EFF;">Our space</h4>
             </div>
             <div class="item" style="position: relative;">
             <h4
             style="font-size:10vw;
             font-weight: 800;
             white-space:nowrap;
             color:transparent;
             -webkit-text-stroke:0.8px #4A9EFF;">Our space</h4>
             </div>
             <div class="item" style="position: relative;">
             <h4
             style="font-size:10vw;
             font-weight: 800;
             white-space:nowrap;
             color: #4A9EFF;">Our space</h4>
             </div>
             <div class="item" style="position: relative;">
             <h4
             style="font-size:10vw;
             font-weight:800;
             white-space:nowrap;
             color:transparent;
             -webkit-text-stroke:0.8px #4A9EFF;">Our space</h4>
            </div>
         </div>
   </div>
  <!-- -----------------CSS animation About us end ------------------- -->

  <section class="pg-about section-padding sub-bg">
    <div class="container" style="margin-left: auto;margin-right: auto;">
  <div class="space_title">
   <div class="title_background">
    <div class="title">
      <p
        class="org-description is-size-4"
        style="font-weight:bold;font-size:32px;background-color: #4A9EFF;color:white;padding:0.5rem;margin-bottom: 0;"
        v-show="!isEnglish"
      >關於空間
      </p>
      <p
        class="org-description is-size-4"
        style="font-weight:bold;font-size:32px;background-color: #4A9EFF;color:white;padding:0.5rem;margin-bottom: 0;"
        v-show="isEnglish"
      >ABOUT SPACE
      </p>
    </div>
   </div>
  </div>
      <div class="row">
        <div class="space_img1" v-scroll-reveal>
          <div class="bg-img radius-10 md-mb50"
          style="display: flex;
          justify-content: flex-start;
          height: auto;
          margin-left: 1em;">
            <img src="imgs/machinearm.jpg"
            style="width: 100%;
            height:300px;
            object-fit: cover;"
            :class="{ 'fade-in': isFirstImageLoaded }"
            @load="onFirstImageLoad">
          </div>
        </div>
        <!-- <div class="col-lg-4">
          <div class="bg-img radius-10 md-mb50"><img id="aboutImage"></div>
        </div> -->
        <!-- <div class="col-lg-8">
          <div class="bg-img radius-10"><img id="aboutImage2"></div>
        </div> -->
      </div>
    </div>
    <div class="container2">
      <div class="space_usage1">
        <div class="space_info">
          <ul>
            <li>
              <p class="info-title">{{ isEnglish ? 'Usage' : '用途' }}</p>
              <p class="info-content">{{ isEnglish ? 'Workshops / Talks / Space Rental' : '工作坊 講座 空間租借' }}</p>
            </li>
            <li>
              <p class="info-title">{{ isEnglish ? 'Capacity' : '可容納人數' }}</p>
              <p class="info-content">{{ isEnglish ? '30 people' : '30人' }}</p>
            </li>
            <li>
              <p class="info-title">{{ isEnglish ? 'Area' : '面積' }}</p>
              <p class="info-content">{{ isEnglish ? 'XX ping' : 'XX坪' }}</p>
            </li>
            <li>
              <p class="info-title">{{ isEnglish ? 'Additional Notes' : '其他說明' }}</p>
              <p class="info-content">-</p>
            </li>
                </ul>
              </div>
      </div>

      <div class="about_space1">
        <h2 class="space-title">{{ isEnglish ? 'Mei-Yuan Building 1F' : '【美援大樓空間 1 樓】' }}</h2>
        <div class="space-description" v-html="isEnglish ? apiData7En : apiData7"></div>
      </div>
    </div>
</section>

    <section class="pg-about section-padding sub-bg" style="margin-top: 3rem;">
    <div class="container" style="margin-left: auto;margin-right: auto;">
      <div class="row">
        <div class="space_img1">
          <div class="bg-img radius-10 md-mb50" style="display: flex;justify-content: flex-start;height: auto;margin-left: 1em;">
            <img src="imgs/secondfloor.jpg" style="width: 100%;height:300px;object-fit: cover;">
          </div>
        </div>
      </div>
    </div>

    <div class="container3">
               <div class="space_usage2">
        <div class="space_info">
          <ul>
            <li>
              <p class="info-title">{{ isEnglish ? 'Usage' : '用途' }}</p>
              <p class="info-content">{{ isEnglish ? 'Workshops / Talks / Space Rental' : '工作坊 講座 空間租借' }}</p>
            </li>
            <li>
              <p class="info-title">{{ isEnglish ? 'Capacity' : '可容納人數' }}</p>
              <p class="info-content">{{ isEnglish ? '30 people' : '30人' }}</p>
            </li>
            <li>
              <p class="info-title">{{ isEnglish ? 'Area' : '面積' }}</p>
              <p class="info-content">{{ isEnglish ? 'XX ping' : 'XX坪' }}</p>
            </li>
            <li>
              <p class="info-title">{{ isEnglish ? 'Additional Notes' : '其他說明' }}</p>
              <p class="info-content">-</p>
            </li>
                </ul>
              </div>
      </div>

      <div class="about_space2">
        <h2 class="space-title">{{ isEnglish ? 'Mei-Yuan Building 2F' : '【美援大樓空間 2 樓】' }}</h2>
        <div class="space-description" v-html="isEnglish ? apiData7En : apiData7"></div>
      </div>
    </div>
</section>

<div class="space_imgs">
    <div class="images">
    <img id="aboutImage" style="width:70%;height:auto;position: absolute;">
    <img id="aboutImage2" style="position: absolute;top:5rem;left:30%; width:50%;height:auto;position: absolute;">
    </div>
    <div class="space_img_info">
      <hr style='background-color:white; height:1px; border:none;'>
      <p v-show="!isEnglish">科技媒體實驗平台「未來視覺實驗室」技術總監蔡奇宏演算影像創作，搭配柯智豪聲音創作。</p>
      <p v-show="isEnglish">Tsai Chi-Hung, Technical Director of Future Vision Lab, presents algorithmic visuals, paired with sound design by Chu Chi-Hao.</p>

      <router-link :to="{ name:'About' }" class="read-more-link">
        <button class="read-more">{{ isEnglish ? 'Read More' : '了解更多' }}</button>
      </router-link>
    </div>
</div>
           <!-- <div class="container" style="padding:2rem;display: flex;flex-direction: row;justify-content: flex-start;">
               <div class="space_usage" style="width: 40%;height:auto;">
              <div class="space_info" style="color: #01F0CC;">
                <ul style="padding: 0;">
                <li><p>用途：工作坊 講座 空間租借</p></li>
                <hr style="width: 80%; border: 1px solid #01F0CC;">
                <li><p>可容納人數:30人</p></li>
                <hr style="width: 80%; border: 1px solid #01F0CC;">
                <li><p>面積：XX坪</p></li>
                <hr style="width: 80%; border: 1px solid #01F0CC;">
                <li><p>其他說明：</p></li>
                </ul>
              </div>
      </div>

      <div class="about_space2" style="width: 60%;height: auto;right: 0;">
      <p class="org-description is-size-4" style="font-weight:bold;color: #01F0CC;">【美援大樓空間 2 樓】</p>
      <div v-html="apiData7" style="color: azure;"></div>
      </div>
    </div>   -->


    <hr style="color: aliceblue;">
    <info-bar></info-bar>
    <foot-bar2></foot-bar2>
</div>

</template>


<script>
import axios from 'axios';
import {InfoBar, FootBar2, NavBar, LanguageSwitch} from '../components';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'News',
  components: {
    'info-bar': InfoBar,
    'foot-bar2': FootBar2,
    // eslint-disable-next-line vue/no-unused-components
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
      apiData8: null,
      isFirstImageLoaded: false,
      isSecondImageLoaded: false,
      isThirdImageLoaded: false,
    };
  },
  mounted() {
    axios.all([
      axios.get('https://unzip-clab-api.clab.org.tw/api/v1/activities?search=FUTURE%20VISION%20LAB%202024'),
      axios.get('https://unzip-clab-api.clab.org.tw/api/v1/schedules/4'),
      axios.get('https://unzip-clab-api.clab.org.tw/api/v1/works/6162e143-f315-4a45-a9b4-830c8b3d8704'),
      axios.get('https://unzip-clab-api.clab.org.tw/activity-photo/dW5kZWZpbmVkLTE2OTE1NzcyMTAyMzA=.jpeg', {responseType: 'blob'}),
      axios.get('https://unzip-clab-api.clab.org.tw/activity-photo/dW5kZWZpbmVkLTE2ODI0MTc0NjgwNDM=.jpeg', {responseType: 'blob'}),
      axios.get('https://unzip-clab-api.clab.org.tw/api/v1/activities/443e7a5e-6d51-4d39-9bc0-fd71e579da09'),
      axios.get('https://unzip-clab-api.clab.org.tw/api/v1/works/87db0364-e198-4abb-b4e9-d6c3c70ebd68'),
      axios.get('https://unzip-clab-api.clab.org.tw/work-photo/1ae1a839-6db4-42f8-a6e3-831c59623ca7/MDIuU19fMjQxNjY0MTEuanBnLTE2MzMxNzA4MDYzNDgtMzU4Mw==.jpeg', {responseType: 'blob'}),
    ])
        // eslint-disable-next-line max-len
        .then(axios.spread( (response1, response2, response3, response4, response5, response6, response7, response8) => {
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
          const imageNode = document.getElementById('aboutImage');
          const imageNode2 = document.getElementById('aboutImage2');
          const imgUrl = URL.createObjectURL(response5.data);
          const imgUrl2 = URL.createObjectURL(response8.data);
          imageNode.src = imgUrl;
          imageNode2.src = imgUrl2;

          console.log(this.apiData1);
          console.log(this.apiData2);
          console.log(this.apiData3);
          console.log(this.apiData4);
          console.log(this.apiData5);
          console.log(this.apiData6);
          console.log(this.apiData7);
          console.log(this.apiData8);
        }));
  //  .catch(err=>{
  //    console.log(err.response);
  //    });
  },
  methods: {
    onFirstImageLoad() {
      this.isFirstImageLoaded = true;
    },
    onSecondImageLoad() {
      this.isSecondImageLoaded = true;
    },
    onThirdImageLoad() {
      this.isThirdImageLoaded = true;
    },
  },
  directives: {
    scrollReveal: {
      mounted(el) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              el.classList.add('reveal');
              observer.unobserve(el);
            }
          });
        }, { threshold: 0.1 });
        observer.observe(el);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
  .about {
    background-color: black;
    overflow-y: hidden;
  }
  .space_title{
    padding: 10px 0;
    position: relative;
    width: 100%;
    margin-left: 1em;
    margin-right: auto;
  }
  .title_background{
    width: 20%;
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: larger;
    background-color: #4A9EFF;
    color: black;
  }
  .hero-body{
    width: 100%;
    height: auto;
    background-color: rgb(255, 255, 255);
    display:block;
    position: relative;
    overflow: hidden;
  }
  .aboutImage{
    display: block;
    max-width: 100%;
    max-height: 100%;
    position: absolute;
    width: 100%;
    bottom: 0;
  }

  .container{
    max-width:90%;
    width: 100%;
    padding-right:var(--bs-gutter-x, .75rem);
    padding-left:var(--bs-gutter-x,.75rem);
    margin-right:auto;
    margin-left:auto;
  }
  .space_usage1{
    width: 40%;
    height:auto;
    padding: 10px;
    font-size:1.5em;
  }
  .about_space1{
    width: 60%;
    height: auto;
    right: 0;
    font-size:1.5em;
  }
  .about_space2{
    width: 60%;
    height:auto;
    right: 0;
    font-size:1.5em;
  }
  .space_usage2{
    width: 40%;
    height:auto;
    font-size:1.5em;
  }

  .container2{
    max-width:90%;
    width: 100%;
    padding-right:var(--bs-gutter-x, .75rem);
    padding-left:var(--bs-gutter-x,.75rem);
    margin-right:auto;
    margin-left:auto;
    padding:2rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 2rem;
  }
  .container3{
    max-width:90%;
    width: 100%;
    padding-right:var(--bs-gutter-x, .75rem);
    padding-left:var(--bs-gutter-x,.75rem);
    margin-right:auto;
    margin-left:auto;
    padding:2rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 2rem;
  }
  .space_img1{
    // .col-lg-4
    flex:0 0 auto;
    // width:33.33333333%;
    width:100%;
  }
  .col-lg-8{
    flex:0 0 auto;
    width:66.66666667%;
  }
  .row{
    --bs-gutter-x:1.5rem;
    --bs-gutter-y:0;
    display:flex;
    flex-wrap:wrap;
    margin-top:calc(var(--bs-gutter-y) * -1);
    margin-right:calc(var(--bs-gutter-x) * -.5);
    margin-left:calc(var(--bs-gutter-x) * -.5);
  }
  .section-padding{
    padding:10px 10px;
  }

  img{
    height:290px;
  }
  // .md-mb50{
  //   margin-bottom: 90px !important;
  // }
  .pg-about .bg-img{
    height:220px;
    background-size:cover;
    background-position:center center;
  }
  .slider{
    animation-name:future-vision-lab;
    animation-duration:150s;
    animation-iteration-count:infinite;
    animation-timing-function: linear;
    animation-delay: 0;
    display: flex;
  }
  .item{
    position: relative;
    padding: 0 30px;
    display: flex;
  }

  @keyframes future-vision-lab{
    0%{
      transform: translateX(0);
    }
    100%{
      transform: translateX(-100%);
    }
  }
  .videobox{
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
.space_imgs{
  width:70vw;
  height:40vh;
  display:flex;
  flex-direction: row;
  position: relative;
  justify-content: flex-start;
  margin-left:auto;
  margin-right: auto;
  margin-top:5rem;
  margin-bottom: 5rem;
  transition: all 0.5s ease;
}
.space_imgs:hover {
  .images {
    #aboutImage {
      transform: translateX(-20px) translateY(-10px);
    }
    #aboutImage2 {
      transform: translateX(20px) translateY(10px);
    }
  }
}
.images{
  width:50%;
  height:50%;
  position: relative;
  display: flex;
  align-items: center;
}
.space_img_info{
  color:#4A9EFF;
  width:50%;
  height:auto;
  display: flex;
  flex-direction: column;
  font-size:1.5em;
}
.read-more-link {
  text-decoration: none;
  display: inline-block;
}

.read-more {
  width: 10em;
  height: auto;
  background: #4A9EFF;
  color: #fff;
  border: none;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: center;
  font-weight: bolder;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 0 rgba(74, 158, 255, 0);
}

.read-more:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 15px rgba(74, 158, 255, 0.5),
              0 0 30px rgba(74, 158, 255, 0.3),
              0 0 45px rgba(74, 158, 255, 0.1);
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
}

.read-more::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%);
  transform: scale(0);
  transition: transform 0.5s ease;
  pointer-events: none;
}

.read-more:hover::before {
  transform: scale(1);
}

#aboutImage, #aboutImage2 {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 0 rgba(74, 158, 255, 0);
}

.space_imgs:hover {
  #aboutImage, #aboutImage2 {
    box-shadow: 0 0 20px rgba(74, 158, 255, 0.3),
                0 0 40px rgba(74, 158, 255, 0.2),
                0 0 60px rgba(74, 158, 255, 0.1);
  }
}

@media(max-width:2560px) {

}
@media(max-width:1920spx) {

}
@media(max-width:1280spx) {

}
@media only screen and (max-width:768px){
  .space_title{
    width:80%;
  }
 }
@media only screen and (max-width:728px){
  .container2{
    flex-direction: column;
  }
  .container3{
    flex-direction: column;
  }
  .space_usage1{
    width: 100%;
    // margin-left: 1em;
  }
  .space_usage2{
    width: 100%;
    // margin-left: 1em;
  }
  .space_imgs{
    width: 90vw;
    height: 50vh;
    flex-direction: column;
    align-items: center;
    justify-content:center;
    margin-top:2rem;
  }
  .space_imgs:hover {
    .images {
      #aboutImage {
        transform: translateX(-10px) translateY(-5px);
      }
      #aboutImage2 {
        transform: translateX(10px) translateY(5px);
      }
    }
  }
  .aboutImage{
    width: 100%;
    height: 100%;
  }
  .about_space1{
    width: 100%;
    font-size: 1.5em;
  }
  .about_space2{
    width: 100%;
    font-size: 1.5em;
  }
  .images{
    width: 100%;
    height:100%;
    left:10%;
  }
  .space_img_info{
    width:80%;
  }
}

.space_info {
  color: #4A9EFF;
  
  ul {
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  li {
    margin: 0;
    padding: 1.5rem 1.2rem;
    background: rgba(74, 158, 255, 0.22);
    transition: all 0.3s ease;
    font-size: 1.25em;
    box-shadow: 0 4px 24px 0 rgba(74, 158, 255, 0.13), 0 1.5px 6px 0 rgba(0,0,0,0.08);
    font-weight: 600;
  }

  li:hover {
    background: rgba(74, 158, 255, 0.28);
    transform: translateY(-4px) scale(1.03);
    box-shadow: 0 8px 32px 0 rgba(74, 158, 255, 0.18), 0 3px 12px 0 rgba(0,0,0,0.12);
  }
}

.info-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
  color: #4A9EFF;
}

.info-content {
  font-size: 1rem;
  color: azure;
  line-height: 1.4;
}

.space-title {
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 1.5rem;
}

.space-description {
  color: #fff;
  font-size: 1.1rem;
  line-height: 1.8;
  letter-spacing: 0.5px;
}

.space_usage1, .space_usage2 {
  width: 40%;
  height: auto;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
}

.about_space1, .about_space2 {
  width: 60%;
  height: auto;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  color: #fff;
}

.container2, .container3 {
  max-width: 90%;
  width: 100%;
  padding: 1.5rem;
  margin: 1.5rem auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1.5rem;
}

@media only screen and (max-width: 728px) {
  .space_info ul {
    grid-template-columns: 1fr;
  }

  .container2, .container3 {
    flex-direction: column;
    gap: 1rem;
  }

  .space_usage1, .space_usage2, .about_space1, .about_space2 {
    width: 100%;
    padding: 1rem;
  }

  .info-title, .info-content {
    font-size: 0.9rem;
  }
}

// 圖片加載動畫
.fade-in {
  animation: fadeInUp 0.8s ease-out forwards;
}

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

// 滾動顯示動畫
[class*="reveal"] {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
}

.reveal {
  opacity: 1;
  transform: translateY(0);
}

// 標題動畫
.space_title {
  .title_background {
    position: relative;
    overflow: hidden;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: #4A9EFF;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.6s cubic-bezier(0.5, 0, 0, 1);
    }
    
    &:hover::after {
      transform: scaleX(1);
    }
  }
}

// 信息卡片動畫
.space_info {
  li {
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, transparent, rgba(74, 158, 255, 0.1), transparent);
      transform: translateX(-100%);
      transition: transform 0.6s;
    }
    
    &:hover::before {
      transform: translateX(100%);
    }
  }
}

// 空間描述動畫
.space-description {
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: #4A9EFF;
    transition: width 0.6s cubic-bezier(0.5, 0, 0, 1);
  }
  
  &:hover::after {
    width: 100%;
  }
}

// 圖片懸停效果
.bg-img {
  img {
    transition: transform 0.6s cubic-bezier(0.5, 0, 0, 1);
    
    &:hover {
      transform: none;
    }
  }
}

// 按鈕動畫
.read-more {
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.2);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }
  
  &:hover::before {
    width: 300px;
    height: 300px;
  }
}

// 響應式動畫調整
@media only screen and (max-width: 728px) {
  .fade-in {
    animation-duration: 0.6s;
  }
  
  [class*="reveal"] {
    transform: translateY(20px);
  }
}

</style>
<style lang="css" scoped src="../bootstrap.min.css">
</style>

