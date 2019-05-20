<template>
  <header class="main-header-box">
    <header-top :user-info-obj="userObj"></header-top>
    <header-main :user-info-obj="userObj"></header-main>
  </header>
</template>

<script>
import HeaderTop from './HeaderTop'
import HeaderMain from './HeaderMain'
import { userMixin } from '@/utils/mixin'
import {
  STATIC_IMG_URL
} from '@/config/index.js'

export default {
  mixins: [userMixin],
  components: {
    HeaderTop,
    HeaderMain
  },
  data () {
    return {
      STATIC_IMG_URL,
      userObj: {
        id: 0,
        name: '',
        avatar: ''
      }
    }
  },
  watch: {
    userInfo () {
      this.getUserInfo() // 当对象改变，执行操作获取新数据
    }   
  },
  methods: {
    getUserInfo () {
      if (this.userInfo.id && this.userInfo.is_admin === 0) {
        this.userObj = {
          id: this.userInfo.id,
          name: this.userInfo.name,
          avatar: `${STATIC_IMG_URL}${this.userInfo.avatar}`
        }
      }
    }
  },
  beforeMount () {
    this.getUserInfo()
  }
}
</script>

<style scoped>
.main-header-box {
  height: 80px;
}
</style>
