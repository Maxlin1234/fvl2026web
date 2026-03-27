<template>
  <footer class="foot-bar" style="bottom: 0;z-index:999;">
    <div class="container">
        <div class="columns has-text-centered">
          <div class="column">
            <p style="margin-bottom:2rem;">
              © 2024 財團法人臺灣生活美學基金會. All Rights Reserved.
            </p>
          </div>
        </div>

      </div>

  </footer>
</template>

<script>
export default {
  name: 'foot-bar',
};
</script>

<style lang="scss" scoped>
.foot-bar {
  padding-top: 30px;
  overflow: hidden;
  background-color: rgb(0, 0, 0) !important;
  color: white;
  z-index:999;
  position:relative;
}
</style>
