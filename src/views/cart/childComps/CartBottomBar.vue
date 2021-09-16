<template>
  <div class="bottom-menu">
    <CheckButton class="select-all" @checkBtnClick="checkBtnClick" :checked="isSelectAll"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product" @click="payOrlogin">支付</span>
  </div>
</template>

<script>
  import CheckButton from './CheckButton'
  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        const cartList = this.$store.getters.cartList;
        return cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.count * item.price
        }, 0).toFixed(2)
      },
      isSelectAll: function () {
        return this.$store.getters.cartList.find(item => item.checked === false) === undefined;
      }
    },
    methods: {
      checkBtnClick: function () {
        // 1.判断是否有未选中的按钮
        let isSelectAll = this.$store.getters.cartList.find(item => !item.checked);
        // 2.有未选中的内容, 则全部选中
        if (isSelectAll) {
          this.$store.state.cartList.forEach(item => {
            item.checked = true;
          });
        } else {
          this.$store.state.cartList.forEach(item => {
            item.checked = false;
          });
        }
      },
      payOrlogin(){
        //先检测本地存储里有没有登录信息
        //没有就跳转到登录页面
        if(!JSON.parse(localStorage.getItem("userSubMes"))){
          this.$router.push('/login')
        }

      }
    }
  }
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }
  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }
  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }
  .bottom-menu .buy-product {
    background-color: #dd5145;
    color: #fff;
    width: 100px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    float: right;
    border-radius: 5px;
    font-size: 18px;
    box-shadow: 2px 2px 5px 0 rgba(0,0,0,0.5);
    margin-right: 3px;
    margin-top: 2px;
  }
</style>
