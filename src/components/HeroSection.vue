<template>
  <section id="home" class="hero">
    <div class="hero-banner-wrapper">
      <div class="cursor"></div>

      <!-- Banner -->
      <div class="banner-title">
        <picture>
          <img :src="BannerDesktop" alt="Banner" decoding="async" fetchpriority="high" />
        </picture>
      </div>

      <div class="banner-title2">
        <img src="@/assets/banner_title2.svg" alt="">
      </div>

      <ThreeJsHand class="hero-visual" />

      <!-- 中文按鈕（置於最上層，可點擊／觸控開啟抽屜） -->
      <div v-if="showButtons && !isEnglish" class="hero-corner-btns zh_btns">
        <button
          type="button"
          class="corner-btn top-left"
          @click="$emit('show-drawer', 'schedule')"
        >
          <span class="btn-zh">場次表</span>

        </button>

        <button type="button" class="corner-btn top-right" @click="changeEn">
          <span class="btn-zh">EN</span>
    
        </button>

        <button
          type="button"
          class="corner-btn bottom-right"
          @click="$emit('show-drawer', 'about')"
        >
          <span class="btn-zh">關於我們</span>
       
        </button>

        <button
          type="button"
          class="corner-btn bottom-left"
          @click="$emit('show-drawer', 'lecture')"
        >
          <span class="btn-zh">入場須知</span>
        
        </button>
      </div>

      <!-- 英文按鈕 -->
      <div v-if="showButtons && isEnglish" class="hero-corner-btns en_btns">
        <button
          type="button"
          class="corner-btn top-left"
          @click="$emit('show-drawer', 'schedule')"
        >
          <span class="btn-zh">TIME</span>
 
        </button>

        <button type="button" class="corner-btn top-right" @click="changeZh">
          <span class="btn-zh">中文</span>

        </button>

        <button
          type="button"
          class="corner-btn bottom-right"
          @click="$emit('show-drawer', 'about')"
        >
          <span class="btn-zh">ABOUT</span>
      
        </button>

        <button
          type="button"
          class="corner-btn bottom-left"
          @click="$emit('show-drawer', 'lecture')"
        >
          <span class="btn-zh">INFO</span>
       
        </button>
      </div>

      <!-- 社群媒體連結 -->
      <div v-if="showButtons" class="hero-social-links">
        <a
          href="https://www.facebook.com/CLAB.FUTUREVISIONLAB"
          target="_blank"
          rel="noopener noreferrer"
          class="social-btn"
          aria-label="Facebook"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="30" height="30">
            <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.9V12h2.538V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
          </svg>
        </a>
        <a
          href="https://www.instagram.com/clab.futurevisionlab/"
          target="_blank"
          rel="noopener noreferrer"
          class="social-btn"
          aria-label="Instagram"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import BannerDesktop from '@/assets/banner_title1.svg';
import BannerMobile from '@/assets/Banner_mobile.jpg';

export default {
  name: 'HeroSection',
  components: {
    // Split heavy three.js code into a separate async chunk.
    ThreeJsHand: () => import('./ThreeJsHand.vue'),
  },
  emits: ['show-drawer', 'change-en'],
  props: {
    showButtons: { type: Boolean, default: false },
    /** 與父層 Fvl2026Final 語言狀態同步 */
    isEnglish: { type: Boolean, default: false },
  },
  data() {
    return {
      BannerDesktop,
      BannerMobile,
    };
  },
  mounted() {
    this.fixVhUnit(); // 桌面／不支援 svh 時作為 hero 高度 fallback
    this.initCursor();
    window.addEventListener('resize', this.onWindowResize);
    window.addEventListener('orientationchange', this.fixVhUnit);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
    window.removeEventListener('orientationchange', this.fixVhUnit);
  },
  methods: {
    /** 手機已用 100svh 固定首屏高度，略過 resize 與網址列連動，避免 3D 區塊隨捲動變形 */
    onWindowResize() {
      const mobile = typeof window.matchMedia === 'function'
        && window.matchMedia('(max-width: 768px)').matches;
      if (mobile && typeof CSS !== 'undefined' && CSS.supports?.('height: 100svh')) {
        return;
      }
      this.fixVhUnit();
    },
    fixVhUnit() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    },
    changeEn() {
      this.$emit('change-en', true);
    },
    changeZh() {
      this.$emit('change-en', false);
    },
    initCursor() {
      const cursor = document.querySelector('.cursor');
      if (!cursor) return;
      document.addEventListener('mousemove', e => {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';
      });
    }
  }
};
</script>

<style lang="scss" scoped>

html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* 🔒 鎖定橫向滑動 */
  width: 100%;
  max-width: 100%;
}
* {
  box-sizing: border-box;
}
.hero {
  position: relative;
  min-height: 100vh;
  background: transparent;
  overflow: hidden;
}

.hero-banner-wrapper {
  position: relative;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  overflow: hidden;
}

.hero-visual {
  position: absolute;
  inset: 0;
  z-index: 1;
}

/* 四角按鈕層：蓋在 3D 與標題之上，確保可點擊 */
.hero-corner-btns {
  position: absolute;
  inset: 0;
  z-index: 50;
  pointer-events: none;
}

.hero-corner-btns .corner-btn {
  pointer-events: auto;
}

.hero-social-links {
  position: absolute;
  left: 50%;
  bottom: calc(24px + env(safe-area-inset-bottom));
  transform: translateX(-50%);
  z-index: 55;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px;
  align-items: center;
  pointer-events: auto;
}

.hero-social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #000;
  color: #fff;
  border: 2px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.2);
  transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
}

.hero-social-link:hover {
  transform: scale(1.08);
  background: rgba(255, 255, 255, 0.95);
  color: #111;
}

