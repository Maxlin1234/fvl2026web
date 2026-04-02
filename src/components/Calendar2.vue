<template>
  <section class="calendar2" :class="{ 'calendar2--en': isEnglish }">
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
                  <div v-if="!isEnglish" class="title-zh" v-html="evt.titleZh"></div>
                  <div v-else class="title-en" v-html="evt.titleEn"></div>
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
const APR_BLOCK_A_ZH = `浮點設計 | <i>《萬象之初》</i> | 3 mins
凱蒂．卡托納 ｜ <i>《藏識》</i> | 12 mins
初未來 X 超維度 X 江戶未來世 X Kivi X 賴皮 X 林強 | <i>《新摩登時代》</i> | 20 mins`;

/** 五月／六月等與四月主視覺一致之英文 A、B 塊（四月場次另外使用 APRIL_BLOCK_*） */
const APR_BLOCK_A_EN = `FPA | <i>Genesis</i> | 3 mins
Kati KATONA | <i>Substratum</i> | 12 mins
Hello World x Dimension Plus x Hello Edo! x Kivi x Mr. Skin x LIM
Giong | <i>NEW MODERN TIMES</i> | 20 mins`;

const APR_BLOCK_B_ZH = `浮點設計 | <i>《萬象之初》</i> | 3 mins
PHOSPHEN | <i>《時空》</i> | 39 mins`;

const APR_BLOCK_B_EN = `FPA | <i>Genesis</i> | 3 mins
PHOSPHEN | <i>Temporal</i> | 39 mins`;

/** 4/18–4/26 英文（僅四月 aprEvt 引用） */
const APRIL_BLOCK_A_EN = APR_BLOCK_A_EN;

const APRIL_BLOCK_B_EN = APR_BLOCK_B_EN;

const APR_BLOCK_C_ZH = `浮點設計 | <i>《萬象之初》</i> | 3 mins
AINO X Yunyoung JANG | <i>《深層根木》</i> | 12 mins
barbe_generative_diary | <i>短篇集錦 - 《描繪寂靜》</i> | 5 mins
李根耀 | <i>短篇集錦 - 《街道之書：同淋一場雨》</i> | 5 mins
兪志美 | <i>短篇集錦 - 《非體 1》</i> | 5 mins
謝鎮璘 | <i>短篇集錦 - 《光所到之處》</i> | 5 mins
琳恩．湯琳森 | <i>《山之夜曲》</i> | 3 mins`;

const APR_BLOCK_C_EN = `FPA | <i>Genesis</i> | 3 mins
AINO X Yunyoung JANG | <i>Deep-Rooted</i> | 12 mins
barbe_generative_diary | <i>Short Film Showcase – Drawing Silence</i> | 5 mins
Root LEE | <i>Short Film Showcase – Shared Immersion: A Street's Archive</i> | 5 mins
Jimmy YU | <i>Short Film Showcase – Biche 1</i> | 5 mins
Damonxart | <i>Short Film Showcase – Where Light Arrives</i> | 5 mins
Lynn TOMLINSON | <i>Mountain Nocturne</i> | 3 mins`;

const APR_BLOCK_D_ZH = `浮點設計 | <i>《萬象之初》</i> | 3 mins
桑德琳．德米耶 X 拉爾夫．基爾赫茲 | <i>《循鹿》</i> | 12 mins
吳秉聖 X 劉承杰 | <i>《時間層理》</i> | 22 mins`;

const APR_BLOCK_D_EN = `FPA | <i>Genesis</i> | 3 mins
Sandrine DEUMIER x Ralph KILLHERTZ | <i>Following the deer</i> | 12 mins
WU Ping-Sheng x Jie LIOU | <i>Temporal Strata</i> | 22 mins`;

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

/** 五月：表定《循鹿》文案與短片塊（深層根木／同林一場雨等依圖檔） */
const MAY_MONOCOLOR_ZH = `MONOCOLOR | <i>《意識之維》</i>(現場演出) | 35 mins`;
const MAY_MONOCOLOR_EN = `MONOCOLOR | <i>NOOSPHERE</i> (Live Performance) | 35 mins`;

