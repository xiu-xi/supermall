<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="isActive"><slot name="item-icon_active"></slot></div>
    <div v-else><slot name="item-icon"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path:String,
      activeColor:{
        type:String,
        default:'#06006a'
      }
    },
    data(){
      return{}
    },
    computed:{
      isActive(){
       return this.$route.path === this.path  //this指代什么:整个vue实例对象
                                              //this.path指代从父子间也就是app.vue传过来的值，this.$route.path被点击后活跃的路由路径
                                              //一共有4个TabBarItem.vue组件被使用，每一个组件的path都被设置成对用的路由路径，都不一样，确定是活跃的那个时返回true

      },
      activeStyle(){
        return this.isActive? {color:this.activeColor} : {}
      }
    },
    methods: {
      itemClick(){
        this.$router.replace(this.path);
      }
    }
  }
</script>

<style scoped>
.tab-bar-item {
    background-color: #f6f6f6;
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 10px;
  }
.active {
  color: #06006a;
}
</style>
