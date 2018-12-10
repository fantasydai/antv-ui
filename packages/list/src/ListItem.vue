<template>
  <div :class="['d-list-item',onClick&&'d-list-item-active' ]" @click="handleClick">
    <div v-if="thumb" class="d-list-item-thumb">
      <slot name="thumb" v-if="thumb ==='customer'"></slot>
      <img v-else :src="thumb" alt="thumb">
    </div>
    <div :class="['d-list-item-line',multipleLine&&'d-list-item-line-multiple']">
      <div class="d-list-item-content">
        <div v-if="title" class="d-list-item-title">{{title}}</div>
        <div v-else class="d-list-item-title"><slot></slot></div>
        <div v-if="subTitle" class="d-list-item-subtitle">{{subTitle}}</div>
      </div>
      <div v-if="extra" class="d-list-item-extra">
        <slot v-if="extra === 'customer'" name="extra"></slot>
        <span v-else>{{extra}}</span>
      </div>
      <div v-if="arrow" :class="['d-list-item-arrow',`d-list-item-arrow-${arrow}`]">
        <i :class="'d-icon-' + arrow"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'ListItem',
  props:{
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    },
    thumb: {
      type: String,
      default: ''
    },
    extra: {
      type: String,
      default: ''
    },
    arrow: {
      type: String,
      default: '',
      validator(value){
        console.log(value)
        return [
          '',
          'right',
          'up',
          'down',
          'empty'
        ].indexOf(value) > -1
      }
    },
    multipleLine: {
      type:Boolean,
      default: false
    },
    onClick:[Function,String]
  },
  methods: {
    handleClick(event){
      if(this.onClick){
        this.onClick(event)
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../src/style/default.less';
@import '../../../src/style/var.less';
  .d-list-item{
    position: relative;
    display: flex;
    align-items: center;
    padding-left: @w-spacing-lg;
    min-height: @list-item-height;
    background-color: @fill-base;
    vertical-align: middle;
    overflow: hidden;
    transition: background-color 200ms;

    img {
      width: @icon-size-md;
      height: @icon-size-md;
      vertical-align: middle;
    }
    .d-list-item-thumb{
      &:first-child {
        margin-right: @w-spacing-lg;
      }

      &:last-child {
        margin-left: @w-spacing-md;
      }
    }
    .d-list-item-line{
      position: relative;
      display: flex;
      align-items: center;
      flex: 1;
      align-self: stretch;
      padding-right: @w-spacing-lg;
      overflow: hidden;
      .d-list-item-content{
        flex: 1;
        color: @color-text-base;
        font-size: @font-size-heading;
        line-height: @line-height-paragraph;
        text-align: left;
        .ellipsis();
        padding-top: 7 * @unit;
        padding-bottom: 7 * @unit;
        .d-list-item-title{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .d-list-item-subtitle{
          color: @color-text-caption;
          font-size: @font-size-subhead;
          line-height: @line-height-paragraph;
          margin-top: @h-spacing-sm;
          .ellipsis();
        }
      }
      .d-list-item-extra {
        flex-basis: 36%;
        color: @color-text-caption;
        font-size: @font-size-caption;
        line-height: @line-height-paragraph;
        text-align: right;
        .ellipsis();

        padding-top: 7 * @unit;
        padding-bottom: 7 * @unit;
      }
      .d-list-item-arrow{
        display: block;
        margin-left: @h-spacing-md;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        color: @color-text-disabled;
      }
    }
    .d-list-item-line-multiple .d-list-item-content .d-list-item-title{
      white-space: normal;
      word-break: break-word;
    }
  }
  .d-list-item-active{
    &:active{
      background: @fill-tap;
    }
  }
</style>


