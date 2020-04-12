module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'assets',
    indexPath: 'index.html',
    filenameHashing:true,

    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'components': '@/components',
                'css': '@/modules/css',
                'js': '@/modules/js',
                'views': '@/views',
            }
        }
    },

    pages: {
        index: {
            entry: "./src/pages/index/index.js", // 配置入口js文件
            template: "./src/pages/index/index.html", // 主页面
            filename: "index.html", // 打包后的html文件名称
            title: "首页", // 打包后的.html中<title>标签的文本内容
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        cart: {//新增的部份
            entry: "./src/pages/cart/cart.js", // 配置入口js文件
            template: "./src/pages/cart/cart.html", // 主页面
            filename: "cart.html", // 打包后的html文件名称
            title: "购物", // 打包后的.html中<title>标签的文本内容
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'cart']
        },
        category: {//新增的部份
            entry: "./src/pages/category/category.js", // 配置入口js文件
            template: "./src/pages/category/category.html", // 主页面
            filename: "category.html", // 打包后的html文件名称
            title: "分类", // 打包后的.html中<title>标签的文本内容
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'category']
        }, 
        member: {//新增的部份
            entry: "./src/pages/member/member.js", // 配置入口js文件
            template: "./src/pages/member/member.html", // 主页面
            filename: "member.html", // 打包后的html文件名称
            title: "个人中心", // 打包后的.html中<title>标签的文本内容
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'member']
        },  
        search: {//新增的部份
            entry: "./src/pages/search/search.js", // 配置入口js文件
            template: "./src/pages/search/search.html", // 主页面
            filename: "search.html", // 打包后的html文件名称
            title: "列表", // 打包后的.html中<title>标签的文本内容
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'search']
        },
        goods: {//新增的部份
            entry: "./src/pages/goods/goods.js", // 配置入口js文件
            template: "./src/pages/goods/goods.html", // 主页面
            filename: "goods.html", // 打包后的html文件名称
            title: "详情", // 打包后的.html中<title>标签的文本内容
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'goods']
        },      
        },
}