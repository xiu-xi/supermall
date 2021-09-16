<template>
  <div class="detailBaseInfo" v-if="Object.keys(detailGoods).length !== 0">
    <div class="info-title">{{detailGoods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{detailGoods.newPrice}}</span>
      <span class="o-price">{{detailGoods.oldPrice}}</span>
      <span class="discount">{{detailGoods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{detailGoods.columns[0]}}</span>
      <span>{{detailGoods.columns[1]}}</span>
      <span>{{detailGoods.services[detailGoods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in detailGoods.services.length-1" :key="index">
        <img :src="detailGoods.services[index-1].icon" alt="">
        <span>{{detailGoods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props: {
      detailGoods: {
        type: Object,
        default(){
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .detailBaseInfo {
    padding: 2%;
  }
  .info-title{
    font-size: 16px;
    color: black;
    text-align: left;
  }
  .info-price {
    padding: 4px 0 20px 0;
    position: relative;
  }
  .info-price .n-price {
    color: #06006a;
    font-size: 20px;
    font-weight: bolder;
  }
  .info-price .o-price {
    font-size:10px ;
    text-decoration:line-through;
    color: #9d9d9d;
    margin-left: 2%;
  }
  .info-price .discount {
    background-color: var(--color-tint);
    color: white;
    display: inline-block;
    width: 42px;
    height: 16px;
    line-height: 16px;
    border-radius: 8px;
    font-size: 5px;
    text-align: center;
    margin-left: 2%;
    position: absolute;
    top: 4px;
  }
.info-other {
  display: flex;
  font-size: 12px;
  color: #9d9d9d;
  text-align: center;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(1,1,1,0.2);
}
  .info-other span {
    flex: 1;
  }
  .info-other span:nth-child(1){
    text-align: left;
  }
  .info-other span:nth-child(3){
    text-align: right;
  }

.info-service {
  padding: 30px 0;
  display: flex;
  font-size: 13px;
  border-bottom: 2px solid rgba(1,1,1,0.1);
}
  .info-service-item {
    flex: 1;
  }
  .info-service-item img {
    width: 14px;
    vertical-align: middle;
  }
  .info-service-item span {
    display: inline-block;
    vertical-align: middle;
  }
</style>
