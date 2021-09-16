<template>
  <div class="good-list-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imgLoad">
    <div class="good-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">￥{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "goodListItem",
    props: {
      goodsItem: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    methods: {
      imgLoad(){
        if(this.$route.path.indexOf('/home') !== -1){
          this.$bus.emit('itemImageLoad')
        }else {
          this.$bus.emit('detailImageLoad')
        }
      },
      itemClick(){
        this.$router.push('/detail/' + this.goodsItem.iid)
      }
    },
    computed: {
      showImage(){
        return this.goodsItem.image || this.goodsItem.show.img;
      }
    }

  }
</script>

<style scoped>
  .good-list-item {
    display: inline-block;
    width: 50%;
    text-align: center;
    font-size: 12px;
  }
  .good-list-item img {
    width: 92%;
    border: 1px dashed black;
    padding: 2px;

    border-radius: 5%;
  }
  .good-info {
    display: inline-block;
    width: 92%;
    text-align: center;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .good-list-item p {
    overflow: hidden;
    white-space:nowrap;
    text-overflow: ellipsis;
    padding-bottom: 5px;
  }
  .good-info .price {
    color: #06006a;
    margin-right: 10px;

  }
  .good-info .collect {
    position: relative;
    margin-left: 18px;
  }
  .good-info .collect::before {
    content: '';
    display: inline-block;
    width: 14px;
    height: 14px;
    background:  url("../../../assets/img/common/collect.svg") no-repeat ;
    background-size: 14px;
    position: absolute;
    left: -15px;
    bottom: 0;
  }

</style>
