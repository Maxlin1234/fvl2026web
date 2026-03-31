<template>
  <div>
    <section class="fvl-fest-2026-banner">
      <div class="banner-inner">
        <img
          class="banner-image"
          src="/imgs/fvl2026.png"
          alt="FVL FEST 2026"
        >
    
        <div class="banner-overlay"></div>
        <!-- <div class="banner-title-wrap">
          <p class="banner-subtitle">FVL FEST</p>
          <h1 class="banner-title">2026</h1>
        </div> -->
      </div>
    </section>
    <!-- 首頁區塊 -->
    <!-- <HeroSection 
      :showButtons="false" 
      @show-drawer="handleShowDrawer" 
      @change-en="handleLanguageChange" 
    /> -->
    <!-- <BannerParticles/> -->

    <!-- 全域角落按鈕 -->
    <!-- <div class="global-corner-btns" :class="[{ en: isEnglish }, { expanded: showAllButtons }]">
      <button 
        class="corner-btn target top-left" 
        @mouseenter="handleShowDrawer('schedule')"
      >
        <span class="btn-zh">{{ isEnglish ? 'SCHEDULE' : '場次表' }}</span>
      </button>
      <button 
        class="corner-btn target top-right" 
        @click="handleLanguageChange(!isEnglish)"
      >
        <span class="btn-zh">{{ isEnglish ? '中文' : 'EN' }}</span>
      </button>
      <button 
        class="corner-btn target bottom-left" 
        @mouseenter="handleShowDrawer('lecture')"
      >
        <span class="btn-zh">{{ isEnglish ? 'INFO' : '入場須知' }}</span>
      </button>
      <button 
        class="corner-btn target bottom-right" 
        @click="handleShowDrawer('about')"
      >
        <span class="btn-zh">{{ isEnglish ? 'ABOUT' : '關於我們' }}</span>
      </button>
      <button 
        class="corner-btn launcher bottom-right" 
        @click="handleMenuLauncherClick"
      >
        <span class="btn-zh">{{ isEnglish ? 'MENU' : '選單' }}</span>
      </button>
    </div> -->

    <!-- 主要內容區塊 -->
  

    <!-- 抽屜組件 -->
    <!-- <Drawers 
      :showLiveDrawer="showLiveDrawer"
      :showDrawer="showDrawer"
      :showLectureDrawer="showLectureDrawer"
      :currentEventImage="currentEventImage"
      :isEnglish="isEnglish"
      @close-drawer="handleCloseDrawer"
      @event-type-changed="handleEventTypeChange"
    /> -->
  </div>
</template>

<script>
// import BannerParticles from './BannerParticles.vue';
import axios from 'axios';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// 常數定義
const API_BASE_URL = 'https://unzip-clab-api.clab.org.tw/api/v1';
const LOCAL_STORAGE_KEYS = {
  LANG: 'lang'
};
const DRAWER_TYPES = {
  SCHEDULE: 'schedule',
  ABOUT: 'about',
  LECTURE: 'lecture'
};
const EVENT_TYPES = {
  EXHIBITION: 'exhibition',
  WORKSHOP: 'workshop',
  PERFORMANCE: 'performance'
};

