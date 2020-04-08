import { forestgreen } from "color-name"

let url ={
    hotLists:'/get/example/1586250292915'
}


//开发环境与生产环境的手动切换
// let host = ''

// let host = 'http://rap2.taobao.org:38080/app/mock/7058/get'
let host = 'http://rap2.taobao.org:38080/app/mock/249892'

for(let key in url){
    if(url.hasOwnProperty(key)){
        url[key] = host + url[key]
    }
}

export default url