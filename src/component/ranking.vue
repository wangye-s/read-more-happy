<template>
  <div class="RankContainer">
    <ul class="typeList">
      <li @click="goRankDetail(i)" v-for="(item,i) in this.ranklist" :key="item.id">{{ item }}</li>
    </ul>
    <div class="rank-list">
      <ul claass="list-in">
        <li v-for="item in this.list" :key="item.id">
          <p>
            <a @click="goClassify(item.classifyType)">{{ item.classifyType }}</a>
            <a @click="goDetail(item.bookName)">{{ item.bookName }}</a>/
            <a @click="goAuthor(item.author)">{{ item.author }}</a>
          </p>
        </li>
      </ul>
    </div>
    <div class="pagination">
      <button
        @click="goPre(rankIndex)"
        type="button"
        class="mui-btn mui-btn-primary mui-btn-outlined pre"
      >上一页</button>
      <button type="button" class="mui-btn select">第{{ this.rankIndex+1 }}页</button>
      <button
        @click="goNext(rankIndex)"
        type="button"
        class="mui-btn mui-btn-primary mui-btn-outlined next"
      >下一页</button>
    </div>
    <div class="gotoPage">
      <span>请输入页数:</span>
      <input type="number" class="page" v-model="pageVal" />
      <button @click="goto()" type="button" class="mui-btn mui-btn-outlined">跳转</button>
    </div>
    <div class="info">
      <p>
        (第
        <span>{{ this.rankIndex+1 }}</span>/200页)当前20条/页
      </p>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
