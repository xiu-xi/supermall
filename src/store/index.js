import { createStore } from 'vuex'
import {ADD_COUNT, ADD_TO_CART} from "./mutation-type";


export default createStore({
  state:{
    cartList:[],

  },
  getters:{
    cartLength(state){
        return state.cartList.length
    },
    cartList(state){

        return state.cartList


    },

  },
  mutations:{
    [ADD_COUNT](state,payLoad){
      payLoad.count++;
    },
    [ADD_TO_CART](state,payLoad){
      state.cartList.push(payLoad);
    },
    // getNickName(state){
    //   console.log('111')
    //     let subMes = JSON.parse(localStorage.getItem("userSubMes"))
    //     state.nickName = subMes.username;
    //     console.log(state.nickName)
    // }

  },
  actions:{
    addCart(context, payLoad) {
      return new  Promise((resolve,reject)=>{
        let oldProduct = context.state.cartList.find(item => item.iid === payLoad.iid)
        //判断oldProduct
        if (oldProduct) {
          //oldProduct.count+=1;
          context.commit(ADD_COUNT, oldProduct)
          reject('添加了该商品')
        } else {
          payLoad.count = 1;
          context.commit(ADD_TO_CART, payLoad)

          resolve('增加了该商品')
        }
      })

    }
  }

})
