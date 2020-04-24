import "./member.css"
import "./member_base.css"

import Vue from 'vue/dist/vue.esm.js'
import url from 'js/api.js'
import axios from "axios"
import qs from "qs"
import Velocity from "velocity-animate"

import mixin from "js/mixin"
import router from "./router/index.js"
import store from './vuex'

  new Vue({
      router,
      store
  }).$mount("#app")
export default router