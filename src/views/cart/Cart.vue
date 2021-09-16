<template>
  <div class="cart">
    <nav-bar class="cart_nav_bar">
      <template v-slot:center>
        <div>购物车({{ cartLength }})</div>
      </template>
    </nav-bar>
    <scroll ref="scroll" class="cart_scroll" :probe-type="3">
      <cart-list class="cart-list" :cart-list="cartList"></cart-list>
    </scroll>
    <CartBottomBar></CartBottomBar>
  </div>

</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import scroll from "../../components/common/scroll/scroll";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";
  // import { mapGetters } from 'vuex'
  export default {
    name: "Cart",
    data(){
      return {
        cartList:null,
        cartLength:0
      }
    },
    components:{
      NavBar,
      scroll,
      CartList,
      CartBottomBar
    },
    activated() {
      if(JSON.parse(localStorage.getItem("userSubMes"))){
          this.cartList = this.$store.getters.cartList;
          this.cartLength = this.$store.getters.cartLength
        }else {
        this.cartList = null;
        this.cartLength = 0
        }
      }



  }
</script>

<style scoped>
  .cart_nav_bar {
    background-color: var(--color-tint);
    color: #f6f6f6;
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    z-index: 999;
    width: 100%;
  }
  .cart {
    height: 100vh;
    overflow: hidden;
  }
  .cart_scroll {
    position: absolute;
    width: 100%;
    top: 44px;
    right: 0;
    left: 0;
    bottom: 49px;
  }
</style>
