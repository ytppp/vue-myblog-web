<template>
  <div class="project-add-wrapper">
    <a-form :form="form" class="form">
      <a-row class="form-row">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="标题："
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 20 }"
          >
            <a-row :gutter="8" class="form-row">
              <a-col :span="18">
                <a-input
                  v-decorator="[
                    'title',
                    { 
                      initialValue: articleObj.title,
                      rules: [
                        {
                          required: true,
                          message: '请输入标题',
                          whitespace: true 
                        },
                        {
                          max: 50,
                          min: 1,
                          message: '标题长度在1到50个字符之间'
                        }
                      ]
                    }
                  ]"
                  placeholder="请输入标题" />
              </a-col>
            </a-row>
          </a-form-item>
        </a-col>
        <a-col :xl="{span: 6, offset: 2}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
          <a-form-item
            label="私密："
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 20 }"
          >
            <a-switch
              v-decorator="[
                'is_secret',
                {
                  initialValue: articleObj.status && articleObj.status === 1 ? true : false,
                  valuePropName: 'checked',
                }
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="form-row">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="分类："
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 20 }"
          >
            <a-row :gutter="8" class="form-row">
              <a-col :span="12">
                <a-select
                  v-decorator="[
                    'article_type_id',
                    { 
                      initialValue: articleObj.cate_id === 0 ? cateList[0].id : articleObj.cate_id,
                      rules: [
                        {
                          required: true,
                          message: '请请选择分类'
                        }
                      ]
                    }
                  ]"
                  placeholder="请选择分类">
                  <a-select-option
                    v-for="item in cateList"
                    :key="item.id"
                    :value="item.id">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-col>
              <a-col :span="12">
                <a-button @click="addTypeViewVisible = true">增加分类</a-button>
              </a-col>
            </a-row>
          </a-form-item>
        </a-col>
        <a-col :xl="{span: 6, offset: 2}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
          <a-form-item
            label="作者："
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 20 }"
          >
            <a-row :gutter="8" class="form-row">
              <a-col :span="12">
                <a-select
                  v-decorator="[
                    'article_author_id',
                    {
                      initialValue: articleObj.author_id ? articleObj.author_id : 1,
                      rules: [
                        {
                          required: true,
                          message: '请选择作者'
                        }
                      ]
                    }
                  ]"
                  @change="handleArticleAuthorChange"
                  placeholder="请选择作者"
                >
                  <a-select-option
                  v-for="item in ARTICLE_AUTHOR_CONFIG"
                  :key="item.value"
                  :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-col>
            </a-row>
          </a-form-item>
        </a-col>
        <a-col :xl="{span: 8, offset: 2}" :lg="{span: 10}" :md="{span: 24}" :sm="24" v-show="urlFormItem">
          <a-form-item
            label="转载地址："
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 20 }"
          >
            <a-row :gutter="8" class="form-row">
              <a-col :span="16">
                <a-input
                  v-decorator="[
                    'url_address',
                    { 
                      initialValue: articleObj.url_address ? articleObj.url_address : '',
                    }
                  ]"
                  placeholder="请输入转载地址"
                >
                </a-input>
              </a-col>
            </a-row>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="form-row">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="封面："
          >
            <div class="dropbox">
              <a-upload-dragger
                v-decorator="[
                  'article_cover',
                  {
                    valuePropName: 'fileList',
                    getValueFromEvent: normFile,
                  }
                ]"
                name="avatar"
                action="/api/images/saveAvatar"
                :beforeUpload="beforeUpload"
                @change="handleChange"
              >
                <p class="ant-upload-drag-icon">
                  <a-icon type="inbox" />
                </p>
                <p class="ant-upload-text">
                  点击或拖动文件到这里上传
                </p>
                <p class="ant-upload-hint">
                  {{ articleObj.avatar && editType === 'edit' ? '已上传封面' : '上传封面'}}
                </p>
              </a-upload-dragger>
          </div>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="form-row">
        <a-col :lg="20" :md="20" :sm="24">
          <a-form-item
            label="内容："
          >
            <rich-editor
              :clear="isClearEditor"
              @letClearfalse="handleLetClearfalse"
              :onContent="getEditorContent"
              :editorContent="articleObj.content"
              :editor-config="1"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="form-row">
        <a-col :lg="20" :md="20" :sm="24">
          <a-button @click="showArticleDetail" class="btns">预览</a-button>
          <a-button @click="clearEditorContent" type="danger" class="btns">清除内容</a-button>
          <a-button @click="submitArticle(1)" class="btns">存为草稿</a-button>
          <a-button @click="submitArticle(0)" type="primary" class="btns">发表</a-button>
          <a-button @click="goArticleList" class="btns">返回</a-button>
        </a-col>
      </a-row>
    </a-form>
    <!-- 文章预览弹窗 -->
    <a-modal
      v-model="articleViewVisible"
      title="文章预览"
      onOk="articleViewVisible = false"
      style="top: 20px"
      width="75%" 
    >
      <template slot="footer">
        <a-button type="primary" @click="articleViewVisible = false">确认</a-button>
      </template>
      <article-detail :article="articleObj"></article-detail>
    </a-modal>
    <!-- 增加分类弹窗 -->
    <a-modal
      v-model="addTypeViewVisible"
      title="增加文章分类"
      onOk="addTypeViewVisible = false"
      style="top: 20px"
      width="40%"
    >
      <template slot="footer">
        <a-button type="primary" @click="addTypeViewVisible = false">关闭</a-button>
      </template>
      <a-form
        :form="addTypeform"
        layout="inline">
        <a-form-item>
          <a-input
            v-decorator="[
              'article_type',
              {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: '请输入要增加的文章分类',
                    whitespace: true 
                  }
                ]
              }
            ]"
            size="large"
            placeholder="文章分类" >
            <a-icon slot="prefix" type="profile" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="addArticleType">增加</a-button>
        </a-form-item>
        <div class="art-cate-wrapper">
          <strong style="margin-right: 8px">已有文章栏目:</strong>
          <template v-for="(item, index) in cateList">
            <a-tag
              :key="item.id"
              :closable="index !== 0"
              color="blue"
              @close="deleteArticleCateClose(item)"
              :cateId="item.id"
            >
              {{item.name}}
            </a-tag>
          </template>
        </div>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import {
  ARTICLE_AUTHOR_CONFIG,
  STATIC_IMG_URL
} from '@/config'
import RichEditor from '@/components/Common/Editor'
import ArticleDetail from '@/components/Common/ArticleDetail'

