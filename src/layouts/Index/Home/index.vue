<template>
  <div class="home-wrapper">
    <nav class="nav-list-wrapper">
      <ul class="nav-list">
        <li class="nav-item active"><a href="#">推荐</a></li>
        <li class="nav-item"><a href="#">关注</a></li>
        <li class="nav-item"><a href="#">Android</a></li>
        <li class="nav-item"><a href="#">前端</a></li>
        <li class="nav-item"><a href="#">IOS</a></li>
        <li class="nav-item"><a href="#">设计</a></li>
      </ul>
    </nav>
    <section class="main-content-wrapper">
      <a-row :gutter="18">
        <a-col :span="16">
          <carousel></carousel>
          <article-list></article-list>
        </a-col>
        <a-col :span="8">
          <a-card title="公告" style="height: 200px">
            <a href="#" slot="extra">更多</a>
            <p>card content</p>
            <p>card content</p>
            <p>card content</p>
          </a-card>
          <a-card
            style="width:100%; margin-top: 20px"
            title="杨庭培的个人名片"
            :tabList="tabList"
            :activeTabKey="key"
            @tabChange="key => onTabChange(key, 'key')"
          >
            <span slot="customRender" slot-scope="item">
              <a-icon type="home"/>{{item.key}}
            </span>
            <a href="#" slot="extra">更多</a>
            {{contentList[key]}}
          </a-card>
          <a-card title="点击排行" style="margin-top: 20px">
            <a href="#" slot="extra">更多</a>
            <p>card content</p>
            <p>card content</p>
            <p>card content</p>
          </a-card>
          <a-card title="站长推荐" style="margin-top: 20px">
            <a href="#" slot="extra">更多</a>
            <p>card content</p>
            <p>card content</p>
            <p>card content</p>
          </a-card>
          <a-card title="站点信息" style="margin-top: 20px">
            <a href="#" slot="extra">更多</a>
            <p>card content</p>
            <p>card content</p>
            <p>card content</p>
          </a-card>
          <a-card title="友情链接" style="margin-top: 20px">
            <a href="#" slot="extra">更多</a>
            <p>card content</p>
            <p>card content</p>
            <p>card content</p>
          </a-card>
          <a-card title="猜你喜欢" style="margin-top: 20px">
            <a href="#" slot="extra">更多</a>
            <p>card content</p>
            <p>card content</p>
            <p>card content</p>
          </a-card>
        </a-col>
      </a-row>
    </section>
  </div>
</template>

<script>
import Carousel from '@/components/Home/Carousel'
import ArticleList from '@/components/Common/ArticleList'

export default {
  components: {
    Carousel,
    ArticleList
  },
  data () {
    return {
      tabList: [
        {
          key: 'tab1',
          scopedSlots: { tab: 'customRender' }
        },
        {
          key: 'tab2',
          tab: 'tab2'
        }
      ],
      contentList: {
        tab1: 'content1',
        tab2: 'content2'
      },
      tabListNoTitle: [
        {
          key: 'article',
          tab: 'article'
        },
        {
          key: 'app',
          tab: 'app'
        },
        {
          key: 'project',
          tab: 'project'
        }
      ],
      key: 'tab1',
      noTitleKey: 'app'
    }
  },
  methods: {
    onTabChange (key, type) {
      console.log(key, type)
      this[type] = key
    }
  }
}
</script>

<style scoped>
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
