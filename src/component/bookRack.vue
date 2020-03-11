<template>
  <div class="bookRackCon">
    <ul class="bookRack-in">
      <li
        v-for="(item, index) in this.collectList"
        :key="item.id"
        @click="goRead(item.lastRead, item.bookName)"
      >
        <div class="rack-left">
          <img :src="item.imgSrc" alt />
        </div>
        <div class="rack-right">
          <div class="right-in">
            <h4>
              <a>{{ item.bookName }}</a>
            </h4>
            <p>
              <a href="#">{{ item.author }}</a>
            </p>
            <p>
              <a href="#">最新章节-{{ item.newChapter }}</a>
            </p>
          </div>
          <div class="menu">
            <span
              @click.stop="showMemu()"
              v-show="flag"
              class="sele mui-icon mui-icon-bars"
            ></span>
            <span
              @click.stop="dele(item.bookName, index)"
              v-show="!flag"
              class="del mui-icon mui-icon-trash"
            ></span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import '../tools.js'
export default {
  data() {
    return {
      collectList: [],
      flag: true
    }
  },
  created() {
    this.collectList = getBookRack()
  },
  methods: {
    goRead(href, name) {
      this.$router.push({ path: '/novelRead', query: { href, name } })
    },
    showMemu() {
      this.flag = false
    },
    dele(name, index) {
      clearRack(name)
      this.flag = true
      this.collectList = getBookRack()
    }
  }
}
</script>
<style lang="less">
.bookRackCon {
  width: 100%;
  height: 100%;
  background: #fff;
  position: absolute;
  top: 10rem;
  left: 0;
  .bookRack-in {
    width: 100%;
    list-style: none;
    padding: 0;
    li {
      width: 100%;
      height: 8.5rem;
      margin: 1rem 0;

      .rack-left {
        width: 8rem;
        height: 8.5rem;
        float: left;
        img {
          width: 6rem;
          height: 7.5rem;
          vertical-align: top;
          position: relative;
          top: 0.5rem;
          left: 1rem;
        }
      }
      .rack-right {
        height: 100%;
        overflow: hidden;
        padding: 1rem 0 1rem 1rem;
        box-sizing: border-box;
        vertical-align: top;
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
        .right-in {
          a {
            color: #666;
          }
          h4 {
            font-size: 1.5rem;
            a {
              color: #000;
            }
          }
          p {
            margin-bottom: 0;
          }
          p:nth-of-type(2) {
            width: 25rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .menu {
          .sele {
            display: block;
            width: 2.4rem;
            height: 2.4rem;
            position: relative;
            top: 1.5rem;
            right: 1.5rem;
          }
          .del {
            display: block;
            width: 2.4rem;
            height: 2.4rem;
            position: relative;
            top: 1.5rem;
            right: 1.5rem;
          }
        }
      }
    }
  }
}
</style>
