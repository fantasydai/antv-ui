<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-04-24 17:53:04
 * @LastEditTime: 2019-04-24 17:53:04
 * @LastEditors: your name
 -->
<template>
  <div class="wrap">
    <div class="picker-item">
      <d-datePickerView mode="date" :value="value1" :dateFormat="dateFomat" :onChange="dateChange1"></d-datePickerView>
      <div class="result">当前结果:{{result1}}</div>
    </div>
    <div class="picker-item">
      <d-datePickerView mode="time" :onChange="dateChange2"></d-datePickerView>
      <div class="result">当前结果:{{result2}}</div>
    </div>
    <div class="picker-item">
      <d-datePickerView mode="datetime" :dateFormat="dateFomat1" :onChange="dateChange3"></d-datePickerView>
      <div class="result">当前选择:{{result3}}</div>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
export default {
  name:'datePickerView',
  data(){
    return {
      dateFomat:{
        year:'${value}年'
      },
      dateFomat1:{
        year:'${value}年',
        month:'${value}月',
        day:'${value}日',
        hour:'${value}时',
        minite:'${value}分',
      },
      value1: new Date('2018-11-10'),
      result1:'',
      result2:'',
      result3:'',
    }
  },
  mounted(){
    // this.changeSingleValue()
  },
  methods: {
    dateChange1(value){

      this.result1 = dayjs(value).format("YYYY MM-DD HH:mm:ss")
    },
    dateChange2(value){
      this.result2 = value
    },
    dateChange3(value){
      this.result3 = dayjs(value).format("YYYY MM-DD HH:mm:ss")
    },
  },
}
</script>

<style lang="less" scoped>
.picker-item{
  margin-bottom: 20px;
}
.result{
  margin-top: 20px;
  font-size: 16PX;
}
</style>


