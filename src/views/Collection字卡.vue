<!-- eslint-disable max-len -->
<!-- eslint-disable max-len -->
<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable max-len -->
<template>
  <div class="about">
    <!-- <nav-bar></nav-bar> -->
    <section style="position: relative;">
      <div class="info-box" v-if="hoveredText !== null">
          <div class="fvl_box">
          <div class="collection_font" v-if="!isMobile">
            <h2>FUTURE VISION LAB</h2>
            <div class="dome_title" style="z-index:1000;">
            <div class="dome">
              <h1
              style="color:rgb(215, 215, 215);
              font-size: 2em;
              margin: 0px;
              font-weight:800;">COLLECTION</h1>
            </div>
            <div class="shadow">
              <h1
              style="color: transparent;
              font-size: 2em;
              margin: 0px;
              font-weight:800;
              transform: scale(1, -1);
              background: linear-gradient(to top, #000000, #45f5a8, #ffaf7b);
              background-clip: text;margin-top: 1.5rem;">COLLECTION</h1>
            </div>
      </div>

            </div>
          </div>

          <div class="mobile" v-if="isMobile" style="display: flex;flex-direction: column;align-items: center;gap:10px;position: absolute;top:5em;">
            <p style="color: white;font-size:1em;z-index:999;font-weight:bold">FUTURE VISION LAB</p>
            <div class="dome_title" style="z-index:1000;">
              <div class="dome">
                <h1
                  style="color: rgb(215, 215, 215);
                  font-size: 2em;
                  margin: 0px;
                  font-weight:800;">COLLECTION</h1>
              </div>
              <div class="shadow">
                <h1
                  style="color: transparent;
                  font-size: 2em;
                  margin: 0px;
                  font-weight:800;
                  transform: scale(1, -1);
                  background: linear-gradient(to top, #000000, #45f5a8, #ffaf7b);
                  background-clip: text;margin-top: 1.5rem;">COLLECTION</h1>
              </div>
            </div>
            <div class="collection_works" style="display:flex;flex-direction:column;justify-content: center;align-items: center;gap:1em;">
            <div class="work1" @click="goToWork()"> <p class="title1">{{ images[5].title }}</p><div class="hoverImg"></div><img :src="imgUrl1" style="width: 100%;object-fit: cover;border-radius:25px;"></div>
            <div class="work2" @click="goToWork1()"><p class="title2">{{ images[4].title }}</p><div class="hoverImg"></div><img :src="imgUrl2" style="width: 100%;object-fit: cover;border-radius:25px;"></div>
            <div class="work3" @click="goToWork2()"><p class="title3">{{ images[3].title }}</p><div class="hoverImg"></div><img :src="imgUrl3" style="width: 100%;object-fit: cover;border-radius:25px;"></div>
            <div class="work4" @click="goToWork3()"><p class="title4">{{ images[2].title }}</p><div class="hoverImg"></div><img :src="imgUrl4" style="width: 100%;object-fit: cover;border-radius:25px;"></div>
            <div class="work5" @click="goToWork4()"><p class="title5">{{ images[1].title }}</p><div class="hoverImg"></div><img :src="imgUrl5" style="width: 100%;object-fit: cover;border-radius:25px;"></div>
            <div class="work6" @click="goToWork5()"><p class="title6">{{ images[0].title }}</p><div class="hoverImg"></div><img :src="imgUrl6" style="width: 100%;object-fit: cover;border-radius:25px;"></div>
        </div>
          </div>
          <fvl-col v-else style="position: absolute;
            z-index:999;background-color: transparent !important;left: 0;top: 0;padding: 0;margin: 0;"></fvl-col>
        <div id="vanta" ref="ventaRef"></div>
      </div>
   </section>
</div>

</template>


<script>
import {NavBar2} from '../components';
import axios from 'axios';
import {FvlCollect} from '../components';
// eslint-disable-next-line no-unused-vars
import DOTS from 'vanta/dist/vanta.dots.min';
// eslint-disable-next-line no-unused-vars
import {gsap} from 'gsap';
// eslint-disable-next-line no-unused-vars
import {ScrollTrigger} from 'gsap/ScrollTrigger';
// eslint-disable-next-line no-unused-vars
import {TextPlugin} from 'gsap/dist/TextPlugin.js';
// import {useStore} from 'vuex';
import store from '../store'; // 引入 Vuex Store
import {computed} from 'vue';
// import {computed} from 'vue';
// eslint-disable-next-line no-unused-vars
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Collection',
  setup() {
    const images = computed(() => store.state.images);
    // eslint-disable-next-line max-len
    const imgUrl1 = computed(() => images.value.length > 0 ? images.value[5].imgUrl : ''); // 獲取第一張圖片的 URL
    // eslint-disable-next-line max-len
    const imgUrl2 = computed(() => images.value.length > 0 ? images.value[4].imgUrl : ''); // 獲取第一張圖片的 URL
    // eslint-disable-next-line max-len
    const imgUrl3 = computed(() => images.value.length > 0 ? images.value[3].imgUrl : ''); // 獲取第一張圖片的 URL
    // eslint-disable-next-line max-len
    const imgUrl4 = computed(() => images.value.length > 0 ? images.value[2].imgUrl : ''); // 獲取第一張圖片的 URL
    // eslint-disable-next-line max-len
    const imgUrl5 = computed(() => images.value.length > 0 ? images.value[1].imgUrl : ''); // 獲取第一張圖片的 URL
    // eslint-disable-next-line max-len
    const imgUrl6 = computed(() => images.value.length > 0 ? images.value[0].imgUrl : ''); // 獲取第一張圖片的 URL


    return {
      images,
      imgUrl1,
      imgUrl2,
      imgUrl3,
      imgUrl4,
      imgUrl5,
      imgUrl6,
    };
  },
  components: {
    'fvl-col': FvlCollect,
    // eslint-disable-next-line vue/no-unused-components
    'nav-bar': NavBar2,
  },
  data() {
    return {
      msg: 'FUTURE VISION LAB ',
      schedules: [],
      apiData1: {},
      apiData2: {},
      apiData3: {},
      apiData4: {},
      apiData5: {},
      apiData6: {},
      apiData7: {},
      hoveredText: this.$route.params.hoveredText || '',
      vantaEffect: null,
      isMobile: false,
      workid: '',
      workid1: '',
      workid2: '',
      workid3: '',
      workid4: '',
      workid5: '',
    };
  },
  methods: {
    checkMobileSize() {
      this.isMobile = window.innerWidth <= 768; // 假設 768px 以下為手機尺寸
    },
    goToWork() {
      this.$router.push({name: 'Aboutwork_All', params: {
        workId: this.workid,
      }});
    },
    goToWork1() {
      this.$router.push({name: 'Aboutwork_All', params: {
        workId: this.workid1,
      }});
    },
    goToWork2() {
      this.$router.push({name: 'Aboutwork_All', params: {
        workId: this.workid2,
      }});
    },
    goToWork3() {
      this.$router.push({name: 'Aboutwork_All', params: {
        workId: this.workid3,
      }});
    },
    goToWork4() {
      this.$router.push({name: 'Aboutwork_All', params: {
        workId: this.workid4,
      }});
    },
    goToWork5() {
      this.$router.push({name: 'Aboutwork_All', params: {
        workId: this.workid5,
      }});
    },
  },
  mounted() {
    this.checkMobileSize();
    window.addEventListener('resize', this.checkMobileSize);
    console.log(store.state);
    // eslint-disable-next-line new-cap
    this.checkMobileSize();
    window.addEventListener('resize', this.checkMobileSize);
    // eslint-disable-next-line new-cap
    VANTA.DOTS({
      el: '#vanta',
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x20ff96,
      color2: 0x28fa65,
      backgroundColor: 0x0,
      size: 5.70,
      spacing: 16.00,
      showLines: false,
    }),

    gsap.fromTo('.fvl_box', {
      opacity: 0, // 透明度為0
      y: '+=80', // 在CSS預設的y軸再加上80px
      rotation: 0, // 旋轉0度
    }, {
      opacity: 1, // 透明度為1
      y: 0, // 在CSS預設的y軸
      // stagger: 0.2, // 物件隔0.2秒進行動畫
      duration: 2, // 動畫時間1.5秒
    },
    );
    axios.get('https://unzip-clab-api.clab.org.tw/api/v1/schedules/3/works?page=0&limit=25').then((response) =>{
      this.workid = response.data.results[5].work_id;
      this.workid1 = response.data.results[4].work_id;
      this.workid2 = response.data.results[3].work_id;
      this.workid3 = response.data.results[2].work_id;
      this.workid4 = response.data.results[1].work_id;
      this.workid5 = response.data.results[0].work_id;
      console.log(this.workid);
    });
  },
  beforeUnmount() {
    if (this.vantaEffect) this.vantaEffect.destroy();
  },
};


</script>
<style lang="scss" scoped>
  /* // .org-description {
  //   margin-top: 50px;
  //   padding-bottom: 10px;
  // } */
  .body{
    background-color: transparent !important;
  }
#vanta{
  // background-color: rebeccapurple;
  width:100vw;
  height:100vh;
  position:fixed;
  z-index:2;

}
  .about {
    background-color: transparent !important ;
    width: 100vw;
    height: 100vh;
  }
  .hero-body{
    width: 100%;
    height: auto;
    background-color:transparent !important;
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
    max-width: 960px;
    width: 100%;
    padding-right:var(--bs-gutter-x, .75rem);
    padding-left:var(--bs-gutter-x,.75rem);
    margin-right:auto;
    margin-left:auto;
  }
  .col-lg-4{
    flex:0 0 auto;
    width:33.33333333%;
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
    padding:90px 0;
  }

  img{
    border-radius: 10px;
    height:290px;
  }
  .md-mb50{
    margin-bottom: 90px !important;
  }
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

  .info-box {
    z-index:0;
    position:relative;
    top: 0;
    width:100vw;
    height:auto;
    color: white;
    background-color: transparent;
    font-size: 1.5em;
}


