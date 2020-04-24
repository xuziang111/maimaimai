<template>
    <div class="container " style="min-height: 597px;">
    <div class="section section-first" :lists=lists>
      <div class="block form js-form">
        <input class="js-id" name="id" type="hidden" value="69150287">
        <div class="block-item" style="border-top:0;">
          <label>收货人</label>
          <input type="text" placeholder="请输入姓名" name="user_name" v-model="name" maxlength="20">
        </div>
        <div class="block-item">
          <label>联系电话</label>
          <input type="tel" placeholder="联系电话" name="tel" v-model="tel" maxlength="11">
        </div>
        <div class="block-item">
          <label>选择地区</label>
          <div class="select-group">
            <select class="js-province-selector" v-model="provinceValue">
              <option value="-1">选择省份</option>
              <option :value="p.value" v-for="p in addressData.list">{{p.label}}</option>
            </select>
            <select class="js-city-selector" v-model="cityValue">
              <option value="-1">选择城市</option>
              <option :value="c.value" v-for="c in cityList">{{c.label}}</option>
            </select>
            <select class="js-county-selector" name="area_code" v-model="districtValue">
              <option value="-1">选择地区</option>
              <option :value="d.value" v-for="d in districtList">{{d.label}}</option>
            </select>
          </div>
        </div>
        <div class="block-item">
          <label>详细地址</label>
          <input type="text" placeholder="街道门牌信息" name="address_detail" v-model="address" maxlength="100">
        </div>
      </div>
    </div>
    <div class="block section js-save block-control-btn" @click="add">
      <div class="block-item c-blue center">保存</div>
    </div>
    <div class="block section js-delete block-control-btn" 
    v-show="type==='edit'"
    @click="remove"
    >
      <div class="block-item c-red center">删除</div>
    </div>
    <div class="block stick-bottom-row center js-save-default" v-show="type=='edit'" @click="setDefault">
      <button class="btn btn-standard js-save-default-btn">设为默认收货地址</button>
    </div>
  </div>
</template>

<script>
import "./address.css"
import "./address_base.css"
import addres from "js/addressService.js"

export default {
data(){
  return{
    name:'',
    tel:'',
    provinceValue:-1,
    cityValue:-1,
    districtValue:-1,
    address:'',
    id:'',
    type:this.$route.query.type,
    instance:{},
    addressData:require('js/address.json'),
    cityList:[],
    districtList:[]
  }
},
computed:{
  lists:function(){
    console.log('2222')
    return this.$store.state.lists
  }
},
created(){
if(this.$route.query.instance){
  this.instance = JSON.parse(this.$route.query.instance)
  console.log(this.$route.query.instance)
  // {this.name,this.tel,this.provinceValue,this.cityValue,this.districtValue,this.address,this.id} = this.instance
  this.name = this.instance.name
}
if(this.type==='edit'){
  let ad = this.instance
  this.provinceValue = parseInt(ad.provinceValue)
  this.name = ad.name
  this.tel = ad.tel
  this.address = ad.address
  this.id = ad.id

}

},
methods:{
  add(){
    let {name,tel,provinceValue,cityValue,districtValue,address} = this
    let data = {name,tel,provinceValue,cityValue,districtValue,address}
    console.log(data)
    if(this.type=="add"){
      // addres.add(data).then(res=>{
      //   this.$router.go(-1)
      // })
      console.log(this.$store.state.lists)
      this.$store.dispatch('addAction',data)
      console.log(this.$store.state.lists)
    }
    if(this.type==="edit"){
      data.id = this.id
      // addres.updata(data).then(res=>{
      //   this.$router.go(-1)
      // })
      this.$store.dispatch('updateAction',data)
    }
  },
  remove(){
    if(window.confirm('确认删除?')){
      // addres.remove(this.id).then(res=>{
      //   this.$router.go(-1)
      // })
      this.$store.dispatch('removeAction',this.id)
    }
  },
  setDefault(){
      // addres.setDefault(this.id).then(res=>{
      //   this.$router.go(-1)
      // })
      this.$store.dispatch('setDefaultAction',this.id)
  }

},
watch:{
  lists:{
    handler(){
      this.$router.go(-1)
    },
    deep:true
  },
  provinceValue(val){
    if(this.provinceValue===-1) {
      this.cityValue = -1
      this.districtValue =-1
      return
    }
    let list = this.addressData.list
    let index = list.findIndex(item=>{
      return item.value === val
    })
    this.cityList = list[index].children
    this.districtValue = -1
    this.cityValue = -1
    if(this.type==='edit'){
      this.cityValue = parseInt(this.instance.cityValue)
    }
  },
  cityValue(val){
    if(this.cityValue===-1) {
      this.districtValue =-1
      return
    }
    let list = this.cityList
    let index = list.findIndex(item=>{
      return item.value === val
    })
    this.districtList = list[index].children
    this.districtValue = -1
    if(this.type==='edit'){
      this.districtValue = parseInt(this.instance.districtValue)
    }
  }
},
}
</script>

<style>
</style>