export default {
  name: 'fvl-fest-2026-origin',
  components: {},
  data() {
    return {
      // 狀態管理
      isEnglish: false,
      showAllButtons: true, // 載入即展開
      autoCollapseEnabled: true, // 使用者手動展開後，暫停自動收合
      
      // 抽屜狀態
      showLiveDrawer: false,
      showDrawer: false,
      showLectureDrawer: false,
      
      // 資料
      firstImage: {},
      portfolioList: [],
      currentEventType: EVENT_TYPES.EXHIBITION,
      
      // 表單（如果需要的話）
      form: {
        name: '',
        email: '',
        message: ''
      },
      
      // 內部狀態
      resizeHandler: null,
      cornerButtonsTrigger: null
    }
  },
  computed: {
    currentEventImage() {
      return this.currentEventType || EVENT_TYPES.EXHIBITION;
    }
  },
  watch: {
    showLectureDrawer(isOpen) {
      if (isOpen) return;
      this.$nextTick(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      });
    },
  },
  async mounted() {
    try {
      this.initLanguage();
      await this.fetchData();
      this.initAnimations();
      this.setupCornerMenuScrollTrigger();
    } catch (error) {
      console.error('MainSection initialization failed:', error);
    }
  },
  beforeUnmount() {
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }
    if (this.cornerButtonsTrigger) {
      this.cornerButtonsTrigger.kill();
      this.cornerButtonsTrigger = null;
    }
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  },
  methods: {
    // 語言管理
    initLanguage() {
      try {
        const savedLang = localStorage.getItem(LOCAL_STORAGE_KEYS.LANG);
        this.isEnglish = savedLang === 'en';
        console.log("Initial language set to:", this.isEnglish ? "English" : "Chinese");
      } catch (error) {
        console.warn("Failed to read language from localStorage:", error);
        this.isEnglish = false; // 預設為中文
      }
    },

    handleLanguageChange(isEnglish) {
      console.log('Language changed to:', isEnglish ? 'English' : 'Chinese');
      this.isEnglish = isEnglish;
      
      try {
        localStorage.setItem(LOCAL_STORAGE_KEYS.LANG, isEnglish ? 'en' : 'zh');
      } catch (error) {
        console.warn('Failed to persist language:', error);
      }
    },

    // Corner MENU 自動收合
    setupCornerMenuScrollTrigger() {
      this.$nextTick(() => {
        if (!this.$refs.fixedSectionAnchor) return;
        if (this.cornerButtonsTrigger) {
          this.cornerButtonsTrigger.kill();
          this.cornerButtonsTrigger = null;
        }
        this.cornerButtonsTrigger = ScrollTrigger.create({
          trigger: this.$refs.fixedSectionAnchor,
          start: 'top center',
          onEnter: () => { if (this.autoCollapseEnabled) { this.showAllButtons = false; } },      // 進入 FixedSection 自動收合（若啟用）
          onLeaveBack: () => { this.showAllButtons = true; this.autoCollapseEnabled = true; }    // 回到上方自動展開並恢復自動收合
        });
      });
    },

    // 使用者點擊 MENU（手動展開，暫停自動收合）
    handleMenuLauncherClick() {
      this.showAllButtons = true;
      this.autoCollapseEnabled = false;
    },

    // 資料獲取
    async fetchData() {
      try {
        await Promise.all([
          this.fetchFirstImage(),
          this.fetchPortfolioData(),
          this.fetchDatabaseData()
        ]);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    },

    async fetchFirstImage() {
      try {
        const response = await axios.get(`${API_BASE_URL}/schedules/5/works?page=0&limit=25`);
        this.firstImage = response.data.results[1]?.photo_1 || {};
      } catch (error) {
        console.error('Failed to fetch first image:', error);
        this.firstImage = {};
      }
    },

    async fetchPortfolioData() {
      try {
        const response = await axios.get(`${API_BASE_URL}/schedules/10/works?page=0&limit=25`);
        this.portfolioList = response.data.results || [];
      } catch (error) {
        console.error('Failed to fetch portfolio data:', error);
        this.portfolioList = [];
      }
    },

    async fetchDatabaseData() {
      try {
        const response = await axios.get('http://localhost:3001/api/data');
        console.log('Database data:', response.data);
        return response.data;
      } catch (error) {
        console.error('Failed to fetch database data:', error);
        return [];
      }
    },

    // 抽屜管理
    handleShowDrawer(drawerType) {
      this.showLiveDrawer = false;
      this.showDrawer = false;
      this.showLectureDrawer = false;

      switch (drawerType) {
        case DRAWER_TYPES.SCHEDULE:
          this.showDrawer = true;
          break;
        case DRAWER_TYPES.ABOUT:
          this.showLiveDrawer = true;
          break;
        case DRAWER_TYPES.LECTURE:
          this.showLectureDrawer = true;
          break;
        default:
          console.warn('Unknown drawer type:', drawerType);
      }
    },

    handleCloseDrawer(drawerType) {
      switch (drawerType) {
        case DRAWER_TYPES.SCHEDULE:
          this.showDrawer = false;
          break;
        case DRAWER_TYPES.ABOUT:
          this.showLiveDrawer = false;
          break;
        case DRAWER_TYPES.LECTURE:
          this.showLectureDrawer = false;
          break;
        default:
          console.warn('Unknown drawer type:', drawerType);
      }
    },

    handleEventTypeChange(eventType) {
      this.currentEventType = eventType;
    },

    // 動畫初始化
    initAnimations() {
      this.$nextTick(() => {
        this.initTextAnimation();
        this.initSunAnimation();
        this.initCloud1Animation();
        this.initCloud2Animation();
        this.initServicesSliderScroll();
        this.initAboutStatsAnimation();
        this.initAboutTextAnimation();
      });
    },

    initTextAnimation() {
      this.animateSplitText('.split');
      this.animateSplitText('.hero-title');
      this.animateSplitText('.hero-subtitle', { type: 'words' });
      this.initSectionAnimations();
    },

    animateSplitText(selector, options = {}) {
      const element = document.querySelector(selector);
      if (!element) return;
      const delay = selector === '.hero-subtitle' ? 0.5 : 0;
      const duration = options.type === 'words' ? 0.6 : 0.8;
      gsap.fromTo(
        element,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration, delay, ease: 'power2.out' }
      );
    },

    initSectionAnimations() {
      const sections = [
        { id: '#schedule', elements: '.section-title, .schedule-table' },
        { id: '#portfolio', elements: '.section-title, .portfolio-item' },
        { id: '#team', elements: '.section-title, .team-item' }
      ];

      sections.forEach(({ id, elements }) => {
        gsap.fromTo(`${id} ${elements}`, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            stagger: 0.2, 
            ease: "power2.out",
            scrollTrigger: { 
              trigger: id, 
              start: "top 80%", 
              end: "bottom 20%", 
              toggleActions: "play none none reverse" 
            }
          }
        );
      });
    },

    initSunAnimation() {
      const sunImg = this.$refs.sunImg;
      if (!sunImg) return;
      gsap.set(sunImg, { y: '100%', opacity: 1 });
      gsap.to(sunImg, { y: '0%', repeat: 0, yoyo: true, opacity: 1, duration: 2, ease: "power2.out" });
    },

    initCloud1Animation() {
      const cloud1Img = this.$refs.cloud1Img;
      if (!cloud1Img) return;
      gsap.set(cloud1Img, { y: '100%', opacity: 1 });
      gsap.to(cloud1Img, { y: '0%', opacity: 1, duration: 4, ease: "power2.out" });
    },

    initCloud2Animation() {
      const cloud2Img = this.$refs.cloud2Img;
      if (!cloud2Img) return;
      gsap.set(cloud2Img, { y: '100%', opacity: 1 });
      gsap.to(cloud2Img, { y: '0%', opacity: 1, duration: 3, ease: "power2.out" });
    },

    initServicesSliderScroll() {
      this.$nextTick(() => {
        const slider = this.$refs.servicesSlider;
        if (!slider) return;

        const container = slider.parentElement;
        const cardWidth = 320;
        const gap = 24;
        const containerPadding = 40;
        const availableWidth = container.offsetWidth - containerPadding;
        const cardsPerView = Math.floor(availableWidth / (cardWidth + gap));
        const totalCards = slider.children.length;
        const maxScroll = Math.max(0, (totalCards - cardsPerView) * (cardWidth + gap));
        if (maxScroll <= 0) return;
        gsap.set(slider, { x: 0 });
        gsap.to(slider, { x: -maxScroll, ease: 'none',
          scrollTrigger: { trigger: '#services', start: 'top top', end: `+=${maxScroll}`, scrub: 1.2, pin: true, anticipatePin: 1 }
        });
      });
    },

    // About 區塊的 .about-stats 由右至左淡入
    initAboutStatsAnimation() {
      gsap.fromTo(
        '.about .about-stats',
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.about',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    },

    // About 區塊的 .about-text 由左至右淡入
    initAboutTextAnimation() {
      gsap.fromTo(
        '.about .about-text',
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about',
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    },

    // 工具方法
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },

    submitForm() {
      alert('感謝您的訊息！我們會盡快回覆您。');
      this.form = { name: '', email: '', message: '' };
    }
  }
}
</script>