const MAY_BLOCK_D_ZH = `浮點設計 | <i>《萬象之初》</i> | 3 mins
桑德琳．德米耶 X 拉爾夫．基爾赫茲 | <i>《循鹿》</i> | 12 mins
吳秉聖 X 劉承杰 | <i>《時間層理》</i> | 22 mins`;

const MAY_BLOCK_D_EN = `FPA | <i>Genesis</i> | 3 mins
Sandrine DEUMIER x Ralph KILLHERTZ | <i>Following the deer</i> | 12 mins
WU Ping-Sheng x Jie LIOU | <i>Temporal Strata</i> | 22 mins`;

const MAY_BLOCK_C_ZH = `浮點設計 | <i>《萬象之初》</i> | 3 mins
AINO X Yunyoung JANG | <i>《深層根木》</i> | 12 mins
barbe_generative_diary | <i>短篇集錦 - 《描繪寂靜》</i> | 5 mins
李根耀 | <i>短篇集錦 - 《街道之書：同淋一場雨》</i> | 5 mins
兪志美 | <i>短篇集錦 - 《非體 1》</i> | 5 mins
謝鎮璘 | <i>短篇集錦 - 《光所到之處》</i> | 5 mins
琳恩．湯琳森 | <i>《山之夜曲》</i> | 3 mins`;

const MAY_BLOCK_C_EN = `FPA | <i>Genesis</i> | 3 mins
AINO X Yunyoung JANG | <i>Deep-Rooted</i> | 12 mins
barbe_generative_diary | <i>Short Film Showcase – Drawing Silence</i> | 5 mins
Root LEE | <i>Short Film Showcase – Shared Immersion: A Street's Archive</i> | 5 mins
Jimmy YU | <i>Short Film Showcase – Biche 1</i> | 5 mins
Damonxart | <i>Short Film Showcase – Where Light Arrives</i> | 5 mins
Lynn TOMLINSON | <i>Mountain Nocturne</i> | 3 mins`;

const MAY_KOHUI_ZH = `Kohui | <i>《眾聲場：環形運動》</i>(現場演出) | 30 mins`;
const MAY_KOHUI_EN = `Kohui | <i>Panphony: Circular Movement</i> (Live Performance) | 30 mins`;

const MAY_PARTY_ZH = `<i>《未來視覺派對#3》</i>(現場售票演出) | 60 mins`;
const MAY_PARTY_EN = `<i>Future Vision Party #3</i> (Paid Live Performance) | 60 mins`;

const MAY_POND_ZH = `移動故事屋 | <i>《池塘國選舉》</i>(現場演出) | 45 mins`;
const MAY_POND_EN = `Telling Tent | <i>The Pond Nation Election</i> (Live Performance) | 45 mins`;

/** 5/17 場次：凱蒂．卡托納《藏識》 */
const MAY_517_A_ZH = `浮點設計 | <i>《萬象之初》</i> | 3 mins
凱蒂．卡托納 ｜ <i>《藏識》</i> | 12 mins
初未來 X 超維度 X 江戶未來世 X Kivi X 賴皮 X 林強 | <i>《新摩登時代》</i> | 20 mins`;

const MAY_517_A_EN = APR_BLOCK_A_EN;

const MAY_WEI_EXH_ZH = `魏廷宇 | <i>《誤差追獵》</i>(展覽)`;
const MAY_WEI_EXH_EN = `Tim WEI | <i>Stalking for Errors</i> (Exhibition)`;

const MAY_YAO_EXH_ZH = `姚瑞中 X 郭一 X Meuko! Meuko! | <i>《虛迷山》</i>(展覽)`;
const MAY_YAO_EXH_EN = `YAO Jui-Chung x YI KUO x Meuko Meuko | <i>Mount Ecstasy</i> (Exhibition)`;

const MAY_YAO_LIVE_ZH = `姚瑞中 X 郭一 X Meuko! Meuko! | <i>《虛迷山》</i>(現場售票演出) | 60 mins`;
const MAY_YAO_LIVE_EN = `YAO Jui-Chung x YI KUO x Meuko Meuko | <i>Mount Ecstasy</i> (Paid Live Performance) | 60 mins`;

