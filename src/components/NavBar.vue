<!-- eslint-disable max-len -->

<template>
  <b-navbar toggleable type="dark" variant="dark" :class="{ 'navbar-expanded': isNavbarExpanded }" style="padding: 1em;align-items: center;">
    <router-link :to="{ name:'Home' }" class="navbar-item-logo">
     <img src="../assets/logo.png" style="width: 120px; height: auto;">
    </router-link>

    <b-navbar-toggle target="navbar-toggle-collapse" class="button">
      <template #default="{ expanded }">
        <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
        <b-icon v-else icon="chevron-bar-down"></b-icon>
      </template>
    </b-navbar-toggle>

    <b-collapse id="navbar-toggle-collapse" is-nav @shown="onNavbarShown" @hidden="onNavbarHidden">
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="#"> <router-link :to="{ name:'Home' }"><p>首頁/Home</p></router-link></b-nav-item>
       <!-- <b-nav-item href="#" class="dropdown-parent" @click.stop>
          <div class="dropdown-trigger" @click.stop="toggleDropdown">
            <p>FVL FEST</p>
            <b-icon :icon="showDropdown ? 'chevron-up' : 'chevron-down'" class="dropdown-icon"></b-icon>
          </div>
          <transition name="dropdown">
            <div v-show="showDropdown" class="dropdown-menu" @click.stop>
              <div class="submenu-item-wrapper" @click.stop>
                <a href="https://clab.org.tw/project/future-vision-lab-2020/"target="_blank" rel="noopener"><p class="submenu-item">2020</p></a>
              </div>
              <div class="submenu-item-wrapper" @click.stop>
                <a href="https://clab.org.tw/project/future-vision-lab-2021/"target="_blank" rel="noopener"><p class="submenu-item">2021</p></a>
              </div>
              <div class="submenu-item-wrapper" @click.stop>
                <a href="https://clab.org.tw/project/future-vision-lab-2022/"target="_blank" rel="noopener"><p class="submenu-item">2022</p></a>
              </div>
              <div class="submenu-item-wrapper" @click.stop>
                <a href="https://clab.org.tw/project/future-vision-lab-2023/"target="_blank" rel="noopener"><p class="submenu-item">2023</p></a>
              </div>
              <div class="submenu-item-wrapper" @click.stop>
                <router-link :to="{ name:'Fvlhome' }"><p class="submenu-item">2024</p></router-link>
              </div>
              <div class="submenu-item-wrapper" @click.stop>
                <router-link :to="{ name:'Fvlhome' }"><p class="submenu-item">2025</p></router-link>
              </div>
              <div class="submenu-item-wrapper" @click.stop>
                <a href="https://fvl.clab.org.tw/" target="_blank" rel="noopener noreferrer"><p class="submenu-item">2025</p></a>
              </div>
            </div>
          </transition>
        </b-nav-item> -->
        <b-nav-item href="#"> <router-link :to="{ name:'festival' }"><p>FVL FEST</p></router-link></b-nav-item>
        <b-nav-item href="#"> <router-link :to="{ name:'About' }"><p>未來視覺實驗室/ABOUT US</p></router-link></b-nav-item>
        <b-nav-item href="#"> <router-link :to="{ name:'News' }"><p>關於空間/ABOUT SPACE</p></router-link></b-nav-item>
        <b-nav-item href="#"> <router-link :to="{ name:'Collection' }"><p>FVL COLLECTION</p></router-link></b-nav-item>
        <b-nav-item href="#"> <router-link :to="{ name:'All' }"><p>歷年作品/WORKS</p></router-link></b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>


<script>
// bootstrap-vue/src/components/navbar/index.js
import Vue from 'vue';
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import {BNavbar} from 'bootstrap-vue';
import {BCollapse} from 'bootstrap-vue';
import {BNavbarBrand} from 'bootstrap-vue';
import {BIcon} from 'bootstrap-vue';
import {BNavbarToggle} from 'bootstrap-vue';
import {BNavbarNav} from 'bootstrap-vue';
import {BNavItem} from 'bootstrap-vue';


