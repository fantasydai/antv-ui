<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-04-24 17:53:04
 * @LastEditTime: 2019-09-10 19:30:08
 * @LastEditors: Please set LastEditors
 -->
<template>
  <section class="wrap">
    <section class="btn-wrap">
      <d-button class="btn" @click="handleClick1">datePicker</d-button>
      <d-button class="btn" @click="handleClick2">timePicker</d-button>
      <d-button class="btn" @click="handleClick3">datetimePicker</d-button>
      <d-button class="btn" @click="handleClick4">Promise datePicker</d-button>
    </section>
    <d-datePicker :visible="visible" v-model="visible" :title="title" :format="format" :onChange="dataChange" :onConfirm="onConfirm"></d-datePicker>
    <d-datePicker :visible="visible1" mode="time" :format="format" v-model="visible1" :title="title" :onChange="dataChange" :onConfirm="onConfirm"></d-datePicker>
    <d-datePicker :visible="visible2" mode="datetime" v-model="visible2" :title="title" :onChange="dataChange" :onConfirm="onConfirm"></d-datePicker>
    <d-datePicker :visible="visible3" v-model="visible3" :title="title" :onChange="dataChange" :onConfirm="onConfirmPromise"></d-datePicker>

  </section>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name:'datePicker',
  data(){
    return {
      data: [['春','夏','秋','冬']],
      data1: [[2011,2012,2013,2014,2015,2016,2017,2018,2019],['春','夏','秋','冬']],
      data2:[
        {
          label: '北京',
          value: '01',
          children: [
            {
              label: '东城区',
              value: '01-1',
            },
            {
              label: '西城区',
              value: '01-2',
            },
            {
              label: '崇文区',
              value: '01-3',
            },
            {
              label: '宣武区',
              value: '01-4',
            },
          ],
        },
        {
          label: '浙江',
          value: '02',
          children: [
            {
              label: '杭州',
              value: '02-1',
              children: [
                {
                  label: '西湖区',
                  value: '02-1-1',
                },
                {
                  label: '上城区',
                  value: '02-1-2',
                },
                {
                  label: '江干区',
                  value: '02-1-3',
                },
                {
                  label: '下城区',
                  value: '02-1-4',
                },
              ],
            },
            {
              label: '宁波',
              value: '02-2',
              children: [
                {
                  label: 'xx区',
                  value: '02-2-1',
                },
                {
                  label: 'yy区',
                  value: '02-2-2',
                },
              ],
            },
            {
              label: '温州',
              value: '02-3',
            },
            {
              label: '嘉兴',
              value: '02-4',
            },
            {
              label: '湖州',
              value: '02-5',
            },
            {
              label: '绍兴',
              value: '02-6',
            },
          ],
        },
      ],
      value: ['夏'],
      value2:['02','02-1','02-1-2'],
      visible: false,
      visible1: false,
      visible2: false,
      visible3: false,
      title: '',
      format:{
        year: '${value}年',
        month: '${value}月',
        day: '${value}日',
        hour:'${value}时',
        minite:'${value}分',
      }
    }
  },
  methods: {
    handleClick1(){
      this.title = ' datePicker'
      this.visible = true
    },
    handleClick2(){
      this.title = 'timePicker'
      this.visible1 = true
    },
    handleClick3(){
      this.title = 'datetimePicker'
      this.visible2 = true
    },
    handleClick4(){
      this.title = ' promise datePicker'
      this.visible3 = true
    },
    onConfirm(value){
      this.dataChange(value)
    },
    onConfirmPromise(value){
      let labels = typeof value === Date ? dayjs(value).format("YYYY MM-DD HH:mm:ss") : value
      return new Promise((resolve)=>{
        this.$Toast(`当前选择: ${labels}`)
        setTimeout(resolve, 2000);
      })
    },
    dataChange(){
      //console.log(typeof value === Date ? dayjs(value).format("YYYY MM-DD HH:mm:ss") : value )
    },
  }
}
</script>
<style lang="less" scoped>
  .btn-wrap{
    background-color: #f5f5f9;
    padding: 0 15px 40px;
    .btn{
      margin-top: 20px;
    }
  }
</style>
<style>
  .cancel-btn{
    color: #f4333c !important;
  }
  .confirm-btn{
    color: #6abf47 !important;
  }
</style>



