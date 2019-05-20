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
      <div class="register">
        <a-alert type="error" :closable="true" v-show="error" :message="error" showIcon style="margin-bottom: 24px;" />
        <a-form
          :form="form"
          layout="horizontal">
          <a-form-item
            label="邮箱："
            :labelCol="{span: 4}"
            :wrapperCol="{span: 20}">
            <a-input
              v-decorator="[
                'user_email',
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
          <a-form-item
            label="用户名："
            :labelCol="{span: 4}"
            :wrapperCol="{span: 20}">
            <a-input
              v-decorator="[
                'user_name',
                { 
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '请输入用户名',
                      whitespace: true 
                    }
                  ]
                }
              ]"
              size="large"
              placeholder="用户名" >
              <a-icon slot="prefix" type="user" />
            </a-input>
          </a-form-item>
          <a-form-item
            label="头像："
            :labelCol="{span: 4}"
            :wrapperCol="{span: 20}">
            <a-upload
              name="avatar"
              listType="picture-card"
              action="/api/images/saveAvatar"
              :showUploadList="false"
              :beforeUpload="beforeUpload"
              @change="handleChange"
            >
              <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
              <div v-else>
                <a-icon :type="loading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">上传</div>
              </div>
            </a-upload>
          </a-form-item>
          <a-form-item
            label="密码："
            :labelCol="{span: 4}"
            :wrapperCol="{span: 20}"
          >
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
          <a-form-item
            :labelCol="{ span: 4 }"
            :wrapperCol="{span: 16, offset: 4}"
          >
            <a-button @click="submitReg" type="primary" class="btns">提交</a-button>
            <a-button class="btns">取消</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import {
  STATIC_IMG_URL
} from '@/config'
export default {
  data () {
    return {
      bigName: '注册',
      smallName: '欢迎来到杨庭培的个人博客',
      error: '',
      loading: false,
      imageUrl: '',
      STATIC_IMG_URL
    }
  },
  methods: {
    // 图片上传
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        this.loading = false
        console.log(info.file.response.data.img_url)
        this.imageUrl = `${STATIC_IMG_URL}${info.file.response.data.img_url}`
      }
    },
    // 上传图片检查
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif' 
      if (!isJPG) {
        this.error = '上传图片不符合要求'
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.error = '图片必须小于2MB!'
      }
      return isJPG && isLt2M
    },
    // 提交注册
    submitReg () {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.imageUrl === '') {
            this.$message.error('请上传头像')
            return
          }
          this.$axios.post('/api/user/handleUserReg', {
            email: this.form.getFieldValue('user_email'),
            name: this.form.getFieldValue('user_name'),
            avatar: this.imageUrl,
            password: this.form.getFieldValue('password')
          }).then((res) => {
            const result = res.data
            if (result.code === 1) {
              this.$message.success('注册成功')
            } else {
              this.error = result.message
            }
          })
        }
      })
    },
    success () {
      this.$success({
        title: '你已经成功注册啦',
        content: (  // JSX support
          <div>
            <p>以后要常来看看哦</p>
          </div>
        )
      })
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
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
      .register{
        width: 368px;
        margin: 0 auto;
        .avatar-uploader > .ant-upload {
          width: 128px;
          height: 128px;
        }
        .ant-upload-select-picture-card i {
          font-size: 32px;
          color: #999;
        }
        .ant-upload-select-picture-card .ant-upload-text {
          margin-top: 8px;
          color: #666;
        }
        @media screen and (max-width: 576px) {
          width: 95%;
        }
        @media screen and (max-width: 320px) {
          .captcha-button{
            font-size: 14px;
          }
        }
      }
      .btns {
        margin-right: 8px;
      }
    }
  }
</style>
