import Vue from 'vue'
import App from './cart.vue'
 
import 'css/common.css'
import './cart.css'
import './cart_base.css'
import './cart_trade.css'
Vue.config.productionTip = false
 
new Vue({
  render: h => h(App),
}).$mount('#app')