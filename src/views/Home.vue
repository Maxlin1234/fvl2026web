<!-- eslint-disable max-len -->
<template>
  <section>
           <head>
              <title>Home Page</title>
                <meta charset="UTF-8">
               <meta name="viewport" content="width=device-width">
          </head>
          <nav-bar></nav-bar>
          <language-switch v-model="isEnglish"></language-switch>
             <section class="home" style="background-color:black;">
               <div class="animation" style="width: 100%;overflow: hidden;padding-top: 40px;">
                 <div class="slider">
                   <div class="item" style="position: relative;">
                     <h4 style="font-size:8vw;font-weight: 800;white-space:nowrap;color:transparent;-webkit-text-stroke: 0.8px #4A9EFF;">FUTURE VISION LAB</h4>
                   </div>
                   <div class="item" style="position: relative;">
                     <h4 style="font-size:8vw;font-weight: 800;white-space:nowrap;color: #4A9EFF;">FUTURE VISION LAB</h4>
                   </div>
                   <div class="item" style="position: relative;">
                     <h4 style="font-size:8vw;font-weight: 800;white-space:nowrap;color:transparent;-webkit-text-stroke: 0.8px #4A9EFF;">FUTURE VISION LAB</h4>
                   </div>
                   <div class="item" style="position: relative;">
                     <h4 style="font-size:8vw;font-weight: 800;white-space:nowrap;color: #4A9EFF;">FUTURE VISION LAB</h4>
                   </div>
                   <div class="item" style="position: relative;">
                     <h4 style="font-size:8vw;font-weight: 800;white-space:nowrap;color:transparent;-webkit-text-stroke: 0.8px #4A9EFF;">FUTURE VISION LAB</h4>
                   </div>
                 </div>
               </div>
               <div class="Gsap-container">
                  <three-js></three-js>
                  <div class="arrow">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
               </div>
               <div class="animation" style="width: 100%;overflow: hidden;margin-top: 1rem;">
                 <div class="slider">
                   <div class="item" style="position: relative;">
                     <h4 style="font-size:10vw;font-weight: 800;white-space:nowrap;color:transparent;-webkit-text-stroke: 0.8px #4A9EFF;">DOME</h4>
                   </div>
                   <div class="item" style="position: relative;">
                     <h4 style="font-size:10vw;font-weight: 800;white-space:nowrap;color: #4A9EFF;">DOME</h4>
                   </div>
                   <div class="item" style="position: relative;">
                     <h4 style="font-size:10vw;font-weight: 800;white-space:nowrap;color:transparent;-webkit-text-stroke: 0.8px #4A9EFF;">DOME</h4>
                   </div>
                   <div class="item" style="position: relative;">
                     <h4 style="font-size:10vw;font-weight: 800;white-space:nowrap;color: #4A9EFF;">DOME</h4>
                   </div>
                   <div class="item" style="position: relative;">
                     <h4 style="font-size:10vw;font-weight: 800;white-space:nowrap;color:transparent;-webkit-text-stroke: 0.8px #4A9EFF;">DOME</h4>
                   </div>
                  </div>
               </div>
               <div class="banner-box" style="position: relative;">
                <div class="fvl-logo">
                  <img class="fvl-logo-img" src="../assets/FVL.png" >
                  </div>
                  <TransitionGroup tag="div"
                  class="banner" :name="transitionName">
                     <div class="page" v-for="(img,index) of imgs" :key='index' v-show="index === show">
                         <template v-if="img.type === 'img'">
                            <img :src="img.src" style="height: 100%;height: 100%;width: 100%;object-fit: cover;" >
                         </template>

                         <template v-else-if="img.type === 'video'">
                          <!-- allow="encrypted-media" -->
                            <!-- <video controls autoplay muted :src="img.src" style="height: 100%; width: 100%; object-fit: cover;"></video> -->
                            <iframe :src="img.src"
                              allowfullscreen=""
                              allow="autoplay"
                              style="width: 100%;height: 100%;"></iframe>
                         </template>
                     </div>
                  </TransitionGroup>

                  <div class="button-box" style="display: flex;justify-content: center;align-items: center;margin-top: 1rem;" >
                        <button type="button" class="slider-btn slider-btn-left" @click="setShow(show-1)" style="z-index: 2;">
                          <i class="slider-icon slider-icon-left" aria-hidden="true"></i>
                        </button>
                        <button type="button" class="slider-btn slider-btn-right" @click="setShow(show+1)" style="z-index: 2;">
                          <i class="slider-icon slider-icon-right" aria-hidden="true"></i>
                        </button>

                           <span style="z-index: 3;position: absolute;top: 90%;">
                            <label id="mylb" v-for="num in imgs.length" :key="num-1"  @click="setShow(num-1)">
                            <input type="checkbox" style="display: none;">
                            </label>
                           </span>
                  </div>
                              <!-- <button  @click="setShow(show+1)" style="margin-left: 5px;">></button> -->
                </div>


                <div class="test-area">
                  <!-- Button Group -->
                  <div class="button-group">
                    <button 
                      v-for="(tab, index) in tabs" 
                      :key="index"
                      @click="activeTab = index"
                      :class="['tab-button', { active: activeTab === index }]"
                    >
                      {{ isEnglish ? tab.nameEn : tab.name }}
                    </button>
                  </div>

                  <!-- Content Area -->
                  <div class="tab-content-area">
                    <transition name="fade-tab" mode="out-in">
                      <div v-if="tabs[activeTab]" :key="activeTab" class="tab-content-block">
                        <div class="tab-content-flex">
                          <div class="tab-img-wrap">
                            <img :src="tabs[activeTab].img" alt="tab image" />
                          </div>
                          <div class="tab-text-wrap">
                            <h2 class="tab-title">{{ isEnglish ? tabs[activeTab].titleEn : tabs[activeTab].title }}</h2>
                            <p class="tab-desc">{{ isEnglish ? tabs[activeTab].descEn : tabs[activeTab].desc }}</p>
                          </div>
                        </div>
                      </div>
                    </transition>
                  </div>
                </div>
                    <!-- </div> -->

                    <!-- <hr style="border:0.1px solid gray"> -->

                 <div class="previews" style="z-index: 0;">

                          <div class="zoom-wrapper">
                          <div class="preview1">
                                 <div class="preview-darken"></div>
                                 <div class="preview__text">
                                    <h2 class="preview__text__header" >{{ isEnglish ? 'Original Programs' : '自製節目' }}</h2>
                                       <p class="preview__text__description">{{ isEnglish ? 'Experience our curated selection of original programs featuring innovative content and creative storytelling.' : '探索我們精心策劃的自製節目，展現創新內容與創意敘事。' }}</p>
                                        <button class="preview__text__link__btn default-btn">{{ isEnglish ? 'Read More' : '了解更多' }}</button>
                                  </div>
                                  <div class="preview__thumbnail" style="position: absolute;z-index: 1;">
                                </div>
                              </div>
                          </div>

                          <div class="zoom-wrapper">
                          <div class="preview2">
                                 <div class="preview-darken"></div>
                                 <div class="preview__text">
                                    <h2 class="preview__text__header" >{{ isEnglish ? 'Open Call Works' : '徵件作品' }}</h2>
                                       <p class="preview__text__description">{{ isEnglish ? 'Discover outstanding works selected through our open call program, showcasing diverse creative visions.' : '探索透過徵件計畫選出的優秀作品，展現多元創意視野。' }}</p>
                                        <button class="preview__text__link__btn default-btn">{{ isEnglish ? 'Read More' : '了解更多' }}</button>
                                  </div>
                                  <div class="preview__thumbnail" style="position: absolute;z-index: 1;">
                                </div>
                              </div>
                          </div>

                          <div class="zoom-wrapper">
                          <div class="preview3">
                                 <div class="preview-darken"></div>
                                 <div class="preview__text">
                                    <h2 class="preview__text__header" >FUTURE VISION LAB 2023</h2>
                                       <p class="preview__text__description">{{ isEnglish ? 'Explore the 2023 edition featuring innovative digital art installations and interactive experiences.' : '探索 2023 年版本，展示創新的數位藝術裝置與互動體驗。' }}</p>
                                        <button class="preview__text__link__btn default-btn">{{ isEnglish ? 'Read More' : '了解更多' }}</button>
                                  </div>
                                  <div class="preview__thumbnail" style="position: absolute;z-index: 1;">
                                </div>
                              </div>
                          </div>

                          <div class="zoom-wrapper">
                          <div class="preview4">
                                 <div class="preview-darken"></div>
                                 <div class="preview__text">
                                    <h2 class="preview__text__header" >DOME 1.0</h2>
                                       <p class="preview__text__description">{{ isEnglish ? 'An immersive dome experience showcasing cutting-edge visual and audio technologies.' : '沉浸式圓頂體驗，展現尖端視覺與音訊技術。' }}</p>
                                        <button class="preview__text__link__btn default-btn">{{ isEnglish ? 'Read More' : '了解更多' }}</button>
                                  </div>
                                  <div class="preview__thumbnail" style="position: absolute;z-index: 1;">
                                </div>
                              </div>
                          </div>


                          <div class="particles" style="position: absolute;z-index:-1;filter: blur(5px);opacity: 0.5;width: 100vw;height: 100vh;">
                             <ani-back></ani-back>
                          </div>

                       </div>

                       <hr style="color: aliceblue;">


        <!-- <div class="bottom-ul" style="margin-top: 4rem;">
          <ul  style="display: flex; justify-content: space-evenly;position: relative;">
            <li><a href="https://vuejs.org/v2/guide/">DOME 1.0</a></li>
            <li><a href="https://bulma.io/documentation/overview/start/">DOME 2.0</a></li>
            <li><a href="https://buefy.github.io/#/documentation/start">沈浸式場域</a></li>
            <li><a href="https://open-call.clab.org.tw/brd/fvl-2024/apply">徵件系統</a></li>
          </ul>
         </div> -->
         <info-bar></info-bar>
        <foot-bar></foot-bar>
  </section>
  </section>
