<template>
  <div class="detailNavBar">
    <nav-bar>
        <template v-slot:left>
            <img src="~assets/img/common/back.svg" alt="" class="back" @click="goBack">
        </template>
      <template v-slot:center>
        <div class="title">
          <div
            v-for="(item,index) in titles"
            :key="index"
            class="child"
            @click="getIndex(index)"
            :class="{activeTitle:currentIndex === index}"
          >{{item}}</div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "../../../components/common/navbar/NavBar";
  export default {
    name: "DetailNavBar",
    data(){
      return {
        titles: ['商品','参数','评论','推荐'],
        currentIndex: 0
      }
    },
    components:{
      NavBar,
    },
    methods: {
      getIndex(index) {
       this.currentIndex = index;
       this.$emit('titleClick',index)
      },
      goBack(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
.title{
  display: flex;
  font-size: 14px;
}
  .child{
    flex: 1;
  }
  .back{
    margin-top:10px
  }
  .activeTitle{
    color: #eee;
  }
</style>
