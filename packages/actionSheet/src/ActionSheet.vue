<template>
  <transition name="actionSheet-slide">
    <div class="d-actionsheet" v-if="visible">
      <div :class="['d-actionsheet-mask',transparent&&'d-actionsheet-transparent']"></div>
      <div class="d-actionsheet-content">
        <div class="d-actionsheet-title" v-if="title">{{title}}</div>
        <div class="d-actionsheet-message" v-if="title">{{message}}</div>
        <div class="d-actionsheet-btns">
          <div v-for="(btnTxt,index) in options" :key="index" :class="['d-actionsheet-btn',index === cancelIndex &&'d-actionsheet-cancel-btn',index === destructiveIndex &&'d-actionsheet-destruct-btn']" role="button">{{btnTxt}} <span v-if="index === cancelIndex" class="d-actionsheet-cancel-btn-mask"></span> </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props:{
    visible: Boolean,
    transparent: Boolean,
    maskClosable: Boolean,
    cancelIndex: Number,
    destructiveIndex: Number,
    title: String,
    message :String,
    options:{
      type:Array,
      default:()=> {
        return []
      }
    },
    callback:Function
  }
}
</script>

<style lang="less" scoped>
@import '../../../src/style/default.less';
@import '../../../src/style/reset.less';
@import '../../../src/style/var.less';
.d-actionsheet{
  &-mask{
    position: fixed;
    z-index: @action-sheet-zindex;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: @fill-mask;
    height: 100%;
  }
  &-content{
    position: fixed;
    z-index: @action-sheet-zindex;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: @fill-base;
  }
  &-title,&-message{
    margin: @w-spacing-lg auto;
    padding: 0 @w-spacing-lg;
    text-align: center;
  }
  &-title{
    font-size: @font-size-heading;
  }
  &-message {
    color: @color-text-caption;
    font-size: @font-size-base;
  }
  &-btns{
    text-align: center;
    color: @color-text-base;
  }
  &-btn{
    font-size: @actionsheet-btn-font-size;
    padding: 0 8 * @unit;
    margin: 0;
    position: relative;
    height: @actionsheet-btn-height;
    line-height: @actionsheet-btn-height;
    box-sizing: border-box;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow-x: hidden;
    .borderLine('top',@fill-tap,0,0,0,0);
    &&-active {
      background-color: @fill-tap;
    }
  }
  &-destruct-btn{
    color: @color-error;
  }
  &-cancel-btn{
    padding-top: 6*@unit;
    position: relative;
  }
  &-cancel-btn-mask{
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6*@unit;
    background: #e7e7e7;
    .borderLine('top',@fill-tap,0,0,0,0);
    .borderLine('bottom',@fill-tap,0,0,0,0);
  }
}
.actionSheet-slide-enter-active, .actionSheet-slide-leave-active {
    transform: translateY(0);
    transition: transform 0.5s ease;
  }
.actionSheet-slide-enter,.actionSheet-slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transition: transform .5s ease;
  transform: translateY(100%);
}
</style>


