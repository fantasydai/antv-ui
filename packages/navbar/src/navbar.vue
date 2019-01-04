<template>
  <div class="d-navbar">
    <div class="d-navbar-left">
      <div class="d-navbar-left-item" v-for="(item,index) in leftContent" :key="index" :style="item.style" @click="handleClick(item.callback)">
        <i v-if="item.icon" class="d-navbar-left-item-icon" :class="'d-icon-' + item.icon"></i>
        <span v-if="item.text">{{item.text}}</span>
      </div>
    </div>
    <div class="d-navbar-title">
      <span v-if="title"></span>
      <slot v-else></slot>
    </div>
    <div class="d-navbar-right">
      <div class="d-navbar-right-item" v-for="(item,index) in rightContent" :key="index" :style="item.style" @click="handleClick(item.callback)">
        <span v-if="item.text">{{item.text}}</span>
        <i v-if="item.icon" class="d-navbar-right-item-icon" :class="'d-icon-' + item.icon"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'d-navbar',
  props:{
    leftContent:{
      type: Array,
      default:()=>{
        return [
        ]
      }
    },
    rightContent:{
      type: Array,
      default:()=>{
        return []
      }
    },
    title:String,
  },
  methods:{
    handleClick(callback){
      callback instanceof Function && callback()
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../src/style/default.less';
.d-navbar{
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 45*@unit;
  background: @color-primary;
  color: @color-text-base-inverse;

  &-left{
    flex:1;
    display: flex;
    align-items: center;
    height: 100%;
    padding-left: @w-spacing-lg;
    font-size: @font-size-caption;
    &-item{
      margin-right: @w-spacing-sm;
    }
  }
  &-title{
    flex:2;
    text-align:center;
    font-size: 18*@unit;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &-right{
    flex:1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    margin-right: @w-spacing-lg;
    font-size: @font-size-caption;
    &-item{
      margin-right: @w-spacing-sm;
    }
  }
}
</style>


