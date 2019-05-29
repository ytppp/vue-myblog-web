<template>
  <div class="container">
    <a-card class="card" title="公告管理" :bordered="false">
      <div class="top-wrapper">
        <a-button @click="addNotice">
          发布公告
        </a-button>
      </div>
      <div class="main-wrapper">
        <div class="form-wrapper">
          <div class="form-left-wrapper">
            <a-form
              layout="inline"
              :form="form"
              @submit="handleSearchSubmit"
            >
              <a-form-item>
                <a-input
                  v-decorator="[
                    'title',
                    {
                      initialValue: '',
                    }
                  ]"
                  placeholder="请输入公告标题"
                >
                  <a-icon
                    slot="prefix"
                    type="search"
                    style="color:rgba(0,0,0,.25)"
                  />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-button
                  type="primary"
                  html-type="submit"
                >
                  搜索
                </a-button>
              </a-form-item>
            </a-form>
          </div>
          <div class="form-right-wrapper">
            <a-radio-group :defaultValue="searchParam.status" buttonStyle="solid" @change="handleStatusChange">
              <a-radio-button :value="2">全部</a-radio-button>
              <a-radio-button :value="1">启用</a-radio-button>
              <a-radio-button :value="0">禁用</a-radio-button>
            </a-radio-group>
            <a-divider type="vertical" />
            <a-radio-group :defaultValue="searchParam.isDraft" buttonStyle="solid" @change="handleDraftChange">
              <a-radio-button :value="2">全部</a-radio-button>
              <a-radio-button :value="1">草稿</a-radio-button>
              <a-radio-button :value="0">正式</a-radio-button>
            </a-radio-group>
          </div>
        </div>
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
              <a-popconfirm
                title="确定删除吗?"
                cancelText="取消"
                okText="确认"
                @confirm="() => deleteNotice(record.id, record.title)">
                <a href="javascript:;">删除</a>
              </a-popconfirm>
              <a-divider type="vertical" />
              <a-dropdown>
                <a class="ant-dropdown-link" href="#">
                  更多操作 <a-icon type="down" />
                </a>
                <a-menu slot="overlay">
                  <a-menu-item>
                    <a href="javascript:;" @click="changeStatus('status', record.id, record.status)">{{ record.status === 1 ? '禁用' : '启用' }}</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;" @click="changeStatus('is_draft', record.id, record.is_draft)">{{ record.is_draft === 1 ? '转为正式' : '转为草稿' }}</a>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
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
        <a-button @click="submitNotice(1)">存为草稿</a-button>
        <a-button @click="submitNotice(0)" type="primary">发布公告</a-button>
        <a-button @click="clearNoticeObj">取消</a-button>
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
      searchParam: {
        keywords: '',
        status: 2,
        isDraft: 2
      },
      noticeObj: {
        name: '',
        content: '',
        is_draft: 1
      }
    }
  },
  methods: {
    // 编辑公告
    editNotice (id) {
      this.noticeList.forEach(item => {
        if (item.id === id) {
          this.noticeObj = {
            id: item.id,
            name: item.name,
            content: item.content,
            status: item.status,
            is_draft: item.is_draft
          }
        }
      })
      /* this.form.setFieldsValue({
        title: this.noticeList.name
      }) */
      this.noticeEditVisible = true
    },
    showNotice (id) {
      this.noticeList.forEach(item => {
        if (item.id === id) {
          this.noticeObj = {
            id: item.id,
            name: item.name,
            content: item.content,
            status: item.status,
            is_draft: item.is_draft
          }
        }
      })
      this.noticePreVisible = true
    },
    // 上传公告
    submitNotice (isDraft) {
      if (this.noticeObj.content === '') {
        this.$message.error('公告内容不能为空')
        return
      }
      this.form.validateFields((err, values) => {
        if (!err) {
          this.noticeObj.name = this.form.getFieldValue('title')
          this.noticeObj.is_draft = isDraft
          this.$axios.post('/api/notice/saveNotice', this.noticeObj).then((res) => {
            const result = res.data
            if (result.code === 1) {
              this.$message.success(result.message)
            } else {
              this.$message.error(result.message)
            }
          })
        }
      })
    },
    getNoticeObj () {},
    // 点击取消时置空编辑公告弹窗
    clearNoticeObj () {
      /* this.form.setFieldsValue({
        title: ''
      }) */
      this.isClearEditor = true
      this.noticeObj.name = ''
      this.noticeObj.content = ''
      this.noticeEditVisible = false
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
    addNotice () {
      let self = this
      if (this.noticeList.length === 0) { // 如果没有已正式发布的公告
        this.noticeEditVisible = true
      } else {
        this.$confirm({
          title: '你已有发表的公告，新增公告将转为禁用，确定继续吗',
          content: '只能正式发布一个公告',
          onOk () {
            self.noticeEditVisible = true
          },
          onCancel () {
            self.noticeEditVisible = false
          },
          class: 'test'
        })
      }
    },
    handleSearchSubmit () {
      if (this.form.getFieldValue('title')) {
        this.searchParam.keywords = this.form.getFieldValue('title')
      } else {
        this.searchParam.keywords = ''
      }
      this.getNoticeList()
    },
    handleStatusChange (e) {
      this.searchParam.status = parseInt(e.target.value)
      this.getNoticeList()
    },
    handleDraftChange (e) {
      this.searchParam.isDraft = parseInt(e.target.value)
      this.getNoticeList()
    },
    getNoticeList () {
      this.tableLoading = true
      let param = {
        keywords: this.searchParam.keywords,
        status: this.searchParam.status === 2 ? '' : this.searchParam.status,
        isDraft: this.searchParam.isDraft === 2 ? '' : this.searchParam.isDraft
      }
      console.log(param)
      this.$axios.get('/api/notice/getNoticeList', {
        params: param
      }).then(res => {
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
              this.submitStatusChange(id, 'status', item.status)
              break
            case 'is_draft':
              item.is_draft = status === 1 ? 0 : 1
              this.submitStatusChange(id, 'is_draft', item.is_draft)
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
  .top-wrapper {
    padding: 6px;
  }
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
