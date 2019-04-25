<template>
  <div>
    <header>
      <div class="demo-preivew-header-title">
        <d-navbar class="navbar" :leftContent="[{icon:'back',callback:clickBack}]">{{title}}</d-navbar>
      </div>
    </header>
    <section class="demo-preivew-content">
      <div class="demo-preivew-content-title">d-UI</div>
      <div class="demo-preivew-content-message">Vue移动端组件库</div>
      <div class="demo-preivew-content-items">
        <div class="demo-preivew-content-item" v-for="(page,index) in pageItems" :key="index" :style="{backgroundImage: 'url('+ require('../../src/assets/images/'+page.key+'.png')+ ')'}" @click="()=>{ $router.push(`/${page.key}`)}">{{page.name}}</div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name:'example-index',
  data(){
    return {
      time: '',
      title: 'd-UI',
      pageItems: [
        {
          name: 'ActionSheet',
          key: 'actionsheet'
        },{
          name: '徽标 Badge',
          key: 'badge'
        },{
          name: '按钮 Button',
          key: 'button'
        },{
          name: 'Checkbox',
          key: 'checkbox'
        },{
          name: 'DatePicker',
          key: 'datePicker'
        },{
          name: 'DatePickerView',
          key: 'datePickerView'
        },{
          name: '按钮 Button',
          key: 'button'
        },
      ]
    }
  },
  methods:{
    clickBack(){

    }
  }
}
</script>

<style lang="less" scoped>
.demo-preivew-header-title{
  padding-top: 18px;
  background: url(../../src/assets/images/tabbar.png) no-repeat;
  background-size: 100% 20px;
  .navbar{
    background: #2E2E31;
  }
}
.demo-preivew-content{
  background-color: #f5f5f9;
  color: rgba(0,0,0,.75);
  &-title{
    padding: 20px;
    font-size: 42px;
  }
  &-message{
    padding-left: 20px;
    font-size: 28px;
  }
  &-items{
    margin-top: 20px;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border-top: 1PX solid #ddd;
    background: #fff;
  }
  &-item{
    padding: 70px 0 20px;
    min-width: 33%;
    flex: 1;
    background-repeat: no-repeat;
    background-size: 40px;
    background-position: center 20px;
    text-align: center;
    font-size: 32px;
    border-right: 1PX solid #ddd;
    border-bottom: 1PX solid #ddd;
  }
}
</style>


