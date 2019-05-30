<template>
  <div class="container">
    <a-back-top />
    <a-card class="card" title="网站版本管理" :bordered="false">
      <a-form :form="form" @submit="handleSubmit">
          <a-form-item
            label="记录"
            :label-col="{ span: 2 }"
            :wrapper-col="{ span: 8 }"
          >
            <a-textarea
              v-decorator="[
                'site_log',
                { 
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '请输入当前版本简介',
                      whitespace: true 
                    },
                    {
                      max: 200,
                      min: 10,
                      message: '简介在10到200个字符之间'
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
            <a-button class="btns" type="primary" html-type="submit">添加记录</a-button>
            <a-button class="btns">取消</a-button>
          </a-form-item>
      </a-form>
      <a-table
        :rowKey="record => record.id"
        :columns="TIMEAXIS_COLUMNS_CONFIG"
        :dataSource="historyList"
        :loading="tableLoading"
      >
        <template slot="operation" slot-scope="text, record">
          <a-popconfirm
            title="确定删除吗?"
            cancelText="取消"
            okText="确认"
            @confirm="() => openTimeaxisDelete(record.id)">
            <a href="javascript:;">删除</a>
          </a-popconfirm>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import {
  TIMEAXIS_COLUMNS_CONFIG
} from '@/config'

export default {
  data () {
    return {
      TIMEAXIS_COLUMNS_CONFIG,
      historyList: [],
      tableLoading: false
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$axios.post('/api/timeaxis/addTimeaxis', {
            content: this.form.getFieldValue('site_log')
          }).then((res) => {
            const result = res.data
            if (result.code === 1) {
              this.$message.success(result.message)
              this.form.setFieldsValue({
                site_log: ''
              })
              this.historyList.unshift({
                id: result.data.id,
                content: result.data.content,
                create_time: result.data.create_time
              })
            } else {
              this.$message.error(result.message)
            }
          })
        }
      })
    },
    // 获得时间轴列表
    getTimeaxisList () {
      this.tableLoading = true
      this.$axios.get('/api/timeaxis/getTimeaxisList').then(res => {
        const result = res.data
        if (result.code === 1) {
          this.historyList = result.data.timeaxis_list
          this.tableLoading = false
        }
      })
    },
    // 删除记录
    openTimeaxisDelete (id) {
      const historyList = [...this.historyList]
      this.$axios.get('/api/timeaxis/deleteTimeaxis', {
        params: {
          id
        }
      }).then(res => {
        const result = res.data
        if (result.code === 1) {
          this.historyList = historyList.filter(item => item.id !== id)
          this.$message.success('已删除该站点记录')
        } else {
          this.$message.error('删除该站点记录失败')
        }
      })
    }
  },
  beforeMount () {
    this.getTimeaxisList()
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  }
}
</script>

<style scoped>
.container {
  background-color: #ffffff;
  height: 100%;
}
.btns {
  margin-right: 8px;
}
</style>
