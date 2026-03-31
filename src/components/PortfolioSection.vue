<template>
  <section id="portfolio" class="portfolio">
    <div class="container">
      <h2 class="section-title">{{ isEnglish ? 'Work Information' : '作品資訊' }}</h2>
      <div class="portfolio-grid" ref="grid">
        <div class="portfolio-item" v-for="(item, idx) in portfolioList" :key="idx">
          <router-link
            v-if="hasWorkRoute(item)"
            :to="getWorkRoute(item)"
            class="portfolio-link"
            @click="cacheWork(item, idx)"
          >
            <div class="portfolio-image">
              <img
                :src="getPhotoSrc(item)"
                :alt="getWorkTitle(item)"
                loading="lazy"
                decoding="async"
              >
            </div>

            <div class="portfolio-overlay">
              <h3>{{ getWorkTitle(item) }}</h3>
              <!-- <p>{{item.work_zh.title }}({{item.work_en.title }})</p> -->
              <p>{{ isEnglish ? item.work_en.interactive_description : item.work_zh.interactive_description }}</p>
              <!-- <p>{{ isEnglish ? item.work_zh.photo_1_d : item.work_en.photo_1_d }}</p> -->
            </div>
          </router-link>
          <div v-else class="portfolio-link portfolio-link--disabled">
            <div class="portfolio-image">
              <img
                :src="getPhotoSrc(item)"
                :alt="getWorkTitle(item)"
                loading="lazy"
                decoding="async"
              >
            </div>

            <div class="portfolio-overlay">
              <h3>{{ getWorkTitle(item) }}</h3>
              <p>{{ isEnglish ? item.work_en.interactive_description : item.work_zh.interactive_description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onMounted, onBeforeUnmount, ref, nextTick, watch } from 'vue';

gsap.registerPlugin(ScrollTrigger);

/** 等 grid 內圖片載入完成（避免高度變動後重算列） */
function waitForGridImages(container) {
  if (!container) return Promise.resolve();
  const images = Array.from(container.querySelectorAll('img'));
  if (!images.length) return Promise.resolve();
  return Promise.all(
    images.map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete) resolve();
          else {
            img.addEventListener('load', () => resolve(), { once: true });
            img.addEventListener('error', () => resolve(), { once: true });
          }
        }),
    ),
  );
}

export default {
  name: 'PortfolioSection',
  props: {
    portfolioList: {
      type: Array,
      default: () => []
    },
    isEnglish: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const grid = ref(null);
    let scrollTriggerInstance = null;
    let resizeTimer = null;
    let activeTimeline = null;
    /** 播映區入場動畫只跑一次；完成後不可再 gsap.set(opacity:0) 以免上下捲動時閃爍 */
    const introAnimationCompleted = ref(false);

    const isMobileLayout = () =>
      typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

    const markIntroComplete = () => {
      introAnimationCompleted.value = true;
    };

    const buildRowFadeIn = () => {
      const container = grid.value;
      if (!container) return;
      const items = Array.from(container.querySelectorAll('.portfolio-item'));
      if (!items.length) return;

      if (introAnimationCompleted.value) {
        ScrollTrigger.refresh();
        return;
      }

      if (activeTimeline) {
        activeTimeline.kill();
        activeTimeline = null;
      }
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
        scrollTriggerInstance = null;
      }
      gsap.killTweensOf(items);

      const mobile = isMobileLayout();

      // 手機：僅依序淡入，不用 y，避免與圖片漸載、雙重 ScrollTrigger 叠加造成「跳動」
      if (mobile) {
        gsap.set(items, { opacity: 0 });
        const tl = gsap.timeline({
          onComplete: markIntroComplete,
          scrollTrigger: {
            trigger: '#portfolio',
            start: 'top 85%',
            once: true,
            markers: false,
          },
        });
        scrollTriggerInstance = tl.scrollTrigger;
        activeTimeline = tl;
        tl.to(items, {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.12,
        });
        return;
      }

      // 桌機：維持依列分组 + 轻微上移
      gsap.set(items, { opacity: 0, y: 24 });
      const rowMap = new Map();
      items.forEach((el) => {
        const top = Math.round(el.offsetTop);
        if (!rowMap.has(top)) rowMap.set(top, []);
        rowMap.get(top).push(el);
      });
      const rows = [];
      Array.from(rowMap.keys())
        .sort((a, b) => a - b)
        .forEach((k) => rows.push(rowMap.get(k)));

      const tl = gsap.timeline({
        onComplete: markIntroComplete,
        scrollTrigger: {
          trigger: '#portfolio',
          start: 'top 80%',
          once: true,
          markers: false,
        },
      });
      scrollTriggerInstance = tl.scrollTrigger;
      activeTimeline = tl;

      rows.forEach((rowEls, i) => {
        tl.to(
          rowEls,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.08,
          },
          i * 0.18,
        );
      });
    };

    const scheduleBuild = async () => {
      if (introAnimationCompleted.value) {
        ScrollTrigger.refresh();
        return;
      }
      await nextTick();
      const container = grid.value;
      if (!container) return;
      if (!props.portfolioList || props.portfolioList.length === 0) return;
      await waitForGridImages(container);
      buildRowFadeIn();
      ScrollTrigger.refresh();
    };

    const handleResize = () => {
      if (introAnimationCompleted.value) {
        ScrollTrigger.refresh();
        return;
      }
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }
      resizeTimer = setTimeout(() => {
        scheduleBuild();
      }, 250);
    };

    watch(
      () => props.portfolioList,
      (list) => {
        if (!list || list.length === 0) return;
        scheduleBuild();
      },
    );

    onMounted(() => {
      if (props.portfolioList && props.portfolioList.length > 0) {
        scheduleBuild();
      }
      window.addEventListener('resize', handleResize, { passive: true });
    });

    onBeforeUnmount(() => {
      if (activeTimeline) {
        activeTimeline.kill();
        activeTimeline = null;
      }
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
        scrollTriggerInstance = null;
      }
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }
      window.removeEventListener('resize', handleResize);
    });

    return { grid };
  },
  methods: {
    getPhotoSrc(item) {
      // 新 API 優先：featured_photo_media.url
      const directUrl = item?.featured_photo_media?.url
        || item?.featuredPhotoMedia?.url
        || item?.image_1920_media?.url
        || item?.image1920Media?.url
        || item?.photo_1;
      if (!directUrl) return '';
      if (typeof directUrl === 'string' && /^https?:\/\//i.test(directUrl)) return directUrl;
      return `https://unzip-clab-api.clab.org.tw/${String(directUrl).replace(/^\/+/, '')}`;
    },
    getWorkTitle(item) {
      const zhTitle = item?.work_zh?.title
        || item?.titleZhTw
        || item?.title_zh_tw
        || '';
      const enTitle = item?.work_en?.title
        || item?.title_en
        || item?.titleEn
        || item?.title
        || '';

      return this.isEnglish ? (enTitle || zhTitle) : (zhTitle || enTitle);
    },
    cacheWork(item, idx) {
      try {
        const workId = this.resolveWorkId(item);
        if (!workId) {
          console.warn('Work item missing id, skip caching.', item);
          return;
        }
        const key = `work_${workId}`;
        const payload = { ...item, _listIndex: idx };
        localStorage.setItem(key, JSON.stringify(payload));
        const lang = localStorage.getItem('lang');
        if (!lang) {
          localStorage.setItem('lang', this.isEnglish ? 'en' : 'zh');
        }
      } catch (e) {
        console.error('Failed to cache work detail:', e);
      }
    },
    getWorkRoute(item) {
      const workId = this.resolveWorkId(item);
      if (!workId) return null;
      const slug = this.generateSlug(item, workId);
      const params = { id: workId };
      if (slug) {
        params.slug = slug;
      }
      const query = { lang: this.isEnglish ? 'en' : 'zh' };
      return { name: 'WorkDetail', params, query };
    },
    generateSlug(item, workId) {
      const englishTitle = this.resolveEnglishTitle(item);
      if (englishTitle) {
        return englishTitle.trim();
      }
      const fallbackBase = item?.work_zh?.title || '';
      if (fallbackBase) {
        return this.slugify(fallbackBase) || `work-${workId}`;
      }
      return `work-${workId}`;
    },
    resolveEnglishTitle(item) {
      const title = item?.work_en?.title || item?.title_en || item?.titleEn;
      if (!title) return '';
      return title.toString().trim();
    },
    slugify(text) {
      return text
        .toString()
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    },
    hasWorkRoute(item) {
      return Boolean(this.resolveWorkId(item));
    },
    resolveWorkId(item) {
      const candidate = item?.id ?? item?.work_id ?? item?.workId ?? item?.workID;
      if (candidate === undefined || candidate === null) return null;
      const idString = String(candidate).trim();
      return idString.length > 0 ? idString : null;
    }
  }
}
</script>

