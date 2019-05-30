<template>
  <div class="home-wrapper">
    <a-back-top />
    <nav class="nav-list-wrapper">
      <ul class="nav-list">
        <li class="nav-item" @click="getArticleByCate(item.id, item.name, index)" :class="[ index === activeIndex ? 'active' : '']" v-for="(item, index) in cateList" :key="index">
          <a href="javascript:;">{{ item.name }}</a>
        </li>
      </ul>
    </nav>
    <section class="main-content-wrapper">
      <a-row :gutter="18">
        <a-col :span="16">
          <carousel style="margin-top: 20px"></carousel>
          <a-spin :spinning="spinning">
            <article-list :cate-name="activeName" :list-data="articleList" style="margin-top: 20px"></article-list>
          </a-spin>
        </a-col>
        <a-col :span="8">
          <a-card title="公告" style="height: 200px" v-if="noticeObj.status === 1">
            <a href="javascript:;" @click="noticePreVisible = true" slot="extra">更多内容</a>
            <div v-html="noticeContentFilter" class="text-filter"></div>
          </a-card>
          <a-card
            style="width:100%; margin-top: 20px"
            title="名片"
          >
            <a-tabs defaultActiveKey="1">
              <a-tab-pane key="1">
                <span slot="tab">
                  <a-icon type="user" />
                  个人
                </span>
                Tab 1
              </a-tab-pane>
              <a-tab-pane key="2">
                <span slot="tab">
                  <a-icon type="home" />
                  站点
                </span>
                Tab 2
              </a-tab-pane>
            </a-tabs>
          </a-card>
          <a-card title="点击排行" style="margin-top: 20px">
            <p>card content</p>
            <p>card content</p>
            <p>card content</p>
          </a-card>
          <a-card title="友情链接" style="margin-top: 20px">
            <a href="javascript:;" slot="extra">申请友情链接</a>
            <p>card content</p>
            <p>card content</p>
            <p>card content</p>
          </a-card>
        </a-col>
      </a-row>
    </section>

    <!-- 公告预览弹窗 -->
    <a-modal
      v-model="noticePreVisible"
      title="公告"
      style="top: 20px"
      width="50%" 
    >
      <template slot="footer">
        <a-button type="primary" @click="noticePreVisible = false">确认</a-button>
      </template>
      <div>
        <div v-html="noticeObj.content"></div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import Carousel from '@/components/Home/Carousel'
import ArticleList from '@/components/Common/ArticleList'
import { STATIC_IMG_URL } from '@/config'

export default {
  components: {
    Carousel,
    ArticleList
  },
  data () {
    return {
      activeIndex: 0,
      activeName: '前端',
      cateList: [],
      articleList: [],
      spinning: false,
      noticeObj: {
        id: 1,
        name: '',
        content: '',
        status: 1
      },
      noticePreVisible: false
    }
  },
  computed: {
    noticeContentFilter () {
      if (this.noticeObj.content.length > 10) {
        return this.noticeObj.content.substring(0, 10) + '...'
      } else {
        return this.noticeObj.content
      }
    }
  },
  methods: {
    onTabChange (key, type) {
      this[type] = key
    },
    // 获得文章栏目列表
    getArticleCateList () {
      this.$axios.get('/api/article/getArticleCateList').then(res => {
        const result = res.data
        if (result.code === 1) {
          this.cateList = result.data.cate_list
          this.getArticleByCate(this.cateList[0].id, this.activeName, this.activeIndex)
        }
      })
    },
    // 通过文章栏目获取文章
    getArticleByCate (id, name, index) {
      this.activeIndex = index
      this.activeName = name
      this.articleList = []
      this.spinning = true
      this.$axios.get('/api/article/getArticleList', {
        params: {
          cate_id: id
        }
      }).then(res => {
        const result = res.data
        if (result.code === 1) {
          result.data.art_list.forEach(item => {
            this.articleList.push({
              id: item.id,
              title: item.title,
              content: item.content,
              avatar: `${STATIC_IMG_URL}/${item.avatar}`,
              actions: [
                { type: 'star-o', text: item.save_num },
                { type: 'like-o', text: item.like_num }
              ]
            })
          })
          this.spinning = false
        }
      })
    },
    // 获得公告
    getNotice () {
      this.tableLoading = true
      this.$axios.get('/api/notice/getNoticeList').then(res => {
        const result = res.data
        if (result.code === 1) {
          this.noticeObj = result.data.notice_list[0]
          this.tableLoading = false
        }
      })
    }
  },
  beforeMount () {
    this.getArticleCateList()
    this.getNotice()
  }
}
</script>

<style scoped>
.home-wrapper {
  height: 100%;
}
.nav-list-wrapper {
  height: 30px;
}
.nav-list {
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  height: 100%;
}
.nav-item {
  height: 100%;
  align-items: center;
  display: flex;
  flex-shrink: 0;
  font-size: 16px;
  color: #71777c;
  padding: 0 1rem;
}
.nav-item:hover, .active {
  color: #007fff;
}
.nav-item a {
  color: inherit;
  background-color: transparent;
}
.main-content-wrapper {
  max-width: 960px;
  margin: 0 auto;
  height: 100%;
}
</style>
