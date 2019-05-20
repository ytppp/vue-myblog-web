<template>
  <div class="container">
    <header-con></header-con>
    <div class="main">
      <a-tabs defaultActiveKey="1" tabPosition="left" @prevClick="callback" @nextClick="callback">
        <a-tab-pane tab="我点赞的文章" key="1">Content of tab 1</a-tab-pane>
        <a-tab-pane tab="我评论的文章" key="2">Content of tab 2</a-tab-pane>
        <a-tab-pane tab="我收藏的文章" key="3">Content of tab 3</a-tab-pane>
        <a-tab-pane tab="个人信息设置" key="4">Content of tab 4</a-tab-pane>
        <a-tab-pane tab="修改密码" key="5">Content of tab 5</a-tab-pane>
      </a-tabs>
    </div>
    <footer-con></footer-con>
  </div>
</template>

<script>
import Header from '@/layouts/Index/Header'
import Footer from '@/layouts/Index/Footer'

export default {
  components: {
    HeaderCon: Header,
    FooterCon: Footer
  },
  data () {
    return {
    }
  },
  methods: {
    callback (val) {
      console.log(val)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100vh;
  .main {
    width: 1000px;
    margin: 0 auto;
  }
}
</style>
