<template>
  <div class="read-box" ref="read" @scroll="getScroll($event)">
    <div class="contentBox" v-for="item in this.contentList" :key="item.id">
      <div class="title">
        <h2>{{ item.title }}</h2>
      </div>
      <div class="content">
        <p v-html="item.text"></p>
      </div>
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
      title: '',
      flag: true,
      contentList: [],
      bookName: this.$route.query.name,
      chapterList: [],
      index: this.$route.query.index + 1, //记录从章节列表点击过来的索引 从0开始
      recIndex: this.$route.query.index + 1
    }
  },
  created() {
    this.index =
      this.$route.query.index + 1 || getRackBookList(this.bookName)[0].index
    this.recIndex = this.index
    this.getDetail(this.$route.query.href)
    this.chapterList =
      getChapterList(this.bookName)[0].chapterList ||
      getRackBookList(this.bookName)[0].chapterList
  },
  methods: {
    getDetail(href) {
      this.$http.get('getChapter?href=' + href).then(function(result) {
        this.contentList.push({
          text: result.body.message,
          title: result.body.title
        })

        this.preHref = result.body.preHref
        this.nextHref = result.body.nextHref
        this.flag = true
      })
      //更新localStorage 中的数据, 记录上次阅读的位置
      updataBookRack(this.$route.query.name, href, this.recIndex)
    },
    //获取更多
    getMoreDetail(i) {
      let newList = []
      this.chapterList.splice(i, 2).forEach(item => {
        newList.push(item.href)
      })
      this.$http.get('testChapter?urls=' + newList).then(result => {
        result.body.forEach(ele => {
          this.contentList.push({
            text: ele.text,
            title: ele.title
          })
          this.preHref = ele.preHref
          this.nextHref = ele.nextHref
          this.flag = true
        })

        updataBookRack(
          this.$route.query.name,
          result.body[1].preHref,
          (this.recIndex += 1)
        )
        // console.log(this.recIndex)
      })
    },
    nextPre(href) {
      this.getDetail(href)
      //回到顶部
      let content = document.querySelector('.header')

      content.scrollIntoView()
    },
    getScroll(e) {
      if (
        e.srcElement.scrollTop + e.srcElement.offsetHeight >
          e.srcElement.scrollHeight - 100 &&
        this.flag
      ) {
        this.flag = false

        this.getMoreDetail(this.index)
      }
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
  position: fixed;
  top: 5rem;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  .contentBox {
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
