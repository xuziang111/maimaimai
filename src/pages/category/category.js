import 'css/common.css'
import './category.css'

import Vue from 'vue/dist/vue.esm.js'
import Foot from 'components/Foot.vue'

import url from 'js/api.js'
import axios from "axios"
import { indigo } from 'color-name'


new Vue({
    components:{
        Foot
    },
    data:{
        topLists:null,
        topIndex: 0,
        subData:[],
        rankData:[],
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
        },
        toSearch(list){
            location.href =  `search.html?keyword=${list.name}&id=${list.id}`
        }
    },
    mounted(){
        console.log('xxx')
        this.getTopLists()
        this.getSubLists(0,0)
    },
    filters:{
        getDot(price){
            let len = price.toString().length
            let temp = price.toString().lastIndexOf('.')
            if(temp === -1){
                price = price +'.00'
            }else if(len - temp === 2){
                price = price + '0'
            }
            return price
        }
    }
}).$mount("#app")