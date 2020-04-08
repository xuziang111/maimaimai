<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swp-page swiper-slide" v-for="(list,index) in lists" :key="index">
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
        new Swiper ('.swiper-container', {
            observer: true,
            observeParents: true,
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项
    
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            },
            })  
    },
    watch:{
        lists:function(){ 
        }
    }
}
</script>

<style scoped>
    .swiper-slide img{
        height:100%;
        width:100%;
    }
    .js-no-follow{
        width:100%;
        height:100%;
    }
</style>