<template>
<div class="main-header">
  <div class="header-box">
    <a class="logo" href="#">
      <img class="logo-img" src="https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg" alt="杨庭培的个人博客">
    </a>
    <nav class="main-nav">
      <ul class="nav-list">
        <li class="main-nav-list">
          <ul class="menu-list">
            <li class="nav-item link-item">
              <a href="#">首页</a>
            </li>
            <li class="nav-item link-item">
              <a href="#">关于自己</a>
            </li>
            <li class="nav-item link-item">
              <a href="#">留言板</a>
            </li>
            <li class="nav-item link-item">
              <a href="#">心情</a>
            </li>
          </ul>
        </li>
        <li class="nav-item search">
          <a-form
            layout="inline"
            :form="form"
          >
            <a-form-item>
              <a-input-search v-on:keyup.enter="handleSubmit" v-model="searchValue" placeholder="请输入搜索内容" />
            </a-form-item>
          </a-form>
        </li>
        <li class="nav-item login-reg" v-if="userInfoObj.id == 0">
          <a-button @click="goLoginPage">登录</a-button>
          <a-divider type="vertical" />
          <a-button @click="goRegPage">注册</a-button>
        </li>
        <template v-else>
          <li class="nav-item">
            <a-dropdown>
              <a-menu slot="overlay" @click="handleMenuClick">
                <a-menu-item key="1">写留言</a-menu-item>
                <a-menu-item key="2">申请友链</a-menu-item>
              </a-menu>
              <a-button type="primary" style="margin-left: 8px">
                操作 <a-icon type="down" />
              </a-button>
            </a-dropdown>
          </li>
          <li class="nav-item">
            <a-dropdown>
              <a-menu slot="overlay" @click="handleMenuClick">
                <a-menu-item key="1">个人中心</a-menu-item>
                <a-menu-item key="2">退出登录</a-menu-item>
              </a-menu>
              <a-avatar :src="userInfoObj.avatar" />
            </a-dropdown>
          </li>
        </template>
      </ul>
    </nav>
  </div>
</div>
</template>

<script>
import { userMixin } from '@/utils/mixin'

export default {
  mixins: [userMixin],
  props: {
    userInfoObj: {
      default: () => {
        return {
          id: 0,
          name: '',
          avatar: ''
        }
      }
    }
  },
  data () {
    return {
      searchValue: ''
    }
  },
  methods: {
    handleSubmit () {
      if (this.searchValue !== '') {
        console.log(this.searchValue)
      }
    },
    handleMenuClick (e) {
      if (e.key === '1') {
        this.$router.push('/user-center')
      } else if (e.key === '2') {
        this.userInfoObj.id = 0
        this.clearUserInfo()
      }
    },
    goLoginPage () {
      this.$router.push('/login')
    },
    goRegPage () {
      this.$router.push('/register')
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  }
}
</script>

<style scoped>
.main-header {
  height: 50px;
}
.header-box {
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  height: 100%;
}
.logo {
  min-width: 98px;
  margin-right: 15px;
}
.main-nav {
  height: 100%;
  flex: 1 0 auto;
}
.nav-list {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  height: 100%;
}
.main-nav-list {
  display: flex;
}
.menu-list {
  display: flex;
}
.link-item {
  padding: 0 16px;
  height: 50px;
}
.nav-item {
  color: #71777c;
  padding: 0 12px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.search {
  flex: 1 1 auto;
  justify-content: flex-end;
  cursor: auto;
}
.login-reg {
  font-size: 14px;
}
</style>
