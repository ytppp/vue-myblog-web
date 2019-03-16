import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: () => import('./views/Index.vue'),
      children: [
        {
          path: 'home',
          component: () => import('./layouts/Home')
        },
        {
          path: 'list',
          component: () => import('./layouts/List')
        },
        {
          path: 'detail',
          component: () => import('./layouts/Detail')
        },
        {
          path: 'mood',
          component: () => import('./layouts/Mood')
        },
        {
          path: 'message',
          component: () => import('./layouts/MessageBoard')
        },
        {
          path: 'timeline',
          component: () => import('./layouts/Timeline')
        }
      ]
    }
  ]
})
