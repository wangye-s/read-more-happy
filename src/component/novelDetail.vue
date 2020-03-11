<template>
  <div class="detailBox">
    <div class="detail">
      <div class="detail-top">
        <div class="left-img">
          <img :src="this.novelDetail.imgSrc" alt />
        </div>
        <div class="right-info">
          <h3>{{ this.novelDetail.bookName }}</h3>
          <p>
            作者:
            <a href="#">{{ this.novelDetail.author }}</a>
          </p>
          <p>
            分类:
            <a href="#">玄幻小说</a>
          </p>
          <p>
            状态:
            <a href="#">连载中</a>
          </p>
          <p>
            更新:
            <a href="#">{{ this.novelDetail.lastTime }}</a>
          </p>
          <p>
            最新:
            <a href="#">{{ this.novelDetail.newChapter }}</a>
          </p>
        </div>
      </div>
      <div class="detail-bottom">
        <ul>
          <li>
            <p @click="down">合集下载</p>
          </li>
          <li>
            <p @click="postList(bookname)">查看目录</p>
          </li>
        </ul>
        <ul>
          <li>
            <p @click="addToRock()">加入书架</p>
          </li>
          <li>
            <p @click="recommend">推荐本书</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="info">
      <div class="info-top">
        <h4>小说简介</h4>
      </div>
      <div class="info-bottom">
        <p>{{ this.novelDetail.info }}</p>
      </div>
    </div>
    <div class="new-list">
      <div class="list-top">
        <h4>最新章节预览</h4>
      </div>
      <ul class="chapter-list">
        <li v-for="(item, i) in this.newList" :key="item.id">
          <router-link
            :to="{
              path: 'novelRead',
              query: { href: item.href, name: bookname, index: listLength - i }
            }"
            tag="a"
          >{{ item.chapter }}</router-link>
          <span></span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
import '../tools.js'
export default {
  data() {
    return {
      bookname: this.$route.query.bookName,
      novelDetail: [],
      newList: [],
      chapterList: [],
      firstHref: '',
      listLength: 0,
      listFlag: false
    }
  },
  created() {
    this.$store.commit('changeIndex', 0)
    //判断页面是否是第一次加载, 决定请求的接口
    if (document.cookie.indexOf('a=first') == -1) {
      Toast('内容还在路上~')
      this.updateDetail(this.bookname)
      var t = new Date(new Date().getTime() + 1000 * 60 * 60 * 24)
      document.cookie = 'a=first; expires=' + t.toGMTString()
    } else {
      this.getDetail(this.bookname)
    }
  },
  methods: {
    //获取详情
    getDetail(bookname) {
      this.$http
        .post('findNovel', { title: bookname }, { emulateJSON: true })
        .then(function(result) {
          this.novelDetail = result.body.message
          this.newList = this.novelDetail.newList.reverse()
          this.firstHref = this.novelDetail.firstHref
        })
    },
    //更新详情
    updateDetail(bookname) {
      this.$http
        .post('updateNovel', { title: bookname }, { emulateJSON: true })
        .then(function(result) {
          this.novelDetail = result.body.message
          this.newList = this.novelDetail.newList.reverse()
          this.firstHref = this.novelDetail.firstHref
        })
    },
    //获取所有章节
    getAllList(name) {
      this.$http
        .post('getAllChapter', { name: name }, { emulateJSON: true })
        .then(function(result) {
          this.chapterList = result.body.message
          this.listLength = this.chapterList.length
          setChapterList({
            chapterList: this.chapterList,
            bookName: this.bookname
          })
          this.listFlag = true
        })
    },
    //跳转到章节列表
    postList(bookName) {
      if (this.listFlag) {
        this.$router.push({ path: '/chapterList', query: { bookName } })
      } else {
        Toast('请稍等')
      }
    },
    //添加到书架
    addToRock() {
      if (this.novelDetail.author !== undefined) {
        setBookRack(
          this.novelDetail.imgSrc,
          this.novelDetail.bookName,
          this.novelDetail.newChapter,
          this.novelDetail.author,
          this.firstHref,
          this.chapterList,
          1
        )
        Toast('添加成功~')
        this.updateCollect()
      } else {
        Toast('请稍等')
      }
    },
    down() {
      Toast('暂未提供下载功能~')
    },
    recommend() {
      Toast('收到啦~')
      this.updateRecommend()
    },
    //更新点击次数
    updateClick() {
      this.$http
        .get('saveClick?bookName=' + this.bookname)
        .then(function(result) {
          if (result.body.code !== 200) {
            Toast('请刷新')
          }
        })
    },
    //更新收藏次数
    updateCollect() {
      this.$http
        .get('saveCollect?bookName=' + this.bookname)
        .then(function(result) {
          if (result.body.code !== 200) {
            Toast('请刷新')
          }
        })
    },
    //更新推荐次数
    updateRecommend() {
      this.$http
        .get('saveRecommend?bookName=' + this.bookname)
        .then(function(result) {
          if (result.body.code !== 200) {
            Toast('请刷新')
          }
        })
    }
  },
  mounted() {
    this.getAllList(this.bookname)
    this.updateClick()
  },
  updated() {}
}
</script>
<style lang="less" scoped>
.detailBox {
  width: 100%;

  padding: 2rem 1rem;
  box-sizing: border-box;
  background-color: #fff;
  position: absolute;
  top: 10rem;
  left: 0;
  .detail {
    width: 100%;
    height: 29rem;

    .detail-top {
      width: 100%;
      height: 15rem;
      // overflow: hidden;
      .left-img {
        width: 12rem;
        height: 100%;
        border: 1px solid #ccc;
        padding: 1rem;
        float: left;

        img {
          width: 10rem;
        }
      }
      .right-info {
        float: left;
        padding: 1rem 0 0 2rem;
        box-sizing: border-box;
        h3 {
          font-size: 1.7rem;
        }
        p {
          margin-bottom: 0;
          width: 20rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          a {
            padding: 0 0.5rem;
            box-sizing: border-box;
            color: #000;
          }
        }
      }
    }
    .detail-bottom {
      ul {
        list-style: none;
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
        padding: 0;
        li {
          width: 17.2rem;
          height: 5rem;
          background-color: #65bbec;
          border-radius: 0.5rem;
          margin-right: 1rem;
          p {
            font-size: 1.7rem;
            color: #fff;
            text-align: center;
            line-height: 5rem;
          }
        }
        li:last-child {
          margin-right: 0;
        }
      }
    }
  }
  .info {
    width: 100%;
    box-sizing: border-box;
    .info-top {
      border-bottom: 2px solid #65bbec;
      padding: 0.5rem;
      background-color: #ecf0f0;
      h4 {
        font-size: 1.7rem;
      }
    }
    .info-bottom {
      // margin-top: 1rem;
      padding: 1rem;

      p {
        font-size: 1.7rem;
        line-height: 2.5rem;
      }
    }
  }
  .new-list {
    width: 100%;
    box-sizing: border-box;
    .list-top {
      border-bottom: 2px solid #65bbec;
      padding: 0.5rem;
      background-color: #ecf0f0;
      h4 {
        font-size: 1.7rem;
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
        padding-left: 1rem;
        overflow: hidden;
        a {
          font-size: 1.7rem;
          color: #000;
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
  }
}
</style>
