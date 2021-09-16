<template>
<div class="detail-class">
  <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
  <scroll class="detail-scroll" ref="scroll" :probe-type="3" @scroll="contentScroll">
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :detail-goods="detailGoods"></detail-base-info>
    <detail-shop-info :shop="shop"  ></detail-shop-info>
    <detail-goods-info  :detail-info="detailInfo" @imageload="detailImageLoad"></detail-goods-info>
    <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
    <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
    <good-list :goods="recommends" ref="recommend" ></good-list>
  </scroll>
  <back-top @click="topClick" v-show="isShowBack" ></back-top>
  <DetailBottomBar  @addToCart="addToCart" :iid="iid"></DetailBottomBar>
  <Toast ref="toast"></Toast>
</div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import goodList from "../../components/content/goods/goodList";
  import BackTop from "../../components/content/backTop/BackTop";
  import DetailBottomBar from "./childComps/DetailBottomBar";
  import scroll from "../../components/common/scroll/scroll";
  import Toast  from "../../components/common/toast/Toast";


  import {getDetail,detailGoods,Shop,GoodsParam,getRecommend} from "network/detail";
  import GoodList from "../../components/content/goods/goodList";
  import {debounce} from "../../common/utils";
  export default {
    name: "Detail",

    components: {
      GoodList,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      goodList,
      BackTop,
      DetailBottomBar,
      Toast

    },
    data(){
      return {
        iid: null,
        topImages: null,
        detailGoods: {},
        shop: {},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        themeTopYs:[],
        getThemeScrollYs:null,
        isShowBack: false,
        currentIndex:0,

      }
    },
    created() {
      this.iid = this.$route.params.iid;

      //请求详情数据
      getDetail(this.iid).then(res => {
        //1.获取轮播图图片
        this.topImages =res.result.itemInfo.topImages;
        const data = res.result;
        //2.获取商品信息
        this.detailGoods = new detailGoods(data.itemInfo,data.columns,data.shopInfo.services);
        //3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)
        //4.保存商品的详情数据
        this.detailInfo = data.detailInfo;
        //5.获取商品参数
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
        //6.取出评论信息
          //先做一个判断，因为评论信息可能没有
        if (data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }
      });

      //请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
     })
      this.getThemeScrollYs = debounce(()=>{
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)

      })

    },

    methods: {
      detailImageLoad() {
        if(this.$refs.scroll){
          this.$refs.scroll.refresh()
        }
        this.getThemeScrollYs()
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],500)
      },
      //做跟随效果
      //通过获取better scroll的scroll on 的position参数
      contentScroll(position){
        const positionY = -position.y;
        const length = this.themeTopYs.length;
        for(let i = 0;i < length;i++){
          if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) ){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = i
          }
        }
        this.isShowBack = (-position.y > 1000)

      },
      topClick(){
        this.$refs.scroll.scrollTo(0,0,500);
      },
      addToCart() {
        if(!JSON.parse(localStorage.getItem("userSubMes"))){
          this.$router.push('/login')
        } else {
          //把信息发送到vuex里
          const obj = {
            iid: this.iid,
            desc: this.detailGoods.desc,
            price: this.detailGoods.realPrice,
            title: this.detailGoods.title,
            img: this.topImages[0],
            checked:true
          };
          //把商品信息加入到购物车里，修改任何state里面的东西都要通过mutations
          this.$store
            .dispatch("addCart", obj)
            .then(() => {
              this.$refs.toast.show("加购成功")
              //this.$toast._component.methods.show("加入购物车");
            })
            .catch(() => {
              this.$refs.toast.show("商品数量加1")
              //this.$toast._component.methods.show("商品数量加1");
            });
        }


      },

    }
  }
</script>

<style scoped>
  /*让detail的内容盖过下面的首页/等导航栏*/
  .detail-class {
    position: relative;
    background-color: white;
    z-index: 9;
    height: 100vh;
  }

  .detail-scroll {
    /*height: calc(100% - 44px);
    background-color: #ff5777;*/
    position: absolute;
    top:44px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
  /*让导航栏处于最上层，不被内容盖过*/
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: white;

  }

</style>
