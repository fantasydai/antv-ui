<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-04-24 17:52:59
 * @LastEditTime: 2019-04-24 17:52:59
 * @LastEditors: your name
 -->
<template>
  <label :class="['d-switch',types==='rectangle'&&'d-switch-rec']">
    <input type="checkbox" name="" :disabled="disabled" @change="checkedChange" class="d-switch-checkbox" :value="checked?'on':'off'" v-model="currentValue">
    <div class="d-switch-checkbox-rep" :style="{background:checked?color:''}"></div>
    <div v-if="disabled" @click="handleClick" class="d-switch-checkbox-rep-disabled"></div>
  </label>
</template>
<script>
export default {
  name:'d-switch',
  props: {
    checked: Boolean,
    disabled: Boolean,
    color: String,
    name: String,
    types:{
      type: String,
      default: '',
      validator (value){
        return ['','rectangle'].indexOf(value)>-1
      }
    },
    onChange: {
      type: Function,
      default: ()=>{}
    },
    onClick: {
      type: Function,
      default: ()=>{}
    },

  },
  data(){
    return {
      currentValue:this.checked
    }
  },
  watch: {
    checked(val){
      this.currentValue = val
    },
    currentValue(value){
      this.$emit('input',value)
    }
  },
  methods: {
    checkedChange(event){
      if(this.onChange){
         this.onChange(event)
      }
    },
    handleClick(event){
      if(this.disabled && this.onClick){
        this.onClick(event)
      }
    }
  }
}
</script>
<style lang="less" scoped>
  @import '../../../src/style/default.less';
  .d-switch{
    display: inline-block;
    vertical-align: middle;
    box-sizing: border-box;
    position: relative;
    cursor: pointer;
    align-self: center;

    &-checkbox-rep{
      width: 51 * @unit;
      height: 31 * @unit;
      border-radius: 31 * @unit;
      box-sizing: border-box;
      background: #e5e5e5;
      z-index: 0;
      margin: 0;
      padding: 0;
      appearance: none;
      border: 0;
      cursor: pointer;
      position: relative;
      transition: all 300ms;

      &:before{
        content: ' ';
        position: absolute;
        left: 1.5 * @unit;
        top: 1.5 * @unit;
        width: 48 * @unit;
        height: 28 * @unit;
        border-radius: 28 * @unit;
        box-sizing: border-box;
        background: @fill-base;
        z-index: 1;
        transition: all 200ms;
        transform: scale(1);
      }
      &:after {
        content: ' ';
        height: 28 * @unit;
        width: 28 * @unit;
        border-radius: 28 * @unit;
        background: @fill-base;
        position: absolute;
        z-index: 2;
        left: 1.5 * @unit;
        top: 1.5 * @unit;
        transform: translateX(0);
        transition: all 200ms;
        box-shadow: 2 * @unit 2 * @unit 4 * @unit rgba(0, 0, 0, 0.21);
      }
    }
    &-checkbox-rep-disabled {
      z-index: 3;
      width: 51 * @unit;
      height: 31 * @unit;
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 0;
      border: 0 none;
      appearance: none;
      border-radius: 31 * @unit;
      opacity: 0;
    }
    input[type="checkbox"] {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      border: 0 none;
      appearance: none;
      &:checked {
        & + .d-switch-checkbox-rep {
          background: @switch-fill;

          &:before {
            transform: scale(0);
          }

          &:after {
            transform: translateX(20 * @unit);
          }
        }
      }

      &:disabled {
        & + .d-switch-checkbox-rep {
          opacity: @opacity-disabled;
        }
      }
    }
  }
  .d-switch-rec{
    .d-switch-checkbox-rep{
      width: 72 * @unit;
      height: 23 * @unit;
      border-radius: @radius-sm;
      background: #a7aaa6;

      &:before {
        display: none;
      }

      &:after {
        width: 35 * @unit;
        height: 21 * @unit;
        border-radius: @radius-xs;
        box-shadow: none;
        left: 1PX;
        top: 1PX;
      }
    }
    input[type="checkbox"] {
      &:checked {
        & + .d-switch-checkbox-rep {
          background: @switch-fill-android;

          &:before {
            transform: scale(0);
          }

          &:after {
            transform: translateX(35 * @unit);
          }
        }
      }
    }
  }
</style>


