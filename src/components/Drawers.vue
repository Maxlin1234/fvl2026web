<template>
  <!-- Vue 2：模板僅能有一個根元素 -->
  <div class="drawers-root">
  <!-- LiveDrawer 結構 -->
  <div class="live-drawer" :class="{ open: showLiveDrawer }">
    <button class="drawer-close" @click="$emit('close-drawer', 'about')">×</button>
    <div class="drawer-content">
      <img :src="currentEventImage" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;object-fit:cover;">
      <div class="drawer-title">
        <img src="../assets/logos/fvl-logo2.png" class="fvl-logo">
        <h2 style="margin: 0;padding:10px;">{{ isEnglish ? 'C-LAB Future Vision Lab ' : 'C-LAB 未來視覺實驗室' }}</h2>
        <p>{{ isEnglish ? 
          'Sharing C-LAB Future Vision Lab\'s continuous promotion of experimental performance projects "FUTURE VISION LAB" since 2020, using digital experimental architecture to create a dome field (DOME), with the goal of exploring the visual limits of technology media. Over the past four years, more than 100 works have been performed. This project completed hardware and software upgrades in 2023, breaking through previous scales to create a diameter of 15 meters, Taiwan\'s only giant mobile outdoor immersive experience space "C-LAB Dome Theater". Audio and video hardware and software have undergone multiple iterations of development, overcoming the complexity of multiple technologies such as spherical curved surface projection correction, fusion, alignment, playback control and image pre-production. The total computing power of the immersive image projection system can reach 8K*8K ultra-high resolution; internally, a double-layer structure hides audio and video equipment, customizes new transparent projection film, and works with Taiwan Sound Laboratory to build a more complete 25.4-channel surround sound field environment.' : 
          'C-LAB 未來視覺實驗室著重對未來視覺議題的探討與突破，探索科技媒體的視覺極限為實驗目標，企圖勾勒出未來視覺的跨域願景。實驗室本身具備R＆D的能量，整合影像運算、拼接、軟硬體系統、環繞音場及建築結構設計等技術，除策劃展演及陪伴創作者以外，亦進行各項跨域實驗，持續開創視覺及創新科技的新視野。同時針對視覺領域結合AI技術進行多項研發與應用，特別著重在生成式AI結合當代藝術及未來視覺領域提出具有創新與實驗性展演作品或平台環境，並也持續融合新舊科技如VR／AR／XR、物聯網、大數據等，延續實驗室技術累積的研發能量，並與不同領域創作者進行共研、共製與共創機制，發展科技媒體實驗作品或展演，並建立開源的機制，意圖拋磚引玉以增進科技藝術領域在AI發展應用創新。' }}</p>
      </div>
    </div>
  </div>

  <!-- Drawer 結構 -->
  <div class="drawer" :class="{ open: showDrawer, 'coming-soon': isScheduleComingSoon }">
    <button class="drawer-close" @click="$emit('close-drawer', 'schedule')">×</button>
    <div class="drawer-content2">
      <div class="cal-page">
        <div class="cal-title">
          <p v-if="isScheduleComingSoon" class="schedule-coming-soon-text">將於3/31(二)更新，敬請期待！</p>
          <Calendar
            v-if="!isScheduleComingSoon"
            :isEnglish="isEnglish"
            @event-type-changed="handleEventTypeChange"
          />
        </div>
        <!-- 輪播圖片區域 -->
        <div v-if="!isScheduleComingSoon" class="carousel-container">
          <div class="carousel-wrapper">
            <img 
              v-for="(image, index) in carouselImages" 
              :key="index"
              :src="image" 
              :class="{ active: currentImageIndex === index }"
              class="carousel-image"
              alt="carousel image"
            >
          </div>
          <div class="carousel-indicators">
            <button 
              v-for="(image, index) in carouselImages" 
              :key="index"
              :class="{ active: currentImageIndex === index }"
              class="indicator"
              @click="goToSlide(index)"
            ></button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 講座 Drawer 結構 -->
  <div class="lecture-drawer" :class="{ open: showLectureDrawer }">
    <button class="drawer-close" @click="$emit('close-drawer', 'lecture')">×</button>
 
    <div class="drawer-content" style="background-color:black;color:white;">
      <video
  ref="lectureVideo"
  autoplay
  muted
  loop
  playsinline
  webkit-playsinline
  x5-playsinline
  preload="auto"
  style="
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    object-fit: cover;
    opacity: 0.5;
    /* 暫時移除 clip-path 測試 */
    /* clip-path: ellipse(70% 80% at 100% 30%); */
  "
