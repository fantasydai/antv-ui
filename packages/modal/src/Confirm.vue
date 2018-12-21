<template>
  <Modal :title="title" :message="message" :visible="visible" :maskClosable="maskClosable" :footer="footer"></Modal>
</template>
<script>
import Modal from './Modal.vue'
export default {
  name: 'd-modal-confirm',
  props: {
    title: String,
    message: String,
    visible: Boolean,
    maskClosable: Boolean,
    transparent: Boolean,
    onClose: {
      type: Function,
      default: ()=>{}
    },
    footer: {
      type: Array,
      default: ()=>{return [{text:'Cancel'},{text:'Ok'}]},
      validator:(val)=>{
        console.log(val)
        return val.length === 2
      }
    }
  },
  components:{
    Modal
  },
  methods: {
    onPress(item){
      if(item.onPress){
        item.onPress()
      } else {
        this.visible = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../src/style/default.less';
@import '../../../src/style/var.less';

.d-modal{
  &-mask{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    height: 100%;
    z-index: @modal-zindex;
    background-color: @fill-mask;
  }
  &-wrap{
    position: fixed;
    overflow: auto;
    height: 100%;
    z-index: @modal-zindex;
    -webkit-overflow-scrolling: touch;
    outline: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  &-content{
    width: 270px;
    position: relative;
    background-color: @fill-base;
    border: 0;
    background-clip: padding-box;
    text-align: center;
    overflow: hidden;
    border-radius: 7*@unit;
    padding-top: 15*@unit;
  }
  &-header{
    padding: 6px 15px 15px;
  }
  &-title{
    margin: 0;
    font-size: 18*@unit;
    line-height: 1;
    color: @color-text-base;
    text-align: center;
  }
  &-body{
    padding: 0 15*@unit 15*@unit;
    font-size: 15*@unit;
    color: @color-text-caption;
    height: 100%;
    line-height: 1.5;
    overflow: auto;
    &-content{
      zoom: 1;
      overflow: hidden;
    }
  }
  &-button{
    position: relative;
    border-top: 1px solid #ddd;
    box-sizing: border-box;
    text-align: center;
    text-decoration: none;
    outline: none;
    color: @color-primary;
    font-size: 18*@unit;
    height: 50*@unit;
    line-height: 50*@unit;
    display: block;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>


