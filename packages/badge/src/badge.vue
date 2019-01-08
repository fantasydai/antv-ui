<template>
  <span class="d-badge">
    <slot></slot>
    <sup :class="[dot && 'd-badge-dot',dot && size === 'large' &&'d-badge-dot-large',!dot && !turning && 'd-badge-text',turning && 'd-badge-coner',turning && size === 'large' && 'd-badge-coner-large']"> {{formatText}} </sup>
  </span>
</template>
<script>
export default {
  name:'d-badge',
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
.d-badge{
  position: relative;
  display: inline-block;
  line-height: 1;
  vertical-align: middle;
  &-dot{
    position: absolute;
    z-index: 10;
    right: -4* @unit;
    top: -4* @unit;
    height: 8*@unit;
    width: 8*@unit;
    border-radius: 100%;
    background: @color-badge;
  }
  &-dot-large{
    right: -8* @unit;
    top: -8* @unit;
    height: 16*@unit;
    width: 16*@unit;
  }
  &-text{
    top: auto;
    display: block;
    position: relative;
    height: @icon-size-xs;
    line-height: @icon-size-xs;
    min-width: @icon-size-xs / 2;
    border-radius: 2 * @w-spacing-sm;
    padding: 0 @h-spacing-sm;
    text-align: center;
    font-size: @font-size-caption-sm;
    color: @color-text-base-inverse;
    background-color: @color-badge;
    white-space: nowrap;
    z-index: 10;
  }
}
</style>


