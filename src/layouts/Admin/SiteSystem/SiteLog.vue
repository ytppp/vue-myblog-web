<template>
  <div class="container">
    <a-card class="card" title="网站日志" :bordered="false">
      <a-table
        :columns="columns"
        :dataSource="logList"
        :loading="tableLoading"
      >
        <template slot="operation" slot-scope="text, record">
          <a href="javascript:;" @click="showArticleDetail(record.id)">详情</a>
          <a-divider type="vertical" />
          <a-popconfirm
            title="确定删除吗?"
            cancelText="取消"
            okText="确认"
            @confirm="() => onDelete(record.id)">
            <a href="javascript:;">删除</a>
          </a-popconfirm>
          <a-divider type="vertical" />
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import {
  WORD_COLUMNS_CONFIG
} from '@/config'

export default {
  data () {
    return {
      columns: WORD_COLUMNS_CONFIG,
      logList: [],
      tableLoading: false
    }
  }
}
</script>

<style scoped>
</style>
