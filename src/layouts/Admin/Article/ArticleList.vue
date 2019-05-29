<template>
  <div class="main-wrapper">
    <a-card class="card" title="文章列表" :bordered="false">
      <div class="top-wrapper">
        <div class="form-wrapper">
          <a-form
            layout="inline"
            :form="form"
            @submit="handleSearchSubmit"
          >
            <a-form-item>
              <a-input
                v-decorator="[
                  'title',
                  {
                    initialValue: '',
                  }
                ]"
                placeholder="请输入文章标题"
              >
                <a-icon
                  slot="prefix"
                  type="book"
                  style="color:rgba(0,0,0,.25)"
                />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-select 
                v-decorator="[
                  'article_author_id',
                  {
                    initialValue: '',
                  }
                ]"
                @change="handleAuthorChange"
                placeholder="请选择作者"
                style="width: 120px" 
              >
                <a-select-option value="">全部作者</a-select-option>
                <a-select-option
                  v-for="item in ARTICLE_AUTHOR_CONFIG"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item>
              <a-select
                v-decorator="[
                  'article_cate_id',
                  {
                    initialValue: '',
                  }
                ]"
                @change="handleCateChange"
                placeholder="请选择栏目"
                style="width: 120px"
              >
                <a-select-option value="">全部栏目</a-select-option>
                <a-select-option
                  v-for="item in cateList"
                  :key="item.id"
                  :value="item.id">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item>
              <a-button
                type="primary"
                html-type="submit"
              >
                搜索
              </a-button>
            </a-form-item>
          </a-form>
        </div>
        <div class="btns-wrapper">
          <a-radio-group defaultValue="1" buttonStyle="solid" @change="handleStatusChange">
            <a-radio-button value="1">公开</a-radio-button>
            <a-radio-button value="0">私密</a-radio-button>
          </a-radio-group>
          <a-divider type="vertical" />
          <a-radio-group defaultValue="1" buttonStyle="solid" @change="handleDraftChange">
            <a-radio-button value="1">草稿</a-radio-button>
            <a-radio-button value="0">已发表</a-radio-button>
          </a-radio-group>
          <a-divider type="vertical" />
          <a-radio-group defaultValue="0" buttonStyle="solid" @change="handleTopChange">
            <a-radio-button value="1">置顶</a-radio-button>
            <a-radio-button value="0">非置顶</a-radio-button>
          </a-radio-group>
          <a-divider type="vertical" />
          <a-radio-group defaultValue="0" buttonStyle="solid" @change="handleHotChange">
            <a-radio-button value="1">热门</a-radio-button>
            <a-radio-button value="0">非热门</a-radio-button>
          </a-radio-group>
        </div>
      </div>
      <div class="table-wrapper">
        <div class="table-operations">
          <a-button @click="goArticleAdd">新增文章</a-button>
          <a-button @click="resetSearchParams">重置搜索条件</a-button>
        </div>
        <a-table
          :rowKey="record => record.id"
          :columns="columns"
          :dataSource="articleList"
          :loading="tableLoading"
        >
          <template slot="operation" slot-scope="text, record">
            <a href="javascript:;" @click="goArticleEdit(record.id)">编辑</a>
            <a-divider type="vertical" />
            <a href="javascript:;" @click="showArticleDetail(record.id)">详情</a>
            <a-divider type="vertical" />
            <a-popconfirm
              title="确定删除吗?"
              cancelText="取消"
              okText="确认"
              @confirm="() => openArticleDeleteModal(record.id, record.title)">
              <a href="javascript:;">删除</a>
            </a-popconfirm>
            <a-divider type="vertical" />
            <a-dropdown>
              <a class="ant-dropdown-link" href="#">
                更多操作 <a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a href="javascript:;" @click="changeArtStatus('status', record.id, record.status)">{{ record.status === '公开' ? '转为私密' : '转为公开' }}</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;" @click="changeArtStatus('is_draft', record.id, record.is_draft)">{{ record.is_draft === '草稿' ? '转为发表' : '转为草稿' }}</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;" @click="changeArtStatus('is_top', record.id, record.is_top)">{{ record.is_top === '置顶' ? '取消置顶' : '转为置顶' }}</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;" @click="changeArtStatus('is_hot', record.id, record.is_hot)">{{ record.is_hot === '热门' ? '取消热门' : '转为热门' }}</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
        </a-table>
      </div>
    </a-card>

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

    <!-- 文章删除弹窗 -->
    <a-modal
      v-model="articleDeleteVisible"
      title="文章删除"
      okText="确认"
      okType="danger"
      @ok="submitArticleDelete"
      cancelText="取消"
      onCancel="articleDeleteVisible = false"
      style="top: 20px"
    >
      <a-row :gutter="16">
        <a-col :span="24">
          <a-alert type="error" message="删除文章属于敏感操作，请谨慎操作" banner />
        </a-col>
      </a-row>
      <a-row :gutter="16" style="margin-top: 8px">
        <a-col :span="24">
          <a-form
            layout="inline"
            :form="articleDeleteform"
          >
            <a-form-item
              label="文章名"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-input placeholder="请输入要删除的文章名" v-model="articleTitle" ref="articleTitleInput">
                <a-icon slot="prefix" type="user" />
                <a-icon v-if="articleTitle" slot="suffix" type="close-circle" @click="emitEmpty" />
              </a-input>
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
import {
  ARTICLE_AUTHOR_CONFIG,
  ARTICLE_LIST_COLUMNS_CONFIG,
  STATIC_IMG_URL
} from '@/config'
import ArticleDetail from '@/components/Common/ArticleDetail'

