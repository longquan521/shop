import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
// @符号指代src文件夹
import "@/assets/css/normalize.css"
import "@/assets/js/rem.js"
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
