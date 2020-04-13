
import "./goods_custom.css"
import "./goods.css"
import "./goods_theme.css"
import "./goods_mars.css"
import "./goods_sku.css"
import "./goods_common.css"
import "./goods_transition.css"
import 'css/common.css'

import Vue from 'vue/dist/vue.esm.js'
import url from 'js/api.js'
import axios from "axios"
import swipe from 'components/swipe.vue'
import mixin from "js/mixin.js"
import qs from "qs"

let { id } = qs.parse(location.search.substr(1))
let detaiTab = ["商品详情","本店成交"]
new Vue({
    el: '#app',
    data: {
        id,
        details: null,
        isLoaded: false,
        detaiTab,
        tabIndex:0,
        dealList:null,
        bannerLists:[],
        skuType:1,
        showSku:false,
        skuNum:1,
        showAddCart:false
    },
    methods: {
        getDetails() {
            axios.post(url.details, { id }).then(res => {
                this.details = res.data
                // this.bannerLists = res.data.imgs
                this.details.imgs.forEach((item)=>{
                    this.bannerLists.push({image:item.url})
                })
                console.log(this.bannerLists)
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
        chooseSku(type){
            this.skuType = type
            this.showSku = true
        },
        changeSkuNum(num){
            if(this.skuNum === 1 && num<0){
                return
            }
            this.skuNum += num
        },
        addCart(){
            axios.post(url.addCart, { 
                id ,
                number:this.skuNum
            }).then(res => {
                if(res.data.status === 200){
                    console.log('xxx')
                    this.showSku = false
                    this.skuType = 1
                    this.showAddCart = true

                    setTimeout(()=>{
                        this.showAddCart = false
                    },1000)
                }
            })
        }
    },
    created() {
        console.log(url.details)
        this.getDetails()
    },
    watch:{
        showSku(val,oval){
            document.body.style.overflow = val?'hidden':'auto'
            document.querySelector('html').style.overflow = val?'hidden':'auto'
            document.body.style.height = val?'100%':'auto'
            document.querySelector('html').style.height = val?'100%':'auto'

        }
    },
    components:{
        swipe
    },
    mixins: [mixin]
})