import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Button,Toast,Search,Swipe,SwipeItem,ShareSheet,List,Circle} from 'vant'
Vue.use(Button)
Vue.use(Search)
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(ShareSheet);
Vue.use(List);
Vue.use(Circle);

Vue.config.productionTip = false
// 添加事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
