<template>
  <div class="header-top" v-if="userInfoObj.id != 0">
    <div class="header-box">
      <span>尊敬的{{userInfoObj.name}}，{{getTimeSlot}}好呀！人生的目的，不在于结果，而在于经历的过程。</span>
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
  }
}
</script>

<style scoped>
.header-top {
  height: 30px;
  background-color: #364d79;
  font-size: 12px;
  color: #fff;
}
.header-box {
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  height: 100%;
}
</style>
