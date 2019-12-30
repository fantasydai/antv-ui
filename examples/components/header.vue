<template>
  <header>
      <div class="demo-preivew-header-title">
        <d-navbar class="navbar" :leftContent="[{icon:'back',callback:clickBack}]">antv-ui</d-navbar>
      </div>
    </header>
</template>

<script>
export default {
  methods: {
    clickBack(){
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.demo-preivew-header-title{
  padding-top: 38px;
  background: url(../../src/assets/images/phone-header.png) no-repeat;
  background-size: 100% 40px;
  .navbar{
    background: #2E2E31;
  }
}
</style>

