<template>
  <a-form
    :form="form"
    class="login-form"
    @submit="handleSubmit"
  >
    <a-form-item>
      <a-input
        v-decorator="[
          'email', {
            rules: [
              {
                required: true, message: '请输入邮箱'
              },
              {
                type: 'email', message: '邮箱格式不正确'
              }
            ]
          }
        ]"
        placeholder="请输入邮箱"
      >
        <a-icon
          slot="prefix"
          type="user"
          style="color: rgba(0,0,0,.25)"
        />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'password', {
            rules: [
              {
                required: true, message: '请输入密码'
              }
            ]
          }
        ]"
        type="password"
        placeholder="请输入密码"
      >
        <a-icon
          slot="prefix"
          type="lock"
          style="color: rgba(0,0,0,.25)"
        />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-checkbox
        v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          }
        ]"
      >
        7天内记住登录
      </a-checkbox>
      <a
        class="login-form-forgot"
        href=""
      >
        忘记密码
      </a>
      <a-button
        type="primary"
        html-type="submit"
        class="login-form-button"
      >
        登录
      </a-button>
      Or <a href="">
        去注册!
      </a>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          let userEmail = values.email
          let userPw = values.password
          if (userEmail === 'ytp1234@qq.com' && userPw === 'ytp1234') {
            this.$message.success('登录成功').then(() => {
              let userInfo = {
                userId: 1,
                userName: '李四',
                userEmail: userEmail,
                userPw: userPw,
                isAdmin: 1
              }
              this.$store.dispatch('setUserInfo', userInfo).then(() => {
                this.$router.push('/index/home')
              })
            })
          } else {
            this.$message.error('邮箱或密码不正确')
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.login-form {
  max-width: 300px;
}
.login-form-forgot {
  float: right;
}
.login-form-button {
  width: 100%;
}
</style>
