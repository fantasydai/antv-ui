<template>
  <div class="d-picker">
    <div class="d-picker-items">
      <picketItem v-for="(item,index) in activeData" :key="index" :data="item" :styles="itemStyle instanceof Array ? itemStyle[index] : itemStyle" :defaultValue="activeValue[index]" :slotIndex="index" @change="valueChangeHandler" @dataChange="dataChangeHandler" :indicatorStyle="indicatorStyle" :format="format[index]"></picketItem>
    </div>
  </div>
</template>
<script>
import treeFilter from 'array-tree-filter';
import picketItem from './pickerItem.vue'
export default {
  name: 'd-pickerView',
  props: {
    data:{
      type: Array,
      default:()=>{
        return []
      }
    },
    value: {
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
    cols:Number,
    linkage: {
      type: Boolean,
      default: true
    },
    onChange: {
      type: Function,
      default: ()=>{}
    }
  },
  data(){
    return {
      columns:this.cols,
      activeValue: Object.assign([],this.value) || [],
      activeData: []
    }
  },
  watch:{
    value(value){
      this.activeValue = Object.assign([],value)
      this.getActiveData()
    },
  },
  mounted(){
    this.getActiveData()
  },
  components:{
    picketItem
  },
  methods:{
    getActiveData(){
      let activeData = []
      if(!this.linkage || !this.cols || this.data.length  < 2) {
        activeData = this.data[0] instanceof Array ? this.data : [this.data]
      } else {
        activeData.push(this.data)
        let activeParant = this.data
        for (let index = 0; index < this.columns -1; index++) {
          let activeChildren = ''
          if(this.activeValue[index]) {
            activeParant.forEach(item=>{
              item.value === this.activeValue[index] && (activeChildren = item.children || [])
            })
            !activeChildren && (activeChildren = activeParant[0].children || [])
          } else {
            activeChildren = activeParant[0].children || []
          }
          activeData.push(activeChildren)
          activeParant = activeChildren
        }
      }
      this.activeData = activeData
      this.getActiveValue()
    },
    getActiveValue(){
      this.activeData.forEach((data,index)=>{
        if(!this.activeValue[index]) {
          this.activeValue[index] = data[0].value || data[0]
        }
      })
    },
    valueChangeHandler(index,value){
      this.$set(this.activeValue, index, typeof value === 'object' ? value.value :value)
      if(this.linkage) {
        this.getActiveData()
        this.activeItems = treeFilter(this.data,(item, level) => item.value ===this.activeValue[level])
      }
      this.$nextTick(()=>{
        this.onChange(this.activeValue.filter(item=>item !== undefined),index,this.activeItems)
      })
    },
    dataChangeHandler(index,value){
      this.$set(this.activeValue, index, typeof value === 'object' ? value.value :value)
      this.activeItems = treeFilter(this.data,(item, level) => item.value ===this.activeValue[level])
    }
  }
}
</script>

<style lang="less" scoped>
.d-picker-items{
  display: flex;
  align-items: center;
}
</style>

