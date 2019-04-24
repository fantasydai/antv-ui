<template>
  <pickerView :data="dateData" :value="activeValue" :cols="cols" :onChange="dateChange" :linkage="false" :format="dateFormatList"></pickerView>
</template>
<script>
import dayjs from 'dayjs'
import pickerView from '../../pickerView/index'
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
    value: [Date,String],
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
    dateFormat: {
      type: Object,
      default: ()=>{
        return {}
      }
    },
    onChange: {
      type: Function,
      default: ()=>{}
    },
  },
  data(){
    return {
      activeValue:[],
      dateData: [],
      modeList:[],
      dateFormatList:[],
      startYear: '',
      endYear: '',
      startMonth: 1,
      endMonth: 12,
      startDay: 1,
      endDay: 31,
      startHour: 0,
      endHour: 23,
      startMinute: 0,
      endMinute: 59,
      cols:3
    }
  },
  components:{
    pickerView
  },
  watch:{
    value(value){
      this.getActiveValue(value)
    },
    activeValue(val){
    }
  },
  created() {
    this.formatProps()
    this.getDate()
    this.getActiveValue(this.value)
  },
  methods:{
    getActiveValue(value){
      let activeValue = []
      if(!value){
        let result = []
        this.dateData.forEach(date=>{
          result.push(date[0] || '')
        })
        let date = this.mode === 'time' ? result.join(':') : this.mode === 'date' ? dayjs(result.join('/')).toDate() : dayjs(result.slice(0,3).join('/')+' '+result.slice(3).join(':')).toDate()
        this.$nextTick(()=>{
          this.onChange(date,result)
        })
        return
      }
      if(this.mode === 'time'){
        if(typeof this.value !== 'string'){
          console.error('mode等于"time"时value值须为String类型')
          return
        }
        activeValue = this.value.split(':')
      } else {
        this.modeList.forEach((mode,index)=>{
          let value = dayjs(this.value.getTime())[mode === 'Day'?'date' : mode.toLowerCase()]()
          mode === 'Month' && value++
          activeValue.push(value < 10 ? '0'+ value : '' + value)
        })
      }
      this.activeValue = activeValue
    },
    formatProps(){
      if(['date','datetime'].indexOf(this.mode) > -1){
        this.startYear = dayjs(this.minDate).year()
        this.endYear = dayjs(this.maxDate).year()
        this.startMonth = Math.max(1,parseInt(this.MonthRange[0]))
        this.endMonth = Math.min(12,parseInt(this.MonthRange[1]))
        this.startDay = Math.max(1,parseInt(this.DayRange[0]))
        this.endDay = Math.min(31,parseInt(this.DayRange[1]),dayjs(this.value || this.maxDate).daysInMonth())
        if(this.mode === 'time') {
          this.startHour = Math.max(0,parseInt(this.HourRange[0]))
          this.endHour = Math.min(23,parseInt(this.HourRange[1]))
          this.startMinute = Math.max(0,parseInt(this.MinuteRange[0]))
          this.endHour = Math.min(59,parseInt(this.MinuteRange[1]))
        }
      } else {
        this.startHour = Math.max(0,parseInt(this.HourRange[0]))
        this.endHour = Math.min(23,parseInt(this.HourRange[1]))
        this.startMinute = Math.max(0,parseInt(this.MinuteRange[0]))
        this.endMinute = Math.min(59,parseInt(this.MinuteRange[1]))
      }
      switch (this.mode) {
        case 'date':
          this.cols = 3
          this.modeList = ['Year','Month','Day']
          break
        case 'time':
          this.cols = 2
          this.modeList = ['Hour','Minute']
          break
        case 'datetime':
          this.cols = 5
          this.modeList = ['Year','Month','Day','Hour','Minute']
          break
        default:
          break
      }
      this.modeList.forEach(mode=>{
        this.dateFormat[mode.toLowerCase()] && this.dateFormatList.push(this.dateFormat[mode.toLowerCase()])
      })

    },
    getDate(){
      this.dateData = []
      let newData = []
      this.modeList.forEach(item=>{
        let newItemDates = []
        for (let index = this[`start${item}`]; index <= this[`end${item}`]; index++) {
          newItemDates.push(index < 10 ? '0'+ index : '' + index)
        }
        this.dateData = this.dateData.concat([newItemDates])
      })
    },
    dateChange(newValue,index){
      if(['date','datetime'].indexOf(this.mode) > -1 && index <=2) {
        this.endDay = Math.min(31,dayjs(`${newValue[0]}-${newValue[1]}`).daysInMonth())
      }
      this.getDate()
      this.activeValue = newValue
      let date = this.mode === 'time' ? newValue.join(':') : this.mode === 'date' ? dayjs(newValue.join('/')).toDate() : dayjs(newValue.slice(0,3).join('/')+' '+newValue.slice(3).join(':')).toDate()
      this.$nextTick(()=>{
        this.onChange(date,newValue)
      })
    }
  }
}
</script>

