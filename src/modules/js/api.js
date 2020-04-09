import { forestgreen } from "color-name"

let url ={
    hotLists:'/get/index/hotLists',
    banner:'/get/index/banner',
    topLists:'/get/category/topList',
    subLists:'/post/category/subLists',
    rank:'/get/category/rank',
    searchList:'/post/search/list'
    
}


//开发环境与生产环境的手动切换
// let host = ''

// let host = 'http://rap2.taobao.org:38080/app/mock/7058'
let host = 'http://rap2.taobao.org:38080/app/mock/249892'

for(let key in url){
    if(url.hasOwnProperty(key)){
        url[key] = host + url[key]
    }
}

export default url