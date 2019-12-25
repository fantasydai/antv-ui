<template>
  <li class="antv-carousel-item">
    <slot></slot>
  </li>
</template>
<script>
export default {
  name: 'antv-carousel-item'
}
</script>
<style lang="less" scoped>
  .antv-carousel-item{
    position: absolute;
    top: 0px;
    display: inline-block;
    list-style-type: none;
    vertical-align: top;
    height: 100%;
    box-sizing: border-box;
    margin: auto 0px;
    overflow: hidden;
  }
</style>