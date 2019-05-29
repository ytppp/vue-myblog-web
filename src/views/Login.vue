<template>
  <div class="container">
    <div class="content">
      <div class="top">
        <div class="header">
          <img alt="logo" class="logo" src="/static/img/vue-antd-logo.png" />
          <span class="title">{{bigName}}</span>
        </div>
        <div class="desc">{{smallName}}</div>
      </div>
      <div class="login">
        <a-alert type="error" :closable="true" v-show="error" :message="error" showIcon style="margin-bottom: 24px;" />
        <a-tabs size="large" :tabBarStyle="{textAlign: 'center'}" style="padding: 0 2px;">
          <a-tab-pane tab="邮箱密码登录" key="1">
            <a-form :form="pwdform">
              <a-form-item>
                <a-input
                  v-decorator="[
                    'email',
                    { 
                      initialValue: '',
                      rules: [
                        {
                          required: true,
                          message: '请输入邮箱',
                          whitespace: true 
                        },
                        {
                          type: 'email',
                          message: '请输入邮箱'
                        }
                      ]
                    }
                  ]"
                  size="large"
                  placeholder="邮箱"
                >
                  <a-icon slot="prefix" type="user" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-input
                  v-decorator="[
                    'password',
                    { 
                      initialValue: '',
                      rules: [
                        {
                          required: true,
                          message: '请输入密码',
                          whitespace: true 
                        }
                      ]
                    }
                  ]"
                  size="large"
                  placeholder="密码"
                  type="password">
                  <a-icon slot="prefix" type="lock" />
                </a-input>
              </a-form-item>
            </a-form>
          </a-tab-pane>
          <a-tab-pane tab="验证码登录" key="2">
            <a-form :form="captchaform">
                <a-form-item>
                  <a-input
                    v-decorator="[
                      'email',
                      { 
                        initialValue: '',
                        rules: [
                          {
                            required: true,
                            message: '请输入邮箱',
                            whitespace: true 
                          },
                          {
                            type: 'email',
                            message: '请输入邮箱，最好是QQ邮箱'
                          }
                        ]
                      }
                    ]"
                    size="large"
                    placeholder="邮箱" >
                    <a-icon slot="prefix" type="user" />
                  </a-input>
                </a-form-item>
                <a-form-item>
                  <a-row :gutter="8" style="margin: 0 -4px">
                    <a-col :span="16">
                      <a-input
                        v-decorator="[
                          'captcha',
                          { 
                            initialValue: '',
                            rules: [
                              {
                                required: true,
                                message: '请输入验证码',
                                whitespace: true 
                              }
                            ]
                          }
                        ]"
                        size="large"
                        placeholder="验证码"
                      >
                        <a-icon slot="prefix" type="mail" />
                      </a-input>
                    </a-col>
                    <a-col :span="8" style="padding-left: 4px">
                      <a-button @click="sendCaptcha" style="width: 100%" class="captcha-button" size="large">
                        {{showText}}
                      </a-button>
                    </a-col>
                  </a-row>
                </a-form-item>
              </a-form>
          </a-tab-pane>
        </a-tabs>
        <div>
          <a-checkbox :checked="true" >自动登录</a-checkbox>
          <a @click="openResetModal" style="float: right">忘记密码</a>
        </div>
        <a-form-item>
          <a-button :loading="logging" style="width: 100%; margin-top: 24px" @click="handleLogin" size="large" type="primary">登录</a-button>
        </a-form-item>
        <div>
          <router-link style="float: right" to="/register" >注册账户</router-link>
        </div>
      </div>
      <!-- 重置密码弹框 -->
      <a-modal
        title="重置密码"
        :visible="resetPwdVisible"
        cancelText="关闭"
        okText="确定"
        @ok="handleSubmit"
        @cancel="closeResetModal"
      >
        <a-form :form="resetForm">
          <a-form-item>
            <a-input
              v-decorator="[
                'email',
                { 
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '请输入邮箱',
                      whitespace: true 
                    },
                    {
                      type: 'email',
                      message: '请输入邮箱，最好是QQ邮箱'
                    }
                  ]
                }
              ]"
              size="large"
              placeholder="邮箱" >
              <a-icon slot="prefix" type="user" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="[
                'user_new_pwd',
                {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '请输入新密码',
                      whitespace: true 
                    },
                  ]
                }
              ]"
              size="large"
              placeholder="新密码"
              type="password">
              <a-icon slot="prefix" type="lock" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="[
                'user_config_pwd',
                {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '请输入确认密码',
                      whitespace: true 
                    }
                  ]
                }
              ]"
              size="large"
              placeholder="确认密码"
              type="password">
              <a-icon slot="prefix" type="lock" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-row :gutter="8" style="margin: 0 -4px">
              <a-col :span="16">
                <a-input
                  v-decorator="[
                    'captcha',
                    { 
                      initialValue: '',
                      rules: [
                        {
                          required: true,
                          message: '请输入验证码',
                          whitespace: true 
                        }
                      ]
                    }
                  ]"
                  size="large"
                  placeholder="验证码">
                <a-icon slot="prefix" type="mail" />
              </a-input>
              </a-col>
              <a-col :span="8" style="padding-left: 4px">
                <a-button @click="sendCaptcha" style="width: 100%" class="captcha-button" size="large">
                  {{showText}}
                </a-button>
              </a-col>
            </a-row>
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>

