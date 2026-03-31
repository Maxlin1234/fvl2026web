<template>
  <section class="calendar2">
    <div class="months-strip-hint">
      <button
        type="button"
        class="months-strip-hint__btn"
        :aria-label="isEnglish ? 'Previous month' : '上一個月'"
        @click="scrollMonthsPrev"
      >
        &lt;
      </button>
      <span class="months-strip-hint__text">{{
        isEnglish ? 'Swipe to switch month' : '左右滑動切換月份'
      }}</span>
      <button
        type="button"
        class="months-strip-hint__btn"
        :aria-label="isEnglish ? 'Next month' : '下一個月'"
        @click="scrollMonthsNext"
      >
        &gt;
      </button>
    </div>
    <div
      ref="monthsStrip"
      class="months-strip"
      :style="monthsStripHeightStyle"
      tabindex="0"
      role="region"
      :aria-label="isEnglish ? 'Program schedule by month' : '節目表月份'"
      @scroll="onMonthsStripScroll"
    >
      <div
        v-for="month in groupedByMonth"
        :key="month.ym"
        ref="monthSlides"
        class="month-slide"
      >
        <h3 class="month-title">{{ month.label }}</h3>
        <div
          v-for="day in month.days"
          :key="day.date"
          class="day-block"
        >
          <div class="day-subtitle">
            <span class="day-subtitle__date">{{ formatDate(day.date) }}</span>
            <span class="day-subtitle__weekday">{{ weekday(day.date) }}</span>
          </div>
          <ul class="event-list">
            <li
              v-for="(evt, idx) in day.events"
              :key="evt.id"
              class="event-item"
              :class="{ alt: idx % 2 === 1 }"
            >
              <div class="event-content">
                <div class="titles">
                  <div v-if="!isEnglish" class="title-zh">{{ evt.titleZh }}</div>
                  <div v-else class="title-en">{{ evt.titleEn }}</div>
                </div>
                <div class="meta">
                  <span class="time">{{ isEnglish ? (evt.timeEn || evt.time) : evt.time }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/** FVL 2026 / 四月節目表（與主視覺檔期一致：4/18 起） */
const APR_BLOCK_A_ZH = `浮點設計 | 《萬象之初》 | 3 mins
凱蒂·卡托納 | 《藏識》 | 12 mins
初未來 X 超維度 X 江戶未來世 X Kivi X 賴皮 X 林強 | 《新摩登時代》 | 20 mins`;

const APR_BLOCK_A_EN = `FPA | Genesis | 3 mins
Katie Katona | Alaya | 12 mins
Hello World x Dimension Plus x Hello Ebol x Kivi x Mr. Skin x LIM Giong | NEW MODERN TIMES | 20 mins`;

const APR_BLOCK_B_ZH = `浮點設計 | 《萬象之初》 | 3 mins
PHOSPHEN | 《時空》 | 39 mins`;

const APR_BLOCK_B_EN = `FPA | Genesis | 3 mins
PHOSPHENE | Temporal | 39 mins`;

const APR_BLOCK_C_ZH = `浮點設計 | 《萬象之初》 | 3 mins
AINO X Yunyoung JANG | 《深層根木》 | 12 mins
barbe_generative_diary | 短篇集錦 - 《描繪寂靜》 | 5 mins
李根耀 | 《街道之書：同淋一場雨》 | 5 mins
詹志英 | 《非體 1》 | 5 mins
謝鎮璘 | 《光所到之處》 | 5 mins
琳恩·濕琳森 | 《山之夜曲》 | 3 mins`;

const APR_BLOCK_C_EN = `FPA | Genesis | 3 mins
AINO x Yunyoung JANG | Deep Rootwood | 12 mins
barbe_generative_diary | Short Film Showcase — "Depicting Silence" | 5 mins
Root LEE | Short Film Showcase — "Street Book: Caught in the Same Rain" | 5 mins
Jimmy YU | Short Film Showcase — "Non-Body 1" | 5 mins
Damonsari | Short Film Showcase — "Where Light Reaches" | 5 mins
Lynn TOMLINSON | "Nocturne of the Mountain" | 3 mins`;

const APR_BLOCK_D_ZH = `浮點設計 | 《萬象之初》 | 3 mins
桑德琳·德米耶 X 拉爾夫·基爾赫茲 | 《係鹿》 | 12 mins
吳秉聖 X 劉承杰 | 《時間層理》 | 22 mins`;

const APR_BLOCK_D_EN = `FPA | Genesis | 3 mins
Sandrine Deumier x Ralf Kleinschmidt | Tying the Deer | 12 mins
WU Ping-Sheng x LIU Cheng-Chieh | Strata of Time | 22 mins`;

function aprEvt(id, date, time, zh, en, sortOrder) {
  return {
    id,
    date,
    time,
    timeEn: time,
    titleZh: zh,
    titleEn: en,
    location: 'DOME',
    locationEn: 'DOME',
    sortOrder,
  };
}

/** 五月：表定《循鹿》文案與短片塊（深層根本／同林一場雨等依圖檔） */
const MAY_MONOCOLOR_ZH = `MONOCOLOR | 《意識之維》(現場演出) | 35 mins`;
const MAY_MONOCOLOR_EN = `MONOCOLOR | NOOSPHERE (Live Performance) | 35 mins`;

const MAY_BLOCK_D_ZH = `浮點設計 | 《萬象之初》 | 3 mins
桑德琳·德米耶 X 拉爾夫·基爾赫茲 | 《循鹿》 | 12 mins
吳秉聖 X 劉承杰 | 《時間層理》 | 22 mins`;

const MAY_BLOCK_D_EN = `FPA | Genesis | 3 mins
Sandrine Deumier x Ralf Kleinschmidt | Following the Deer | 12 mins
WU Ping-Sheng x LIU Cheng-Chieh | Strata of Time | 22 mins`;

const MAY_BLOCK_C_ZH = `浮點設計 | 《萬象之初》 | 3 mins
AINO X Yunyoung JANG | 《深層根本》 | 12 mins
barbe_generative_diary | 短篇集錦 —《描繪寂靜》 | 5 mins
李根耀 | 《街道之書：同林一場雨》 | 5 mins
龐志美 | 《非體 1》 | 5 mins
謝韻琪 | 《光所到之處》 | 5 mins
琳恩·湯琳森 | 《山之夜曲》 | 3 mins`;

const MAY_BLOCK_C_EN = `FPA | Genesis | 3 mins
AINO x Yunyoung JANG | Deep Roots | 12 mins
barbe_generative_diary | Short Film Showcase — "Depicting Silence" | 5 mins
Root LEE | Short Film Showcase — "Street Book: Rain in the Same Grove" | 5 mins
PANG Chih-Mei | Short Film Showcase — "Non-Body 1" | 5 mins
HSIEH Yun-Chi | Short Film Showcase — "Where Light Reaches" | 5 mins
Lynne Tomlinson | "Nocturne of the Mountain" | 3 mins`;

const MAY_KOHUI_ZH = `Kohui | 《眾聲場：環形運動》(現場演出) | 30 mins`;
const MAY_KOHUI_EN = `Kaku | Periphery: Circular Movement (Live Performance) | 30 mins`;

const MAY_PARTY_ZH = `《未來視覺派對#3》(現場售票演出) | 60 mins`;
const MAY_PARTY_EN = `FUTURE VISION LAB Party #3 (Ticketed Live) | 60 mins`;

const MAY_POND_ZH = `移動故事屋 | 《池塘國選舉》(現場演出) | 45 mins`;
const MAY_POND_EN = `Telling Tent | The Pond Nation Election (Live Performance) | 45 mins`;

/** 5/17 場次：《藏識》改《離魂》 */
const MAY_517_A_ZH = `浮點設計 | 《萬象之初》 | 3 mins
凱蒂·卡托納 | 《離魂》 | 12 mins
初未來 X 超維度 X 江戶未來世 X Kivi X 賴皮 X 林強 | 《新摩登時代》 | 20 mins`;

const MAY_517_A_EN = `FPA | Genesis | 3 mins
Katie Katona | Soul Departure | 12 mins
Hello World x Dimension Plus x Hello Ebol x Kivi x Mr. Skin x LIM Giong | NEW MODERN TIMES | 20 mins`;

/** 5/17 17:00 短片集錦／詹志英、謝鎮璘、琳恩·潘琳森 */
const MAY_517_C17_ZH = `浮點設計 | 《萬象之初》 | 3 mins
AINO X Yunyoung JANG | 《深層根本》 | 12 mins
barbe_generative_diary | 短篇集錦 — 《描繪寂靜》 | 5 mins
李根耀 | 短篇集錦 — 《街道之書：同淋一場雨》 | 5 mins
詹志英 | 短篇集錦 — 《非體 1》 | 5 mins
謝鎮璘 | 短篇集錦 — 《光所到之處》 | 5 mins
琳恩·潘琳森 | 《山之夜曲》 | 3 mins`;

const MAY_517_C17_EN = `FPA | Genesis | 3 mins
AINO x Yunyoung JANG | Deep Roots | 12 mins
barbe_generative_diary | Short Film Showcase — "Depicting Silence" | 5 mins
Root LEE | Short Film Showcase — "Street Book: Caught in the Same Rain" | 5 mins
CHAN Chih-Ying | Short Film Showcase — "Non-Body 1" | 5 mins
HSIEH Chen-Lin | Short Film Showcase — "Where Light Reaches" | 5 mins
Lynne Pan Lin-Sen | "Nocturne of the Mountain" | 3 mins`;

const MAY_WEI_EXH_ZH = `魏廷宇 | 《誤差追獵》(展覽)`;
const MAY_WEI_EXH_EN = `Tin Will | Seeking for Errors (Exhibition)`;

const MAY_YAO_EXH_ZH = `姚瑞中 X 郭一 X Meuko! Meuko! | 《虛廷山》(展覽)`;
const MAY_YAO_EXH_EN = `YAO Jui-Chung x YIKUO x Meuko Meuko | Mount Fantasy (Exhibition)`;

const MAY_YAO_LIVE_ZH = `姚瑞中 X 郭一 X Meuko! Meuko! | 《虛廷山》(現場售票演出) | 60 mins`;
const MAY_YAO_LIVE_EN = `YAO Jui-Chung x YIKUO x Meuko Meuko | Mount Fantasy (Live Performance) | 60 mins`;

/** 六月：沉浸式影音工作坊（三校輪播，依圖檔） */
const JUN_WORKSHOP_TNUA_ZH = `《沉浸式影音工作坊—校際成果呈現》北藝大新媒系 | 55 mins`;
const JUN_WORKSHOP_TNUA_EN = `Immersive Audio-Visual Workshop — The Joint Presentation | Department of New Media Art, TNUA | 55 mins`;

const JUN_WORKSHOP_NTUST_ZH = `《沉浸式影音工作坊—校際成果呈現》北科大互動系 | 60 mins`;
const JUN_WORKSHOP_NTUST_EN = `Immersive Audio-Visual Workshop — The Joint Presentation | NTUST Department of Interaction Design | 60 mins`;

const JUN_WORKSHOP_NTHU_ZH = `《沉浸式影音工作坊—校際成果呈現》清大藝術學院科藝組 | 40 mins`;
const JUN_WORKSHOP_NTHU_EN = `Immersive Audio-Visual Workshop — The Joint Presentation | NTHU College of Arts, Arts & Technology | 40 mins`;

/** 6/7 14:00（圖檔用字：藏端、超緯度） */
const JUN_607_A_ZH = `浮點設計 | 《萬象之初》 | 3 mins
凱蒂·卡托納 | 《藏端》 | 12 mins
初未來 X 超緯度 X 江戶未來世 X Kivi X 賴皮 X 林強 | 《新摩登時代》 | 20 mins`;

const JUN_607_A_EN = `FPA | Genesis | 3 mins
Katie Katona | Terminal | 12 mins
Hello World x Ultra-Latitude x Hello Ebol x Kivi x Mr. Skin x LIM Giong | NEW MODERN TIMES | 20 mins`;

/** 6/7 15:00／18:00 長節目單（深層根木、詹志美、琳恩·馮琳森） */
const JUN_607_LONG_ZH = `浮點設計 | 《萬象之初》 | 3 mins
AINO X Yunyoung JANG | 《深層根木》 | 12 mins
barbe_generative_diary | 短篇集錦 — 《描繪寂靜》 | 5 mins
李根耀 | 短篇集錦 — 《街道之書：同淋一場雨》 | 5 mins
詹志美 | 短篇集錦 — 《非體 1》 | 5 mins
謝鎮璘 | 短篇集錦 — 《光所到之處》 | 5 mins
琳恩·馮琳森 | 《山之夜曲》 | 3 mins`;

const JUN_607_LONG_EN = `FPA | Genesis | 3 mins
AINO x Yunyoung JANG | Deep Rootwood | 12 mins
barbe_generative_diary | Short Film Showcase — "Depicting Silence" | 5 mins
Root LEE | Short Film Showcase — "Street Book: Caught in the Same Rain" | 5 mins
Jimmy YU | Short Film Showcase — "Non-Body 1" | 5 mins
Damonsari | Short Film Showcase — "Where Light Reaches" | 5 mins
Lynn TOMLINSON | "Nocturne of the Mountain" | 3 mins`;

/** 6/7 17:00（拉圖夫·基爾赫茲、小寫 x） */
const JUN_607_17_ZH = `浮點設計 | 《萬象之初》 | 3 mins
桑德琳·德米耶 x 拉圖夫·基爾赫茲 | 《循鹿》 | 12 mins
吳秉聖 x 劉承杰 | 《時間層理》 | 22 mins`;

const JUN_607_17_EN = `FPA | Genesis | 3 mins
Sandrine Deumier x Latuf Kleinschmidt | Following the Deer | 12 mins
WU Ping-Sheng x LIU Cheng-Chieh | Strata of Time | 22 mins`;

export default {
  name: 'Cal-endar2',
  props: {
    isEnglish: { type: Boolean, default: false }
  },
  data() {
    return {
      /** 依「目前可見月份」量測，避免橫列被最長月份撑高造成 4/6 月下方空白 */
      monthsStripHeightPx: null,
      events: [
        aprEvt(1, '2026-04-18', '14:00', APR_BLOCK_A_ZH, APR_BLOCK_A_EN, 1),
        aprEvt(2, '2026-04-18', '15:00', APR_BLOCK_B_ZH, APR_BLOCK_B_EN, 2),
        aprEvt(3, '2026-04-18', '16:00', APR_BLOCK_C_ZH, APR_BLOCK_C_EN, 3),
        aprEvt(4, '2026-04-18', '17:00', APR_BLOCK_D_ZH, APR_BLOCK_D_EN, 4),
        aprEvt(5, '2026-04-18', '18:00', APR_BLOCK_A_ZH, APR_BLOCK_A_EN, 5),
        aprEvt(6, '2026-04-18', '19:00', APR_BLOCK_B_ZH, APR_BLOCK_B_EN, 6),

        aprEvt(7, '2026-04-19', '14:00', APR_BLOCK_C_ZH, APR_BLOCK_C_EN, 1),
        aprEvt(8, '2026-04-19', '15:00', APR_BLOCK_D_ZH, APR_BLOCK_D_EN, 2),
        aprEvt(9, '2026-04-19', '16:00', APR_BLOCK_A_ZH, APR_BLOCK_A_EN, 3),
        aprEvt(10, '2026-04-19', '17:00', APR_BLOCK_B_ZH, APR_BLOCK_B_EN, 4),
        aprEvt(11, '2026-04-19', '18:00', APR_BLOCK_C_ZH, APR_BLOCK_C_EN, 5),

        aprEvt(12, '2026-04-25', '14:00', APR_BLOCK_D_ZH, APR_BLOCK_D_EN, 1),
        aprEvt(13, '2026-04-25', '15:00', APR_BLOCK_A_ZH, APR_BLOCK_A_EN, 2),
        aprEvt(14, '2026-04-25', '16:00', APR_BLOCK_B_ZH, APR_BLOCK_B_EN, 3),
        aprEvt(15, '2026-04-25', '17:00', APR_BLOCK_C_ZH, APR_BLOCK_C_EN, 4),
        aprEvt(16, '2026-04-25', '18:00', APR_BLOCK_D_ZH, APR_BLOCK_D_EN, 5),
        aprEvt(17, '2026-04-25', '19:00', APR_BLOCK_A_ZH, APR_BLOCK_A_EN, 6),

        aprEvt(18, '2026-04-26', '14:00', APR_BLOCK_D_ZH, APR_BLOCK_D_EN, 1),
        aprEvt(19, '2026-04-26', '15:00', APR_BLOCK_B_ZH, APR_BLOCK_B_EN, 2),
        aprEvt(20, '2026-04-26', '16:00', APR_BLOCK_A_ZH, APR_BLOCK_A_EN, 3),
        aprEvt(21, '2026-04-26', '17:00', APR_BLOCK_D_ZH, APR_BLOCK_D_EN, 4),
        aprEvt(22, '2026-04-26', '18:00', APR_BLOCK_C_ZH, APR_BLOCK_C_EN, 5),

        aprEvt(101, '2026-05-01', '15:00', MAY_MONOCOLOR_ZH, MAY_MONOCOLOR_EN, 1),
        aprEvt(102, '2026-05-01', '19:00', MAY_MONOCOLOR_ZH, MAY_MONOCOLOR_EN, 2),
        aprEvt(103, '2026-05-02', '15:00', MAY_MONOCOLOR_ZH, MAY_MONOCOLOR_EN, 1),
        aprEvt(104, '2026-05-02', '19:00', MAY_MONOCOLOR_ZH, MAY_MONOCOLOR_EN, 2),
        aprEvt(105, '2026-05-03', '14:00', APR_BLOCK_A_ZH, APR_BLOCK_A_EN, 1),
        aprEvt(106, '2026-05-03', '15:00', MAY_BLOCK_C_ZH, MAY_BLOCK_C_EN, 2),
        aprEvt(107, '2026-05-03', '16:00', MAY_BLOCK_D_ZH, MAY_BLOCK_D_EN, 3),
        aprEvt(108, '2026-05-03', '17:00', APR_BLOCK_B_ZH, APR_BLOCK_B_EN, 4),
        aprEvt(109, '2026-05-03', '18:00', APR_BLOCK_A_ZH, APR_BLOCK_A_EN, 5),
        aprEvt(110, '2026-05-08', '19:30', MAY_KOHUI_ZH, MAY_KOHUI_EN, 1),
        aprEvt(111, '2026-05-09', '15:00', MAY_KOHUI_ZH, MAY_KOHUI_EN, 1),
        aprEvt(112, '2026-05-09', '19:00', MAY_KOHUI_ZH, MAY_KOHUI_EN, 2),
        aprEvt(113, '2026-05-10', '15:00', MAY_KOHUI_ZH, MAY_KOHUI_EN, 1),
        aprEvt(114, '2026-05-13', '19:30', MAY_PARTY_ZH, MAY_PARTY_EN, 1),
        aprEvt(115, '2026-05-16', '10:00', MAY_POND_ZH, MAY_POND_EN, 1),
        aprEvt(116, '2026-05-16', '11:30', MAY_POND_ZH, MAY_POND_EN, 2),
        aprEvt(117, '2026-05-16', '14:00', MAY_BLOCK_D_ZH, MAY_BLOCK_D_EN, 3),
        aprEvt(118, '2026-05-16', '15:00', APR_BLOCK_A_ZH, APR_BLOCK_A_EN, 4),
        aprEvt(119, '2026-05-16', '16:00', APR_BLOCK_B_ZH, APR_BLOCK_B_EN, 5),
        aprEvt(120, '2026-05-16', '17:00', MAY_BLOCK_C_ZH, MAY_BLOCK_C_EN, 6),
        aprEvt(121, '2026-05-16', '18:00', APR_BLOCK_A_ZH, APR_BLOCK_A_EN, 7),
        aprEvt(122, '2026-05-16', '19:00', APR_BLOCK_B_ZH, APR_BLOCK_B_EN, 8),

        aprEvt(123, '2026-05-17', '10:00', MAY_POND_ZH, MAY_POND_EN, 1),
        aprEvt(124, '2026-05-17', '11:30', MAY_POND_ZH, MAY_POND_EN, 2),
        aprEvt(125, '2026-05-17', '14:00', MAY_517_A_ZH, MAY_517_A_EN, 3),
        aprEvt(126, '2026-05-17', '15:00', MAY_BLOCK_D_ZH, MAY_BLOCK_D_EN, 4),
        aprEvt(127, '2026-05-17', '16:00', APR_BLOCK_B_ZH, APR_BLOCK_B_EN, 5),
        aprEvt(128, '2026-05-17', '17:00', MAY_517_C17_ZH, MAY_517_C17_EN, 6),
        aprEvt(129, '2026-05-17', '18:00', MAY_BLOCK_D_ZH, MAY_BLOCK_D_EN, 7),

        aprEvt(130, '2026-05-21', '17:00–19:00', MAY_WEI_EXH_ZH, MAY_WEI_EXH_EN, 1),
        aprEvt(131, '2026-05-22', '12:00–19:00', MAY_WEI_EXH_ZH, MAY_WEI_EXH_EN, 1),
        aprEvt(132, '2026-05-23', '12:00–19:00', MAY_WEI_EXH_ZH, MAY_WEI_EXH_EN, 1),
        aprEvt(133, '2026-05-24', '12:00–19:00', MAY_WEI_EXH_ZH, MAY_WEI_EXH_EN, 1),

        aprEvt(134, '2026-05-28', '12:00–18:00', MAY_YAO_EXH_ZH, MAY_YAO_EXH_EN, 1),
        aprEvt(135, '2026-05-29', '12:00–18:00', MAY_YAO_EXH_ZH, MAY_YAO_EXH_EN, 1),
        aprEvt(136, '2026-05-30', '12:00–18:00', MAY_YAO_EXH_ZH, MAY_YAO_EXH_EN, 1),
        aprEvt(137, '2026-05-30', '12:00–18:00', MAY_YAO_LIVE_ZH, MAY_YAO_LIVE_EN, 2),
        aprEvt(138, '2026-05-31', '12:00–18:00', MAY_YAO_EXH_ZH, MAY_YAO_EXH_EN, 1),

        aprEvt(139, '2026-06-06', '14:00', JUN_WORKSHOP_TNUA_ZH, JUN_WORKSHOP_TNUA_EN, 1),
        aprEvt(140, '2026-06-06', '15:15', JUN_WORKSHOP_NTUST_ZH, JUN_WORKSHOP_NTUST_EN, 2),
        aprEvt(141, '2026-06-06', '16:30', JUN_WORKSHOP_NTHU_ZH, JUN_WORKSHOP_NTHU_EN, 3),
        aprEvt(142, '2026-06-06', '17:30', JUN_WORKSHOP_TNUA_ZH, JUN_WORKSHOP_TNUA_EN, 4),
        aprEvt(143, '2026-06-06', '18:45', JUN_WORKSHOP_NTUST_ZH, JUN_WORKSHOP_NTUST_EN, 5),
        aprEvt(144, '2026-06-06', '20:00', JUN_WORKSHOP_NTHU_ZH, JUN_WORKSHOP_NTHU_EN, 6),

        aprEvt(145, '2026-06-07', '14:00', JUN_607_A_ZH, JUN_607_A_EN, 1),
        aprEvt(146, '2026-06-07', '15:00', JUN_607_LONG_ZH, JUN_607_LONG_EN, 2),
        aprEvt(147, '2026-06-07', '16:00', APR_BLOCK_B_ZH, APR_BLOCK_B_EN, 3),
        aprEvt(148, '2026-06-07', '17:00', JUN_607_17_ZH, JUN_607_17_EN, 4),
        aprEvt(149, '2026-06-07', '18:00', JUN_607_LONG_ZH, JUN_607_LONG_EN, 5),
      ]
    }
  },
  computed: {
    groupedByMonth() {
      const byMonth = {};
      for (const evt of this.events) {
        const ym = evt.date.slice(0, 7); // YYYY-MM
        if (!byMonth[ym]) byMonth[ym] = [];
        byMonth[ym].push(evt);
      }
      const sortEvents = (a, b) => {
        const dateDiff = a.date.localeCompare(b.date);
        if (dateDiff !== 0) return dateDiff;
        const orderA = a.sortOrder ?? Number.MAX_SAFE_INTEGER;
        const orderB = b.sortOrder ?? Number.MAX_SAFE_INTEGER;
        if (orderA !== orderB) return orderA - orderB;
        return a.time.localeCompare(b.time);
      };
      return Object.keys(byMonth)
        .sort()
        .map((ym) => {
          const events = [...byMonth[ym]].sort(sortEvents);
          const byDay = {};
          for (const e of events) {
            if (!byDay[e.date]) byDay[e.date] = [];
            byDay[e.date].push(e);
          }
          const days = Object.keys(byDay)
            .sort()
            .map((date) => ({
              date,
              events: byDay[date].sort(sortEvents),
            }));
          return {
            ym,
            label: this.formatMonthLabel(ym),
            days,
          };
        });
    },
    monthsStripHeightStyle() {
      if (this.monthsStripHeightPx == null) return {};
      return { height: `${this.monthsStripHeightPx}px` };
    }
  },
  watch: {
    groupedByMonth: {
      deep: true,
      handler() {
        this.$nextTick(() => this.updateMonthsStripHeight());
      },
    },
    isEnglish() {
      this.$nextTick(() => this.updateMonthsStripHeight());
    },
  },
  mounted() {
    this._onWinResize = () => this.updateMonthsStripHeight();
    window.addEventListener('resize', this._onWinResize);
    this.$nextTick(() => {
      const strip = this.$refs.monthsStrip;
      if (strip && typeof strip.addEventListener === 'function') {
        this._onMonthsStripScrollEnd = () => this.updateMonthsStripHeight();
        strip.addEventListener('scrollend', this._onMonthsStripScrollEnd);
      }
      this.updateMonthsStripHeight();
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this._onWinResize);
    const strip = this.$refs.monthsStrip;
    if (strip && this._onMonthsStripScrollEnd) {
      strip.removeEventListener('scrollend', this._onMonthsStripScrollEnd);
    }
    if (this._monthsStripScrollTimer) {
      clearTimeout(this._monthsStripScrollTimer);
    }
  },
  methods: {
    monthSlideEls() {
      const raw = this.$refs.monthSlides;
      if (!raw) return [];
      return Array.isArray(raw) ? raw : [raw];
    },
    activeMonthSlideIndex() {
      const strip = this.$refs.monthsStrip;
      const n = this.groupedByMonth.length;
      if (!strip || !strip.clientWidth || n <= 0) return 0;
      const w = strip.clientWidth;
      return Math.min(n - 1, Math.max(0, Math.round(strip.scrollLeft / w)));
    },
    updateMonthsStripHeight() {
      this.$nextTick(() => {
        const strip = this.$refs.monthsStrip;
        const slides = this.monthSlideEls();
        if (!strip || !slides.length) return;
        const el = slides[this.activeMonthSlideIndex()];
        if (!el) return;
        const h = Math.ceil(el.getBoundingClientRect().height);
        if (h > 0) this.monthsStripHeightPx = h;
      });
    },
    onMonthsStripScroll() {
      if (this._monthsStripScrollTimer) clearTimeout(this._monthsStripScrollTimer);
      this._monthsStripScrollTimer = setTimeout(() => {
        this._monthsStripScrollTimer = null;
        this.updateMonthsStripHeight();
      }, 64);
    },
    scrollMonthsPrev() {
      const el = this.$refs.monthsStrip;
      if (!el) return;
      el.scrollBy({ left: -el.clientWidth, behavior: 'smooth' });
      window.setTimeout(() => this.updateMonthsStripHeight(), 400);
    },
    scrollMonthsNext() {
      const el = this.$refs.monthsStrip;
      if (!el) return;
      el.scrollBy({ left: el.clientWidth, behavior: 'smooth' });
      window.setTimeout(() => this.updateMonthsStripHeight(), 400);
    },
    formatMonthLabel(ym) {
      const [y, m] = ym.split('-').map(n => parseInt(n, 10));
      const monthZh = `${y}年${m}月`;
      const monthEn = new Date(`${ym}-01`).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
      return this.isEnglish ? monthEn : monthZh;
    },
    formatDate(iso) {
      const d = new Date(iso);
      const mo = d.getMonth() + 1;
      const day = d.getDate();
      if (this.isEnglish) return `${mo}/${day}`;
      return `${mo}.${day}`;
    },
    weekday(iso) {
      const d = new Date(iso);
      if (this.isEnglish) {
        const w = d.toLocaleDateString('en-US', { weekday: 'short' });
        return `(${w})`;
      }
      const map = ['日', '一', '二', '三', '四', '五', '六'];
      return `(${map[d.getDay()]})`;
    }
  }
}
</script>

<style scoped>
.calendar2 {
  background: #fff;
  color: #000;
  /* border-radius: 16px; */
  padding: 16px;
  overflow: hidden;
}

.months-strip-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 0 0 12px 0;
  padding: 6px 8px;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.35;
  color: #222;
  text-align: center;
  letter-spacing: 0.02em;
}

.months-strip-hint__text {
  flex: 0 1 auto;
}

.months-strip-hint__btn {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 4px 10px;
  font: inherit;
  font-size: 20px;
  font-weight: 800;
  line-height: 1;
  color: #444;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  opacity: 0.9;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: background 0.15s ease, color 0.15s ease, opacity 0.15s ease;
}

.months-strip-hint__btn:hover {
  opacity: 1;
  color: #111;
  background: rgba(0, 0, 0, 0.06);
}

.months-strip-hint__btn:active {
  background: rgba(0, 0, 0, 0.1);
}

.months-strip-hint__btn:focus-visible {
  outline: 2px solid #0060b9;
  outline-offset: 2px;
}

.months-strip {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: flex-start;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-x;
  gap: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  outline: none;
}

.month-slide {
  flex: 0 0 100%;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  align-self: flex-start;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  box-sizing: border-box;
}

.month-title {
  font-weight: 700;
  font-size: 20px;
  margin: 0 0 12px 0;
}

.day-block + .day-block {
  margin-top: 20px;
}

/* 日期獨立一列，作為該日場次的小標題 */
.day-subtitle {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 8px 10px;
  margin: 0 0 8px 0;
  padding: 8px 0 10px;
  border-bottom: 2px solid #0060b9;
}

.day-subtitle__date {
  font-weight: 700;
  font-size: 14px;
  line-height: 1.3;
  color: #000;
}

.day-subtitle__weekday {
  font-size: 12px;
  font-weight: 600;
  color: #555;
}

.event-list { list-style: none; padding: 0; margin: 0; }

.event-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 4px 12px 2px;
  border-top: 1px dashed #0060b9;
}
.event-list .event-item:first-child {
  border-top: none;
}
.event-item.alt { background: #f5fbff; }

.event-content {
  display: flex;
  flex: 1;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  min-width: 0;
  flex-wrap: nowrap;
}
.titles {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow-x: visible;
}
.title-zh {
  font-size: 13px;
  font-weight: 600;
  line-height: 1.45;
  /* pre-wrap：資料裡的換行仍保留；單行太長則在欄寬內自動折行 */
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: anywhere;
}
.title-en {
  font-size: 12px;
  color: #333;
  line-height: 1.45;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: anywhere;
}

.meta {
  color: #111;
  font-size: 12px;
  white-space: nowrap;
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
  padding-top: 1px;
}

@media (max-width: 768px) {
  .day-subtitle {
    padding: 6px 0 8px;
    margin-bottom: 6px;
  }
  .day-subtitle__date { font-size: 13px; }
  .day-subtitle__weekday { font-size: 11px; }
  .day-block + .day-block { margin-top: 16px; }

  .event-item { flex-direction: column; align-items: stretch; gap: 8px; }
  .event-content {
    width: 100%;
    flex-direction: row;
    align-items: flex-start;
    gap: 8px;
  }
  .titles { font-size: inherit; }
  .title-zh { font-size: 12px; }
  .title-en { font-size: 11px; }
  .meta { font-size: 11px; }
}
</style>