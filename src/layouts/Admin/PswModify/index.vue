<template>
  <div class="container">
    <a-back-top />
    <a-row :gutter="16">
      <a-col :span="8"></a-col>
      <a-col :span="8">
        <a-card class="card" title="修改密码" :hoverable="true" style="margin-top: 20px">
          <a-alert :message="isShowText" v-show="error" type="info" showIcon />
          <a-form :form="form" class="form" @submit="handleModifyPsw">
            <a-form-item
              label="新密码"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-input
                type="password"
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
                        max: 16,
                        min: 6,
                        message: '密码长度：6 到 16 个字符'
                      },
                      {
                        validator: validateToNextPassword
                      }
                    ]
                  }
                ]"
                placeholder="请输入密码" />
            </a-form-item>
            <a-form-item
              label="确认密码"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-input
                type="password"
                v-decorator="[
                  'sure_psw',
                  { 
                    initialValue: '',
                    rules: [
                      {
                        required: true,
                        message: '请输入确认密码',
                        whitespace: true 
                      },
                      {
                        validator: compareToFirstPassword,
                      }
                    ]
                  }
                ]"
                placeholder="请输入确认密码" />
            </a-form-item>
            <a-form-item
              :wrapper-col="{ span: 4, offset: 6 }"
            >
              <a-button type="primary" html-type="submit">修改密码</a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
      <a-col :span="8"></a-col>
    </a-row>
  </div>
</template>

<script>
import { userMixin } from '@/utils/mixin'

export default {
  mixins: [userMixin],
  data () {
    return {
      isShowText: '当前登录用户为：admin',
      error: false,
      userId: 0
    }
  },
  methods: {
    getUserName () {
      if (this.userInfo.id) {
        this.userId = this.userInfo.id
        let userName = this.userInfo.name
        this.isShowText = `当前登录用户为：${userName}`
        this.error = true
      } else {
        this.$router.push('/login')
      }
    },
    validateToNextPassword (rule, value, callback) {
      const form = this.form
      if (value && this.confirmDirty) {
        form.validateFields(['sure_psw'], { force: true })
      }
      callback()
    },
    compareToFirstPassword (rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('new_psw')) {
        callback(new Error('两次密码不一致!'))
      } else {
        callback()
      }
    },
    handleModifyPsw (e) {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.logging = true
          this.$axios.post('/api/user/modifyAdminPsw', {
            id: this.userId,
            password: this.form.getFieldValue('new_psw').trim()
          }).then((res) => {
            const result = res.data
            if (result.code === 1) {
              this.$message.success('修改密码成功', 2.5).then(() => {
                this.$router.push('/login')
              })
            }
          })
        }
      })
    }
  },
  mounted () {
    this.getUserName()
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
  background: #f0f2f5 url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg') no-repeat center 110px;
}
.form {
  margin-top: 20px;
}
</style>
