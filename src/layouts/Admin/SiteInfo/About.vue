<template>
  <div class="container">
    <a-card class="card" title="关于自己" :bordered="false">
      <a-form :form="siterForm" class="form">
        <a-row class="form-row">
          <a-col :span="10">
            <a-form-item
              label="真实姓名"
              v-bind="formItemLayout"
            >
              <a-input
                v-decorator="[
                  'true_name',
                  { 
                    initialValue: aboutInfoObj.true_name
                  }
                ]"
                placeholder="请输入" />
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <a-form-item
              label="毕业学校"
              v-bind="formItemLayout"
            >
              <a-input
                v-decorator="[
                  'university',
                  { 
                    initialValue: aboutInfoObj.university
                  }
                ]"
                placeholder="请输入" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row">
          <a-col :span="10">
            <a-form-item
              label="爱好"
              v-bind="formItemLayout"
              help="爱好之间请以 | 隔开"
            >
              <a-input
                v-decorator="[
                  'hobby',
                  { 
                    initialValue: aboutInfoObj.hobby
                  }
                ]"
                placeholder="请输入" />
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <a-form-item
              label="工作"
              v-bind="formItemLayout"
            >
              <a-input
                v-decorator="[
                  'doing_work',
                  { 
                    initialValue: aboutInfoObj.doing_work
                  }
                ]"
                placeholder="请输入" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row">
          <a-col :span="10">
            <a-form-item
                label="个人简介"
                v-bind="formItemLayout"
              >
                <a-textarea
                  v-decorator="[
                    'me_short_intrduce',
                    { 
                      initialValue: aboutInfoObj.me_short_intrduce
                    }
                  ]"
                  placeholder="请输入"
                  :autosize="{ minRows: 6 }" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    <a-card class="card" title="关于网站" :bordered="false">
      <a-form :form="siteForm" class="form">
        <a-row class="form-row">
          <a-col :span="10">
            <a-form-item
              label="网站服务器"
              v-bind="formItemLayout"
            >
              <a-input
                v-decorator="[
                  'web_server',
                  { 
                    initialValue: aboutInfoObj.web_server
                  }
                ]"
                placeholder="请输入" />
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <a-form-item
              label="建站时间"
              v-bind="formItemLayout"
              help="格式：1995 年 5月"
            >
              <a-input
                v-decorator="[
                  'build_time',
                  { 
                    initialValue: aboutInfoObj.build_time
                  }
                ]"
                placeholder="请输入" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row">
          <a-col :span="10">
            <a-form-item
                label="网站简介"
                v-bind="formItemLayout"
              >
                <a-textarea
                  v-decorator="[
                    'site_short_intrduce',
                    { 
                      initialValue: aboutInfoObj.site_short_intrduce
                    }
                  ]"
                  placeholder="请输入"
                  :autosize="{ minRows: 6 }" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col>
            <a-form-item
              :wrapper-col="{ span: 12, offset: 10 }"
            >
              <a-button class="btns" type="primary" @click="modifyNotice">修改</a-button>
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
      aboutInfoObj: {
        id: 1,
        true_name: '',
        university: '',
        hobby: '',
        doing_work: '',
        me_short_intrduce: '',
        web_server: '',
        build_time: '',
        site_short_intrduce: ''
      },
      formItemLayout: {
        labelCol: { span: 10 },
        wrapperCol: { span: 14 }
      }
    }
  },
  methods: {
    // 获得公告
    getNotice () {
      this.$axios.get('/api/site/getSiteAboutInfo').then(res => {
        const result = res.data
        if (result.code === 1) {
          let siteAboutObj = result.data.site_about_obj
          this.aboutInfoObj = {
            id: 1,
            true_name: siteAboutObj.true_name,
            university: siteAboutObj.university,
            hobby: siteAboutObj.hobby,
            doing_work: siteAboutObj.doing_work,
            me_short_intrduce: siteAboutObj.me_short_intrduce,
            web_server: siteAboutObj.web_server,
            build_time: siteAboutObj.build_time,
            site_short_intrduce: siteAboutObj.site_short_intrduce
          }
        }
      })
    },
    // 修改公告
    modifyNotice () {
      this.aboutInfoObj = {
        id: 1,
        true_name: this.siterForm.getFieldValue('true_name'),
        university: this.siterForm.getFieldValue('university'),
        hobby: this.siterForm.getFieldValue('hobby'),
        doing_work: this.siterForm.getFieldValue('doing_work'),
        me_short_intrduce: this.siterForm.getFieldValue('me_short_intrduce'),
        web_server: this.siteForm.getFieldValue('web_server'),
        build_time: this.siteForm.getFieldValue('build_time'),
        site_short_intrduce: this.siteForm.getFieldValue('site_short_intrduce')
      }
      this.$axios.post('/api/site/saveSiteAboutInfo', this.aboutInfoObj).then((res) => {
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
    this.getNotice()
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
