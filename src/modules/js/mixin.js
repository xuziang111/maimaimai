import Foot from 'components/Foot.vue'
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
    },
    components:{
        Foot
    },
}
export default mixin