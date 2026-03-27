<!-- eslint-disable max-len -->
<!-- eslint-disable max-len -->
<!-- eslint-disable max-len -->
<!-- eslint-disable vue/no-parsing-error -->
<!-- eslint-disable max-len -->
<!-- eslint-disable max-len -->
<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable max-len -->
<template>
  <section>
    <head>
      <title>FVL Collection</title>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&display=swap" rel="stylesheet">
    </head>
    <nav-bar style="z-index:999;"></nav-bar>
    <language-switch v-model="isEnglish"></language-switch>
    <!-- Vertical Sliders on both sides -->
    <!-- <div class="vertical-slider left-slider">
      <div class="vertical-slider-inner">
        <div class="v-item" v-for="n in 8" :key="'left-'+n">
          <span class="v-title stroke">COLLECTION</span>
          <span class="v-title fill">COLLECTION</span>
        </div>
      </div>
    </div> -->
    <!-- <div class="vertical-slider right-slider">
      <div class="vertical-slider-inner">
        <div class="v-item" v-for="n in 8" :key="'right-'+n">
          <span class="v-title stroke">COLLECTION</span>
          <span class="v-title fill">COLLECTION</span>
        </div>
      </div>
    </div> -->
    <section class="collection-page">
      <!-- Top horizontal COLLECTION slider -->

      <!-- </div> -->

      <div class="horizontal-slider">
        <div class="slider-inner">
          <div class="h-item"><h2 class="h-title stroke">COLLECTION</h2></div>
          <div class="h-item"><h2 class="h-title fill">COLLECTION</h2></div>
          <div class="h-item"><h2 class="h-title stroke">COLLECTION</h2></div>
          <div class="h-item"><h2 class="h-title fill">COLLECTION</h2></div>
          <div class="h-item"><h2 class="h-title stroke">COLLECTION</h2></div>
          <div class="h-item"><h2 class="h-title fill">COLLECTION</h2></div>
        </div>
      </div>

      <div class="collection-grid-mw">
        <div v-for="(item, index) in collectionItems" :key="index"
          :class="['collection-mw-item', item.layout, item.theme]">
          <div class="mw-label-bar" :class="item.themeLabel">{{ item.label }}</div>
          <div class="mw-image" :style="{ backgroundImage: `url(${item.image})` }" @click="goToWork(index)">
            <div class="mw-info">
              <h3>{{ isEnglish ? item.titleEn : item.titleZh }}</h3>
              <p>{{ isEnglish ? item.descriptionEn : item.descriptionZh }}</p>
            </div>
               <button class="view-more">{{ isEnglish ? 'View More' : '查看更多' }}</button>
          </div>
        </div>
      </div>

      <div class="horizontal-slider">
        <div class="slider-inner reverse">
          <div class="h-item"><h2 class="h-title fill">COLLECTION</h2></div>
          <div class="h-item"><h2 class="h-title stroke">COLLECTION</h2></div>
          <div class="h-item"><h2 class="h-title fill">COLLECTION</h2></div>
          <div class="h-item"><h2 class="h-title stroke">COLLECTION</h2></div>
          <div class="h-item"><h2 class="h-title fill">COLLECTION</h2></div>
          <div class="h-item"><h2 class="h-title stroke">COLLECTION</h2></div>
        </div>
      </div>

    </section>
    <foot-bar style="z-index:999;"></foot-bar>
  </section>
</template>

<script>
import {NavBar, LanguageSwitch} from '../components';
// import {FootBar} from '../components';
import axios from 'axios';
import store from '../store.js';
// eslint-disable-next-line no-unused-vars
import {useRouter} from 'vue-router';


