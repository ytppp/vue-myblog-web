<template>
  <a-layout :style="{ height: '100vh' }">
    <a-layout-sider :width = '300'>
      <div class="logo">{{ siteName }}</div>
      <a-menu
        theme="dark"
        mode="inline"
        @click="handleClick"
        :style="{ width: '300px' }"
        :selectedKeys="nowRouter"
      >
        <template v-for="menuItems in MENU_CONFIG">
          <a-sub-menu :key="menuItems.key" v-if="menuItems.children">
            <span slot="title"><a-icon :type="menuItems.icon" /><span>{{ menuItems.name }}</span></span>
            <a-menu-item v-for="item in menuItems.children" :key="item.key">{{ item.name }}</a-menu-item>
          </a-sub-menu>
          <a-menu-item :key="menuItems.key" v-else>
            <a-icon :type="menuItems.icon" />
            <span class="nav-text">{{ menuItems.name }}</span>
          </a-menu-item>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 0 }">
        <div class="header-wrapper">
          <div class="breadcrumb-wrapper">
            <!-- 面包屑 -->
            <bread-crumb :bread-crumb="breadCrumb" />
          </div>
          <ul class="operate-wrapper">
            <li class="operate-item">
              <a-dropdown>
                <a-menu slot="overlay" @click="handleDropdownClick">
                  <a-menu-item
                    v-for="(item, index) in ADMIN_DROPDOWN_LIST_CONFIG"
                    :key="index"
                  >
                    {{ item.name }}
                  </a-menu-item>
                </a-menu>
                <a class="ant-dropdown-link" href="#">
                  <a-avatar :src="userAvatar" />
                </a>
              </a-dropdown>
            </li>
          </ul>
        </div>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
        <div :style="{ padding: '24px', background: '#fff' }">
          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer :style="{textAlign: 'center'}">
        Copyright &copy;{{thisYear}} 杨庭培
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import {
  MENU_CONFIG,
  STATIC_IMG_URL,
  ADMIN_DROPDOWN_LIST_CONFIG
} from '@/config/index.js'
import BreadCrumb from '@/components/Admin/BreadCrumb.vue'
import { userMixin } from '@/utils/mixin'

export default {
  mixins: [userMixin],
  components: {
    BreadCrumb
  },
  data () {
    return {
      MENU_CONFIG,
      ADMIN_DROPDOWN_LIST_CONFIG,
      breadCrumb: [
        {
          key: '#/admin/home',
          name: '首页'
        }
      ],
      siteName: '博客后台管理系统',
      userAvatar: '',
      userName: '',
      nowRouter: ['home']
    }
  },
  /* beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.matchRoute(to, from)
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.matchRoute(to, from, next)
  }, */
  methods: {
    matchRoute (to, form, next) {
      console.log(to.matched[1].path)
      switch (to.matched[1].path) {
        case '/admin/home':
          this.$router.push('/admin/home')
          break
        case '/admin/article-list':
          this.$router.push('/admin/article-list')
          break
        case '/admin/article-add':
          this.$router.push('/admin/article-add')
          break
        case '/admin/user':
          this.$router.push('/admin/user')
          break
        case '/admin/mood':
          this.$router.push('/admin/mood')
          break
        case '/admin/words':
          this.$router.push('/admin/words')
          break
        case '/admin/fontend-home':
          this.$router.push('/admin/fontend-home')
          break
        case '/admin/photo-wall':
          this.$router.push('/admin/photo-wall')
          break
        case '/admin/about':
          this.$router.push('/admin/about')
          break
        case '/admin/notice':
          this.$router.push('/admin/notice')
          break
        case '/admin/site-setting':
          this.$router.push('/admin/site-setting')
          break
        case '/admin/link-friendly':
          this.$router.push('/admin/link-friendly')
          break
        case '/admin/site-history':
          this.$router.push('/admin/site-history')
          break
        case '/admin/site-log':
          this.$router.push('/admin/site-log')
          break
        case '/admin/psw-modify':
          this.$router.push('/admin/psw-modify')
          break
      }
      if (typeof next === 'function') {
        next()
      }
    },
    // 获得用户头像
    getUserAvatar () {
      if (this.userInfo.id && this.userInfo.is_admin === 1) {
        this.userAvatar = `${STATIC_IMG_URL}${this.userInfo.avatar}`
      } else {
        this.$router.push('/login')
      }
    },
    handleClick ({ key }) {
      this.findBreadCrumbArr(this.MENU_CONFIG, key)
      this.nowRouter = [key]
      this.$router.push(`/admin/${key}`)
    },
    // 处理下拉列表点击
    handleDropdownClick (e) {
      // console.log(e.key)
      switch (parseInt(e.key)) {
        case 0:
          this.$router.push('/admin/article-add')
          break
        case 1:
          this.$router.push('/admin/mood')
          break
        case 2:
          this.$router.push('/admin/site-log')
          break
        case 3:
          this.quitSite()
          break
      }
    },
    quitSite () {
      this.clearUserInfo()
      this.$router.push('/index/home')
    },
    // 找出匹配值
    findBreadCrumbArr (arr, key) {
      this.breadCrumb = [
        {
          key: '#/admin/home',
          name: '首页'
        }
      ]
      if (key === 'home') {
        return
      }
      arr.forEach(items => {
        if (items.key === key) {
          this.breadCrumb.push({
            key: items.key,
            name: items.name
          })
        } else if (items.children) {
          items.children.forEach(item => {
            if (item.key === key) {
              this.breadCrumb.push({
                key: item.key,
                name: item.name
              })
            }
          })
        }
      })
    }
  },
  mounted () {
    this.getUserAvatar()
  }
}
</script>

<style scoped>
.logo {
  height: 32px;
  line-height: 32px;
  background: rgba(255,255,255,.2);
  margin: 16px;
  text-align: center;
  color: #ffffff;
}
.header-wrapper {
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 16px;
  justify-content: space-between;
}
.breadcrumb-wrapper {
  display: inline-block;
}
.operate-wrapper {
  display: inline-block;
}
.operate-item {
  display: inline-block;
  padding: 0 16px;
}
</style>
