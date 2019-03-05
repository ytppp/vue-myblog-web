<template>
  <div class="top-menu">
    <div class="top-menu-wrapper">
      <a-row>
        <a-col :span="4">col-4</a-col>
        <a-col :span="16">尊敬的杨庭培，晚上好，现在时间为2019年3月3日16点17分</a-col>
        <a-col :span="4">col-4</a-col>
      </a-row>
      <a-row>
        <a-col :span="4">col-4</a-col>
        <a-col :span="16">
          <div>
            <div class="logo"></div>
            <div class="menu-search-info-wrapper">
              <div class="menu-wrapper">
                <ul>
                  <li>首页</li>
                  <li>关于自己</li>
                  <li>留言板</li>
                  <li>心情</li>
                </ul>
              </div>
              <div class="search-wrapper">
                <a-form
                  layout="inline"
                  :form="form"
                  @submit="handleSubmit"
                >
                  <a-form-item>
                    <a-input-search placeholder="请输入搜索内容" />
                  </a-form-item>
                </a-form>
              </div>
              <div class="operate-info-wrapper">
                <div class="operate-wrapper">
                  <a-dropdown>
                    <a-menu slot="overlay" @click="handleMenuClick">
                      <a-menu-item key="1">写留言</a-menu-item>
                      <a-menu-item key="2">申请友情链接</a-menu-item>
                    </a-menu>
                    <a-button type="primary" style="margin-left: 8px">
                      分享文章 <a-icon type="down" />
                    </a-button>
                  </a-dropdown>
                </div>
                <div class="info-wrapper">
                  <a-icon type="bell" />
                </div>
                <div class="avatar-wrapper">
                  <a-dropdown>
                    <a-menu slot="overlay" @click="handleMenuClick">
                      <a-menu-item key="1">写留言</a-menu-item>
                      <a-menu-item key="2">申请友情链接</a-menu-item>
                    </a-menu>
                    <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  </a-dropdown>
                </div>
              </div>
            </div>
          </div>
        </a-col>
        <a-col :span="4">col-4</a-col>
      </a-row>
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

<style lang="less" scoped>
</style>
