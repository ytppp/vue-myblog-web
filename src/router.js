import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index/home'
    },
    {
      path: '/login',
      component: () => import('./views/Login')
    },
    {
      path: '/register',
      component: () => import('./views/Register')
    },
    {
      path: '/index',
      component: () => import('./views/Index'),
      children: [
        {
          path: 'home',
          component: () => import('./layouts/Index/Home')
        },
        /* {
          path: 'list',
          component: () => import('./layouts/Index/List')
        }, */
        {
          path: 'detail',
          component: () => import('./layouts/Index/Detail')
        },
        {
          path: 'mood',
          component: () => import('./layouts/Index/Mood')
        },
        {
          path: 'message',
          component: () => import('./layouts/Index/MessageBoard') // 留言板
        },
        {
          path: 'timeline',
          component: () => import('./layouts/Index/Timeline')
        },
        {
          path: 'about',
          component: () => import('./layouts/Index/About')
        },
        {
          path: '/user-center',
          component: () => import('./layouts/Index/UserCenter')
        }
      ]
    },
    {
      path: '/admin',
      component: () => import('./views/Admin'),
      children: [
        {
          path: 'home',
          component: () => import('./layouts/Admin/Home')
        },
        {
          path: 'article-list',
          component: () => import('./layouts/Admin/Article/ArticleList.vue')
        },
        {
          path: 'article-add',
          component: () => import('./layouts/Admin/Article/ArticleAdd.vue')
        },
        {
          path: 'user',
          component: () => import('./layouts/Admin/User')
        },
        {
          path: 'mood',
          component: () => import('./layouts/Admin/Mood')
        },
        {
          path: 'words',
          component: () => import('./layouts/Admin/Words')
        },
        {
          path: 'fontend-home',
          component: () => import('./layouts/Admin/SiteInfo/FontendHome.vue')
        },
        {
          path: 'photo-wall',
          component: () => import('./layouts/Admin/SiteInfo/PhotoWall.vue')
        },
        {
          path: 'about',
          component: () => import('./layouts/Admin/SiteInfo/About.vue')
        },
        {
          path: 'notice',
          component: () => import('./layouts/Admin/SiteInfo/Notice.vue')
        },
        {
          path: 'site-setting',
          component: () => import('./layouts/Admin/SiteSystem/SiteSetting.vue')
        },
        {
          path: 'link-friendly',
          component: () => import('./layouts/Admin/SiteSystem/LinkFriendly.vue')
        },
        {
          path: 'site-history',
          component: () => import('./layouts/Admin/SiteSystem/SiteHistory.vue')
        },
        {
          path: 'site-log',
          component: () => import('./layouts/Admin/SiteSystem/SiteLog.vue')
        },
        {
          path: 'psw-modify',
          component: () => import('./layouts/Admin/PswModify')
        }
      ]
    }
  ]
})
