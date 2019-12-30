<template>
  <span :class="['antv-badge',turning && 'antv-badge-wrap', !$slots.default && 'antv-badge-not-wrapper']">
    <slot></slot>
    <sup :class="[dot && 'antv-badge-dot',dot && size === 'large' &&'antv-badge-dot-large',!dot && !turning && 'antv-badge-text',turning && 'antv-badge-turning',turning && size === 'large' && 'antv-badge-turning-large']" :style="styles"> {{formatText}} </sup>
  </span>
</template>
<script>
export default {
  name:'antv-badge',
  props: {
    text: [String,Number],
    maxNumber:[String,Number],
    dot: Boolean,
    turning: Boolean,
    size: {
      type: String,
      default: 'normal',
      validator(val){
        return ['normal','large'].indexOf(val) > -1
      }
    },
    styles: {
      type: Object,
      default: ()=>{
        return {}
      }
    }
  },
  computed:{
    formatText: function (){
      if(this.maxNumber && Number(this.maxNumber)){
        return Number(this.text) > Number(this.maxNumber) ? this.maxNumber+'+' : this.text
      } else {
        return this.text
      }
    }
  },
  mounted(){
  }
}
</script>
<style lang="less" scoped>
@import '../../../src/style/default.less';
.antv-badge{
  position: relative;
  display: inline-block;
  line-height: 1;
  vertical-align: middle;
  &-dot{
    position: absolute;
    z-index: 10;
    top: -4* @unit;
    height: 8*@unit;
    width: 8*@unit;
    transform-origin: 0 center;
    transform: translateX(-50%);
    border-radius: 100%;
    background: @color-badge;
  }
  &-dot-large{
    right: -8* @unit;
    top: -8* @unit;
    height: 16*@unit;
    width: 16*@unit;
  }
  &-turning{
    width: 5 * @link-button-font-size;
    padding: 2* @unit 8*@unit;
    position: absolute;
    right: -2 * @link-button-font-size;
    top: 0.5 * @link-button-font-size;
    background-color: @color-badge;
    color: @color-text-base-inverse;
    white-space: nowrap;
    transform: rotate(45deg);
    text-align: center;
    font-size: @font-size-subhead;

  }
  &-text{
    top: auto;
    display: block;
    position: absolute;
    top: -6*@unit;
    height: @icon-size-xs;
    line-height: @icon-size-xs;
    min-width: @icon-size-xs / 2;
    border-radius: 2 * @w-spacing-sm;
    padding: 0 @h-spacing-sm;
    text-align: center;
    font-size: @font-size-caption-sm;
    color: @color-text-base-inverse;
    background-color: @color-badge;
    transform: translateX(-45%);
    white-space: nowrap;
    z-index: 10;
  }
  &-not-wrapper{
    .antv-badge-dot{

    }
    .antv-badge-text{
      top: auto;
      display: block;
      position: relative;
      transform: translateX(0);
    }
  }
}
.antv-badge-wrap{
  overflow: hidden;
}
</style>


