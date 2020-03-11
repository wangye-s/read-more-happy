<template>
  <div class="classify">
    <div class="classify-in">
      <ul>
        <li
          v-for="(item, index) in this.typeName"
          :key="item.id"
          @click="getClassify(index + 1, 0)"
        >{{ item }}</li>
      </ul>
    </div>
    <div class="classify-list">
      <ul claass="list">
        <li v-for="item in this.list" :key="item.id">
          <p>
            <a href="#">{{ item.type }}</a>
            <a @click="goDetail(item.msg.bookName)">{{ item.msg.bookName }}</a>/
            <a @click="goAuthor(item.msg.author)">{{ item.msg.author }}</a>
          </p>
        </li>
      </ul>
    </div>
    <div class="pagination">
      <button
        @click="goPre(page)"
        type="button"
        class="mui-btn mui-btn-primary mui-btn-outlined pre"
      >上一页</button>
      <button type="button" class="mui-btn select">第{{ this.page + 1 }}页</button>
      <button
        @click="goNext(page)"
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
        <span>{{ this.page+1 }}</span>/200页)当前20条/页
      </p>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      list: [],
      typeName: [
        '玄幻小说',
        '修真小说',
        '都市小说',
        '历史小说',
        '游戏小说',
        '科幻小说'
      ],
      // typeName: ['历史小说', '游戏小说', '科幻小说'],
      typeNum: 1,
      page: this.$store.state.classifyIndex,
      type: this.$store.state.type,
      pageVal: ''
    }
  },
  created() {
    let bookType = this.$route.query.type
    if (bookType === '[玄幻]') {
      this.type = 1
    } else if (bookType === '[修真]') {
      this.type = 2
    } else if (bookType === '[都市]') {
      this.type = 3
    } else if (bookType === '[历史]') {
      this.type = 4
    } else if (bookType === '[游戏]') {
      this.type = 5
    } else if (bookType === '[科幻]') {
      this.type = 6
    }
  },
  methods: {
    getClassify(type, page) {
      if (page === 0) {
        this.page = 0
        this.$store.commit('changeClassifyIndex', 0)
      }
      //选中改变背景颜色
      let $li = document.querySelectorAll('.classify-in li')
      for (let i = 0; i < $li.length; i++) {
        $li[i].style.background = 'none'
      }
      $li[type - 1].style.background = '#ccc'
      this.list = []
      this.$http
        .get('classify?type=' + type + '&page=' + page)
        .then(function(result) {
          if (result.body.code === 200) {
            let classifyType = result.body.message[0].classifyType
            if (classifyType === 1) {
              result.body.message.forEach(item => {
                this.list.push({
                  msg: item,
                  type: '[玄幻]'
                })
              })
              this.typeNum = 1
            } else if (classifyType === 2) {
              result.body.message.forEach(item => {
                this.list.push({
                  msg: item,
                  type: '[修真]'
                })
              })
              this.typeNum = 2
            } else if (classifyType === 3) {
              result.body.message.forEach(item => {
                this.list.push({
                  msg: item,
                  type: '[都市]'
                })
              })
              this.typeNum = 3
            } else if (classifyType === 4) {
              result.body.message.forEach(item => {
                this.list.push({
                  msg: item,
                  type: '[历史]'
                })
              })
              this.typeNum = 4
            } else if (classifyType === 5) {
              result.body.message.forEach(item => {
                this.list.push({
                  msg: item,
                  type: '[游戏]'
                })
              })
              this.typeNum = 5
            } else if (classifyType === 6) {
              result.body.message.forEach(item => {
                this.list.push({
                  msg: item,
                  type: '[科幻]'
                })
              })
              this.typeNum = 6
            }
          } else {
            Toast('请重新加载')
          }
        })
      this.$store.commit('changeType', type)
    },
    goNext(i) {
      this.type = this.$store.state.type
      this.getClassify(this.type, (i += 1))
      this.page = i
      this.$store.commit('changeClassifyIndex', i)
    },
    goPre(i) {
      if (i > 0) {
        this.type = this.$store.state.type
        this.getClassify(this.type, (i -= 1))
        this.page = i
        this.$store.commit('changeClassifyIndex', i)
      } else {
        Toast('前面没有了')
      }
    },
    goto() {
      this.page = this.pageVal - 1
      this.type = this.$store.state.type
      this.getClassify(this.type, this.page)
      this.pageVal = ''
      this.$store.commit('changeClassifyIndex', i)
    },
    goDetail(bookName) {
      this.$router.push({ path: '/novelDetail', query: { bookName } })
    },
    goAuthor(author) {
      this.$router.push({ path: '/author', query: { author } })
    }
  },
  mounted() {
    this.getClassify(this.type, this.page)
  }
}
</script>

<style lang="less" scoped>
.classify {
  background-color: #fff;
  width: 100%;
  position: absolute;
  left: 0;
  top: 10rem;
  .classify-in {
    width: 100%;
    ul {
      list-style: none;
      padding: 0.5rem;
      display: flex;
      flex-wrap: wrap;
      margin: 0;
      li {
        display: block;
        margin: 1rem 3.5%;
        width: 26%;
        height: 5rem;
        border: 1px solid #ccc;
        text-align: center;
        line-height: 5rem;
      }
    }
  }
  .classify-list {
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
