<!-- src/views/PortfolioDetil.vue -->
<template>
  <div class="work-detail" v-if="work">
    <!-- 作品圖片區塊：根據圖片數量自適應排版 -->
    <!-- 1張：滿寬 -->
    <div v-if="bannerImages.length === 1" class="work-hero work-hero--single">
      <img :src="bannerImages[0]" alt="cover" loading="lazy" decoding="async" />
    </div>

    <!-- 2張：根據比例左右分配 -->
    <div v-else-if="bannerImages.length === 2" class="work-hero-split work-hero-split--2">
      <div
        class="work-hero-split__item"
        :style="{ flex: splitRatios[0] }"
      >
        <img :src="bannerImages[0]" alt="cover 1" loading="lazy" decoding="async" />
      </div>
      <div
        class="work-hero-split__item"
        :style="{ flex: splitRatios[1] }"
      >
        <img :src="bannerImages[1]" alt="cover 2" loading="lazy" decoding="async" />
      </div>
    </div>

    <!-- 3張：左1大圖 + 右2張上下 -->
    <div v-else-if="bannerImages.length === 3" class="work-hero-split work-hero-split--3">
      <div class="work-hero-split__main">
        <img :src="bannerImages[0]" alt="cover 1" loading="lazy" decoding="async" />
      </div>
      <div class="work-hero-split__stack">
        <div class="work-hero-split__stack-item">
          <img :src="bannerImages[1]" alt="cover 2" loading="lazy" decoding="async" />
        </div>
        <div class="work-hero-split__stack-item">
          <img :src="bannerImages[2]" alt="cover 3" loading="lazy" decoding="async" />
        </div>
      </div>
    </div>

    <!-- 4張以上：左固定第1張 + 右邊 2~N 張自動輪播 -->
    <div v-else-if="bannerImages.length >= 4" class="work-hero-slider">
      <div class="work-hero-slider__fixed">
        <img :src="bannerImages[0]" alt="cover 1" loading="lazy" decoding="async" />
      </div>
      <div class="work-hero-slider__reel">
        <div
          class="work-hero-slider__track"
          :style="{ transform: `translateX(-${sliderIndex * 100}%)` }"
        >
          <div
            v-for="(url, i) in bannerImages.slice(1)"
            :key="i"
            class="work-hero-slider__slide"
          >
            <img :src="url" :alt="'cover ' + (i + 2)" loading="lazy" decoding="async" />
          </div>
        </div>
        <!-- 指示點 -->
        <div class="work-hero-slider__dots">
          <span
            v-for="(_, i) in bannerImages.slice(1)"
            :key="i"
            class="work-hero-slider__dot"
            :class="{ active: sliderIndex === i }"
            @click="sliderIndex = i"
          ></span>
        </div>
      </div>
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
          <div v-if="showExtraProposal" class="work-proposal">
            <div class="work-proposal-body" v-html="extraProposalHtml"></div>
          </div>
        </div>

        <!-- 右欄：藝術家（團隊 collectives 頭像與藝術家同一排圓形；團隊說明在藝術家介紹下方） -->
        <div class="artist-section" :class="{ 'logo-artist': isLogoArtistWork }">
          <h2 class="section-heading">{{ artistHeadingText }}</h2>
          <div class="artist-content">
            <template v-if="showMergedPhotos">
              <div v-if="mergedPhotoItems.length === 1" class="artist-photo">
                <img
                  :src="mergedPhotoItems[0].url"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  :class="{ 'people-photo-img--logo': mergedPhotoItems[0].kind === 'artist' && isLogoArtistWork }"
                />
              </div>
              <div v-else class="artist-photos">
                <img
                  v-for="(item, i) in mergedPhotoItems"
                  :key="i"
                  :src="item.url"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  :class="{ 'people-photo-img--logo': item.kind === 'artist' && isLogoArtistWork }"
                />
              </div>
            </template>
            <div class="artist-info">
              <template v-if="customOrderIntroRows.length">
                <div
                  v-for="(row, i) in customOrderIntroRows"
                  :key="'custom-intro-' + i"
                  class="team-blurb"
                >
                  <h3 v-if="row.name && row.description" class="team-blurb-title">{{ row.name }}</h3>
                  <p v-if="row.description">{{ row.description }}</p>
                </div>
              </template>
              <template v-else>
                <!-- 多位 contributor：分別顯示名稱 + 對應介紹 -->
                <div
                  v-for="(row, i) in artistIntroRows"
                  :key="'intro-row-' + i"
                  class="team-blurb"
                >
                  <h3 v-if="row.name" class="team-blurb-title">{{ row.name }}</h3>
                  <p v-if="row.description">{{ row.description }}</p>
                </div>
                <!-- 只有 collectives（無 contributors）時，也顯示成員 -->
                <template v-if="!showTeamSection && collectivesMembersRows.length">
                  <div
                    v-for="(member, i) in collectivesMembersRows"
                    :key="'solo-member-' + i"
                    class="collective-member-row"
                  >
                    <img
                      v-if="member.imageUrl"
                      :src="member.imageUrl"
                      :alt="member.name"
                      loading="lazy"
                      decoding="async"
                      class="collective-member-avatar"
                    />
                    <div class="collective-member-text">
                      <h3 v-if="member.name" class="team-blurb-title">{{ member.name }}</h3>
                      <p v-if="member.description">{{ member.description }}</p>
                    </div>
                  </div>
                </template>
                <template v-if="showTeamSection">
                  <div
                    v-for="(row, i) in teamCollectivesTextRows"
                    :key="i"
                    class="team-blurb"
                  >
                    <h3 v-if="row.name && row.description" class="team-blurb-title">{{ row.name }}</h3>
                    <p v-if="row.description">{{ row.description }}</p>
                    <!-- collective 的成員 -->
                    <template v-if="row.members && row.members.length">
                      <div
                        v-for="(member, mi) in row.members"
                        :key="'member-' + i + '-' + mi"
                        class="collective-member-row"
                      >
                        <img
                          v-if="member.imageUrl"
                          :src="member.imageUrl"
                          :alt="member.name"
                          loading="lazy"
                          decoding="async"
                          class="collective-member-avatar"
                        />
                        <div class="collective-member-text">
                          <h3 v-if="member.name" class="team-blurb-title">{{ member.name }}</h3>
                          <p v-if="member.description">{{ member.description }}</p>
                        </div>
                      </div>
                    </template>
                  </div>
                </template>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="work-detail loading">{{ errorText || 'Loading...' }}</div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, computed, watch, getCurrentInstance, nextTick } from 'vue';
