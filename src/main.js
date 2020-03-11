// 入口文件
import Vue from 'vue'
// 1.1 导入路由的包
import VueRouter from 'vue-router'

//2.3 导入vuex
import Vuex from 'vuex'
//挂载vuex
Vue.use(Vuex)

//创建一个实例对象
const store = new Vuex.Store({
  state: {
    index: 0,
    type: 1, //分类类别
    classifyIndex: 0, //分类页序
    status: false, //登陆状态
    rankIndex: 0,
    rankType: 0, //排行类别
    userName: ''
  },
  mutations: {
    changeIndex(state, index) {
      state.index = index
    },
    changeType(state, type) {
      state.type = type
    },
    changeStatus(state, status) {
      state.status = status
    },
    changeRankindex(state, index) {
      state.rankIndex = index
    },
    changeRanktype(state, type) {
      state.rankType = type
    },
    changeClassifyIndex(state, index) {
      state.classifyIndex = index
    },
    changeUserName(state, username) {
      state.userName = username
    }
  },
  getters: {}
})

// 1.2 安装路由
Vue.use(VueRouter)

//导入格式化时间的插件
import moment from 'moment'
//定义一个全局的时间过滤器
Vue.filter('dataFormat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

//2.1 导入 vue-resource
import vueResource from 'vue-resource'
//2.2 安装vue-resource
Vue.use(vueResource)
// 设置请求的根路径
Vue.http.options.root = 'http://www.yjste.cn:5888/'
// 全局设置 post 时候表单数据格式组织形式   application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true

//导入 Mui 的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 按需导入 Mint-UI 中的组件
import { Header, Button, Field } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
Vue.component(Field.name, Field)

//导入ISCROLL
import IScrollView from 'vue-iscroll-view'
import IScroll from 'iscroll'
Vue.use(IScrollView, IScroll)

// import MintUI from 'mint-ui'
// Vue.use(MintUI)

// //导入分页插件
// import Pagination from 'vue-pagination-2'
// //注册
// Vue.component('pagination', Pagination)

//1.3 导入自己的 router.js 路由模块
import router from './router'

//导入 App 根组件
import app from './App.vue'

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router, //1.4 挂载路由
  store // 挂载vuex.store 实例
})
