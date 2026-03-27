
<template>
  <b-navbar toggleable type="dark" variant="dark" style="padding: 1em;align-items: center;z-index: 1;">
    <!-- <a class="navbar-item-logo">
               <img src="../assets/fvl-logo.png">
             </a> -->
<!-- 
    <b-navbar-toggle target="navbar-toggle-collapse" class="button"  style="border: 0.5px white solid;width: 5%;display: flex;align-items: center;justify-content: center;background: transparent;color: white;">
      <template #default="{ expanded }">
        <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
        <b-icon v-else icon="chevron-bar-down"></b-icon>
      </template>
    </b-navbar-toggle> -->

    <!-- <b-collapse id="navbar-toggle-collapse" is-nav> 
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="#"> <router-link :to="{ name:'Home' }"><p>首頁/Home</p></router-link></b-nav-item>
        <b-nav-item href="#"><router-link :to="{ name:'Fvlhome' }"> <p>FVL未來藝術節2024/FVL 2024</p></router-link></b-nav-item>
        <b-nav-item href="#"> <router-link :to="{ name:'About' }"><p>未來視覺實驗室/ABOUT</p></router-link></b-nav-item>
        <b-nav-item href="#"> <router-link :to="{ name:'News' }"><p>關於空間/SPACE</p></router-link></b-nav-item>
      </b-navbar-nav>
    </b-collapse> -->
  </b-navbar>
</template>

 
<script>
// bootstrap-vue/src/components/navbar/index.js
import Vue from 'vue';
import { BootstrapVue, IconsPlugin} from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { BNavbar } from 'bootstrap-vue';
import { BCollapse } from 'bootstrap-vue';
import { BNavbarBrand } from 'bootstrap-vue';
import { BIcon } from 'bootstrap-vue';
import { BNavbarToggle } from 'bootstrap-vue';
import { BNavbarNav } from 'bootstrap-vue';
import { BNavItem} from 'bootstrap-vue';



Vue.component('b-navbar', BNavbar)
Vue.component('b-navbar-brand', BNavbarBrand)
Vue.component('b-navbar-toggle', BNavbarToggle)
Vue.component('b-collapse', BCollapse)
Vue.component('b-navbar-nav', BNavbarNav)
Vue.component('b-icon', BIcon)
Vue.component('b-nav-item', BNavItem)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
export default {
  name: 'Navbar',
  props: {
    msg: String
  },
} 
</script>
 
<style scoped lang="scss" setup>
.bg-dark{
  background-color:transparent !important;
  // pointer-events: none;
}
.navbar-item-logo{
  width: 20%;
  height: auto;
}
.nav-item p{
  color: white;
  font-size:2.5rem;
  font-weight: 700;
  font-family: Gill Sans, sans-serif;
  margin-bottom: 2rem;
}
.nav-item p:hover{
  color: gray;
}
.ml-auto{
  align-items: center;
  text-align: center;
  padding-bottom:35rem;
}
  @media (min-width: 992px) { 
    .navbar.custom-nav{
      width: 100vw;
      padding-top:16px;
      padding-bottom:16px;
      background-color: #000000 !important;
    }
   }
 
   @media only screen and (max-width:768px){
     .navbar-nav{
      text-align: center;
      justify-content: center;
      align-items: center;
     }
     .nav-item p{
  color: white;
  font-size:2.5rem;
  font-weight: 700;
  font-family: Gill Sans, sans-serif;
  margin-bottom: 0rem;
}
  }
  @media only screen and (max-width:720px) {
    .navbar-nav{
      text-align: center;
      justify-content: center;
      align-items: center;
     }
     .nav-item p{
  color: white;
  font-size:2.5rem;
  font-weight: 700;
  font-family: Gill Sans, sans-serif;
  margin-bottom: 0;
}
     .nav-item{
      padding: 30px;
     }
     .ml-auto{
      padding: 0;
     }
  }
</style>