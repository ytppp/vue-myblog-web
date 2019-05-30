<template>
  <div class="container">
    <a-back-top />
    <a-card class="card" title="站点设置" :bordered="false">
      <a-form :form="form" class="form" @submit="updateSiteInfo">
        <a-row class="form-row">
          <a-col :span="6">
            <a-form-item
              label="网站名"
              v-bind="formItemLayout"
            >
              <a-input
                v-decorator="[
                  'siteName',
                  { 
                    initialValue: siteInfo.siteName,
                    rules: [{
                      required: true,
                      whitespace: true,
                      message: '请输入网站名'
                    }]
                  }
                ]"
                placeholder="请输入网站名" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row">
          <a-col :span="6">
            <a-form-item
                label="网站关键字"
                v-bind="formItemLayout"
              >
                <a-textarea
                  v-decorator="[
                    'siteKeyword',
                    { 
                      initialValue: siteInfo.siteKeyword,
                      rules: [{
                        required: true,
                        whitespace: true,
                        message: '请输入网站关键字'
                      }]
                    }
                  ]"
                  placeholder="请输入网站关键字"
                  :autosize="{ maxRows: 4 }" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row">
          <a-col :span="6">
            <a-form-item
              label="最大置顶文章数"
              v-bind="formItemLayout"
            >
              <a-input-number :min="3" :max="6" v-model="siteInfo.topArticleNum" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              label="最大热门文章数"
              v-bind="formItemLayout"
            >
              <a-input-number :min="3" :max="6" v-model="siteInfo.hotArticleNum" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row">
          <a-col :span="6">
            <a-form-item
              label="网站"
              v-bind="formItemLayout"
            >
              <a-switch v-model="siteInfo.isOpen" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              label="网站注册"
              v-bind="formItemLayout"
            >
              <a-switch v-model="siteInfo.isReg" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              label="网站登录"
              v-bind="formItemLayout"
            >
              <a-switch v-model="siteInfo.isLogin" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              label="友链申请"
              v-bind="formItemLayout"
            >
              <a-switch v-model="siteInfo.isLinks" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="6">
            <a-form-item
              label="网站评论"
              v-bind="formItemLayout"
            >
              <a-switch v-model="siteInfo.isComment" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              label="留言"
              v-bind="formItemLayout"
            >
              <a-switch v-model="siteInfo.isWords" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              label="评论、留言审核"
              v-bind="formItemLayout"
            >
              <a-switch v-model="siteInfo.isUserCheck" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col>
            <a-form-item
              :wrapper-col="{ span: 22, offset: 2 }"
            >
              <a-button type="primary" html-type="submit">修改</a-button>
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
      siteInfo: {
        siteName: '杨庭培的个人博客',
        siteKeyword: '个人博客',
        hotArticleNum: 5,
        topArticleNum: 5,
        isOpen: true,
        isReg: false,
        isLogin: false,
        isLinks: false,
        isComment: false,
        isWords: false,
        isUserCheck: false
      }
    }
  },
  methods: {
    updateSiteInfo (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$axios.post('/api/site/updateAllSiteInfo', {
            name: this.form.getFieldValue('siteName'),
            describe: this.form.getFieldValue('siteKeyword'),
            max_top_article_num: this.siteInfo.topArticleNum,
            max_hot_article_num: this.siteInfo.hotArticleNum,
            is_open: this.siteInfo.isOpen === true ? 1 : 0,
            is_reg: this.siteInfo.isReg === true ? 1 : 0,
            is_login: this.siteInfo.isLogin === true ? 1 : 0,
            is_link: this.siteInfo.isLinks === true ? 1 : 0,
            is_comment: this.siteInfo.isComment === true ? 1 : 0,
            is_words: this.siteInfo.isWords === true ? 1 : 0,
            is_check: this.siteInfo.isUserCheck === true ? 1 : 0
          }).then((res) => {
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
    getSiteInfo () {
      this.$axios.get('/api/site/getSiteInfo').then(res => {
        const result = res.data
        if (result.code === 1) {
          let siteInfoObj = result.data.site_info
          this.siteInfo = {
            siteName: siteInfoObj.name,
            siteKeyword: siteInfoObj.describe,
            hotArticleNum: siteInfoObj.max_hot_article_num,
            topArticleNum: siteInfoObj.max_top_article_num,
            isOpen: siteInfoObj.is_open === 1,
            isReg: siteInfoObj.is_reg === 1,
            isLogin: siteInfoObj.is_login === 1,
            isLinks: siteInfoObj.is_link === 1,
            isComment: siteInfoObj.is_comment === 1,
            isWords: siteInfoObj.is_words === 1,
            isUserCheck: siteInfoObj.is_check === 1
          }
        } else {
          this.$message.error(result.message)
        }
      })
    }
  },
  beforeMount () {
    this.getSiteInfo()
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  background-color: #ffffff;
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
