<template>
  <div class="container">
    <a-card class="card" title="修改密码" :bordered="false">
      <a-form :form="form" class="form">
        <a-form-item
          label="新密码"
          :label-col="{ span: 2 }"
          :wrapper-col="{ span: 6 }"
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
          :label-col="{ span: 2 }"
          :wrapper-col="{ span: 6 }"
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
          :wrapper-col="{ span: 4, offset: 2 }"
        >
          <a-button type="primary">修改密码</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import { userMixin } from '@/utils/mixin'

export default {
  mixins: [userMixin],
  methods: {
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
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  }
}
</script>

<style scoped>
.container {
  background-color: #ffffff;
  height: 100%
}
</style>
