<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-04-24 17:53:04
 * @LastEditTime: 2019-09-10 19:32:13
 * @LastEditors: Please set LastEditors
 -->
<template>
  <section class="item-wrap">
    <d-checklist title="Checklist default" :options="options" :value="currentValue" v-model="currentValue"></d-checklist>
    <div class="selected-value">
      当前选中[<span v-for="(item,index) in currentValue" :key="index">{{item}},</span>]
    </div>
    <d-checklist title="Checklist right" align="right" :options="options2" :value="currentValue2" v-model="currentValue2"></d-checklist>
    <div class="selected-value">
      当前选中[<span v-for="(item,index) in currentValue2" :key="index">{{item}},</span>]
    </div>
  </section>

</template>

<script>
export default {
  name:'checkbox',
  data(){
    return {
      currentValue:['Tom','Poter'],
      currentValue2:['Harry'],
      options:[{
        label:'Tom',
        value:'Tom'
        },
        {
          label:'Jerry',
          value:'Jerry'
        },
        {
          label:'Harry',
          value:'Harry',
          disabled:true
        },
        {
          label:'Poter',
          value:'Poter'
        },
      ],
      options2:[{
        label:'Voldemort',
        value:'Voldemort'
        },
        {
          label:'Jerry',
          value:'Jerry'
        },
        {
          label:'Harry',
          value:'Harry',
          disabled:true
        },
        {
          label:'Poter',
          value:'Poter'
        },
      ],
    }
  },
  watch:{
  }
}
</script>
<style lang="less" scoped>
  .item-wrap{
    background-color: #f5f5f9;
    padding-bottom: 40px;
  }
  .checkbox-item{
    border-bottom: 1px solid #ddd;
  }
  .selected-value{
    padding-left: 20px;
  }
</style>