import '../tools.js'
export default {
  data() {
    return {
      ranklist: ['总点击榜', '总收藏榜', '总推荐榜'],
      pageVal: '',
      list: [],
      page: 0,
      rankIndex: this.$store.state.rankIndex,
      rankType: this.$store.state.rankType
    }
  },
  created() {
    if (this.rankType === 0) {
      this.getClickRank(this.rankIndex)
    } else if (this.rankType === 1) {
      this.getCollectRank(this.rankIndex)
    } else if (this.rankType === 2) {
      this.getRecommendRank(this.rankIndex)
    }
  },
  methods: {
    //点击排行
    getClickRank(page) {
      this.list = []
      this.$http.get('getClickRank?page=' + page).then(function(result) {
        if (result.body.code === 200) {
          result.body.message.forEach(item => {
            this.changeCla(item)
          })
        } else {
          Toast('请重新加载')
        }
      })
    },
    //收藏排行
    getCollectRank(page) {
      this.list = []
      this.$http.get('getCollectRank?page=' + page).then(function(result) {
        if (result.body.code === 200) {
          result.body.message.forEach(item => {
            this.changeCla(item)
          })
        } else {
          Toast('请重新加载')
        }
      })
    },
    //推荐排行
    getRecommendRank(page) {
      this.list = []
      this.$http.get('getRecommendRank?page=' + page).then(function(result) {
        if (result.body.code === 200) {
          result.body.message.forEach(item => {
            this.changeCla(item)
          })
        } else {
          Toast('请重新加载')
        }
      })
    },
    //处理类型
    changeCla(item) {
      if (item.classifyType === 1) {
        item.classifyType = '[玄幻]'
        this.list.push(item)
      } else if (item.classifyType === 2) {
        item.classifyType = '[修真]'
        this.list.push(item)
      } else if (item.classifyType === 3) {
        item.classifyType = '[都市]'
        this.list.push(item)
      } else if (item.classifyType === 4) {
        item.classifyType = '[历史]'
        this.list.push(item)
      } else if (item.classifyType === 5) {
        item.classifyType = '[游戏]'
        this.list.push(item)
      } else if (item.classifyType === 6) {
        item.classifyType = '[科幻]'
        this.list.push(item)
      }
    },
    goRankDetail(i) {
      //改变背景颜色
      let $li = document.querySelectorAll('.typeList li')
      for (let j = 0; j < $li.length; j++) {
        $li[j].style.background = 'none'
      }
      $li[i].style.background = '#ccc'
      if (i === 0) {
        this.getClickRank(0)
      } else if (i === 1) {
        this.getCollectRank(0)
      } else if (i === 2) {
        this.getRecommendRank(0)
      }
      this.$store.commit('changeRankindex', 0)
      this.rankIndex = 0
      this.rankType = i
      this.$store.commit('changeRanktype', i)
    },
    goNext(i) {
      if (i < 199) {
        if (this.rankType === 0) {
          this.getClickRank((i += 1))
        } else if (this.rankType === 1) {
          this.getCollectRank((i += 1))
        } else if (this.rankType === 2) {
          this.getRecommendRank((i += 1))
        }
        this.rankIndex = i
        this.$store.commit('changeRankindex', i)
      } else {
        Toast('后面没有了')
      }
    },
    goPre(i) {
      if (i > 0) {
        if (this.rankType === 0) {
          this.getClickRank((i -= 1))
        } else if (this.rankType === 1) {
          this.getCollectRank((i -= 1))
        } else if (this.rankType === 2) {
          this.getRecommendRank((i -= 1))
        }

        this.rankIndex = i
        this.$store.commit('changeRankindex', i)
      } else {
        Toast('前面没有了')
      }
    },
    goto() {
      this.rankIndex = this.pageVal - 1
      if (this.rankType === 0) {
        this.getClickRank(this.rankIndex)
      } else if (this.rankType === 1) {
        this.getCollectRank(this.rankIndex)
      } else if (this.rankType === 2) {
        this.getRecommendRank(this.rankIndex)
      }
      this.$store.commit('changeRankindex', this.rankIndex)
      this.pageVal = ''
    },
    goClassify(type) {
      this.$router.push({ path: '/classify', query: { type } })
    },
    goDetail(bookName) {
      this.$router.push({ path: '/novelDetail', query: { bookName } })
    },
    goAuthor(author) {
      this.$router.push({ path: '/author', query: { author } })
    }
  },
  mounted() {
    let li = document.querySelector(
      '.typeList li:nth-of-type(' + (this.rankType + 1) + ')'
    )
    li.style.background = '#ccc'
  }
}
</script>
<style lang="less">
.RankContainer {
  width: 100%;
  height: 100%;
  position: relative;
  top: 5rem;
  .typeList {
    width: 100%;
    height: 7rem;
    list-style: none;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding-left: 0;
    li {
      width: 25%;
      height: 5rem;
      vertical-align: top;
      line-height: 5rem;
      border: 1px solid #ccc;
      text-align: center;
      margin: 1rem 4%;
    }
  }
  .rank-list {
    ul {
      list-style: none;
      width: 100%;
      float: left;
      // padding: 2rem 0;
      padding-left: 0;
      margin-bottom: 0;
      li {
        height: 3.5rem;
        line-height: 3.5rem;
        border-bottom: 1px solid #ccc;
        padding-left: 2rem;
        p {
          font-size: 1.7rem;
          width: 90%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          a {
            color: #000;
          }
          a:nth-of-type(2) {
            color: #007bb1;
          }
          &.active {
            background: rgba(0, 0, 0, 0.5);
          }
        }
      }
    }
  }
  .pagination {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    padding: 2rem 1rem 1rem 1rem;
    button {
      flex: 1;
      margin-left: 1rem;
    }
  }
  .gotoPage {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    padding: 0 5rem;
    box-sizing: border-box;
    height: 5rem;
    line-height: 5rem;
    span {
      color: #666;
    }
    .page {
      width: 30%;
      height: 3rem;
      margin: 0 1rem;
      position: relative;
      top: 1rem;
    }
    .mui-btn {
      width: 5rem;
      height: 3rem;
      position: relative;
      top: 1rem;
    }
  }
  .info {
    text-align: center;
  }
}
</style>