.hero-social-icon {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
}

.banner-title picture img {
  display: block;
  width: 100%;
  height: auto;
  max-width: 100%;
  object-fit: contain;
  object-position: bottom center;
}

.banner-title {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  pointer-events: none;
}

.banner-title2 {
  width: 100%;
  max-width: 100%;
  position: absolute;
  bottom: 5%;
  left: 0;
  z-index: 2;
  pointer-events: none;
}

.banner-title2 img {
  display: block;
  width: 100%;
  height: auto;
  max-width: 100%;
  object-fit: contain;
}

/* 滑鼠特效 */
.cursor {
  position: fixed;
  width: 20px;
  height: 20px;
  background-color: #000;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
  z-index: 1000;
  transition: transform 150ms ease;
}
.hero-banner-wrapper:hover .cursor {
  transform: translate(-50%, -50%) scale(12);
}

/* 四角按鈕（略大於 5em，字級與舊全域選單接近） */
.corner-btn {
  position: absolute;
  width: 6.5em;
  height: 6.5em;
  border-radius: 50%;
  background: black;
  color: white;
  font-weight: bold;
  font-size: clamp(15px, 1.15vw, 20px);
  line-height: 1.15;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 10;
  padding: 0.35em;
  box-sizing: border-box;
}
.corner-btn:hover {
  transform: scale(1.1) rotate(5deg);
  background: rgba(255, 255, 255, 0.95);
  color: #000;
}

.top-left { top: 24px; left: 24px; }
.top-right { top: 24px; right: 24px; }
.bottom-left { bottom: 24px; left: 24px; }
.bottom-right { bottom: 24px; right: 24px; }

/* 社群媒體連結 */
.hero-social-links {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 14px;
  pointer-events: auto;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: black;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.3);
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.social-btn:hover {
  transform: scale(1.1) rotate(5deg);
  background: rgba(255, 255, 255, 0.95);
  color: #000;
}

/* ===== 電腦版：主標由左、副標由右淡入（載入時） ===== */
@media (min-width: 769px) {
  @keyframes hero-banner-from-left {
    from {
      opacity: 0;
      transform: translate3d(-2.25rem, 0, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes hero-banner-from-right {
    from {
      opacity: 0;
      transform: translate3d(2.25rem, 0, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  .banner-title,
  .banner-title2 {
    backface-visibility: hidden;
  }

  .banner-title {
    will-change: opacity, transform;
    animation: hero-banner-from-left 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s forwards;
  }
  .banner-title2 {
    will-change: opacity, transform;
    animation: hero-banner-from-right 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s forwards;
  }
}

@media (min-width: 769px) and (prefers-reduced-motion: reduce) {
  .banner-title,
  .banner-title2 {
    animation: none;
    opacity: 1;
    transform: none;
    will-change: auto;
  }
}

/* ===== 手機版 ===== */
@media (max-width: 768px) {
  /*
   * 避免 .hero { min-height: 100vh } 與子層高度在 iOS Safari 不一致造成白條。
   * 使用 100svh：以「最小視窗」為準，捲動時網址列收合不會改變高度，3D 區塊比例固定。
   * 不支援 svh 的瀏覽器仍用 --vh（resize 時由 fixVhUnit 更新）。
   */
  .hero {
    min-height: 0;
    width: 100%;
    max-width: 100%;
    height: calc(var(--vh, 1vh) * 100);
  }

  @supports (height: 100svh) {
    .hero {
      height: 100svh;
    }
  }

  .hero-banner-wrapper {
    height: 100%;
    min-height: 100%;
    width: 100%;
    max-width: 100%;
  }

  .hero-visual {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }

  .cursor { display: none; }

  .corner-btn {
    width: 80px;
    height: 80px;
    font-size: 15px;
    padding: 0.25em;
  }

  /* 避免瀏海/底部手勢區域造成裁切，加入 safe-area 偏移 */
  .top-left { top: calc(16px + env(safe-area-inset-top)); left: calc(16px + env(safe-area-inset-left)); }
  .top-right { top: calc(16px + env(safe-area-inset-top)); right: calc(16px + env(safe-area-inset-right)); }
  .bottom-left { bottom: calc(16px + env(safe-area-inset-bottom)); left: calc(16px + env(safe-area-inset-left)); }
  .bottom-right { bottom: calc(16px + env(safe-area-inset-bottom)); right: calc(16px + env(safe-area-inset-right)); }

  /* 手機版社群連結：縮小圖示，加入底部安全區域 */
  .hero-social-links {
    bottom: calc(16px + env(safe-area-inset-bottom));
    gap: 10px;
  }

  .social-btn {
    width: 38px;
    height: 38px;
  }

  .social-btn svg {
    width: 17px;
    height: 17px;
  }

  /*
   * 主標放大時須維持在視窗內：父層 overflow:hidden 會裁切負 left / 純 scale 造成的溢出。
   * width 先縮短再 scale，視覺寬度仍為 100%，左右不會被切掉。
   */
  .banner-title {
    left: 100%;
    right: auto;
    bottom: 19%;
    width: calc(150%);
    max-width: calc(150% - env(safe-area-inset-left) - env(safe-area-inset-right));
    padding: 0 env(safe-area-inset-right) 0 env(safe-area-inset-left);
    transform: translateX(-50%) scale(1.38);
    transform-origin: center bottom;
  }

  .banner-title2 {
    left: 19%;
    right: auto;
    bottom: 4%;
    width: 150%;
    max-width: calc(150% - env(safe-area-inset-left) - env(safe-area-inset-right));
    padding: 0 env(safe-area-inset-right) 0 env(safe-area-inset-left);
    transform: translateX(-50%) scale(1.1);
    transform-origin: center bottom;
  }
}
</style>
