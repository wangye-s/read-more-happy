<template>
  <div class="app-container">
    <!-- 头部 -->
    <div class="header">
      <div class="left">
        <router-link to="/" tag="a" class="title" v-show="!flag">畅享阅读</router-link>
        <span class="mui-icon mui-icon-back">
          <a class="back" v-show="flag" @click="getBack">返回</a>
        </span>
      </div>
      <div class="middle">
        <h1>分类列表</h1>
      </div>
      <div class="right">
        <div class="last" v-show="status">
          <!-- <router-link class="login" tag="a" to="/login">首页</router-link> -->
          <a :style="{'color': '#26a2ff'}">{{ this.userName }}</a>
          <a class="back" @click="back">退出</a>
          <!-- <router-link  tag="a" to="/login">退出</router-link> -->
        </div>

        <div class="first" v-show="!status">
          <router-link class="login" tag="a" to="/login">登录</router-link>
          <router-link class="register" tag="a" to="/register">注册</router-link>
        </div>
      </div>
    </div>
    <div class="nav" v-show="navFlag">
      <ul>
        <router-link class="home" to="/" tag="li">首页</router-link>
        <routerLink to="/classify" tag="li" class="classify">分类</routerLink>
        <routerLink to="/ranking" tag="li" class="ranking">排行</routerLink>
        <routerLink to="/bookRack" tag="li" class="bookRack">书架</routerLink>
      </ul>
    </div>
    <!-- 中间的 路由 router-view 区域 -->

    <transition>
      <router-view></router-view>
    </transition>

    <!-- 底部 -->
  </div>
</template>

<script>
import './tools.js'
export default {
  data() {
    return {
      navFlag: true,
      flag: false,
      status: false,
      userName: ''
    }
  },
  created() {
    document.body.removeChild(document.getElementById('Loading'))
    //当页面一加载时, 判断路由是否为 /home
    this.flag = this.$route.path === '/home' ? false : true
    this.navFlag = this.$route.path === '/novelRead' ? false : true
    if (getStatus()) {
      this.status = getStatus()[0]
      this.userName = getStatus()[1]
    }
  },
  methods: {
    //点击后退
    getBack() {
      this.$router.go(-1)
    },
    //退出登录状态
    back() {
      // this.$store.commit('changeStatus', false)
      clearStatus()
      // this.status = getStatus()
      this.$router.push('/login')
    },
    //重置分类状态
    resetClassify() {
      this.$store.commit('changeType', 1)
      this.$store.commit('changeClassifyIndex', 0)
    },
    //重置排行状态
    resetRank() {
      this.$store.commit('changeRankindex', 0)
      this.$store.commit('changeRanktype', 0)
    }
  },
  mounted() {
    // this.userName = this.$store.state.userName
  },
  updated() {
    if (!getStatus()) {
      this.status = false
    } else {
      this.status = getStatus()[0]
      this.userName = getStatus()[1]
    }
  },

  watch: {
    //监听路由地址的变化
    '$route.path': function(newVal) {
      if (newVal == '/home') {
        this.navFlag = true
        this.flag = false
        this.resetClassify()
        this.resetRank()
      } else if (newVal == '/novelRead') {
        this.navFlag = false
        this.flag = true
      } else if (newVal == '/classify') {
        this.navFlag = true
        this.flag = true
        this.resetRank()
      } else if (newVal == '/ranking') {
        this.navFlag = true
        this.flag = true
        this.resetClassify()
      } else {
        this.navFlag = true
        this.flag = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
// scoped 是vue 防止单页面样式污染的
.app-container {
  width: 100%;
  height: 100%;
  .header {
    width: 100%;
    height: 5rem;
    background-color: skyblue;
    display: flex;
    justify-content: space-between;
    padding: 0 2rem 0 0;

    a {
      text-decoration: none;
      color: #fff;
    }
    .left {
      height: 100%;
      line-height: 5rem;
      .title {
        display: block;
        padding-left: 1rem;
      }
      span {
        display: block;
        height: 2.8rem;
        line-height: 2.8rem;
        width: 7rem;
        text-align: center;
        position: relative;
        top: 1.1rem;
        a {
          font-size: 1.6rem;
        }
      }
    }
    .middle {
      height: 100%;
      display: none;
      h1 {
        height: 100%;
        vertical-align: top;
        text-align: center;
        font-size: 2rem;
        line-height: 4rem;
      }
    }
    .right {
      height: 100%;
      line-height: 5rem;
    }
  }
  .nav {
    width: 100%;
    padding: 0 3rem;
    box-sizing: border-box;
    height: 5rem;
    position: absolute;
    left: 0;
    top: 5rem;
    z-index: 888;
    border-bottom: 1px solid #ccc;
    background-color: #ecf0f0;
    ul {
      width: 100%;
      list-style: none;
      display: flex;
      justify-content: flex-start;
      flex-wrap: nowrap;
      padding-left: 0;

      li {
        width: 7.9rem;
        font-size: 1.7rem;
        text-align: center;
        white-space: nowrap;
      }
    }
  }
}
//页面滑动动画
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
</style>
