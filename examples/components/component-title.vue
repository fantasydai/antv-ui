<template>
  <div class="component-title" @click="goHome">{{title}}</div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'd-UI'
    }
  },
  methods:{
    goHome(){
      this.$router.replace('/')
    }
  }
}
</script>

<style lang="less" scoped>
.component-title{
  margin: 50px 0;
  position: relative;
  padding-left: 140px;
  background: url(../../src/assets/images/home.png) no-repeat;
  background-size: 50px;
  background-position: 20px center;
  font-size: 46px;
  &:after{
    content: '';
    position: absolute;
    top: 16px;
    height: 40px;
    width: 1PX;
    left: 100px;
    background: #7e7e7e;
  }
}
</style>


