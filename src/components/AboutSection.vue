<template>
  <section id="about" class="about">
    <div class="container" style="background-color: #fff;padding: 30px 30px 10px;">
      <div class="about-content">
        <div class="about-text" :class="{ en: isEnglish }">
          <div
            v-if="aboutIntroHtml"
            class="about-intro-html"
            v-html="aboutIntroHtml"
          ></div>
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
import axios from 'axios';

const PROJECT_API_URL = 'https://unzip.clab.org.tw/api/v1/projects/21';
const API_AUTH = 'Api-Key 1e801a8fbe21fe2bef15df853e62ec9dc5a1cd08';

export default {
  name: 'AboutSection',
  data() {
    return {
      descriptionZhTw: '',
      descriptionEn: '',
    };
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
  },
  computed: {
    aboutIntroHtml() {
      const raw = this.isEnglish ? this.descriptionEn : this.descriptionZhTw;
      return typeof raw === 'string' ? raw : '';
    },
  },
  mounted() {
    this.fetchProjectIntro();
  },
  methods: {
    async fetchProjectIntro() {
      try {
        const { data } = await axios.get(PROJECT_API_URL, {
          headers: { Authorization: API_AUTH },
        });
        const entity = data?.data && typeof data.data === 'object' ? data.data : data;
        const zh = entity?.description_zh_tw ?? entity?.descriptionZhTw ?? '';
        const en = entity?.description ?? '';
        this.descriptionZhTw = typeof zh === 'string' ? zh : '';
        this.descriptionEn = typeof en === 'string' ? en : '';
      } catch (e) {
        console.error('AboutSection: failed to load project intro', e);
      }
    },
  },
};
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

.about-intro-html :deep(p) {
  font-size: 1rem;
  margin-bottom: 20px;
  line-height: 1.8;
  color: #111;
  text-align: justify;
  text-justify: inter-word;
  letter-spacing: 0;
  word-break: break-word;
}

.about-intro-html :deep(p:last-child) {
  margin-bottom: 0;
}

.about-intro-html :deep(strong) {
  font-weight: 700;
}

.about-text.en .about-intro-html :deep(p) {
  text-align: left;
  text-justify: auto;
  letter-spacing: 0;
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

  .about-text.en .about-intro-html :deep(p) {
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
  .about-intro-html :deep(p) {
    font-size: 1.5em;
  }
}
</style>
