import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/main/HomePage.vue'
import InfoPage from '@/components/main/InfoPage.vue'
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
      path: '/info/:infoId/page/:pageId',
      name: 'main',
      component: InfoPage
    },
    {
      path: '/main/:grpid',
      name: 'main',
      component: HomePage
    },
  ]
})
