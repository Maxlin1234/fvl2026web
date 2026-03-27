<template>
  <section id="portfolio" class="portfolio">
    <div class="container">
      <h2 class="section-title">{{ isEnglish ? 'Works' : '播映作品' }}</h2>
      <div class="portfolio-grid" ref="grid">
        <div class="portfolio-item" v-for="(item, idx) in portfolioList" :key="idx">
          <router-link
            v-if="hasWorkRoute(item)"
            :to="getWorkRoute(item)"
            class="portfolio-link"
            @click="cacheWork(item, idx)"
          >
            <div class="portfolio-image" style="height: 100%;">
              <img :src="getPhotoSrc(item)" :alt="getWorkTitle(item)" loading="lazy" decoding="async" style="width: 100%;height: 100%;">
            </div>

            <div class="portfolio-overlay">
              <h3>{{ getWorkTitle(item) }}</h3>
              <!-- <p>{{item.work_zh.title }}({{item.work_en.title }})</p> -->
              <p>{{ isEnglish ? item.work_en.interactive_description : item.work_zh.interactive_description }}</p>
              <!-- <p>{{ isEnglish ? item.work_zh.photo_1_d : item.work_en.photo_1_d }}</p> -->
            </div>
          </router-link>
          <div v-else class="portfolio-link portfolio-link--disabled">
            <div class="portfolio-image" style="height: 100%;">
              <img :src="getPhotoSrc(item)" :alt="getWorkTitle(item)" loading="lazy" decoding="async" style="width: 100%;height: 100%;">
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
import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue';

gsap.registerPlugin(ScrollTrigger);

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
  setup() {
    const grid = ref(null);
    let scrollTriggerInstance = null;
    let resizeTimer = null;

    const buildRowFadeIn = () => {
      const container = grid.value;
      if (!container) return;
      const items = Array.from(container.querySelectorAll('.portfolio-item'));
      if (!items.length) return;

      // 清理舊的 ScrollTrigger 實例
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
        scrollTriggerInstance = null;
      }

      // 如果項目已經可見，跳過動畫
      const firstItem = items[0];
      if (firstItem && window.getComputedStyle(firstItem).opacity !== '0') {
        return;
      }

      // 初始狀態
      gsap.set(items, { opacity: 0, y: 24 });

      // 依 offsetTop 分組為各「行」
      const rows = [];
      const rowMap = new Map();
      items.forEach((el) => {
        const top = Math.round(el.offsetTop);
        if (!rowMap.has(top)) rowMap.set(top, []);
        rowMap.get(top).push(el);
      });
      // 由上到下排序
      Array.from(rowMap.keys()).sort((a,b)=>a-b).forEach((k)=> rows.push(rowMap.get(k)));

      // 建立逐行淡入動畫
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#portfolio',
          start: 'top 80%',
          once: true,
          markers: false
        }
      });

      // 保存 ScrollTrigger 實例
      scrollTriggerInstance = tl.scrollTrigger;

      rows.forEach((rowEls, i) => {
        tl.to(rowEls, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.08
        }, i * 0.18); // 每行間隔
      });
    };

    const handleResize = () => {
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }
      resizeTimer = setTimeout(() => {
        buildRowFadeIn();
      }, 250);
    };

    onMounted(async () => {
      await nextTick();
      // 等圖片載入以取得正確 offsetTop
      const images = grid.value ? Array.from(grid.value.querySelectorAll('img')) : [];
      const waitAll = images.map(img => new Promise(resolve => {
        if (img.complete) return resolve();
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
      }));
      Promise.all(waitAll).then(() => buildRowFadeIn());
      // 視窗尺寸改變時重新建立（避免斷行變化）
      window.addEventListener('resize', handleResize, { passive: true });
    });

    onBeforeUnmount(() => {
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
      // 預設先中文，再英文
      return item?.work_zh?.title
        || item?.titleZhTw
        || item?.title_zh_tw
        || item?.title
        || item?.work_en?.title
        || '';
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
  margin-bottom: 40px;
  color: #ffffff;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.portfolio-item {
  height: 250px;
  position: relative;
  // border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  /* 初始淡入狀態由JS設定 */
}

.portfolio-link {
  display: block;
  height: 100%;
  text-decoration: none;
  color: inherit;
}

.portfolio-link--disabled {
  cursor: default;
  pointer-events: none;
}

.portfolio-image {
  height: 100%;
  transition: filter 0.3s ease;
}

.portfolio-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.7);
  transition: filter 0.3s ease;
}

.portfolio-item:hover .portfolio-image img {
  filter: brightness(1);
}

.portfolio-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  padding: 30px 20px 20px;
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
}

.portfolio-overlay p {
  margin: 0;
}
@media(max-width:768px){
  .portfolio-grid{
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
  .portfolio-item { height:180px; }
  .portfolio-overlay h3{ font-size: 0.95em; margin-bottom: 6px; }
  .portfolio-overlay p{ font-size: 0.8em; line-height: 1.4; }
}
@media (min-width: 2560px){
.container{
  max-width:60%;
}
.portfolio-item{
  height: 600px;
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