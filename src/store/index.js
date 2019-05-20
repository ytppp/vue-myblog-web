import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import site from './modules/site'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    site
  }
})
