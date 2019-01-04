<template>
  <section class="navbar-wrap">
    <d-navbar class="navbar">Navbar</d-navbar>
    <d-navbar class="navbar" :leftContent="[{icon:'back',callback:clickBack}]">Navbar</d-navbar>
    <d-navbar class="navbar" :leftContent="[{icon:'back',text:'返回',callback:clickBack}]">Navbar</d-navbar>
    <d-navbar class="navbar" :leftContent="[{text:'返回',callback:clickBack}]">Navbar</d-navbar>
    <d-navbar class="navbar" :leftContent="[{icon:'back',text:'返回',callback:clickBack}]" :rightContent="[{icon:'more',callback:clickMore}]">Navbar</d-navbar>
    <d-navbar class="navbar" :leftContent="[{icon:'back',callback:clickBack}]" :rightContent="[{icon:'sousuo',callback:clickSearch},{icon:'more',callback:clickMore}]">Navbar</d-navbar>
    <d-navbar class="navbar" :leftContent="[{icon:'back',text:'返回',callback:clickBack}]" :rightContent="[{icon:'more',callback:clickMore}]">
      <span><span class="custom-navbar-title">Custom</span> Title</span>
    </d-navbar>

    <d-navbar class="navbar custom-navbar" :leftContent="[{icon:'back',style: {color:'#108ee9'}}]" :rightContent="[{icon:'sousuo',style: {color:'#108ee9'}},{icon:'more',style: {color:'#108ee9'}}]">Custom Navbar</d-navbar>
  </section>

</template>

<script>
export default {
  methods:{
    clickBack(){
      this.$Toast({
        content: 'click back',
        duration: 1000,
        mask:true
      })
    },
    clickMore(){
      this.$Toast({
        content: 'click more',
        duration: 1000,
        mask:true
      })
    },
    clickSearch(){
      this.$Toast({
        content: 'click search',
        duration: 1000,
        mask:true
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .navbar-wrap{
    background-color: #f5f5f9;
    .navbar{
      margin-top: 20px;
    }
    .custom-navbar{
      background: #fff;
      color: #000;
    }
    .custom-navbar-title{
      color: #6abf47;
      font-size: 14px;
    }
  }
</style>