Vue.component('b-navbar', BNavbar);
Vue.component('b-navbar-brand', BNavbarBrand);
Vue.component('b-navbar-toggle', BNavbarToggle);
Vue.component('b-collapse', BCollapse);
Vue.component('b-navbar-nav', BNavbarNav);
Vue.component('b-icon', BIcon);
Vue.component('b-nav-item', BNavItem);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Navbar',
  props: {
    msg: String,
  },
  data() {
    return {
      showDropdown: false,
      isNavbarExpanded: false,
    };
  },
  mounted() {
    // 监听 collapse 元素的变化
    this.observeNavbarCollapse();
    // 监听点击事件
    this.setupToggleListener();
  },
  methods: {
    toggleDropdown(event) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      this.showDropdown = !this.showDropdown;
    },
    setupToggleListener() {
      // 监听 toggle 按钮点击
      this.$nextTick(() => {
        const toggleButton = document.querySelector('[data-target="#navbar-toggle-collapse"]');
        const collapseElement = document.getElementById('navbar-toggle-collapse');
        if (toggleButton && collapseElement) {
          toggleButton.addEventListener('click', () => {
            // 延迟检查状态，等待 Bootstrap 动画完成
            setTimeout(() => {
              this.checkNavbarState();
            }, 100);
          });
        }
      });
    },
    observeNavbarCollapse() {
      // 使用 MutationObserver 监听 collapse 元素的变化
      this.$nextTick(() => {
        const collapseElement = document.getElementById('navbar-toggle-collapse');
        if (collapseElement) {
          const observer = new MutationObserver(() => {
            this.checkNavbarState();
          });
          observer.observe(collapseElement, {
            attributes: true,
            attributeFilter: ['class'],
          });
          // 初始检查
          this.checkNavbarState();
        }
      });
    },
    checkNavbarState() {
      const collapseElement = document.getElementById('navbar-toggle-collapse');
      if (collapseElement) {
        const isExpanded = collapseElement.classList.contains('show');
        if (isExpanded !== this.isNavbarExpanded) {
          this.isNavbarExpanded = isExpanded;
          if (isExpanded) {
            this.disableBodyScroll();
          } else {
            this.enableBodyScroll();
          }
        }
      }
    },
    disableBodyScroll() {
      const el = document.querySelector('.navbar');
      // 保存当前滚动位置
      const scrollY = window.scrollY || window.pageYOffset;
      el.style.position = 'fixed';
      // document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      // document.body.style.overflow = 'hidden';
      // 同时禁用 html 元素的滚动
      // document.documentElement.style.overflow = 'hidden';
    },
    enableBodyScroll() {
      // 恢复滚动位置
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    },
    onNavbarShown() {
      this.isNavbarExpanded = true;
      this.disableBodyScroll();
    },
    onNavbarHidden() {
      this.isNavbarExpanded = false;
      this.enableBodyScroll();
    },
  },
  beforeUnmount() {
    // 组件卸载前恢复页面滚动
    this.enableBodyScroll();
  },
};

</script>

