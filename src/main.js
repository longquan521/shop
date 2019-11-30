import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
// @符号指代src文件夹
import "@/assets/css/normalize.css"
import "@/assets/js/rem.js"
// 引入vant库 完全引入
// import Vant from 'vant';
// import 'vant/lib/index.css';

// Vue.use(Vant);



// 按需引入vant
import { Button, Icon, NavBar, Tabbar, TabbarItem, Swipe, SwipeItem, Lazyload } from 'vant';
// import { Icon } from 'vant';

Vue.use(Button).use(Icon).use(NavBar).use(Tabbar).use(TabbarItem).use(Swipe).use(SwipeItem).use(Lazyload)
// Vue.use(Icon);

import "@/mock/mock.js";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')