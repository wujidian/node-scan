import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

Vue.config.productionTip = true;
Vue.use(VueAwesomeSwiper)
// ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 全局css
import '@/assets/css/comm.css'

// api
import Axios from 'axios'
import api from './axios/api'
Vue.prototype.$api = api;
Axios.defaults.withCredentials = true;



// filter
import filters from './utils/filter';
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})


// 复制
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

// veux
import store from './store'


// Base64加密解密
import Base64 from './utils/base64.js'
Vue.prototype.$Base64 = Base64;

window.vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