/** 六月：沉浸式影音工作坊（6/6，英文依主視覺全稱） */
const JUN_WORKSHOP_TNUA_ZH = `<i>《沉浸式影音工作坊—校際成果呈現》</i>北藝大新媒系 | 55 mins`;
const JUN_WORKSHOP_TNUA_EN = `<i>Immersive Audiovisual Workshop - The Joint Presentation</i>
The Department of New Media Art of Taipei National University of the Arts
｜55 mins`;

const JUN_WORKSHOP_NTUST_ZH = `<i>《沉浸式影音工作坊—校際成果呈現》</i>北科大互動系 | 60 mins`;
const JUN_WORKSHOP_NTUST_EN = `<i>Immersive Audiovisual Workshop - The Joint Presentation</i>
The Department of Interaction Design of National Taipei University of Technology
｜60 mins`;

const JUN_WORKSHOP_NTHU_ZH = `<i>《沉浸式影音工作坊—校際成果呈現》</i>清大藝術學院科藝組 | 40 mins`;
const JUN_WORKSHOP_NTHU_EN = `<i>Immersive Audiovisual Workshop - The Joint Presentation</i>
NTHU College of Arts, Arts & Technology
｜40 mins`;

/** 6/7 14:00（DIMENSION Plus；Giong／節目／時長分行） */
const JUN_607_A_ZH = MAY_517_A_ZH;

const JUN_607_A_EN = `FPA | <i>Genesis</i> | 3 mins
Kati KATONA | <i>Substratum</i> | 12 mins
Hello World x Dimension Plus x Hello Edo! x Kivi x Mr. Skin x LIM
Giong | <i>NEW MODERN TIMES</i> | 20 mins`;

/** 6/7 15:00／18:00 — 與五月 C 塊主視覺一致 */
const JUN_607_LONG_ZH = MAY_BLOCK_C_ZH;

const JUN_607_LONG_EN = MAY_BLOCK_C_EN;

/** 6/7 17:00 — D 塊 */
const JUN_607_17_ZH = APR_BLOCK_D_ZH;

const JUN_607_17_EN = APR_BLOCK_D_EN;

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
        aprEvt(1, '2026-04-18', '14:00', APR_BLOCK_A_ZH, APRIL_BLOCK_A_EN, 1),
        aprEvt(2, '2026-04-18', '15:00', APR_BLOCK_B_ZH, APRIL_BLOCK_B_EN, 2),
        aprEvt(3, '2026-04-18', '16:00', APR_BLOCK_C_ZH, APR_BLOCK_C_EN, 3),
        aprEvt(4, '2026-04-18', '17:00', APR_BLOCK_D_ZH, APR_BLOCK_D_EN, 4),
        aprEvt(5, '2026-04-18', '18:00', APR_BLOCK_A_ZH, APRIL_BLOCK_A_EN, 5),
        aprEvt(6, '2026-04-18', '19:00', APR_BLOCK_B_ZH, APRIL_BLOCK_B_EN, 6),

        aprEvt(7, '2026-04-19', '14:00', APR_BLOCK_C_ZH, APR_BLOCK_C_EN, 1),
        aprEvt(8, '2026-04-19', '15:00', APR_BLOCK_D_ZH, APR_BLOCK_D_EN, 2),
        aprEvt(9, '2026-04-19', '16:00', APR_BLOCK_A_ZH, APRIL_BLOCK_A_EN, 3),
        aprEvt(10, '2026-04-19', '17:00', APR_BLOCK_B_ZH, APRIL_BLOCK_B_EN, 4),
        aprEvt(11, '2026-04-19', '18:00', APR_BLOCK_C_ZH, APR_BLOCK_C_EN, 5),

        aprEvt(12, '2026-04-25', '14:00', APR_BLOCK_D_ZH, APR_BLOCK_D_EN, 1),
        aprEvt(13, '2026-04-25', '15:00', APR_BLOCK_A_ZH, APRIL_BLOCK_A_EN, 2),
        aprEvt(14, '2026-04-25', '16:00', APR_BLOCK_B_ZH, APRIL_BLOCK_B_EN, 3),
        aprEvt(15, '2026-04-25', '17:00', APR_BLOCK_C_ZH, APR_BLOCK_C_EN, 4),
        aprEvt(16, '2026-04-25', '18:00', APR_BLOCK_D_ZH, APR_BLOCK_D_EN, 5),
        aprEvt(17, '2026-04-25', '19:00', APR_BLOCK_A_ZH, APRIL_BLOCK_A_EN, 6),

        aprEvt(18, '2026-04-26', '14:00', APR_BLOCK_D_ZH, APR_BLOCK_D_EN, 1),
        aprEvt(19, '2026-04-26', '15:00', APR_BLOCK_B_ZH, APRIL_BLOCK_B_EN, 2),
        aprEvt(20, '2026-04-26', '16:00', APR_BLOCK_A_ZH, APRIL_BLOCK_A_EN, 3),
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
        aprEvt(128, '2026-05-17', '17:00', MAY_BLOCK_C_ZH, MAY_BLOCK_C_EN, 6),
        aprEvt(129, '2026-05-17', '18:00', MAY_BLOCK_D_ZH, MAY_BLOCK_D_EN, 7),

        aprEvt(130, '2026-05-21', '17:00–19:00', MAY_WEI_EXH_ZH, MAY_WEI_EXH_EN, 1),
        aprEvt(131, '2026-05-22', '12:00–19:00', MAY_WEI_EXH_ZH, MAY_WEI_EXH_EN, 1),
        aprEvt(132, '2026-05-23', '12:00–19:00', MAY_WEI_EXH_ZH, MAY_WEI_EXH_EN, 1),
        aprEvt(133, '2026-05-24', '12:00–19:00', MAY_WEI_EXH_ZH, MAY_WEI_EXH_EN, 1),

        aprEvt(134, '2026-05-28', '12:00–18:00', MAY_YAO_EXH_ZH, MAY_YAO_EXH_EN, 1),
        aprEvt(135, '2026-05-29', '12:00–18:00', MAY_YAO_EXH_ZH, MAY_YAO_EXH_EN, 1),
        aprEvt(136, '2026-05-30', '12:00–18:00', MAY_YAO_EXH_ZH, MAY_YAO_EXH_EN, 1),
        aprEvt(137, '2026-05-30', '19:00', MAY_YAO_LIVE_ZH, MAY_YAO_LIVE_EN, 2),
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
  overflow-x: hidden;
  overflow-y: visible;
}



