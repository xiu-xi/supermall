<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key="index" class="tab-control-items" :class="{active: index === currentIndex}" @click="getIndex(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    data(){
      return {
        currentIndex: 0
      }
    },
    props: {
      titles:{
        type: Array,
        default(){
          return []
        }
      }
    },
    methods:{
      getIndex(index){
        this.currentIndex = index;
        this.$emit('tabClick',index)
      }
    },

  }
</script>

<style scoped>
  .tab-control{
    display: flex;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    text-align: center;
  }
  .tab-control-items {
    flex: 1;
  }
  .tab-control-items span{
      padding: 5px;
  }
  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
  .active{
    color: var(--color-tint);
  }
</style>
