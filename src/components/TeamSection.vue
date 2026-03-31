<template>
  <section id="team" class="team" :class="{ en: isEnglish }" style="padding: 0;margin: 0;overflow: hidden;position: relative;">
    <div class="container">
      <div class="team-content">
        <h2 class="section-title">{{ isEnglish ? 'Production Team' : '製作團隊' }}</h2>

        <div class="team-columns">
          <!-- 左欄 -->
          <div class="team-column left-column">
            <div v-for="(row, idx) in leftColumn" :key="idx" class="row">
              <template v-if="row.roleZh || row.roleEn">
                <div class="role">{{ isEnglish ? row.roleEn : row.roleZh }}</div>
                <div class="sep">|</div>
              </template>
              <div class="value" :class="{ 'value-only': !row.roleZh && !row.roleEn }" v-html="teamValueHtml(row)"></div>
            </div>
          </div>
          <!-- 右欄 -->
          <div class="team-column right-column">
            <div v-for="(row, idx) in rightColumn" :key="idx" class="row">
              <div class="role">{{ isEnglish ? row.roleEn : row.roleZh }}</div>
              <div class="sep">|</div>
              <div class="value" v-html="teamValueHtml(row)"></div>
            </div>
          </div>
        </div>

        <div id="artists" class="artists-block">
          <div class="team-columns artists-columns">
            <div class="team-column artists-column">
              <div class="row">
                <div class="role">{{ isEnglish ? 'Artist' : '參與藝術家' }}</div>
                <div class="sep">|</div>
                <div class="value artists-value" v-html="participatingArtistsDisplay"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
            <!-- 合作單位和贊助單位區塊 -->
            <div class="partners-section">
          <!-- 主辦單位 -->
          <div class="partner-group">
            <h3 class="partner-title">{{ isEnglish ? 'Organizer ' : '主辦單位' }}</h3>
            <div class="partner-logos">
              <div class="partner-item clab">
                <img src="../assets/logos/clab.png" alt="臺灣當代文化實驗场 Taiwan Contemporary Culture Lab" class="partner-logo" />
                <!-- <div class="partner-text">
                  <div class="partner-name-zh">臺灣當代文化實驗场</div>
                  <div class="partner-name-en">Taiwan Contemporary Culture Lab</div>
                </div> -->
              </div>
            </div>
            
          </div>
           <!-- 指導單位 -->
           <div class="partner-group">
            <h3 class="partner-title">{{ isEnglish ? 'Supported by' : '補助單位' }}</h3>
            <div class="partner-logos">
              <div class="partner-item">
                <img src="../assets/logos/Mou.jpg" alt="文化部 Ministry of Culture" class="partner-logo" />
                <!-- <div class="partner-text">
                  <div class="partner-name-zh">文化部</div>
                  <div class="partner-name-en">MINISTRY OF CULTURE</div>
                </div> -->
              </div>
            </div>
          </div>

          <!-- 執行單位 -->
          <div class="partner-group">
            <h3 class="partner-title">{{ isEnglish ? 'Executive Organizer' : '執行單位' }}</h3>
            <div class="partner-logos">
              <div class="partner-item">
                <img src="../assets/logos/fvl-logo2.png" alt="臺灣當代文化實驗场 Taiwan Contemporary Culture Lab" class="partner-logo " />
                <!-- <div class="partner-logo-text"></div> -->
                <!-- <div class="partner-text">
                  <div class="partner-name-en">TECHNOLOGY MEDIA PLATFORM</div>
                </div> -->
              </div>
            </div>
          </div>

          <!-- 合作單位 -->
          <div class="partner-group">
            <h3 class="partner-title">{{ isEnglish ? 'Collaborator' : '合作單位' }}</h3>
            <div class="partner-logos">
          
              <div class="partner-item anorchy">
                <img src="../assets/logos/NMAT.png" alt="北藝新媒" class="partner-logo" />
              </div>

              <div class="partner-item shihchien nthu partner-item-nthu-gap">
                <div class="nthu-lockup" aria-label="國立清華大學 藝術學院">
                  <img src="../assets/logos/NTHU.png" alt="國立清華大學" class="partner-logo nthulogo-main" />
                </div>
              </div>

              <div class="partner-item">
                <img src="../assets/logos/IXD.png" alt="台北科技大學互動設計系" class="partner-logo" />
              </div>
            
            
            </div>
          </div>
        </div>
  </section>
</template>

