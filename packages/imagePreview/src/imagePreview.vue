<template>
  <div class="d-image-preview">
    <div class="d-image-preview-header">
      <slot name="header"></slot>
    </div>
    <div class="d-image-preview-mask" :style="maskStyle"></div>
    <div class="d-image-preview-content">
      <div class="d-image-preview-item" v-for="(img ,index) in imgs" :key="index">
        <img :src="img.url" :onerror="`this.src=${errorImg}`" :style="{width:img.width,height: img.height}" :alt="`img-item-${index}`">
      </div>
    </div>
    <div :class="['d-image-preview-indicator',indicatorPos && `d-image-preview-indicator-${indicatorPos}`]" :style="indicatorStyle">{{`${activeIndex}/${imgs.length}`}}</div>
  </div>
</template>

<script>
export default {
  name: 'd-imagePreview',
  props: {
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
        ['top','bottom']
      }
    },
    indicatorStyle: Object,
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
      activeIndex: 0
    }
  }
}
</script>

