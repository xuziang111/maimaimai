import Vue from 'vue'
import VueRouter from 'vue-router'

import index from '../pages/index/index.vue';
import cart from '../pages/cart/cart.vue';
Vue.use(VueRouter)

  const routes = [
  {
    path: '/index',
    name: 'index',
    component: index,
    meta: { requiresAuth: false },
},
  {
    path: '/cart',
    name: 'cart',
    component: cart,
    meta: { requiresAuth: false },
},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
