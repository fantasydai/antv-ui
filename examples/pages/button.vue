<template>
  <section class="btn-wrap">
    <d-button class="btn">default</d-button>
    <d-button class="btn" disabled>default disabled</d-button>
    <d-button class="btn" type="primary">primary</d-button>
    <d-button class="btn" type="primary" disabled>primary disabled</d-button>
    <d-button class="btn" type="warning" >warning</d-button>
    <d-button class="btn" type="warning" disabled>warning disabled</d-button>
    <d-button class="btn" type="primary" loading>loading button</d-button>
    <d-button class="btn" type="primary" icon="sousuo">icon button</d-button>
    <d-button class="btn" type="primary" inline>inline button</d-button>
    <d-button class="btn" type="primary" inline icon="sousuo">inline button</d-button>
    <d-button class="btn" type="ghost" inline>ghost button</d-button>
    <d-button class="btn" type="ghost" inline disabled>ghost disabled</d-button>
    <d-button class="btn" type="primary" inline size="small">small</d-button>
    <d-button class="btn" inline size="small">small</d-button>
  </section>

</template>

<script>
export default {

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