</template>

<script>

// import "../jquery.js";
import axios from 'axios';
import '../parallaxedEffect.js';
import {ThreeJs} from '../components';
import {FootBar} from '../components';
import {Anibackground} from '../components';
import {InfoBar} from '../components';
import {LanguageSwitch} from '../components';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {TextPlugin} from 'gsap/dist/TextPlugin.js';
// eslint-disable-next-line no-unused-vars
import {NavBar} from '../components';
// eslint-disable-next-line no-unused-vars
let timer;
const interval = 4000;
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  components: {
    'three-js': ThreeJs,
    'foot-bar': FootBar,
    'info-bar': InfoBar,
    'nav-bar': NavBar,
    'ani-back': Anibackground,
    'language-switch': LanguageSwitch,
  },
  data() {
    return {
      slideData: [],
      welfare: [
        {title: '優渥獎金'},
        {title: '貼心補助'},
        {title: 'OJT培訓'},
        {title: '多元福利'},
        {title: '完善制度'},
        {title: '舒適環境'},
      ],
      transitionName: 'left-in',
      show: 0,
      msg: 'A quick-start vue.js frontend development template.',
      imgs: [
        {type: 'img', src: './imgs/1.jpeg'},
        {type: 'img', src: './imgs/2.jpeg'},
        {type: 'img', src: './imgs/3.jpeg'},
        // {type:'video',src:'./imgs/4.mp4'},
        {type: 'video', src: 'https://www.youtube.com/embed/videoseries?autoplay=1&mute=1&loop=1&playlist=videoseries;si=fCFjJb6JtgHHtucM&amp;list=PLXJ_MjvcL-q5V-vae8rmre2Rz4ZTjB6gF'},
        // {type:'video',src:'./imgs/FVL2023.mp4'}
        {type: 'video', src: 'https://www.youtube.com/embed/yM-Q5qNNVbM?autoplay=1&mute=1&loop=1&playlist=yM-Q5qNNVbM;si=yX0PfbGKm9-szmuE'},
      ],
      schedules: [],
      apiData1: {},
      apiData2: {},
      apiData3: {},
      apiData4: {},
      apiData5: {},
      apiData6: {},
      apiData7: {},
      apiData8: {},
      apiData9: {},
      apiData10: {},
      apiData11: {},
      apiData12: {},
      apiData13: {},
      apiData14: {},
      apiData15: {},
      activeTab: 0,
      isEnglish: false,
      tabs: [
        {
          name: '藝術節',
          nameEn: 'Festival',
          title: '2024藝術節',
          titleEn: '2024 Festival',
          img:  './imgs/1.jpeg',
          desc: '邁入第廿六屆的臺北藝術節即將於八月二日至九月八日登場，今年主題為「時間博物館」，包括十檔售票、一檔免費節目、二場免費駐地研究分享、共計十四場次的演出。參演藝術家來自日本、法國、比利時、泰國、臺灣，從不同角度、以不同形式，展現看待及處理歷史的多元角度。',
          descEn: 'The 26th Taipei Arts Festival will take place from August 2 to September 8, with the theme "Museum of Time," featuring ten ticketed programs, one free program, and two free residency research sharings, totaling fourteen performances. Participating artists from Japan, France, Belgium, Thailand, and Taiwan will showcase diverse perspectives on viewing and processing history through different forms.'
        },
        {
          name: '購票資訊',
          nameEn: 'Ticketing',
          title: '購票說明',
          titleEn: 'Ticketing Information',
          img:'./imgs/2.jpeg',
          desc: '購票請至官方網站或合作通路，早鳥優惠至6/30止。現場購票請洽服務台。',
          descEn: 'Tickets are available on the official website or partner channels. Early bird discounts are valid until 6/30. For on-site purchases, please visit the service desk.'
        },
        {
          name: '關於藝術節',
          nameEn: 'About',
          title: '關於臺北藝術節',
          titleEn: 'About Taipei Arts Festival',
          img: './imgs/3.jpeg',
          desc: '臺北藝術節自1998年創辦以來，致力於推動當代表演藝術，成為亞洲重要的藝術平台。',
          descEn: 'Since its establishment in 1998, Taipei Arts Festival has been dedicated to promoting contemporary performing arts, becoming an important artistic platform in Asia.'
        }
      ],
    };
  },

  methods: {
    setShow(index) {
      this.show = index;
    },
    nextShow() {
      this.show ++;
    },

    slideCtrl(slidesToShow = 1) {
      if (slidesToShow > 0 ) {
        const shiftItem = this.slideData.shift();
        this.slideData.push(shiftItem);
        return;
      }
      if (slidesToShow <0) {
        const shiftItem = this.slideData.pop();
        this.slideData.unshift(shiftItem);
      }
    },

  },
  watch: {
    show(nVal, oVal) {
      if (nVal<0) {
        this.show = this.imgs.length -1;
      } else if (nVal > this.imgs.length -1) {
        this.show = 0;
      } else {
        if (oVal < 0 ) this.transitionName = 'left-in';
        else if (oVal > this.imgs.length -1 ) this.transitionName = 'right-in';
        else this.transitionName = nVal>oVal ?'right-in' : 'left-in';
      }
    },
  },


  onMounted() {
    parallaxie('.back-image.parallaxie');
  },
  mounted() {
    // ----------自動輪播----------------

    timer = setInterval(this.nextShow, interval);

    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(TextPlugin);

    gsap.to('#heading', {
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: '.tg-use',
        start: 'top 40%',
        end: 'top 30%',
        scrub: 4,
        // markers: {
        //   startColor: 'orange',
        //   endColor: 'blue',
        //   fontSize: '2rem',
        // },
      },
    }),
    gsap.to('.arrow', {
      opacity: 0,
      duration: 0.5,
      scrollTrigger: {
        trigger: '.tg-use',
        start: 'top 40%',
        end: 'top 30%',
        scrub: 4,
        // markers: {
        //   startColor: 'orange',
        //   endColor: 'blue',
        //   fontSize: '2rem',
        // },
      },
    }),
    // eslint-disable-next-line max-len
    // -pin--------------------------------------------------------------------------------------------------------------------------
    gsap.to('.gsap-container', {
      scrollTrigger: {
        trigger: '.gsap-container',
        start: 'bottom 100%',
        end: '+=2000',
        scrub: true,
        pin: true,
      // markers:{
      //   startColor:"orange",
      //   endColor:"blue",
      //   fontSize:"2rem"
      // }
      },
    }),
    gsap.to('#my-text', {
      text: {
        value:
   // eslint-disable-next-line max-len
   '空總C-LAB科技媒體實驗平台今年所推出的DOME穹頂展演實驗場，以演算生成的數位建築外型，突破之前直徑12公尺尺度，打造直徑15公尺全臺唯一巨型移動式戶外穹頂劇場，並強化包覆式聲場及雙層影像配置構造，使內部空間擴大到能容納百人。新型態投影膜片、超高解析沉浸影像空間，總運算解析將達22K，搭配臺灣聲響實驗室升級聲響系統打造沉浸聲場，讓視覺、聲響與藝術家的內容創作同步整合，打造接軌國際規格的創作環境。',
      },
      scrollTrigger: {
        trigger: '.tg-use',
        start: 'top 40%',
        end: 'top 30%',
        toggleActions: 'play none restart none',
      //   markers:{
      //   startColor:"red",
      //    endColor:"blue",
      //   fontSize:"2rem"
      //  }
      },
    });
    gsap.to('#my-text', {
      duration: 0.5,
      text:
  {
    // eslint-disable-next-line max-len
    value: '科技媒體實驗平台「未來視覺實驗室」技術總監蔡奇宏演算影像創作，搭配柯智豪聲音創作，延續去年Re-Generative演算藝術為核心方向，以反應擴散演算（Reaction Diffusion）、萬花筒（Kaleidoscope）進行演算實驗。在本次展演中著重觀眾身體的互動性以及聲音的體驗，透過耳機封閉特性表現更突出的沉浸聲響體驗，根據觀眾在空間中遊走的狀態即時改變影像，創造演算藝術有機生成實驗。 同時運用國家實驗研究院國家高速網路與計算中心的雲端高速算力，以及遠端GPU加速桌面技術，挑戰反應擴散演算在高解析影像運算呈現的可能性。透過科技媒體實驗平台組成跨領域團隊，除了展演的穹形軟硬體整合技術的專業展現，也透過穹形的特殊觀感，以視覺和聲響衝擊觀眾的身體感知。',
  },
      scrollTrigger: {
        trigger: '.tg-use',
        start: 'top 20%',
        end: 'top 10%',
        toggleActions: 'play none none reverse',
      //    markers:{
      //   startColor:"green",
      //    endColor:"yellow",
      //   fontSize:"2rem"
      //  }
      },
    });


    // -------------------------
    axios.all([

      axios.get('https://unzip-clab-api.clab.org.tw/api/v1/schedules?search=%E5%B4%A9%E5%A1%8C%E8%A8%98%E6%86%B6%E4%B9%8B%E5%AE%AE&limit=25'),
      axios.get('https://unzip-clab-api.clab.org.tw/api/v1/schedules/4'),
      axios.get('https://unzip-clab-api.clab.org.tw/api/v1/works/6162e143-f315-4a45-a9b4-830c8b3d8704'),
      axios.get('https://unzip-clab-api.clab.org.tw/activity-photo/dW5kZWZpbmVkLTE2OTE1NzcyMTAyMzA=.jpeg', {responseType: 'blob'}),
      axios.get('https://unzip-clab-api.clab.org.tw/work-photo/87db0364-e198-4abb-b4e9-d6c3c70ebd68/RFNDXzMyNjQuanBlZy0xNjMzMTY4NDQzNzYwLTY5NjE=.jpeg', {responseType: 'blob'}),
      axios.get('https://unzip-clab-api.clab.org.tw/api/v1/activities/443e7a5e-6d51-4d39-9bc0-fd71e579da09'),
      axios.get('https://unzip-clab-api.clab.org.tw/api/v1/works/87db0364-e198-4abb-b4e9-d6c3c70ebd68'),
      axios.get('https://unzip-clab-api.clab.org.tw/work-photo/a1a593a6-c6ba-4c8f-8663-1ee9d72252d3/Q29weSBvZiBEb21lX0EuanBnLTE2MzMxNzEyMDA3MDctMzE0Mw==.jpeg', {responseType: 'blob'}),
      axios.get('https://unzip-clab-api.clab.org.tw/activity-photo/dW5kZWZpbmVkLTE2ODI0MTc0NjgwNDM=.jpeg', {responseType: 'blob'}),
      axios.get('https://unzip-clab-api.clab.org.tw/work-photo/c466f454-5e67-4381-8270-849cbce0d32d/aG8xLnBuZy0xNjM0NDU5ODAyMTM5LTcwMjk=.png', {responseType: 'blob'}),
      axios.get('https://unzip-clab-api.clab.org.tw/work-photo/10bc58ce-4d41-403d-89a1-e14317573272/MDI5Ny5qcGctMTYzNDQ1OTg0ODMwOC00NTY3.jpeg', {responseType: 'blob'}),
      axios.get('https://unzip-clab-api.clab.org.tw/work-photo/87db0364-e198-4abb-b4e9-d6c3c70ebd68/X+WEquWFiOS9v+eUqOmAmeW8tV9GVkwtMDEuanBnLTE2MzMxNjg0NDM0MTYtNjkxOQ==.jpeg', {responseType: 'blob'}),
      axios.get('https://unzip-clab-api.clab.org.tw/work-photo/0d46014e-4453-4cac-a2de-de19633c5e0c/MS5qcGctMTYzMzE2ODE3OTY2MC01OTAw.jpeg', {responseType: 'blob'}),
      axios.get('https://unzip-clab-api.clab.org.tw/work-photo/a80d9658-dbf7-45be-bb50-9642899f6212/56ys5LqM57WELmpwZy0xNjMzMTY4NzM5OTI1LTU1Mzc=.jpeg', {responseType: 'blob'}),
      axios.get('https://unzip-clab-api.clab.org.tw/work-photo/a09ec314-2939-4b06-8fa1-178b5f5ea6ea/QkFOU0hBTjMucG5nLTE2MzQ0NjE5MDI1NzItODMyMw==.png', {responseType: 'blob'}),
      axios.get('https://unzip-clab-api.clab.org.tw/work-photo/1ae1a839-6db4-42f8-a6e3-831c59623ca7/MDIuU19fMjQxNjY0MTEuanBnLTE2MzMxNzA4MDYzNDgtMzU4Mw==.jpeg', {responseType: 'blob'}),
    ])
        // eslint-disable-next-line max-len
        .then(axios.spread( (response1, response2, response3, response4, response5, response6, response7, response8, response9, response10, response11, response12, response13, response14, response15, response16) => {
          //  const reader = FileReader();
          // 宣告Filereader
          this.apiData1 = response1.data;
          this.apiData2 = response2.data;
          this.apiData3 = response3.data;
          this.apiData4 = response4.data;
          this.apiData5 = response5.data;
          this.apiData6 = response6.data;
          this.apiData7 = response7.data.work_zh.proposal;
          this.apiData8 =response8.data;
          this.apiData9 =response9.data;
          this.apiData10 =response10.data;
          this.apiData11 =response11.data;
          this.apiData12 =response12.data;
          this.apiData13 =response13.data;
          this.apiData14 =response14.data;
          this.apiData14 =response15.data;
          this.apiData14 =response16.data;


          const imageNode = document.getElementById('image');
          const imageNode2 = document.getElementById('image2');
          const imageNode3 = document.getElementById('image3');
          const imageNode4 = document.getElementById('image4');
          const imageNode5 = document.getElementById('image5');
          const imageNode6 = document.getElementById('image6');
          const imageNode7 = document.getElementById('image7');
          const imageNode8 = document.getElementById('image8');
          const imageNode9 = document.getElementById('image9');
          const imageNode10 = document.getElementById('image10');
          const imageNode11 = document.getElementById('image11');

          const imgUrl = URL.createObjectURL(response4.data);
          const imgUrl2 = URL.createObjectURL(response5.data);
          const imgUrl3 = URL.createObjectURL(response8.data);
          const imgUrl4 = URL.createObjectURL(response9.data);
          const imgUrl5 = URL.createObjectURL(response10.data);
          const imgUrl6 = URL.createObjectURL(response11.data);
          const imgUrl7 = URL.createObjectURL(response12.data);
          const imgUrl8 = URL.createObjectURL(response13.data);
          const imgUrl9 = URL.createObjectURL(response14.data);
          const imgUrl10 = URL.createObjectURL(response15.data);
          const imgUrl11 = URL.createObjectURL(response16.data);

          imageNode.src = imgUrl;
          imageNode2.src = imgUrl2;
          imageNode3.src = imgUrl3;
          imageNode4.src = imgUrl4;
          imageNode5.src = imgUrl5;
          imageNode6.src = imgUrl6;
          imageNode7.src = imgUrl7;
          imageNode8.src = imgUrl8;
          imageNode9.src = imgUrl9;
          imageNode10.src = imgUrl10;
          imageNode11.src = imgUrl11;


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
          console.log(this.apiData11);
          console.log(this.apiData12);
          console.log(this.apiData13);
          console.log(this.apiData14);
          console.log(this.apiData15);
          console.log(this.apiData16);
        }))
        .catch((err)=>{
          console.log(err.response);
        });
  },
};
</script>

