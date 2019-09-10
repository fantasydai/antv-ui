<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-10 19:16:53
 * @LastEditTime: 2019-09-10 19:29:40
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div ref="scroller" class="d-scroller">
    <div class="d-scroller-content">
      <div ref="content">
        <slot>
          <ul class="list-content">
            <li @click="clickItem($event,item)" class="list-item" v-for="(item,index) in data" :key="index">{{item}}</li>
          </ul>
        </slot>
      </div>
      <slot name="pullup" :pullUpLoad="pullUpLoad" :isPullingUp="isPullingUp" v-if="data.length">
        <div class="pullup-wrapper" v-if="pullUpLoad">
          <div class="before-trigger" v-if="!isPullingUp">
            <span>{{pullUpTxt}}</span>
          </div>
          <div class="after-trigger" v-else>
            <loading></loading>
          </div>
        </div>
      </slot>
    </div>
    <slot name="pulldown"
          :pullDownRefresh="pullDownRefresh"
          :pullDownStyle="pullDownStyle"
          :beforePullDown="beforePullDown"
          :isPullingDown="isPullingDown"
          :bubbleY="bubbleY"
    v-if="data.length">
      <div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
        <div class="before-trigger" v-if="beforePullDown">
          <bubble :y="bubbleY"></bubble>
        </div>
        <div class="after-trigger" v-else>
          <div v-if="isPullingDown" class="loading">
            <loading></loading>
          </div>
          <div v-else><span>{{refreshTxt}}</span></div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import Loading from '../../../src/components/loading/loading.vue'
  import Bubble from '../../../src/components/bubble/bubble.vue'

  export default {
    name: 'd-scroller',
    props: {
      data: {
        type: Array,
        default: function () {
          return []
        }
      },
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      direction: {
        type: String,
        default: 'scrollY',
        validator(val){
          return ['scrollY','scrollX'].indexOf(val) > -1
        }
      },
      scrollbar: {
        type: null,
        default: false
      },
      pullDownRefresh: {
        type: null,
        default: false
      },
      pullUpLoad: {
        type: null,
        default: false
      },
      startY: {
        type: Number,
        default: 0
      },
      refreshDelay: {
        type: Number,
        default: 20
      },
      freeScroll: {
        type: Boolean,
        default: false
      },
      bounce: {
        default: true
      },
    },
    data() {
      return {
        beforePullDown: true,
        isRebounding: false,
        isPullingDown: false,
        isPullingUp: false,
        isPullUp: true,
        pullDownStyle: '',
        bubbleY: 0
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.forceUpdate(true)
        }, this.refreshDelay)
      }
    },
    components: {
      Loading,
      Bubble
    },
    computed: {
      pullUpTxt() {
        const moreTxt = (this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.more)
        const noMoreTxt = (this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.noMore)
        return this.isPullUp ? moreTxt : noMoreTxt
      },
      refreshTxt() {
        return (this.pullDownRefresh && this.pullDownRefresh.txt)
      }
    },
    created() {
      this.pullDownInitTop = -50
    },
    mounted() {
      setTimeout(() => {
        this.initScroll()
      }, 20)
    },
    destroyed() {
      this.$refs.scroll && this.$refs.scroll.destroy()
    },
    methods: {
      initScroll() {
        if (!this.$refs.scroller) {
          return
        }
        let options = {
          probeType: this.probeType,
          click: this.click,
          scrollY: this.freeScroll || this.direction === 'scrollY',
          scrollX: this.freeScroll || this.direction === 'scrollX',
          scrollbar: this.scrollbar,
          pullDownRefresh: this.pullDownRefresh,
          pullUpLoad: this.pullUpLoad,
          startY: this.startY,
          freeScroll: this.freeScroll,
          mouseWheel: this.mouseWheel,
          bounce: this.bounce,
        }
        this.scroll = new BScroll(this.$refs.scroller, options)
        this.pullDownRefresh && this._initPullDownRefresh()
        this.pullUpLoad && this._initPullUpLoad()
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      },
      clickItem(e, item) {
        this.$emit('click', item)
      },
      destroy() {
        this.scroll.destroy()
      },
      forceUpdate(status = false) {
        if (this.pullDownRefresh && this.isPullingDown) {
          this.isPullingDown = false
          this._reboundPullDown().then(() => {
            this._afterPullDown()
          })
        } else if (this.pullUpLoad && this.isPullingUp) {
          this.isPullingUp = false
          this.scroll.finishPullUp()
          this.isPullUp = status
          this.refresh()
        } else {
          this.refresh()
        }
      },
      _initPullDownRefresh() {
        this.scroll.on('pullingDown', this._pullDownHandle)
        this.scroll.on('scroll', this._pullDownScroll)
      },
      _initPullUpLoad() {
        this.scroll.on('pullingUp', this._pullUpHandle)
      },
      _pullDownHandle() {
        this.beforePullDown = false
        this.isPullingDown = true
        this.$emit('pullingDown')
      },
      _pullDownScroll(pos) {
        if (!this.pullDownRefresh) {
          return
        }
        if (this.beforePullDown) {
          this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop)
          this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 10)}px`
        } else {
          this.bubbleY = 0
        }
        if (this.isRebounding) {
          this.pullDownStyle = `top:${10 - (this.pullDownRefresh.stop - pos.y)}px`
        }
      },
      _pullUpHandle() {
        this.isPullingUp = true
        this.$emit('pullingUp')
      },
      _reboundPullDown() {
        const {stopTime = 600} = this.pullDownRefresh
        return new Promise((resolve) => {
          setTimeout(() => {
            this.isRebounding = true
            this.scroll.finishPullDown()
            resolve()
          }, stopTime)
        })
      },
      _afterPullDown() {
        setTimeout(() => {
          this.pullDownStyle = `top:${this.pullDownInitTop}*@unit`
          this.beforePullDown = true
          this.isRebounding = false
          this.refresh()
        }, this.scroll.options.bounceTime)
      }
    },
  }
</script>

<style lang="less" scoped>
@import '../../../src/style/default.less';
@import '../../../src/style/reset.less';
  .d-scroller{
    position: relative;
    height: 100%;
    overflow: hidden;
    background: #fff;
    .d-scroller-content{
      position: relative;
      z-index: 1;
    }
    .list-content{
      position: relative;
      z-index: 10;
      list-style: none;
      background: #fff;
    }
    .list-item{
      height: 60*@unit;
      line-height: 60*@unit;
      font-size: 18*@unit;
      padding-left: 60*@unit;
      border-bottom: 1*@unit solid #e5e5e5;
    }
  }
  .pulldown-wrapper{
    position: absolute;
    width: 100%;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all;
    .after-trigger{
      margin-top: 10*@unit;
    }
  }
  .pullup-wrapper{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10*@unit 0;
  }
</style>