.fvl_box{
    position: absolute;
    z-index:3;
    top:1em;
    left:0;
    height:100%;
    width:100%;
    background-color:transparent;
    border-radius: 25px;
    filter:drop-shadow(0 0 0.75rem rgba(0,0,0,0.5));
    border-top: 3px solid  rgb(21, 167, 147);

}
.collection_font{
  font-size:1.5em;
  position: absolute;
  top:0;
  left:0;
  padding: 1em;
}
.collection_font h4{
  font-weight: 700;
  font-size:2em;
}
.collection_font h2{
  font-weight: 700;
  font-size:1em;
}
.hoverImg{
  width: 100%;
  height:100%;
  background-color:black;
  position: absolute;
  z-index:3;
  opacity:0;
}
.hoverImg:hover{
opacity: 0.5;
}
.work1{
  width:80%;
  background-color:transparent;
  z-index:999;
  position:relative;
  display:flex;
  justify-content: center;
  align-items:center;
}
.work2{
  width:80%;
  background-color:transparent;
  z-index:999;
  position:relative;
  display:flex;
  justify-content: center;
  align-items:center;
}
.work3{
  width:80%;
  background-color:transparent;
  z-index:999;
  position:relative;
  display:flex;
  justify-content: center;
  align-items:center;
}
.work4{
  width:80%;
  background-color:transparent;
  z-index:999;
  position:relative;
  display:flex;
  justify-content: center;
  align-items:center;
}
.work5{
  width:80%;
  background-color:transparent;
  z-index:999;
  position:relative;
  display:flex;
  justify-content: center;
  align-items:center;
}
.work6{
  width:80%;
  background-color:transparent;
  z-index:999;
  position:relative;
  display:flex;
  justify-content: center;
  align-items:center;
}
.title1{
  position: absolute;
  opacity:0;
  z-index:999;
}

