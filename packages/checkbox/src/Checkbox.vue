<template>
  <span :class="['d-checkbox',disabled&&'d-checkbox-disabled']">
    <input type="checkbox" class="d-checkbox-input" :disabled="disabled" :value="option.value||option" v-model="checkedValue" @change="checkChange">
    <span class="d-checkbox-inner" :class="[disabled&&'d-checkbox-inner-disabled',align==='right'?'d-checkbox-inner-right':'d-checkbox-inner-left']"></span>
  </span>
</template>
<script>
export default {
  name:'d-checkbox',
  props:{
    disabled: Boolean,
    align:{
      type:String,
      default:'',
      validator(value){
        return ['right',''].indexOf(value) > -1
      }
    },
    currentValue:{
      type: Array,
      default: ()=>{
        return []
      }
    },
    option:{
      type: [Object,String],
      default: ''
    }
  },
  data(){
    return {
      checkedValue: this.currentValue
    }
  },
  watch: {
    currentValue(val) {
      this.checkedValue = val
    },
  },
  methods:{
    checkChange(){
      this.$emit('input', this.checkedValue);
    }
  }

}
</script>
<style lang="less" scoped>
@import '../../../src/style/default.less';
.d-checkbox{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 44 * @unit;
  vertical-align: middle;
  &-input{
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    border: 0 none;
    -webkit-appearance: none;
    box-sizing: border-box;
    padding: 0;
  }
  &-inner{
    position: absolute;
    top: 12*@unit;
    width: 21*@unit;
    height: 21*@unit;
    border: 1*@unit solid @color-icon-base;
    border-radius: 50%;
    transform: rotate(0deg);
    box-sizing: border-box;
  }
  &-inner-left{
   left: 15*@unit;
  }
  &-inner-right{
    right: 15*@unit;
  }
  &-input:checked + .d-checkbox-inner{
    border-color: @color-primary;
    background: @color-primary;
    &:after{
      content: " ";
      position: absolute;
      display: none;
      top: 1.5*@unit;
      right: 6*@unit;
      z-index: 999;
      width: 5*@unit;
      height: 11*@unit;
      border-style: solid;
      border-width: 0 1*@unit 1*@unit 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
      display: block;
      border-color: @fill-base;
    }
  }
  &-input:checked + .d-checkbox-inner-right{
    right: 15*@unit;
  }
  &-input:checked + .d-checkbox-inner-disabled{
    border-color: #888;
    background: none;
    &:after{
      border-color: @color-text-caption;
    }
  }
}
.d-checkbox-disabled{
  opacity: .3;
}
</style>


