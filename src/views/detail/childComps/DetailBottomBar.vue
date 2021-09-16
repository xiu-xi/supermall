<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">
        <span class="cartNum">{{nowCount}}</span>
        <span>加入购物车</span>
      </div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBottomBar",
    data(){
      return {
        nowCount:0
      }
    },
    props: {
      iid:null,
    },
    methods: {
      addToCart(){
        this.$emit('addToCart')
        const cartList = this.$store.getters.cartList;
        const nowItem =  cartList.find(item => item.iid === this.iid);
        if(nowItem){
          this.nowCount = nowItem.count
        }

      }

    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 58px;
    position: fixed;
    background-color: #fff;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    text-align: center;
  }
  .bar-item {
    flex: 1;
    display: flex;
  }
  .bar-item>div {
    flex: 1;
  }
  .bar-left .text {
    font-size: 13px;
  }
  .bar-left .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 10px auto 3px;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
  }
  .bar-left .service {
    background-position:0 -54px;
  }
  .bar-left .shop {
    background-position:0 -98px;
  }
  .bar-right {
    font-size: 15px;
    color: #fff;
    line-height: 58px;
  }
  .bar-right .cart {
    background-color: #06006a;
    color: #eee;
    position: relative;
    overflow: hidden;
  }
  .bar-right .cart .cartNum {
    display: inline-block;
    position: absolute;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    top: -7px;
    right: -7px;
    font-size: 10px;
    background-color: #ff5777;
    color: #eeeeee;
    text-align: left;
    text-indent: 5px;
    line-height: 28px;
  }
  .bar-right .buy {
    background-color: #dd5145;
  }
</style>
