<template>
  <div class="box">
    <div class="search">
      <div class="mui-input-row search-in">
        <span class="title">
          <h3>书名</h3>
        </span>
        <div class="input-box">
          <span class="mui-icon mui-icon-search"></span>
          <input type="search" class="mui-input-clear" placeholder="请输入要搜索的书名:" ref="name" />
        </div>

        <!-- <router-link to="/list"> -->
        <mt-button class="serach-button" type="primary" size="small" @click="goSearchDetail">搜索</mt-button>

        <!-- </router-link> -->
      </div>
    </div>
    <div class="detail" v-for="item in this.recommendList" :key="item.id">
      <div class="detail-center">
        <div class="top">
          <div class="top-left">
            <router-link to="/ranking" tag="a">{{ item.type }}</router-link>
          </div>
          <div class="top-right">
            <router-link to="/ranking" tag="a">更多...</router-link>
          </div>
        </div>
        <div class="bottom">
          <div class="show">
            <div class="show-left">
              <a href="#">
                <img :src="item.picUrl" alt />
              </a>
            </div>
            <div class="show-right">
              <h3>
                <a @click="goDetail(item.bookName)">{{ item.bookName }}</a>
              </h3>

              <p>
                作者:
                <a @click="goAuthor(item.author)">{{ item.author }}</a>
              </p>
              <p>
                <a href="#">{{ item.showInfo }}</a>
              </p>
            </div>
          </div>
          <ul claass="list">
            <li v-for="ele in item.list" :key="ele.id">
              <a @click="goClassify(ele.classifyType)">{{ ele.classifyType }}</a>
              <a @click="goDetail(ele.bookName)">{{ ele.bookName }}</a>/
              <a @click="goAuthor(ele.author)">{{ ele.author }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import novel from './noveList'
//导入 mui.js 配置顶部导航条滑动
import mui from './../lib/mui/js/mui.min.js'

import { Toast } from 'mint-ui'

export default {
  data() {
    return {
      name: '',
      recommendList: [],
      NovelList: []
    }
  },
  created() {
    this.getRecommend()
  },
  methods: {
    //获取首页推荐
    getRecommend() {
      let homeList = sessionStorage.getItem('homeList')
      if (!homeList) {
        this.$http.get('recommend').then(function(result) {
          if (result.body.code === 200) {
            let list = result.body.message
            list.forEach(item => {
              if (item.classifyType === 1) {
                item.classifyType = '[玄幻]'
              } else if (item.classifyType === 2) {
                item.classifyType = '[修真]'
              } else if (item.classifyType === 3) {
                item.classifyType = '[都市]'
              } else if (item.classifyType === 4) {
                item.classifyType = '[历史]'
              } else if (item.classifyType === 5) {
                item.classifyType = '[游戏]'
              } else if (item.classifyType === 6) {
                item.classifyType = '[科幻]'
              }
            })
            let clickList = {
              picUrl: list[0].picUrl,
              author: list[0].author,
              bookName: list[0].bookName,
              showInfo: list[0].showInfo,
              list: list.slice(1, 10),
              type: '点击排行'
            }
            let recomList = {
              picUrl: list[10].picUrl,
              author: list[10].author,
              bookName: list[10].bookName,
              showInfo: list[10].showInfo,
              list: list.slice(11, 20),
              type: '推荐排行'
            }
            let collectList = {
              picUrl: list[20].picUrl,
              author: list[20].author,
              bookName: list[20].bookName,
              showInfo: list[20].showInfo,
              list: list.slice(21, 30),
              type: '收藏排行'
            }
            this.recommendList = [clickList, recomList, collectList]
            sessionStorage.setItem(
              'homeList',
              JSON.stringify(this.recommendList)
            )
          } else {
            Toast('请重新加载')
          }
        })
      } else {
        this.recommendList = JSON.parse(homeList)
      }
    },
    goSearchDetail() {
      let bookname = this.$refs.name.value
      if (bookname !== '') {
        this.goDetail(bookname)
      } else {
        Toast('书名不能为空')
      }
    },
    goDetail(bookName) {
      // this.$router.push('/novelDetail')

      this.$router.push({ path: '/novelDetail', query: { bookName } })
      // this.$router.push({ name: "goodsinfo", params: { id } });
    },
    getList(bookname) {
      this.$http
        .post('findNovel', { title: bookname }, { emulateJSON: true })
        .then(function(result) {
          if (result.body.code === 200) {
            this.list = result.body.message
            this.firstHref = this.list.newChapterHref
            let imgUrl = this.list.imgSrc
            setNovelHistory(bookname, this.firstHref, this.list)
            let flag = true
            this.goDetail()
          }
        })
    },
    goAuthor(author) {
      this.$router.push({ path: '/author', query: { author } })
    },
    goClassify(type) {
      this.$router.push({ path: '/classify', query: { type } })
    }
  }
}
</script>
<style lang="less">
.box {
  position: relative;

  .search {
    width: 100%;
    height: 5rem;
    position: absolute;
    top: 5rem;
    left: 0;
    padding: 0 2rem;
    box-sizing: border-box;
    background-color: #fff;
    .search-in {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      flex-wrap: nowrap;
      position: relative;
      top: 1rem;
      .input-box {
        height: 3rem;
        background: #ccc;
        margin: 0 1rem;
        border-radius: 0.5rem;
        span {
          // display: block;
          vertical-align: top;
          margin: 0.3rem;
        }
        .mui-input-clear {
          width: 80%;
          height: 3rem;
          background: none;
          margin-bottom: 0;
          padding-left: 0;
        }
      }
      .title {
        display: block;
        width: 6rem;
        height: 3rem;

        border: 1px solid #ccc;
        text-align: center;
        border-radius: 0.8rem;

        h3 {
          font-size: 1.8rem;
          font-weight: bold;
          white-space: nowrap;
        }
      }

      .serach-button {
        text-align: center;
        // padding: 0;
      }
    }
  }
  .detail {
    width: 100%;
    height: 50rem;
    box-sizing: border-box;
    position: relative;
    top: 10rem;
    left: 0;
    background: #fff;
    .detail-center {
      width: 100%;
      .top {
        width: 100%;
        height: 3rem;
        line-height: 3rem;
        display: flex;
        justify-content: space-between;
        // background-color: skyblue;
        border-bottom: 1px solid #ccc;
        background-color: #ecf0f0;

        .top-left {
          font-size: 1.6rem;
          font-weight: bold;
        }
        .top-right {
          font-size: 1.4rem;
        }
        a {
          color: #000;
        }
      }
      .bottom {
        width: 100%;
        padding: 0 1rem;
        .show {
          width: 100%;
          height: 10rem;
          .show-left {
            vertical-align: top;
            border: 0px;
            overflow: hidden;
            padding: 1rem 0;
            float: left;
            a {
              img {
                width: 8rem;
              }
            }
          }
          .show-right {
            height: 12rem;
            overflow: hidden;
            padding: 1rem 0 1rem 2rem;
            vertical-align: top;
            a {
              color: #333;
            }
            h3 {
              font-size: 1.5rem;
              // font-weight: bold;
            }
            p {
              margin-bottom: 0;
            }
          }
        }
        ul {
          list-style: none;
          width: 100%;
          float: left;
          padding-left: 0;
          li {
            height: 3.5rem;
            line-height: 3.5rem;
            border-bottom: 1px solid #ccc;
            a {
              color: #000;
            }
            a:nth-of-type(2) {
              color: #007bb1;
            }
          }
        }
      }
    }
  }
}
</style>