import axios from 'axios';

export default {
  name: 'PortfolioDetil',
  setup() {
    const WORKS_API_URL = 'https://unzip.clab.org.tw/api/v1/projects/21/works?level=detail&limit=500';
    const WORK_DETAIL_API = (workId) => `https://unzip.clab.org.tw/api/v1/works/${workId}`;
    const API_AUTH = 'Api-Key 1e801a8fbe21fe2bef15df853e62ec9dc5a1cd08';
    /** 需額外顯示 proposal_zh_tw / proposal 的作品 id（單筆 works API） */
    const EXTRA_PROPOSAL_WORK_IDS = new Set(['193', '194']);
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
    const extraProposalZh = ref('');
    const extraProposalEn = ref('');

    // Banner slideshow state
    const sliderIndex = ref(0);
    let sliderTimer = null;
    // Preloaded aspect ratios for 2-image split
    const imageNaturalRatios = ref([]);

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

    /** 指定作品：藝術家／團體顯示與介紹順序（依 API name / name_zh_tw 比對） */
    const CUSTOM_DISPLAY_ORDER_RULES = [
      {
        nameOrder: ['Kohui', '劉東昱', '蔡奇宏'],
        test: ({ zh, en }) =>
          String(zh).includes('未來視覺派對 #3')
          || /future\s*vision\s*party\s*#3/i.test(String(en)),
      },
      {
        nameOrder: ['國立清華大學藝術學院學士班 / 科藝所', '國立臺北藝術大學新媒體藝術學系', '臺北科技大學互動系'],
        test: ({ zh, en }) =>
          String(zh).includes('校際成果呈現')
          || /joint\s*presentation/i.test(String(en)),
      },
      {
        nameOrder: ['姚瑞中', '郭一', 'Meuko! Meuko'],
        test: ({ zh, en }) =>
          String(zh).includes('虛迷山')
          || /mount\s*ecstasy/i.test(String(en)),
      },
      {
        nameOrder: ['初未來', '超維度', '江戶未來世', 'Kivi', '賴皮', '林強'],
        test: ({ zh, en }) =>
          String(zh).includes('新摩登時代')
          || String(en).includes('新摩登時代')
          || /shin\s*modern/i.test(String(en))
          || /modern\s*era/i.test(String(en)),
      },
      {
        nameOrder: ['吳秉聖', '劉承杰', '浮點設計'],
        test: ({ zh, en }) =>
          String(zh).includes('時間層理')
          || /stratigraphy/i.test(String(en)),
      },
      {
        /** 《循鹿》：桑德琳．德米耶 → 拉爾夫．基爾赫茲；鍵可對 API「·／拉圖夫」等變體 */
        nameOrder: ['桑德琳', '拉爾夫', '拉圖'],
        test: ({ zh, en }) =>
          String(zh).includes('循鹿')
          || /following\s*the\s*deer/i.test(String(en))
          || /tying\s*the\s*deer/i.test(String(en)),
      },
    ];

    const entityMatchesCustomOrderKey = (entity, orderKey) => {
      const zh = String(entity?.name_zh_tw || entity?.nameZhTw || '').trim();
      const en = String(entity?.name || '').trim();
      const key = String(orderKey || '').trim();
      if (!key) return false;
      if (zh === key || en === key) return true;
      if (zh && (zh.includes(key) || key.includes(zh))) return true;
      const el = en.toLowerCase();
      const kl = key.toLowerCase();
      if (en && (el.includes(kl) || kl.includes(el))) return true;
      return false;
    };

    const buildCustomOrderedPairs = (contributors, collectives, nameOrder) => {
      const keys = Array.isArray(nameOrder) ? nameOrder : [];
      const cList = Array.isArray(contributors) ? contributors : [];
      const tList = Array.isArray(collectives) ? collectives : [];
      const usedC = new Set();
      const usedT = new Set();
      const ordered = [];
      for (const orderKey of keys) {
        let idx = -1;
        for (let i = 0; i < cList.length; i += 1) {
          if (usedC.has(i)) continue;
          if (entityMatchesCustomOrderKey(cList[i], orderKey)) {
            idx = i;
            break;
          }
        }
        if (idx >= 0) {
          usedC.add(idx);
          ordered.push({ kind: 'contributor', item: cList[idx] });
          continue;
        }
        for (let i = 0; i < tList.length; i += 1) {
          if (usedT.has(i)) continue;
          if (entityMatchesCustomOrderKey(tList[i], orderKey)) {
            idx = i;
            break;
          }
        }
        if (idx >= 0) {
          usedT.add(idx);
          ordered.push({ kind: 'collective', item: tList[idx] });
        }
      }
      for (let i = 0; i < cList.length; i += 1) {
        if (!usedC.has(i)) ordered.push({ kind: 'contributor', item: cList[i] });
      }
      for (let i = 0; i < tList.length; i += 1) {
        if (!usedT.has(i)) ordered.push({ kind: 'collective', item: tList[i] });
      }
      return ordered;
    };

    const activeCustomDisplayRule = computed(() => {
      const zh = work.value?.work_zh?.title || '';
      const en = work.value?.work_en?.title || '';
      return CUSTOM_DISPLAY_ORDER_RULES.find((r) => r.test({ zh, en })) || null;
    });

    const customDisplayOrdered = computed(() => {
      const rule = activeCustomDisplayRule.value;
      if (!rule) return [];
      return buildCustomOrderedPairs(work.value?.contributors, work.value?.collectives, rule.nameOrder);
    });

    /** 有客製順序的作品：介紹分段（名稱＋簡介），與頭像列一致 */
    const customOrderIntroRows = computed(() => {
      if (!activeCustomDisplayRule.value || customDisplayOrdered.value.length === 0) return [];
      const rows = [];
      for (const { kind, item } of customDisplayOrdered.value) {
        const name = isEnglish.value
          ? String(item?.name || item?.name_zh_tw || '').trim()
          : String(item?.name_zh_tw || item?.name || '').trim();
        let raw = '';
        if (kind === 'contributor') {
          raw = isEnglish.value
            ? (item?.introduction || '')
            : (item?.introduction_zh_tw || item?.introductionZhTw || item?.introduction || '');
        } else {
          raw = isEnglish.value
            ? (item?.description || '')
            : (item?.description_zh_tw || item?.descriptionZhTw || item?.description || '');
        }
        const description = stripHtml(raw || '').trim();
        rows.push({ name, description });
      }
      return rows;
    });

    const makeUrl = (p) => {
      if (!p) return '';
      const s = String(p);
      if (/^https?:\/\//i.test(s)) return s;
      return `https://unzip-clab-api.clab.org.tw/${s.replace(/^\/+/, '')}`;
    };

    const recalcDerived = () => {
      // 優先使用 photos 陣列（新 API），回退到 photo_1/2/3 舊欄位
      const photosArr = Array.isArray(work.value?.photos) ? work.value.photos : [];
      let urls = photosArr
        .map((p) => p?.image_media?.url || '')
        .map(makeUrl)
        .filter(Boolean);

      if (urls.length === 0) {
        // 回退舊欄位
        const p1 = work.value?.photo_1 || '';
        const p2 = work.value?.photo_2 || '';
        const p3 = work.value?.photo_3 || '';
        urls = [p1, p2, p3].filter(Boolean).slice(0, 6).map(makeUrl);
      } else {
        // 若 photos 不足，用 featured_photo_media / image_1920_media 補充
        const fUrl = makeUrl(work.value?.featured_photo_media?.url || '');
        // 不重複加入
        if (urls.length === 0 && fUrl) urls.push(fUrl);
      }

      imageUrls.value = urls;
      coverUrl.value = urls[0] || '';
      secondaryUrl.value = urls[1] || '';

      const langBlock = isEnglish.value ? work.value?.work_en : work.value?.work_zh;
      const raw = pickFirstNonEmpty(langBlock || {}, ['description', 'proposal', 'note', 'summary', 'content', 'text']);
      descriptionText.value = stripHtml(raw);
    };

    /** 判斷 contributor 是否有介紹內容 */
    const contributorHasIntro = (c) => {
      const raw = isEnglish.value
        ? (c?.introduction || '')
        : (c?.introduction_zh_tw || c?.introductionZhTw || c?.introduction || '');
      return stripHtml(raw).trim().length > 0;
    };

    /** 判斷 collective 是否有介紹內容 */
    const collectiveHasDesc = (c) => {
      const raw = isEnglish.value
        ? (c?.description || '')
        : (c?.description_zh_tw || c?.descriptionZhTw || c?.description || '');
      return stripHtml(raw).trim().length > 0;
    };

    const artistHeadingText = computed(() => {
      if (activeCustomDisplayRule.value && customDisplayOrdered.value.length > 0) {
        // 客製順序：只包含有 intro/description 的名稱
        const names = customDisplayOrdered.value
          .filter(({ kind, item }) =>
            kind === 'contributor' ? contributorHasIntro(item) : collectiveHasDesc(item),
          )
          .map(({ item }) => (isEnglish.value ? item?.name : (item?.name_zh_tw || item?.name)))
          .filter((v) => typeof v === 'string' && v.trim().length > 0);
        if (names.length) return names.join(' × ');
        // 若全部無 intro，回退到顯示全部名稱（至少要有個標題）
        const allNames = customDisplayOrdered.value
          .map(({ item }) => (isEnglish.value ? item?.name : (item?.name_zh_tw || item?.name)))
          .filter((v) => typeof v === 'string' && v.trim().length > 0);
        if (allNames.length) return allNames.join(' × ');
      }

      const contributorList = Array.isArray(work.value?.contributors) ? work.value.contributors : [];
      if (contributorList.length > 0) {
        // 只把有 intro 的 contributor 放進標題
        const withIntro = contributorList.filter(contributorHasIntro);
        const source = withIntro.length > 0 ? withIntro : [];
        const names = source
          .map((c) => (isEnglish.value ? c?.name : (c?.name_zh_tw || c?.name)))
          .filter((v) => typeof v === 'string' && v.trim().length > 0);
        // 若 contributors 都無 intro，嘗試從 collectives 中有 description 的補充
        if (names.length) return names.join(' × ');
      }

      // collectives：只包含有 description 的
      const collectiveList = Array.isArray(work.value?.collectives) ? work.value.collectives : [];
      if (collectiveList.length > 0) {
        const withDesc = collectiveList.filter(collectiveHasDesc);
        const names = withDesc
          .map((c) => (isEnglish.value ? c?.name : (c?.name_zh_tw || c?.name)))
          .filter((v) => typeof v === 'string' && v.trim().length > 0);
        if (names.length) return names.join(' × ');
      }

      // 最終安全網：contributors 存在但全無 intro，且 collectives 也無 description
      // 此時至少顯示所有 contributors 的名稱，避免標題退化為「藝術家」
      if (contributorList.length > 0) {
        const names = contributorList
          .map((c) => (isEnglish.value ? c?.name : (c?.name_zh_tw || c?.name)))
          .filter((v) => typeof v === 'string' && v.trim().length > 0);
        if (names.length) return names.join(' × ');
      }

      const langBlock = isEnglish.value ? work.value?.work_en : work.value?.work_zh;
      return (isEnglish.value ? langBlock?.interactive_description : langBlock?.interactive_description) || (isEnglish.value ? 'About Artist' : '藝術家');
    });

    /**
     * 藝術家介紹列（結構化）
     * - 多位 contributor 各有介紹 → [{name, description}]，含名稱標簽
     * - 單位 contributor 或單一簡介 → [{name: '', description}]，不顯示名稱
     * - 只有 collectives （無 contributors）→ [{name: '', description}] 用 collective description
     */
    const artistIntroRows = computed(() => {
      if (activeCustomDisplayRule.value && customOrderIntroRows.value.length > 0) {
        return [];
      }

      const contributorList = Array.isArray(work.value?.contributors) ? work.value.contributors : [];
      if (contributorList.length > 0) {
        const rows = contributorList
          .map((c) => {
            const raw = isEnglish.value
              ? (c?.introduction || '')
              : (c?.introduction_zh_tw || c?.introductionZhTw || c?.introduction || '');
            const description = stripHtml(raw).trim();
            return { c, description };
          })
          .filter(({ description }) => description.length > 0);

        if (rows.length > 0) {
          // 多位時附上名稱；單位不顯示名稱
          const showNames = rows.length > 1;
          return rows.map(({ c, description }) => ({
            name: showNames
              ? (isEnglish.value ? (c?.name || '') : (c?.name_zh_tw || c?.name || '')).trim()
              : '',
            description,
          }));
        }
      }

      // 只有 collectives（無 contributors）時，用 collective description
      if (contributorList.length === 0) {
        const collectiveList = Array.isArray(work.value?.collectives) ? work.value.collectives : [];
        const rows = collectiveList
          .map((c) => {
            const raw = isEnglish.value
              ? (c?.description || '')
              : (c?.description_zh_tw || c?.descriptionZhTw || c?.description || '');
            return stripHtml(raw).trim();
          })
          .filter((s) => s.length > 0);
        if (rows.length > 0) {
          return rows.map((description) => ({ name: '', description }));
        }
      }

      const langBlock = isEnglish.value ? work.value?.work_en : work.value?.work_zh;
      const source = stripHtml(pickFirstNonEmpty(langBlock || {}, ['artist'])).trim();
      return source ? [{ name: '', description: source }] : [];
    });

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

    const artistAvatarUrls = computed(() => {
      if (activeCustomDisplayRule.value && customDisplayOrdered.value.length > 0) {
        const urls = [];
        for (const { item } of customDisplayOrdered.value) {
          const u =
            item?.image_1920_media?.url
            || item?.image1920Media?.url
            || item?.avatar_media?.url
            || item?.avatarMedia?.url
            || item?.avatar
            || '';
          const nu = normalizeMediaUrl(u);
          if (typeof nu === 'string' && nu.trim().length > 0 && !isBlockedArtistImage(nu)) {
            urls.push(nu);
          }
        }
        if (urls.length > 0) return urls;
      }

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

    /** 同時有 contributors 與 collectives 時：藝術家區塊只用 contributors，collectives 改在製作團隊區塊顯示，避免重複。 */
    const showTeamSection = computed(() => {
      const contributors = work.value?.contributors;
      const collectives = work.value?.collectives;
      return (
        Array.isArray(contributors) &&
        contributors.length > 0 &&
        Array.isArray(collectives) &&
        collectives.length > 0
      );
    });

    /** 從單一 collective 物件取出 members 清單（含名稱、圖片、介紹） */
    const extractCollectiveMembers = (c) => {
      const rawMembers = Array.isArray(c?.members) ? c.members : [];
      return rawMembers.map((m) => {
        const name = isEnglish.value
          ? (m?.name || m?.name_zh_tw || '').trim()
          : (m?.name_zh_tw || m?.name || '').trim();
        const rawIntro = isEnglish.value
          ? (m?.introduction || '')
          : (m?.introduction_zh_tw || m?.introduction || '');
        const description = stripHtml(rawIntro).trim();
        const u =
          m?.image_1920_media?.url
          || m?.image1920Media?.url
          || m?.avatar_media?.url
          || m?.avatarMedia?.url
          || m?.avatar
          || '';
        const nu = normalizeMediaUrl(u);
        const imageUrl =
          typeof nu === 'string' && nu.length > 0 && !isBlockedArtistImage(nu) ? nu : '';
        return { name, description, imageUrl };
      }).filter((m) => m.name || m.description || m.imageUrl);
    };

    const teamCollectivesDisplay = computed(() => {
      let list = Array.isArray(work.value?.collectives) ? [...work.value.collectives] : [];
      if (activeCustomDisplayRule.value && customDisplayOrdered.value.length > 0) {
        const collectiveItems = customDisplayOrdered.value
          .filter((x) => x.kind === 'collective')
          .map((x) => x.item);
        const idOf = (c) => c?.id ?? JSON.stringify(c?.name_zh_tw || c?.name || '');
        const orderedIds = new Set(collectiveItems.map(idOf));
        const rest = list.filter((c) => !orderedIds.has(idOf(c)));
        list = [...collectiveItems, ...rest];
      }
      return list
        .map((c) => {
          const name = isEnglish.value
            ? (c?.name || c?.name_zh_tw || '').trim()
            : (c?.name_zh_tw || c?.name || '').trim();
          const rawDesc = isEnglish.value
            ? (c?.description || '')
            : (c?.description_zh_tw || c?.description || '');
          const description = stripHtml(rawDesc).trim();
          const u =
            c?.image_1920_media?.url
            || c?.image1920Media?.url
            || c?.avatar_media?.url
            || c?.avatarMedia?.url
            || c?.avatar
            || '';
          const imageUrl = normalizeMediaUrl(u);
          const imageOk =
            typeof imageUrl === 'string' &&
            imageUrl.length > 0 &&
            !isBlockedArtistImage(imageUrl);
          const members = extractCollectiveMembers(c);
          return {
            name,
            description,
            imageUrl: imageOk ? imageUrl : '',
            members,
          };
        })
        .filter((r) => r.name || r.description || r.imageUrl || r.members?.length);
    });

    const teamCollectivesTextRows = computed(() =>
      teamCollectivesDisplay.value.filter((r) => r.name || r.description || r.members?.length),
    );

    /** 只有 collectives（無 contributors）時，所有 collective 的成員扁平陣列 */
    const collectivesMembersRows = computed(() => {
      const collectiveList = Array.isArray(work.value?.collectives) ? work.value.collectives : [];
      const contributorList = Array.isArray(work.value?.contributors) ? work.value.contributors : [];
      // 只在沒有 contributors 時使用
      if (contributorList.length > 0) return [];
      return collectiveList.flatMap((c) => extractCollectiveMembers(c));
    });

    const mergedPhotoItems = computed(() => {
      if (activeCustomDisplayRule.value && customDisplayOrdered.value.length > 0 && !hideArtistPhoto.value) {
        const items = [];
        for (const { kind, item } of customDisplayOrdered.value) {
          const u =
            item?.image_1920_media?.url
            || item?.image1920Media?.url
            || item?.avatar_media?.url
            || item?.avatarMedia?.url
            || item?.avatar
            || '';
          const nu = normalizeMediaUrl(u);
          if (typeof nu === 'string' && nu.length > 0 && !isBlockedArtistImage(nu)) {
            items.push({ url: nu, kind: kind === 'collective' ? 'team' : 'artist' });
          }
        }
        return items;
      }

      const items = [];
      if (!hideArtistPhoto.value) {
        for (const url of artistAvatarUrls.value) {
          items.push({ url, kind: 'artist' });
        }
      }
      if (showTeamSection.value) {
        for (const row of teamCollectivesDisplay.value) {
          if (row.imageUrl) items.push({ url: row.imageUrl, kind: 'team' });
        }
      }
      return items;
    });

    const showMergedPhotos = computed(() => mergedPhotoItems.value.length > 0);

    const extraProposalHtml = computed(() => {
      const raw = isEnglish.value ? extraProposalEn.value : extraProposalZh.value;
      return typeof raw === 'string' ? raw : '';
    });

    const showExtraProposal = computed(
      () => stripHtml(extraProposalHtml.value || '').trim().length > 0,
    );

    /** Banner 顯示用圖片陣列（最多6張，含 featured + photos） */
    const bannerImages = computed(() => {
      const photosArr = Array.isArray(work.value?.photos) ? work.value.photos : [];
      let urls = photosArr
        .map((p) => p?.image_media?.url || '')
        .map(makeUrl)
        .filter(Boolean);

      if (urls.length === 0) {
        // 回退舊欄位
        urls = imageUrls.value.slice(0, 6);
      }

      // 如果只有 featured 而無 photos，用 featured
      if (urls.length === 0) {
        const fUrl = makeUrl(work.value?.featured_photo_media?.url || '');
        if (fUrl) urls.push(fUrl);
      }

      return urls.slice(0, 6);
    });

    /** 2張圖時，根據自然比例分配 flex 比例（預設 1:1） */
    const splitRatios = computed(() => {
      if (bannerImages.value.length !== 2) return [1, 1];
      const r = imageNaturalRatios.value;
      if (r.length < 2 || !r[0] || !r[1]) return [1, 1];
      // flex 比例 = 寬高比（寬更寬的圖佔更多空間）
      const total = r[0] + r[1];
      return [r[0] / total * 2, r[1] / total * 2];
    });

    /** 預載圖片取得自然比例 */
    const preloadImageRatios = () => {
      if (bannerImages.value.length !== 2) return;
      imageNaturalRatios.value = [0, 0];
      bannerImages.value.forEach((url, i) => {
        const img = new Image();
        img.onload = () => {
          const ratios = [...imageNaturalRatios.value];
          ratios[i] = img.naturalWidth / (img.naturalHeight || 1);
          imageNaturalRatios.value = ratios;
        };
        img.src = url;
      });
    };

    /** 啟動 Slider 自動播放 */
    const startSlider = () => {
      stopSlider();
      const count = bannerImages.value.length - 1; // 右側張數
      if (count <= 1) return;
      sliderTimer = setInterval(() => {
        sliderIndex.value = (sliderIndex.value + 1) % count;
      }, 3500);
    };

    const stopSlider = () => {
      if (sliderTimer) {
        clearInterval(sliderTimer);
        sliderTimer = null;
      }
    };

    watch(bannerImages, async () => {
      sliderIndex.value = 0;
      await nextTick();
      preloadImageRatios();
      if (bannerImages.value.length >= 4) startSlider();
      else stopSlider();
    }, { immediate: false });

    const fetchExtraProposal = async (workIdStr) => {
      const sid = String(workIdStr || '');
      if (!EXTRA_PROPOSAL_WORK_IDS.has(sid)) {
        extraProposalZh.value = '';
        extraProposalEn.value = '';
        return;
      }
      try {
        const { data } = await axios.get(WORK_DETAIL_API(sid), {
          headers: { Authorization: API_AUTH },
        });
        const entity = data?.data && typeof data.data === 'object' ? data.data : data;
        const zh = entity?.proposal_zh_tw ?? entity?.proposalZhTw ?? '';
        const en = entity?.proposal ?? '';
        extraProposalZh.value = typeof zh === 'string' ? zh : '';
        extraProposalEn.value = typeof en === 'string' ? en : '';
      } catch (e) {
        console.error('Failed to fetch work proposal (193/194):', e);
        extraProposalZh.value = '';
        extraProposalEn.value = '';
      }
    };

    const loadFromLocal = () => {
      try {
        const key = `work_${id}`;
        const raw = localStorage.getItem(key);
        if (!raw) return false;
        const parsed = JSON.parse(raw);
        work.value = parsed;
        recalcDerived();
        return true;
      } catch (e) {
        console.error('Failed to parse work data from localStorage:', e);
        return false;
      }
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
            collectives: Array.isArray(entity?.collectives) ? entity.collectives : [],
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
      loadFromLocal();
      // 確保每次都能拿到最新帶有 level=detail 的資料
      await fetchFromApi();
      await fetchExtraProposal(id);
      window.addEventListener('storage', handleStorage);
      // 初始啟動 banner 邏輯
      await nextTick();
      preloadImageRatios();
      if (bannerImages.value.length >= 4) startSlider();
    });

    watch(
      () => String(proxy.$route.params.id || ''),
      (newId, oldId) => {
        if (!newId || newId === oldId) return;
        fetchExtraProposal(newId);
      },
    );

    onBeforeUnmount(() => {
      window.removeEventListener('storage', handleStorage);
      stopSlider();
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
      artistIntroRows,
      artistAvatarUrls,
      hideArtistPhoto,
      isLogoArtistWork,
      showTeamSection,
      teamCollectivesDisplay,
      teamCollectivesTextRows,
      collectivesMembersRows,
      mergedPhotoItems,
      showMergedPhotos,
      customOrderIntroRows,
      extraProposalHtml,
      showExtraProposal,
      // Banner
      bannerImages,
      splitRatios,
      sliderIndex,
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

/* ============================
   Banner 自適應版面
   ============================ */

/* 共用高度變數 */
$banner-h: 55vh;
$banner-h-md: 45vh;
$banner-h-sm: 38vh;
$banner-gap: 4px;

/* --- 單張：滿寬 --- */
.work-hero--single {
  width: 100%;
  height: $banner-h;
  background: #000;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  &:hover img {
    transform: scale(1.04);
  }
}

/* --- 2張 / 3張：Flex 分割版面 --- */
.work-hero-split {
  display: flex;
  width: 100%;
  height: $banner-h;
  gap: $banner-gap;
  background: #000;
  overflow: hidden;

  &__item {
    position: relative;
    overflow: hidden;
    transition: flex 0.6s cubic-bezier(0.4, 0, 0.2, 1);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.4s ease;
    }

    &:hover img {
      transform: scale(1.04);
    }
  }

  /* 3張特有：左大圖 + 右側堆疊 */
  &__main {
    flex: 1.35;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.4s ease;
    }

    &:hover img {
      transform: scale(1.04);
    }
  }

  &__stack {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: $banner-gap;
    overflow: hidden;
  }

  &__stack-item {
    flex: 1;
    overflow: hidden;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.4s ease;
    }

    &:hover img {
      transform: scale(1.06);
    }
  }
}

/* --- 4張以上：左固定 + 右側 Slider --- */
.work-hero-slider {
  display: flex;
  width: 100%;
  height: $banner-h;
  gap: $banner-gap;
  background: #000;
  overflow: hidden;

  &__fixed {
    flex: 1.2;
    overflow: hidden;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.4s ease;
    }

    &:hover img {
      transform: scale(1.04);
    }
  }

  &__reel {
    flex: 1;
    position: relative;
    overflow: hidden;
  }

  &__track {
    display: flex;
    width: 100%;
    height: 100%;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &__slide {
    flex: 0 0 100%;
    width: 100%;
    height: 100%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  /* 指示點 */
  &__dots {
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 10;
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.45);
    cursor: pointer;
    transition: background 0.3s, transform 0.3s;

    &.active {
      background: #fff;
      transform: scale(1.3);
    }

    &:hover {
      background: rgba(255, 255, 255, 0.8);
    }
  }
}

/* --- 舊樣式保留（向後相容） --- */
.work-hero-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  width: 100%;
  height: $banner-h;
  overflow: hidden;
}

.work-hero {
  width: 100%;
  height: $banner-h;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
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

  .work-proposal {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(0, 0, 0, 0.12);
  }

  .work-proposal-body {
    font-size: 1.05rem;
    line-height: 1.9;
    color: #000000;
    text-align: justify;

    :deep(p) {
      margin: 0 0 0.75em;

      &:last-child {
        margin-bottom: 0;
      }
    }

    :deep(ul),
    :deep(ol) {
      margin: 0 0 0.75em 1.25em;
      padding: 0;
    }

    :deep(strong),
    :deep(b) {
      font-weight: 700;
    }
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

  .team-blurb {
    margin-top: 1.35em;
  }

  .team-blurb-title {
    font-size: 1.05rem;
    font-weight: 600;
    margin: 0 0 0.5em 0;
    color: #000000;
    line-height: 1.35;
  }

  .team-blurb p {
    font-size: 1rem;
    line-height: 1.8;
    color: #000000;
    margin: 0;
    white-space: pre-wrap;
    text-align: justify;
  }

  /* 團隊成員列：大頭圖 + 簡介並排 */
  .collective-member-row {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    margin-top: 1.2em;
    padding-top: 1.2em;
    border-top: 1px solid rgba(0, 0, 0, 0.1);

    &:first-of-type {
      margin-top: 0.8em;
      padding-top: 0.8em;
    }
  }

  .collective-member-avatar {
    width: 72px;
    height: 72px;
    object-fit: cover;
    border-radius: 50%;
    border: 3px solid #ffffff;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    flex-shrink: 0;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.06);
    }
  }

  .collective-member-text {
    flex: 1;
    min-width: 0;

    .team-blurb-title {
      margin-top: 0;
    }
  }
}

/* 特定作品：僅藝術家頭像為 logo 排版，團隊頭像仍為圓形 */
.artist-section.logo-artist {
  .artist-photo img.people-photo-img--logo,
  .artist-photos img.people-photo-img--logo {
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

  .work-hero-grid,
  .work-hero--single,
  .work-hero-split,
  .work-hero-slider {
    height: 45vh;
  }

  .work-hero {
    height: 45vh;
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

  .work-hero,
  .work-hero--single {
    height: 38vh;
  }

  /* 手機上 2/3 張分割改為上下排列 */
  .work-hero-split {
    flex-direction: column;
    height: auto;

    &__item {
      height: 35vw;
    }

    &__main {
      height: 45vw;
    }

    &__stack {
      flex-direction: row;
    }

    &__stack-item {
      height: 30vw;
    }
  }

  /* 手機上 slider 也改為上下 */
  .work-hero-slider {
    flex-direction: column;
    height: auto;

    &__fixed {
      height: 40vw;
      flex: none;
    }

    &__reel {
      height: 38vw;
      flex: none;
    }
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

  .work-hero-grid,
  .work-hero--single,
  .work-hero-split,
  .work-hero-slider {
    height: 62vh;
  }

  .work-hero {
    height: 62vh;
  }
}
</style>
