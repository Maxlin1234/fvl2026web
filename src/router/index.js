/* eslint-disable max-len */
import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue'
// import Aboutwork from '../views/Aboutwork.vue'
// import Aboutwork_en from '../views/Aboutwork_en.vue'
// import Fvlhome from '../views/Fvlhome.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    // component: Fvlhome
    component: () => import(/* webpackChunkName: 'about' */ '../views/Home.vue'),
  },
  {
    path: '/fvl-fest-2024',
    name: 'Fvlhome',
    component: () => import(/* webpackChunkName: 'about' */ '../views/Fvlhome.vue'),

  },
  {
    path: '/fvl-fest-2024_en',
    name: 'Fvlhome_en',
    component: () => import(/* webpackChunkName: 'about' */ '../views/Fvlhome_en.vue'),
  },
  {

    // path:'/Fvlhome/Aboutwork/:id/:title/:word/:photo/:photo2/:photo3/:artist',
    path: '/fvl-fest-2024/Aboutwork/:id/:workId',
    name: 'Aboutwork',
    component: () => import(/* webpackChunkName: 'about' */ '../views/Aboutwork.vue'),
    meta: {
      keepAlive: true, // 需要被缓存
    },
  },
  {

    path: '/fvl-fest-2024/Aboutwork_All/:id/:workId',
    name: 'Aboutwork_All',
    component: () => import(/* webpackChunkName: 'about' */ '../views/Aboutwork_All.vue'),
    meta: {
      keepAlive: true, // 需要被缓存
    },
  },

  {

    path: '/fvl-fest-2024/Aboutwork_en_All/:id/:workId',
    name: 'Aboutwork_en_All',
    component: () => import(/* webpackChunkName: 'about' */ '../views/Aboutwork_en_All.vue'),
    meta: {
      keepAlive: true, // 需要被缓存
    },
  },
  {

    // path:'/Fvlhome/Aboutwork_en/:id/:title/:word/:photo/:photo2/:photo3/:artist',
    path: '/fvl-fest-2024_en/Aboutwork_en/:id/:workId',
    name: 'Aboutwork_en',

    component: () => import(/* webpackChunkName: 'about' */ '../views/Aboutwork_en.vue'),

  },
  // {
  //   path: '/Aboutwork',
  //   name: 'Aboutwork',
  //   component: () => import(/* webpackChunkName: 'about' */ '../views/Aboutwork.vue')
  // },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: 'about' */ '../views/About.vue'),
  },
  {
    path: '/News',
    name: 'News',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: 'about' */ '../views/News.vue'),
  },

  {
    path: '/All',
    name: 'All',
    component: () => import(/* webpackChunkName: 'about' */ '../views/All.vue'),
  },
  {
    path: '/All_en',
    name: 'All_en',
    component: () => import(/* webpackChunkName: 'about' */ '../views/All_en.vue'),
  },
  {
    path: '/collection',
    name: 'Collection',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: 'about' */ '../views/Collection.vue'),
  },
  {
    path: '/festival',
    name: 'festival',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: 'about' */ '../views/FvlFest.vue'),
  },
  {
    path: '/festival/2026',
    name: 'fvl-fest-2026',
    alias: ['/fvl-fest-2026', '/festival/fvl-fest-2026'],
    meta: { keepAlive: true },
    // FvlFest2026.vue is under components, not views.
    component: () => import(/* webpackChunkName: 'fvl-fest-2026' */ '../components/Fvl2026Final.vue'),
  },
  {
    path: '/portfolioDetil',
    name: 'PortfolioDetil',
    component: () => import( '../views/PortfolioDetil.vue') // 注意檔名也建議改正
  },
  {
    path: '/works/:id/:slug?',
    name: 'WorkDetail',
    component: () => import('../views/PortfolioDetil.vue')
  },


];
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    // browser back/forward: restore exact previous position
    if (savedPosition) return savedPosition;
    // anchor navigation (e.g. #portfolio)
    if (to.hash) {
      return { selector: to.hash, offset: { x: 0, y: 16 } };
    }
    // from work detail back to 2026 homepage: keep user near works section
    if (from.name === 'WorkDetail' && to.name === 'fvl-fest-2026') {
      return { selector: '#portfolio', offset: { x: 0, y: 24 } };
    }
    return { x: 0, y: 0 };
  },
});

export default router;
