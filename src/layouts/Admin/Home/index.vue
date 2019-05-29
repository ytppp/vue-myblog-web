<template>
  <div class="container">
    <a-card class="card" :bordered="false">
      <div class="welcome-wrapper">
        亲爱的{{ userName }}，{{getTimeSlot}}好呀！劳累了这么久，进来休息下吧。
      </div>
    </a-card>
    <a-card class="card" title="网站数据" :bordered="false">
      <a-row :gutter="12" class="site-data-wrapper">
        <a-col :span="4">
          <div class="info-box">
            <div class="info-box-top">
              {{ siteInfo.regUserNum }}<span class="box-unit">人</span>
            </div>
            <div class="info-box-bottom">
              注册人数
            </div>
          </div>
        </a-col>
        <a-col :span="4">
          <div class="info-box">
            <div class="info-box-top">
              {{ siteInfo.onlineUserNum }}<span class="box-unit">人</span>
            </div>
            <div class="info-box-bottom">
              登录人数
            </div>
          </div>
        </a-col>
        <a-col :span="4">
          <div class="info-box">
            <div class="info-box-top">
              {{ siteInfo.articleNum }}<span class="box-unit">篇</span>
            </div>
            <div class="info-box-bottom">
              发表文章
            </div>
          </div>
        </a-col>
        <a-col :span="4">
          <div class="info-box">
            <div class="info-box-top">
              {{ siteInfo.wordsNum }}<span class="box-unit">条</span>
            </div>
            <div class="info-box-bottom">
              留言
            </div>
          </div>
        </a-col>
        <a-col :span="4">
          <div class="info-box">
            <div class="info-box-top">
              {{ siteInfo.suggNum }}<span class="box-unit">条</span>
            </div>
            <div class="info-box-bottom">
              建议
            </div>
          </div>
        </a-col>
        <a-col :span="4">
          <div class="info-box">
            <div class="info-box-top">
              {{ siteInfo.moodsNum }}<span class="box-unit">条</span>
            </div>
            <div class="info-box-bottom">
              发表心情
            </div>
          </div>
        </a-col>
      </a-row>
    </a-card>
    <a-card class="card" :bordered="false">
      <div class="notice-wrapper">
        <div class="notice-title">
          公告：
        </div>
        <div class="notice-detail">
          这是一个详情......
        </div>
        <a-button @click="noticeModalVisible = true" type="primary" size="small" style="margin-right: 6px">详情</a-button>
        <a-button @click="goNoticePage" type="primary" size="small">修改公告</a-button>
      </div>
    </a-card>
    <a-card class="card" title="文章数据" :bordered="false">
      <a-row :gutter="12" class="article-num-wrapper">
        <a-col :span="4">
          <span class="article-num-title">最大置顶文章数：</span>{{ siteInfo.topArticleNum }}
        </a-col>
        <a-col :span="4">
          <span class="article-num-title">最大热门文章数：</span>{{ siteInfo.hotArticleNum }}
        </a-col>
        <a-col :span="4">
          <a-button @click="$router.push('/admin/site-setting')" type="primary">设置文章数</a-button>
        </a-col>
      </a-row>
      <a-row :gutter="12">
        <a-col :span="8">
          <a-card class="card" title="文章分类统计" :bodyStyle="cardHeight" :hoverable="true">
            <div class="pie-box">
              <pie-echarts :pie-obj="pieObj"></pie-echarts>
            </div>
          </a-card>
        </a-col>
        <a-col :span="16">
          <a-card class="card" :bodyStyle="cardHeight" :hoverable="true">
            <a href="javascript:;" @click="$router.push('/admin/article-list')" slot="extra" style="margin-right: 6px">文章管理</a>
            <a href="javascript:;" @click="$router.push('/admin/article-add')" slot="extra">发表文章</a>
            <a-tabs defaultActiveKey="1" @change="handleTabsToggle">
              <a-tab-pane key="1">
                <span slot="tab">
                  <a-icon type="tag" theme="filled" />
                  置顶文章
                </span>
                <a-table
                  :rowKey="record => record.id"
                  :columns="HOME_ARTICLE_LIST_CONFIG"
                  :dataSource="artList"
                  :loading="artTableLoading"
                >
                </a-table>
              </a-tab-pane>
              <a-tab-pane key="2">
                <span slot="tab">
                  <a-icon type="star" theme="filled" />
                  最热文章
                </span>
                <a-table
                  :rowKey="record => record.id"
                  :columns="HOME_ARTICLE_LIST_CONFIG"
                  :dataSource="artList"
                  :loading="artTableLoading"
                >
                </a-table>
              </a-tab-pane>
            </a-tabs>
          </a-card>
        </a-col>
      </a-row>
    </a-card>
    <a-card class="card" title="网站状态" :bordered="false">
      <a-row :gutter="12" class="link-status-wrapper">
        <a-col :span="8" class="status-wrapper">
          <a-card class="card" title="网站状态" :bodyStyle="cardHeight" :hoverable="true">
            <a href="javascript:;" slot="extra" @click="$router.push('/admin/site-setting')">站点设置</a>
            <div class="status-box">
              <span class="status-box-title">
                网站名：
              </span>
              <span class="status-box-content">
                {{ siteInfo.siteName }}
              </span>
            </div>
            <div class="status-box">
              <span class="status-box-title">
                网站关键字：
              </span>
              <span class="status-box-content">
                {{ siteInfo.siteKeyword }}
              </span>
            </div>
            <div class="status-box">
              <span class="status-box-title">
                网站：
              </span>
              <span class="status-box-content">
                <span class="open-text" v-if="siteInfo.isOpen === 1">
                  开启
                </span>
                <span class="close-text" v-else>
                  关闭
                </span>
              </span>
            </div>
            <div class="status-box">
              <span class="status-box-title">
                网站注册：
              </span>
              <span class="status-box-content">
                <span class="open-text" v-if="siteInfo.isReg === 1">
                  开启
                </span>
                <span class="close-text" v-else>
                  关闭
                </span>
              </span>
            </div>
            <div class="status-box">
              <span class="status-box-title">
                网站登录：
              </span>
              <span class="status-box-content">
                <span class="open-text" v-if="siteInfo.isLogin === 1">
                  开启
                </span>
                <span class="close-text" v-else>
                  关闭
                </span>
              </span>
            </div>
            <div class="status-box">
              <span class="status-box-title">
                友链申请：
              </span>
              <span class="status-box-content">
                <span class="open-text" v-if="siteInfo.isLinks === 1">
                  开启
                </span>
                <span class="close-text" v-else>
                  关闭
                </span>
              </span>
            </div>
            <div class="status-box">
              <span class="status-box-title">
                网站评论：
              </span>
              <span class="status-box-content">
                <span class="open-text" v-if="siteInfo.isComment === 1">
                  开启
                </span>
                <span class="close-text" v-else>
                  关闭
                </span>
              </span>
            </div>
            <div class="status-box">
              <span class="status-box-title">
                留言：
              </span>
              <span class="status-box-content">
                <span class="open-text" v-if="siteInfo.isWords === 1">
                  开启
                </span>
                <span class="close-text" v-else>
                  关闭
                </span>
              </span>
            </div>
            <div class="status-box">
              <span class="status-box-title">
                评论、留言审核：
              </span>
              <span class="status-box-content">
                <span class="open-text" v-if="siteInfo.isUserCheck === 1">
                  开启
                </span>
                <span class="close-text" v-else>
                  关闭
                </span>
              </span>
            </div>
          </a-card>
        </a-col>
        <a-col :span="16">
          <a-card class="card" title="最近友链申请" :bodyStyle="cardHeight" :hoverable="true">
            <a href="javascript:;" @click="$router.push('/admin/user')" slot="extra"  style="margin-right: 6px">用户管理</a>
            <a href="javascript:;" @click="$router.push('/admin/link-friendly')" slot="extra">更多</a>
            <a-table
              :rowKey="record => record.id"
              :columns="HOME_LINKS_LIST_CONFIG"
              :dataSource="linksList"
              :loading="linksTableLoading"
            >
              <a slot="link_site_url" target="_blank" slot-scope="text" :href="text">{{text}}</a>
            </a-table>
          </a-card>
        </a-col>
      </a-row>
      <a-row :gutter="12" style="margin-top: 20px">
        <a-col :span="8">
          <a-card class="card" title="最近留言" :bodyStyle="cardHeight" :hoverable="true">
            <a href="javascript:;" slot="extra" @click="$router.push({ path: '/admin/words', query: { type: 1 } })">更多</a>
            <a-table
              :rowKey="record => record.id"
              :columns="HOME_WORDS_LIST_CONFIG"
              :dataSource="wordsList"
              :loading="wordsTableLoading"
              :scroll="tableScroll"
            >
              <template slot="content" slot-scope="content">
                <div v-html="content"></div>
              </template>
              <template slot="position" slot-scope="position">
                <a-tooltip placement="top" >
                  <template slot="title">
                    <div v-html="position"></div>
                  </template>
                  <div>{{ position.length > 6 ? position.substring(0, 6) + '...' : position }}</div>
                </a-tooltip>
              </template>
            </a-table>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card class="card" title="最近建议" :bodyStyle="cardHeight" :hoverable="true">
            <a href="javascript:;" slot="extra" @click="$router.push({ path: '/admin/words', query: { type: 2 } })">更多</a>
            <a-table
              :rowKey="record => record.id"
              :columns="HOME_WORDS_LIST_CONFIG"
              :dataSource="feedbackList"
              :loading="wordsTableLoading"
              :scroll="tableScroll"
            >
              <template slot="content" slot-scope="content">
                <div v-html="content"></div>
              </template>
              <template slot="position" slot-scope="position">
                <a-tooltip placement="top" >
                  <template slot="title">
                    <div v-html="position"></div>
                  </template>
                  <div>{{ position.length > 6 ? position.substring(0, 6) + '...' : position }}</div>
                </a-tooltip>
              </template>
            </a-table>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card class="card" title="最近发表心情" :bodyStyle="cardHeight" :hoverable="true">
            <a href="javascript:;" slot="extra" @click="$router.push('/admin/mood')">更多</a>
            <a-table
              :rowKey="record => record.id"
              :columns="HOME_MOOD_LIST_CONFIG"
              :dataSource="moodsList"
              :loading="wordsTableLoading"
              :scroll="tableScroll"
            >
              <template slot="content" slot-scope="content">
                <a-tooltip placement="top" >
                  <template slot="title">
                    <div v-html="content"></div>
                  </template>
                  <div>{{ content.length > 6 ? content.substring(0, 6) + '...' : content }}</div>
                </a-tooltip>
              </template>
              <template slot="position" slot-scope="position">
                <a-tooltip placement="top" >
                  <template slot="title">
                    <div v-html="position"></div>
                  </template>
                  <div>{{ position.length > 6 ? position.substring(0, 6) + '...' : position }}</div>
                </a-tooltip>
              </template>
            </a-table>
          </a-card>
        </a-col>
      </a-row>
    </a-card>
     <a-modal
      :title="notice.title"
      width="50%"
      v-model="noticeModalVisible"
    >
       <template slot="footer">
        <a-button key="submit" @click="noticeModalVisible = false">确定</a-button>
      </template>
      <div v-html="notice.content"></div>
    </a-modal>
  </div>
