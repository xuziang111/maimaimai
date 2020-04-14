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
    removePopup:false,
    removeMsg:'确认删除',
    removeData:null,
  },
  methods:{
    removeConfirm(){
      if(this.removeMsg === "确定要删除该商品吗?"){
        let {shop,shopIndex,goods,goodsIndex} = this.removeData
        axios.post(url.cartRemove,{id:goods.id}).then(res=>{
  
        }).then(res=>{
          shop.goodsList.splice(goodsIndex,1)
          if(!shop.goodsList.length){
            this.lists.splice(shopIndex,1)
            this.removeShop()
          }
          this.removePopup = false
        })
      }else{
        let ids = []
        this.removeLists.forEach(goods=>{
          ids.push(goods.id)
        })
        axios.post(url.cartsRemove,{ids}).then(res=>{
          let arr=[]
          this.editingShop.goodsList.forEach((goods)=>{
            let index = this.removeLists.findIndex(item=>{
              return item.id == goods.id
            })
            if(index === -1){
              arr.push(goods)
            }
          })
          if(arr.length){
            this.editingShop.goodsList = arr
          }else{
            this.lists.splice(this.editingShopIndex,1)
            this.removeShop()
          }
          this.removePopup = false
        })
      }
    },
    remove(shop,shopIndex,goods,goodsIndex){
      this.removePopup = !this.removePopup
      this.removeMsg = "确定要删除该商品吗?"
      this.removeData={shop,shopIndex,goods,goodsIndex}
    },
    removeShop(){
      this.editingShop = null
      this.editingShopIndex = -1
      this.lists.forEach(shop=>{
        shop.editing = false
        shop.editingMsg = "编辑"
      })
    },
    removeList(){
      this.removePopup = true
      this.removeMsg = `确定将所选的${this.removeLists.length}个商品删除`
    },
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
      let attr = this.editingShop ? 'removeChecked':'checked'
      goods[attr] = !goods[attr]
      shop[attr] = shop.goodsList.every(goods=>{
        return goods[attr]
      })
    },
    selectShop(shop){
      let attr = this.editingShop ? 'removeChecked':'checked'
      shop[attr] = !shop[attr]
      shop.goodsList.forEach(goods=>{
        goods[attr] = shop[attr]
      })
    },
    selectAll(){
      let attr = this.editingShop ? 'allRemoveSelected':'allSelected'
      this[attr] = !this[attr]
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
  },
  add(goods){
    goods.number++
    // axios.post(url.cartAdd,{id:goods.id,number:1}).then(res=>{

    // }).then(res=>{
    //   goods.number++
    // })
  },
  reduce(goods){
    if(goods.number === 1) return
    goods.number--
    // axios.post(url.cartReduce,{id:goods.id,number:1}).then(res=>{

    // }).then(res=>{
    //   goods.number--
    // })
  },
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
              total = total + goods.price* goods.number
              console.log(total)
            }
          })
        })
        this.total = total.toFixed(2)
        return arr
      }
      return []
    },
    removeLists(){
      if(this.editingShop){
        let arr=[]
        this.editingShop.goodsList.forEach(goods=>{
          if(goods.removeChecked){
            arr.push(goods)
          }
        })
        console.log(arr.length)
        return arr
      }
      return []
    },
    allRemoveSelected:{
      get(){
        if(this.editingShop){
          return this.editingShop.removeChecked
        }
        return false
      },
      set(newVal){
        if(this.editingShop){
          this.editingShop.removeChecked = newVal
          this.editingShop.goodsList.forEach(goods=>{
            goods.removeChecked = newVal
          })
        }
      }
    }
  },
  created(){
    this.getList()
  },
  mixins:[mixin]
}).$mount('.container')