<template>
  <a-locale-provider :locale="zh_CN">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </a-locale-provider>
</template>

<script>
// eslint-disable-next-line
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')

export default {
  data () {
    return {
      zh_CN
    }
  }
}
</script>

<style lang="less">
  :global{
    //页面切换动画
    .page-toggle-enter-active{
      transition: opacity 0.2s ease-in 0.25s;
    }
    .page-toggle-leave-active{
      transition: opacity 0.2s ease-out 0s;
    }
    .page-toggle-enter, .page-toggle-leave-to{
      opacity: 0;
    }
  }
</style>
