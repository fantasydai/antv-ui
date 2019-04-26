<template>
  <div class="d-modal">
    <div :class="['d-modal-mask',transparent && 'd-modal-mask-transparent']" v-if="visible" @click="handleMaskClick" @touchmove="maskMove"></div>
    <div :class="['d-modal-wrap',wrapClassName]">
      <transition name="d-bounce">
        <div :class="['d-modal-content',className]" v-if="visible">
          <div class="d-modal-header">
            <div class="d-modal-title" v-if="title">{{title}}</div>
          </div>
          <div class="d-modal-body">
            <div class="d-modal-body-content" v-if="message" v-html="message"></div>
            <slot name="message"></slot>
            <div class="d-modal-input-wrap" v-if="isprompt">
              <div class="d-modal-input">
                <label>
                  <input :type="[type === 'secure'?'password':'text']" :placeholder="placeholders?typeof placeholders === 'string'?placeholders : placeholders[0]:''" :value="defaultValue">
                </label>
              </div>
              <div class="d-modal-input" v-if="type==='login'">
                <label>
                  <input type="password" :placeholder="typeof placeholders === 'string'? '' : placeholders[1]">
                </label>
              </div>
            </div>
          </div>
          <div class="d-modal-footer">
            <div :class="['d-modal-buttons',footer.length === 2 ? 'd-modal-buttons-flex' : 'd-modal-buttons-normal']">
              <a :class="['d-modal-button',item.className]" v-for="(item,index) in footer" :key="index" role="button" @click="onPress(item)">{{item.text}}</a>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import {isPromise} from '../../../src/utils/utils'
export default {
  name: 'd-modal',
  props: {
    title: String,
    message: String,
    className:String,
    wrapClassName:String,
    visible: Boolean,
    maskClosable: Boolean,
    transparent: Boolean,
    isprompt:Boolean,
    type:{
      type:String,
      default:'default'
    },
    placeholders:{
      type:[String,Array],
      default:''
    },
    defaultValue:{
      type:[String,Number],
      default:''
    },
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
        let callback = item.onPress()
        console.log(callback)
        if(isPromise(callback)){
          callback.then(()=>{
            this.visible = false
          })
        }  else {
          setTimeout(() => {
           this.visible = false
          }, 100)
        }
      } else {
        setTimeout(() => {
          this.visible = false
        }, 100)
      }
    },
    handleMaskClick(e){
      this.maskClosable && (this.visible = false)

    },
    maskMove(e){
      e.preventDefault()
      e.stopPropagation()
    }
  }
}
</script>

<style lang="less" scoped>

@import '../../../src/style/default.less';
@import '../../../src/style/var.less';
@import '../../../src/style/reset.less';
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
  &-mask-transparent{
    opacity: 0;
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
    width: 270*@unit;
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
    padding: 6*@unit 15*@unit 15*@unit;
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
  &-input-wrap{
    margin-top: 9*@unit;
    border-radius: 3*@unit;
    position: relative;
    &:after{
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 200%;
      height: 200%;
      border: 1*@unit solid #ddd;/*px*/
      border-radius: 6*@unit;
      transform-origin: 0 0;
      transform: scale(.5);
      box-sizing: border-box;
      pointer-events: none;
      font-size: 100%;
    }
  }
  &-input{
    height: 36 * @unit;
    line-height: @line-height-base;
    &:nth-child(2){
      position: relative;
      .borderLine('top',@fill-tap,0,0,0,0);
    }
    input {
      position: relative;
      border: 0;
      width: 98%;
      height: 34 * @unit;
      top: 1*@unit;
      box-sizing: border-box;
      margin: 0;
      font-size: 100%;
      &::placeholder {
        font-size: @font-size-base;
        color: #ccc;
        padding-left: @h-spacing-md;
      }
    }
  }

  &-buttons-flex{
    display: flex;
    align-items: center;
    justify-content: sapce-between;
    .d-modal-button{
      flex:1;
      &:first-child{
        border-right: 1*@unit solid @border-color-base;
        color:@color-text-base;
      }
    }
  }
  &-button{
    position: relative;
    border-top: 1*@unit solid @border-color-base;
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


