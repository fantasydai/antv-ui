<template>
  <pickerView :data="dateData" :value="linkageValue" :cols="3" :onChange="dateChange"></pickerView>
</template>
<script>
import pickerView from '../../pcikerView/index'
export default {
  name: 'd-datePickerView',
  props:{
    mode: {
      type: String,
      default: 'date',
      validator(val){
        return ['date','time','datetime']
      }
    },
    value: Date,
    YearRange: {
      type: Array,
      default:  ()=>{
        return []
      }
    },
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
    SecondRange: {
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
    dataFormat: {
      type: Array,
      default: ()=>{
        return []
      }
    }
  },
  data(){
    return {
      dateData: [],
      startYear: '',
      endYear: '',
      startMonth: 1,
      endMonth: 12,
      startDay: 1,
      endDay: 31,
      cols:3 
    }
  },
  components:[
    pickerView
  ],
  methods:{
    dateChange(){

    }
  }
}
</script>

