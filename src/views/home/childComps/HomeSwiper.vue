<template>
  <swiper class="swiper1">
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link"><img :src="item.image" alt="" @load="imageLoad"></a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper'
  export default {
    name: "HomeSwiper",
    data(){
      return {
        isLoad : false
      }
    },

    props:{
      banners:{
        type:Array,
        default(){
          return []
        }
      },
    },
    methods: {
      imageLoad(){
        if(!this.isLoad){
          this.$emit('imageLoad')
          this.isLoad = true
        }
      }
    },

    components: {
      Swiper,
      SwiperItem,
    }
  }
</script>

<style scoped>
  .swiper1 img{
    width: 100%;
    border-radius: 10px;
  }
</style>