export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Collection',
  components: {
    'nav-bar': NavBar,
    'language-switch': LanguageSwitch,
    // 'foot-bar': FootBar,
  },
  data() {
    return {
      isEnglish: false,
      collectionItems: [
        {
          titleZh: '',
          titleEn: '',
          descriptionZh: '透過演算法創造的視覺藝術作品',
          descriptionEn: 'Visual art works created through algorithms',
          image: '',
          theme: 'blue',
          themeLabel: '',
          layout: 'span2',
          workId: '',
        },
        {
          titleZh: '',
          titleEn: '',
          descriptionZh: 'NONOTAK STUDIO (2017)',
          descriptionEn: 'NONOTAK STUDIO (2017)',
          image: '',
          theme: 'red',
          themeLabel: '',
          layout: 'normal',
          workId: '',
        },
        {
          titleZh: '',
          titleEn: '',
          descriptionZh: 'PERFUMERY ORGAN PROJECT TEAM (2015/2017)',
          descriptionEn: 'PERFUMERY ORGAN PROJECT TEAM (2015/2017)',
          image: '',
          theme: 'blue',
          themeLabel: '',
          layout: 'normal',
          workId: '',
        },
        {
          titleZh: '',
          titleEn: '',
          descriptionZh: 'YAO CHUNG-HAN (2015)',
          descriptionEn: 'YAO CHUNG-HAN (2015)',
          image: '',
          theme: 'red',
          themeLabel: '',
          layout: 'span2h',
          workId: '',
        },
        {
          titleZh: '',
          titleEn: '',
          descriptionZh: 'ZACH LIEBERMAN (2016-17)',
          descriptionEn: 'ZACH LIEBERMAN (2016-17)',
          image: '',
          theme: 'blue',
          themeLabel: '',
          layout: 'normal',
          workId: '',
        },
        {
          titleZh: '',
          titleEn: '',
          descriptionZh: '',
          descriptionEn: '',
          image: '',
          label: '',
          theme: 'red',
          themeLabel: '',
          layout: 'normal',
          workId: '',
        },
        {
          titleZh: '',
          titleEn: '',
          descriptionZh: '',
          descriptionEn: '',
          image: '',
          label: '',
          theme: 'red',
          themeLabel: '',
          layout: 'normal',
          workId: '',
        },
        {
          titleZh: '',
          titleEn: '',
          descriptionZh: '',
          descriptionEn: '',
          image: '',
          label: '',
          theme: 'red',
          themeLabel: '',
          layout: 'normal',
          workId: '',
        },

      ],
    };
  },
  mounted() {
    axios.get('https://unzip-clab-api.clab.org.tw/api/v1/schedules/3/works?page=0&limit=25')
        .then((response) => {
          console.log(store.state.images);
          console.log(response.data);
          console.log(store.state.test);
          const title0 = response.data.results[0].work_zh.title;
          const title1 = response.data.results[1].work_zh.title;
          const title2 = response.data.results[2].work_zh.title;
          const title3 = response.data.results[3].work_zh.title;
          const title4 = response.data.results[4].work_zh.title;
          const title5 = response.data.results[5].work_zh.title;
          const title6 = response.data.results[6].work_zh.title;
          const title7 = response.data.results[7].work_zh.title;


          const title_en = response.data.results[0].work_en.title;
          const title_en1 = response.data.results[1].work_en.title;
          const title_en2 = response.data.results[2].work_en.title;
          const title_en3 = response.data.results[3].work_en.title;
          const title_en4 = response.data.results[4].work_en.title;
          const title_en5 = response.data.results[5].work_en.title;
          const title_en6 = response.data.results[6].work_en.title;
          const title_en7 = response.data.results[7].work_en.title;

          const workid = response.data.results[0].work_id;
          const workid1 = response.data.results[1].work_id;
          const workid2 = response.data.results[2].work_id;
          const workid3 = response.data.results[3].work_id;
          const workid4 = response.data.results[4].work_id;
          const workid5 = response.data.results[5].work_id;
          const workid6 = response.data.results[6].work_id;
          const workid7 = response.data.results[7].work_id;

          const imgUrl = 'https://unzip-clab-api.clab.org.tw/'+response.data.results[0].photo_1;
          const imgUrl1 = 'https://unzip-clab-api.clab.org.tw/'+response.data.results[1].photo_1;
          const imgUrl2 = 'https://unzip-clab-api.clab.org.tw/'+response.data.results[2].photo_1;
          const imgUrl3 = 'https://unzip-clab-api.clab.org.tw/'+response.data.results[3].photo_1;
          const imgUrl4 = 'https://unzip-clab-api.clab.org.tw/'+response.data.results[4].photo_1;
          const imgUrl5 = 'https://unzip-clab-api.clab.org.tw/'+response.data.results[5].photo_1;
          const imgUrl6 = 'https://unzip-clab-api.clab.org.tw/'+response.data.results[6].photo_1;
          const imgUrl7 = 'https://unzip-clab-api.clab.org.tw/'+response.data.results[7].photo_1;

          // 中文标题
          this.collectionItems[0].titleZh = title0;
          this.collectionItems[1].titleZh = title1;
          this.collectionItems[2].titleZh = title2;
          this.collectionItems[3].titleZh = title3;
          this.collectionItems[4].titleZh = title4;
          this.collectionItems[5].titleZh = title5;
          this.collectionItems[6].titleZh = title6;
          this.collectionItems[7].titleZh = title7;

          // 英文标题
          this.collectionItems[0].titleEn = title_en;
          this.collectionItems[1].titleEn = title_en1;
          this.collectionItems[2].titleEn = title_en2;
          this.collectionItems[3].titleEn = title_en3;
          this.collectionItems[4].titleEn = title_en4;
          this.collectionItems[5].titleEn = title_en5;
          this.collectionItems[6].titleEn = title_en6;
          this.collectionItems[7].titleEn = title_en7;

          this.collectionItems[0].image = imgUrl;
          this.collectionItems[1].image = imgUrl1;
          this.collectionItems[2].image = imgUrl2;
          this.collectionItems[3].image = imgUrl3;
          this.collectionItems[4].image = imgUrl4;
          this.collectionItems[5].image = imgUrl5;
          this.collectionItems[6].image = imgUrl6;
          this.collectionItems[7].image = imgUrl7;

          this.collectionItems[0].workId = workid;
          this.collectionItems[1].workId = workid1;
          this.collectionItems[2].workId = workid2;
          this.collectionItems[3].workId = workid3;
          this.collectionItems[4].workId = workid4;
          this.collectionItems[5].workId = workid5;
          this.collectionItems[6].workId = workid6;
          this.collectionItems[7].workId = workid7;


          const images = response.data.results.map((results) => ({
            title: results.work_zh.title,
            imgUrl: 'https://unzip-clab-api.clab.org.tw/'+results.photo_1,
          }));
          store.dispatch('updateImages', images);
          console.log(store.state.images);
        });
  },
  methods: {
    goToWork(index) {
      this.$router.push({
        name: 'Aboutwork_All',
        params: {id: index, workId: this.collectionItems[index].workId},
      });
    },
  },
};
</script>
<style lang="scss" scoped>