.months-strip-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 0 0 12px 0;
  padding: 6px 8px;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.35;
  color: #222;
  text-align: center;
  letter-spacing: 0.02em;
}

.months-strip-hint__text {
  flex: 0 1 auto;
  text-decoration: underline;
  text-underline-offset: 4px;
  font-weight: bold;
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
  font-weight: normal;
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
  /* pan-x 會讓行動裝置無法把垂直滑動交給外層抽屜；需同時允許 pan-y */
  touch-action: pan-x pan-y;
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
  font-weight: normal;
  font-size: 24px;
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
  gap: 8px 6px;
  margin: 0 0 8px 0;
  padding: 8px 0 10px;
  border-bottom: 2px solid #0060b9;
}

.day-subtitle__date {
  font-weight: 800;
  font-size: 18px;
  line-height: 1.3;
  color: #000;
}

.day-subtitle__weekday {
  font-size: 18px;
  font-weight: 800;
  color: #000;
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
  font-size: 16px;
  font-weight: normal;
  line-height: 1.8;
  /* pre-wrap：資料裡的換行仍保留；單行太長則在欄寬內自動折行 */
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: anywhere;
}
.title-en {
  font-size: 14px;
  font-weight: normal;
  color: #333;
  line-height: 1.8;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: anywhere;
}

.titles :deep(i) {
  font-style: italic;
  font-weight: bold;
}

.meta {
  color: #111;
  font-size: 15px;
  font-weight: 600;
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
  .day-subtitle__date { font-size: 16px; font-weight: 800; }
  .day-subtitle__weekday { font-size: 16px; font-weight: 800; }
  .day-block + .day-block { margin-top: 16px; }

  .event-item { flex-direction: column; align-items: stretch; gap: 8px; }
  .event-content {
    width: 100%;
    flex-direction: row;
    align-items: flex-start;
    gap: 8px;
  }
  .titles { font-size: inherit; }
  .title-zh { font-size: 15px; font-weight: normal; }
  .title-en { font-size: 13px; font-weight: normal; }
  .meta { font-size: 14px; font-weight: 600; }
}
</style>