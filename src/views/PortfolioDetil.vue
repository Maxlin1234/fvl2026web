<!-- src/views/PortfolioDetil.vue -->
<template>
  <div class="work-detail" v-if="work">
    <!-- 作品圖片區塊：固定只顯示一張 -->
    <div class="work-hero">
      <img :src="imageUrls[0] || coverUrl" alt="cover" loading="lazy" decoding="async" />
    </div>

    <!-- 主要內容區塊 -->
    <div class="work-content">
      <!-- 作品標題 -->
      <!-- <div class="work-header">
        <h1 class="work-title">{{ isEnglish ? work?.work_en?.title : work?.work_zh?.title }}</h1>
      </div> -->

      <!-- 兩欄佈局：作品介紹 + 藝術家資訊 -->
      <div class="work-main-layout">
        <!-- 左欄：作品介紹 -->
        <div class="work-description-section">
          <h2 class="section-heading">{{ isEnglish ? work?.work_en?.title : work?.work_zh?.title }}</h2>
          <div class="work-description">{{ descriptionText }}</div>
        </div>

        <!-- 右欄：藝術家資訊 -->
        <div class="artist-section" :class="{ 'logo-artist': isLogoArtistWork }">
          <!-- <h2 class="section-heading">{{ isEnglish ? 'About Artist' : '藝術家' }}</h2> -->
          <h2 class="section-heading">{{ artistHeadingText }}</h2>
          <div class="artist-content">
            <template v-if="!hideArtistPhoto && artistAvatarUrls.length > 0">
              <div v-if="artistAvatarUrls.length <= 1" class="artist-photo">
                <img :src="artistAvatarUrls[0]" alt="artist photo" loading="lazy" decoding="async" />
              </div>
              <div v-else class="artist-photos">
                <img v-for="(url, i) in artistAvatarUrls" :key="i" :src="url" alt="artist photo" loading="lazy" decoding="async" />
              </div>
            </template>
            <div class="artist-info">
              <p>{{ artistIntroText }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="work-detail loading">{{ errorText || 'Loading...' }}</div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, computed, getCurrentInstance } from 'vue';
import axios from 'axios';

