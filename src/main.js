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
import {
  SubmitBar, GoodsAction, GoodsActionIcon, GoodsActionButton, PullRefresh, List, Row, Col, Toast, CellGroup, Button, Icon, NavBar, Tabbar, TabbarItem, Swipe, SwipeItem, Lazyload, Tab, Tabs, Field, Card
} from 'vant';

Vue.use(CellGroup).use(Button).use(Icon).use(NavBar).use(Tabbar).use(TabbarItem).use(Swipe).use(SwipeItem).use(Lazyload).use(Tab).use(Tabs).use(Field).use(Toast).use(Row).use(Col).use(List).use(PullRefresh).use(GoodsAction).use(GoodsActionIcon).use(GoodsActionButton).use(Card).use(SubmitBar)

import "@/mock/mock.js";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
