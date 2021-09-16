<template>
  <tab-bar>
    <tab-bar-item path="/home" >
      <template v-slot:item-icon>
        <img src="~assets/img/tabbar/home.png" alt="">
      </template>
      <template v-slot:item-icon_active>
        <img src="~assets/img/tabbar/home_active.png" alt="">
      </template>
      <template v-slot:item-text>
        <div>首页</div>
      </template>
    </tab-bar-item>

    <tab-bar-item path="/category" >
      <template v-slot:item-icon >
        <img src="~assets/img/tabbar/classfy.png" alt="">
      </template>
      <template v-slot:item-icon_active>
        <img src="~assets/img/tabbar/classfy_active.png" alt="">
      </template>
      <template v-slot:item-text>
        <div>分类</div>
      </template>
    </tab-bar-item>

    <tab-bar-item path="/cart">
      <template v-slot:item-icon_active>
        <img src="~assets/img/tabbar/shopcart_active.png" alt="">
      </template>
      <template v-slot:item-icon>
        <img src="~assets/img/tabbar/shopcar.png" alt="">
      </template>
      <template v-slot:item-text>
        <div>购物车</div>
      </template>
    </tab-bar-item>

    <tab-bar-item path="/profile" >
      <template v-slot:item-icon_active>
        <img src="~assets/img/tabbar/profile_active.png" alt="">
      </template>
      <template v-slot:item-icon>
        <img src="~assets/img/tabbar/profile.png" alt="">
      </template>
      <template v-slot:item-text>
        <div>我的</div>
      </template>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from "../../common/tabBar/TabBar";
  import TabBarItem from "../../common/tabBar/TabBarItem";
  export default {
    name: "MainTabBar",
    components:{
      TabBar,
      TabBarItem,
    }
  }
</script>

<style scoped>
  .tab-bar-item img{   /*!/为什么tabbaritem的img样式要写在父组件才有效*/
    width: 24px;
    height: 24px;
    margin-top:3px ;
    vertical-align: middle;
    margin-bottom: 3px;
  }
</style>
