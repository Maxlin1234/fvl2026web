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
    redirect: '/festival/2026'
  },
  // {
  //   path: '/fvl-fest-2024',
  //   name: 'Fvlhome',
  //   component: () => import(/* webpackChunkName: 'about' */ '../views/Fvlhome.vue'),

  // },
  // {
  //   path: '/fvl-fest-2024_en',
  //   name: 'Fvlhome_en',
  //   component: () => import(/* webpackChunkName: 'about' */ '../views/Fvlhome_en.vue'),
  // },
  // {

  //   // path:'/Fvlhome/Aboutwork/:id/:title/:word/:photo/:photo2/:photo3/:artist',
  //   path: '/fvl-fest-2024/Aboutwork/:id/:workId',
  //   name: 'Aboutwork',
  //   component: () => import(/* webpackChunkName: 'about' */ '../views/Aboutwork.vue'),
  //   meta: {
  //     keepAlive: true, // 需要被缓存
  //   },
  // },
  // {

  //   path: '/fvl-fest-2024/Aboutwork_All/:id/:workId',
  //   name: 'Aboutwork_All',
  //   component: () => import(/* webpackChunkName: 'about' */ '../views/Aboutwork_All.vue'),
  //   meta: {
  //     keepAlive: true, // 需要被缓存
  //   },
  // },

  // {

  //   path: '/fvl-fest-2024/Aboutwork_en_All/:id/:workId',
  //   name: 'Aboutwork_en_All',
  //   component: () => import(/* webpackChunkName: 'about' */ '../views/Aboutwork_en_All.vue'),
  //   meta: {
  //     keepAlive: true, // 需要被缓存
  //   },
  // },
  // {

  //   // path:'/Fvlhome/Aboutwork_en/:id/:title/:word/:photo/:photo2/:photo3/:artist',
  //   path: '/fvl-fest-2024_en/Aboutwork_en/:id/:workId',
  //   name: 'Aboutwork_en',

  //   component: () => import(/* webpackChunkName: 'about' */ '../views/Aboutwork_en.vue'),

  // },
  // {
  //   path: '/Aboutwork',
  //   name: 'Aboutwork',
  //   component: () => import(/* webpackChunkName: 'about' */ '../views/Aboutwork.vue')
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: 'about' */ '../views/About.vue'),
  // },
  // {
  //   path: '/News',
  //   name: 'News',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: 'about' */ '../views/News.vue'),
  // },

  // {
  //   path: '/All',
  //   name: 'All',
  //   component: () => import(/* webpackChunkName: 'about' */ '../views/All.vue'),
  // },
  // {
  //   path: '/All_en',
  //   name: 'All_en',
  //   component: () => import(/* webpackChunkName: 'about' */ '../views/All_en.vue'),
  // },
  // {
  //   path: '/collection',
  //   name: 'Collection',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: 'about' */ '../views/Collection.vue'),
  // },
  {
    path: '/festival',
    name: 'festival',
    redirect: '/festival/2026'
  },
  {
    path: '/festival/2026',
    name: 'fvl-fest-2026',
    alias: ['/fvl-fest-2026', '/festival/fvl-fest-2026'],
    meta: {
      keepAlive: true,
      title: 'FUTURE VISION LAB 2026',
      metaTags: [
        {
          name: 'description',
          content: 'FUTURE VISION LAB 2026 結合創新科技與藝術，探索未來視覺可能性的沉浸式影音展演。'
        },
        {
          property: 'og:title',
          content: 'FUTURE VISION LAB 2026'
        },
        {
          property: 'og:description',
          content: 'FUTURE VISION LAB 2026 結合創新科技與藝術，探索未來視覺可能性的沉浸式影音展演。'
        },
        {
          property: 'og:type',
          content: 'website'
        }
      ]
    },
    // FvlFest2026.vue is under components, not views.
    component: () => import(/* webpackChunkName: 'fvl-fest-2026' */ '../components/Fvl2026Final.vue'),
  },
  // {
  //   path: '/portfolioDetil',
  //   name: 'PortfolioDetil',
  //   component: () => import( '../views/PortfolioDetil.vue') // 注意檔名也建議改正
  // },
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

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else {
    document.title = 'FUTURE VISION LAB'; // 預設標題
  }

  // 移除上一個路由留下的 SEO meta 標籤
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  if (!nearestWithMeta) return next();

  // 將 metaTags 內的屬性注入到 <head> 之中
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');
    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });
    // 加上自訂屬性以便下一次跳轉時能方便移除
    tag.setAttribute('data-vue-router-controlled', '');
    return tag;
  }).forEach(tag => document.head.appendChild(tag));

  next();
});

export default router;
