import fetch from 'js/fetch.js'
import url from 'js/api.js'

class Addres{
    static list(){
        return fetch(url.addressLists)
    }
    static add(data){
        return fetch(url.add,data)
    }
    static remove(id){
        return fetch(url.remove,id)
    }
    static updata(data){
        return fetch(url.addressUpdate,data)
    }
    static setDefault(data){
        return fetch(url.addressSetDefault,data)
    }
}

export default Addres