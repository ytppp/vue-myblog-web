const site = {
  state: {
    routerInfo: JSON.parse(sessionStorage.getItem('routerInfo')) || {}
  },
  mutations: {
    'SET_ROUTER_INFO': (state, routerInfo) => {
      sessionStorage.setItem('routerInfo', JSON.stringify(routerInfo))
      state.routerInfo = routerInfo
    }
  },
  actions: {
    setRouterInfo: ({ commit }, routerInfo) => {
      return commit('SET_ROUTER_INFO', routerInfo)
    }
  },
  getters: {
    routerInfo: state => state.routerInfo
  }
}

export default site
