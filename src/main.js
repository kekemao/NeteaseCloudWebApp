import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueScroller from 'vue-scroller'
import * as filters from './common/filters'
Vue.config.productionTip = false
Vue.use(VueScroller)
// 注册为全局过滤器  ES5写法
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app') // 这里绑定的是index.html中的id为app的div元素
// router.push('/index') 建议写在 router.js
export default app // 如果写成window.app = new Vue({})就可以干掉
/*
等价于
new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app') // 这里绑定的是index.html中的id为app的div元素
router.push('/index')
*/
