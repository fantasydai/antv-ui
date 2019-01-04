<template>
  <div :class="['d-drawer',`d-drawer-${position}`]">
    <div v-if="showMask && mode==='overlay'" :class="['d-drawer-mask',visible && 'd-drawer-mask-show']" @click="clickMask"></div>
    <div :class="['d-drawer-side',visible && 'd-drawer-side-show']" ref="drawerSide">
      <slot name="side"></slot>
    </div>
    <div class="d-drawer-content" :style="{left:contentLeft+'px',top: contentTop+'px'}">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name:'d-drawer',
  props:{
    visible: Boolean,
    showMask:{
      type: Boolean,
      default: true
    },
    maskClosable:{
      type: Boolean,
      default: true
    },
    position:{
      type: String,
      default: 'left',
      validator(val){
        return ['left','right','bottom','top'].indexOf(val) > -1
      }
    },
    mode:{
      type: String,
      default: 'overlay',
      validator(val){
        return ['overlay','push'].indexOf(val) > -1
      }
    },
  },
  data(){
    return {
      contentLeft:0,
      contentTop:0,
    }
  },
  watch:{
    visible(val){
      if(!val){
        this.contentLeft = 0
        this.contentTop = 0
      } else if (this.mode === 'push'){
        this.contentLeft = this.position === 'left' ? this.$refs.drawerSide.clientWidth : this.position === 'right' ? -this.$refs.drawerSide.clientWidth : 0
        this.contentTop = this.position === 'top' ? this.$refs.drawerSide.clientHeight : this.position === 'bottom' ? -this.$refs.drawerSide.clientHeight : 0
      } else {
        this.contentLeft = 0
        this.contentTop = 0
      }
    },
  },
  methods:{
    clickMask(){
      this.maskClosable && (this.$emit('input',false))
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../src/style/default.less';
.d-drawer{
  position: relative;
  &-mask{
    position: absolute;
    height: 100%;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    visibility: hidden;
    transition: opacity .4s ease-out;
    background: @fill-mask;
  }
  &-side{
    position: absolute;
    z-index: 2;
    overflow: auto;
    transition: transform .4s;
    transform: translateX(-100%);
  }
  &-side-show{
    transform: translateX(0);
  }
  &-mask-show{
    opacity: 1;
    visibility: visible;
  }
  &-content{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    transition: left .3s ease-out, top .3s ease-out,bottom .3s ease-out,right .3s ease-out;
  }
}
.d-drawer-left{
  .d-drawer-side{
    top: 0;
    left: 0;
    bottom: 0;
  }
}
.d-drawer-right{
  .d-drawer-side{
    top: 0;
    right: 0;
    bottom: 0;
    transform: translateX(100%);
  }
  .d-drawer-side-show{
    transform: translateX(0);
  }
}
.d-drawer-top{
  .d-drawer-side{
    top: 0;
    left: 0;
    right: 0;
    transform: translateY(-100%);
  }
  .d-drawer-side-show{
    transform: translateY(0);
  }
}
.d-drawer-bottom{
  .d-drawer-side{
    bottom: 0;
    left: 0;
    right: 0;
    transform: translateY(100%);
  }
  .d-drawer-side-show{
    transform: translateY(0);
  }
}
</style>


