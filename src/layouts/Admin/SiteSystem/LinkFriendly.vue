<template>
  <div class="container">
    <a-card class="card" title="友情链接管理" :bordered="false">
      <a-form :form="form" class="form">
        <a-form-item
          label="开放友情链接"
          :label-col="{ span: 2 }"
          :wrapper-col="{ span: 6 }"
        >
          <a-switch v-decorator="['switch', { valuePropName: 'checked' }]" />
        </a-form-item>
      </a-form>
      <a-table
        :columns="columns"
        :dataSource="wordsList"
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
      wordsList: [],
      tableLoading: false
    }
  },
  methods: {
  }
}
</script>
