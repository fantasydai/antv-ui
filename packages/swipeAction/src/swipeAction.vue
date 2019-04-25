<template>
  <div class="d-swipe-action">
    <div class="d-swipe-action-item d-swipe-action-left" v-if="left.length">
      <div class="d-swipe-action-item-btn" v-for="(item,index) in left" :ref="`swipe-btn-left-${index}`" :key="index" @click="handleClick(item)" :style="item.style">{{item.text}}</div>
    </div>
    <div class="d-swipe-action-item d-swipe-action-right" v-if="right.length">
      <div class="d-swipe-action-item-btn" :ref="`swipe-btn-right-${index}`" v-for="(item,index) in right" :key="index" @click="handleClick(item)" :style="item.style">{{item.text}}</div>
    </div>
    <div class="d-swipe-action-content" ref="dragContent">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import draggable from '../../../src/utils/slide.js'
import translateUtil from '../../../src/utils/translate.js'
import {isDOM} from '../../../src/utils/utils'
export default {
  name: 'd-swipeAction',
  props:{
    left: {
      type: Array,
      default: () => {
        return []
      }
    },
    right: {
      type: Array,
      default: () => {
        return []
      }
    },

  },
  data(){
    return {
       dragState: {
        start:0,
        startX: 0,
        startY: 0,
        endPos:0,
        dragDistance:0,
      },
      leftDistance: 0,
      leftShowDistance:0,
      rightDistance:0,
      rightShowDistance:0,

    }
  },
  mounted() {
    this.getDistance()
    this.bindSlide()
  },
  methods: {
    getDistance(){
      this.left.forEach((item,index)=>{
        let btn = this.$refs[`swipe-btn-left-${index}`][0]

        if(isDOM(btn)){
          index == 0 && (this.leftShowDistance = btn.offsetWidth)
          this.leftDistance += btn.offsetWidth
        }
      })
      let lastIndex = this.right.length -1
      this.right.forEach((item,index)=>{
        let btn = this.$refs[`swipe-btn-right-${index}`][0]
        if(isDOM(btn)){
          index == lastIndex && (this.rightShowDistance = btn.offsetWidth)
          this.rightDistance += btn.offsetWidth
        }
      })

    },
    bindSlide(){
      let el = this.$refs.dragContent
      draggable(el,{
        start: (e) =>{
          this.dragState.start = new Date()
          this.dragState.startX = e.pageX
          this.dragState.startY = e.pageY
        },
        drag: (e) => {

            this.dragState.dragDistance = e.pageX - this.dragState.startX
            if(!this.checkDrag(this.dragState.dragDistance)){
              return
            }
            this.dragState.endPos = this.dragState.dragDistance
            translateUtil.translateElement(el, this.dragState.endPos,null)
        },
        end: (e) => {
          if(this.dragState.startX === e.pageX  && this.dragState.startY === e.pageY) {
            this.reset(el)
          }
          if(!this.dragState.endPos) {
            this.dragState = {}
            return
          }
          // this.locateContent(index)
        }
      })
    },
    checkDrag(dragDistance){
      let translate = window.getComputedStyle(this.$refs.dragContent).transform.replace(/[^0-9\.\-,]/g,'').split(',')
      let translateX = translate[translate.length -2]
      console.log(this.right.length,translateX,this.rightDistance)
      if((!this.left.length && translateX > 0) || (!this.right.length && translateX < 0)) {
        return false
      }
      if((this.left.length && translateX > this.leftDistance) || (this.right.length && -translateX > this.rightDistance)) {
        return false
      }
      return true
    },
    locateContent(index){
      index = Math.max(0,Math.min(this.data.length - 1,-index))
      let el = this.$refs.dragContent
      let translate = -this.pageWidth * index
      translateUtil.translateElement(el, translate, null)
      this.activeIndex = index
    },
    reset(el){
      translateUtil.translateElement(el, 0, null)
    },
    handleClick(item){
      item.onPress && item.onPress()
      this.show = false
    }
  }
}
</script>

<style lang="less" scoped>
.d-swipe-action {
  position: relative;
  overflow: hidden;
  &-item {
    display: flex;
    position: absolute;
    top: 0;
    bottom: 0;
    overflow: hidden;
    white-space: nowrap;
    transition: all .3s;
    &-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      overflow: hidden;
      padding: 0 10px;
    }
  }
  &-left {
    left: 0;
  }
  &-right {
    right: 0;
  }
}
</style>


