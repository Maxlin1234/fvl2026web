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
    this.fixVhUnit(); // 🔧 修正 100vh 問題
    this.initCursor();
    window.addEventListener('resize', this.fixVhUnit);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.fixVhUnit);
  },
  methods: {
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

  /*
   * 主標放大時須維持在視窗內：父層 overflow:hidden 會裁切負 left / 純 scale 造成的溢出。
   * width 先縮短再 scale，視覺寬度仍為 100%，左右不會被切掉。
   */
  .banner-title {
    left: 50%;
    right: auto;
    bottom: 24%;
    width: calc(100% / 1.38);
    max-width: calc(100% - env(safe-area-inset-left) - env(safe-area-inset-right));
    padding: 0 env(safe-area-inset-right) 0 env(safe-area-inset-left);
    transform: translateX(-50%) scale(1.38);
    transform-origin: center bottom;
  }

  .banner-title2 {
    left: 50%;
    right: auto;
    bottom: 19%;
    width: calc(100% / 1.30);
    max-width: calc(100% - env(safe-area-inset-left) - env(safe-area-inset-right));
    padding: 0 env(safe-area-inset-right) 0 env(safe-area-inset-left);
    transform: translateX(-50%) scale(1.3);
    transform-origin: center bottom;
  }
}
</style>
