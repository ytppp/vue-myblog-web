<template>
<div class="container">
  <a-card class="card" title="用户管理" :bordered="false">
    <a-form :form="form" class="form">
      <a-row class="form-row">
        <a-col :span="4">
          <a-form-item
            label="网站注册"
            v-bind="formItemLayout"
          >
            <a-switch v-model="siteInfo.is_reg" @change="handleSwitchChange('is_reg', siteInfo.is_reg)" />
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <a-form-item
            label="网站登录"
            v-bind="formItemLayout"
          >
            <a-switch v-model="siteInfo.is_login" @change="handleSwitchChange('is_login', siteInfo.is_login)" />
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <a-form-item
            label="文章评论"
            v-bind="formItemLayout"
          >
            <a-switch v-model="siteInfo.is_comment" @change="handleSwitchChange('is_comment', siteInfo.is_comment)" />
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <a-form-item
            label="留言"
            v-bind="formItemLayout"
          >
            <a-switch v-model="siteInfo.is_words" @change="handleSwitchChange('is_words', siteInfo.is_words)" />
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <a-form-item
            label="评论留言审核"
            v-bind="formItemLayout"
          >
            <a-switch v-model="siteInfo.is_check" @change="handleSwitchChange('is_check', siteInfo.is_check)" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
  <div class="top-wrapper">
    <div class="form-wrapper">
      <a-form
        layout="inline"
        :form="form"
      >
        <a-form-item>
          <a-input-search
            v-model="searchParams.keywords"
            placeholder="请输入用户名"
            style="width: 200px"
          />
        </a-form-item>
          <a-form-item>
            <a-button
              @click="handleSearchSubmit"
              type="primary"
              html-type="submit"
            >
              搜索
            </a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="btns-wrapper">
      <a-radio-group defaultValue="2" buttonStyle="solid" @change="handleStatusChange">
        <a-radio-button value="2">全部</a-radio-button>
        <a-radio-button value="1">正常</a-radio-button>
        <a-radio-button value="0">黑名单</a-radio-button>
      </a-radio-group>
    </div>
  </div>
  <a-table
    :rowKey="record => record.id"
    :columns="USER_LIST_COLUMNS_CONFIG"
    :dataSource="userList"
    :loading="tableLoading"
  >
    <template slot="operation" slot-scope="text, record">
      <a-popconfirm
        title="确定切换该用户状态吗?"
        cancelText="取消"
        okText="确认"
        @confirm="() => changeUserStatus('status', record.id, record.status)">
        <a href="javascript:;">
          {{ record.status === 1 ? '禁用' : '启用' }}
        </a>
      </a-popconfirm>
      <a-divider type="vertical" />
      <a-popconfirm
        title="确定删除该用户吗?"
        cancelText="取消"
        okText="确认"
        @confirm="() => openUserDeleteModal(record.id, record.name)">
        <a href="javascript:;">删除</a>
      </a-popconfirm>
      <a-divider type="vertical" />
        <a-dropdown>
          <a class="ant-dropdown-link" href="#">
            更多操作 <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;" @click="changeUserStatus('is_login', record.id, record.is_login)">
                {{ record.is_login === 1 ? '取消登录权限' : '拥有登录权限' }}
              </a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" @click="changeUserStatus('is_words', record.id, record.is_words)">
                {{ record.is_words === 1 ? '取消留言权限' : '拥有留言权限' }}
              </a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" @click="changeUserStatus('is_comment', record.id, record.is_comment)">
                {{ record.is_comment === 1 ? '取消评论权限' : '拥有评论权限' }}
              </a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" @click="changeUserStatus('is_like', record.id, record.is_like)">
                {{ record.is_like === 1 ? '取消点赞文章权限' : '拥有点赞文章权限' }}
              </a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" @click="changeUserStatus('is_save', record.id, record.is_save)">
                {{ record.is_save === 1 ? '取消收藏文章权限' : '拥有收藏文章权限' }}
              </a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
    </template>
  </a-table>
  <!-- 用户删除弹窗 -->
  <a-modal
    v-model="userDeleteVisible"
    title="用户删除"
    okText="确认"
    okType="danger"
    @ok="submitUserDelete"
    cancelText="取消"
    onCancel="userDeleteVisible = false"
    style="top: 20px"
  >
    <a-row :gutter="16">
      <a-col :span="24">
        <a-alert type="error" message="删除用户属于敏感操作，请谨慎操作" banner />
      </a-col>
    </a-row>
    <a-row :gutter="16" style="margin-top: 8px">
      <a-col :span="24">
        <a-form
          layout="inline"
          :form="userDeleteform"
        >
          <a-form-item
            label="用户名"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 18 }"
          >
            <a-input placeholder="请输入要删除的用户名" v-model="userName" ref="userNameInput">
              <a-icon slot="prefix" type="user" />
              <a-icon v-if="userName" slot="suffix" type="close-circle" @click="emitEmpty" />
            </a-input>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </a-modal>
</div>
</template>

<script>
import {
  USER_LIST_COLUMNS_CONFIG
} from '@/config'

