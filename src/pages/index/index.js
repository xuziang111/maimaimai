import 'css/common.css'
import './index.css'

import Vue from 'vue/dist/vue.esm.js'
import axios from 'axios'
import url from 'js/api.js'
import { InfiniteScroll } from 'mint-ui';

import Foot from 'components/Foot.vue'
import Swipe from 'components/swipe.vue'

Vue.use(InfiniteScroll);
Vue.prototype.axios = axios

console.log(url)

new Vue({
    data:{
        lists:null,
        pageNum:1,
        loading:false,
        allLoaded:false,
        pageSize:10,
        bannerLists:[],
    },
    methods:{
        getLists(){
            if(this.allLoad) return
            this.loading = true
            axios.post(url.hotLists,{
                pageNum:this.pageNum,
                pageSize:10
            }).then(res=>{
                console.log(res)
                if(res.data.lists < this.pageSize) {
                    this.allLoaded = true
                }

                if(this.lists){
                    this.lists = this.lists.concat(res.data.lists)
                }else{
                    //第一次请求
                    this.lists = res.data.lists
                }

                this.pageNum++
                this.loading = false
            })
        },
        getBanner(){
            axios.get(url.banner).then(res=>{
                console.log(res)
                this.bannerLists = res.data.lists
            })
        },
    },
    created(){
        this.getLists()
        this.getBanner()
    },
    components:{
        Foot,
        Swipe
    }
    // render:h=>h(App)
}).$mount("#app")