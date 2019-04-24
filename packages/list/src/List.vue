<template>
  <div class="d-list">
    <div class="d-list-header">{{header}}</div>
    <div class="d-list-content">
      <slot></slot>
    </div>
    <div class="d-list-footer">{{footer}}</div>
  </div>
</template>
<script>
export default {
  name:'List',
  props:{
    header: String,
    footer: String
  }
}
</script>
<style lang="less" scoped>
  @import '../../../src/style/default.less';
  @import '../../../src/style/var.less';
  .d-list{
    &-header {
      padding: @h-spacing-lg @w-spacing-lg @h-spacing-md @w-spacing-lg;
      font-size: @font-size-base;
      color: @color-text-caption;
      width: 100%;
      box-sizing: border-box;
    }
    &-footer {
      padding: @h-spacing-md @w-spacing-lg @h-spacing-lg @w-spacing-lg;
      font-size: @font-size-base;
      color: @color-text-caption;
    }
    &-content {
      position: relative;
      background-color: @fill-base;
      .borderLine('top',@fill-tap,0,0,0,0);
      // .borderLine('bottom',@fill-tap,0,0,0,0);
    }
    &-content /deep/ .d-list-item /deep/ .d-list-item-line{
        .borderLine('bottom',@fill-tap,0,0,0,0);
      // border-bottom: 1px solid #ddd;
    }
  }
</style>


