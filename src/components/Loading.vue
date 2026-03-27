<!-- eslint-disable max-len -->
<template>
<div class="page-loader" v-if="!isloaded">
  <div class="pulse">
      <span style="--i:0;"></span>
      <span style="--i:1;"></span>
      <span style="--i:2;"></span>
      <span style="--i:3;"></span>
      <span style="--i:4;"></span>
      <span style="--i:5;"></span>
      <span style="--i:6;"></span>
  </div>
  <div style="color: white;font-size:4em;font-weight: 900;margin-top: 1em;font-family: Microsoft JhengHei;;z-index: 999;">LOADING...</div>
</div>

</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'loading',
  components: {
  },
  data: ()=>{
    return {
      isloaded: false,
    };
  },
  mounted() {
  //   document.onreadystatechange = () =>{
  //   if( document.readyState == "complete"){
  //     setTimeout(()=>{
  //       this.isloaded = true;
  //       },1000)
  //   }
  // }
    window.onload = () => {
      setTimeout(() => {
        this.isloaded = true;
      }, 1000); // 根據需要調整時間
    };
  },
};
</script>

<style lang="scss" scoped>
$colors:#ff0000,#ffffff,#ffffff,#ffffff;
.page-loader{
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  position:fixed;
  background-image:linear-gradient(  rgb(255, 50, 84), blue);
  top: 0;
  left: 0;
  width:100vw;
  height:100vh;
  z-index:998;
  margin:0 !important;
  overflow: hidden; // 添加此行以避免溢出
}
.pulse{
position:relative;
width: 200px;
height: 200px;
background:rgb(255, 40, 140);
border-radius:50%;
// left:62%;
// top:20%;
z-index:999;
filter: blur(5px);
}
.pulse span{
 position: absolute;
 width: 100%;
 height: 100%;
 opacity:.8;
 background:inherit;
 border-radius:inherit;
 -webkit-animation: pulseAnimation 1.5s ease-out infinite;
 animation: pulseAnimation 1.5s ease-out infinite;
 animation-delay: calc(1s * var(--i));
}

@keyframes pulseAnimation{
 100%{
   opacity: 0;
   transform: scale(2);
 }
}
</style>
