<template>
  <div class="d-checklist">
    <List :header="title">
      <CheckboxItem v-for="(option,index) in options" :align="align" :key="index" class="checkbox-item" :option="option" :currentValue="currentValue" v-model="currentValue" :disabled="option.disabled"></CheckboxItem>
    </List>
  </div>
</template>
<script>
import {List} from '../../list'
import CheckboxItem from '../../checkbox'
export default {
  name:'d-checklist',
  props:{
    title:{
      type:String,
      default:''
    },
    options:{
      type:Array,
      required: true,
      default:()=>{
        return []
      }
    },
    value: Array,
    align:{
      type:String,
      default:'',
      validator(value){
        return ['right',''].indexOf(value) > -1
      }
    },
  },
  components:{
    CheckboxItem,
    List
  },
  data(){
    return {
      currentValue: this.value
    }
  },
  watch: {
    value(value) {
      this.currentValue = value;
    },
    currentValue(val) {
      this.$emit('input', val);
    }
  }
}
</script>