</template>

<script>
import PieEcharts from '@/components/Common/pie.vue'
import { userMixin } from '@/utils/mixin'
import {
  HOME_ARTICLE_LIST_CONFIG,
  HOME_LINKS_LIST_CONFIG,
  HOME_WORDS_LIST_CONFIG,
  HOME_MOOD_LIST_CONFIG
} from '@/config'

export default {
  mixins: [userMixin],
  components: {
    PieEcharts
  },
  data () {
    return {
      HOME_ARTICLE_LIST_CONFIG,
      HOME_LINKS_LIST_CONFIG,
      HOME_WORDS_LIST_CONFIG,
      HOME_MOOD_LIST_CONFIG,
      cardHeight: {
        height: '400px'
      },
      tableScroll: {
        x: 600,
        y: 240
      },
      userName: '',
      artList: [],
      artTableLoading: false,
      linksList: [],
      linksTableLoading: false,
      wordsList: [],
      feedbackList: [],
      moodsList: [],
      wordsTableLoading: false,
      noticeModalVisible: false,
      notice: {
        title: '公告标题',
        content: '<p>公告内容</p>'
      },
      siteInfo: {
        hotArticleNum: 0,
        topArticleNum: 0,
        regUserNum: 0,
        onlineUserNum: 0,
        articleNum: 0,
        wordsNum: 0,
        suggNum: 0,
        moodsNum: 0,
        siteNum: '杨庭培的个人博客',
        siteKeyword: '个人博客',
        isOpen: 0,
        isReg: 0,
        isLogin: 0,
        isLinks: 0,
        isComment: 0,
        isWords: 0,
        isUserCheck: 0
      },
      pieObj: {
        seriesData: [
          {
            value: 335,
            name: '栏目1'
          }
        ],
        legendData: [
          '栏目1'
        ]
      }
    }
  },
  methods: {
    getUserName () {
      if (this.userInfo.id) {
        this.userName = this.userInfo.name
      } else {
        this.$router.push('/login')
      }
    },
    // 前往公告管理界面
    goNoticePage () {
      this.$router.push({
        path: '/admin/notice',
        query: {
          id: 1
        }
      })
    },
    // 获得站点信息
    getSiteInfo () {
      this.$axios.get('/api/site/getSiteInfo').then(res => {
        const result = res.data
        if (result.code === 1) {
          let siteInfoObj = result.data.site_info
          let siteDataObj = result.data.site_data
          this.siteInfo = {
            regUserNum: siteDataObj.reg_num,
            onlineUserNum: siteDataObj.online_num,
            articleNum: siteDataObj.article_num,
            wordsNum: siteDataObj.words_num,
            suggNum: siteDataObj.feedback_num,
            moodsNum: siteDataObj.moods_num,
            siteName: siteInfoObj.name,
            siteKeyword: siteInfoObj.describe,
            hotArticleNum: siteInfoObj.max_hot_article_num,
            topArticleNum: siteInfoObj.max_top_article_num,
            isOpen: siteInfoObj.is_open,
            isReg: siteInfoObj.is_reg,
            isLogin: siteInfoObj.is_login,
            isLinks: siteInfoObj.is_link,
            isComment: siteInfoObj.is_comment,
            isWords: siteInfoObj.is_words,
            isUserCheck: siteInfoObj.is_check
          }
        } else {
          this.$message.error(result.message)
        }
      })
    },
    getArticleNumByCate () {
      let seriesData = []
      let legendData = []
      this.$axios.get('/api/article/getArticleNumByCate').then(res => {
        const result = res.data
        if (result.code === 1) {
          let cateArticleObj = result.data.cate_article_obj
          cateArticleObj.forEach(item => {
            seriesData.push({
              value: item.num,
              name: item.name
            })
            legendData.push(item.name)
          })
          this.pieObj.seriesData = seriesData
          this.pieObj.legendData = legendData
        } else {
          this.$message.error(result.message)
        }
      })
    },
    // 获得文章列表
    getArticleList (searchParams) {
      this.artTableLoading = true
      this.$axios.get('/api/article/getArticleList', {
        params: searchParams
      }).then(res => {
        const result = res.data
        if (result.code === 1) {
          this.artList = result.data.art_list
          this.artTableLoading = false
        }
      })
    },
    handleTabsToggle (key) {
      let index = parseInt(key)
      let params = null
      if (index === 1) {
        params = {
          is_top: 1
        }
        this.getArticleList(params)
      } else if (index === 2) {
        params = {
          is_hot: 1
        }
        this.getArticleList(params)
      }
    },
    // 按照类型获取words字段
    getWordsListByType (typeIndex) {
      this.wordsTableLoading = true
      this.$axios.get('/api/words/getWordsList', {
        params: {
          type: typeIndex
        }
      }).then(res => {
        const result = res.data
        if (result.code === 1) {
          if (typeIndex === 1) { // 心情
            this.moodsList = result.data.words_list
          } else if (typeIndex === 0) { // 反馈
            this.feedbackList = result.data.words_list
          } else if (typeIndex === 2) { // 留言
            this.wordsList = result.data.words_list
          }
          this.wordsTableLoading = false
        }
      })
    },
    getLinksList () {
      this.linksTableLoading = true
      this.$axios.get('/api/links/getLinksList').then(res => {
        const result = res.data
        if (result.code === 1) {
          this.linksList = result.data.links_list
          this.linksTableLoading = false
        }
      })
    }
  },
  beforeMount () {
    this.getSiteInfo()
    this.getArticleNumByCate()
    this.getArticleList({ is_top: 1 })
    this.getWordsListByType(1) // 心情
    this.getWordsListByType(2) // 留言
    this.getWordsListByType(0) // 反馈
    this.getLinksList()
  },
  mounted () {
    this.getUserName()
  }
}
</script>