export default {
  name: 'PortfolioDetil',
  setup() {
    const WORKS_API_URL = 'https://unzip.clab.org.tw/api/v1/projects/21/works';
    const API_AUTH = 'Api-Key 1e801a8fbe21fe2bef15df853e62ec9dc5a1cd08';
    // vue-router v3 doesn't provide useRoute(); use component instance route instead
    const { proxy } = getCurrentInstance();
    const route = proxy.$route;
    const id = String(route.params.id || '');

    const isEnglish = ref(false);
    const work = ref(null);
    const coverUrl = ref('');
    const secondaryUrl = ref(''); // kept for backward compatibility (unused in template now)
    const imageUrls = ref([]);
    const descriptionText = ref('');
    const errorText = ref('');
    const artists = ref([]);
    const scheduleWorks = ref([]);
    const cachedListIndex = ref(null);

    const fetchArtists = async () => {
      try {
        const { data } = await axios.get('https://unzip-clab-api.clab.org.tw/api/v1/schedules/10/artists?page=0&limit=25');
        const list = Array.isArray(data?.results) ? data.results : [];
        artists.value = list;
      } catch (e) {
        console.error('Failed to fetch artists list:', e);
      }
    };
    const resolveInitialLang = () => {
      const q = route.query.lang;
      if (q === 'en') return true;
      if (q === 'zh') return false;
      try { return localStorage.getItem('lang') === 'en'; } catch { return false; }
    };

    const pickFirstNonEmpty = (obj, keys) => {
      for (const key of keys) {
        const val = obj && typeof obj[key] === 'string' ? obj[key] : '';
        if (val && val.trim().length > 0) return val;
      }
      return '';
    };

    const stripHtml = (html) => {
      if (!html || typeof html !== 'string') return '';
      const withNewlines = html.replace(/<br\s*\/?>(\r\n)?/gi, '\n');
      const temp = document.createElement('div');
      temp.innerHTML = withNewlines;
      const text = temp.textContent || temp.innerText || '';
      return text;
    };

    const recalcDerived = () => {
      const makeUrl = (p) => {
        if (!p) return '';
        const s = String(p);
        if (/^https?:\/\//i.test(s)) return s;
        return `https://unzip-clab-api.clab.org.tw/${s.replace(/^\/+/, '')}`;
      };
      const p1 = work.value?.photo_1 || '';
      const p2 = work.value?.photo_2 || '';
      const p3 = work.value?.photo_3 || '';
      imageUrls.value = [p1, p2, p3].filter(Boolean).slice(0, 3).map(makeUrl);

      coverUrl.value = imageUrls.value[0] || '';
      const second = work.value?.photo_2 || work.value?.photo_3 || '';
      secondaryUrl.value = second ? makeUrl(second) : '';

      const langBlock = isEnglish.value ? work.value?.work_en : work.value?.work_zh;
      const raw = pickFirstNonEmpty(langBlock || {}, ['description', 'proposal', 'note', 'summary', 'content', 'text']);
      descriptionText.value = stripHtml(raw);
    };

    const artistHeadingText = computed(() => {
      const contributorList = Array.isArray(work.value?.contributors) ? work.value.contributors : [];
      if (contributorList.length > 0) {
        const names = contributorList
          .map((c) => (isEnglish.value ? c?.name : (c?.name_zh_tw || c?.name)))
          .filter((v) => typeof v === 'string' && v.trim().length > 0);
        if (names.length) return names.join(' × ');
      }

      // 若無 contributors，改用 collectives 名稱
      const collectiveList = Array.isArray(work.value?.collectives) ? work.value.collectives : [];
      if (collectiveList.length > 0) {
        const names = collectiveList
          .map((c) => (isEnglish.value ? c?.name : (c?.name_zh_tw || c?.name)))
          .filter((v) => typeof v === 'string' && v.trim().length > 0);
        if (names.length) return names.join(' × ');
      }

      const langBlock = isEnglish.value ? work.value?.work_en : work.value?.work_zh;
      return (isEnglish.value ? langBlock?.interactive_description : langBlock?.interactive_description) || (isEnglish.value ? 'About Artist' : '藝術家');
    });

    const artistIntroText = computed(() => {
      const firstContributor = Array.isArray(work.value?.contributors) ? work.value.contributors[0] : null;
      const contributorList = Array.isArray(work.value?.contributors) ? work.value.contributors : [];
      if (contributorList.length > 0) {
        const intros = contributorList
          .map((c) => {
            if (isEnglish.value) return c?.introduction || '';
            return c?.introduction_zh_tw || c?.introductionZhTw || c?.introduction || '';
          })
          .map((s) => stripHtml(s))
          .filter((s) => typeof s === 'string' && s.trim().length > 0);
        if (intros.length) return intros.join('\n\n');
      }

      // 若無 contributors，改用 collectives.description_zh_tw / description
      const collectiveList = Array.isArray(work.value?.collectives) ? work.value.collectives : [];
      if (collectiveList.length > 0) {
        const intros = collectiveList
          .map((c) => {
            if (isEnglish.value) return c?.description || '';
            return c?.description_zh_tw || c?.descriptionZhTw || c?.description || '';
          })
          .map((s) => stripHtml(s))
          .filter((s) => typeof s === 'string' && s.trim().length > 0);
        if (intros.length) return intros.join('\n\n');
      }

      if (firstContributor) {
        const intro = isEnglish.value
          ? (firstContributor.introduction || firstContributor.introduction_en || '')
          : (firstContributor.introduction_zh_tw || firstContributor.introductionZhTw || firstContributor.introduction || '');
        const introText = stripHtml(intro);
        if (introText) return introText;
      }

      const langBlock = isEnglish.value ? work.value?.work_en : work.value?.work_zh;
      const source = pickFirstNonEmpty(langBlock || {}, ['note', 'artist']);
      return stripHtml(source);
    });

    const resolvedWorkIndex = computed(() => {
      // 0) 列表頁緩存的 idx 優先
      if (typeof cachedListIndex.value === 'number' && cachedListIndex.value >= 0) {
        return cachedListIndex.value;
      }
      // 1) 優先使用 work.index（資料庫欄位），常見為 1-based；需轉 0-based
      const raw = work.value?.index;
      if (raw !== undefined && raw !== null) {
        const n = Number(raw);
        if (!Number.isNaN(n)) {
          const zeroBased = Math.max(0, Math.floor(n) - 1);
          return zeroBased;
        }
      }
      // 2) 否則，用目前 work.id 在排程作品列表中的位置
      if (scheduleWorks.value && scheduleWorks.value.length > 0) {
        const idx = scheduleWorks.value.findIndex(w => String(w.id) === String(id));
        if (idx >= 0) return idx;
      }
      // 3) 最後退回 0
      return 0;
    });

    const artistAvatarUrlFromIndex = (idx) => {
      const artist = artists.value && artists.value[idx] ? artists.value[idx] : null;
      const path = artist?.avatar || '';
      return path ? `https://unzip-clab-api.clab.org.tw/${path}` : '';
    };

    const normalizeMediaUrl = (p) => {
      if (!p) return '';
      const s = String(p);
      if (/^https?:\/\//i.test(s)) return s;
      return `https://unzip-clab-api.clab.org.tw/${s.replace(/^\/+/, '')}`;
    };

    const isBlockedArtistImage = (url) => {
      if (!url) return true;
      // API 某些無照片資料會回傳固定佔位圖，視為「無藝術家照片」
      // 兼容不同網域、http/https、以及 query 參數。
      const normalized = String(url).toLowerCase().split('?')[0];
      return (
        normalized.includes('/web/image/contributor.collective/47/image_1920') ||
        normalized.includes('contributor.collective/47/image_1920')
      );
    };

    const findArtistIndexByZhName = (zhName) => {
      if (!Array.isArray(artists.value)) return -1;
      return artists.value.findIndex(a => a?.artist_zh?.name === zhName);
    };

    const findArtistIndexByNames = (...names) => {
      if (!Array.isArray(artists.value)) return -1;
      const normalized = names
        .filter(name => typeof name === 'string' && name.trim().length > 0)
        .map(name => name.trim().toLowerCase());
      if (!normalized.length) return -1;
      return artists.value.findIndex(a => {
        const zh = a?.artist_zh?.name?.trim()?.toLowerCase();
        const en = a?.artist_en?.name?.trim()?.toLowerCase();
        return normalized.includes(zh) || normalized.includes(en);
      });
    };

    const overrideArtistIndexForWork = computed(() => {
      const titleZh = work.value?.work_zh?.title || '';
      const titleEn = work.value?.work_en?.title || '';
      const titleAllLower = `${titleZh} ${titleEn}`.toLowerCase();
      // 特例 1：奶油金剛 → 顯示「簡單映相」（僅單張）
      if (titleZh.includes('奶油金剛')) {
        const idx = findArtistIndexByZhName('簡單映相');
        return idx >= 0 ? idx : null;
      }
      // 特例 2：《昌勳與他的打字機》或 Dome穴遇言 → 顯示「可揚與他的快樂夥伴」
      if (titleZh.includes('昌勳與他的打字機') || titleZh.includes('Dome穴遇言')) {
        const idx = findArtistIndexByZhName('可揚與他的快樂夥伴');
        return idx >= 0 ? idx : null;
      }
      // 特例 3：簡單映相 → 強制使用藝術家清單第 5 筆（0-based: 4）
      if (titleZh.includes('簡單映相')) {
        return 4;
      }
      // 特例 X：「殘構重生」 → 顯示「黑川良一」
      if (titleZh.includes('殘構重生')) {
        const idx = findArtistIndexByZhName('黑川良一');
        return idx >= 0 ? idx : null;
      }
      // 特例 4：thewhole → 僅顯示「謝杰樺 × 安娜琪舞蹈劇場」
      if (titleAllLower.includes('thewhole')) {
        const idx = findArtistIndexByZhName('謝杰樺 × 安娜琪舞蹈劇場');
        return idx >= 0 ? idx : null;
      }
      return null;
    });

    const dualArtistOverrideIndices = computed(() => {
      const titleZh = work.value?.work_zh?.title || '';
      // 規則 A：作品需同頁顯示「王一鷗 × 阿利娜・托凡」
      if (
        titleZh.includes('王一鷗') ||
        titleZh.includes('阿利娜') ||
        titleZh.includes('阿利娜・托凡') ||
        titleZh.includes('水深萬象') ||
        titleZh.includes('水身萬象')
      ) {
        const a = findArtistIndexByZhName('王一鷗');
        const b = findArtistIndexByZhName('阿利娜・托凡');
        const indices = [a, b].filter(i => typeof i === 'number' && i >= 0);
        if (indices.length === 2) return indices;
      }

      // 規則 B：類數交界 → 坂本茉奈美 × 浦野百合
      if (titleZh.includes('類數交界')) {
        const a = findArtistIndexByNames('坂本茉奈美', 'Manami SAKAMOTO');
        const b = findArtistIndexByNames('浦野百合', 'Yuri URANO');
        const indices = [a, b].filter(i => typeof i === 'number' && i >= 0);
        if (indices.length === 2) return indices;
      }

  // 規則 B：「赫圖比斯：混沌的協奏」 → Normal Studio × 嬉皮萬歲
  if (titleZh.includes('赫圖比斯') || titleZh.includes('混沌的協奏')) {
    const a = findArtistIndexByZhName('Normal Studio');
    const b = findArtistIndexByZhName('嬉皮萬歲');
    const indices = [a, b].filter(i => typeof i === 'number' && i >= 0);
    if (indices.length === 2) return indices;
  }
      return null;
    });

    const isDualArtistWork = computed(() => {
      const titleZh = work.value?.work_zh?.title || '';
      // 僅在標題明確為「赤聲之曙」時顯示兩位藝術家
      return titleZh === '赤聲之曙';
    });

    const artistAvatarUrls = computed(() => {
      // 新 API 優先：直接使用 contributors.image_1920_media.url
      const contributorList = Array.isArray(work.value?.contributors) ? work.value.contributors : [];
      if (contributorList.length > 0) {
        const urls = contributorList
          .map((c) =>
            c?.image_1920_media?.url
            || c?.image1920Media?.url
            || c?.avatar_media?.url
            || c?.avatarMedia?.url
            || c?.avatar
            || ''
          )
          .map((u) => normalizeMediaUrl(u))
          .filter((u) => typeof u === 'string' && u.trim().length > 0 && !isBlockedArtistImage(u));
        if (urls.length > 0) return urls;
      }

      // 若無 contributors，改用 collectives.image_1920_media.url
      const collectiveList = Array.isArray(work.value?.collectives) ? work.value.collectives : [];
      if (collectiveList.length > 0) {
        const urls = collectiveList
          .map((c) =>
            c?.image_1920_media?.url
            || c?.image1920Media?.url
            || c?.avatar_media?.url
            || c?.avatarMedia?.url
            || c?.avatar
            || ''
          )
          .map((u) => normalizeMediaUrl(u))
          .filter((u) => typeof u === 'string' && u.trim().length > 0 && !isBlockedArtistImage(u));
        if (urls.length > 0) return urls;
      }
      // 不再回退舊 artists 對照邏輯，避免出現舊照片（如葉澈）
      return [];
    });

    const hideArtistPhoto = computed(() => {
      const tZh = work.value?.work_zh?.title || '';
      const tEn = work.value?.work_en?.title || '';
      const s = `${tZh} ${tEn}`;
      return (
        s.includes('沉浸式影音工作坊－實踐大學媒傳系成果呈現') ||
        s.includes('C-LAB 未來視覺實驗室') ||
        s.toLowerCase().includes('immersive audio-visual workshop')
      );
    });

    const isLogoArtistWork = computed(() => {
      const heading = String(artistHeadingText.value || '');
      return (
        heading.includes('國立清華大學藝術學院學士班') &&
        heading.includes('國立臺北藝術大學新媒體藝術學系') &&
        heading.includes('臺北科技大學互動系')
      );
    });

    const loadFromLocal = () => {
      try {
        const key = `work_${id}`;
        const raw = localStorage.getItem(key);
        if (!raw) return false;
        const parsed = JSON.parse(raw);
        work.value = parsed;
        if (typeof parsed?._listIndex === 'number') {
          cachedListIndex.value = parsed._listIndex;
        }
        recalcDerived();
        return true;
      } catch (e) {
        console.error('Failed to parse work data from localStorage:', e);
        return false;
      }
    };

    const extractEntity = (data) => {
      if (!data) return null;
      if (Array.isArray(data?.results)) return data.results[0] || null;
      if (data?.data && typeof data.data === 'object') return data.data; // some APIs wrap in data
      if (typeof data === 'object') return data;
      return null;
    };

    const fetchFromApi = async () => {
      try {
        const { data } = await axios.get(WORKS_API_URL, {
          headers: {
            Authorization: API_AUTH,
          },
        });
        const list = Array.isArray(data) ? data : (data?.data || data?.results || []);
        const entity = list.find((w) => String(w?.id) === String(id));
        if (entity) {
          const zhTitle = entity?.title_zh_tw || entity?.titleZhTw || entity?.work_zh?.title || entity?.title || '';
          const enTitle = entity?.title || entity?.work_en?.title || '';
          const zhNote = entity?.note_zh_tw || entity?.noteZhTw || entity?.work_zh?.note || entity?.note || '';
          const enNote = entity?.note || entity?.work_en?.note || '';
          const photo1 = entity?.featured_photo_media?.url || entity?.featuredPhotoMedia?.url || entity?.photo_1 || '';
          const photo2 = entity?.image_1920_media?.url || entity?.image1920Media?.url || entity?.photo_2 || '';
          const contributors = Array.isArray(entity?.contributors) ? entity.contributors : [];

          work.value = {
            ...entity,
            photo_1: photo1,
            photo_2: photo2,
            photo_3: entity?.photo_3 || '',
            work_en: {
              ...(entity?.work_en || {}),
              title: enTitle,
              note: enNote,
              interactive_description: entity?.work_en?.interactive_description || contributors?.[0]?.name || '',
            },
            work_zh: {
              ...(entity?.work_zh || {}),
              title: zhTitle,
              note: zhNote,
              interactive_description: entity?.work_zh?.interactive_description || contributors?.[0]?.name_zh_tw || contributors?.[0]?.name || '',
            },
            contributors,
          };
          recalcDerived();
        } else {
          errorText.value = 'No data for this work.';
        }
      } catch (e) {
        console.error('Failed to fetch work by id:', e);
        errorText.value = 'Failed to load work. Please try again later.';
      }
    };

    const handleStorage = (e) => {
      if (e.key === 'lang') {
        isEnglish.value = e.newValue === 'en';
        if (work.value) recalcDerived();
      }
    };

    onMounted(async () => {
      isEnglish.value = resolveInitialLang();
      const ok = loadFromLocal();
      if (!ok) await fetchFromApi();
      // 移除不再使用的額外 API，避免進入作品頁時多發請求造成延遲。
      window.addEventListener('storage', handleStorage);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('storage', handleStorage);
    });

    return {
      work,
      coverUrl,
      secondaryUrl,
      imageUrls,
      isEnglish,
      descriptionText,
      errorText,
      artistHeadingText,
      artistIntroText,
      artistAvatarUrls,
      hideArtistPhoto,
      isLogoArtistWork,
    };
  }
}
</script>

<style lang="scss" scoped>
.work-detail {
  background: #0e0e0e;
  color: #f2f2f2;
  min-height: 100vh;
}

.work-detail.loading {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 作品圖片區塊 - 三張圖片網格 */
.work-hero-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  width: 100%;
  height: 50vh;
  overflow: hidden;
}

.work-hero {
  width: 100%;
  height: 50vh;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.work-hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.work-hero:hover img {
  transform: scale(1.05);
}

/* 主要內容區塊 */
.work-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px 80px;
}

.work-header {
  text-align: center;
  margin-bottom: 60px;
}

.work-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  color: #ffffff;
  line-height: 1.2;
  letter-spacing: 1px;
}

/* 兩欄佈局 */
.work-main-layout {
  background-color: white;
  // border-radius: 25px;
  padding: 25px;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 80px;
  align-items: start;
}

/* 作品介紹區塊 */
.work-description-section {
  .section-heading {
    font-size: 1.8rem;
    font-weight: 600;
    margin: 0 0 30px 0;
    color: #000000;
    border-bottom: 3px solid #333;
    padding-bottom: 15px;
    letter-spacing: 0.5px;
  }

  .work-description {
    font-size: 1.1rem;
    line-height: 1.9;
    color: #000000;
    white-space: pre-wrap;
    text-align: justify;
  }
}

/* 藝術家資訊區塊 */
.artist-section {
  .section-heading {
    font-size: 1.8rem;
    font-weight: 600;
    margin: 0 0 30px 0;
    color: #000000;
    border-bottom: 3px solid #333;
    padding-bottom: 15px;
    letter-spacing: 0.5px;
  }

  .artist-content {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .artist-photo {
    width: 100%;
    max-width: 220px;
    margin: 0 auto;
    
    img {
      width: 100%;
      height: 220px;
      object-fit: cover;
      border-radius: 50%;
      border: 4px solid #ffffff;
      box-shadow: 0 8px 30px rgba(255, 255, 255, 0.15);
      transition: transform 0.3s ease;
    }
  }

  .artist-photo:hover img {
    transform: scale(1.05);
  }

  .artist-photos {
    width: 100%;
    max-width: 520px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;

    img {
      width: 140px;
      height: 140px;
      object-fit: cover;
      border-radius: 50%;
      border: 4px solid #ffffff;
      box-shadow: 0 8px 30px rgba(255, 255, 255, 0.15);
      transition: transform 0.3s ease;
    }
  }

  .artist-info {
    p {
      font-size: 1rem;
      line-height: 1.8;
      color: #000000;
      margin: 0;
      white-space: pre-wrap;
      text-align: justify;
    }
  }
}

/* 特定作品：藝術家圖片為圓形 logo，不套圓框與裁切 */
.artist-section.logo-artist {
  .artist-photo img,
  .artist-photos img {
    border-radius: 0;
    border: none;
    box-shadow: none;
    object-fit: contain;
    background: transparent;
  }
}

/* 響應式設計 */
@media (max-width: 1024px) {
  .work-main-layout {
    gap: 60px;
  }
  
  .work-hero-grid {
    grid-template-columns: repeat(2, 1fr);
    height: 40vh;
  }
  
  .work-hero {
    height: 40vh;
  }
}

@media (max-width: 768px) {
  .work-content {
    padding: 40px 16px 60px;
  }

  .work-title {
    font-size: 2rem;
  }

  .work-main-layout {
    grid-template-columns: 2fr;
    gap: 50px;
  }

  .work-hero-grid {
    grid-template-columns: 1fr;
    height: auto;
  }

  .work-hero {
    height: 35vh;
  }

  .section-heading {
    font-size: 1.5rem;
  }

  .artist-content {
    flex-direction: row;
    align-items: flex-start;
    gap: 25px;
  }

  .artist-photo {
    max-width: 150px;
    flex-shrink: 0;
    
    img {
      height: 150px;
    }
  }

  .artist-info {
    flex: 1;
  }

  .artist-photos img {
    width: 110px;
    height: 110px;
  }
}

@media (max-width: 480px) {
  .work-content {
    padding: 30px 12px 50px;
  }

  .work-title {
    font-size: 1.8rem;
  }

  .section-heading {
    font-size: 1.3rem;
  }

  .work-description {
    font-size: 1rem;
  }

  .artist-content {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }

  .artist-photo {
    max-width: 180px;
    
    img {
      height: 180px;
    }
  }
}

@media (min-width: 2560px) {
  .work-content {
    max-width: 1800px;
    padding: 80px 40px 120px;
  }

  .work-title {
    font-size: 3.5rem;
  }

  .section-heading {
    font-size: 2.2rem;
  }

  .work-description {
    font-size: 1.3rem;
  }

  .artist-info p {
    font-size: 1.2rem;
  }

  .artist-photo img {
    height: 280px;
  }

  .work-hero-grid {
    height: 60vh;
  }

  .work-hero {
    height: 60vh;
  }
}
</style>
