<template>
  <div class="wrap">
    <div class="picker-item">
      <d-pickerView :data="singleData" :value="sigleValue" :onChange="sigleDataChange" :indicatorStyle="{height:'40px'}"></d-pickerView>
      <div class="result">当前结果:{{sigleValue[0]}}</div>
    </div>
    <div class="picker-item">
      <d-pickerView :data="singleData1" :value="sigleValue1" :onChange="sigleDataChange1"></d-pickerView>
      <div class="result">当前结果:{{sigleValue1[0]}}</div>
    </div>
    <div class="picker-item">
      <d-pickerView :data="doubleData" :linkage="false" :value="doubleValue" :onChange="doubleDataChange"></d-pickerView>
      <div class="result">当前选择:{{doubleValue[0]}}-{{doubleValue[1]}}</div>
    </div>
    <div class="picker-item">
      <d-pickerView :data="province" :value="linkageValue" :cols="3" :onChange="linkageChange"></d-pickerView>
       <div class="result">当前选择:{{linkageSelect[0] && linkageSelect[0].label}}{{linkageSelect[1] && '-'+linkageSelect[1].label}}{{linkageSelect[2] && '-'+linkageSelect[2].label}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name:'pickerView',
  data(){
    return {
      singleData:['春','夏','秋','冬'],
      sigleValue: ['秋'],
      singleData1:[1,2,3,4,5,6],
      sigleValue1: [1],
      doubleData:[[2011,2012,2013,2014,2015,2016,2017,2018,2019],['春','夏','秋','冬']],
      doubleValue:[2018,'秋'],
      province: [
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
      linkageValue:['02','02-1','02-1-2'],
      linkageSelect:[{label: '浙江',value: '02',},{label: '杭州',value: '02-1'},{label: '上城区',value: '02-1-2'}]
    }
  },
  mounted(){
    this.changeSingleValue()
  },
  methods: {
    sigleDataChange(value){
      this.sigleValue = value
    },
    sigleDataChange1(value){
      this.sigleValue1 = value
    },
    changeSingleValue(){
      setInterval(() => {
        let newValue = this.sigleValue1[0]
          if(this.sigleValue1[0] > 5){
            newValue = 1
          }  else {
            newValue++
          }
          this.$set(this.sigleValue1,0,newValue)
      }, 1000);
    },
    doubleDataChange(value){
      this.doubleValue = value
    },
    linkageChange(value,select){
      this.linkageValue = value
      this.linkageSelect = select
    }
  },
}
</script>

<style lang="less" scoped>
.picker-item{
  margin-bottom: 20px;
}
.result{
  margin-top: 20px;
}
</style>


