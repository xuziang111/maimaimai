import 'css/common.css'
import "./search.css"

import Vue from 'vue/dist/vue.esm.js'

import url from 'js/api.js'
import axios from "axios"
import qs from "qs"
import Velocity from "velocity-animate"


import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);
let{keyword,id}=qs.parse(location.search.substr(1))
new Vue({
    data:{
        searchList:null,
        keyword,
        isShow:false,
        loading:false,
        pageNum:1,
    },
    created(){
        this.getSearchList()
    },
    methods:{
        getSearchList(){
            this.loading = true
            console.log('??????????')
                axios.post(url.searchList,{keyword,id}).then(res=>{
                    console.log(res.data)
                    if(this.pageNum === 1){
                        this.searchList = res.data.lists
                    }else{
                        this.searchList = this.searchList.concat(res.data.lists)
                    }
                    this.pageNum++
                    this.loading = false
                })
        },
        isTopShow(){
            if(document.getElementsByClassName('search-wrap')[0].scrollTop>100){
                this.isShow = true
            }else{
                this.isShow = false
            }
        },
        upToTop(){
            console.log('xxx')
            // window.scrollTo(0,0)
            Velocity(document.body,'scroll',{duration:500})
            Velocity(document.getElementById('js-list'),'scroll',{container: document.getElementsByClassName('search-wrap')[0],duration:500})
            // document.getElementsByClassName('search-wrap')[0].scrollTo(0,0)
            // $("#element3").velocity("scroll", { container: $("#container") });
            this.isShow = false
        }
    },

}).$mount(".container")