export default {
  data () {
    return {
      ARTICLE_AUTHOR_CONFIG,
      STATIC_IMG_URL,
      articleViewVisible: false,
      addTypeViewVisible: false,
      urlFormItem: false,
      cateList: null,
      isClearEditor: false,
      articleObj: {
        id: '',
        title: '',
        status: 1, // 1 公开 0 是私密
        cate_id: 0,
        author_id: 1,
        author: '',
        url_address: '',
        avatar: '',
        content: '<p>请输入内容...<p>',
        pv: 1,
        save_num: 1,
        like_num: 1,
        is_draft: 0, // 0 不是草稿 1 是草稿
        create_person_id: 1,
        update_person_id: 1
      },
      editType: 'add'
    }
  },
  components: {
    RichEditor,
    ArticleDetail
  },
  methods: {
    // 发表文章
    submitArticle (isDraft) {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.getArticleDetail(isDraft)
          delete this.articleObj.author
          this.$axios.post('/api/article/saveArticle', this.articleObj).then((res) => {
            const result = res.data
            if (result.code === 1) {
              this.$message.success(result.message, 2).then(() => {
                this.$router.push('/admin/article-list')
              })
            } else {
              this.$message.error(result.message)
            }
          })
        }
      })
    },
    // 增加文章栏目
    addArticleType () {
      this.addTypeform.validateFields((err, values) => {
        if (!err) {
          this.$axios.post('/api/article/addArticleCate', {
            name: this.addTypeform.getFieldValue('article_type')
          }).then((res) => {
            const result = res.data
            if (result.code === 1) {
              this.$message.success(result.message)
              this.cateList.push({
                id: result.data.id,
                name: result.data.name
              })
            } else {
              this.$message.error(result.message)
            }
          })
        }
      })
    },
    // 删除文章栏目
    deleteArticleCateClose (cate) {
      // e.preventDefault()
      this.$axios.get('/api/article/deleteArticleCate', {
        params: {
          cateId: cate.id
        }
      }).then(res => {
        const result = res.data
        if (result.code === 1) {
          let tempCateList = this.cateList
          this.cateList = tempCateList.filter((item) => {
            if (item.id === cate.id) {
              return true
            }
          })
          this.$message.success(result.message)
        }
      })
    },
    // 获得文章栏目列表
    getArticleCateList () {
      this.$axios.get('/api/article/getArticleCateList').then(res => {
        const result = res.data
        if (result.code === 1) {
          this.cateList = result.data.cate_list
        }
      })
    },
    getArticleDetailFromBackEnd (id) {
      this.$axios.get('/api/article/getArticleDetail', {
        params: {
          id: id
        }
      }).then(res => {
        const result = res.data
        if (result.code === 1) {
          this.articleObj.title = result.data.title
          this.articleObj.status = result.data.status
          this.articleObj.cate_id = result.data.cate_id
          this.articleObj.author_id = result.data.author_id
          this.articleObj.avatar = result.data.avatar
          this.articleObj.content = result.data.content
          this.articleObj.pv = result.data.pv
          this.articleObj.save_num = result.data.save_num
          this.articleObj.like_num = result.data.like_num
          this.articleObj.author = this.coverAuthorId(result.data.author_id)
          if (this.articleObj.author_id === 2) {
            this.articleObj.url_address = result.data.url_address
            this.urlFormItem = true
          } else {
            this.articleObj.url_address = ''
            this.urlFormItem = false
          }
          this.articleObj.is_draft = result.data.is_draft
          this.articleObj.update_person_id = result.data.update_person_id
        }
      })
    },
    // 切换文章作者栏目，当栏目为2时，显示转载url表单项
    handleArticleAuthorChange (value) {
      if (value === 2) {
        this.urlFormItem = true
      } else {
        this.urlFormItem = false
      }
    },
    normFile (e) {
      if (Array.isArray(e)) {
        return e
      }
      return e && e.fileList
    },
    // 图片上传
    handleChange (info) {
      if (info.file.status === 'uploading') {
        return
      }
      if (info.file.status === 'done') {
        this.articleObj.avatar = info.file.response.data.img_url
      }
    },
    // 上传图片检查
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif' 
      if (!isJPG) {
        this.$message.error('上传图片不符合要求')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('图片必须小于2MB!')
      }
      return isJPG && isLt2M
    },
    // 清除编辑器内容
    clearEditorContent () {
      this.isClearEditor = true
    },
    // 接受编辑器子组件传的参数
    handleLetClearfalse (data) {
      this.isClearEditor = data
    },
    // 获取编辑器内容
    getEditorContent (content) {
      this.articleObj.content = content
    },
    // 获取文章信息
    getArticleDetail (isDraft) {
      let authorId = this.form.getFieldValue('article_author_id')

      this.articleObj.title = this.form.getFieldValue('title')
      this.articleObj.status = this.form.getFieldValue('is_secret')
      this.articleObj.cate_id = this.form.getFieldValue('article_type_id')
      this.articleObj.author_id = authorId
      this.articleObj.pv = 1
      this.articleObj.save_num = 1
      this.articleObj.like_num = 1
      this.articleObj.author = this.coverAuthorId(authorId)
      if (this.articleObj.author_id === 2) {
        this.articleObj.url_address = this.form.getFieldValue('url_address')
      } else {
        this.articleObj.url_address = ''
      }
      if (isDraft === 1) { // 是草稿
        this.articleObj.is_draft = 1
      } else {
        this.articleObj.is_draft = 0
      }
      this.articleObj.create_person_id = 1
      this.articleObj.update_person_id = 1
    },
    // 预览文章
    showArticleDetail () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.getArticleDetail(0)
          this.articleViewVisible = true
        }
      })
    },
    getRouterData () {
      this.editType = this.$route.query.type
      if (this.$route.query.id) {
        this.articleObj.id = this.$route.query.id
        this.getArticleDetailFromBackEnd(this.articleObj.id)
      }
    },
    goArticleList () {
      this.$router.push('article-list')
    },
    coverAuthorId (authorId) {
      let authorText = ''
      switch (authorId) {
        case 1:
          authorText = '原创'
          break
        case 2:
          authorText = '转载'
          break
        case 3:
          authorText = '翻译'
          break
        default:
          authorText = '原创'
      }
      return authorText
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
    this.addTypeform = this.$form.createForm(this)
  },
  beforeMount () {
    this.getArticleCateList()
    this.getRouterData()
  }
}
</script>

<style lang="less" scoped>
.form{
  .btns {
    margin-right: 8px;
  }
}
.art-cate-wrapper {
  margin-top: 20px;
}
</style>
