import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './axios'
import './assets/css/main.css'
import 'babel-polyfill'
import VCharts from 'v-charts/lib/pie.common'


Vue.prototype.$axios=axios
Vue.use(element)
Vue.component(VCharts.name,VCharts)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
