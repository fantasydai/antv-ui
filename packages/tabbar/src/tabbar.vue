<template>
  <section :class="['antv-tabbar',hidden && `antv-tabbar-hidden antv-tabbar-hidden-${tabBarPosition}`]" ref="tabbar" :style="{color: textColor,background: barTintColor}">
    <slot :user="123"></slot>
  </section>
</template>
<script>

export default {
  name: 'antv-tabbar',
  props: {
    barTintColor: {
      type: String,
      default: 'white'
    },
    selectTextColor: {
      type: String,
      default: '#108ee9'
    },
    textColor: {
      type: String,
      default: '#888'
    },
    tabBarPosition: {
      type: String,
      default: 'bottom'
    },
    hidden: Boolean
  },
  data(){
    return {
      
    }
  },
  methods: {
  },
}
</script>

<style lang="less" scoped>
@import '../../../src/style/default.less';

.antv-tabbar{
  position: relative;
  box-sizing: border-box;
  height: 50*@unit;
  border-top: 1*@unit solid #ddd;
  width: 100%;
  display: flex;
  transition-duration: .3s;
  z-index: 100;
  justify-content: space-around;
  align-items: center;
  bottom: 0;
  &-hidden{
    bottom: -50*@unit;
    height: 0;
    &-top{
      top: -50*@unit;
    }
  }
}
  
</style>