<!-- eslint-disable vue/no-unused-components -->
<!-- eslint-disable max-len -->
<template>
  <div class="about" style="overflow-x: hidden;background-color: black;">
    <!-- <nav-bar2></nav-bar2> -->
    <!-- ---------CSS animation About us-------------- -->
    <!-- -----------------CSS animation About us end ------------------- -->


    <!--
  <div class="banner-back" style="filter:blur(30px);transform: scale(1.2);position: fixed;z-index:0;">
               <banner-background></banner-background>
               </div> -->

    <section class="pg-about section-padding sub-bg">
      <div class="dropdown" style="position: fixed;">
        <button class="dropbtn" @click="change_zh">繁中</button>
        <!-- <div class="dropdown-content">
                      <router-link :to="{ name:'Aboutwork_en' }"> <a href="#">EＮ</a></router-link>
                      <router-link :to="{ name:'Aboutwork' }">   <a href="#">繁體中文</a></router-link>
                    </div> -->
      </div>

      <div class="title_img_intro_wrap">

        <div class="container" style="margin: 0;">

          <div class="space_title">
            <!-- <div class="title_background">
    <div class="title">
    <h6 style="margin-bottom: 0;font-weight:800px;">About</h6>
    </div>
   </div> -->
          </div>
        </div>

        <!-- 只有前兩張圖 -->
        <template v-if="this.thirdImage == null">
          <div class="container2"
            style="height:auto; flex-direction:row;justify-content: center;align-items:flex-start;">
            <div class="pic1" style="width:100%;height:100%">
              <div class="space_img1">
                <div class="bg-img radius-10 md-mb50"
                  style="display: flex;justify-content: flex-start;height:auto;width:100%;height: 100%;object-fit: cover;border-radius: 25px;">
                  <img class="first-image" :class="{ 'fade-in': isFirstImageLoaded }" 
                    :src="'https://unzip-clab-api.clab.org.tw/' + this.firstImage"
                    style="border-radius: 25px;" @load="onFirstImageLoad">
                </div>
              </div>
            </div>

            <div class="img_1" style="width:100%;height: 380px;">
              <img class="second-image" :class="{ 'fade-in': isSecondImageLoaded }"
                :src="'https://unzip-clab-api.clab.org.tw/' + this.secondImage"
                style="width: 100%;max-height:380px; object-fit:cover;border-radius: 25px;" @load="onSecondImageLoad">
            </div>

          </div>
        </template>
        <!-- 只有第一張圖 -->
        <template v-else-if="this.secondImage == null">
          <div class="container2">
            <div class="pic1">
              <div class="space_img1">
                <div class="bg-img radius-10 md-mb50" style="display: flex;justify-content: flex-start;height:100%;">
                  <img class="first-image" :class="{ 'fade-in': isFirstImageLoaded }" 
                    :src="'https://unzip-clab-api.clab.org.tw/' + this.firstImage"
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
                    :src="'https://unzip-clab-api.clab.org.tw/' + this.firstImage"
                    style="border-radius: 25px;" @load="onFirstImageLoad">
                </div>
              </div>
            </div>

            <div class="imgs">
              <div class="img_1">
                <img class="second-image" :class="{ 'fade-in': isSecondImageLoaded }"
                  :src="'https://unzip-clab-api.clab.org.tw/' + this.secondImage"
                  style="width:100%;height: 100%;object-fit:cover;border-radius: 25px;" @load="onSecondImageLoad">
              </div>
              <div class="img_2">
                <img class="third-image" :class="{ 'fade-in': isThirdImageLoaded }"
                  :src="'https://unzip-clab-api.clab.org.tw/' + this.thirdImage"
                  style="width:100%;height: 100%;object-fit:cover;border-radius: 25px;" @load="onThirdImageLoad">
              </div>
            </div>
          </div>
        </template>


        <!-- <h4 class="artist_title" style="font-weight:900;margin-left:60%;">藝術家介紹</h4> -->
        <div class="container3">
          <div class="about_artwork">
            <div class="title-content">
              <p class="org-description is-size-4 fade-in" style="font-weight:bold;color:black;text-align: left;">{{
                this.products.work_en.title }}</p>
            </div>
            <!-- <div v-html="apiData7" style="color:black;margin-top: 1rem;"></div> -->
            <div v-html="htmlContent" class="fade-in" style="color:black;padding:0.5rem;font-weight: 300;"></div>
          </div>

          <div class="about_artist">
            <p class="org-description is-size-4 fade-in" style="font-weight:bold;color:black;text-align: left;padding: 0.5rem;">
              About
              artist</p>
            <!-- <p class="org-description is-size-4" style="color:black;text-align: left;font-size:0.2rem">{{ $route.params.artist}}</p> -->
            <div v-html="artistContent" class="fade-in" style="color:black;padding: 0.5rem;"></div>
          </div>
        </div>
      </div>


    </section>

    <hr style="color: aliceblue;">
    <info-bar></info-bar>
    <foot-bar2></foot-bar2>
  </div>