.title2{
  position: absolute;
  opacity:0;
  z-index:999;
  text-align: center;
}
.title3{
  position: absolute;
  opacity:0;
  z-index:999;
  text-align: center;
}
.title4{
  position: absolute;
  opacity:0;
  z-index:999;
  text-align: center;
}
.title5{
  position: absolute;
  opacity:0;
  z-index:999;
}
.title6{
  position: absolute;
  opacity:0;
  z-index:999;
}


.work1:hover{
  .title1{
  transition: 0.3s ease-in-out;
  opacity:1;
  font-size:1em;
}
}
.work1:active{
  .title1{
  transition: 0.3s ease-in-out;
  opacity:1;
  font-size:1em;
}
}

.work2:hover{
  .title2{
  transition: 0.3s ease-in-out;
  opacity:1;
  font-size:1em;
}
}
.work2:active{
  .title2{
  transition: 0.3s ease-in-out;
  opacity:1;
  font-size:1em;
}
}
.work3:hover{
  .title3{
  transition: 0.3s ease-in-out;
  opacity:1;
  font-size:1em;
}
}
.work3:active{
  .title3{
  transition: 0.3s ease-in-out;
  opacity:1;
  font-size:1em;
}
}

.work4:hover{
  .title4{
  transition: 0.3s ease-in-out;
  opacity:1;
  font-size:1em;
}
}
.work4:active{
  .title4{
  transition: 0.3s ease-in-out;
  opacity:1;
  font-size:1em;
}
}

