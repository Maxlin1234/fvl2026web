<template>
  <div class="fvl2026-page">
    <!-- 首頁區塊 -->
    <HeroSection
      :showButtons="true"
      :isEnglish="isEnglish"
      @show-drawer="handleShowDrawer"
      @change-en="handleLanguageChange"
    />
    <!-- <BannerParticles/> -->

    <!-- 主要內容區塊 -->
    <div ref="fixedSectionAnchor">
      <FixedSection :isEnglish="isEnglish" />
    </div>
    <AboutSection :firstImage="firstImage" :isEnglish="isEnglish" />
    <VideoBanner />
    <PortfolioSection :portfolioList="portfolioList" :isEnglish="isEnglish" />
    <TeamSection :isEnglish="isEnglish" />
    <FootBar />

    <!-- 抽屜組件 -->
    <Drawers 
      :showLiveDrawer="showLiveDrawer"
      :showDrawer="showDrawer"
      :showLectureDrawer="showLectureDrawer"
      :currentEventImage="currentEventImage"
      :isEnglish="isEnglish"
      @close-drawer="handleCloseDrawer"
      @event-type-changed="handleEventTypeChange"
    />
  </div>
</template>

<script>
// import BannerParticles from './BannerParticles.vue';
import FootBar from './FootBar.vue';
import HeroSection from './HeroSection.vue';
import FixedSection from './FixedSection.vue';
import AboutSection from './AboutSection.vue';
import VideoBanner from './VideoBanner.vue';
import PortfolioSection from './PortfolioSection.vue';
import TeamSection from './TeamSection.vue';
import Drawers from './Drawers.vue';
import axios from 'axios';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText.js';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';

gsap.registerPlugin(SplitText, ScrollTrigger);

// 常數定義
const WORKS_API_URL = 'https://unzip.clab.org.tw/api/v1/projects/21/works';
const API_AUTH = 'Api-Key 1e801a8fbe21fe2bef15df853e62ec9dc5a1cd08';
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
  name: 'fvl-fest-2026',
  components: { 
    // BannerParticles,
    FootBar, 
    HeroSection,
    FixedSection,
    AboutSection,
    VideoBanner,
    PortfolioSection,
    TeamSection,
    Drawers
  },
  data() {
    return {
      // 狀態管理
      isEnglish: false,

      // 抽屜狀態
      showLiveDrawer: false,
      showDrawer: false,
      showLectureDrawer: false,
      
      // 資料
      firstImage: '',
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
    }
  },
  computed: {
    currentEventImage() {
      const imageMap = {
        [EVENT_TYPES.EXHIBITION]: img1,
        [EVENT_TYPES.WORKSHOP]: img2,
        [EVENT_TYPES.PERFORMANCE]: img3
      };
      return imageMap[this.currentEventType] || img1;
    }
  },
  async mounted() {
    try {
      this.removeStrayBodyCanvases();
      this.initLanguage();
      await this.loadWorksData();
      this.initAnimations();
    } catch (error) {
      console.error('MainSection initialization failed:', error);
    }
  },
  beforeUnmount() {
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  },
  methods: {
    removeStrayBodyCanvases() {
      // 清除先前頁面 Three.js 遺留在 body 的 canvas（不影響本頁 Hero 內的 canvas）
      const bodyCanvases = Array.from(document.querySelectorAll('body > canvas'));
      bodyCanvases.forEach((canvasEl) => {
        if (canvasEl && canvasEl.parentNode === document.body) {
          canvasEl.parentNode.removeChild(canvasEl);
        }
      });
      // 同步清理 dat.gui 容器（若有）
      const datGuiPanels = Array.from(document.querySelectorAll('body > .dg.ac'));
      datGuiPanels.forEach((panel) => {
        if (panel && panel.parentNode === document.body) {
          panel.parentNode.removeChild(panel);
        }
      });
    },
    /**
     * 作品列表只請求一次 WORKS_API_URL，同步更新 firstImage 與 portfolioList。
     */
    async loadWorksData() {
      try {
        const response = await axios.get(WORKS_API_URL, {
          headers: { Authorization: API_AUTH },
        });
        const payload = response?.data;
        const works = Array.isArray(payload) ? payload : payload?.data || payload?.results || [];

        if (process.env.NODE_ENV === 'development') {
          console.log('[Fvl2026Final] works loaded', {
            status: response?.status,
            worksCount: works.length,
            firstWork: works[0] || null,
          });
        }

        this.firstImage = works[0]?.featured_photo_media?.url
          || works[0]?.featuredPhotoMedia?.url
          || '';

        this.portfolioList = works.map((w) => ({
          id: w.id,
          title: w.title,
          titleZhTw: w.titleZhTw || w.title_zh_tw,
          photo_1: w?.featured_photo_media?.url || w?.featuredPhotoMedia?.url || '',
          work_en: {
            title: w.title || '',
            interactive_description: '',
          },
          work_zh: {
            title: w.titleZhTw || w.title_zh_tw || w.title || '',
            interactive_description: '',
          },
        }));
      } catch (error) {
        console.error('[Fvl2026Final] loadWorksData failed', {
          message: error?.message,
          status: error?.response?.status,
          data: error?.response?.data,
        });
        this.firstImage = '';
        this.portfolioList = [];
      }
    },
    // 語言管理
    initLanguage() {
      // 依需求：初次載入預設為中文
      this.isEnglish = false;
      try {
        localStorage.setItem(LOCAL_STORAGE_KEYS.LANG, 'zh');
      } catch (error) {
        console.warn("Failed to persist default language:", error);
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

      const defaultOptions = {
        type: "chars, words",
        charsClass: "char",
        wordsClass: "word"
      };
      const config = { ...defaultOptions, ...options };
      const splitText = new SplitText(element, config);
      const targetElements = config.type.includes('chars') ? splitText.chars : splitText.words;
      
      gsap.set(targetElements, {
        opacity: 0,
        y: 50,
        rotationX: config.type.includes('chars') ? -90 : 0
      });
      gsap.to(targetElements, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "back.out(1.7)",
        delay: selector === '.hero-subtitle' ? 0.5 : 0
      });
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
          // scrub 數字越大越「拖尾」且捲動時越吃主執行緒；true = 與捲動同步、較順
          scrollTrigger: { trigger: '#services', start: 'top top', end: `+=${maxScroll}`, scrub: true, pin: true, anticipatePin: 0 }
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
.fvl2026-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: transparent;
}

.fvl2026-page .foot-bar {
  margin-top: auto;
}

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

// 響應式設計
@media (max-width: 768px) {
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

</style>
