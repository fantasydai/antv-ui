<template>
  <div class="d-modal">
    <div class="d-modal-mask" v-if="visible"></div>
    <div class="d-modal-wrap">
      <transition name="d-bounce">
        <div class="d-modal-content" v-if="visible">
          <div class="d-modal-header">
            <div class="d-modal-title" v-if="title">{{title}}</div>
          </div>
          <div class="d-modal-body">
            <div class="d-modal-body-content" v-if="message" v-html="message"></div>
            <slot name="message"></slot>
          </div>
          <div class="d-modal-footer">
            <div :class="['d-modal-buttons',footer.length === 2 ? 'd-modal-buttons-flex' : 'd-modal-buttons-normal']">
              <a class="d-modal-button" v-for="(item,index) in footer" :key="index" role="button" @click="onPress(item)">{{item.text}}</a>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  name: 'd-modal',
  props: {
    title: String,
    message: String,
    visible: Boolean,
    maskClosable: Boolean,
    transparent: Boolean,
    onClose: {
      type: Function,
      default: ()=>{}
    },
    footer: {
      type: Array,
      default: ()=>{return [{text:'我知道了'}]}
    }
  },
  methods: {
    onPress(item){
      if(item.onPress){
        this.visible = false
        setTimeout(() => {
          item.onPress()
        }, 100)

      } else {
        setTimeout(() => {
          this.visible = false
        }, 200)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../src/style/default.less';
@import '../../../src/style/var.less';

.d-modal{
  &-mask{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    height: 100%;
    z-index: @modal-zindex;
    background-color: @fill-mask;
  }
  &-wrap{
    position: fixed;
    overflow: auto;
    height: 100%;
    z-index: @modal-zindex;
    -webkit-overflow-scrolling: touch;
    outline: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
  }
  &-content{
    width: 270px;
    position: relative;
    background-color: @fill-base;
    border: 0;
    background-clip: padding-box;
    text-align: center;
    overflow: hidden;
    border-radius: 7*@unit;
    padding-top: 15*@unit;
    pointer-events: auto;
  }
  &-header{
    padding: 6px 15px 15px;
  }
  &-title{
    margin: 0;
    font-size: 18*@unit;
    line-height: 1;
    color: @color-text-base;
    text-align: center;
  }
  &-body{
    padding: 0 15*@unit 15*@unit;
    font-size: 15*@unit;
    color: @color-text-caption;
    height: 100%;
    line-height: 1.5;
    overflow: auto;
    &-content{
      zoom: 1;
      overflow: hidden;
    }
  }
  &-buttons-flex{
    display: flex;
    align-items: center;
    justify-content: sapce-between;
    .d-modal-button{
      flex:1;
      &:first-child{
        border-right: 1px solid @border-color-base;
        color:@color-text-base;
      }
    }
  }
  &-button{
    position: relative;
    border-top: 1px solid @border-color-base;
    box-sizing: border-box;
    text-align: center;
    text-decoration: none;
    outline: none;
    color: @color-primary;
    font-size: 18*@unit;
    height: 50*@unit;
    line-height: 50*@unit;
    display: block;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:active{
      background-color: @fill-tap;
    }
  }
}
.d-bounce-enter-active {
  animation: bounce-in .3s;
}
.d-bounce-leave-active {
  animation: bounce-in .2s reverse;
}
</style>


