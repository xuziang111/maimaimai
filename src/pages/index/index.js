import 'css/common.css'
import './index.css'

import Vue from 'vue/dist/vue.esm.js'
import axios from 'axios'
import url from 'js/api.js'
import { InfiniteScroll } from 'mint-ui';

Vue.use(InfiniteScroll);
Vue.prototype.axios = axios

console.log(url)

new Vue({
    data:{
        lists:null,
        pageNum:1,
        loading:false,
        allLoaded:false,
    },
    methods:{
        loadMore(){

        },
        getLists(){
            this.loading = true
            axios.post(url.hotLists,{
                pageNum:this.pageNum,
                pageSize:10
            }).then(res=>{
            console.log(res)
            this.pageNum++
            if(this.lists){
                this.lists = this.lists.concat(res.data.lists)
            }else{
                this.lists = res.data.lists
            }
            this.loading = false
            })
        },
    },
    created(){
        this.getLists()
    }
    // render:h=>h(App)
}).$mount("#app")