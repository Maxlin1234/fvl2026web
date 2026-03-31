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
              <template v-if="shinModernIntroRows.length">
                <div
                  v-for="(row, i) in shinModernIntroRows"
                  :key="'shin-intro-' + i"
                  class="team-blurb"
                >
                  <h3 v-if="row.name" class="team-blurb-title">{{ row.name }}</h3>
                  <p v-if="row.description">{{ row.description }}</p>
                </div>
              </template>
              <template v-else>
                <p v-if="artistIntroText">{{ artistIntroText }}</p>
                <template v-if="showTeamSection">
                  <div
                    v-for="(row, i) in teamCollectivesTextRows"
                    :key="i"
                    class="team-blurb"
                  >
                    <h3 v-if="row.name" class="team-blurb-title">{{ row.name }}</h3>
                    <p v-if="row.description">{{ row.description }}</p>
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
import { ref, onMounted, onBeforeUnmount, computed, watch, getCurrentInstance } from 'vue';
import axios from 'axios';

export default {
  name: 'PortfolioDetil',
  setup() {
    const WORKS_API_URL = 'https://unzip.clab.org.tw/api/v1/projects/21/works';
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

    /** 《新摩登時代》藝術家／團體顯示順序（對應 API 的 name / name_zh_tw） */
    const SHIN_MODERN_ERA_NAME_ORDER = ['初未來', '超維度', '江戶未來世', 'Kivi', '賴皮', '林強'];

    const entityMatchesShinOrderKey = (entity, orderKey) => {
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

    const buildShinModernOrderedPairs = (contributors, collectives) => {
      const cList = Array.isArray(contributors) ? contributors : [];
      const tList = Array.isArray(collectives) ? collectives : [];
      const usedC = new Set();
      const usedT = new Set();
      const ordered = [];
      for (const orderKey of SHIN_MODERN_ERA_NAME_ORDER) {
        let idx = -1;
        for (let i = 0; i < cList.length; i += 1) {
          if (usedC.has(i)) continue;
          if (entityMatchesShinOrderKey(cList[i], orderKey)) {
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
          if (entityMatchesShinOrderKey(tList[i], orderKey)) {
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

    const isShinModernEraWork = computed(() => {
      const zh = work.value?.work_zh?.title || '';
      const en = work.value?.work_en?.title || '';
      if (String(zh).includes('新摩登時代') || String(en).includes('新摩登時代')) return true;
      return /shin\s*modern/i.test(String(en)) || /modern\s*era/i.test(String(en));
    });

    const shinModernOrdered = computed(() => {
      if (!isShinModernEraWork.value) return [];
      return buildShinModernOrderedPairs(work.value?.contributors, work.value?.collectives);
    });

    /** 《新摩登時代》藝術家介紹：依固定順序分段（名稱＋簡介），與頭像列一致 */
    const shinModernIntroRows = computed(() => {
      if (!isShinModernEraWork.value || shinModernOrdered.value.length === 0) return [];
      const rows = [];
      for (const { kind, item } of shinModernOrdered.value) {
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
      if (isShinModernEraWork.value && shinModernOrdered.value.length > 0) {
        const names = shinModernOrdered.value
          .map(({ item }) => (isEnglish.value ? item?.name : (item?.name_zh_tw || item?.name)))
          .filter((v) => typeof v === 'string' && v.trim().length > 0);
        if (names.length) return names.join(' × ');
      }

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
      if (isShinModernEraWork.value && shinModernIntroRows.value.length > 0) {
        return '';
      }

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
      if (isShinModernEraWork.value && shinModernOrdered.value.length > 0) {
        const urls = [];
        for (const { item } of shinModernOrdered.value) {
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

    const teamCollectivesDisplay = computed(() => {
      let list = Array.isArray(work.value?.collectives) ? [...work.value.collectives] : [];
      if (isShinModernEraWork.value && shinModernOrdered.value.length > 0) {
        const collectiveItems = shinModernOrdered.value
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
          return {
            name,
            description,
            imageUrl: imageOk ? imageUrl : '',
          };
        })
        .filter((r) => r.name || r.description || r.imageUrl);
    });

    const teamCollectivesTextRows = computed(() =>
      teamCollectivesDisplay.value.filter((r) => r.name || r.description),
    );

    const mergedPhotoItems = computed(() => {
      if (isShinModernEraWork.value && shinModernOrdered.value.length > 0 && !hideArtistPhoto.value) {
        const items = [];
        for (const { kind, item } of shinModernOrdered.value) {
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
      const ok = loadFromLocal();
      const staleTeam =
        ok &&
        work.value &&
        Array.isArray(work.value.contributors) &&
        work.value.contributors.length > 0 &&
        (!Array.isArray(work.value.collectives) || work.value.collectives.length === 0);
      if (!ok || staleTeam) await fetchFromApi();
      await fetchExtraProposal(id);
      window.addEventListener('storage', handleStorage);
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
      showTeamSection,
      teamCollectivesDisplay,
      teamCollectivesTextRows,
      mergedPhotoItems,
      showMergedPhotos,
      shinModernIntroRows,
      extraProposalHtml,
      showExtraProposal,
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
