import 'css/common.css'
import "./search.css"

import Vue from 'vue/dist/vue.esm.js'

import url from 'js/api.js'
import axios from "axios"
import qs from "qs"

let{keyword,id}=qs.parse(location.search.substr(1))
new Vue({
    data:{
        searchList:null,
        keyword,
    },
    created(){
        this.getSearchList()
    },
    methods:{
        getSearchList(){
            axios.post(url.searchList,{keyword,id}).then(res=>{
                console.log(res.data)
                this.searchList = res.data.lists
            })
        }
    }

}).$mount(".container")