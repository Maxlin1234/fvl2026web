<template>
  <div id="app">
    <main-section></main-section>
  </div>
</template>

<script>
// import { NavBar, MainSection, InfoBar, FootBar} from './components/'
import {MainSection} from './components/'
export default {
  components: {
    'main-section': MainSection,
  }
}

</script>

<style lang="scss">
@import '~animate.css';
.animated {
  animation-duration: .377s;
}
// Import Bulma's core
@import "~bulma/sass/utilities/_all";
// Set your colors
// $primary: #8c67ef;
$primary: #777777;
$primary-invert: findColorInvert($primary);
// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert)
);
// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;
// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
$fa-font-path: '~font-awesome/fonts/';
// @import '~font-awesome/scss/font-awesome';
// global custom style
.has-shadow {
  box-shadow: 0 2px 3px hsla(0,0%,4%,.1);
}
</style>
