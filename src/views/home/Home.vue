<template>
  <div id="home">
     <nav-bar class="shop-nav">
    <template v-slot:center >购物车</template>
  </nav-bar>
    <tab-control
      :titles="['流行','新款','精选']"
      class="tab-control"
      @tabClick = tabClick
      ref="tabControl2"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
     <home-swiper :banners="banners" @imageLoad="swiperImageLoad"></home-swiper>
     <recommend-view :recommends="recommends"></recommend-view>
     <FeatureView></FeatureView>
     <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick = tabClick ref="tabControl1" v-show="!isTabFixed"></tab-control>
     <good-list :goods="showGood"></good-list>
   </scroll>
    <back-top @click="topClick" v-show="isShowBack"></back-top>
  </div>
</template>

<script>
  import scroll from "../../components/common/scroll/scroll";
  import NavBar from "../../components/common/navbar/NavBar";
  import TabControl from "../../components/content/tabControl/TabControl";
  import goodList from "../../components/content/goods/goodList";
  import BackTop from "../../components/content/backTop/BackTop";

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";
  import {debounce} from "../../common/utils";


  import {getHomeMultidata,getHomeGoods} from "../../network/home";

  export default {
    name: "Home",
    data(){
      return {
        banners: [],
        recommends:[],
        result:null,
        //用于保存缓存数据
        goods: {
          'pop': {page:0 , list: []},
          'new': {page:0 , list: []},
          'sell': {page:0 , list: []}
        },
        currentType: 'pop',
        isShowBack: false,
        tabControlTop: 0,
        isTabFixed:false,
        saveY: 0,
      }
    },
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      goodList,
      scroll,
      BackTop,

    },
    computed: {
      showGood(){
        return this.goods[this.currentType].list
      }
    },
    created() {
      //在created里面请求数据，但是具体操作放在methods里面
      this.getHomeMultidata();
      this.getHomeGoods('pop');
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted() {
      //3.监听item中图片加载完成(元素加载完成
      const refresh = debounce(this.$refs.scroll.refresh,5 )
      this.$bus.on('itemImageLoad',() => {
        refresh()
      })
    },

    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,2)
      this.$refs.scroll.refresh()

    },
    deactivated() {
      this.saveY = this.$refs.scroll.scroll.y
    },
    methods: {
    //事件监听相关方法
      tabClick(index){
        switch (index) {
            case 0:
              this.currentType = 'pop';
              break;
            case 1:
              this.currentType = 'new';
              break;
          case 2:
            this.currentType = 'sell';
            break;
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;

      },
      topClick(){
        this.$refs.scroll.scrollTo(0,0,500);
      },
      contentScroll(position){
        //1.决定backTop是否显示
        this.isShowBack = (-position.y > 1000)
        //2.决定tabControl是否吸顶
        this.isTabFixed = (-position.y > this.tabControlTop)
      },
      swiperImageLoad(){
        this.tabControlTop = this.$refs.tabControl1.$el.offsetTop
      },
/*
      //防抖动
      debounce(func,delay){
        //闭包，避免变量销毁
        let timer = null;
        return function (...args) {
          if (timer) clearTimeout(timer)
          timer = setTimeout(()=>{
            func.apply(this,args)
          },delay)
        }
      },
*/

    loadMore(){
      this.getHomeGoods(this.currentType)
    },

      //网络请求相关方法
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
          this.result = res;
        });
      },
      getHomeGoods(type){
        //page是传的参数，data里面的page还没有加1，为了每一次调用getHomeGoods都传进新的页数的内容
        const page = this.goods[type].page + 1;
        //根据对应的页码和type来请求list内容并拼接到原来的list上
        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
         //finishPullUp实现多次上拉加载（结束上次上拉加载即可开启下次上拉加载
          //在数据加载完时，告诉pullUp，已经加载完成，可以开启下一次加载了
          this.$refs.scroll.scroll.finishPullUp()
          }
        );
        //为什么scroll是undefined
        //this.$refs.scroll.scroll.finishPullUp()
      }
    }

  }
</script>

<style scoped>
  .shop-nav {
    background-color: var(--color-tint);
    color: #f6f6f6;
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    z-index: 999;
    width: 100%;
  }
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    background-color: white;
    z-index: 999;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }
</style>
