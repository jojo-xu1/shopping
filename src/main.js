// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$baseUrl = process.env.NODE_ENV === 'production' ? 'http://13.112.112.160:9080/test' : 'http://13.112.112.160:8080/test'
Vue.prototype.$webUrl = process.env.NODE_ENV === 'production' ? 'http://13.112.112.160' : 'http://13.112.112.160/test'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
