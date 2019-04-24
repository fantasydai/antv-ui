<template>
  <ListItem :class="['d-checkbox-item',disabled&&'d-checkbox-item-disabled',align==='right'&&'d-checkbox-item-right']" thumb="customer" :onClick="disabled?'':()=>{}">
    <template slot="thumb">
      <label class="d-checkbox-wrapper">
        <Checkbox :align="align" :disabled="disabled" v-model="checkedValue" :currentValue="currentValue" :option="option"></Checkbox>
      </label>
    </template>
    {{option.label || option.value||option}}
  </ListItem>
</template>
<script>
import {ListItem} from '../../list'
import Checkbox from './Checkbox.vue'
export default {
  name:'d-checkboxItem',
  props:{
    disabled:Boolean,
    align:{
      type:String,
      default:'',
      validator(value){
        return ['right',''].indexOf(value) > -1
      }
    },
    currentValue:{
      type: Array,
      default: ()=>{
        return []
      }
    },
    option:{
      type: [Object,String],
      default:''
    }
  },
  data(){
    return {
      checkedValue:this.currentValue
    }
  },
  components:{
    Checkbox
  },
  watch:{
    currentValue(val){
      this.checkedValue = val
    },
    checkedValue(val){
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../src/style/default.less';

.d-checkbox-item /deep/ .d-list-item-thumb{
  width: 21*@unit;
  height: 21*@unit;
}
.d-checkbox-item.d-checkbox-item-disabled /deep/ .d-list-item-line /deep/ .d-list-item-content{
  color: @color-text-disabled;
}
.d-checkbox-item-right /deep/ .d-list-item-thumb{
   width: 0;
   margin: 0 !important;
}
</style>