</template>


<script>
import {BannerBackground} from '../components';
import {InfoBar, FootBar2} from '../components';
import axios from 'axios';

export default {
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
    // artist: {
    //   type: String,
    // },
    // photo:{
    //   type:String,
    // },
    // photo2:{
    //   type:String,
    // },
    // photo3:{
    //   type:String,
    // }
  },
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'News',
  components: {
    'info-bar': InfoBar,
    'foot-bar2': FootBar2,
    //  'nav-bar2':NavBar2,
    // eslint-disable-next-line vue/no-unused-components
    'banner-background': BannerBackground,
  },
  created() {
    console.log('關於作品創建');
  },

  data() {
    return {
      msg: 'FUTURE VISION LAB ',
      products: [],
      schedules: [],
      firstImage: {},
      secondImage: {},
      thirdImage: {},
      isFirstImageLoaded: false,
      isSecondImageLoaded: false,
      isThirdImageLoaded: false,
      isContentLoaded: false,
    };
  },
  methods: {
    change_zh() {
      this.$router.push({name: 'Aboutwork_All'}).then(() => {
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

      // Add a small delay to ensure content is rendered before showing
      setTimeout(() => {
        this.isContentLoaded = true;
      }, 100);

      console.log(firstImage);
      console.log(this.products);
    }).catch((err) => {
      console.log(err.response);
    });
  },


  computed: {
    htmlContent() {
      // 从路由参数获取内容
      // return this.$route.params.word || '';
      return this.products.work_en.proposal || '';
    },
    artistContent() {
      // 从路由参数获取内容
      return this.products.work_en.note || '';
    },

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


.dropdown {
  position: fixed !important;
  right: 5%;
  top: 5%;
  display: inline-block;
  z-index: 4;
}

.dropdown:hover .dropbtn {
  background-color: transparent;
}
.title_img_intro_wrap {
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.pic1 {
  width: 40%;
  object-fit: cover;
  height: 350px;
}

// .work_card{
//   background-color: aliceblue;
//   z-index: 1;
//   border-radius: 25px;
//   padding: 1em;
//   margin-top: 2em;
// }
.about {
  background-color: rgb(255, 255, 255);
  overflow-y: hidden;
}

.space_title {
  // padding: 10px 10px;
  position: relative;
  width: 100%;
  // margin-left:auto;
  // margin-right:auto;
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
  // color: rgb(255, 0, 0) !important;
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
  position: absolute;
  width: 100%;
  bottom: 0;
}

.container {
  max-width: 960px;
  width: 100%;
  padding-right: var(--bs-gutter-x, .75rem);
  padding-left: var(--bs-gutter-x, .75rem);
  margin-right: auto;
  margin-left: auto;
  margin-top: 1rem;
}

.container2 {
  width: 100%;
  // padding-right:var(--bs-gutter-x, .75rem);
  // padding-left:var(--bs-gutter-x,.75rem);
  margin-right: auto;
  margin-left: auto;
  margin-top: 1rem;
  height: 380px;
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
  margin-top: 3rem;
  margin-bottom: 20%;
  display: flex;
  justify-content: flex-start;
  border-radius: 25px;
  padding: 2rem;
  gap: 2em;
  z-index: 1;
}

// .artist-container{
//   width:100%;
//   padding-right:var(--bs-gutter-x, .75rem);
//   padding-left:var(--bs-gutter-x,.75rem);
//   margin-right:auto;
//   margin-left:auto;
//   margin-top: 1rem;
//   height:25vh;
//   display: flex;
//   gap:10px;
// }
.about_artwork {
  width: 50%;
  height: auto;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  z-index: 1;
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

.first-image {
  width: 100%;
  // min-height:350px;
  height: 380px;
  object-fit: cover;
  border-radius: 25px;
}

.col-lg-8 {
  flex: 0 0 auto;
  width: 66.66666667%;
}

img {
  // border-radius: 10px;
  min-height: 380px;
}

// .md-mb50{
//   margin-bottom: 90px !important;
// }
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
  // min-height:300px;
  max-height: 380px;
  height: 100%;
  display: flex;
  align-items: flex-end;
  flex-direction: row;
  gap: 10px;
  overflow: hidden;
}

.img_1 {
  width: 100%;
  height: 100%;
  border-radius: 25px !important;
}

.img_2 {
  width: 100%;
  height: 100%;
  border-radius: 25px;
}

.images {
  width: 50%;
  height: 50%;
  position: relative;
  display: flex;
  align-items: center;
  // left:10%;
}.dropbtn {
  transition: all 0.3s ease;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius:25px;
}

.fade-in {
  animation: fadeIn 1s ease-in;
  opacity: 0;
  animation-fill-mode: forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media only screen and (max-width:728px) {
  .space_title {
    width: 90%;
    margin-top: 5rem;
    display: none;
  }

  .title_img_intro_wrap {
    width: 100%;
  }

  img {
    min-height: 300px;
  }

  .pic1 {
    width: 100%;
  }

  .space_img1 img {
    min-height: 380px;
  }

  // .work_card{
  //   margin: 1em;
  // }
  .container2 {
    flex-direction: column;
    height: auto;
    align-items: center;
    justify-content: center;
    padding: 5%;
  }

  .first-image {
    // object-fit: contain;
    height: 300px;
  }

  .row {
    width: 100%;
    margin: 0 auto;
  }

  .container3 {
    flex-direction: column;
    height: 100%;
    width: 90%;
  }

  .about_artwork {
    width: 100%;
  }

  .about_artist {
    width: 100%;
    height: auto;
    position: relative;
  }

  .about_artist {
    width: 100%;
    height: auto;
    position: relative;
  }

  .space_imgs {
    width: 90vw;
    height: 50vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
  }

  .space_img1 {
    padding: 0 !important;
  }

  .aboutImage {
    width: 100%;
    height: 100%;
  }

  .images {
    width: 100%;
    height: 100%;
    left: 10%;
  }

  .imgs {
    flex-direction: row;
    width: 100%;
    height: 100%;
    margin-top: 2em;
  }

  .img_1 {
    // height:100%;
    width: 50%;
    border-radius: 25px;
  }

  .img_2 {
    // height:100%;
    width: 50%;
    border-radius: 25px;
  }

}

@media only screen and (max-width:768px) {
  .space_title {
    width: 90%;
    margin-top: 5rem;
    display: none;
  }

  img {
    min-height: 300px;
  }

  .pic1 {
    width: 100%;
  }

  .space_img1 img {
    min-height: 380px;
  }

  .container2 {
    flex-direction: column !important;
    height: auto;
    align-items: center;
    justify-content: center;
    padding: 5%;
  }

  .container3 {
    width: 90%;
    height: 100%;
    flex-direction: column;
    z-index: 1;
  }

  .about_artwork {
    width: 100%;
  }

  .images {
    width: 100%;
    height: 100%;
    left: 10%;
  }

  .imgs {
    flex-direction: row;
    width: 100%;
    height: 100%;
    margin-top: 2em;
  }

  .img_1 {
    // height:100%;
    width: 50%;
    border-radius: 25px;
  }

  .img_2 {
    // height:100%;
    width: 50%;
    border-radius: 25px;
  }
}
</style>
<style lang="css" scoped src="../bootstrap.min.css"></style>
