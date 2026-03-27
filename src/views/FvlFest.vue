<template>
  <section>
    <nav-bar style="z-index:999;"></nav-bar>
    <language-switch v-model="isEnglish"></language-switch>

    <section class="collection-page">

      <!-- 上方滑動文字 -->
      <!-- <div class="horizontal-slider">
        <div class="slider-inner">
          <div class="h-item" v-for="n in 6" :key="'top'+n">
            <h2 class="h-title stroke">FVL FEST</h2>
          </div>
        </div>
      </div> -->

      <!-- 年份區塊 -->
      <div class="year-grid">

        <div
          v-for="year in years"
          :key="year"
          class="year-item"
          @click="goYear(year)"
        >
          <h2>{{ year }}</h2>
        </div>

      </div>

      <!-- 下方滑動文字 -->
      <!-- <div class="horizontal-slider">
        <div class="slider-inner reverse">
          <div class="h-item" v-for="n in 6" :key="'bottom'+n">
            <h2 class="h-title fill">FVL FEST</h2>
          </div>
        </div>
      </div> -->

    </section>
  </section>
</template>

<script>
import { NavBar, LanguageSwitch } from '../components/index.js';

export default {
  name: 'festival',

  components: {
    'nav-bar': NavBar,
    'language-switch': LanguageSwitch,
  },

  data() {
    return {
      isEnglish: false,

      years: [
        2024,
        2025,
        2026,
      ],
    };
  },

  methods: {

    goYear(year) {
      if (year === 2025) {
        window.open('https://fvl.clab.org.tw/', '_blank');
        return;
      }

      this.$router.push({
        name: `fvl-fest-${year}`
      });

    }

  }
};
</script>

<style scoped>

.collection-page{
  min-height:100vh;
  background:#000;
  padding:40px 4vw 60px;
  color:white;
  display:flex;
  justify-content:center;
}

/* 年份 grid */

.year-grid{
  display:grid;
  grid-template-columns:repeat(4,minmax(180px,1fr));
  gap:16px;
  width:100%;
  max-width:1280px;
  margin:0 auto;
}

.year-item{
  background:#111;
  height:clamp(170px,14vw,250px);
  min-height:170px;
  display:flex;
  justify-content:center;
  align-items:center;
  cursor:pointer;
  border:1px solid #222;
  transition:all .3s ease;
}

.year-item h2{
  font-size:clamp(32px,3vw,56px);
  letter-spacing:6px;
}

.year-item:hover{
  background:#4A9EFF;
  transform:scale(1.05);
}

/* slider */

.horizontal-slider{
  width:100%;
  overflow:hidden;
  background:#000;
}

.slider-inner{
  display:flex;
  width:max-content;
  animation:scroll 80s linear infinite;
  gap:15vw;
}

.slider-inner.reverse{
  animation-direction:reverse;
}

@keyframes scroll{
  0%{transform:translateX(0);}
  100%{transform:translateX(-50%);}
}

.h-title{
  font-size:4vw;
  font-weight:800;
  letter-spacing:0.2em;
  white-space:nowrap;
}

.h-title.stroke{
  color:transparent;
  -webkit-text-stroke:1px #4A9EFF;
}

.h-title.fill{
  color:#4A9EFF;
}

/* RWD */

@media(max-width:1200px){
  .year-grid{
    grid-template-columns:repeat(3,1fr);
  }
}

@media(max-width:900px){

  .year-grid{
    grid-template-columns:repeat(2,1fr);
  }

  .year-item h2{
    font-size:7vw;
  }

}

@media(max-width:600px){

  .year-grid{
    grid-template-columns:1fr;
  }

  .year-item{
    height:160px;
  }

  .year-item h2{
    font-size:10vw;
  }

}
</style>