<style scoped lang="scss" setup>
// #navbar-toggle-collapse{
//   position:fixed;
//   top:0;
//   right:0;
//   height:100vh;
//   width:20vw;
//   background-color:#000;
// }
.navbar{
 width: 100vw;
 z-index: 1000;
}
.button{
  border: 0.5px white solid;
  width: 5%;
  height:3em;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: white;
}
.bg-dark{
  background-color: #000000 !important;
  background-image: none !important;
  // border-bottom:0.01px solid white;
  transition: background-image 0.3s ease;
}
.navbar-expanded.bg-dark{
  background-image: linear-gradient(to left, #000000 30%,#492dfe 100%,) !important;
}

// 确保 navbar 在初始状态下是黑色
:deep(.navbar) {
  background-color: #000000 !important;
  background-image: none !important;
}

:deep(.navbar.navbar-expanded) {
  background-image: linear-gradient(to top, #000000 40%,#b7c2ffbc 100%) !important;
}
.navbar-item-logo{
  width: auto;
  height: auto;
  cursor: pointer;
  transition: all 0.3s ease;
}

.navbar-item-logo:hover {
  opacity: 0.8;
  transform: scale(1.05);
}

.navbar-item-logo img {
  width: 120px;
  height: auto;
}

.nav-item{
  width:100%;
}
.nav-item p{
  color: white;
  font-size:1.5em;
  font-weight:500;
  font-family: Gill Sans, sans-serif;
}
.nav-item p:hover{
  color: gray;
}


.dropdown-parent p:hover {
  color: white !important;
}

.dropdown-parent:hover {
  background-color: transparent !important;
}

.dropdown-trigger:hover {
  background-color: white !important;
}

.dropdown-trigger p:hover {
  color: white !important;
}
.ml-auto{
  gap: 1em;
  align-items:flex-end;
  text-align:right;
  // padding-bottom:35rem;
  padding: 40px 10px 35rem;
}
.nav-item a {
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  padding: 0;
}

.nav-item a:hover {
  color: #4A9EFF;
  text-shadow: 0 0 10px rgba(74, 158, 255, 0.5);
}

.dropdown-parent {
  position: relative;
}

.dropdown-trigger {
  display: flex;
  align-items: center;
  justify-content:flex-end;
  cursor: pointer;
  width: 100%;
}

.dropdown-trigger p {
  margin: 0;
}

.dropdown-icon {
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
}

.dropdown-menu {
  padding: 0;
  // padding-left: 1.5rem;
  // padding-top: 0.5rem;
  // padding-bottom: 0.5rem;
  overflow: hidden;
  display: flex;
  flex-direction:row;
  // gap: 0.5rem;
  --bs-dropdown-bg: #000000;
  // border: #492dfe 1px solid;
  background-color: var(--bs-dropdown-bg);
  text-align:center;
}

.submenu-item-wrapper {
  width: 100%;
  background-color: #000000;
  border: 1px solid #000000;
  transition: all 0.3s ease;
}

.submenu-item-wrapper a {
  text-decoration: none;
  display: block;
  width: 100%;
}



.dropdown-enter-active, .dropdown-leave-active {
  transition: all 0.3s ease;
  max-height: 300px;
  opacity: 1;
}

.dropdown-enter, .dropdown-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.submenu-item {
  font-size: 1.8em;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  background-color: #000000;
  border: 1px solid #000000;
  padding: 0.5rem 1rem;
  margin: 0;
  transition: all 0.3s ease;
  display: block;
  width: 100%;
  cursor: pointer;
}

.submenu-item:hover {
  color: #000000 !important;
  background-color: #ffffff !important;
}

.submenu-item-wrapper:hover {
  background-color: #ffffff !important;
  border: 1px solid #000000;
}

.submenu-item-wrapper:hover .submenu-item {
  color: #000000 !important;
  background-color: #79a8ff !important;
}

.submenu-item-wrapper a:hover {
  color: #000000 !important;
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
     .navbar-item-logo img {
       width: 100px;
     }
    .dropdown-trigger{
      justify-content: center;
    }
    .dropdown-parent{
      align-items: center;
    }
    .dropdown-menu{
      align-items: center;
      text-align: center;
    }
    .submenu-item-wrapper{
      display: flex;
      justify-content: center;
    }
    .submenu-item{
      text-align: center;
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
      font-size:2rem;
      font-weight: 500;
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

  @media(max-width:2560px){

  }
  @media(max-width:1920px){

  }
  @media(max-width:1440px){

  }
  @media(max-width:1280px){

  }
  @media(max-width:1024px){
    .button{
      width: 20%;
      height:3em;
    }
  }
  @media(max-width:768px){
    .button{
      width: 30%;
      height:3em;
    }
  }

  @media only screen and (max-width:480px) {
    .navbar-item-logo img {
      width: 80px;
    }
  }
</style>
