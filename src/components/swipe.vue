<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swp-page swiper-slide" v-for="list in lists">
                <a class="js-no-follow" :href="list.url">
                    <img class="goods-main-photo fadeIn" :src="list.image">
                </a>
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.css'
export default {
    name:'swipe',
    props:{
        lists:{
            type:Array,
            required:true
        }
    },
    methods:{

    },
    mounted(){
    // new Swiper ('.swiper-container', {
    // // direction: 'vertical', // 垂直切换选项
    // loop: true, // 循环模式选项
    
    // // 如果需要分页器
    // pagination: {
    //   el: '.swiper-pagination',
    // },
//   })  
    },
    watch:{
        lists:function(){
            new Swiper ('.swiper-container', {
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项
    
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            },
            })  
        }
    }
}
</script>

<style scoped>
    .swiper-slide img{
        height:100%;
        widht:100%;
    }
</style>