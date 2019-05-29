<template>
  <div class="container">
    <a-card class="card" title="网站日志" :bordered="false">
      <a-table
        :rowKey="record => record.id"
        :columns="SITELOG_COLUMNS_CONFIG"
        :dataSource="logList"
        :loading="tableLoading"
      >
        <span slot="is_success" slot-scope="is_success">
          <a-tag color="#87d068" :key="is_success" v-if="is_success === 1">成功</a-tag>
          <a-tag color="#f50" :key="is_success" v-else>失败</a-tag>
        </span>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import {
  SITELOG_COLUMNS_CONFIG
} from '@/config'

export default {
  data () {
    return {
      SITELOG_COLUMNS_CONFIG,
      logList: [],
      tableLoading: false
    }
  },
  methods: {
    getSitelogList () {
      this.tableLoading = true
      this.$axios.get('/api/site/getSitelogList').then(res => {
        const result = res.data
        if (result.code === 1) {
          this.logList = result.data.sitelog_list
          this.tableLoading = false
        }
      })
    }
  },
  beforeMount () {
    this.getSitelogList()
  }
}
</script>

<style scoped>
.container {
  background-color: #ffffff;
  height: 100%
}
</style>
