<template>
  <div class="author-book">
    <ul>
      <li v-for="ele in this.novelList" :key="ele.id">
        <a href="#">{{ ele.novelType }}</a>
        <a @click="goDetail(ele.bookName)">{{ ele.bookName }}</a>/
        <a>{{ ele.author }}</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      novelList: []
    }
  },
  created() {
    this.getAuthor(this.$route.query.author)
  },
  methods: {
    getAuthor(author) {
      this.$http.get('findAuthor?author=' + author).then(function(result) {
        if (result.body.code === 200) {
          this.novelList = result.body.message
        }
      })
    },
    goDetail(bookName) {
      this.$router.push({ path: '/novelDetail', query: { bookName } })
    }
  }
}
</script>
<style lang="less">
.author-book {
  position: relative;
  top: 5rem;
  left: 0;
  width: 100%;
  height: 100%;
  // background-color: #fff;
  ul {
    list-style: none;
    width: 100%;
    float: left;
    padding-left: 0;

    li {
      height: 3.5rem;
      line-height: 3.5rem;
      border-bottom: 1px solid #ccc;
      padding: 0 2rem;
      box-sizing: border-box;
      a {
        color: #000;
      }
      a:nth-of-type(2) {
        color: #007bb1;
      }
    }
  }
}
</style>