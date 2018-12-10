<template>
  <section class="btn-wrap">
    <d-button class="btn" @click="handleClick1">default</d-button>
    <d-button class="btn" @click="handleClick2">default2</d-button>
    <d-button class="btn" @click="handleClick3">toast icon</d-button>
  </section>

</template>

<script>
export default {
  name:'toast',
  methods: {
    handleClick1(){
      let toast = this.$Toast({
        content: '呵呵哒~~~',
        duration: 1000,
        mask:true
      })
    },
    handleClick2(){
      this.$Toast({
        content: '阿瓦达索命',
        duration: 1000,
        mask:false
      })
    },
    handleClick3(){
      this.$Toast({
        content: '阿瓦达索命',
        duration: 0,
        mask:false,
        icon:'loading'
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .btn-wrap{
    background-color: #f5f5f9;
    padding: 0 15px 40px;
    .btn{
      margin-top: 20px;
    }
  }
</style>