<style lang="scss">
// 變數定義
$body-font: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
$primary-bg: #181818;
$white: #fff;
$black: #111;
$gray-light: #f5f5f5;
$gray-medium: #333;
$gray-dark: #232526;

// 基礎樣式
body {
  background: $primary-bg;
  color: $white;
  font-family: $body-font;
  line-height: 1.6;
  margin: 0 !important;
  overflow-x: hidden; // 防止手機版左右移動
}

h1 {
  font-size: 8vw;
  font-family: 'Syncopate', sans-serif;
}

.fvl-fest-2026-banner {
  width: 100%;
  min-height: auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 0;
  background: #000;
  overflow: visible;
}

.banner-inner {
  width: 100%;
  height: auto;
  margin: 0 auto;
  position: relative;
}

.banner-image {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
  object-position: center top;
  border-radius: 0;
}

.banner-overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      circle at 82% 88%,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.08) 40%,
      rgba(0, 0, 0, 0.28) 100%
    ),
    linear-gradient(
      to top,
      rgba(0, 0, 0, 0.14) 0%,
      rgba(0, 0, 0, 0.24) 55%,
      rgba(0, 0, 0, 0.42) 100%
    );
  pointer-events: none;
}

.banner-title-wrap {
  position: absolute;
  left: clamp(16px, 4vw, 64px);
  bottom: clamp(24px, 8vh, 100px);
  z-index: 2;
  color: #fff;
  text-shadow: 0 4px 18px rgba(0, 0, 0, 0.72);
}

