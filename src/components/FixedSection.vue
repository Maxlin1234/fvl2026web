<template>
  <section id="fix-section" style="width: 100vw;background-color:#fff;position: relative;">
    <div class="title-box">
      <h2 ref="fixedHeading" class="fixed-section-title" style="color:black;">FUTURE VISION LAB 2026</h2>
    </div>
    <div class="fix-bg"></div>
  </section>
</template>

<script>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'FixedSection',
  mounted() {
    this.$nextTick(() => {
      const el = this.$refs.fixedHeading;
      if (!el) return;

      this._headingTween = gsap.from(el, {
        y: 24,
        autoAlpha: 0,
        duration: 0.75,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  },
  beforeDestroy() {
    const st = this._headingTween && this._headingTween.scrollTrigger;
    if (st) st.kill();
    this._headingTween = null;
  },
  props: {
    isEnglish: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.title-box{
   position:absolute;
   display: flex;
   justify-content: center;
   font-size: 2em;
   bottom: 0;
   left: 50%;
   width:70%;
   background-color:#fff;
   z-index: 2;
   padding: 40px;
   border-top-left-radius: 10px;
   border-top-right-radius: 10px;
   -webkit-transform: translateX(-50%);
   transform: translateX(-50%);
}

.fixed-section-title {
  margin: 0;
  position: relative;
  z-index: 1;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.fix-bg {
  background-image: url("../assets/3.jpg");
  background-position: center;
  min-height:600px;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size:cover;
  height: auto;
  width: 100vw;
}

@media (max-width: 768px) {
  .title-box{
    padding: 30px;
  }
.title-box h2,
.title-box .fixed-section-title{
  font-size: 0.6em;
}
.fix-bg {
  min-height:500px;
  background-attachment:scroll;
  background-position:center bottom;
  background-repeat: no-repeat;
  background-size:cover;
  height:auto;
  width: 100%;
}
}
@media (min-width: 2560px){
  .title-box{
    font-size: 2.5em;
  }
}
</style> 