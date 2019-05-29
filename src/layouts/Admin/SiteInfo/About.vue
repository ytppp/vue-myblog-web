<template>
  <div class="container">
    <a-card class="card" title="关于自己" :bordered="false">
      <a-form :form="siterForm" class="form">
        <a-row class="form-row">
          <a-col :span="6">
            <a-form-item
              label="真实姓名"
              v-bind="formItemLayout"
            >
              <a-input
                v-decorator="[
                  'true_name',
                  { 
                    initialValue: ''
                  }
                ]"
                placeholder="请输入" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              label="毕业学校"
              v-bind="formItemLayout"
            >
              <a-input
                v-decorator="[
                  'school',
                  { 
                    initialValue: ''
                  }
                ]"
                placeholder="请输入" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row">
          <a-col :span="6">
            <a-form-item
              label="爱好"
              v-bind="formItemLayout"
            >
              <a-input
                v-decorator="[
                  'hoppy',
                  { 
                    initialValue: ''
                  }
                ]"
                placeholder="请输入" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row">
          <a-col :span="6">
            <a-form-item
                label="个人简介"
                v-bind="formItemLayout"
              >
                <a-textarea
                  v-decorator="[
                    'site_describe',
                    { 
                      initialValue: ''
                    }
                  ]"
                  placeholder="请输入"
                  :autosize="{ minRows: 3, maxRows: 6 }" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col>
            <a-form-item
              :wrapper-col="{ span: 22, offset: 2 }"
            >
              <a-button class="btns" type="primary">修改</a-button>
              <a-button class="btns">取消</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    <a-card class="card" title="关于网站" :bordered="false">
      <a-form :form="siteForm" class="form">
        <a-row class="form-row">
          <a-col :span="6">
            <a-form-item
              label="网站服务器"
              v-bind="formItemLayout"
            >
              <a-input
                v-decorator="[
                  'true_name',
                  { 
                    initialValue: ''
                  }
                ]"
                placeholder="请输入" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              label="建站时间"
              v-bind="formItemLayout"
            >
              <a-month-picker v-decorator="['date-picker', config]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row">
          <a-col :span="6">
            <a-form-item
                label="网站简介"
                v-bind="formItemLayout"
              >
                <a-textarea
                  v-decorator="[
                    'site_describe',
                    { 
                      initialValue: ''
                    }
                  ]"
                  placeholder="请输入"
                  :autosize="{ minRows: 3, maxRows: 6 }" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col>
            <a-form-item
              :wrapper-col="{ span: 22, offset: 2 }"
            >
              <a-button class="btns" type="primary">修改</a-button>
              <a-button class="btns">取消</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formItemLayout: {
        labelCol: { span: 10 },
        wrapperCol: { span: 14 }
      },
      config: {
        rules: [{ type: 'object', required: true, message: 'Please select time!' }]
      }
    }
  },
  beforeCreate () {
    this.siterForm = this.$form.createForm(this)
    this.siteForm = this.$form.createForm(this)
  }
}
</script>

<style lang="less" scoped>
.container {
  background-color: #ffffff;
  height: 100%;
  .form {
    .form-row {
      margin: 0 -8px
    }
    .ant-col {
      padding: 0 8px
    }
    .btns {
      margin-right: 8px;
    }
  }
}
</style>
