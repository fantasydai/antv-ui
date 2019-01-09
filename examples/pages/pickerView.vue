<template>
  <div class="wrap">
    <div class="picker-item">
      <d-pickerView :data="singleData" :value="['秋']"></d-pickerView>
    </div>
    <div class="picker-item">
      <d-pickerView :data="doubleData" :linkage="false" :value="[2018,'秋']"></d-pickerView>
    </div>
    <div class="picker-item">
      <d-pickerView :data="province" :value="['02','02-1','02-1-2']" :cols="3"></d-pickerView>
    </div>
  </div>
</template>
<script>
export default {
  name:'pickerView',
  data(){
    return {
      singleData:['春','夏','秋','冬'],
      doubleData:[[2011,2012,2013,2014,2015,2016,2017,2018,2019],['春','夏','秋','冬']],
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
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.picker-item{
  margin-bottom: 20px;
}
</style>


