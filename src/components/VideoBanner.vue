<template>
  <div class="wrap" style="margin:0;padding:0;font-family: 'Poppins', sans-serif;">
    <div class="banner">
      <!-- <video autoplay muted loop style="width: 100%"> 
        <source src="../assets/dome.mp4" type="video/mp4">
        
      </video> -->
      <video
      ref="myVideo"
      autoplay
      muted
      playsinline
      webkit-playsinline
      x5-playsinline
      loop
      preload="auto"
      width="100%"
      height="auto"
    >
      <source src="@/assets/dome.mp4" type="video/mp4" />
      Your browser does not support HTML5 video.
    </video>
      <h2>
        <span class="text-block">FUTURE</span>
        <span class="text-block" style="margin-left: 0.07em;">VISION </span>
        <span class="text-block">LAB 2026</span>
      </h2>
      
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
export default {
  name: 'VideoBanner',
  mounted(){
    const video = this.$refs.myVideo;
    if (!video) {
      console.warn('找不到影片元素');
      return;
    }
    // 確保屬性在播放前已設定（iOS/Safari 需求）
    try {
      video.muted = true;
      video.playsInline = true;
      video.autoplay = true;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      video.setAttribute('x5-playsinline', '');
      video.setAttribute('autoplay', '');
      // 確保不顯示控制列，避免干擾自動播放
      video.removeAttribute('controls');
      video.controls = false;
    } catch (err) {
      console.warn('設定影片屬性時發生錯誤', err);
    }

    const tryPlay = () => {
      // 先重新載入以確保屬性生效
      try { video.load(); } catch (err) { console.warn('重新載入影片失敗', err); }
      const p = video.play();
      if (p && typeof p.then === 'function') {
        p.catch((err) => {
          console.log('自動播放被阻止:', err);
        });
      }
    };

    if (video.readyState >= 2) {
      tryPlay();
    } else {
      video.addEventListener('canplay', tryPlay, { once: true });
      // 某些瀏覽器不觸發 canplay，短暫延遲再嘗試
      setTimeout(tryPlay, 500);
    }

    // 手機裝置：若首次被阻擋，於使用者首次互動時再嘗試一次
    const resumeOnGesture = () => {
      if (video && video.paused) {
        tryPlay();
      }
      window.removeEventListener('touchstart', resumeOnGesture, true);
      window.removeEventListener('pointerdown', resumeOnGesture, true);
      window.removeEventListener('scroll', resumeOnGesture, true);
      window.removeEventListener('visibilitychange', onVis, true);
    };
    const onVis = () => {
      if (!document.hidden) resumeOnGesture();
    };
    window.addEventListener('touchstart', resumeOnGesture, true);
    window.addEventListener('pointerdown', resumeOnGesture, true);
    window.addEventListener('scroll', resumeOnGesture, true);
    window.addEventListener('visibilitychange', onVis, true);

    // 記錄解除監聽的函式，於卸載時清理
    this._cleanupVideoBanner = () => {
      try {
        window.removeEventListener('touchstart', resumeOnGesture, true);
        window.removeEventListener('pointerdown', resumeOnGesture, true);
        window.removeEventListener('scroll', resumeOnGesture, true);
        window.removeEventListener('visibilitychange', onVis, true);
        video.removeEventListener('canplay', tryPlay, { once: true });
      } catch (err) { console.warn('清理事件監聽失敗', err); }
    };
    gsap.registerPlugin(ScrollTrigger);
     gsap.to(".banner h2",{
      x:0,
    // rotation: 360,
    opacity:1,
    ease: "power1.out",
    scrollTrigger : {
      trigger: ".banner h2", //觸發的物件(可省略)
      start: "0% 20%", // (物件開始位置, 卷軸開始位置) 參數可以設定 top center bottom px %
      end: "+=0 80%", //(物件結束位置, 卷軸結束位置) , 也可以設卷軸捲動多少結束動畫(+=300是指start的位置再加上300)
      // pin: true, // 物件執行完動畫會跟著卷軸走，類似 position: fixed
      scrub: 3, // 物件動畫延遲的秒數
      toggleClass: "active", // 增加移除的class，class名稱須為字串
      // markers: true // 顯示標記
     }
  })
  },
  beforeUnmount() {
    if (this._cleanupVideoBanner) {
      this._cleanupVideoBanner();
      this._cleanupVideoBanner = null;
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes fadeIn {
  0% { 
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.banner {
  width: 100%;
  height:70vh;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.banner video {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
}


.banner h2 {
  animation: fadeIn 2s;	  
  font-family: "Monda", sans-serif;
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size:18em;
  font-weight:900;
  text-align:left;
  line-height: 1.1cap;
  text-transform: uppercase;
  mix-blend-mode: screen;
  color: #000;
  background-color: #fff;
  margin: 0;
  padding-left: 0.05em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  -webkit-text-stroke: 15px #000;
  line-height:0.8em;
}

.banner h2 .text-block {
  display: block;
  width: 100%;
}

@media (max-width:768px){
  .banner{
    height: 60vh;
  }
  .banner h2{
    font-size: 5em;
    line-height: 1.1;
    -webkit-text-stroke: 5px #000;
  }
}

@media (max-width:480px){
  .banner h2{
    font-size: 6em;
    padding: 0;
  }
}
@media (min-width: 2560px){
  .banner{
    max-height: 20vh;
  }
}
</style> 