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
            @submit="handleSubmit"
          >
            <a-form-item>
              <a-input-search placeholder="请输入搜索内容" />
            </a-form-item>
          </a-form>
        </li>
        <li class="nav-item add">
          <a-dropdown>
            <a-menu slot="overlay" @click="handleMenuClick">
              <a-menu-item key="1">写留言</a-menu-item>
              <a-menu-item key="2">申请友情链接</a-menu-item>
            </a-menu>
            <a-button type="primary" style="margin-left: 8px">
              分享文章 <a-icon type="down" />
            </a-button>
          </a-dropdown>
        </li>
        <li class="nav-item notification">
          <a href="#">
            <a-icon type="bell" />
          </a>
        </li>
        <li class="nav-item">
          <a-dropdown>
            <a-menu slot="overlay" @click="handleMenuClick">
              <a-menu-item key="1">写留言</a-menu-item>
              <a-menu-item key="2">申请友情链接</a-menu-item>
            </a-menu>
            <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          </a-dropdown>
        </li>
      </ul>
    </nav>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      form: this.$form.createForm(this)
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      console.log('123')
    },
    handleMenuClick (e) {
      console.log('click', e)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.form.validateFields()
    })
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
</style>
