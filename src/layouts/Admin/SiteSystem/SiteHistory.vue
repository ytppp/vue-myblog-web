<template>
  <div class="container">
    <a-card class="card" title="网站版本管理" :bordered="false">
      <a-form :form="form">
          <a-form-item
            label="记录"
            :label-col="{ span: 2 }"
            :wrapper-col="{ span: 8 }"
          >
            <a-textarea
              v-decorator="[
                'new_psw',
                { 
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '请输入新密码',
                      whitespace: true 
                    },
                    {
                      max: 20,
                      min: 6,
                      message: '密码长度在6到20个字符之间'
                    },
                    {
                      validator: validateToNextPassword
                    }
                  ]
                }
              ]"
              placeholder="请输入记录"
              :autosize="{ minRows: 2, maxRows: 4 }" />
          </a-form-item>
          <a-form-item
            :wrapper-col="{ span: 4, offset: 2 }"
          >
            <a-button class="btns" type="primary">添加记录</a-button>
            <a-button class="btns">取消</a-button>
          </a-form-item>
      </a-form>
      <a-table
        :columns="columns"
        :dataSource="historyList"
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
      historyList: [],
      tableLoading: false
    }
  }
}
</script>

<style scoped>
.container {
  height: 100vh;
}
.btns {
  margin-right: 8px;
}
</style>