// 用户信息模拟数据
const mockUserInfo = [
  {
    id: 1,
    name: 'user',
    mobile: '12345678910',
    email: '651003708@qq.com',
    status: 1,
    is_login: 1,
    is_comment: 1,
    is_like: 1,
    is_words: 1,
    is_save: 1,
    create_time: '2015-08-27'
  }
]

export default {
  data () {
    return {
      formItemLayout: {
        labelCol: { span: 10 },
        wrapperCol: { span: 14 }
      },
      USER_LIST_COLUMNS_CONFIG,
      userList: mockUserInfo,
      tableLoading: false,
      siteInfo: {
        is_reg: false,
        is_login: false,
        is_comment: false,
        is_words: false,
        is_check: false
      },
      searchParams: {
        keywords: '',
        status: 2
      },
      userInfo: {
        id: '',
        name: ''
      },
      userName: '',
      userDeleteVisible: false
    }
  },
  methods: {
    emitEmpty () {
      this.$refs.userNameInput.focus()
      this.userName = ''
    },
    handleSearchSubmit () {
      this.getUserList()
    },
    openUserDeleteModal (key, name) {
      this.userInfo.id = key
      this.userInfo.name = name
      this.userDeleteVisible = true
    },
    // 删除用户
    submitUserDelete () {
      if (this.userName.trim() === '') {
        this.$message.error('用户名不能为空')
        return
      }
      if (this.userName !== this.userInfo.name) {
        this.$message.error('输入用户名不匹配，请重试')
        return
      }
      const userList = [...this.userList]
      this.$axios.get('/api/user/deleteUser', {
        params: {
          id: this.userInfo.id
        }
      }).then(res => {
        const result = res.data
        if (result.code === 1) {
          this.userList = userList.filter(item => item.id !== this.userInfo.id)
          this.$message.success('已删除用户')
          this.userDeleteVisible = false
        } else {
          this.$message.error('删除用户失败')
        }
      })
    },
    getUserList () {
      let params = {
        keywords: this.searchParams.keywords,
        status: this.searchParams.status === 2 ? '' : this.searchParams.status
      }
      this.tableLoading = true
      this.$axios.get('/api/user/getUserList', {
        params
      }).then(res => {
        const result = res.data
        if (result.code === 1) {
          this.userList = result.data.user_list
          this.tableLoading = false
        }
      })
    },
    handleStatusChange (e) {
      this.searchParams.status = parseInt(e.target.value)
      this.getUserList()
    },
    changeUserStatus (text, id, status) {
      // console.log(text, id, status)
      const userList = [...this.userList]
      userList.forEach(item => {
        if (item.id === id) {
          switch (text) {
            case 'status':
              item.status = status === 1 ? 0 : 1
              this.changeStatus(id, 'status', item.status)
              break
            case 'is_login':
              item.is_login = status === 1 ? 0 : 1
              this.changeStatus(id, 'is_login', item.is_login)
              break
            case 'is_words':
              item.is_words = status === 1 ? 0 : 1
              this.changeStatus(id, 'is_words', item.is_words)
              break
            case 'is_comment':
              item.is_comment = status === 1 ? 0 : 1
              this.changeStatus(id, 'is_comment', item.is_comment)
              break
            case 'is_like':
              item.is_like = status === 1 ? 0 : 1
              this.changeStatus(id, 'is_like', item.is_like)
              break
            case 'is_save':
              item.is_save = status === 1 ? 0 : 1
              this.changeStatus(id, 'is_save', item.is_save)
              break
          }
        }
      })
      this.articleuserListList = userList
    },
    changeStatus (id, key, value) {
      this.$axios.get('/api/user/changeUserStatus', {
        params: {
          id,
          key,
          value
        }
      }).then(res => {
        const result = res.data
        if (result.code === 1) {
          this.$message.success('更改用户状态成功')
        } else {
          this.$message.error('更改用户状态失败')
        }
      })
    },
    // 获得站点信息，这里包括4个：是否开启网站注册、是否开启网站登录、是否开启文章评论、是否开启留言、是否开启留言审核
    getSiteInfo () {
      this.$axios.get('/api/site/getSiteStatus', {
        params: {
          key: 'is_reg, is_login, is_comment, is_words, is_check'
        }
      }).then(res => {
        const result = res.data
        if (result.code === 1) {
          this.siteInfo = {
            is_reg: result.data.is_reg === 1,
            is_login: result.data.is_login === 1,
            is_comment: result.data.is_comment === 1,
            is_words: result.data.is_words === 1,
            is_check: result.data.is_check === 1
          }
        } else {
          this.$message.error(result.message)
        }
      })
    },
    handleSwitchChange (key, value) {
      this.$axios.post('/api/site/setSiteStatus', {
        key,
        value
      }).then((res) => {
        const result = res.data
        if (result.code === 1) {
          this.$message.success(result.message)
        } else {
          this.$message.error(result.message)
        }
      })
    }
  },
  beforeMount () {
    this.getUserList()
    this.getSiteInfo()
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
    this.userDeleteform = this.$form.createForm(this)
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100vh;
  .form {
    .form-row {
      margin: 0 -8px
    }
    .ant-col {
      padding: 0 8px
    }
  }
  .top-wrapper {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .form-wrapper {
      display: inline-block;
    }
    .btns-wrapper {
      display: inline-block;
    }
  }
}
</style>
