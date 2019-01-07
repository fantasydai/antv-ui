<template>
  <div class="d-popover">
    <div class="d-popover-mask"></div>
    <div :class="['d-popover-content',`d-popover-content-${position}`]">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name:'d-popover',
  props: {
    visible:Boolean,
    mask:Boolean,
    maskClosable:Boolean,
    position:{
      type: String,
      default:'bottomRight',
    }
  }
}
</script>

<style lang="less" scoped>

</style>