.collection-page {
  min-height: 100vh;
  background-color: #000;
  padding: 0 4vw;
  color: white;
}

.collection-header {
  text-align: center;
  margin-bottom: 3rem;
  padding-top: 100px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(74, 158, 255, 0.2) 0%, rgba(74, 158, 255, 0) 70%);
    border-radius: 50%;
    z-index: 0;
    animation: pulse 3s infinite;
  }

  h1 {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 1rem;
    position: relative;
    display: inline-block;
    background: linear-gradient(45deg, #4A9EFF, #ffffff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: titleFloat 3s ease-in-out infinite;
    text-shadow: 0 0 20px rgba(74, 158, 255, 0.3);

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, transparent, #4A9EFF, transparent);
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }

    &:hover::after {
      transform: scaleX(1);
    }
  }

  p {
    font-size: 2.2rem;
    color: rgba(255, 255, 255, 0.92);
    position: relative;
    display: inline-block;
    transition: all 0.3s ease;
    // eslint-disable-next-line max-len, max-len, max-len
    font-family: 'Poppins', 'Noto Sans TC', 'Montserrat', 'Roboto', 'Source Han Sans', Arial, sans-serif;
    font-weight: 700;
    letter-spacing: 0.02em;
    line-height: 1.3;

    &::before {
      content: '';
      position: absolute;
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 30px;
      height: 2px;
      background: #4A9EFF;
      opacity: 0;
      transition: all 0.3s ease;
    }

    &:hover {
      color: #4A9EFF;
      transform: translateY(-2px);
      text-shadow: 0 0 10px rgba(74, 158, 255, 0.3);

      &::before {
        opacity: 1;
        width: 50px;
      }
    }
  }
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.3;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.5;
  }
}

@keyframes titleFloat {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
}

.collection-grid-mw {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 30vw;
  gap: 0;
  width: calc(100vw - 8vw);
  margin: 0 auto;
  background: #000;
}

.collection-mw-item {
  position: relative;
  overflow: hidden;
  min-width: 0;
  min-height: 0;
  border: 1px solid #222;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  grid-column: span 1 !important;
  grid-row: span 1 !important;
}

.mw-label-bar {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.3em 1em;
  font-weight: bold;
  font-size: 1.1em;
  z-index: 2;
  letter-spacing: 1px;
}

.label-blue {
  background: #1a3b7a;
  color: #fff;
}

.label-red {
  background: #e60012;
  color: #fff;
}

.mw-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: grayscale(0.1) brightness(0.85);
  transition: filter 0.3s, transform 0.3s;
  display: flex;
  align-items: flex-end;
  position: relative;
}

.collection-mw-item:hover .mw-image {
  filter: grayscale(0) brightness(1.05);
  transform: scale(1.04);
  z-index: 1;
}
.mw-info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: transparent;
  color: #fff;
  padding: 2em 2.2em 3.2em 2.2em;
  z-index: 2;
  opacity: 1;
  transition: opacity 0.3s;
  pointer-events: none;
}

