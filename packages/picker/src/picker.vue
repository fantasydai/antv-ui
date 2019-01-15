<template>
  <drawer :visible="show" :mask="mask" :position="position" :maskClosable="maskClosable" v-model="show">
    <div class="d-picker-popup" slot="side">
      <div class="d-picker-popup-header">
        <div class="d-picker-popup-header-item d-picker-popup-cancel" @click="cancel">{{cancelText}}</div>
        <div class="d-picker-popup-header-item d-picker-popup-title">{{title}}</div>
        <div class="d-picker-popup-header-item d-picker-popup-confirm" @click="confirm">{{confirmText}}</div>
      </div>
      <div class="d-picker-popup-content">
       <d-pickerView :data="data" :value="activeValues" :format="format" :onChange="dataChange" :cols="cols"></d-pickerView>
      </div>
    </div>
  </drawer>
</template>
<script>
import drawer from '../../drawer/index'
import pickerView from '../../pickerView/index'
export default {
  name: 'd-picker',
  props: {
    visible: Boolean,
    cols:Number,
    title:String,
    mask:{
      type: Boolean,
      default: true
    },
    maskClosable:{
      type: Boolean,
      default: true
    },
    data:{
      type: Array,
      default:()=>{
        return []
      }
    },
    values: {
      type: Array,
      default: ()=>{
        return []
      }
    },
    format: {
      type: Array,
      default: ()=>{
        return []
      }
    },
    itemStyle: {
      type: [Object,Array],
      default: ()=>{
        return {}
      }
    },
    indicatorStyle: {
      type: Object,
      default: ()=>{
        return {}
      }
    },
    linkage: {
      type: Boolean,
      default: true
    },
    onChange: {
      type: Function,
      default: ()=>{}
    },
    cancelText:{
      type: String,
      default: '取消'
    },
    confirmText:{
      type: String,
      default: '确定'
    },
    onCancel: {
      type: Function,
      default: ()=>{}
    },
    onConfirm: {
      type: Function,
      default: ()=>{}
    },
  },
  data(){
    return {
      position: 'bottom',
      show: this.visible,
      activeValues: this.values,
      selectValue:this.values,
      selectItems:null
    }
  },
  watch:{
    visible(val){
      this.show = val
    },
    show(val){
      !val && this.$emit('input',this.show)
    },
    data(to,from){
      this.activeValues = Object.assign([],this.values)
    }
  },
  components: {
    drawer,
    pickerView,
  },
  methods: {
    cancel() {
      this.activeValues = Object.assign([],this.activeValues)
      this.onCancel()
      this.show = false
      this.$emit('input',this.show)
    },
    confirm() {
      this.activeValues = this.selectValue
      const res = this.onConfirm(this.activeValues,this.selectItems)
      if(res && res.then){
        res.then(()=>{
          this.show = false
          this.$emit('input',this.show)
        })

      } else {
        this.show = false
        this.$emit('input',this.show)
      }
    },
    dataChange(val,index,items){
      this.selectValue = val
      this.selectItems = items
      this.onChange && this.onChange(val,items)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../src/style/default.less';
@import '../../../src/style/var.less';
.d-picker-popup{
  background: @fill-base;
  &-header{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .borderLine('bottom',@fill-tap,0,0,0,0);
    &-item{
      height: 428@unit;
      box-sizing: border-box;
      color: @color-primary;
      font-size: 17*@unit;
      padding: 9*@unit 15*@unit;
    }
    .d-picker-popup-title{
      flex: 1;
      text-align: center;
      color: @color-text-base;

    }
  }
  &-content{
    background: @fill-body;
  }
}
</style>


