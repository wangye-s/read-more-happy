<template>
  <div class="list">
    <div class="list-header">
      <h2>{{ this.bookName }}</h2>
      <!-- <span>
        <a @click="positive">[正序]</a>
        <a @click="inverted">[倒序]</a>
      </span>-->
    </div>
    <ul class="chapter-list">
      <router-link
        :to="{
          path: 'novelRead',
          query: { href: item.href, name: bookName, index:  (recIndex + index)} //0-24  25-59   1 2 3 4 index+(page-1)*25
        }"
        v-for="(item, index) in this.sliceList"
        :key="item.id"
        tag="li"
      >
        <p>{{ item.chapter }}</p>
        <span></span>
      </router-link>
    </ul>
    <div class="pagination">
      <button type="button" class="mui-btn mui-btn-primary mui-btn-outlined pre" @click="pre()">上一页</button>
      <button type="button" class="mui-btn select" @click="show">第{{ this.page }}页</button>
      <button
        type="button"
        class="mui-btn mui-btn-primary mui-btn-outlined next"
        @click="next()"
      >下一页</button>
    </div>
    <div class="mask-in" v-show="showFlag">
      <div class="mask-hide" @click="hide"></div>
      <div class="mask-top">
        <p>目录</p>
      </div>

      <ul>
        <li
          @click="gotoPage(i)"
          v-for="(item, i) in this.slicePage"
          :key="item.id"
        >第{{ item.first }}章 - 第{{ item.last }}章</li>
      </ul>
    </div>
  </div>
</template>
<script>
import './../tools.js'

import { Toast } from 'mint-ui'

export default {
  data() {
    return {
      bookName: this.$route.query.bookName,
      chapterList: [], //章节列表
      sliceList: [], //每一页的章节列表
      page: 1, //当前页数
      showFlag: false,
      slicePage: [],
      sortFlag: this.$store.state.sortFlag, //判断正序逆序
      recIndex: 0, //给阅读界面传递章节对应的索引
      chapterLength: 0
    }
  },
  created() {
    // 整个列表的长度 点击单页列表, 记录对应的索引
    //传递到阅读界面, 阅读模块将传递过去的索引保存
    this.chapterList = getChapterList(this.bookName)[0].chapterList
    this.chapterLength = this.chapterList.length

    this.sliceList = this.reduceChapter(this.$store.state.index)
    this.page = this.$store.state.index / 25 + 1
    this.recIndex = (this.page - 1) * 25
  },
  methods: {
    //处理章节分页
    //1.得到给定数组的长度,每页 25 条数据, 计算共有多少页
    //2.根据传递的页号截取数组中对应的数据, 每次截取25条 0 0-24 1 25-49
    // 2 (i - 1)*5
    reduceChapter(i) {
      let cList = this.chapterList.slice(i, i + 25)
      return cList
    },
    next() {
      let index = this.$store.state.index
      if (this.page < Math.ceil(this.chapterList.length / 25)) {
        this.sortFlag = this.$store.state.sortFlag

        this.$store.commit('changeIndex', index + 25)
        this.sliceList = this.reduceChapter(this.$store.state.index)
        this.page += 1
        let content = document.querySelector('.header')
        content.scrollIntoView()
        this.recIndex = (this.page - 1) * 25
      } else {
        Toast('后面没有了')
      }
    },
    pre() {
      let index = this.$store.state.index
      if (index > 0) {
        this.$store.commit('changeIndex', index - 25)
        let content = document.querySelector('.header')
        content.scrollIntoView()
        this.sliceList = this.reduceChapter(this.$store.state.index)
        this.page -= 1
        this.recIndex = (this.page - 1) * 25
      } else {
        Toast('前面没有了~')
      }
    },
    getText(href) {
      this.$router.push({ path: '/novelRead', query: { href } })
    },
    show() {
      this.reducePages()
      if (this.showFlag === false) {
        this.showFlag = true
      }
    },
    hide() {
      if (this.showFlag === true) {
        this.showFlag = false
      }
    },
    reducePages() {
      let pages = Math.ceil(this.chapterList.length / 25) // 1 25 26 50 51 75
      for (let i = 0; i < pages; i++) {
        this.slicePage.push({
          first: i * 25 + 1,
          last: (i + 1) * 25
        })
      }
    },
    gotoPage(index) {
      this.page = index + 1
      this.$store.commit('changeIndex', index * 25)
      this.sliceList = this.reduceChapter(this.$store.state.index)
      this.showFlag = false
      this.recIndex = (this.page - 1) * 25
    }
  }
}
</script>

<style lang="less">
.list {
  width: 100%;
  background-color: #fff;
  position: absolute;
  top: 10rem;
  left: 0;
  .list-header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    padding: 0 1rem;
    box-sizing: border-box;
    h2 {
      font-size: 2.2rem;
      height: 5rem;
      line-height: 5rem;
      // text-align: center;
    }
    span {
      height: 5rem;
      line-height: 5rem;
      a {
        color: #f00;
      }
    }
  }
  .chapter-list {
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      width: 100%;
      height: 4rem;
      border-bottom: 1px solid #ccc;
      line-height: 4rem;
      padding: 0 1rem 0 2rem;
      box-sizing: border-box;
      p {
        display: inline-block;
        font-size: 1.7rem;
        color: #000;
        width: 80%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 0;
      }
      span {
        background: url('../images/jiantou.png') no-repeat scroll 0 0
          transparent;
        display: block;
        float: right;
        height: 2rem;
        margin-right: 1rem;
        margin-top: 1rem;
        width: 1.4rem;
      }
    }
  }
  .pagination {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    padding: 2rem 1rem;
    button {
      flex: 1;
      margin-left: 1rem;
    }
  }
  .mask-in {
    display: block;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 997;
    position: fixed;
    top: 0;
    left: 0;
    .mask-hide {
      width: 100%;
      height: 44%;
    }
    .mask-top {
      width: 100%;
      height: 5rem;
      background-color: #fff;
      line-height: 5rem;
      padding-left: 2rem;
      margin: 0;
      border-top-left-radius: 2rem;
      border-top-right-radius: 2rem;
      position: absolute;
      bottom: 50%;
      left: 0;
      border-bottom: 1px solid #ccc;
      box-sizing: border-box;
      p {
        font-size: 1.8rem;
        font-weight: bold;
        color: #000;
      }
    }
    ul {
      list-style: none;
      width: 100%;
      height: 50%;
      background-color: #fff;
      position: absolute;
      margin: 0;
      padding: 0;
      bottom: 0;
      left: 0;
      overflow: auto;
      li {
        width: 100%;
        height: 5rem;
        line-height: 5rem;
        font-size: 1.6rem;
        padding-left: 2rem;
      }
    }
  }
}
</style>