<style lang="scss" scoped>
.portfolio {
  background: #000000;
  padding: 80px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px 120px;
  color: #fff;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 40px;
  color: #ffffff;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.portfolio-item {
  display: flex;
  flex-direction: column;
  min-height: 250px;
  position: relative;
  overflow: visible;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  /* 初始淡入狀態由JS設定 */
}

.portfolio-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-height: 100%;
  text-decoration: none;
  color: inherit;
}

.portfolio-link--disabled {
  cursor: default;
  pointer-events: none;
}

.portfolio-image {
  width: min(220px, 75%);
  aspect-ratio: 1;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  margin: 6px auto 0;
  background: #141414;
  transition: filter 0.3s ease;
  /* 圓形遮罩；方形／矩形圖片以 cover 在圓內滿版 */
}

.portfolio-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: brightness(0.7);
  transition: filter 0.3s ease;
}

.portfolio-item:hover .portfolio-image img {
  filter: brightness(1);
}

.portfolio-overlay {
  position: relative;
  width: 100%;
  margin-top: auto;
  background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.55) 30%, rgba(0, 0, 0, 0.88));
  color: white;
  padding: 24px 12px 16px;
  transform: translateY(0);
  transition: transform 0.3s ease;
  text-align: left;
  word-break: break-word;
}

.portfolio-item:hover .portfolio-overlay {
  transform: translateY(0);
}

.portfolio-overlay h3 {
  margin-bottom: 10px;
  font-weight: 800;
}

.portfolio-overlay p {
  margin: 0;
}
@media(max-width:768px){
  .portfolio-grid{
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
  .portfolio-item { min-height: 0; }
  .portfolio-image {
    width: min(140px, 82%);
    margin-top: 4px;
  }
  .portfolio-overlay { padding: 16px 8px 12px; }
  .portfolio-overlay h3{ font-size: 0.95em; margin-bottom: 6px; }
  .portfolio-overlay p{ font-size: 0.8em; line-height: 1.4; }
}
@media (min-width: 2560px){
.container{
  max-width:60%;
}
.portfolio-item{
  min-height: 600px;
}
.portfolio-image {
  width: min(420px, 72%);
  margin-top: 12px;
}
.portfolio-grid{
  grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
}
.portfolio-overlay h3{
  font-size:2.5em;
}
.portfolio-overlay p{
  font-size: 2em;
}
}


/* 4K: 3840px and wider — make fonts and spacing more generous but keep content readable */
@media (min-width: 3840px){

}
</style> 