.collection-mw-item:hover .mw-info {
  opacity: 1;
}

.mw-info h3 {
  margin: 0 0 0.5em 0;
  font-size: 1.3em;
  font-weight: bold;
  letter-spacing: 1px;
}

.mw-info p {
  margin: 0 0 1em 0;
  font-size: 1em;
  color: #cce3ff;
}

.view-more {
  background: transparent;
  border: 2px solid #4A9EFF;
  color: #4A9EFF;
  padding: 0.4em 1.2em;
  border-radius: 25px;
  font-size: 1em;
  cursor: pointer;
  transition: all 0.3s;
  z-index:999;
  margin: 2em 2.2em 1.2em 2.2em;
}

.view-more:hover {
  background: #4A9EFF !important;
  color: #fff;
  box-shadow: 0 0 10px #4A9EFF;
}

@media (max-width: 900px) {
  .collection-grid-mw {
    grid-template-rows: repeat(2, 40vw);
  }
  .collection-page {
    padding: 0 6vw;
  }
  .collection-header p {
    font-size: 1.5rem;
  }
}

@media (max-width: 600px) {
  .collection-grid-mw {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 40vw);
  }
  .collection-mw-item {
    grid-column: span 1 !important;
    grid-row: span 1 !important;
  }
  .collection-page {
    padding: 0;
  }
  .collection-header p {
    font-size: 1.1rem;
  }
}

@media (max-width: 768px) {
  .collection-header {
    padding-top: 80px;

    h1 {
      font-size: 2.5rem;
    }

    p {
      font-size: 1rem;
    }
  }

  .collection-grid-mw {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .mw-info {
    h3 {
      font-size: 1.3rem;
    }

    p {
      font-size: 0.9rem;
    }
  }
}

@media (max-width: 480px) {
  .collection-header {
    h1 {
      font-size: 2rem;
    }
  }

  .collection-grid-mw {
    grid-template-columns: 1fr;
  }
}

.vertical-slider {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 4vw;
  min-width: 32px;
  z-index: 100;
  display: flex;
  align-items: center;
  pointer-events: none;
  background: #000;
}
.left-slider {
  left: 0;
  justify-content: flex-start;
}
.right-slider {
  right: 0;
  justify-content: flex-end;
}
.vertical-slider-inner {
  width: 100%;
  height: 200vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: vertical-scroll 30s linear infinite;
}
@keyframes vertical-scroll {
  0% { transform: translateY(0); }
  100% { transform: translateY(-50%); }
}
.v-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1vw 0;
}
.v-title {
  font-size: 4vw;
  font-weight: 800;
  letter-spacing: 0.1em;
  line-height: 1;
  display: block;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  margin: 0.5vw 0;
  user-select: none;
  color: #fff;
}
.v-title.stroke {
  color: #fff;
  -webkit-text-stroke: unset;
}
.v-title.fill {
  color: #64a2ff;
  gap:15px;
}
@media (max-width: 900px) {
  .vertical-slider {
    width: 6vw;
    min-width: 24px;
  }
  .v-title {
    font-size: 7vw;
  }
}
@media (max-width: 600px) {
  .vertical-slider {
    display: none;
  }
}

.horizontal-slider {
  width: 100%;
  overflow: hidden;
  margin: 0;
  position: relative;
  z-index: 2;
  background: #000;
}
.slider-inner {
  display: flex;
  width: max-content;
  animation: horizontal-scroll 90s linear infinite;
  gap: 15vw;
}
.slider-inner.reverse {
  animation-direction: reverse;
}
@keyframes horizontal-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.h-item {
  display: inline-block;
  padding: 0;
  position: relative;
}
.h-item::after {
  display: none;
}
.h-title {
  font-size: 4vw;
  font-weight: 800;
  letter-spacing: 0.2em;
  margin: 0;
  line-height: 1.1;
  display: inline-block;
  white-space: nowrap;
  vertical-align: middle;
  color: #fff;
  padding: 0;
}
.h-title.stroke {
  color: transparent;
  -webkit-text-stroke: 0.8px #4A9EFF;
}
.h-title.fill {
  color: #4A9EFF;
  -webkit-text-stroke: 0;
}
@media (max-width: 900px) {
  .h-title {
    font-size: 7vw;
  }
  .slider-inner {
    gap: 12vw;
  }
}
@media (max-width: 600px) {
  .h-title {
    font-size: 10vw;
  }
  .slider-inner {
    gap: 10vw;
  }
  .horizontal-slider {
    margin: 0;
  }
}
</style>

