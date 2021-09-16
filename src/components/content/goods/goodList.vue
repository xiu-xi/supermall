<template>
  <div class="good">
    <good-list-item v-for="(item,index) in goods" :key="index" :goodsItem="item"></good-list-item>
  </div>
</template>

<script>
  import goodListItem from "./goodListItem"
  export default {
    name: "goodList",
    props: {
      goods: {
        type: Array,
        default(){
          return []
        }
      }

    },
    components: {
      goodListItem,
    }
  }
</script>

<style scoped>

</style>
