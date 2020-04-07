import 'css/common.css'
import './index.css'

import Vue from 'vue/dist/vue.esm.js'
import axios from 'axios'
import url from 'js/api.js'

Vue.prototype.axios = axios

console.log(url)
axios.post(url.hotLists,{
    pageNum:1,
    pageSize:6
}).then(res=>{
console.log(res)
})

new Vue({
    data:{
        lists:null
    },
    // render:h=>h(App)
}).$mount("#app")