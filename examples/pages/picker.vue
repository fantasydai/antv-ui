<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-04-24 17:53:04
 * @LastEditTime: 2019-09-10 19:31:19
 * @LastEditors: Please set LastEditors
 -->
<template>
  <section class="wrap">
    <section class="btn-wrap">
      <d-button class="btn" @click="handleClick1">show single Picker</d-button>
      <d-button class="btn" @click="handleClick2">show multiple Picker</d-button>
      <d-button class="btn" @click="handleClick3">linkage Picker</d-button>
      <d-button class="btn" @click="handleClick4">Promise Picker</d-button>
    </section>
    <d-picker :visible="visible" v-model="visible" :data="data" :values="value" :title="title" :onChange="dataChange" :onConfirm="onConfirm"></d-picker>
    <d-picker :visible="visible1" :format="format" v-model="visible1" :data="data1" :values="value" :title="title" :onChange="dataChange" :onConfirm="onConfirm"></d-picker>
    <d-picker :visible="visible2" v-model="visible2" :cols="3" :data="data2" :values="value2" :title="title" :onChange="dataChange" :onConfirm="onConfirm"></d-picker>
    <d-picker :visible="visible3" v-model="visible3" :cols="3" :data="data2" :values="value2" :title="title" :onChange="dataChange" :onConfirm="onConfirmPromise"></d-picker>

  </section>
</template>

<script>
export default {
  name:'picker',
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
      title:'',
      format:['${value}年']
    }
  },
  methods: {
    handleClick1(){
      this.title = ' single data picker'
      this.visible = true
    },
    handleClick2(){
      this.title = ' multiple data picker'
      this.visible1 = true
    },
    handleClick3(){
      this.title = ' linkage data picker'
      this.visible2 = true
    },
    handleClick4(){
      this.title = ' promise picker'
      this.visible3 = true
    },
    onConfirm(){
    },
    onConfirmPromise(value,items){
      let labels = items.map(item=>{return item.label})
      return new Promise((resolve)=>{
        this.$Toast(`当前选择: ${labels.join('-')}`)
        setTimeout(resolve, 2000);
      })
    },
    dataChange(){
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



