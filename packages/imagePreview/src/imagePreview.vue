<template>
  <transition name="d-fade">
     <div class="d-image-preview" v-if="show">
      <div class="d-image-preview-header">
        <slot name="header"></slot>
      </div>
      <div class="d-image-preview-mask" :style="maskStyle"></div>
      <div class="d-image-preview-content" ref="dragContent">
        <div class="d-image-preview-item" v-for="(img ,index) in data" :key="index">
          <img :src="img.url" :onerror="`this.src=${errorImg}`" :style="{width:img.width,height: img.height}" :alt="`img-item-${index}`">
        </div>
      </div>
      <div :class="['d-image-preview-indicator',indicatorType == 'number' && indicatorPos && `d-image-preview-indicator-${indicatorPos}`,indicatorType !== 'number' && 'd-image-preview-indicator-dot']" :style="indicatorStyle">
        <div v-if="indicatorType === 'number'">{{`${realIndex}/${imgs.length}`}}</div>
        <ul v-else class="d-image-preview-indicator-dot-wrap">
          <li :class="['d-image-preview-indicator-dot-item',index +1 === realIndex && 'd-image-preview-indicator-dot-item-active']" v-for="(item,index) in imgs" :key="index"></li>
        </ul>
      </div>
      <div class="d-image-preview-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </transition>

</template>

<script>
import draggable from '../../../src/utils/slide.js'
import translateUtil from '../../../src/utils/translate.js'
import {deepCopy} from '../../../src/utils/utils'

export default {
  name: 'd-imagePreview',
  props: {
    visible: Boolean,
    loop: Boolean,
    imgs: {
      type: Array,
      default: []
    },
    errorImg: String,
    initialIndex: {
      type: Number,
      default: 0
    },
    showIndicator: {
      type: Boolean,
      default: true
    },
    indicatorPos: {
      type: String,
      default: 'top',
      validator(val){
        return ['top','bottom'].indexOf(val) > -1
      }
    },
    indicatorType:{
      type: String,
      default: 'number',
      validator(val){
        return ['number','dot'].indexOf(val) > -1
      }
    },
    indicatorStyle: Object,
    maskStyle:Object,
    onShow: {
      type: Function,
      default: () => {}
    },
    onHide: {
      type: Function,
      default: () => {}
    },
    onChange: {
      type: Function,
      default: () => {}
    },
  },
  data(){
    return {
      data:[],
      show: false,
      activeIndex: 0,
      pageWidth: document.documentElement.clientWidth,
      dragState: {
        start:0,
        startX: 0,
        startY: 0,
        endPos:0,
        dragDistance:0,
        initialTranslateLeft: 0
      },
    }
  },
  mounted(){
    this.activeIndex = this.initialIndex
    this.data = deepCopy(this.imgs)
    this.loop && this.data.length && this.getLoopData()
  },
  watch:{
    visible(val) {
      this.show = val
      val && this.onShow()
      this.$nextTick(()=>{
        if(val){
          this.locateItem(this.loop ?-(this.initialIndex+1) :  -this.initialIndex)
          this.bindSlide()
        }
      })
    },
    activeIndex(to,from){
      to !== from && this.onChange()
      this.loop && this.resetLoopPos(to)
    },
    imgs(val){
      this.data = val
    }
  },
  computed: {
    realIndex(){
      if(this.loop){
        let realIndex
        if(this.activeIndex == 0){
          realIndex = this.imgs.length
        } else if(this.activeIndex > this.imgs.length) {
          realIndex = 1
        } else {
          realIndex = this.activeIndex
        }
        return realIndex
      }
      return this.activeIndex + 1
    }
  },
  methods: {
    hide(){
      this.show = false
      this.onHide()
      this.$emit('input',false)
    },
    getLoopData(){
      this.data.unshift(deepCopy(this.imgs[this.imgs.length -1]))
      this.data.push(deepCopy(this.imgs[0]))
    },
    resetLoopPos(index) {
      if(index === 0) {
        setTimeout(() => {
          this.$refs.dragContent.style.transition ='none'
          this.locateItem(-(this.data.length - 2))
        }, 300);
      } else if(index === this.data.length -1){
        setTimeout(() => {
          this.$refs.dragContent.style.transition ='none'
          this.locateItem(-1)
        }, 300);
      }
    },
    bindSlide(){
      let el = this.$refs.dragContent
      draggable(el,{
        start: (e) =>{
          this.$refs.dragContent.style.transition ='transform ease-out .3s'
          this.dragState.start = new Date()
          this.dragState.startX = e.pageX
          this.dragState.startY = e.pageY
          this.dragState.initialTranslateLeft = this.pageWidth * -this.activeIndex
        },
        drag: (e) => {
          this.dragState.dragDistance = e.pageX - this.dragState.startX
          this.dragState.endPos = this.dragState.dragDistance + this.dragState.initialTranslateLeft
          translateUtil.translateElement(el, this.dragState.endPos,null)
        },
        end: (e) => {
          if(this.dragState.startX === e.pageX  && this.dragState.startY === e.pageY) {
            this.hide()
          }
          if(!this.dragState.endPos) {
            this.dragState = {}
            return
          }
          let index = Math.round(this.dragState.endPos/this.pageWidth)
          this.dragState = {}
          this.locateItem(index)
        }
      })
    },
    locateItem(index){
      index = Math.max(0,Math.min(this.data.length - 1,-index))
      let el = this.$refs.dragContent
      let translate = -this.pageWidth * index
      translateUtil.translateElement(el, translate, null)
      this.activeIndex = index
    }
  },
}
</script>

<style lang="less" scoped>
@import '../../../src/style/default.less';
@import '../../../src/style/reset.less';
@import '../../../src/style/var.less';
.d-image-preview{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  &-mask{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    height: 100%;
    z-index: @modal-zindex;
    background-color: @color-text-base;
  }
  &-indicator{
    font-size: 18* @unit;
    color: @color-text-base-inverse;
    position: absolute;
    z-index: @modal-zindex+2;
    width: 100vw;
    text-align: center;
    &-top{
      top: 30* @unit;
    }
    &-bottom{
      bottom: 30* @unit;
    }
    &-dot {
      bottom: 30* @unit;
      &-wrap{
        display: flex;
        justify-content: center;
      }
      &-item{
        width: 8*@unit;
        height: 8*@unit;
        background: rgba(255,255,255,0.4);
        border-radius: 50%;
        margin: 0 3*@unit;
        &-active{
          background: #fff;
        }
      }
    }
  }

  &-content{
    position: absolute;
    height: 100vh;
    z-index: @modal-zindex+1;
    -webkit-overflow-scrolling: touch;
    outline: 0;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    transition: transform ease-out .3s;
    transform: translate3d(0px, 0px, 0px);
  }
  &-item{
    img{
      max-width: 100vw;
      min-width: 100vw;
      max-height: 100vh;
    }
  }
}
.d-fade-enter-active {
  animation: fade .2s;
}
.d-fade-leave-active {
  animation: fade .2s reverse;
}
</style>


