<template>
  <div class="container my-notice">
    <a-card class="card" title="公告管理" :bordered="false">
      <div class="main-wrapper">
        <div class="table-wrapper">
          <a-table
            :rowKey = 'record => record.id'
            :columns="columns"
            :dataSource="noticeList"
            :loading="tableLoading"
          >
            <template slot="content" slot-scope="text">
              <div v-html="text"></div>
            </template>
            <template slot="operation" slot-scope="text, record">
              <a href="javascript:;" @click="editNotice(record.id)">修改</a>
              <a-divider type="vertical" />
              <a href="javascript:;" @click="showNotice(record.id)">详情</a>
              <a-divider type="vertical" />
              <a-button :type="btnStyle" size="small" @click="changeStatus('status', record.id, record.status)">
                {{ record.status === 1 ? '禁用' : '启用' }}
              </a-button>
            </template>
          </a-table>
        </div>
      </div>
    </a-card>
    <!-- 公告编辑弹窗 -->
    <a-modal
      v-model="noticeEditVisible"
      title="编辑公告"
      style="top: 20px"
      width="50%" 
    >
      <template slot="footer">
        <a-button @click="clearEditorContent" type="danger">清除内容</a-button>
        <a-button @click="submitNotice" type="primary">保存草稿</a-button>
        <a-button @click="noticeEditVisible = false">取消</a-button>
      </template>
      <a-form :form="form" class="form">
        <a-form-item
          label="标题"
          :label-col="{ span: 2 }"
          :wrapper-col="{ span: 8 }">
          <a-input
            v-decorator="[
              'title',
              { 
                initialValue: noticeObj.name,
                rules: [
                  {
                    required: true,
                    message: '请输入标题',
                    whitespace: true 
                  },
                  {
                    max: 20,
                    min: 1,
                    message: '标题长度在1到20个字符之间'
                  }
                ]
              }
            ]"
          placeholder="请输入标题" />
        </a-form-item>
        <a-form-item
          label="内容"
          :label-col="{ span: 2 }"
          :wrapper-col="{ span: 20 }">
          <rich-editor
            :clear="isClearEditor"
            @letClearfalse="handleLetClearfalse"
            :onContent="getEditorContent"
            :editorContent="noticeObj.content"
            :editor-config="1"/>
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 公告预览弹窗 -->
    <a-modal
      v-model="noticePreVisible"
      title="公告预览"
      style="top: 20px"
      width="50%" 
    >
      <template slot="footer">
        <a-button type="primary" @click="noticePreVisible = false">确认</a-button>
      </template>
      <div>
        <h2>{{noticeObj.name}}</h2>
        <div v-html="noticeObj.content"></div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import {
  NOTICE_LIST_COLUMNS_CONFIG
} from '@/config'
import RichEditor from '@/components/Common/Editor'

export default {
  components: {
    RichEditor
  },
  data () {
    return {
      columns: NOTICE_LIST_COLUMNS_CONFIG,
      noticeList: [],
      tableLoading: false,
      noticeEditVisible: false, // 编辑公告
      noticePreVisible: false, // 公告预览
      isClearEditor: false,
      noticeObj: {
        id: 1,
        name: '',
        content: '',
        status: 1
      },
      btnStyle: 'danger'
    }
  },
  methods: {
    // 编辑公告
    editNotice (id) {
      this.getNoticeObj(id)
      this.noticeEditVisible = true
    },
    showNotice (id) {
      this.getNoticeObj(id)
      this.noticePreVisible = true
    },
    getNoticeObj (id) {
      this.noticeList.forEach(item => {
        if (item.id === id) {
          this.noticeObj = {
            id: 1,
            name: item.name,
            content: item.content,
            status: item.status
          }
        }
      })
    },
    // 上传公告
    submitNotice () {
      if (this.noticeObj.content === '') {
        this.$message.error('公告内容不能为空')
        return
      }
      this.form.validateFields((err, values) => {
        if (!err) {
          this.noticeObj.name = this.form.getFieldValue('title')
          this.$axios.post('/api/notice/modifyNotice', this.noticeObj).then((res) => {
            const result = res.data
            if (result.code === 1) {
              this.noticeList.forEach(item => {
                if (item.id === 1) {
                  this.noticeObj.content = this.noticeObj.content
                }
              })
              this.$message.success(result.message)
              this.noticeEditVisible = false
            } else {
              this.$message.error(result.message)
            }
          })
        }
      })
    },
    // 清除编辑器内容
    clearEditorContent () {
      this.isClearEditor = true
    },
    // 接受编辑器子组件传的参数
    handleLetClearfalse (data) {
      this.isClearEditor = data
    },
    // 获取编辑器内容
    getEditorContent (content) {
      this.noticeObj.content = content
    },
    getNoticeList () {
      this.tableLoading = true
      this.$axios.get('/api/notice/getNoticeList').then(res => {
        const result = res.data
        if (result.code === 1) {
          this.noticeList = result.data.notice_list
          this.tableLoading = false
        }
      })
    },
    changeStatus (text, id, status) {
      const noticeList = [...this.noticeList]
      noticeList.forEach(item => {
        if (item.id === id) {
          switch (text) {
            case 'status':
              item.status = status === 1 ? 0 : 1
              if (item.status === 1) {
                this.btnStyle = 'danger'
              } else {
                this.btnStyle = 'primary'
              }
              this.submitStatusChange(id, 'status', item.status)
              break
          }
        }
      })
      this.noticeList = noticeList
    },
    submitStatusChange (id, key, value) {
      this.$axios.get('/api/notice/changeNoticeStatus', {
        params: {
          id,
          key,
          value
        }
      }).then(res => {
        const result = res.data
        if (result.code === 1) {
          this.$message.success('更改公告状态成功')
        } else {
          this.$message.error('更改公告状态失败')
        }
      })
    }
  },
  beforeMount () {
    this.getNoticeList()
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  }
}
</script>

<style lang="less" scoped>
.container {
  background-color: #ffffff;
  height: 100%;
  .main-wrapper {
    padding-top: 6px;
    .form-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 6px;
    }
    .table-wrapper {
      padding-top: 6px;
    }
  }
}
</style>

<style lang="less">
  .notice {
    /* table 样式 */
    table {
      border-top: 1px solid #ccc;
      border-left: 1px solid #ccc;
    }
    table td,
    table th {
      border-bottom: 1px solid #ccc;
      border-right: 1px solid #ccc;
      padding: 3px 5px;
    }
    table th {
      border-bottom: 2px solid #ccc;
      text-align: center;
    }
    /* blockquote 样式 */
    blockquote {
      display: block;
      border-left: 8px solid #d0e5f2;
      padding: 5px 10px;
      margin: 10px 0;
      line-height: 1.4;
      font-size: 100%;
      background-color: #f1f1f1;
    }
    /* code 样式 */
    code {
      display: inline-block;
      *display: inline;
      *zoom: 1;
      background-color: #f1f1f1;
      border-radius: 3px;
      padding: 3px 5px;
      margin: 0 3px;
    }
    pre code {
      display: block;
    }
    /* ul ol 样式 */
    ul, ol {
      margin: 10px 0 10px 20px;
    }
  }
</style>
