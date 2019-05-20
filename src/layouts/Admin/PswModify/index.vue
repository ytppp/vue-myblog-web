<template>
  <div class="container">
    <a-card class="card" title="修改密码" :bordered="false">
      <a-form :form="form" class="form">
        <a-form-item
          label="新密码"
          :label-col="{ span: 2 }"
          :wrapper-col="{ span: 4 }"
        >
          <a-input
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
            placeholder="请输入密码" />
        </a-form-item>
        <a-form-item
          label="确认密码"
          :label-col="{ span: 2 }"
          :wrapper-col="{ span: 4 }"
        >
          <a-input
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
          <a-button class="btns" type="primary">修改密码</a-button>
          <a-button class="btns">取消</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
export default {
  methods: {
    validateToNextPassword  (rule, value, callback) {
      const form = this.form
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true })
      }
      callback()
    },
    compareToFirstPassword  (rule, value, callback) {
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
  height: 100vh;
}
.btns {
  margin-right: 8px;
}
</style>
