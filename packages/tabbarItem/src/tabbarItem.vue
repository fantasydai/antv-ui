<template>
  <div class="antv-tab-bar-tab" @click="tabClick">
    <div class="antv-tab-bar-tab-icon" v-if="icon">
      <antv-badge v-if="dot || badge" :text="badge" :dot=" !badge && dot" class="antv-tab-bar-tab-badge">
        <img class="antv-tab-bar-tab-image" :src="selected ? selectedIcon : icon" alt="" srcset="">
      </antv-badge>
      <img class="antv-tab-bar-tab-image" v-else :src="selected ? selectedIcon : icon" alt="" srcset="">
    </div>
    <p class="antv-tab-bar-tab-title" :style="{color: selected ? selectedColor : ''}">{{title}}</p>
  </div>
</template>
<script>
import Badge from '../../badge'

export default {
  name: 'antv-tabbar-item',
  props: {
    badge: [Number, String],
    icon: String,
    selectedIcon: String,
    value: String,
    title: {
      type: String,
      default: ''
    },
    dot: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    },
    onPress: {
      type: Function,
      default: ()=>{}
    },
  },
  data(){
    return {
      selectedColor: '108ee9'
    }
  },
  mounted(){
    this.getSelectColor()
  },
  methods: {
    getSelectColor(){
      this.$nextTick(()=>{
        this.selectedColor = this.$parent.selectTextColor || this.selectedColor
      })
    },
    tabClick(){
      this.onPress(this.title, this.value)
    }
  },
}
</script>
<style lang="less" scoped>
@import '../../../src/style/default.less';
  .antv-tab-bar-tab{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    width: 100%;
    &-icon{
      display: flex;
      justify-content: center;
    }
    &-badge{
      :last-child{
        margin-top: 4*@unit;
        left: 22*@unit;
      }
      
    }
    &-image{
      width: 22*@unit;
      height: 22*@unit;
      vertical-align: middle;
    }
    &-title{
      font-size: 10*@unit;
      margin: 3*@unit 0 0;
      line-height: 1;
      text-align: center;
    }
  }
</style>