import "./member.css"
import "./member_base.css"

import Vue from 'vue/dist/vue.esm.js'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import url from 'js/api.js'
import axios from "axios"
import qs from "qs"
import Velocity from "velocity-animate"

import mixin from "js/mixin"

let routes=[{
            path:'/',
            component:resolve =>require(['./components/member.vue'],resolve),
        },
        {
            path:'/address',
            component:resolve =>require(['./components/address.vue'],resolve),
            children:[
                {
                    path:'',
                    redirect:'all'
                },
                {
                    path:'all',
                    component:resolve =>require(['./components/all.vue'],resolve)
                },
                {
                    path:'form',
                    component:resolve =>require(['./components/form.vue'],resolve)
                },
            ]
        },
    ]

const router = new VueRouter({
    // mode: 'history',
    // base: process.env.BASE_URL,
    routes
  })
  new Vue({
      router
  }).$mount("#app")
export default router