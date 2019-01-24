<template>
  <div class="d-image-preview" v-if="visible">
    <div class="d-image-preview-header">
      <slot name="header"></slot>
    </div>
    <div class="d-image-preview-mask" :style="maskStyle"></div>
    <div class="d-image-preview-content" ref="dragContent">
      <div class="d-image-preview-item" v-for="(img ,index) in imgs" :key="index">
        <img :src="img.url" :onerror="`this.src=${errorImg}`" :style="{width:img.width,height: img.height}" :alt="`img-item-${index}`">
      </div>
    </div>
    <div :class="['d-image-preview-indicator',indicatorPos && `d-image-preview-indicator-${indicatorPos}`]" :style="indicatorStyle">
      <div v-if="indicatorType === 'number'">{{`${activeIndex+1}/${imgs.length}`}}</div>
      <ul v-else class="d-image-preview-indicator-dot">
        <li class="d-image-preview-indicator-dot-item" v-for="(item,index) in imgs" :key="index"></li>
      </ul>
    </div>
  </div>
</template>

<script>
import draggable from '../../../src/utils/slide.js'
import translateUtil from '../../../src/utils/translate.js'

export default {
  name: 'd-imagePreview',
  props: {
    visible: Boolean,
    imgs: {
      type: Array,
      default: []
    },
    errorImg: String,
    initialIndex: {
      type: Number,
      default: 0
    },
    showClose: {
      type: Boolean,
      default: true
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
      default: 'dot',
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
      activeIndex: 0,
      pageWidth: document.documentElement.clientWidth,
      dragState: {
        start:0,
        startPos: 0,
        endPos:0,
        dragDistance:0,
        initialTranslateLeft: 0
      },
    }
  },
  mounted(){
    // this.bindSlide()
  },
  watch:{
    visible(val) {
      this.$nextTick(()=>{
        val && this.bindSlide()
      })

    }
  },
  methods: {
    bindSlide(){
      let el = this.$refs.dragContent
      draggable(el,{
        start: (e) =>{
          this.dragState.start = new Date()
          this.dragState.startPos = e.pageX
          this.dragState.initialTranslateLeft = this.pageWidth * -this.activeIndex
        },
        drag: (e) => {
          this.dragState.dragDistance = e.pageX - this.dragState.startPos
          this.dragState.endPos = this.dragState.dragDistance + this.dragState.initialTranslateLeft
          translateUtil.translateElement(el, this.dragState.endPos,null)
        },
        end: (e) => {
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
      index = Math.max(0,Math.min(this.imgs.length - 1,-index))
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
    font-size: 16* @unit;
    color: @color-text-base-inverse;
    position: absolute;
    z-index: @modal-zindex+2;
    width: 100vw;
    text-align: center;
    &-dot {

    }
    &-top{
      top: 40* @unit;
    }
    &-bottom{
      bottom: 40* @unit;
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
      max-height: 100vh;
    }
  }
}
</style>


