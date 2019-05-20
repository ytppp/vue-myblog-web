import { mapGetters, mapActions } from 'vuex'

export const userMixin = {
  computed: {
    ...mapGetters([
      'userInfo',
      'routerInfo'
    ]),
    getTimeSlot () {
      // 获取当前时间所处的时间段
      let time = new Date().getHours()
      let timeSlice = ''
      if (time >= 0 && time <= 5) {
        timeSlice = '凌晨'
      } else if (time >= 6 && time <= 8) {
        timeSlice = '早上'
      } else if (time >= 9 && time <= 11) {
        timeSlice = '上午'
      } else if (time >= 12 && time <= 13) {
        timeSlice = '中午'
      } else if (time >= 14 && time <= 18) {
        timeSlice = '下午'
      } else if (time >= 19 && time <= 23) {
        timeSlice = '晚上'
      }
      return timeSlice
    },
    thisYear () {
      return new Date().getFullYear()
    }
  },
  methods: {
    ...mapActions([
      'setUserInfo',
      'clearUserInfo',
      'setRouterInfo'
    ])
  }
}
