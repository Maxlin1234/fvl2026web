<template>
  <section class="calendar2">
    <div class="month" v-for="(month, mIdx) in groupedByMonth" :key="mIdx">
      <h3 class="month-title">{{ month.label }}</h3>
      <ul class="event-list">
        <li
          v-for="(evt, idx) in month.events"
          :key="evt.id"
          class="event-item"
          :class="{
            alt: idx % 2 === 1,
            'has-date': isFirstOfDay(month.events, idx),
            'same-day': !isFirstOfDay(month.events, idx)
          }"
        >
          <div class="event-date">
            <div class="date" v-if="isFirstOfDay(month.events, idx)">{{ formatDate(evt.date) }}</div>
            <div class="weekday" v-if="isFirstOfDay(month.events, idx)">{{ weekday(evt.date) }}</div>
          </div>
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
  </section>
</template>

<script>
export default {
  name: 'Cal-endar2',
  props: {
    isEnglish: { type: Boolean, default: false }
  },
  data() {
    return {
      // September and October schedule (bilingual)
      // Note: You can adjust/add entries as needed.
      events: [
        // Week 1
        { id: 1, date: '2025-11-29', time: '14:00', timeEn: '14:00', titleZh: '《昌勳與他的打字機》Dome穴遇言\n《類數交界》', titleEn: '"How can WE Perceive BODY with a Braille Typewriter?"  - Allegory of the cave\nMetaract', location: 'DOME', locationEn: 'DOME', sortOrder: 1 },
        { id: 2, date: '2025-11-29', time: '15:00', timeEn: '15:00', titleZh: '《巴別》\n《奶油金剛》\n《水身萬象》', titleEn: 'Babel_Offline\nHollow Giant\nWater Always Goes Where It Wants to Go', location: 'DOME', locationEn: 'DOME', sortOrder: 2 },
        { id: 3, date: '2025-11-29', time: '16:00', timeEn: '16:00', titleZh: '《赫圖比斯：混沌的協奏》\n《殘構重生》', titleEn: 'Hurtubise: Orchestrating Chaos\nin s.asmbli', location: 'DOME', locationEn: 'DOME', sortOrder: 3 },
        { id: 4, date: '2025-11-29', time: '17:00', timeEn: '17:00', titleZh: '《昌勳與他的打字機》Dome穴遇言\n《殘構重生》', titleEn: '"How can WE Perceive BODY with a Braille Typewriter?"  - Allegory of the cave\nin s.asmbli', location: 'DOME', locationEn: 'DOME', sortOrder: 4 },
        { id: 5, date: '2025-11-29', time: '18:00', timeEn: '18:00', titleZh: '《赤聲之曙》\n《類數交界》', titleEn: 'Red Sunrise\nMetaract', location: 'DOME', locationEn: 'DOME', sortOrder: 5 },
        { id: 6, date: '2025-11-29', time: '19:00', timeEn: '19:00', titleZh: '《巴別》\n《赫圖比斯：混沌的協奏》', titleEn: 'Babel_Offline\nHurtubise: Orchestrating Chaos', location: 'DOME', locationEn: 'DOME', sortOrder: 6 },

        { id: 7, date: '2025-11-30', time: '14:00', timeEn: '14:00', titleZh: '《巴別》\n《奶油金剛》\n《類數交界》', titleEn: 'Babel_Offline\nHollow Giant\nMetaract', location: 'DOME', locationEn: 'DOME', sortOrder: 1 },
        { id: 8, date: '2025-11-30', time: '15:00', timeEn: '15:00', titleZh: '《赤聲之曙》\n《水身萬象》', titleEn: 'Red Sunrise\nWater Always Goes Where It Wants to Go', location: 'DOME', locationEn: 'DOME', sortOrder: 2 },
        { id: 9, date: '2025-11-30', time: '16:00', timeEn: '16:00', titleZh: '《赫圖比斯：混沌的協奏》\n《殘構重生》', titleEn: 'Hurtubise: Orchestrating Chaos\nin s.asmbli', location: 'DOME', locationEn: 'DOME', sortOrder: 3 },
        { id: 10, date: '2025-11-30', time: '17:00', timeEn: '17:00', titleZh: '《赤聲之曙》\n《類數交界》', titleEn: 'Red Sunrise\nMetaract', location: 'DOME', locationEn: 'DOME', sortOrder: 4 },
        { id: 11, date: '2025-11-30', time: '18:00', timeEn: '18:00', titleZh: '《昌勳與他的打字機》Dome穴遇言\n《奶油金剛》', titleEn: '"How can WE Perceive BODY with a Braille Typewriter?"  - Allegory of the cave\nHollow Giant', location: 'DOME', locationEn: 'DOME', sortOrder: 5 },

        // Week 2
        { id: 12, date: '2025-12-05', time: '19:30', timeEn: '19:30', titleZh: '《thewhole》', titleEn: 'thewhole', location: 'DOME', locationEn: 'DOME', sortOrder: 1 },
        { id: 13, date: '2025-12-06', time: '14:30', timeEn: '14:30', titleZh: '《thewhole》', titleEn: 'thewhole', location: 'DOME', locationEn: 'DOME', sortOrder: 1 },
        { id: 14, date: '2025-12-06', time: '19:30', timeEn: '19:30', titleZh: '《thewhole》', titleEn: 'thewhole', location: 'DOME', locationEn: 'DOME', sortOrder: 2 },
        { id: 15, date: '2025-12-07', time: '14:30', timeEn: '14:30', titleZh: '《thewhole》', titleEn: 'thewhole', location: 'DOME', locationEn: 'DOME', sortOrder: 1 },

        // Week 3
        { id: 16, date: '2025-12-13', time: '14:00', timeEn: '14:00', titleZh: '《沉浸式影音工作坊－實踐大學媒傳系成果呈現》', titleEn: 'Immersive Audiovisual Workshop - Presentation', sortOrder: 1 },
        { id: 17, date: '2025-12-13', time: '15:00', timeEn: '15:00', titleZh: '《赫圖比斯：混沌的協奏》\n《殘構重生》', titleEn: 'Hurtubise: Orchestrating Chaos\nin s.asmbli', location: 'DOME', locationEn: 'DOME', sortOrder: 2 },
        { id: 18, date: '2025-12-13', time: '16:00', timeEn: '16:00', titleZh: '《巴別》\n《奶油金剛》\n《水身萬象》', titleEn: 'Babel_Offline\nHollow Giant\nWater Always Goes Where It Wants to Go', location: 'DOME', locationEn: 'DOME', sortOrder: 3 },
        { id: 19, date: '2025-12-13', time: '17:00', timeEn: '17:00', titleZh: '《沉浸式影音工作坊－實踐大學媒傳系成果呈現》', titleEn: 'Immersive Audiovisual Workshop - Presentation', sortOrder: 4 },
        { id: 20, date: '2025-12-13', time: '18:00', timeEn: '18:00', titleZh: '《昌勳與他的打字機》Dome穴遇言\n《類數交界》', titleEn: '"How can WE Perceive BODY with a Braille Typewriter?"  - Allegory of the cave\nMetaract', sortOrder: 5 },
        { id: 21, date: '2025-12-13', time: '19:00', timeEn: '19:00', titleZh: '《赫圖比斯：混沌的協奏》\n《殘構重生》', titleEn: 'Hurtubise: Orchestrating Chaos\nin s.asmbli', sortOrder: 6 },

        { id: 22, date: '2025-12-14', time: '14:00', timeEn: '14:00', titleZh: '《赤聲之曙》\n《水身萬象》', titleEn: 'Red Sunrise\nWater Always Goes Where It Wants to Go', sortOrder: 1 },
        { id: 23, date: '2025-12-14', time: '15:00', timeEn: '15:00', titleZh: '《昌勳與他的打字機》Dome穴遇言\n《類數交界》', titleEn: '"How can WE Perceive BODY with a Braille Typewriter?"  - Allegory of the cave\nMetaract', sortOrder: 2 },
        { id: 24, date: '2025-12-14', time: '16:00', timeEn: '16:00', titleZh: '《赫圖比斯：混沌的協奏》\n《殘構重生》', titleEn: 'Hurtubise: Orchestrating Chaos\nin s.asmbli', sortOrder: 3 },
        { id: 25, date: '2025-12-14', time: '17:00', timeEn: '17:00', titleZh: '《沉浸式影音工作坊－實踐大學媒傳系成果呈現》', titleEn: 'Immersive Audiovisual Workshop - Presentation', sortOrder: 4 },
        { id: 26, date: '2025-12-14', time: '18:00', timeEn: '18:00', titleZh: '《巴別》\n《赤聲之曙》', titleEn: 'Babel_Offline\nRed Sunrise', sortOrder: 5 },

        // Week 4
        { id: 27, date: '2025-12-19', time: '16:00-19:00 （展覽）', timeEn: '16:00-19:00 (Exhibition)', titleZh: 'C-LAB 未來視覺實驗室 自製作品－《Echo of Presence》', titleEn: 'C-LAB Future Vision Lab in-house production "Echo of Presence"', sortOrder: 1 },
        { id: 28, date: '2025-12-20', time: '12:00-19:00（展覽）', timeEn: '12:00-19:00 (Exhibition)', titleZh: 'C-LAB 未來視覺實驗室 自製作品－《Echo of Presence》', titleEn: 'C-LAB Future Vision Lab in-house production "Echo of Presence"', sortOrder: 1 },

        { id: 29, date: '2025-12-21', time: '14:00', timeEn: '14:00', titleZh: '《巴別》\n《奶油金剛》\n《水身萬象》', titleEn: 'Babel_Offline\nHollow Giant\nWater Always Goes Where It Wants to Go', sortOrder: 1 },
        { id: 30, date: '2025-12-21', time: '15:00', timeEn: '15:00', titleZh: '《赤聲之曙》\n《類數交界》', titleEn: 'Red Sunrise\nMetaract', sortOrder: 2 },
        { id: 31, date: '2025-12-21', time: '16:00', timeEn: '16:00', titleZh: '《赫圖比斯：混沌的協奏》\n《殘構重生》', titleEn: 'Hurtubise: Orchestrating Chaos\nin s.asmbli', sortOrder: 3 },
        { id: 32, date: '2025-12-21', time: '17:00', timeEn: '17:00', titleZh: '《昌勳與他的打字機》Dome穴遇言\n《奶油金剛》', titleEn: '"How can WE Perceive BODY with a Braille Typewriter?"  - Allegory of the cave\nHollow Giant', sortOrder: 4 },
        { id: 33, date: '2025-12-21', time: '18:00', timeEn: '18:00', titleZh: '《赫圖比斯：混沌的協奏》\n《殘構重生》', titleEn: 'Hurtubise: Orchestrating Chaos\nin s.asmbli', sortOrder: 5 },
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
      const ordered = Object.keys(byMonth)
        .sort()
        .map(ym => ({
          label: this.formatMonthLabel(ym),
          events: byMonth[ym].sort((a, b) => {
            const dateDiff = a.date.localeCompare(b.date);
            if (dateDiff !== 0) return dateDiff;
            const orderA = a.sortOrder ?? Number.MAX_SAFE_INTEGER;
            const orderB = b.sortOrder ?? Number.MAX_SAFE_INTEGER;
            if (orderA !== orderB) return orderA - orderB;
            return a.time.localeCompare(b.time);
          })
        }));
      return ordered;
    }
  },
  methods: {
    isFirstOfDay(events, index) {
      if (index === 0) return true;
      const current = events[index];
      const previous = events[index - 1];
      return current.date !== previous.date;
    },
    formatMonthLabel(ym) {
      const [y, m] = ym.split('-').map(n => parseInt(n, 10));
      const monthZh = `${y}年${m}月`;
      const monthEn = new Date(`${ym}-01`).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
      return this.isEnglish ? monthEn : monthZh;
    },
    formatDate(iso) {
      const d = new Date(iso);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      if (this.isEnglish) return `${y}/${m}/${day}`;
      return `${y}.${m}.${day}`;
    },
    weekday(iso) {
      const d = new Date(iso);
      if (this.isEnglish) {
        return d.toLocaleDateString('en-US', { weekday: 'short' });
        
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
}

.month + .month { margin-top: 24px; }

.month-title {
  font-weight: 700;
  font-size: 20px;
  margin: 0 0 12px 0;
}

.event-list { list-style: none; padding: 0; margin: 0; }

.event-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 12px;
  border-top: 1px dashed #0060b9;
}
.event-item.alt { background: #f5fbff; }
.event-item + .event-item.same-day {
  border-top: none;
}

.event-date { min-width: 140px; display: flex; flex-direction: column; gap: 2px; }
.event-date .date { font-weight: 700; }
.event-date .weekday { color: #666; font-size: 12px; }

.event-content { display: flex; flex: 1; align-items: center; justify-content: space-between; gap: 12px; }
.titles { display: flex; flex-direction: column; gap: 2px; }
.title-zh {
  font-size: 16px;
  font-weight: 700;
  white-space: pre-line;
}
.title-en {
  font-size: 14px;
  color: #333;
  white-space: pre-line;
}

.meta { color: #111; font-size: 14px; white-space: nowrap; display: flex; align-items: center; }

@media (max-width: 768px) {
  .event-item { flex-direction: column; align-items: flex-start; }
  .event-content { width: 100%; flex-direction: column; align-items: flex-start; gap: 6px; }
  .meta { font-size: 13px; }
}
</style>