<script>
export default {
  name: 'TeamSection',
  props: {
    isEnglish: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    participatingArtistsDisplay() {
      const zh =
        '江戶未來世、初未來、吳秉聖、李根耀、拉爾夫．基爾赫茲、林強、姚瑞中、兪志美、浮點設計、桑德琳．德米耶、郭一、移動故事屋、凱蒂．卡托納、超維度、琳恩．湯琳森、劉承杰、劉東昱、賴皮、蔡奇宏、謝鎮璘、魏廷宇、AINO X Yunyoung JANG, barbe_generative_diary, Kohui, Kivi, MONOCOLOR, Meuko! Meuko!, PHOSPHEN';
      const en =
        'AINO X Yunyoung JANG, barbe_generative_diary, Damonxart, Sandrine DEUMIER, Dimension Plus, Floating Point Art, Hello Edo!, Hello World, Ralph KILLHERTZ, Root LEE, LIU Tung-Yu, Jie LIOU, Kati KATONA, Kivi, Kohui, Yi KUO, LIM Giong, Meuko Meuko, MONOCOLOR, Mr. Skin, PHOSPHEN, Telling Tent, Lynn TOMLINSON, Warrick TSAI, Tim WEI, WU Ping-Sheng, YAO Jui-Chung, Jimmy YU';
      if (!this.isEnglish) return zh;
      return this.formatTeamValueEn(en);
    },
    // 左欄：9 列（計畫主持人到音響系統統籌；建築概念含 JHStudio 換行）
    leftColumn() {
      return [
        { roleZh: '計畫主持人', roleEn: 'Project Principal', valueZh: '蔡奇宏', valueEn: 'Warrick TSAI' },
        { roleZh: '節目統籌', roleEn: 'Project Manager', valueZh: '廖苑喻、陳湘綺', valueEn: 'Emma LIAO, CHEN Hsiang-Chi' },
        { roleZh: '技術統籌', roleEn: 'Technical Director', valueZh: '蔡奇宏', valueEn: 'Warrick TSAI' },
        { roleZh: '技術執行', roleEn: 'Technical Coordinator', valueZh: '劉嘉昀、邱文雍、楊泓軒', valueEn: 'LIU Chia-Yun, CHIU Wen-Yung, Snow YANG' },
        {
          roleZh: '前期建築概念設計',
          roleEn: 'Preliminary Conceptual Design',
          valueZh: '陽明交通大學建築研究所<br>JHStudio',
          valueEn: 'JHStudio, Department of Architecture, National Yang Ming Chiao Tung University'
        },
        { roleZh: '建築工程', roleEn: 'Architectural Fabrication', valueZh: 'achy_made', valueEn: 'achy_made' },
        { roleZh: '聲場設計', roleEn: 'Sound Field Design', valueZh: 'C-LAB 臺灣聲響實驗室', valueEn: 'C-LAB Taiwan Sound Lab' },
        { roleZh: '音響系統統籌', roleEn: 'Sound System Coordination', valueZh: '黑米創意工作室', valueEn: 'BlackRice Studio' }
      ];
    },
    // 右欄：5 個項目（主視覺/開場影像到前導影片剪輯）
    rightColumn() {
      return [
        { roleZh: '主視覺設計暨開場影像', roleEn: 'Key Vision Design & Opening Video', valueZh: '浮點設計', valueEn: 'FPA (Floating Point Art)' },
        { roleZh: '網站設計', roleEn: 'Website Design', valueZh: '林瀚寬', valueEn: 'LIN Han-Kuan' },
        { roleZh: '靜態攝影', roleEn: 'Photo Ducumentation', valueZh: 'ANPIS FOTO 王世邦、林軒朗', valueEn: 'LIN Hsuan-Lang, ANPIS FOTO' },
        { roleZh: '動態攝影', roleEn: 'Video Ducumentation', valueZh: '散步映畫有限公司', valueEn: 'Cinemaruku Co., Ltd.' },
        { roleZh: '前導影片剪輯', roleEn: 'Trailer Editing', valueZh: '浮石影像工作室', valueEn: 'FUSHIDA FILM STUDIO' }
      ];
    }
  },
  methods: {
    teamValueHtml(row) {
      if (!this.isEnglish) return row.valueZh || '';
      return this.formatTeamValueEn(row.valueEn || '');
    },
    /** 英文：依逗號分段，每段 nowrap，避免連字號姓名與機構名被拆斷（v-html 需跳脫） */
    formatTeamValueEn(raw) {
      if (!raw) return '';
      const chunks = String(raw).split(/<br\s*\/?>/i);
      return chunks
        .map((c) => this.formatEnCommaLine(c.trim()))
        .filter(Boolean)
        .join('<br>');
    },
    formatEnCommaLine(line) {
      if (!line) return '';
      const placeholders = [];
      const t = line.replace(/\bCo\.,\s*Ltd\./gi, (m) => {
        const i = placeholders.length;
        placeholders.push(m);
        return `§PH${i}§`;
      });
      const parts = t.split(/,\s+/).map((p) => p.trim()).filter(Boolean);
      return parts
        .map((p) => {
          const phMatch = /^§PH(\d+)§$/.exec(p);
          if (phMatch) {
            const text = placeholders[Number(phMatch[1])];
            return `<span class="team-name-segment">${this.escapeHtmlForTeam(text)}</span>`;
          }
          return `<span class="team-name-segment">${this.escapeHtmlForTeam(p)}</span>`;
        })
        .join('<span class="team-name-comma">, </span>');
    },
    escapeHtmlForTeam(text) {
      return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    },
  },
}
</script>