.banner-subtitle {
  margin: 0;
  font-size: clamp(14px, 1.6vw, 24px);
  letter-spacing: 0.28em;
  font-weight: 700;
}

.banner-title {
  margin: 8px 0 0 0;
  font-size: clamp(40px, 10vw, 132px);
  line-height: 0.95;
  font-weight: 900;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px 120px;
  color: $white;
}

// 區塊樣式
section {
  background: transparent;
  color: $white;
}

.about {
  background: $white;
  color: $black;

  .section-title,
  .about-text,
  .about-stats,
  .stat-item,
  .stat-item h3 {
    color: $black;
  }
}

.services {
  background: #ecebe7;
  color: $white;
}

.portfolio {
  background: $gray-dark;
  color: $white;
}

.contact {
  background: $primary-bg;
  color: $white;
}

.team {
  background: $gray-dark;
  color: $white;
}

.schedule {
  background: $primary-bg;
  color: $white;
}

.schedule-table {
  background: $white;
  color: $black;

  th, td {
    color: $black;
  }

  th {
    background: $gray-light;
    color: $black;
    border-bottom: 2px solid $gray-medium;
  }

  tr:not(:last-child) td {
    border-bottom: 1px solid #eee;
  }

  tr:hover td {
    background: #f0f0f0;
    color: $black;
  }
}