>
  <source src="../assets/dome.mp4" type="video/mp4">
  您的瀏覽器不支援影片播放。
</video>
      <!-- <video autoplay muted loop src="../assets/circle.mp4" style="position: absolute;z-index: 1;right:0%;width:100%;height:100%; float: left;clip-path: ellipse(70% 80% at 100% 30%);opacity: 0.5;object-fit:cover;"></video> -->
      <div class="all-content" style="position: absolute;z-index: 999;height: 100%;width: 100%; flex-direction: column;display: flex;justify-content: center;align-items:flex-start;">
        <h2 style="color:gainsboro;border-bottom: 2px solid white;padding: 20px;margin-left: 60px;font-size: 1.2em;font-weight: 900;">{{ isEnglish ? 'Visitor Guidelines' : '入場須知' }}</h2>
        <div class="list-text">
          <button class="list-btn1" @click="toggleContent()"><h2>{{ isEnglish ? ' Notices for entry ' : '注意事項' }}</h2></button>
          <button class="list-btn3" @click="toggleContent3()"><h2>{{ isEnglish ? 'Admission Information' : '入場方式' }}</h2></button>
        </div>
        <div class="content-container">
          <div class="lecture-list" v-if="showContentA">
            <h2>{{ isEnglish ? 
              '⭓ Some performances contain intense strobe lighting effects. Viewer discretion is advised.' : 
              '⭓ 演出內容有部分包含強烈閃光，敬請斟酌入場。' }}</h2>
            <h2>{{ isEnglish ? 
              '⭓ Due to the mirror floor in the venue, wearing "pants" for your visit is recommended.' : 
              '⭓ 因活動場地為鏡面地板，建議請穿著「褲裝」進場觀賞。' }}</h2>
            <h2>{{ isEnglish ? 
              '⭓ Due to limited space inside the venue, picnic mats and chairs are not allowed. If you have other needs, please contact the staff for assistance.' : 
              '⭓ 因場內空間有限，禁止鋪設野餐墊、椅子；若有其他需求，請洽詢現場工作人員協助。' }}</h2>
            <h2>{{ isEnglish ? 
              '⭓ Photography and reels recording are allowed during the screening, but the use of flash is prohibited.' : 
              '⭓ 播映過程可拍照、即時動態拍攝，但禁止使用閃光燈。' }}</h2>
            <h2>{{ isEnglish ? 
              '⭓ Programs may be subject to change.' : 
              '⭓ 主辦單位保有調整與變更活動之權利。' }}</h2>
    
          </div>
          <div class="lecture-list" v-if="showContentB">
            <h2>{{ isEnglish ? 
              '⭓ Commercial photography (e.g., wedding photos, product catalogs, photography teaching, etc.) or other photography that affects the safety and viewing quality of the venue is not allowed in the venue.' : 
              '⭓ 館內不開放商業攝影（例：婚紗、商品型錄、攝影教學等）或其他影響場館安全及參觀品質之拍攝。' }}</h2>
            <h2>{{ isEnglish ? 
              '⭓ Except as otherwise specially posted, non-commercial photography is allowed in the venue. To maintain and respect the intellectual property rights of creators, please do not copy video works and films in the exhibition hall.' : 
              '⭓ 館內除另有特別告示，開放非商業性攝影。為維護及尊重創作者智慧財產權， 請勿翻攝展場內錄像作品及影片。' }}</h2>
            <h2>{{ isEnglish ? 
              '⭓ Please do not use flash, tripods, handheld stabilizers or selfie sticks and other professional equipment or auxiliary equipment for photography.' : 
              '⭓ 攝影請勿使用閃光燈、三腳架、手持穩定器或自拍棒等各式專業器材或輔助設備。' }}</h2>
          </div>
          <div class="lecture-list" v-if="showContentC">
            <!-- <h2>{{ isEnglish ? 'Admission Information' : '入場方式' }}</h2> -->
            <h2 style="color: #81C1DF;">{{ isEnglish ? '【Screening & Live Performance】' : '【播映及現場演出】' }}</h2>
            <h2>{{ isEnglish ? '⭓ Ticket required for entry. One person, one ticket admission.' : '⭓ 每場次皆需事先索票，一人一票憑票入場。' }}</h2>
            <h2>{{ isEnglish ? '⭓ Please arrive at least 10 minutes before the performance or screening. Latecomers will not be admitted.' : '⭓ 每場播映/現場演出於開演前10分鐘開放入場，並不開放遲到觀眾入場。' }}</h2>
            <h2>{{ isEnglish ? '⭓ From Apr. 7th, tickets for the following weekend’s screenings will be released every Monday.' : '⭓ 4/1(三) 中午12:00早鳥8折啟售；4/14(二) 中午12:00 正式啟售。' }}</h2>
            <h2>
              <span v-if="isEnglish">
                ⭓ For detailed program registration information, please visit the
                <a href="https://www.facebook.com/CLAB.FUTUREVISIONLAB/" style="color: pink;text-decoration:none" target="_blank" rel="noopener">C-LAB Future Vision Lab Facebook page</a>
                or the
                <a href="https://www.accupass.com/organizer/detail/1807130939251014675956" style="color: pink;text-decoration:none" target="_blank" rel="noopener">C-LAB event page on ACCUPASS</a>.
              </span>
              <span v-else>
                ⭓ 節目索票資訊請鎖定「C-LAB 未來視覺實驗室」
                <a href="https://www.facebook.com/CLAB.FUTUREVISIONLAB/" style="color: pink;text-decoration:none" target="_blank" rel="noopener">臉書</a>
                或「臺灣當代文化實驗場C-LAB」
                <a href="https://www.accupass.com/organizer/detail/1807130939251014675956" style="color: pink;text-decoration:none" target="_blank" rel="noopener">ACCUPASS</a>。
              </span>
            </h2>
            <h2>
              <span v-if="isEnglish">
                ⭓ For detailed program information, please visit the
                <a href="https://fvl.clab.org.tw/" style="color: pink;text-decoration:none" target="_blank" rel="noopener">FUTURE VISION LAB official website</a>.
              </span>
              <span v-else>
                ⭓ 詳細節目資訊請至
                <a href="https://fvl.clab.org.tw/" style="color: pink;text-decoration:none" target="_blank" rel="noopener">FUTURE VISION LAB 官網</a>
                查詢。
              </span>
            </h2>

            <h2 style="color: #81C1DF;margin-top: 1em;">{{ isEnglish ? '【Paid Programs】' : '【售票節目】' }}</h2>
            <h2 v-if="!isEnglish">售票節目共2檔：5/13(三) 19:30｜《未來視覺派對#3》、5/30(六) 19:00｜姚瑞中 X 郭一 X Meuko! Meuko《虛迷山》派對場</h2>
            <h2 v-if="!isEnglish">⭓ 一人一票憑票入場。</h2>
            <h2 v-if="!isEnglish">⭓ 開演前10分鐘開放入場，並不開放遲到觀眾入場。</h2>
            <h2 v-if="!isEnglish">⭓ 4/1(三) 中午12:00早鳥8折啟售；4/14(二) 中午12:00 正式啟售。</h2>

            <h2 v-if="isEnglish">Ticketed programs include: May 13 (Wed.) 7:30 p.m. “Future Vision Party #3”, May 30 (Sat.) 7:30 p.m. “YAO Jui-Chung × KUO Yi × Meuko Meuko, Mount Ecstasy“</h2>
            <h2 v-if="isEnglish">⭓ One person, one ticket admission.</h2>
            <h2 v-if="isEnglish">⭓ Please arrive at least 10 minutes before the performance or screening. Latecomers will not be admitted.</h2>
            <h2 v-if="isEnglish">⭓ Early Bird 20% Off starts at 12:00 p.m. on April 1 (Wed.)</h2>
            <h2 v-if="isEnglish">⭓ General Sale starts at 12:00 p.m. on April 14 (Tue.)</h2>

            <h2 style="color: #81C1DF;margin-top: 1em;">{{ isEnglish ? '【Exhibition】' : '【展覽】' }}</h2>
            <div v-if="!isEnglish" class="exhibition-info">
              <h2>5/21-24｜魏廷宇《誤差追獵》</h2>
              <h2>⭓ 每12分鐘為一梯次，每梯次開放30人進場體驗。</h2>
              <h2>⭓ 進場方式採現場排隊依序入場，直到該梯次人數額滿為止。</h2>
              <h2>⭓ 若想要再次體驗作品，需於前一梯次結束後先離場並重新排隊依序等候入場。</h2>
              <h2>⭓ 開放入場時若排隊人員不在現場即視同放棄，需重新排隊依序等候入場。</h2>
              <div class="exhibition-spacer"></div>
              <h2>5/28-31｜姚瑞中 X 郭一 X Meuko! Meuko《虛迷山》</h2>
              <h2>⭓ 採現場排隊依序入場，場內人數額滿為止。</h2>
              <h2>⭓ 場內人數上限為100人，若額滿請等候場內觀眾離場後，依現場人數管制進場。</h2>
              <h2>⭓ 開放入場時若排隊人員不在現場即視同放棄，需重新排隊依序等候入場。</h2>
            </div>
            <div v-else class="exhibition-info">
              <h2>May 21-24 “Tim WEI, Stalking for Errors“</h2>
              <h2>⭓ Each session lasts 12 minutes, with a maximum of 30 participants per session.</h2>
              <h2>⭓ Entry will be granted in order of on-site queue until capacity is reached.</h2>
              <h2>⭓ To experience the work again, you must leave after the current session ends and rejoin the queue for the next session.</h2>
              <h2>⭓ If individuals in the queue are not present when entry opens, they will be considered to have forfeited their places and must rejoin the line in order to wait for entry.</h2>
              <div class="exhibition-spacer"></div>
              <h2>May 28-31 “YAO Jui-Chung × KUO Yi × Meuko Meuko, Mount Ecstasy“.</h2>
              <h2>⭓ Entry will be granted in order of on-site queue until capacity is reached.</h2>
              <h2>⭓ The maximum capacity is 100 people. If the venue is full, please wait for audiences exiting before entering according to the capacity control.</h2>
              <h2>⭓ If individuals in the queue are not present when entry opens, they will be considered to have forfeited their places and must rejoin the line in order to wait for entry.</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
