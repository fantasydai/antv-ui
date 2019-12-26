<template>
  <div class="wrap">
    <section class="demo-preivew-content">
      <div class="demo-preivew-content-title">Antv UI</div>
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
          name: 'Carousel',
          key: 'carousel'
        },{
          name: 'DatePicker',
          key: 'datePicker'
        },{
          name: 'DatePickerView',
          key: 'datePickerView'
        },{
          name: '抽屉 Drawer',
          key: 'drawer'
        },{
          name: ' ImagePreview',
          key: 'imagePreview'
        },{
          name: '列表 List',
          key: 'list'
        },{
          name: '弹窗 Modal',
          key: 'modal'
        },{
          name: '导航栏 Navbar',
          key: 'navbar'
        },{
          name: '选择器 Picker',
          key: 'picker'
        },{
          name: 'PickerView',
          key: 'pickerView'
        },{
          name: '气泡 Popover',
          key: 'popover'
        },{
          name: '滚动 Scroller',
          key: 'scroller'
        },{
          name: 'SwipeAction',
          key: 'swipeAction'
        },{
          name: '开关 Switch',
          key: 'switch'
        },{
          name: '提示 Toast',
          key: 'toast'
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
.demo-preivew-content{
  background-color: #f5f5f9;
  color: rgba(0,0,0,.75);
  &-title{
    padding: 40px 20px;
    font-size: 50px;
  }
  &-message{
    padding-left: 20px;
    font-size: 28px;
  }
  &-items{
    margin-top: 40px;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border-top: 1PX solid #ddd;
    background: #fff;
  }
  &-item{
    padding: 90px 0 40px;
    min-width: 33%;
    max-width: 33%;
    flex: 1;
    background-repeat: no-repeat;
    background-size: 40px;
    background-position: center 30px;
    text-align: center;
    font-size: 32px;
    border-right: 1PX solid #ddd;
    border-bottom: 1PX solid #ddd;
  }
}
</style>