export default {
  components: {
    ArticleDetail
  },
  data () {
    return {
      ARTICLE_AUTHOR_CONFIG,
      STATIC_IMG_URL,
      cateList: null,
      searchParams: {
        keywords: '',
        author_id: '',
        cate_id: '',
        status: '',
        is_draft: '',
        is_top: '',
        is_hot: ''
      },
      articleList: null,
      columns: ARTICLE_LIST_COLUMNS_CONFIG,
      articleViewVisible: false,
      articleObj: {
        title: '',
        status: '', // 1 不是私密 0 是私密
        cate_id: '',
        cate_name: '',
        author_id: '',
        author: '',
        url_address: '',
        avatar: '',
        content: '',
        pv: 1,
        save_num: 1,
        like_num: 1,
        is_draft: '', // 默认不是草稿,
        is_top: '',
        is_hot: '',
        create_person_id: 1,
        update_person_id: 1
      },
      tableLoading: false,
      articleInfo: {
        id: '',
        title: ''
      },
      articleTitle: '',
      articleDeleteVisible: false
    }
  },
  methods: {
    emitEmpty () {
      this.$refs.articleTitleInput.focus()
      this.articleTitle = ''
    },
    handleAuthorChange (value) {
      // console.log(value)
      this.searchParams.author_id = value
    },
    handleCateChange (value) {
      // console.log(value)
      this.searchParams.cate_id = value
    },
    handleStatusChange (e) {
      // console.log('radio checked', e.target.value)
      this.searchParams.status = e.target.value
      this.getArticleList()
    },
    handleDraftChange (e) {
      // console.log('radio checked', e.target.value)
      this.searchParams.is_draft = e.target.value
      this.getArticleList()
    },
    handleTopChange (e) {
      // console.log('radio checked', e.target.value)
      this.searchParams.is_top = e.target.value
      this.getArticleList()
    },
    handleHotChange (e) {
      // console.log('radio checked', e.target.value)
      this.searchParams.is_hot = e.target.value
      this.getArticleList()
    },
    handleSearchSubmit () {
      if (this.form.getFieldValue('title')) {
        this.searchParams.keywords = this.form.getFieldValue('title')
      } else {
        this.searchParams.keywords = ''
      }
      this.getArticleList()
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
    // 获得文章列表
    getArticleList () {
      this.tableLoading = true
      this.$axios.get('/api/article/getArticleList', {
        params: this.searchParams
      }).then(res => {
        const result = res.data
        if (result.code === 1) {
          this.articleList = result.data.art_list
          this.articleList.forEach(item => {
            item.author_id = this.coverAuthorId(item.author_id)
          })
          this.tableLoading = false
        }
      })
    },
    goArticleEdit (key) {
      this.$router.push({
        path: '/admin/article-add',
        query: {
          id: key,
          type: 'edit'
        }
      })
    },
    goArticleAdd () {
      this.$router.push({
        path: '/admin/article-add',
        query: {
          type: 'add'
        }
      })
    },
    get (text, record) {
      console.log(text, record)
    },
    showArticleDetail (key) {
      this.getArticleDetail(key)
      this.articleViewVisible = true
    },
    // 获取文章信息
    getArticleDetail (key) {
      this.articleList.forEach((item) => {
        if (item.id === key) {
          this.articleObj.title = item.title
          this.articleObj.status = item.status
          this.articleObj.cate_id = item.cate_id
          
          this.articleObj.author_id = this.parseAuthorName(item.author_id)
          this.articleObj.author = item.author_id
          this.articleObj.content = item.content
          this.articleObj.avatar = `${STATIC_IMG_URL}${item.avatar}`
          this.articleObj.pv = item.pv
          this.articleObj.save_num = item.save_num
          this.articleObj.like_num = item.like_num
          this.articleObj.is_top = item.is_top
          this.articleObj.is_hot = item.is_hot
          if (item.url_address) {
            this.articleObj.url_address = item.url_address
          } else {
            this.articleObj.url_address = ''
          }
          this.articleObj.is_draft = item.is_draft
          this.articleObj.create_person_id = item.create_person_id
          this.articleObj.update_person_id = item.update_person_id
        }
      })
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
    },
    parseAuthorName (authorText) {
      let authorId = ''
      switch (authorText) {
        case '原创':
          authorId = 1
          break
        case '转载':
          authorId = 2
          break
        case '翻译':
          authorId = 3
          break
        default:
          authorId = 1
      }
      return authorId
    },
    changeArtStatus (text, id, status) {
      const articleList = [...this.articleList]
      let val = 1
      articleList.forEach(item => {
        if (item.id === id) {
          switch (text) {
            case 'status':
              item.status = status === '公开' ? '私密' : '公开'
              val = item.status === '公开' ? 1 : 0
              this.changeStatus(id, 'status', val)
              break
            case 'is_draft':
              item.is_draft = status === '草稿' ? '发表' : '草稿'
              val = item.is_draft === '草稿' ? 1 : 0
              this.changeStatus(id, 'is_draft', val)
              break
            case 'is_top':
              item.is_top = status === '置顶' ? '非置顶' : '置顶'
              val = item.is_top === '置顶' ? 1 : 0
              this.changeStatus(id, 'is_top', val)
              break
            case 'is_hot':
              item.is_hot = status === '热门' ? '非热门' : '热门'
              val = item.is_hot === '热门' ? 1 : 0
              this.changeStatus(id, 'is_hot', val)
              break
          }
        }
      })
      this.articleList = articleList
    },
    changeStatus (id, key, value) {
      this.$axios.get('/api/article/changeArticleStatus', {
        params: {
          id,
          key,
          value
        }
      }).then(res => {
        const result = res.data
        if (result.code === 1) {
          this.$message.success('更改文章状态成功')
        } else {
          this.$message.error('更改文章状态失败')
        }
      })
    },
    resetSearchParams () {
      this.searchParams = {
        keywords: '',
        author_id: '',
        cate_id: '',
        status: '',
        is_draft: '',
        is_top: '',
        is_hot: ''
      }
      this.getArticleList()
    },
    openArticleDeleteModal (key, title) {
      this.articleInfo.id = key
      this.articleInfo.title = title
      this.articleDeleteVisible = true
    },
    submitArticleDelete () {
      if (this.articleTitle.trim() === '') {
        this.$message.error('文章标题不能为空')
        return
      }
      if (this.articleTitle !== this.articleInfo.title) {
        this.$message.error('输入文章标题不匹配，请重试')
        return
      }
      const articleList = [...this.articleList]
      this.$axios.get('/api/article/deleteArticle', {
        params: {
          id: this.articleInfo.id
        }
      }).then(res => {
        const result = res.data
        if (result.code === 1) {
          this.articleList = articleList.filter(item => item.id !== this.articleInfo.id)
          this.$message.success('已删除文章')
          this.articleDeleteVisible = false
        } else {
          this.$message.error('删除文章失败')
        }
      })
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
    this.articleDeleteform = this.$form.createForm(this)
  },
  beforeMount () {
    this.getArticleCateList()
    this.getArticleList()
  }
}
</script>

<style scoped>
.main-wrapper {
  background-color: #ffffff;
  height: 100%
}
.top-wrapper {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-wrapper {
  display: inline-block;
}
.btns-wrapper {
  display: inline-block;
}

.table-operations {
  margin-bottom: 16px;
}

.table-operations > button {
  margin-right: 8px;
}
</style>