<style lang="scss" scoped>


// --------------banner----------



.banner-box {
  width: 100%;
  height: 80vh;  // 改為視窗高度的 80%
  min-height: 600px;  // 設置最小高度
  max-height: 900px;  // 設置最大高度
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner-content {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fvl-logo-img{
  position: absolute;
  z-index: 1;
  width: 50%;
  height: auto;
  display: flex;
  top: 0;
  align-items: center;
}
.banner{
  position: relative;
  width:100%;
  height:300px;
  margin: 0 auto;
  overflow:hidden;
  object-fit: cover;
}
//////arrow//////////
.arrow {
    position: absolute;
    opacity:1;
    top: 80%;
    left: 50%;
    z-index:3;
    transform: translate(-50%, -50%);
    transform: rotate(0deg);
    cursor: pointer;
}

.arrow span {
    display: block;
    width: 1.5vw;
    height: 1.5vw;
    border-bottom: 5px solid white;
    border-right: 5px solid white;
    transform: rotate(45deg);
    margin: -10px;
    animation: animate 2s infinite;
}

.arrow span:nth-child(2) {
    animation-delay: -0.2s;
}

.arrow span:nth-child(3) {
    animation-delay: -0.4s;
}

@keyframes animate {
    0% {
        opacity: 0;
        transform: rotate(45deg) translate(-20px, -20px);
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        transform: rotate(45deg) translate(20px, 20px);
    }
}


.page{
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  height:100%;
  overflow-x: hidden;
}
.right-in-enter{
    left: 100%;
}
.right-in-enter-active,.right-in-leave-active{
   transition: left 0.5s;
}
.right-in-enter-to,.right-in-leave{
     left: 0%;
}
.right-in-leave-to{
     left:-100%;
}

// -----------------------------
.slider-btn-left,
.slider-btn-right {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
}

.slider-btn-left {
  left: 20px;
}

.slider-btn-right {
  right: 20px;
}

.slider-btn-left:hover,
.slider-btn-right:hover {
  background: rgba(74, 158, 255, 0.2);
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 0 20px rgba(74, 158, 255, 0.5);
}

.slider-icon {
    display: inline-block;
    width: 20px;
    height: 20px;
  border-left: 3px solid white;
  border-bottom: 3px solid white;
  transition: all 0.3s ease;
}

.slider-icon-left {
  transform: rotate(45deg);
}

.slider-icon-right {
  transform: rotate(-135deg);
}

.slider-btn-left:hover .slider-icon,
.slider-btn-right:hover .slider-icon {
  border-color: rgba(74, 158, 255, 0.8);
  filter: drop-shadow(0 0 8px rgba(74, 158, 255, 0.8));
}

// ------left----------

.left-in-enter{
    left: -100%;
}
.left-in-enter-active,.left-in-leave-active{
   transition: left 2s;
}
.left-in-enter-to,.left-in-leave{
     left: 0%;
}
.left-in-leave-to{
     left:100%;
}


// ------left----------
.right-arrow{
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}
// --------------banner----------


.additional-bar {
  padding: 15px;
}
.gh-btn {
  background-color: #232323;
  background-repeat: no-repeat;
  border: 1px solid #d5d5d5;
  border-radius: 4px;
  color: #333;
  text-decoration: none;
  text-shadow: 0 1px 0 #fff;
  white-space: nowrap;
  cursor: pointer;
}
.image-container{
  margin-bottom: auto;
  background-color: aqua;

}

.gdlr-core-title-item-title{
    animation: fade 0.5s linear;
}
@keyframes fade {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
.gdlr-core-title-item-caption{
  animation: fade 0.5s linear;
}
@keyframes fade {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
.about-future-vision{
  animation: fade 0.5s linear;
}
@keyframes fade {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
.gdlr-core-text-box-item-content{
  animation: fade 0.5s linear;
}
@keyframes fade {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}


.flex-col{
  flex-direction:column
}
.md\:flex{
  display:flex;
}
.grid-cols-1{
  grid-template-columns:repeat(1, minmax(0, 1fr));
}
.grid-cols-2{
  grid-template-columns:repeat(2, minmax(0, 1fr));
}
.md\:grid-cols-5{
  // grid-template-columns:repeat(5, minmax(0, 1fr));
  grid-template-columns:repeat(2, minmax(0, 1fr));
}
.gap-4{
  gap:1rem;
}
.grid-cols-1{
  grid-template-columns:repeat(1, minmax(0, 1fr));
}
.relative{
  position:relative
}
.grid{
  display: grid;
}
.mb-8{
  margin-bottom:2rem;
}
.rounded-xl{
  border-radius:0.75rem;
}
.img{
  // display:block;
  vertical-align: middle;
}
.img{
  max-width:100%;
  // height:auto;
}
.md\:hidden{
  display:grid;
}
.hidden{
  display: none;
}

.previews{
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-content:center;
  opacity: 1;
  align-items: center;
  margin: 0 0 1rem 0;
  position: relative;
}


.preview1 {
  position: absolute;
  z-index: 0;
  top:0%;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background:transparent;
  background-image: url(https://unzip-clab-api.clab.org.tw/work-photo/9e6308aa-a89e-483b-b344-8d345c398e0c/268f674956c1bafd996b828cc06f731b5dba-1719481468335.jpeg);
  background-size:cover;
  background-position: top center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction:row;
  object-fit: cover;
  align-items: center;
  overflow: hidden;
  opacity:1;
  font-size: 1em;
  transition:transform 0.8s;
}
.preview1:hover{
  .preview__text{
    opacity: 1;
  }
//   .preview__thumbnail{
//     height: 100%;
//  opacity: 1;
//   }
  transform: scale(1.2);
}

.particles {
  transform-origin: center;
  transition: transform 0.8s;
}

.zoom-wrapper:hover ~ .particles,
.preview1:hover ~ .particles,
.preview2:hover ~ .particles,
.preview3:hover ~ .particles,
.preview4:hover ~ .particles {
  transform: scale(1.2);
}

.preview-darken {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.0); // 預設透明
  pointer-events: none;
  transition: background 0.4s;
  z-index: 2;
}
.preview1:hover .preview-darken {
  background: rgba(0,0,0,0.5); // hover 時變暗
}
.preview2 {
  position: absolute;
  z-index: 0;
  top:0%;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background:transparent;
  background-image: url(https://unzip-clab-api.clab.org.tw/work-photo/6aeeae59-5582-4b1a-a2f1-c02c73fb5de5/a898953523ad2387e30b67c602326b399bf6-1719481885239.jpeg);
  background-size:cover;
  background-position: top center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction:row;
  object-fit: cover;
  align-items: center;
  overflow: hidden;
  opacity:1;
  font-size: 1rem;
  transition:transform 0.8s;
}
.preview2:hover .preview-darken {
  background: rgba(0,0,0,0.5); // hover 時變暗
}


.zoom-wrapper{
  height:250px;
  display: flex;
  justify-content: center;
  width: 80%;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  overflow: hidden;
  position: relative;
  // border-radius:25px;
}

.preview3 {
  position: absolute;
  z-index: 0;
  top:0%;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background:transparent;
  background-image: url(https://unzip-clab-api.clab.org.tw/work-photo/a80d9658-dbf7-45be-bb50-9642899f6212/56ys5LqM57WELmpwZy0xNjMzMTY4NzM5OTI1LTU1Mzc=.jpeg);
  background-size:cover;
  background-position: top center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction:row;
  object-fit: cover;
  align-items: center;
  overflow: hidden;
  opacity:1;
  font-size: 1rem;
  transition:transform 0.8s;
}
.preview3:hover{
  transform: scale(1.2);
}
.preview3:hover .preview-darken {
  background: rgba(0,0,0,0.5); // hover 時變暗
}

.preview__text{
  position: absolute;
  z-index: 2;
}
.preview__text__header{
  color: white;
  font-size: 1.5em;
  font-weight: bolder;
}
.preview__text__description{
  color: white;
  width: 80%;

}
.preview4 {
  position: absolute;
  z-index: 0;
  top:0%;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background:transparent;
  background-image: url(https://unzip-clab-api.clab.org.tw/work-photo/a1a593a6-c6ba-4c8f-8663-1ee9d72252d3/Q29weSBvZiBEb21lX0IuanBnLTE2MzMxNzEyMDI4NjEtNzg3Nw==.jpeg);
  background-size:cover;
  background-position: top center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction:row;
  object-fit: cover;
  align-items: center;
  overflow: hidden;
  opacity:1;
  font-size: 1em;
  transition:transform 0.8s;
}
.preview4:hover .preview-darken {
  background: rgba(0,0,0,0.5); // hover 時變暗
}

.preview__thumbnail{
  width:100%;
  height: 0%;
  background: rgb(0, 0, 0);
  opacity:0.8;
  transition: height 1s;
  // filter: blur(30px);

}
.preview:hover{
  .preview__text{
    opacity: 1;
  }
  transform: scale(1.2);
}
.preview2:hover{
//   .preview__thumbnail{
//     height: 100%;
//  opacity: 1;
//   }
  transform: scale(1.2);
}

.preview4:hover{
  .preview__text{
    opacity: 1;
  }
//   .preview__thumbnail{
//     height: 100%;
//  opacity: 1;
//   }
  transform: scale(1.2);
}

.preview__text{
  width: 80%;
   margin-left: 20%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  opacity: 1;
  transition: opacity 1s linear;
}

.preview2:hover{
  .preview__text{
    opacity: 1;
  }
}
.preview3:hover{
  .preview__text{
    opacity: 1;
  }
//   .preview__thumbnail{
//     height: 100%;
//  opacity: 1;
//   }
}
.preview4:hover{
  .preview__text{
    opacity: 1;
  }
}

.preview__text__link__btn{
  background-color:rgb(255, 255, 255);
  border-radius: 30px;
  transition:all 0.3s linear;
  color: black;

}
.preview__text__link__btn:hover{
  background-color: rgb(39, 100, 255);
  color:white !important;
}
.default-btn{
  text-transform:uppercase;
  font-weight:600;
  font-size: 0.6rem;
  line-height:0.5rem;
  letter-spacing: 0.1rem;
  padding:0.7rem 0.7rem;
  border: none;
  cursor: pointer;
  margin-top: 1rem;
}
.default-btn:hover{
  color: #232323;
}
label {
  background: #CCC;
  display: inline-block;
  cursor: pointer;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  margin-left: 5px;

}
 label:hover{
  background-color: #333;
 }
input[type=checkbox]:checked{
    label{
      background:black;
    }
}

// -------------slider2----------------
.slide{
    width: 100%;
    overflow: hidden;
}
.slide-list{
  display: flex;
  list-style-type: none;
  padding: 0;
}
.slide-article{
  background-color: #eee;
  padding-top: 10px;
  height: 100%;
  margin: 10px;
  border-radius: 10px;
}
.slide-ctrl{
  margin-top: 3rem;
 display: flex;
 align-items: center;
 justify-content: center;
}
.slide-prev,
.slide-next{
   width: 150px;
   display: inline-block;
   background-color: #c0c0c0;
   color: #fff;
   margin: 0 10px;
   padding:5px 15px;
   border-radius: 50px;
   cursor: pointer;
   &:hover{
    color: rgb(68, 68, 68);
   }

}
.square{
  width: 150px;
  height: 150px;
  background-color: coral;
}
.pin-spacer{
  margin-bottom:0 !important;
}

@media (max-width:2560px){
  .zoom-wrapper{
    height: 400px !important;
  }
  .preview1{
    font-size:1.5em !important;
  }
  .preview2{
    font-size:1.5em !important;
  }
  .preview3{
    font-size:1.5em !important;
  }
  .preview4{
    font-size:1.5em !important;
  }
}
@media (max-width:1920px){
  .preview1{
    font-size:1em !important;

  }
  .preview2{
    font-size:1em !important;

  }
  .preview3{
    font-size:1em !important;
  }
  .preview4{
    font-size:1em !important;
  }
}
@media(max-width:920px) {
}
@media(max-width:768px) {
  .slider h4 {
    font-size: 12vw !important;
  }
  .zoom-wrapper{
    width:90% !important;
    border-radius: 25px;
  }
}
@media(max-width:720px) {
  .slider h4 {
    font-size: 14vw !important;
  }
}
@media(max-width:414px) {
  .slider h4 {
    font-size: 16vw !important;
  }
}
@media(max-width: 375px) {
  .slider h4 {
    font-size: 18vw !important;
  }
}


@media only screen and (max-width:1024px) {
    .section {
       padding: 3rem 1rem;
    }
  }

@media only screen and (min-width:1024px) {
    .section {
       padding: 3rem 0rem;
    }
  }

  /////////////
@media only screen and (min-width:850px) {
    .banner {
        height:600px;
        width: 100%;
    }
    .preview__text_header{
      font-size: 1rem;
    }
  }
  @media only screen and (max-width:720px) {
    .fvl-logo-img{
      top: 5%;
      width: 70%;
    }
    .preview__text_header{
      font-size: 1rem;
    }
    .preview__text_descriptiion{
      width: 50%;
    }
    .arrow span{
      width:5vw;
      height:5vw;
    }

  }


// -------------slider2----------------

.hero-body {
  width: 100%;
  height: auto;
  background-color: rgb(255, 255, 255);
  display: block;
  position: relative;
  overflow: hidden;
}

.hero-body h1 {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 1rem;
}

.hero-body p {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.hero-body .subtitle {
  font-size: 16px;
  line-height: 1.6;
}

.hero-body .title {
  font-size: 32px;
  font-weight: bold;
}

.hero-body .is-size-4 {
  font-size: 32px !important;
  font-weight: bold;
}

.hero-body .is-size-5 {
  font-size: 16px !important;
  line-height: 1.6;
}

.hero-body .is-size-6 {
  font-size: 16px !important;
  line-height: 1.6;
}

@media(max-width:3840px) {
  .hero-body h1 {
    font-size: 32px;
  }
  .hero-body p {
    font-size: 16px;
  }
  .hero-body .subtitle {
    font-size: 16px;
  }
  .hero-body .title {
    font-size: 32px;
  }
  .hero-body .is-size-4 {
    font-size: 32px !important;
  }
  .hero-body .is-size-5 {
    font-size: 16px !important;
  }
  .hero-body .is-size-6 {
    font-size: 16px !important;
  }
}

@media(max-width:2560px) {
  .hero-body h1 {
    font-size: 32px;
  }
  .hero-body p {
    font-size: 16px;
  }
  .hero-body .subtitle {
    font-size: 16px;
  }
  .hero-body .title {
    font-size: 32px;
  }
  .hero-body .is-size-4 {
    font-size: 32px !important;
  }
  .hero-body .is-size-5 {
    font-size: 16px !important;
  }
  .hero-body .is-size-6 {
    font-size: 16px !important;
  }
}

@media(max-width:1920px) {
  .hero-body h1 {
    font-size: 32px;
  }
  .hero-body p {
    font-size: 16px;
  }
  .hero-body .subtitle {
    font-size: 16px;
  }
  .hero-body .title {
    font-size: 32px;
  }
  .hero-body .is-size-4 {
    font-size: 32px !important;
  }
  .hero-body .is-size-5 {
    font-size: 16px !important;
  }
  .hero-body .is-size-6 {
    font-size: 16px !important;
  }
}

@media(max-width:1280px) {
  .hero-body h1 {
    font-size: 32px;
  }
  .hero-body p {
    font-size: 16px;
  }
  .hero-body .subtitle {
    font-size: 16px;
  }
  .hero-body .title {
    font-size: 32px;
  }
  .hero-body .is-size-4 {
    font-size: 32px !important;
  }
  .hero-body .is-size-5 {
    font-size: 16px !important;
  }
  .hero-body .is-size-6 {
    font-size: 16px !important;
  }
}

.slider {
  animation-name: future-vision-lab;
  animation-duration: 60s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-delay: 0;
  display: flex;
  white-space: nowrap;
}

.item {
  position: relative;
  padding: 0 30px;
  display: flex;
  flex-shrink: 0;
}

@keyframes future-vision-lab {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

.test-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1rem;
  background: transparent;
}

.button-group {
  display: flex;
  gap: 2rem;
  margin-bottom: 2.5rem;
  justify-content: center;
}

.tab-button {
  padding: 0.8rem 2.2rem;
  border: none;
  border-radius: 30px;
  background-color: #222;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  opacity: 0.7;
}

@media only screen and (max-width: 768px) {
  .tab-button {
    font-size: 1em;
  }
}

.tab-button.active {
  background: #fff;
  color: #222;
  opacity: 1;
  box-shadow: 0 2px 12px rgba(74,158,255,0.08);
}

.tab-button:hover {
  opacity: 1;
}

.tab-content-area {
  width: 100%;
  max-width: 900px;
  display: flex;
  justify-content: center;
}

.tab-content-block {
  width: 100%;
  background: transparent;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  padding: 2.5rem 2rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeIn 0.4s;
}

.tab-content-flex {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 2.5rem;
  width: 100%;
}

.tab-img-wrap {
  flex: 0 0 260px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-img-wrap img {
  width: 450px;
  height: 250px;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.tab-text-wrap {
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.tab-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1.2rem;
  color: #ffffff;
}

.tab-desc {
  font-size: 1.1rem;
  color: #ffffff;
  line-height: 1.8;
}

@media (max-width: 700px) {
  .tab-content-flex {
    flex-direction: column;
    gap: 1.2rem;
    align-items: center;
  }
  .tab-img-wrap img {
    width: 100%;
    max-width: 320px;
    height: 180px;
  }
  .tab-title {
    font-size: 1.3rem;
  }
  .tab-content-block {
    padding: 1.2rem 0.5rem;
  }
}

// 淡入淡出動畫 for tab
.fade-tab-enter-active, .fade-tab-leave-active {
  transition: opacity 0.4s cubic-bezier(0.4,0,0.2,1);
}
.fade-tab-enter {
  opacity: 0;
}
.fade-tab-leave-to {
  opacity: 0;
}

// Gsap-container 和 footer 之间的间距
.Gsap-container {
  margin-bottom: 4rem;
}

.previews {
  margin-bottom: 5rem !important;
}

.home > :deep(info-bar),
.home > :deep(foot-bar) {
  margin-top: 3rem;
}

</style>

