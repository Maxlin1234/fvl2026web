<template>
  <footer class="footer-bar">
    <div class="container">
      <p>&copy; {{ isEnglish ? 'TAIWAN LIVING ARTS FOUNDATION All Rights Reserved' : '財團法人台灣生活美學基金會 版權所有' }}</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterBar',
  props: {
    isEnglish: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.footer-bar {
  background: #111;
  color: #fff;
  text-align: center;
  padding: 30px 0;
  font-size: 1rem;
}
.footer-bar .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
</style> 