<template>
  <drawer :visible="show" :mask="mask" :position="position" :maskClosable="maskClosable" v-model="show">
    <div class="d-datePicker-popup" slot="side">
      <div class="d-datePicker-popup-header">
        <div class="d-datePicker-popup-header-item d-datePicker-popup-cancel" @click="cancel">{{cancelText}}</div>
        <div class="d-datePicker-popup-header-item d-datePicker-popup-title">{{title}}</div>
        <div class="d-datePicker-popup-header-item d-datePicker-popup-confirm" @click="confirm">{{confirmText}}</div>
      </div>
      <div class="d-datePicker-popup-content">
       <d-datePickerView
        :mode="mode"
        :MonthRange="MonthRange"
        :DayRange ="DayRange"
        :HourRange="HourRange"
        :MinuteRange="MinuteRange"
        :value="activeValues"
        :dateFormat="format"
        :onChange="dataChange"
        :minDate="minDate"
        :maxDate="maxDate"
        :cols="cols"></d-datePickerView>
      </div>
    </div>
  </drawer>
</template>
<script>
import dayjs from 'dayjs'
import drawer from '../../drawer/index'
import datePickerView from '../../datePickerView/index'
export default {
  name: 'd-datePicker',
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
    mode: {
      type: String,
      default: 'date',
      validator(val){
        return ['date','time','datetime']
      }
    },
    values: Date,
    MonthRange : {
      type: Array,
      default:  ()=>{
        return [1,12]
      }
    },
    DayRange: {
      type: Array,
      default: ()=>{
        return [1,31]
      }
    },
    HourRange: {
      type: Array,
      default: ()=>{
        return [1,24]
      }
    },
    MinuteRange: {
      type: Array,
      default: ()=>{
        return [0,59]
      }
    },
    minDate: {
      type: Date,
      default: ()=>{
        return new Date(new Date().getFullYear() - 10, 0, 1)
      }
    },
    maxDate: {
      type: Date,
      default: ()=>{
        return new Date(new Date().getFullYear() + 10, 0, 1)
      }
    },
    format: {
      type: Object,
      default: ()=>{
        return {}
      }
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
    datePickerView,
  },
  methods: {
    cancel() {
      this.onCancel()
      this.show = false
      this.activeValues = this.mode === 'time'? this.activeValues : dayjs(this.activeValues).clone().toDate()
      this.$emit('input',this.show)
    },
    confirm() {
      this.activeValues = this.mode === 'time'? this.selectValue : dayjs(this.selectValue).toDate()
      const res = this.onConfirm(this.activeValues)
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
    dataChange(date,val){
      this.selectValue = date
      !this.activeValues && (this.activeValues = this.mode === 'time'? date : dayjs(date).toDate())
      this.show && this.onChange && this.onChange(date)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../src/style/default.less';
@import '../../../src/style/var.less';
.d-datePicker-popup{
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
    .d-datePicker-popup-title{
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


