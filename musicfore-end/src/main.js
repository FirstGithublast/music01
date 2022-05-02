import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import '@/assets/js/iconfont.js'
import '@/assets/js/iconfont1.js'
import '@/assets/js/iconfont2.js'
import '@/assets/js/iconfont3.js'
import axios from "axios";


Vue.config.productionTip = false
Vue.prototype.$axios=axios
Vue.use(element)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
