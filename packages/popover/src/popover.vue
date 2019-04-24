<template>
  <div>
    <span class="slot-wrap" ref="switch">
      <slot></slot>
    </span>
    <div class="d-popover">
    <div v-if="mask && visible" class="d-popover-mask" @click="maskClick"></div>
    <div v-show="visible" :class="['d-popover-content',`d-popover-content-${position}`]" :style="positionStyle">
      <div :class="['d-popover-content-triangle',`d-popover-content-${position}-triangle`]" :style="{'background-color':bgColor}"></div>
      <div class="d-popover-content-slot-wrap" ref="content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name:'d-popover',
  props: {
    visible: Boolean,
    mask: Boolean,
    maskClosable: {
      type:Boolean,
      default: true
    },
    distance: {
      type: Number,
      default: 10
    },
    type:{
      type: String,
      default:'default',
      validator(val){
        return ['default','fixed','absolute'].indexOf(val) > -1
      }
    },
    bgColor: {
      type: String,
      default: '#fff'
    },
    position: {
      type: String,
      default: 'bottomRight',
      validator(position) {
        return ['left','right','top','bottom','topRight','topLeft','bottomRight','bottomLeft'].indexOf(position) > -1
      }
    }
  },
  data(){
    return {
      positionStyle:{}
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.update)
  },
  watch: {
    visible : function(val){
      if(val){
        this.$nextTick(()=>{
          this.getPosiiton()
          window.addEventListener('resize', this.update)
        })
      }

    }
  },
  methods: {
    getPosiiton(){
      let content = this.$refs.content
      let switchSlot = this.$refs.switch.firstElementChild
      let offsetTop = this.type !== 'default' ? switchSlot.offsetTop : switchSlot.getBoundingClientRect().top
      switch (this.position) {
        case 'top':
          this.positionStyle.left = switchSlot.offsetLeft + switchSlot.offsetWidth/2 - content.offsetWidth/2 + 'px'
          this.positionStyle.top = offsetTop - (content.offsetHeight + this.distance) + 'px'
          break
        case 'topRight':
          this.positionStyle.left = switchSlot.offsetWidth + switchSlot.offsetLeft - content.offsetWidth + 'px'
          this.positionStyle.top = offsetTop - (content.offsetHeight + this.distance) + 'px'
          break
        case 'topLeft':
          this.positionStyle.left = switchSlot.offsetLeft + 'px'
          this.positionStyle.top = offsetTop - (content.offsetHeight + this.distance) + 'px'
          break
        case 'bottom':
          this.positionStyle.left = switchSlot.offsetLeft + switchSlot.offsetWidth/2 - content.offsetWidth/2 + 'px'
          this.positionStyle.top = offsetTop  + switchSlot.offsetHeight + this.distance + 'px'
          break
        case 'bottomRight':
          this.positionStyle.left = switchSlot.offsetWidth + switchSlot.offsetLeft - content.offsetWidth + 'px'
          this.positionStyle.top = offsetTop + switchSlot.offsetHeight + this.distance + 'px'
          break
        case 'bottomLeft':
          this.positionStyle.left = switchSlot.offsetLeft + 'px'
          this.positionStyle.top = offsetTop + switchSlot.offsetHeight + this.distance + 'px'
          break
        case 'left':
          this.positionStyle.left = switchSlot.offsetLeft  - (content.offsetWidth + this.distance) + 'px'
          this.positionStyle.top = offsetTop + switchSlot.offsetHeight/2 - content.offsetHeight/2 + 'px'
          break
        case 'right':
          console.log(switchSlot.offsetLeft,switchSlot.getBoundingClientRect().top)
          this.positionStyle.left = switchSlot.offsetLeft  + switchSlot.offsetWidth + this.distance + 'px'
          this.positionStyle.top = offsetTop + switchSlot.offsetHeight/2 - content.offsetHeight/2 + 'px'
          break
        default:
          break;
      }
      this.positionStyle = Object.assign({},this.positionStyle)

    },
    maskClick(){
      this.maskClosable && this.$emit('input',false)
    },
    update(){
      this.visible && this.getPosiiton()
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../src/style/default.less';

.slot-wrap{
  overflow: hidden;
}
.d-popover {
  &-mask{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.4);
    height: 100%;
    z-index: 999;
  }
  &-content {
    position: absolute;
    z-index: 1999;
    box-shadow: 0 0 2 * @unit rgba(0, 0, 0, 0.21);
    &-triangle{
      position: absolute;
      width: @popover-border-width;
      height: @popover-border-width;
      background-color: @fill-base;
      transform: rotate(45deg);
      z-index: -1;
      box-shadow: 0 0 2 * @unit rgba(0, 0, 0, 0.21);
    }
    &-slot-wrap{
      overflow: hidden;
      border-radius: 3px;
    }
  }
  .d-popover-content-bottomRight{
    &-triangle{
      right: @popover-border-width;
      top: -@popover-border-width/2;
    }
  }
  .d-popover-content-bottomLeft{
    &-triangle{
      left: @popover-border-width;
      top: -@popover-border-width/2;
    }
  }
  .d-popover-content-bottom{
    &-triangle{
      left: 50%;
      top: -@popover-border-width/2;
    }
  }
  .d-popover-content-top{
    &-triangle{
      left: 50%;
      bottom: -@popover-border-width/2;
    }
  }
  .d-popover-content-topLeft{
    &-triangle{
      left: @popover-border-width;
      bottom: -@popover-border-width/2;
    }
  }
  .d-popover-content-topRight{
    &-triangle{
      right: @popover-border-width;
      bottom: -@popover-border-width/2;
    }
  }
  .d-popover-content-left{
    &-triangle{
      top: 50%;
      transform:translateY(-50%) rotate(45deg);
      right: -@popover-border-width/2;
    }
  }
  .d-popover-content-right{
    &-triangle{
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
      left: -@popover-border-width/2;
    }
  }
}
</style>
