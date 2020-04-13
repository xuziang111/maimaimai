import Vue from 'vue/dist/vue.esm.js'
import url from 'js/api.js'
import axios from "axios"
import mixin from "js/mixin"

import 'css/common.css'
import './cart.css'
import './cart_base.css'
import './cart_trade.css'
Vue.config.productionTip = false
 
new Vue({
  data:{
    lists:null,
  },
  methods:{
    getList(){
      console.log('xxx')
      axios.post(url.cartLists).then((res)=>{
        let temp = res.data.cartList
        temp.forEach(shop=>{
          shop.checked = true
          shop.goodsList.forEach(goods=>{
            goods.checked = true
          })
        })
        this.lists = temp
        console.log(temp)
      })
    },
    selectGoods(goods,shop){
      goods.checked = !goods.checked
      shop.checked = shop.goodsList.every(goods=>{
        return goods.checked
      })
    },
    selectShop(shop){
      shop.checked = !shop.checked
      shop.goodsList.forEach(goods=>{
        goods.checked = shop.checked
      })
    },
    selectAll(){
      this.allSelected = !this.allSelected
    }
  },
  computed:{
    allSelected:{
      get(){
        if(this.lists&&this.lists.length){
          return this.lists.every((shop)=>{
            return shop.checked
          })
        }
        return false
      },
      set(newVal){
        this.lists.forEach(shop=>{
          shop.checked = newVal
          shop.goodsList.forEach(goods=>{
            goods.checked = newVal
          })
        })
        return newVal
      }
    }
  },
  created(){
    this.getList()
  },
  mixins:[mixin]
}).$mount('.container')