.work5:hover{
  .title5{
  transition: 0.3s ease-in-out;
  opacity:1;
  font-size:1em;
}
}
.work5:active{
  .title5{
  transition: 0.3s ease-in-out;
  opacity:1;
  font-size:1em;
}
}

.work6:hover{
  .title6{
  transition: 0.3s ease-in-out;
  opacity:1;
  font-size:1em;
}
}
.work6:active{
  .title6{
  transition: 0.3s ease-in-out;
  opacity:1;
  font-size:1em;
}
}
@media(max-width:2560px) {
  .fvl_box{
    width:80%;
    height: 100%;
    left: 0;
    top:2em;
  }
}

@media(max-width:1920px) {
  .fvl_box{
    width:80%;
    height:800px;
    left: 1em;
    top:2em;
  }
}
@media(max-width:1280px) {
  .info-box{
    height:100vh;
  }
  .fvl_box{
    width: 80%;
    height: 300px;
    left: 0;
    top:80%;
  }
  .collection_font{
    font-size:1em;
    // top:80%;
  }
}
@media(max-width:1200px) {
  .fvl_box{
    width: 80%;
    height:300px;
    left: 0;
    top:60%;
  }
}
@media(max-width:1024px) {
  .fvl_box{
    width: 100%;
    height: 100vh;
    left: 0;
    top:2em;
  }
  .collection_font{
    top: 60%;
    font-size:0.7em;
  }
}
@media(max-width:920px) {
  .fvl_box{
    width: 80%;
    height: 100%;
    left: 0;
    top:50%;
  }
  .collection_font{
    top: 60%;
    font-size:0.7em;
  }
}
@media(max-width: 768px) {
  .info-box{
    height: 100%;
  }
  .collection_font{
    top:80%;
    font-size:0.7em;
    padding:0;
    margin: 0.5em;
  }
  .fvl_box{
    width:100%;
    height:2160px;
    bottom: 0;
  }
}
@media(max-width: 375px) {
  .info-box{
    height: 100%;
  }
  .collection_font{
    top: 80%;
    font-size:0.5em;
  }
  .fvl_box{
    width:100%;
    height:2160px;
    bottom: 0;
  }
}
</style>
<style lang="css" scoped src="../bootstrap.min.css">
</style>

