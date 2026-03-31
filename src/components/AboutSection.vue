<template>
  <section id="about" class="about">
    <div class="container" style="background-color: #fff;padding: 30px 30px 10px;">
      <div class="about-content">
        <div class="about-text" :class="{ en: isEnglish }">
          <template v-if="isEnglish">
            <p>
              Since its launch in 2020, C-LAB Future Vision Lab has continuously developed FUTURE VISION LAB, an experimental exhibition and performance project dedicated to constructing a dome-based digital architectural environment, with the aim of exploring the visual limits of technological media. Over the past six years, the project has presented more than 200 works. In 2023, with the support of the Ministry of Culture, it is able to expand and upgrade to “FVL DOME”. In terms of size, it is built as the only large-scale movable DOME with a diameter of 15 meters. The audio-visual hardware and software have undergone several iterations, overcoming the image warping, calibration, mapping, play control, and video pre-production. The immersive projection system achieves a total resolution of up to 8K × 8K. Internally, a double-layer structure conceals the equipment, and a custom-designed acoustically transparent projection membrane has been developed. A refined sound field has been established, featuring a 25.4-channel immersive surround sound system. Moving forward, Future Vision Lab will continue to advance dome-based immersive environments in alignment with international standards, showcasing Taiwan’s creative energy and offering audiences a superior immersive sensory experience.
            </p>
            <p>
              FUTURE VISION LAB 2026 will take place from April 18 to June 7, 2026, over eight consecutive weekends. Bringing together works from <strong>Taiwan, France, Spain, Hungary, Austria, South Korea, Japan, and Canada</strong>, the event features a total of 19 works across 16 programs. Through various formats—including exhibitions, screenings, and live performances—the project creates a platform for domestic and international artistic exchange, inviting audiences to step into the FVL DOME and immerse themselves in a sensory experience shaped by the convergence of diverse cultures.
            </p>
          </template>
          <template v-else>
            <p>
              自 2020 年起，C-LAB 未來視覺實驗室持續推動實驗展演計畫「FUTURE VISION LAB」，並以數位實驗建築為起點，打造穹形場域（DOME），持續探索科技媒體的視覺極限，過去六年已進行超過兩百件作品展演。2023 年，在文化部支持下完成軟硬體升級，打造直徑 15 公尺、全臺唯一的巨型移動式戶外沉浸體驗空間「C-LAB 穹頂劇場」。沉浸影像投影系統總運算可達 8K × 8K 超高解析度，並克服球形曲面投影在校正、融接、對位、播放控制與影像前製等多重技術挑戰。場域採雙層結構設計，搭配客製透聲投影膜片與 25.4 聲道環繞聲場環境，打造高規格沉浸式體驗。未來視覺實驗室持續優化穹形場域之創作環境，並向國際標準接軌，展現臺灣在科技藝術領域的創作能量。
            </p>
            <p>
              「FUTURE VISION LAB 2026」將自 2026 年 4 月 18 日至 6 月 7 日，連續 8 個週末登場，匯集來自臺灣、法國、西班牙、匈牙利、奧地利、韓國、日本與加拿大等各地精彩作品，共呈現 19 件作品、16 檔節目。透過展覽、播映與現場 Live 演出等多元形式，在跨國創作的交會之中，邀請觀眾走入 C-LAB 穹頂劇場，沉浸於多元文化交織的感官體驗。
            </p>
          </template>
        </div>
    
        <div class="about-stats" >
          <!-- <img :src="'https://unzip-clab-api.clab.org.tw/'+ firstImage" style="width: 100%;"> -->
           <img src="../assets/d.jpg" style="width: 100%;">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AboutSection',
  data(){
    return{
      
    }
  },
  props: {
    firstImage: {
      type: String,
      default: ''
    },
    isEnglish: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  background: #fff;
  color: #111;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px 120px;
  color: #fff;
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;
}

// 初始隱藏，交由 MainSection 的 ScrollTrigger 控制顯示
.about-text {
  opacity: 0;
}

.about-text p {
  font-size: 1rem;
  margin-bottom: 20px;
  line-height: 1.8;
  color: #111;
  text-align: justify;
  text-justify: inter-word;
  letter-spacing: 0;
  word-break: break-word;
}

.about-text strong {
  font-weight: 700;
}

.about-text.en p {
  text-align: left;           /* 英文齊左 */
  text-justify: auto;         /* 取消英文分散對齊 */
  letter-spacing: 0px;        /* 英文字距更緊密 */
}

.about-text h2 {
  color: #111;
}

.about-stats {
  display: grid;
  gap: 30px;
  opacity: 0;
}
.about-stats img{
  border-radius: 10px;
}


@media (max-width: 768px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  /* 手機版：英文段落左右齊行對齊，並啟用自動斷詞避免大空白 */
  .about-text.en p {
    text-align: justify;
    text-justify: inter-word;
    hyphens: auto;
    -webkit-hyphens: auto;
    -ms-hyphens: auto;
    word-break: normal;
  }
}
@media (min-width: 2560px){
  .container{
    max-width: 2000px;
  }
  .about-text h2{
    font-size: 3em;
  }
  .about-text p{
    font-size: 1.5em;
  }
}
</style> 