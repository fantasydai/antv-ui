<template>
  <section class="antv-carousel" ref="carouselRoot">
    <ul class="antv-carousel-wrap" ref="carousel">
      <slot></slot>
    </ul>
    <div class="antv-carousel-indicator" v-if="indicator" :style="indicatorStyle">
      <div :class="['antv-carousel-indicator-dot', index === currentIndex + 1 && 'antv-carousel-indicator-dot-active']" v-for="index in carouselNums" :key="index">
        <span :style="index === currentIndex + 1 ? Object.assign({}, dotStyle, dotActiveStyle) : dotStyle"></span>
      </div>
    </div>
  </section>
</template>
<script>
import draggable from '../../../src/utils/slide.js'
import translateUtil from '../../../src/utils/translate.js'

export default {
  name: 'antv-carousel',
  props: {
    selectedIndex: {
      type: Number,
      default: 0
    },
    indicator: {
      type: Boolean,
      default: true
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    autoplayInterval: {
      type: Number,
      default: 3000
    },
    infinite: {
      type: Boolean,
      default: false
    },
    slideWidth: {
      type: Number,
      default: 40
    },
    afterChange: {
      type: Function,
      default: ()=>{}
    },
    indicatorStyle: {
      type: Object,
      default: ()=>{return {}}
    },
    dotStyle: {
      type: Object,
      default: ()=>{return {}}
    },
    dotActiveStyle: {
      type: Object,
      default: ()=>{return {}}
    }
  },
  data(){
    return {
      el: null,
      timmer: null,
      carouselNums: 0,
      carouselWidth: 0,
      carouselItems: [],
      dragState: {
        start:0,
        startX: 0,
        startPos: 0,
        endPos:0,
        dragDistance:0,
      },
      currentIndex: 0,
      transDuration: 0.4,
      
    }
  },
  mounted() {
    this.initStyle()
    if(this.carouselNums <=1) return
    this.checkDefaultIndex()
    this.bindSlide()
    this.play()
  },
  methods: {
    initStyle(){
      this.carouselWidth = this.$refs.carouselRoot.clientWidth
      this.el = this.$refs.carousel
      this.carouselItems = [...this.el.childNodes]
      this.carouselNums = this.carouselItems.length
      if(this.carouselNums) {
        this.el.childNodes.forEach((item, index)=>{
          item.style.width = `${this.carouselWidth}PX`
          item.style.left = `${this.carouselWidth*index}PX`
        })
      }
    },
    checkDefaultIndex(){
      if(!this.selectedIndex || this.selectedIndex >= this.carouselNums || this.selectedIndex < 0) return
      this.currentIndex = this.selectedIndex
      let endPos = -this.carouselWidth * this.currentIndex
      this.translateElement(endPos)
      this.checkIndex()
    },
    bindSlide(){
      draggable(this.el,{
        start: (e) =>{
          this.dragState.dragDistance = 0
          this.dragState.startX = e.pageX
          this.cancelTransition()

          this.timmer && this.pause()
        },
        drag: (e) => {
            this.dragState.dragDistance = e.pageX - this.dragState.startX
            //check first slide to left
            this.checkFirstSlide()
            this.dragState.endPos = this.dragState.startPos + this.formatEndPos(this.dragState.dragDistance)
            this.translateElement(this.dragState.endPos)
            
        },
        end: (e) => {
          this.addTransition()
          setTimeout(() => {
            this.locateContent()
            this.afterChange()
          }, 20);
          this.infinite && this.play()
          
        }
      })
    },
    play(){
      if(!this.autoplay) return

      this.timmer = setInterval(() => {
        this.addTransition()
        let endPos = -this.carouselWidth * (++this.currentIndex)
        if(this.currentIndex  + 1 >= this.carouselNums) {
          this.translateElement(endPos)
          if(this.infinite) {
            setTimeout(() => {
              this.checkIndex()
            }, this.transDuration*100 + 300);
          } else {
            this.pause()
          }
          this.updateStartPos(endPos)
          this.afterChange()
          return
        }
        this.translateElement(endPos)
        this.afterChange()
        this.updateStartPos(endPos)
      }, this.autoplayInterval);
    },
    pause(){
      clearInterval(this.timmer)
      this.timmer = null
    },
    formatEndPos(distance){
      return distance > 0 ? Math.min(distance, this.carouselWidth) : Math.max(distance, -this.carouselWidth)
    },
    locateContent(){
      let dragDistance = this.dragState.dragDistance
      let endPos
      if(dragDistance > this.slideWidth) {
        endPos = -this.carouselWidth * (--this.currentIndex)
      } else if(dragDistance < -this.slideWidth) {
        endPos = -this.carouselWidth * (++this.currentIndex)
      } else {
        endPos = -this.carouselWidth * this.currentIndex
      }
      this.translateElement(endPos)
      this.updateStartPos(endPos)
      setTimeout(() => {
        this.checkIndex()
      }, this.transDuration*100 + 300);
    },
    updateStartPos(endPos){
      this.dragState.startPos = endPos
    },
    checkFirstSlide(){
      if(this.currentIndex === 0 && this.dragState.dragDistance > 0) {
        this.carouselItems[this.carouselNums - 1].style.left =`${-this.carouselWidth}PX`
      }
    },
    checkIndex(){
      if(this.currentIndex + 1 === this.carouselNums) {
        //slide to lastItem
        this.carouselItems[0].style.left =`${this.carouselNums * this.carouselWidth}PX`
      } else if (this.currentIndex + 2 === this.carouselNums) {
        this.carouselItems[0].style.left = '0PX'
      } else if(this.currentIndex === this.carouselNums) {
        this.resetCarouse('start')
      } else if (this.currentIndex === -1) {
        this.resetCarouse('end')
        this.carouselItems[0].style.left =`${this.carouselNums * this.carouselWidth}PX`
      }
    },
    resetCarouse(type){
      let endPos,
          curIndex
      if(type == 'start') {
        curIndex = 0
        endPos = 0
      } else {
        curIndex = this.carouselNums -1
        endPos =  curIndex * this.carouselWidth
      }
      this.cancelTransition()
      this.carouselItems[curIndex].style.left = `${endPos}px`
      this.currentIndex = type == 'start' ? 0 : this.carouselNums -1
      this.dragState.startPos = -endPos
      this.translateElement(-endPos)
    },
    translateElement(position) {
      translateUtil.translateElement(this.el, position,null)
    },
    addTransition(){
      this.el.style.transition = `all ${this.transDuration}s ease`
    },
    cancelTransition(){
      this.el.style.transition = ''
    }
  },
}
</script>

<style lang="less" scoped>
@import '../../../src/style/default.less';

.antv-carousel{
  overflow: hidden;
  cursor: pointer;
  position: relative;
  &-wrap{
    position: relative;
    display: block;
    margin: 0;
    padding: 0;
    height: 100%;
    cursor: inherit;
    box-sizing: border-box;
  }
  &-indicator{
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    &-dot{
      display: inline-block;
      &>span{
        display: block;
        width: 8*@unit;
        height: 8*@unit;
        margin: 0 3*@unit;
        border-radius: 50%;
        background: #ccc;
      }
      &-active{
        &>span{
          background: #fff;
        }
      }
    }
  }
}
  
</style>