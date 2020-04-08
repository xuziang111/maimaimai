import 'css/common.css'
import './category.css'

import Vue from 'vue/dist/vue.esm.js'
import Foot from 'components/Foot.vue'

import url from 'js/api.js'
import axios from "axios"


new Vue({
    components:{
        Foot
    },
    data:{
        topLists:null,
        topIndex: 0,
        subData:null,
        rankData:null,
    },
    methods:{
        getTopLists(){
            axios.get(url.topLists).then(res=>{
                console.log('yyy')
                console.log(res)
                this.topLists = res.data.lists
            })
        },
        getSubLists(id,index){
            this.topIndex = index
            if(index == 0){
                axios.get(url.rank).then(res=>{
                    console.log(res)
                    this.rankData = res.data
                })
            }else{
                axios.post(url.subLists,{id}).then(res=>{
                    console.log(res)
                    this.subData = res.data
                })
            }
        }
    },
    mounted(){
        console.log('xxx')
        this.getTopLists()
        this.getSubLists(0,0)
    }
}).$mount("#app")