// 卡片樣式
.stat-item {
  background: $primary-bg;
  color: $white;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

.service-card {
  background: $gray-dark;
  color: $white;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.contact-form {
  background: $gray-dark;
  color: $white;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.team-content {
  position: relative;
  padding: 5em 2em 2em 2em; 
  backdrop-filter: blur(10px);
}

.team-list {
  background: transparent;
  color: $white;
}

.team-item {
  background: $black;
  color: #bbb;
  border-left: 4px solid $white;
  font-size: 1rem;
}

.team-role {
  font-weight: 700;
  color: $black;
  margin-right: 8px;
}

.footer-bar {
  background: $black;
  color: $white;
}

// 標題樣式
.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: $white;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
}

// 滾動條樣式
::-webkit-scrollbar {
  background: $primary-bg;
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background: $gray-medium;
  border-radius: 4px;
}

// 動畫相關樣式
.char { 
  display: inline-block; 
  transform-origin: center; 
}

.word { 
  display: inline-block; 
  margin-right: 0.2em; 
}

.hero-title, 
.hero-subtitle, 
.split { 
  white-space: nowrap; 
  overflow: hidden; 
}

.split { 
  font-size: 3.5rem; 
  font-weight: bold; 
  margin-bottom: 20px; 
  color: $white; 
}

@media (max-width: 768px) {
  .hero-title, 
  .hero-subtitle, 
  .split { 
    white-space: normal; 
  }
  .split { 
    font-size: 2.5rem; 
  }
}

// 全域角落按鈕樣式
.global-corner-btns {
  position: fixed;
  top: 0;
  inset: 0;
  pointer-events: none;
  z-index: 1000;
  --btn: 5em;

  .corner-btn {
    position: absolute;
    width: var(--btn);
    height: var(--btn);
    border-radius: 50%;
    background: $black;
    color: $white;
    font-weight: bold;
    border: none;
    box-shadow: 0 4px 20px rgba(255, 255, 255, 0.3);
    cursor: pointer;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.9s cubic-bezier(.2,.8,.2,1), opacity 0.5s ease;
    pointer-events: auto;

    span {
      display: block;
      max-width: 90%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  // 初始狀態：所有 target 按鈕疊在 MENU（右下角）
  .target {
    bottom: 24px; 
    right: 24px;
    transform: translate(0, 0) scale(0);
    opacity: 0;
  }

  // 展開狀態：從 MENU 飛向角落
  &.expanded .target { 
    opacity: 1; 
    transform: scale(1); 
  }
  
  &.expanded .target.top-left { 
    transform: translate(calc(-100vw + var(--btn) + 48px), calc(-100vh + var(--btn) + 48px)) scale(1); 
  }
  
  &.expanded .target.top-right { 
    transform: translate(0, calc(-100vh + var(--btn) + 48px)) scale(1); 
  }
  
  &.expanded .target.bottom-left { 
    transform: translate(calc(-100vw + var(--btn) + 48px), 0) scale(1); 
  }

  // MENU 按鈕
  .launcher { 
    bottom: 24px; 
    right: 24px; 
  }
  
  &.expanded .launcher { 
    opacity: 0; 
    pointer-events: none; 
    transition: opacity 0.3s ease; 
  }

  // 英文長字處理
  &.en .top-left span {
    font-size: 0.72em;
    max-width: 100%;
    white-space: nowrap;
    overflow: visible;
    text-overflow: clip;
    letter-spacing: 0.5px;
  }
}

// 響應式設計
@media (max-width: 768px) {
  .fvl-fest-2026-banner {
    min-height: 100vh;
    padding: 0;
  }

  .banner-inner {
    height: 100vh;
  }

  .banner-image {
    height: 100%;
    border-radius: 0;
    object-fit: cover;
    object-position: center;
  }

  .banner-title-wrap {
    left: 16px;
    bottom: 22px;
  }

  .banner-subtitle {
    letter-spacing: 0.18em;
  }

  .banner-title {
    font-size: clamp(38px, 18vw, 72px);
  }

  .global-corner-btns {
    --btn: 76px;

    .corner-btn {
      font-size: 13px;
      padding: 0 6px;
    }

    /* 手機版：遵循展開/收合規則；未展開時收合於 MENU */

    /* 四角定位，向內偏移並避開安全區域 */
    .top-left {
      top: calc(28px + env(safe-area-inset-top));
      left: calc(16px + env(safe-area-inset-left));
      right: auto;
      bottom: auto;
    }
    .top-right {
      top: calc(28px + env(safe-area-inset-top));
      right: calc(16px + env(safe-area-inset-right));
      left: auto;
      bottom: auto;
    }
    .bottom-left {
      bottom: calc(28px + env(safe-area-inset-bottom));
      left: calc(16px + env(safe-area-inset-left));
      right: auto;
      top: auto;
    }
    .bottom-right {
      bottom: calc(28px + env(safe-area-inset-bottom));
      right: calc(16px + env(safe-area-inset-right));
      left: auto;
      top: auto;
    }

    /* 僅在 expanded 時顯示四顆角落按鈕 */
    &.expanded .target {
      opacity: 1 !important;
      transform: none !important;
    }

    /* 讓文字完整顯示，不省略；英文再縮小一點 */
    .corner-btn span {
      white-space: nowrap;
      overflow: visible;
      text-overflow: clip;
    }
    &.en .corner-btn span {
      font-size: 0.78em;
      letter-spacing: 0.4px;
    }
  }

  .schedule-table th, 
  .schedule-table td {
    padding: 12px 8px;
    font-size: 0.95rem;
  }

  .service-card,
  .contact-form {
    padding: 30px 20px;
  }
}

@media (min-width: 769px) and (max-width: 1200px) {
  .fvl-fest-2026-banner {
    min-height: auto;
    padding: 0;
  }

  .banner-image {
    object-position: center top;
  }
}

@media (min-width: 2560px) {
  .global-corner-btns {
    --btn: 250px;

    .corner-btn {
      font-size: 3em;
    }
  }
}
</style>
