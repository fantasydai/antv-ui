<template>
  <section class="btn-wrap">
    <d-button class="btn" @click="handleClick1">alert modal</d-button>
    <d-button class="btn" @click="handleClick2">transparent mask modal</d-button>
    <d-button class="btn" @click="handleClick10">no mask modal</d-button>
    <d-button class="btn" @click="handleClick3">confirm modal</d-button>
    <d-button class="btn" @click="handleClick11">customized confirm modal</d-button>
    <d-button class="btn" @click="handleClick4">more than two buttons</d-button>
    <d-button class="btn" @click="handleClick9">promise modal</d-button>
    <d-button class="btn" @click="handleClick5">prompt modal</d-button>
    <d-button class="btn" @click="handleClick6">secure modal</d-button>
    <d-button class="btn" @click="handleClick7">login modal</d-button>
  </section>

</template>

<script>
export default {
  name:'toast',
  methods: {
    handleClick1(){
      this.$Modal.alert({
        title:'Title',
        message:'test alert modal'
      })
    },
    handleClick2(){
      this.$Modal.alert({
        title:'Title1',
        message:'test alert modal111',
        maskClosable:true
      })
    },
    handleClick3(){
      this.$Modal.confirm({
        title:'删除',
        message:'确认删除?',
        footer:[{text:'取消'},{text:'确定',onPress:this.onPress}]
      })
    },
    onPress(){
      this.$Toast({
        content: '已删除',
        duration:1000,
      })
    },
    handleClick4(){
      this.$Modal.confirm({
        title:'Confirm',
        message:'More than two button',
        footer:[{text:'Button1'},{text:'Button2'},{text:'Button3'}]
      })
    },
    handleClick5(){
      this.$Modal.prompt({
        title:'defaultValue',
        message:'defaultValue for prompt',
        type:'default',
        placeholders:'tap you number',
        // defaultValue:100
      })
    },
    handleClick6(){
      this.$Modal.prompt({
        title:'Password',
        message:'password for modal',
        type:'secure',
        // placeholder:'input your password',
        // defaultValue:100
      })
    },
    handleClick7(){
      this.$Modal.prompt({
        title:'Login',
        message:'Input login information',
        type:'login',
        placeholders:['input your username','input your password'],
        // defaultValue:100
      })
    },
    handleClick8(){
      this.$Toast({
        content: 'loading....',
        duration: 1000,
        position: 'bottom'
      })
    },
    handleClick9(){
      this.$Modal.confirm({
        title:'删除',
        message:'确认删除?',
        footer:[{text:'取消'},{text:'确定',onPress:this.onPormisePress}]
      })
    },
    handleClick10(){
      this.$Modal.alert({
        title:'Title1',
        message:'test alert modal111',
        transparent: true
      })
    },
    handleClick11(){
      this.$Modal.confirm({
        title:'删除',
        message:'确认删除?',
        footer:[{text:'取消',className:'cancel-btn'},{text:'确定',className:'confirm-btn',onPress:this.onPormisePress}]
      })
    },
    onPormisePress(){
      return new Promise((resolve)=>{
        this.$Toast({
          content: 'promise press',
          duration:1000,
        })
        setTimeout(resolve, 1000)
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
<style>
  .cancel-btn{
    color: #f4333c !important;
  }
  .confirm-btn{
    color: #6abf47 !important;
  }
</style>



