import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index'
import songList from './views/songList'
import playListDetail from './views/playListDetail'
import search from './views/search'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/index/first',
      name: 'index',
      component: index
    },
    {
      path: '/index/songList',
      name: 'index',
      component: songList
    },
    {
      path: '/playListDetail/:id',
      name: 'playListDetail',
      component: playListDetail
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '*', redirect: '/index/first'
    }
  ]
})
// 输出router
export default router
