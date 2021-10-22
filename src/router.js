import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'login',
      redirect: '/login'
    },
    {
      path: '/login', //登录
      // name: 'login',
      component: () => import('./views/login/login.vue'),

    },
    {
      path: '/profile', //我的
      // name: 'Home',
      component: () => import('./views/Profile/Profile.vue')
      
    },
    {
      path: '/find', //发现
      component: () => import('./views/Find/Find.vue'),
      meta: { keepAlive: true }
    },
    {
      path: '/other', //其他
      component: () => import('./views/Other/Other.vue')
    },
    {
      path: '/voide', //视频
      component: () => import('./views/Voide/Voide.vue')
    },
    {
      path:'/detail', //详情页
      // name:'detail',
      component:() => import('./views/Detail/Detail.vue')
    },
    {
      path:'/search', //搜索
      component:() => import('./components/content/Search/Search.vue')
    },
    {
      path:'/comment', //评论 
      component:() => import('./components/common/Comment.vue')
    }
  ]
})