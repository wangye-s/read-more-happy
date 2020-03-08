import VueRouter from 'vue-router'

import home from './component/home.vue'
import novelRead from './component/novelRead.vue'
import novelDetail from './component/novelDetail.vue'
import chapterList from './component/chapterList.vue'
import classify from './component/classify.vue'
import ranking from './component/ranking.vue'
import bookRack from './component/bookRack.vue'
import author from './component/author.vue'
import login from './component/login.vue'
import register from './component/register.vue'

//引入自定义的组件

// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    //配置路由规则
    { path: '/', redirect: '/home' },
    // { path: '/home', component: homeComponent },

    { path: '/home', component: home },
    { path: '/novelRead', name: 'novelRead', component: novelRead },
    { path: '/novelDetail', component: novelDetail },
    { path: '/chapterList', name: 'chapterList', component: chapterList },
    { path: '/classify', name: 'classify', component: classify },
    { path: '/ranking', name: 'ranking', component: ranking },
    { path: '/bookRack', name: 'bookRack', component: bookRack },
    { path: '/author', name: 'author', component: author },
    { path: '/login', name: 'login', component: login },
    { path: '/register', name: 'register', component: register }
  ],
  linkActiveClass: 'mui-active' //覆盖默认的设置路由高亮的类
})

// 把路由对象暴露出去
export default router