<style lang="less" scoped>
.container {
  .welcome-wrapper {
    text-align: right;
  }
  .site-data-wrapper {
    height: 100px;
    .info-box {
      display: flex;
      flex-direction: column;
      background-color: #337ab7;
      color: #ffffff;
      .info-box-top {
        text-align: center;
        height: 60px;
        line-height: 60px;
        font-size: 28px;
        border-bottom: solid 1px #ffffff;
        .box-unit {
          font-size: 20px;
        }
      }
      .info-box-bottom {
        text-align: center;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
      }
    }
  }
  .notice-wrapper {
    display: flex;
    align-items: center;
    height: 60px;
    background-color: #F2DEDE;
    padding: 0 12px;
    font-size: 14px;
    .notice-title {
      color: #a94442;
      font-weight: bolder;
    }
    .notice-detail {
      margin-right: 6px;
    }
  }
  .article-num-wrapper {
    height: 60px;
    font-size: 14px;
    .article-num-title {
      font-size: 16px;
    }
  }
  .pie-box {
    height: 200px;
    width: 400px;
  }
  .link-status-wrapper {
    .status-wrapper {
      overflow: auto;
      .status-box {
        height: 30px;
        line-height: 30px;
        margin: 6px 0;
        &:hover {
          background-color: #eee;
        }
        .status-box-title {
          display: inline-block;
          width: 40%;
          text-align: right;
          font-size: 14px;
        }
        .status-box-content {
          display: inline-block;
          width: 60%;
          text-align: center;
          font-size: 12px;
          .open-text {
            background-color: #337AB7;
            color: #FFFFFF;
            padding: 4px 16px;
            border-radius: 4px;
          }
          .close-text {
            background-color: #C62F2F;
            color: #FFFFFF;
            padding: 4px 16px;
            border-radius: 6px;
          }
        }
      }
    }
  }
}
</style>
