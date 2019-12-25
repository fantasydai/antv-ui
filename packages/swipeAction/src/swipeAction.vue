<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-04-24 17:52:59
 * @LastEditTime: 2019-09-10 19:37:02
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="d-swipe-action">
    <div class="d-swipe-action-item d-swipe-action-left" v-if="left.length">
      <div :class="['d-swipe-action-item-btn',item.className]" v-for="(item,index) in left" :ref="`swipe-btn-left-${index}`" :key="index" @click="handleClick(item)" :style="item.style">{{item.text}}</div>
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
    autoClose: {//点击按钮自动隐藏按钮
      type: Boolean,
      default: true
    },
    disabled: {//禁用swipeAction
      type: Boolean,
      default: false
    },
    onOpen: {//打开时回调
      type: Function,
      default: ()=>{}
    },
    onClose: {//关闭时回调
      type: Function,
      default: ()=>{}
    },
  },
  data(){
    return {
       dragState: {
        start:0,
        startX: 0,
        endPos:0,
        dragDistance:0,
      },
      leftDistance: 0,
      leftShowDistance:0,
      rightDistance:0,
      rightShowDistance:0,
      isReseting: false
    }
  },
  mounted() {
  },
  watch: {
    disabled: {
      handler: function(val) {
        !val && setTimeout(() => {
          this.getDistance()
          this.bindSlide()
        }, 0);
      },
      immediate: true
    }
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
          let translate = window.getComputedStyle(this.$refs.dragContent).transform.replace(/[^0-9\.\-,]/g,'').split(',')
          let translateX = Number(translate[translate.length -2])
          if(translateX !== 0 && this.dragState.endPos) {
            this.isReseting = true
            this.reset(el)
          }
        },
        drag: (e) => {
            this.$refs.dragContent.style.transition = ''
            this.dragState.dragDistance = e.pageX - this.dragState.startX
            if(!this.checkDrag(this.dragState.dragDistance)){
              return
            }
            if(!this.dragState.endPos) {
              this.onOpen()
            }
            this.dragState.endPos = this.formatEndPos(this.dragState.dragDistance)
            translateUtil.translateElement(el, this.dragState.endPos,null)
            
        },
        end: (e) => {
          if(this.isReseting) {
            this.isReseting = false
            return
          }
          if(!this.dragState.endPos) {
            if(this.checkDrag(this.dragState.dragDistance)){
              this.reset(el)
            } 
            return
          }
          this.$refs.dragContent.style.transition = 'all 0.4s ease'
          setTimeout(() => {
            this.locateContent(el)
          }, 20);
          
        }
      })
    },
    formatEndPos(distance){
      if(distance > 0) {
        return Math.min(distance, this.leftDistance)
      } else {
        return Math.max(distance, -this.rightDistance)
      }
    },
    checkDrag(dragDistance){
      let translate = window.getComputedStyle(this.$refs.dragContent).transform.replace(/[^0-9\.\-,]/g,'').split(',')
      let translateX = Number(translate[translate.length -2])
      //check dragDistance
      if(dragDistance  > translateX) {
        //slide to right
        if(translateX < 0) {
          return true
        }
        if((!this.left.length && dragDistance > 0) || (!this.right.length && dragDistance < 0)) {
          return false
        }
        if((this.left.length && translateX >= this.leftDistance) || (this.right.length && -translateX >= this.rightDistance)) {
          return false
        }
      } else {
        //slide to left
        if(translateX > 0) {
          return true
        }
        if((!this.left.length && dragDistance > 0) || (!this.right.length && dragDistance < 0)) {
          return false
        }
        if((this.left.length && translateX >= this.leftDistance) || (this.right.length && -translateX >= this.rightDistance)) {
          return false
        }
      }
      return true
    },
    locateContent(el){
      let translate = window.getComputedStyle(this.$refs.dragContent).transform.replace(/[^0-9\.\-,]/g,'').split(',')
      let translateX = Number(translate[translate.length -2])
      if(!translateX) {
        this.reset(el)
        return
      } 
      if(translateX < 0) {
        //slide to left
        if( translateX < 0 && - translateX < this.rightDistance/2) {
          this.reset(el)
        } else {
          translateUtil.translateElement(el, -this.rightDistance, null)
        }
      } else {
        //slide to right
        if( translateX  > 0 && translateX < this.rightDistance/2) {
          this.reset(el)
        } else {
          translateUtil.translateElement(el, this.leftDistance, null)
        }
      }
    },
    reset(el){
      translateUtil.translateElement(el, 0, null)  
      this.dragState = {
        start:0,
        startX: 0,
        endPos:0,
        dragDistance:0,
      }
      this.onClose() 
    },
    handleClick(item){
      item.onPress && item.onPress()
      this.autoClose && this.reset(this.$refs.dragContent)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../src/style/default.less';
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
      padding: 0 10*@unit;
    }
  }
  &-left {
    left: 0;
  }
  &-right {
    right: 0;
  }
  &-content{
    // transition: all 0.2s ease;
  }
}
</style>