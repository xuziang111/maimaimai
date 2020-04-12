
import "./goods_custom.css"
import "./goods.css"
import "./goods_theme.css"
import "./goods_mars.css"
import "./goods_sku.css"
import "./goods_common.css"
import 'css/common.css'

import Vue from 'vue/dist/vue.esm.js'
import url from 'js/api.js'
import axios from "axios"

import mixin from "js/mixin.js"
import qs from "qs"

let { id } = qs.parse(location.search.substr(1))
let detaiTab = ["商品详情","本店成交"]
new Vue({
    el: '#app',
    data: {
        details: null,
        isLoaded: false,
        detaiTab,
        tabIndex:0,
        dealList:null
    },
    methods: {
        getDetails() {
            axios.post(url.details, { id }).then(res => {
                this.details = res.data
                this.isLoaded = true
                console.log(res.data)
            })
        },
        getDeal(){
            axios.post(url.dealList, { id }).then(res => {
                this.dealList = res.data.list
                console.log(res.data)
            })
        },
        tabSwitch(index){
            this.tabIndex = index
            if(index === 1){
                this.getDeal()
            }
        },
    },
    created() {
        console.log(url.details)
        this.getDetails()
    },
    mixins: [mixin]
})