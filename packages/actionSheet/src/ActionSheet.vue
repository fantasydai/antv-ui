<template>
    <div class="d-actionsheet">
      <div :class="['d-actionsheet-mask',transparent&&'d-actionsheet-transparent']" v-if="visible" @click="clickMask"></div>
      <transition name="slide">
        <div :class="['d-actionsheet-content',type === 'share' && 'd-actionsheet-content-share']" v-if="visible">
          <div :class="['d-actionsheet-content-header',type === 'share' &&'d-actionsheet-content-share-header']">
            <div class="d-actionsheet-title" v-if="title">{{title}}</div>
            <div class="d-actionsheet-message" v-if="title">{{message}}</div>
          </div>
          <div class="d-actionsheet-btns" v-if="type === 'default'">
            <div v-for="(btn,index) in options" :key="index" :class="['d-actionsheet-btn',index === cancelIndex &&'d-actionsheet-cancel-btn',index === destructiveIndex &&'d-actionsheet-destruct-btn']" :style="{color: btn.color}" role="button" @click="handleClick('',index,btn)">
              {{typeof btn === 'string' ? btn : btn.text}}
              <span v-if="btn.badge" class="d-actionsheet-badge">{{btn.badge}}</span>
              <span v-if="index === cancelIndex" class="d-actionsheet-cancel-btn-mask"></span> </div>
          </div>
          <div class="d-actionsheet-share" v-if="type === 'share'">
            <div v-if="options[0] instanceof Array">
              <div class="d-actionsheet-share-list" v-for="(item,rowIndex) in options" :key="rowIndex">
                <div class="d-actionsheet-share-list-item" v-for="(option,columnIndex) in item" :key="columnIndex" @click="handleClick(rowIndex,columnIndex,option)">
                  <div class="d-actionsheet-share-list-item-img">
                    <img :src="option.url" :alt="option.title">
                  </div>
                  <div class="d-actionsheet-share-list-item-title">{{option.title}}</div>
                </div>
                <div class="d-actionsheet-share-list-empty-right"></div>
              </div>
            </div>
            <div v-else class="d-actionsheet-share-list">
              <div class="d-actionsheet-share-list-item" v-for="(option,index) in options" :key="index" @click="handleClick('',index,option)">
                <div class="d-actionsheet-share-list-item-img">
                  <img :src="option.url" :alt="option.title">
                </div>
                <div class="d-actionsheet-share-list-item-title">{{option.title}}</div>
              </div>
              <div class="d-actionsheet-share-list-empty-right"></div>
            </div>
            <div class="d-actionsheet-share-cancel-btn" role="button" @click="close">{{cancelButtonText || '取消'}}</div>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
export default {
  props:{
    visible: Boolean,
    transparent: Boolean,
    maskClosable: Boolean,
    cancelIndex: Number,
    destructiveIndex: Number,
    title: String,
    message :String,
    cancelButtonText: String,
    type:{
      type: String,
      default: 'default'
    },
    options:{
      type:Array,
      default:()=> {
        return []
      }
    },
    badges:{
      type:Array,
      default:()=> {
        return []
      }
    },
    callback:Function
  },
  methods:{
    handleClick(rowIndex,index,btn){
      if(!this.callback){
        this.visible = false
        return
      }
      const res = rowIndex === '' ? this.callback(index,btn) : this.callback(rowIndex,index,btn)
      if(res && res.then){
        res.then(()=>{
          this.visible = false
        })

      } else {
        this.visible = false
      }
    },
    clickMask(){
      this.maskClosable && (this.visible = false)
    },
    close(){
      this.visible = false
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../src/style/default.less';
@import '../../../src/style/reset.less';
@import '../../../src/style/var.less';
.d-actionsheet{
  &-mask{
    position: fixed;
    z-index: @action-sheet-zindex;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: @fill-mask;
    height: 100%;
  }
  &-content{
    position: fixed;
    z-index: @action-sheet-zindex;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: @fill-base;
    &-share-header{
      position: relative;
      .borderLine('bottom',@fill-tap,0,0,0,0);
      overflow: hidden;
    }
  }
  &-content-share{
    background: #f2f2f2;
  }
  &-title,&-message{
    margin: @w-spacing-md auto;
    padding: 0 @w-spacing-lg;
    text-align: center;
  }
  &-title{
    font-size: @font-size-heading;
  }
  &-message {
    color: @color-text-caption;
    font-size: @font-size-base;
  }
  &-btns{
    text-align: center;
    color: @color-text-base;
    overflow: hidden;
  }
  &-btn{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: @actionsheet-btn-font-size;
    padding: 0 8 * @unit;
    margin: 0;
    position: relative;
    height: @actionsheet-btn-height;
    line-height: @actionsheet-btn-height;
    box-sizing: border-box;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow-x: hidden;
    .borderLine('top',@fill-tap,0,0,0,0);
    &&:active {
      background-color: @fill-tap;
    }
  }
  &-badge{
    margin-left: 8 * @unit;
    padding: 0 5*@unit;
    text-align: center;
    font-size: 12*@unit;
    height: 18*@unit;
    line-height: 18*@unit;
    border-radius: 12*@unit;
    color: #fff;
    background-color: #ff5b05;
    white-space: nowrap;
  }
  &-destruct-btn{
    color: @color-error;
  }
  &-cancel-btn{
    padding-top: 6*@unit;
    position: relative;
  }
  &-cancel-btn-mask{
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6*@unit;
    background: #e7e7e7;
    .borderLine('top',@fill-tap,0,0,0,0);
    .borderLine('bottom',@fill-tap,0,0,0,0);
  }
  &-share{
    &-list{
      display: flex;
      position: relative;
      padding: @h-spacing-xl 0 @h-spacing-xl @h-spacing-lg;
      overflow-x: auto;
      &:not(:first-child){
        .borderLine('top',@fill-tap,0,0,0,0);
      }
      &::-webkit-scrollbar {
        display: none;
      }
      &-item{
        margin: 0 12*@unit 0 0;
        flex-shrink: 0;
        text-align: center;
        &-img{
          margin:0 auto 9*@unit;
          width: 60*@unit;
          height: 60*@unit;
          background-color: #fff;
          border-radius: 3*@unit;
          display: flex;
          justify-content: center;
          align-items: center;
          &>img{
            width: 36*@unit;
            height: 36*@unit;
          }
        }
        &-title{
          color: #888;
          font-size: 10*@unit;
          text-align: center;
        }
      }
    }
    &-cancel-btn{
      position: relative;
      height: 50*@unit;
      line-height: 50*@unit;
      box-sizing: border-box;
      text-align: center;
      background-color: @fill-base;
      color: @color-text-base;
      font-size: @button-font-size;
      .borderLine('top',@fill-tap,0,0,0,0);
      &:active{
        background: @fill-tap;
      }
    }
    &-list-empty-right{
      min-width: 1*@unit;
      height: 10*@unit;
    }
  }
}
.slide-enter-active, .slide-leave-active {
  transform: translateY(0);
  transition: transform .3s ease;
}
.slide-enter,.slide-leave-to  {
  transition: transform .4s ease;
  transform: translateY(100%);
}
</style>


