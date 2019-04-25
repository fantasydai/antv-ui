<template>
  <a :class="['d-button',`d-button-${type}`,`d-button-${size}`,disabled && 'd-button-disabled',circle && 'd-button-circle',inline && 'd-button-inline',loading&&'d-button-loading']" @click="handleClick">
    <span v-if="loading"  class="loading-icon">
      <i class="d-icon-loading"></i>
    </span>

    <i v-if="icon" class="icon" :class="'d-icon-' + icon"></i>
    <label class="d-button-txt"><slot></slot></label>

  </a>
</template>
<script>
/**
 * @name d-button
 * @desc 按钮
 * @param type {string} - 按钮类型，default, primary, ghost,warning
 * @param {boolean} disabled - 禁用
 * @param {string} size - 尺寸，small, large
 * @param {boolean} inline - 行内按钮
 * @param {boolean} loading - 自定义样式
 * @param {Object} style - 自定义样式
 * @param {slot} - 显示文本
 *
 */

export default {
  name:'d-button',
  props:{
    type: {
      type:String,
      default:'default',
      validator(value) {
        return [
          'default',
          'primary',
          'ghost',
          'warning'
        ].indexOf(value) > -1
      }
    },
    size: {
      type:String,
      default:'large',
      validator(value){
        return [
          'normal',
          'small',
          'large'
        ].indexOf(value) > -1
      }
    },
    icon: {
      type:String,
      default:'',
    },
    disabled: {
      type:Boolean,
      default: false,
    },
    hollow: {
      type:Boolean,
      default: false,
    },
    circle: {
      type:Boolean,
      default: false,
    },
    inline: {
      type:Boolean,
      default: false,
    },
    loading: {
      type:Boolean,
      default: false,
    }
  },
  methods: {
    handleClick(event){
      this.$emit('click',event)
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../../src/style/default.less';
  @import '../../../src/style/var.less';
  .d-button{
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    font-size: @button-font-size;
    height: @button-height;
    line-height: @button-height;
    outline: none;
    text-align: center;
    -webkit-appearance: none;
    box-sizing: border-box;
    // border: 1px solid @fill-tap;
    padding: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    white-space: nowrap;
    color: @color-text-base;
    background-color: @fill-base;
    border-radius: 5*@unit;
    &:before{
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 200%;
      height: 200%;
      border: 1px solid @fill-tap;
      border-radius: 10px;
      transform-origin: 0 0;
      transform: scale(.5);
      box-sizing: border-box;
      pointer-events: none;
    }
    &:not(.d-button-disabled):active{
      background-color: @fill-tap
    }
    &&-disabled {
      color: fade(@color-text-base, 30%);
      opacity: 0.6;
    }
    &&-primary {
      color: @color-text-base-inverse;
      background-color: @primary-button-fill;
    }
    &&-primary~&&-disabled {
      color: fade(@color-text-base-inverse, 60%);
      opacity: 0.4;
    }
    &&-primary:not(.d-button-disabled):active {
      color: fade(@color-text-base-inverse, 30%);
      background-color: @primary-button-fill-tap;
    }
    &&-warning {
      color: @color-text-base-inverse;
      background-color: @warning-button-fill;
    }
    &&-warning:not(.d-button-disabled):active{
      color: fade(@color-text-base-inverse, 30%);
      background-color: @warning-button-fill-tap;
    }
    &&-ghost {
      color: @ghost-button-color;
      background-color: transparent;
      border: 1px solid @ghost-button-color;
    }
    &&-ghost:not(.d-button-disabled):active {
      color: fade(@ghost-button-color, 60%);
      background-color: transparent;
      border-color: @ghost-button-fill-tap;
    }
    &&-ghost~&&-disabled {
      color: fade(@color-text-base, 10%);
      opacity: 1; // override default opacity: 0.6
      border: none;
    }
    .loading-icon{
      display: block;
      margin-right: 6*@unit;
      animation: loading-rotate 1.2s linear infinite;
    }
    .icon{
      margin-right: 6*@unit;
    }
    &&-inline {
      display: inline-block;
      padding: 0 15*@unit;
      .loading-icon,.icon{
        margin: 0;
      }
    }
    &-small {
      font-size: @button-font-size-sm;
      height: @button-height-sm;
      line-height: @button-height-sm;
      padding: 15*@unit;
    }
  }
</style>


