<template>
  <div class="container">
    <a-back-top />
    <div class="content-center">
      <a-card title="关于我" :hoverable="true">
        <div class="about-item">姓名：{{ aboutInfoObj.true_name }}</div>
        <div class="about-item">毕业学校：{{ aboutInfoObj.university }}</div>
        <div class="about-item">工作：{{ aboutInfoObj.doing_work }}</div>
        <div class="about-item">
          爱好：
          <a-tag color="#2db7f5" v-for="(value, i) in hobbyArr" :key="i">{{ value }}</a-tag>
        </div>
      </a-card>
      <a-card title="关于网站" style="margin-top: 20px" :hoverable="true">
        <div class="about-item">服务器：{{ aboutInfoObj.web_server }}</div>
        <div class="about-item">搭建时间：{{ aboutInfoObj.build_time }}</div>
      </a-card>
      <a-card title="个人介绍" style="margin-top: 20px" :hoverable="true">
        <div class="about-item">{{ aboutInfoObj.me_short_intrduce }}</div>
      </a-card>
      <a-card title="博客介绍" style="margin-top: 20px" :hoverable="true">
        <div class="about-item">{{ aboutInfoObj.site_short_intrduce }}</div>
      </a-card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      aboutInfoObj: {
        true_name: '',
        university: '',
        hobby: '',
        doing_work: '',
        me_short_intrduce: '',
        web_server: '',
        build_time: '',
        site_short_intrduce: ''
      }
    }
  },
  computed: {
    hobbyArr () {
      let hobbyArr = []
      if (this.aboutInfoObj.hobby.trim().length !== 0) {
        hobbyArr = this.aboutInfoObj.hobby.split('|')
      }
      return hobbyArr
    }
  },
  methods: {
    // 获得公告
    getNotice () {
      this.$axios.get('/api/site/getSiteAboutInfo').then(res => {
        const result = res.data
        if (result.code === 1) {
          let siteAboutObj = result.data.site_about_obj
          this.aboutInfoObj = {
            id: 1,
            true_name: siteAboutObj.true_name,
            university: siteAboutObj.university,
            hobby: siteAboutObj.hobby,
            doing_work: siteAboutObj.doing_work,
            me_short_intrduce: siteAboutObj.me_short_intrduce,
            web_server: siteAboutObj.web_server,
            build_time: siteAboutObj.build_time,
            site_short_intrduce: siteAboutObj.site_short_intrduce
          }
        }
      })
    }
  },
  beforeMount () {
    this.getNotice()
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  .content-center {
    max-width: 960px;
    margin: 0 auto 20px;
    .about-item {
      padding: 10px 0;
    }
    .method-item {
      display: flex;
    }
  }
}
</style>
