<template>
  <transition name="d-toast">
    <div :class="['d-toast-mask',!mask && 'd-toast-nomask']" v-if="visible">
      <div class="d-toast-content" :class="[icon&&'d-toast-content-icon',position && 'd-toast-content-'+position]">
        <span class="icons" v-if="icon">
          <span v-if="icon === 'loading'"  class="loading-icon icon">
            <i class="d-icon-loading"></i>
          </span>
          <i v-else class="icon" :class="'d-icon-' + icon"></i>
        </span>
        <img v-if="image" class="image" :src="image" alt="image">
        <span v-html="content"></span>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name:'d-toast',
  props: {
    content: {
      default: '提示',
      type: String
    },
    duration:Number,
    mask:{
      type:Boolean,
      default: true
    },
    position:{
      type:String,
      default:'',
      validator(value){
        return ['','middle','top','bottom'].indexOf(value) > -1
      }
    },
    image:String,
    icon: {
      default: '',
      type: String
    }
  },
  data(){
    return {
      visible: false
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../src/style/default.less';
@import '../../../src/style/var.less';
.d-toast-mask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  z-index:29999;
  transition: opacity .3s linear;
  .d-toast-content{
    position: absolute;
    overflow: hidden;
    z-index: 30000;
    top: 50%;
    left: 50%;
    max-width: 50%;
    box-sizing: border-box;
    font-size: @font-size-base;
    // display:flex;
    // justify-content: center;
    // align-items: center;
    transform: translate(-50%, -50%);
    outline: none;
    padding: @h-spacing-md @w-spacing-lg;
    text-align: center;
    background: @toast-fill;
    border-radius: 5px;
    color: @color-text-base-inverse;

    .icons{
      .icon{
        display: block;
        margin: @h-spacing-md 0;
        font-size: 40*@unit !important;
      }
      .loading-icon{
        .d-icon-loading{
          display: block;
          width: 32px;
          height: 32px;
          margin: auto;
          font-size: 28*@unit !important;
          animation: loading-rotate 1.4s linear infinite;
        }
      }
    }
    .image{
      display: block;
      margin: @h-spacing-md auto;
      width: 32px;
      height: 32px;
    }
  }
  .d-toast-content-top{
    top: 10%;
  }
  .d-toast-content-bottom{
    top: 90%;
  }
}
.d-toast-nomask{
  pointer-events: none;
}
.d-toast-enter-active, .d-toast-leave-active {
  transition: opacity .5s
}
.d-toast-enter, .d-toast-leave-active {
  opacity: 0
}
</style>
