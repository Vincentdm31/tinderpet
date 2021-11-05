import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import store from './store/index';
import 'axentix/dist/css/axentix.min.css';
import 'axentix/dist/js/axentix.min.js';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
