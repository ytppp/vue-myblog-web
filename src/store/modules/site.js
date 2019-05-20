const site = {
  state: {
    routerInfo: null
  },
  mutations: {
    'SET_ROUTER_INFO': (state, routerInfo) => {
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