import Calendar from './Calendar2.vue';

const SCHEDULE_WORKS_API_URL = 'https://unzip.clab.org.tw/api/v1/projects/21/works';
const SCHEDULE_WORKS_API_AUTH = 'Api-Key 1e801a8fbe21fe2bef15df853e62ec9dc5a1cd08';

/** 節目表輪播：僅用作品 featured_photo_media（相對路徑補 unzip-clab-api 網域） */
function resolveWorkFeaturedPhotoUrl(w) {
  const directUrl = w?.featured_photo_media?.url || w?.featuredPhotoMedia?.url;
  if (!directUrl) return '';
  const s = String(directUrl);
  if (/^https?:\/\//i.test(s)) return s;
  return `https://unzip-clab-api.clab.org.tw/${s.replace(/^\/+/, '')}`;
}

const FALLBACK_SCHEDULE_CAROUSEL_IMAGES = [
  require('../assets/slider1.jpg'),
  require('../assets/slider2.jpg'),
  require('../assets/slider3.jpg'),
  require('../assets/slider4.jpg'),
  require('../assets/slider5.jpg'),
  require('../assets/slider6.jpg'),
  require('../assets/slider7.jpg'),
  require('../assets/slider8.jpg'),
];

export default {
  name: 'DraWers',
  components: {
    Calendar
  },
  props: {
    showLiveDrawer: {
      type: Boolean,
      default: false
    },
    showDrawer: {
      type: Boolean,
      default: false
    },
    showLectureDrawer: {
      type: Boolean,
      default: false
    },
    currentEventImage: {
      type: String,
      default: ''
    },
    isEnglish: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close-drawer', 'event-type-changed'],
  data() {
    return {
      isScheduleComingSoon: false,
      showContentA: true,
      showContentB: false,
      showContentC: false,
      currentImageIndex: 0,
      carouselImages: [...FALLBACK_SCHEDULE_CAROUSEL_IMAGES],
      carouselTimer: null
    }
  },
  mounted() {
    this.loadScheduleCarouselImages().then(() => {
      this.startCarousel();
    });
    // 行動裝置自動播放處理
    const video = this.$refs.lectureVideo;
    if (video) {
      try {
        video.muted = true;
        video.playsInline = true;
        video.autoplay = true;
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        video.setAttribute('x5-playsinline', '');
        video.setAttribute('preload', 'auto');
        video.setAttribute('autoplay', '');
        // 確保不顯示控制列，避免干擾自動播放
        video.removeAttribute('controls');
        video.controls = false;
      } catch (err) {
        console.warn('設定講座背景影片屬性時發生錯誤', err);
      }

      const tryPlay = () => {
        try { video.load(); } catch (e) { console.warn('講座影片重新載入失敗', e); }
        const p = video.play();
        if (p && typeof p.then === 'function') {
          p.catch((err) => {
            console.log('講座背景影片自動播放被阻止:', err);
          });
        }
      };

      if (video.readyState >= 2) {
        tryPlay();
      } else {
        video.addEventListener('canplay', tryPlay, { once: true });
        setTimeout(tryPlay, 500);
      }

      // 使用者首次互動後再補嘗一次（若初次被阻擋）
      const resumeOnGesture = () => {
        if (video && video.paused) {
          tryPlay();
        }
        window.removeEventListener('touchstart', resumeOnGesture, true);
        window.removeEventListener('pointerdown', resumeOnGesture, true);
        window.removeEventListener('scroll', resumeOnGesture, true);
        window.removeEventListener('visibilitychange', onVis, true);
      };
      const onVis = () => { if (!document.hidden) resumeOnGesture(); };
      window.addEventListener('touchstart', resumeOnGesture, true);
      window.addEventListener('pointerdown', resumeOnGesture, true);
      window.addEventListener('scroll', resumeOnGesture, true);
      window.addEventListener('visibilitychange', onVis, true);

      // 記錄清理函式
      this._cleanupLectureVideo = () => {
        try {
          window.removeEventListener('touchstart', resumeOnGesture, true);
          window.removeEventListener('pointerdown', resumeOnGesture, true);
          window.removeEventListener('scroll', resumeOnGesture, true);
          window.removeEventListener('visibilitychange', onVis, true);
          video.removeEventListener('canplay', tryPlay, { once: true });
        } catch (err) { console.warn('清理講座影片事件失敗', err); }
      };
    }
  },
  beforeUnmount() {
    this.stopCarousel();
    if (this._cleanupLectureVideo) {
      this._cleanupLectureVideo();
      this._cleanupLectureVideo = null;
    }
  },
  methods: {
    toggleContent() {
      this.showContentA = true;
      this.showContentB = false;
      this.showContentC = false;
    },
    toggleContent2() {
      this.showContentB = true;
      this.showContentA = false;
      this.showContentC = false;
    },
    toggleContent3() {
      this.showContentC = true;
      this.showContentA = false;
      this.showContentB = false;
    },
    handleEventTypeChange(eventType) {
      this.$emit('event-type-changed', eventType);
    },
    nextSlide() {
      const n = this.carouselImages.length;
      if (n === 0) return;
      this.currentImageIndex = (this.currentImageIndex + 1) % n;
    },
    prevSlide() {
      const n = this.carouselImages.length;
      if (n === 0) return;
      this.currentImageIndex = this.currentImageIndex === 0 ? n - 1 : this.currentImageIndex - 1;
    },
    goToSlide(index) {
      this.currentImageIndex = index;
    },
    async loadScheduleCarouselImages() {
      try {
        const { data } = await axios.get(SCHEDULE_WORKS_API_URL, {
          headers: { Authorization: SCHEDULE_WORKS_API_AUTH },
        });
        const list = Array.isArray(data) ? data : (data?.data || data?.results || []);
        // 8 張輪播：前 6 件為 API 第 1–6 件；第 7 張改為第 9 件的 featured；第 8 張為第 8 件
        const workIndices = [0, 1, 2, 3, 4, 5, 8, 7];
        const urls = [];
        for (let slot = 0; slot < workIndices.length; slot++) {
          const idx = workIndices[slot];
          let u = list[idx] ? resolveWorkFeaturedPhotoUrl(list[idx]) : '';
          if (!u && slot === 6 && list[6]) {
            u = resolveWorkFeaturedPhotoUrl(list[6]);
          }
          if (typeof u === 'string' && u.length > 0) urls.push(u);
        }
        if (urls.length > 0) {
          this.carouselImages = urls;
          this.currentImageIndex = 0;
        }
      } catch (e) {
        console.error('節目表輪播：載入作品圖失敗，使用本地備援', e);
      }
    },
    startCarousel() {
      this.stopCarousel();
      if (this.carouselImages.length === 0) return;
      this.carouselTimer = setInterval(() => {
        this.nextSlide();
      }, 4000); // 每4秒自動切換
    },
    stopCarousel() {
      if (this.carouselTimer) {
        clearInterval(this.carouselTimer);
        this.carouselTimer = null;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  box-shadow: -4px 0 24px rgba(0,0,0,0.18);
  z-index: 1000;
  transform: translateX(-100%);
  transition: transform 0.4s cubic-bezier(.77,0,.18,1);
  display: flex;
  flex-direction: column;
  padding: 0;
  pointer-events: none;
}

.drawer.open {
  transform: translateX(0);
  pointer-events: auto;
}

.live-drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  overflow-y: hidden;
  background: #000000;
  box-shadow: -4px 0 24px rgba(0,0,0,0.18);
  z-index: 1000;
  transform: translateX(100%);
  transition: transform 0.4s cubic-bezier(.77,0,.18,1);
  display: flex;
  flex-direction: column;
  padding: 0;
  pointer-events: none;
}

.live-drawer.open {
  transform: translateX(0);
  pointer-events: auto;
}

.lecture-drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #595959;
  color: black;
  z-index: 1000;
  transform: scale(0);
  border-radius: 50%;
  transform-origin: bottom left;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
  pointer-events: none;
}

.lecture-drawer.open {
  transform: scale(1);
  border-radius: 0;
  pointer-events: auto;
}

.drawer-close {
  align-self: flex-end;
  font-size: 3rem;
  background: none;
  border: none;
  color: #ffffff;
  margin: 18px 24px 0 0;
  cursor: pointer;
  z-index: 1;
}

.drawer-content {
  position: absolute;
  z-index: 0;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100vw;
  height: 100vh;
  color: #222;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

.drawer-content2 {
  width: 100vw;
  height: 100vh;
  color: #222;
  padding: 0px;
  flex: 1;
  overflow-y: auto;
  margin-bottom: 0;
}

.drawer-content2 img {
  width: 45%;
  height: 100%;
  padding: 0px;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 0;
  object-fit: cover;
  display: flex;
}

.cal-page {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

.cal-title {
  width: 50%;
  min-height: 0;
  height: auto;
  padding: 30px;
  padding-bottom: 24px;
  box-sizing: border-box;
  z-index: 1;
}

.schedule-coming-soon-text {
  margin: 0;
  padding: 18px 16px;
  font-size: clamp(18px, 2.4vw, 24px);
  font-weight: 600;
  line-height: 1.5;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 14px;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(6px);
  max-width: 720px;
}

.drawer.coming-soon .cal-title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.drawer-title {
  position: absolute;
  width: 58%;
  height:auto;
  z-index: 1001;
  color: #ffffff;
  top: 5%;
  left: 6%;
  font-size: 1rem;
  text-decoration: none;
  letter-spacing: 0.02rem;
  backdrop-filter: blur(4px);
  background: rgba(0, 0, 0, 0.45);
  padding: 20px 24px;
  // border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.35);
}

.drawer-title h2 {
  margin: 0 0 10px 0;
  line-height: 1.3;
}

.drawer-title p {
  margin: 0;
  line-height: 1.9;
  text-align: justify;
  letter-spacing: 0.2px;
  word-break: break-word;
  padding:10px;  
  letter-spacing:0;
}

.fvl-logo {
  position: absolute;
  top: 0.5em;
  right: 0;
  width: 6em;
  height: auto;
}

.lecture-drawer .drawer-content {
  // padding: 40px 32px 32px 32px;
  flex: 1;
  overflow-y: auto;
  color: white;
  padding-bottom: 96px; /* 底部留白：避免文字貼齊視窗底部 */
}

.list-text {
  background-color: transparent;
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 20px;
  margin-left: 40px;
}

.list-btn1,
.list-btn2,
.list-btn3 {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;
}

.list-btn1 h2,
.list-btn2 h2,
.list-btn3 h2 {
  margin: 0;
  padding: 0;
  font-size: 1em;
  font-weight: 700;
  line-height: 1.25;
  width: 100%;
}

.list-btn1 {
  background-color: rgb(255, 255, 255);
  padding: 10px 14px;
  border: 1px black solid;
  color: rgb(0, 0, 0);
}
.list-btn1:hover{
  background-color:#343434;
  color: white;
}

.list-btn2 {
  background-color: white;
  padding: 10px 14px;
  border: 1px black solid;
  color: black;
}

.list-btn2:hover {
  background-color: #343434;
  color: white;
}

.list-btn3 {
  background-color: #ffffff;
  padding: 10px 14px;
  border: 1px black solid;
  color: rgb(0, 0, 0);
}

.list-btn3:hover {
  background-color: #333333;
  color: white;
}

.content-container {
  height: 50%;
  width: 100%;
  min-height: 200px;
  margin-top: 10px;
  margin-bottom: 3em;
  padding-bottom: 40px; /* 內容底部再多留一點空間 */
}

.lecture-list {
  width: 90%;
  // margin-top: 40px;
  margin-left: 40px;
  padding: 20px;
  gap: 20px;
  font-size: 1em;
}

.exhibition-info h2 {
  margin: 0 0 10px 0;
}

.exhibition-spacer {
  height: 16px;
}

.carousel-container {
  position: fixed;
  right: 0;
  top: 0;
  width: 50%;
  height: 100vh;
  overflow: hidden;
  z-index: 0;
}

.carousel-wrapper {
  position:absolute;
  width: 100%;
  height: 100%;
}

.carousel-image {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.carousel-image.active {
  opacity: 1;
}

.carousel-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
}

.indicator {
  width: 10px;
  height: 15px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.indicator.active {
  background-color: #fff;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 10;
  font-size: 2rem;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  transition: background-color 0.3s ease;
}

.carousel-btn:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.carousel-btn.prev {
  left: 10px;
}

.carousel-btn.next {
  right: 10px;
}

@media (max-width: 768px) {
  /* 入場須知主標 */
  .lecture-drawer .all-content > h2:first-of-type {
    font-size: 1em !important;
  }

  /* 注意事項／入場方式 點開後的內文列表 */
  .lecture-list {
    margin: 0;
    font-size: 0.7em;
  }

  .lecture-list h2 {
    font-size: 1em;
    line-height: 1.5;
  }

  .list-text{
    padding: 1em;
    margin-left: 0.5em;
    width: calc(100% - 1em);
    box-sizing: border-box;
    align-items: stretch;
  }

  .list-btn1,
  .list-btn2,
  .list-btn3 {
    flex: 1;
    min-height: 48px;
    padding: 12px 10px;
  }

  .list-btn1 h2,
  .list-btn2 h2,
  .list-btn3 h2 {
    font-size: 0.95rem;
  }
  .carousel-container {
    display: none;
  }

  .drawer-content2 img {
    display: none;
    width: 80%;
    height: 50%;
    padding: 20px;
  }
  
  .cal-title {
    padding: 0;
    width: 100%;
  }
  
  .live-drawer {
    max-width: 100vw;
    width: 100vw;
    padding: 0;
  }
  
  .drawer-title {
    width: calc(100% - 32px);
    height:auto;
    top: 12%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.8em;
    padding: 16px;
    z-index: 1001;
    text-align: center;
  }
  .drawer-title p {
    padding: 0;
  }

  .fvl-logo {
    position: static !important;
    display: block;
    margin: 0 auto 8px;
    width: 6em;
    height: auto;
  }
  
  .drawer-close {
    margin: 12px 12px 0 0;
    font-size: 2rem;
  }
}

@media (max-width: 900px) {
  .carousel-container {
    display: none;
  }
  
  .drawer-content2 img {
    display: none;
    width: 80%;
    height: auto;
    padding: 20px;
  }
  
  .cal-title {
    padding: 0;
    width: 100%;
  }
}
</style> 