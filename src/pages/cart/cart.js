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
    total:0,
    editingShop:null,
    editingIndex:-1,
    isediting:false,
  },
  methods:{
    getList(){
      console.log('xxx')
      axios.post(url.cartLists).then((res)=>{
        let temp = res.data.cartList
        temp.forEach(shop=>{
          shop.checked = true
          shop.editing = false
          shop.removeChecked = false
          shop.editingMsg = "编辑"
          shop.goodsList.forEach(goods=>{
            goods.checked = true
            goods.removeChecked = false
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
    },
    edit(shop,shopIndex){
      shop.editing = !shop.editing
      shop.editingMsg = shop.editing?'完成':'编辑'
      if(shop.editing === true){
        this.lists.forEach((item,i)=>{
          if(shopIndex !== i){
            item.editing = false
            item.editingMsg = this.editing?'':'编辑'
          }
        })
      }
      this.editingShop = shop.editing?shop:null
      this.editingIndex = shop.editing?shopIndex:-1
    },
    check(){
      axios.post(url.check,{selectLists}).then(res=>{

      })
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
    },
    selectLists(){
      console.log('uuu')
      let arr = []
      let total = 0
      if(this.lists&&this.lists.length){
        this.lists.forEach(shop=>{
          shop.goodsList.forEach(goods=>{
            if(goods.checked){
              arr.push(goods)
              total = total + goods.price*100* goods.number
              console.log(total)
            }
          })
        })
        this.total = total/100
        return arr
      }
      return []
    },
    removeList(){

    },
    allRemoveSelected:{
      get(){

      },
      set(){
        
      }
    }
  },
  created(){
    this.getList()
  },
  mixins:[mixin]
}).$mount('.container')