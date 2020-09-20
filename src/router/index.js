import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/main/HomePage.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios,axios)
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: HomePage
    },
    {
      path: '/main/:cat_id',
      name: 'main',
      component: HomePage
    },
  ]
})