<style lang="scss" scoped>
.team {
  background: #ffffff !important;
  padding: 60px 0;
  overflow: hidden;
  color: #333333;
}

.container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 72px 24px 80px;
  box-sizing: border-box;
  background: #ffffff;
}

.team-content {
  margin: 0 auto;
  background: #ffffff;
}

.section-title {
  margin: 0 auto 40px;
  text-align: left;
  background: #ffffff;
  color: #333333;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.35;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: anywhere;
  max-width: 1000px; /* 與 .team-columns 對齊：標題左緣對齊「計畫主持人」 */
}

.team-columns {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  column-gap: min(12vw, 140px);
  row-gap: 0;
  justify-content: stretch;
  align-items: start;
  margin: 0 auto 72px;
  max-width: 1000px;
}

.team-column {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.row {
  display: grid;
  grid-template-columns: var(--team-role-w) auto minmax(0, 1fr);
  align-items: start;
  column-gap: 0.35em;
  line-height: 1.85;
  color: #333;
  padding: 0.55em 0;
}

.left-column {
  --team-role-w: 12.5em;
}

.right-column {
  /* 需容納「主視覺設計暨開場影像」等長職稱，避免與 |、內文重疊 */
  --team-role-w: 14em;
  /* 右欄與參考圖一致：整欄下移，約對齊左欄第 4～5 列 */
//  padding-top: 7.25em;
}

.artists-block {
  margin-top: 56px;
  padding-top: 48px;
  border-top: 1px solid #eee;
}

.artists-columns {
  grid-template-columns: 1fr;
  max-width: 1000px;
  margin: 0 auto;
}

.artists-column {
  --team-role-w: 6.75em;
}

.artists-value {
  white-space: normal;
}

.team.en .artists-value {
  word-break: normal;
  overflow-wrap: normal;
  hyphens: none;
}

.team.en .artists-column {
  /* 英文標題為「Artist」 */
  --team-role-w: 5em;
}

.role {
  color: #333;
  font-size: 14px;
  font-weight: 700;
  white-space: normal;
  word-break: keep-all;
  line-height: 1.85;
  padding-right: 0.35em;
}

.sep {
  color: #333;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.85;
  padding: 0 0.65em 0 0;
  flex-shrink: 0;
}

.value {
  color: #333;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.85;
  word-break: break-word;
  overflow-wrap: anywhere;
}

/* v-html 插入的 span，需 :deep 才套用 scoped 樣式 */
.team .value :deep(.team-name-segment) {
  white-space: nowrap;
}

.value-only {
  grid-column: 1 / -1;
  padding-left: calc(var(--team-role-w) + 1.15em);
}

@media (max-width: 900px) {
  .container {
    padding: 56px 20px 64px;
  }
  .team-columns {
    grid-template-columns: 1fr;
    row-gap: 0;
    column-gap: 0;
    max-width: none;
  }
  .right-column {
    padding-top: 0;
  }
  .left-column {
    --team-role-w: 10.5em;
  }
  .right-column {
    --team-role-w: 11.5em;
  }
  .section-title {
    font-size: 20px;
    margin-bottom: 28px;
  }

  .artists-column {
    --team-role-w: 6.25em;
  }
}

.team.en .left-column {
  --team-role-w: 14.5em;
}

.team.en .right-column {
  /* Photo Documentation / Key visual 等英文職稱 */
  --team-role-w: 13.5em;
}

/* 合作單位和贊助單位樣式 */
.partners-section {
  // gap:20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: nowrap;
  margin-top: 40px;
  padding-top: 40px;
  border-top: 2px solid #eee;
}

.partner-group {
  margin-bottom: 40px;
  margin: 1em;
}

.partner-title {
  font-size: 15px;
  font-weight: 700;
  color: #333;
  margin: 0 0 20px 0;
  text-align: left;
}

.partner-logos {
  display: flex;
  flex-wrap: nowrap;
  // gap: 24px;
  align-items: center;
}


/* 合作單位的 logo 間距更小 */
.partner-group:last-child .partner-logos {
  gap: 12px;
}

.partner-item {
  display: flex;
  justify-content:flex-start;
  align-items: center;

  border-radius: 8px;
  // min-width: 180px;
  height: 100px;
  transition: all 0.3s ease;
}



// .partner-item:hover {
//   background: #f0f0f0;
//   transform: translateY(-2px);
//   box-shadow: 0 4px 12px rgba(0,0,0,0.1);
// }

.partner-logo {
  height: 70px; /* 等高基準 */
  width: auto;
  max-width: 240px;
  object-fit: contain;
  object-position: center;
  flex-shrink: 0;
  display: block;
}

.partner-item.clab .partner-logo {
  max-width: 260px;
}

.partner-item.anorchy .partner-logo {
  max-width: 200px;
}

/* NTHU：兩張圖橫排，兩段文字視覺高度一致 */
.partner-item.nthu .nthu-lockup {
  height: 70px; /* 與其他 logo 等高基準一致 */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 14px;
}

/* 兩張圖本身高度一致（橫排） */
.partner-item.nthu .nthulogo-main,
.partner-item.nthu .nthulogo-sub {
  height: 70px;
  width: auto;
  max-width: 340px;
  transform: none;
}

/* `NTHU.png` 本身留白偏多：在不改等高的前提下微放大字 */
.partner-item.nthu .nthulogo-main {
  transform: scale(1.22);
  transform-origin: left center;
}

/* 桌面：清華 logo 區與右側區塊留白 */
.partner-item-nthu-gap {
  margin-right: 1.5em;
}


.partner-logo-text {
  width: 160px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 800;
  color: #333;
  text-align: center;
  flex-shrink: 0;
}

.partner-text {
  flex: 1;
  min-width: 0;
}

.partner-name-zh {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
  line-height: 1.9;
}

.partner-name-en {
  font-size: 15px;
  color: #666;
  line-height: 1.9;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.team.en .row {
  align-items: start;
}

.team.en .role {
  font-size: 14px;
  word-break: break-word;
}

.team.en .sep {
  padding: 0 0.5em 0 0;
}

.team.en .value {
  font-size: 14px;
  word-break: normal;
  overflow-wrap: normal;
  white-space: normal;
  hyphens: none;
}

@media (max-width: 768px) {
  .partners-section{flex-wrap: wrap;gap: 1em;justify-content:flex-start}
  .container { padding: 16px 12px 48px; }
  .team-columns {
    margin-bottom: 40px;
  }
  .row {
    line-height: 1.75;
    padding: 0.45em 0;
  }
  .role {
    font-size: 13px;
  }
  .sep {
    font-size: 13px;
  }
  .value {
    font-size: 13px;
  }
  .left-column {
    --team-role-w: 9.25em;
  }
  .right-column {
    --team-role-w: 10.75em;
  }
  .team.en .left-column {
    --team-role-w: 11em;
  }
  .team.en .right-column {
    --team-role-w: 10.25em;
  }
  .team.en .artists-column {
    --team-role-w: 4.5em;
  }
  .team.en .role,
  .team.en .value {
    font-size: 13px;
  }
  
  
  .partners-section {
    margin-top: 30px;
    padding-top: 30px;
  }
  
  .partner-logos {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
  }

  /* 合作單位（最後一組）：logo 一律靠左與標題對齊 */
  .partner-group:last-child .partner-logos {
    align-items: flex-start;
  }
  
  .partner-item {
    min-width: 0;
    width: 100%;
    max-width: 100%;
    height: auto;
    min-height: 80px;
    flex-direction: column;
    text-align: left;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 8px;
  }

  .partner-item-nthu-gap {
    margin-right: 0;
  }

  .partner-item.nthu .nthu-lockup {
    width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
    align-self: flex-start;
  }

  .partner-logo {
    height: 60px;
    width: auto;
  }

  /* 僅合作單位：圖檔靠左對齊標題 */
  .partner-group:last-child .partner-logo {
    max-width: min(100%, 280px);
    object-position: left center;
  }

  .partner-title {
    text-align: left;
  }
  
  .partner-logo-text {
    width: 140px;
    height: 52px;
    font-size: 24px;
  }
}

@media (min-width: 2560px) {
  .container {
    max-width: 2000px;
  }
  .section-title {
    font-size: 3em;
  }
  .team.en .value {
    font-size: 2em;
  }
  
  .partner-title {
    font-size: 2.5em;
  }
  
  .partner-item {
    min-width: 300px;
    padding: 25px;
  }
  
  .partner-logo {
    height: 60px;
  }
  
  .partner-logo-text {
    font-size: 36px;
  }
  
  .partner-name-zh {
    font-size: 20px;
  }
  
  .partner-name-en {
    font-size: 16px;
  }
}
</style>
