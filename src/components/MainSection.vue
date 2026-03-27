<template>
  <section class="main-section">
    <transition
        mode="out-in"
        enter-active-class="fadeIn"
        leave-active-class="fadeOut"
        appear>
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view class="animated"></router-view>
      </keep-alive>
      <router-view v-else class="animated"></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'main-section'
}
</script>

<style lang="scss" scoped>
.main {
  min-height: 400px;
}
</style>
