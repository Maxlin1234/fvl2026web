/* eslint-disable new-cap */
/* eslint-disable quotes */
// eslint-disable-next-line quotes
import createApp from "vue";
import App from "./App.vue";
import router from "./router";
import Buefy from 'buefy';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import '../style.css';
import store from './store';

createApp.use(Buefy, {
  defaultIconPack: 'fa',
});
createApp.config.productionTip = false;

new createApp({
  el: "#app",
  router,
  axios,
  store,
  render: (h)=> h(App),
}).$mount('#app');
