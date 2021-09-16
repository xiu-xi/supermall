<template>

    <div>
      <cart-list-item v-for="item in cartList" :key="item.iid" :item-infoo="item"></cart-list-item>
    </div>

</template>

<script>


  import CartListItem from './CartListItem';

  export default {
    name: "CartList",
    components: {
      CartListItem
    },
    props: {
      cartList: {
        type: Array,
        default() {
          return []
        }
      }
      //给每个cartItem添加点击事件跳转到对应的详情页

    },

  }
</script>

<style scoped>
</style>
