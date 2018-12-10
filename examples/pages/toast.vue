<template>
  <section class="btn-wrap">
    <d-button class="btn" @click="handleClick1">default icon</d-button>
    <d-button class="btn" @click="handleClick2">nomask icon</d-button>
    <d-button class="btn" @click="handleClick3">toast success icon</d-button>
    <d-button class="btn" @click="handleClick4">toast fail icon</d-button>
    <d-button class="btn" @click="handleClick5">toast loading</d-button>
    <d-button class="btn" @click="handleClick6">toast image</d-button>
    <d-button class="btn" @click="handleClick7">top toast</d-button>
    <d-button class="btn" @click="handleClick8">bottom toast</d-button>
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
        content: 'Avada Kedavra',
        duration: 1000,
        mask:false
      })
    },
    handleClick3(){
      this.$Toast({
        content: 'Avada Kedavra',
        duration: 1000,
        icon:'success'
      })
    },
    handleClick4(){
      this.$Toast({
        content: 'Avada Kedavra',
        duration:1000,
        icon:'wrong'
      })
    },
    handleClick5(){
      this.$Toast({
        content: 'loading....',
        duration: 1000,
        icon:'loading'
      })
    },
    handleClick6(){
      this.$Toast({
        content: 'toast image',
        duration: 1000,
        image:'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'
      })
    },
    handleClick7(){
      this.$Toast({
        content: 'loading....',
        duration: 1000,
        position: 'top'
      })
    },
    handleClick8(){
      this.$Toast({
        content: 'loading....',
        duration: 1000,
        position: 'bottom'
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


