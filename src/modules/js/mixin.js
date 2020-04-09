let mixin={
    filters:{
        getDot(price){
            let len = price.toString().length
            let temp = price.toString().lastIndexOf('.')
            if(temp === -1){
                price = price +'.00'
            }else if(len - temp === 2){
                price = price + '0'
            }
            return price
        }
    }
}
export default mixin