<template>
  <div class="home-wrapper">
    <section class="main-content-wrapper">
      <a-back-top />
      <a-row :gutter="18">
        <a-col :span="24">
          <a-spin :spinning="spinning">
            <article-detail :article="articleObj" :operates="operates"></article-detail>
          </a-spin>
        </a-col>
      </a-row>
    </section>
  </div>
</template>

<script>
import ArticleDetail from '@/components/Common/ArticleDetail'

export default {
  components: {
    ArticleDetail
  },
  data () {
    return {
      articleObj: {
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
      operates: {
        isShowBottom: true
      },
      spinning: false
    }
  },
  methods: {
    // 获得文章栏目列表
    getArticleDetailById () {
      let id = this.$route.query.id
      this.getArticleDetailFromBackEnd(id)
    },
    getArticleDetailFromBackEnd (id) {
      this.spinning = true
      this.$axios.get('/api/article/getArticleDetail', {
        params: {
          id
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
          } else {
            this.articleObj.url_address = ''
          }
          this.articleObj.is_draft = result.data.is_draft
          this.articleObj.update_person_id = result.data.update_person_id
          this.spinning = false
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
    }
  },
  mounted () {
    this.getArticleDetailById()
  }
}
</script>

<style scoped>
.home-wrapper {
  height: 100%;
}
.main-content-wrapper {
  max-width: 960px;
  margin: 0 auto;
  height: 100%;
}
</style>
