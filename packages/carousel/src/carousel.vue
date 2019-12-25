<template>
  <section class="antv-carousel" ref="carouselRoot">
    <ul class="antv-carousel-wrap" ref="carousel">
      <slot></slot>
    </ul>
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
    dots: {
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
      transDuration: 0.4
    }
  },
  mounted() {
    this.initStyle()
    this.bindSlide()
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
    bindSlide(){
      draggable(this.el,{
        start: (e) =>{
          this.dragState.dragDistance = 0
          this.dragState.startX = e.pageX
          this.el.style.transition = ''
        },
        drag: (e) => {
            this.dragState.dragDistance = e.pageX - this.dragState.startX
            //check first slide to left
            this.checkFirstSlide()
            this.dragState.endPos = this.dragState.startPos + this.formatEndPos(this.dragState.dragDistance)
            this.translateElement(this.dragState.endPos)
            
        },
        end: (e) => {
          this.el.style.transition = `all ${this.transDuration}s ease`
          setTimeout(() => {
            this.locateContent()
          }, 20);
          
        }
      })
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
      this.dragState.startPos = endPos
      setTimeout(() => {
        this.checkIndex()
      }, this.transDuration*100 + 300);
      

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
      } else if(this.currentIndex === this.carouselNums) {
        this.resetCarouse('start')
      } else if (this.currentIndex === -1) {
        this.resetCarouse('end')
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
        endPos = curIndex * this.carouselWidth
      }
      this.el.style.transition = ''
      this.carouselItems[curIndex].style.left = `${endPos}px`
      this.currentIndex = type == 'start' ? 0 : this.carouselNums -1
      this.dragState.startPos = endPos
      translateUtil.translateElement(this.el, -endPos,null)
    },
    translateElement(position) {
      translateUtil.translateElement(this.el, position,null)
    }
  },
}
</script>

<style lang="less" scoped>
.antv-carousel{
  overflow: hidden;
  cursor: pointer;
  &-wrap{
    position: relative;
    display: block;
    margin: 0px;
    padding: 0px;
    height: 100%;
    cursor: inherit;
    box-sizing: border-box;
  }
}
  
</style>