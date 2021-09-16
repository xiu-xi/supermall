<template>
  <div class="wrapper" ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "scroll",
    data(){
      return {
        scroll: 'bbb',
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },

    mounted() {
      //1.创建BScroll事件
      this.scroll = new BScroll(this.$refs.wrapper,{
        click: true,
        probeType: this.probeType,
        observeDOM: true,
        observeImage: true,
        pullUpLoad:this.pullUpLoad,
      });
      //2.监听滚动(加if优化性能
      if (this.probeType === 2 || this.probeType === 3){
        this.scroll.on('scroll',(position) => {
          this.$emit('scroll',position)
        })
      }
      //3.监听在底部下拉
      if (this.pullUpLoad === true){
        this.scroll.on('pullingUp',()=>{
          this.$emit('pullingUp')
        })
      }

    },
    methods: {
      scrollTo(x,y,time=500){
          this.scroll&&this.scroll.scrollTo(x,y,time)
      },
      refresh(){
        this.scroll.refresh()
      }

    }

  }
</script>

<style scoped>

</style>