<script>
import { userMixin } from '@/utils/mixin'

export default {
  mixins: [userMixin],
  data () {
    return {
      bigName: '登录',
      smallName: '欢迎来到杨庭培的个人博客',
      showText: '获取验证码',
      logging: false,
      error: '',
      resetPwdVisible: false
    }
  },
  methods: {
    handleLogin () {
      this.pwdform.validateFields((err, values) => {
        if (!err) {
          this.logging = true
          this.$axios.post('/api/user/checkUserLogin', {
            email: this.pwdform.getFieldValue('email'),
            password: this.pwdform.getFieldValue('password')
          }).then((res) => {
            this.logging = false
            const result = res.data
            this.setUserInfo(result.user_info).then(() => {
              if (result.code === 1) {
                if (result.user_info.is_admin === 1) {
                  this.$router.push('/admin/home')
                } else {
                  this.$router.push('/index/home')
                }
              } else {
                this.error = result.message
              }
            })
          })
        }
      })
    },
    // 发送验证码
    sendCaptcha () {
      this.$message.success('验证码已发送，请注意查收')
    },
    // 打开重置密码弹框
    openResetModal () {
      this.resetPwdVisible = true
    },
    // 关闭重置密码弹框
    closeResetModal () {
      this.resetPwdVisible = false
    },
    // 提交
    handleSubmit () {
      this.$message.success('重置密码成功', 1).then(() => {
        this.resetPwdVisible = false
      })
    } 
  },
  beforeCreate () {
    this.pwdform = this.$form.createForm(this)
    this.captchaform = this.$form.createForm(this)
    this.resetForm = this.$form.createForm(this)
  }
}
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
    background: #f0f2f5 url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg') no-repeat center 110px;
    background-size: 100%;
    .content {
      padding: 32px 0;
      flex: 1;
      @media (min-width: 768px){
        padding: 112px 0 24px;
      }
      .top {
        text-align: center;
        .header {
          height: 44px;
          line-height: 44px;
          a {
            text-decoration: none;
          }
          .logo {
            height: 44px;
            vertical-align: top;
            margin-right: 16px;
          }
          .title {
            font-size: 33px;
            color: rgba(0,0,0,.85);
            font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
            font-weight: 600;
            position: relative;
            top: 2px;
          }
        }
        .desc {
          font-size: 14px;
          color: rgba(0,0,0,.45);
          margin-top: 12px;
          margin-bottom: 40px;
        }
      }
      .login{
        width: 368px;
        margin: 0 auto;
        @media screen and (max-width: 576px) {
          width: 95%;
        }
        @media screen and (max-width: 320px) {
          .captcha-button{
            font-size: 14px;
          }
        }
      }
    }
  }
</style>
