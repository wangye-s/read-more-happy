<template>
  <div class="read-box" ref="read">
    <div class="nav">
      <a @click="nextPre(preHref)">上一章</a>
      <a @click="nextPre(nextHref)">下一章</a>
    </div>
    <div class="title">
      <h2>{{ this.title }}</h2>
    </div>
    <div class="content">
      <p v-html="this.text"></p>
    </div>

    <div class="nav-bottom">
      <a @click="nextPre(preHref)">上一章</a>
      <a @click="nextPre(nextHref)">下一章</a>
    </div>
  </div>
</template>

<script>
//点击对应的小说章节, 获取对应的小说章节的链接和章节标题
//
import { Toast } from 'mint-ui'
import './../tools'
export default {
  data() {
    return {
      text: '',
      preHref: '',
      nextHref: '',
      title: ''
    }
  },
  created() {
    this.getDetail(this.$route.query.href)
  },
  methods: {
    getDetail(href) {
      this.$http.get('getChapter?href=' + href).then(function(result) {
        this.text = result.body.message
        this.preHref = result.body.preHref
        this.nextHref = result.body.nextHref
        this.title = result.body.title
      })
      //更新localStorage 中的数据, 记录上次阅读的位置
      updataBookRack(this.$route.query.name, href)
    },
    nextPre(href) {
      this.getDetail(href)
      //回到顶部
      let content = document.querySelector('.header')
      // console.log(content)
      content.scrollIntoView()
    }
  },
  mounted() {
    this.$refs.read.style.height = window.innerHeight / 10 + 'rem' //动态设置HTML元素高度
  },
  updated() {
    this.$refs.read.style.height = '100%'
  }
}
</script>

<style lang="less">
.read-box {
  padding: 4rem 2rem 4rem 2rem;
  box-sizing: border-box;
  background: url('../images/chapter-default-bg.png');
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-size: 16px;
  .title {
    h2 {
      font-size: 1.8rem;
      text-align: center;
    }
  }
  .content {
    p {
      line-height: 150%;
      text-align: left;
      text-indent: 2em;
      // overflow-wrap: break-word;
      font-family: 'Microsoft Yahei', Georgia, Serif;
      font-size: 1.8rem;
      padding: 1.5rem 0;
      color: #666;
      letter-spacing: 0.2em;
    }
  }

  .nav {
    display: flex;
    justify-content: space-between;
    a {
      direction: none;
    }
  }
  .nav-bottom {
    display: flex;
    justify-content: space-between;
    position: relative;
    bottom: 1rem;
    left: 0;
    a {
      direction: none;
    }
  }
}
</style>
