<template>
  <div class="d-picker">
    <div class="d-picker-items">
      <picketItem v-for="(item,index) in activeData" :key="index" :data="item" :styles="itemStyle instanceof Array ? itemStyle[index] : itemStyle" :defaultValue="value[index]"></picketItem>
    </div>
  </div>
</template>
<script>
import treeFilter from 'array-tree-filter'
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
    onChange:Function,

  },
  data(){
    return {
      columns:this.cols,
      activeData: []
    }
  },
  mounted(){
    this.getActiveData()
  },
  components:{
    picketItem
  },
  methods:{
    getActiveData(){
      this.activeData = []
      if(!this.linkage || !this.cols || this.data.length  < 2) {
        this.activeData = this.data[0] instanceof Array ? this.data : [this.data]
      } else {
        this.activeData.push(this.data)
        let activeParant = this.data
        for (let index = 0; index < this.columns -1; index++) {
          let activeChildren = ''
          if(this.value[index]) {
            activeParant.forEach(item=>{
              item.value === this.value[index] && (activeChildren = item.children || [])
            })
            !activeChildren && (activeChildren = activeParant[0].children || [])
          } else {
            activeChildren = activeParant[0].children || []
          }
          this.activeData.push(activeChildren)
          activeParant = activeChildren
        }
      }
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

