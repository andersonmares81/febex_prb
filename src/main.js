import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.prototype.$api_web_url = 'http://bebex_l.test/api/v1/admin/users';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
