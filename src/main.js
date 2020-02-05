import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'
import { Message } from 'element-ui';
Vue.prototype.http = Axios
Vue.prototype.$Message = Message
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
