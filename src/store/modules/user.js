const user = {
  state: {
    userInfo: JSON.parse(sessionStorage.getItem('userInfo')) || {}
  },
  mutations: {
    'SET_USERINFO': (state, userInfo) => {
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
      state.userInfo = userInfo
    },
    'CLEAR_USERINFO': (state) => {
      sessionStorage.removeItem('userInfo')
      state.userInfo = {}
    }
  },
  actions: {
    setUserInfo: ({ commit }, userInfo) => {
      return commit('SET_USERINFO', userInfo)
    },
    clearUserInfo: ({ commit }) => {
      return commit('CLEAR_USERINFO')
    }
  },
  getters: {
    userInfo: state => state.userInfo
  }
}

export default user
