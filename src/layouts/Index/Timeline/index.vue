<template>
  <section class="container">
    <a-back-top />
    <div class="content-center">
      <a-card title="时间轴" :hoverable="true">
        <a-timeline mode="alternate">
          <a-timeline-item
            color="green"
            v-for="(value, index) in historyList"
            :key="index"
          >{{ value }}</a-timeline-item>
        </a-timeline>
      </a-card>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      historyList: []
    }
  },
  methods: {
    // 获得时间轴列表
    getTimeaxisList () {
      this.historyList = []
      this.$axios.get('/api/timeaxis/getTimeaxisList').then(res => {
        const result = res.data
        if (result.code === 1) {
          let timeAxisList = result.data.timeaxis_list
          timeAxisList.forEach(item => {
            this.historyList.push(`${item.content} ${item.create_time}`)
          })
        }
      })
    }
  },
  beforeMount () {
    this.getTimeaxisList()
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  .content-center {
    max-width: 960px;
    margin: 0 auto 20px;
  }
}
</style>
