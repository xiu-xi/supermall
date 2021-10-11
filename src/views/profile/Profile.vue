<template>
  <div id="profile">
    <nav-bar class="nav-bar"><template v-slot:center >商城</template></nav-bar>
    <!--1.单独封装一个组件: 利用slot知识点-->
    <UserInfo>
      <template v-slot:user-nickname >{{nickName}}</template>
    </UserInfo>
    <!--2.没有单独封装: 不同的地方太多, 需要传过多的参数-->
    <section class="account">
      <div class="account-item">
        <div class="number">
          <span class="balance">0.00</span>元
        </div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>个
        </div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>分
        </div>
        <div class="account-info">我的积分</div>
      </div>
    </section>

    <!--3.封装成一个整体-->
    <list-view :list-data="orderList" class="order-list"></list-view>
    <list-view :list-data="serviceList" class="service-list"></list-view>

    <div class="cancle" @click="cancleLogin">退出登录</div>

  </div>
</template>

<script>
  import UserInfo from './childComps/UserInfo'
  import ListView from './childComps/ListView'
  import NavBar from "../../components/common/navbar/NavBar";
  import {Dialog, Toast} from "vant";

	export default {
		name: "Profile",
    components: {
		  UserInfo, ListView, NavBar
    },

    data: function () {
		  return {
		    orderList: [
          {src:require('@/assets/img/profile/message.svg'), info: '我的消息'},
          {src:require('@/assets/img/profile/shopping.svg'), info: '积分商城'},
          {src:require('@/assets/img/profile/vip.svg'), info: '会员卡'},
        ],
        serviceList: [
          {src:require('@/assets/img/profile/cart.svg'),info: '我的购物车'},
          {src:require('@/assets/img/profile/pointer.svg'), info: '下载购物APP'},

        ],
        nickName:this.$store.state.nickName
		  }
      },
    // mounted() {
    //   let subMes = JSON.parse(localStorage.getItem("userSubMes"))
    //   this.nickName = subMes.username
    // },

    activated() {
		  if(JSON.parse(localStorage.getItem("userSubMes"))){
        let username = JSON.parse(localStorage.getItem("userSubMes")).username;
        this.nickName = username
      } else {
        this.nickName = "登录/注册"
      }

    },
    methods:{
      cancleLogin(){
        Dialog.confirm({
          title: '确认退出登录？',
          message: '',
        })
          .then(() => {
            localStorage.clear();
            this.nickName = "登录/注册"
            Toast.success("退出成功")
          })
          .catch(() => {
            // on cancel
          });
      }
    }


  }

</script>

<style scoped>
  #profile {
    background-color: #f2f2f2;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .account {
    display: flex;
  }

  .account-item {
    width: 100%;
    background-color: #fff;
    margin-right: 1px;
    text-align: center;
  }

  .account-item:last-of-type {
    margin-right: 0;
  }

  .account-item {
    color: #666;
    font-size: 13px;
    padding: 18px;
  }

  .account-item .balance {
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
  }

  .account-info {
    margin-top: 6px;
  }

  .order-list, .service-list {
    margin-top: 12px;
  }
  .cancle {
    text-align: center;
    border-radius: 5%;
    background-color: #ffffff;
    padding: 5px;
    font-size: 16px;
  }
</style>
