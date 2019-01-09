<template>
  <div class="d-picker-item">
    <div class="d-picker-mask"></div>
    <div class="d-picker-indicator" :style="{height: defaultHeight+'px'}"></div>
    <div class="d-picker-content" :style="{transform:'translateY('+ (defaultHeight * -activeIndex) + 'px)'}">
      <div v-for="(item,index) in  data" :key="index" :style="{height:defaultHeight+'px'}" :class="['d-picker-content-item',index === activeIndex && 'd-picker-content-item-selected']">{{typeof item === 'object' ? item.label:item }}</div>
    </div>
  </div>
</template>
<script>
const DEFAULT_HEIGHT = 34

export default {
  name: 'd-pickerItem',
  props:{
    styles:Object,
    defaultValue:[String,Number],
    data:{
      type: Array,
      default: ()=>[]
    }
  },
  data(){
    return {
      defaultHeight:DEFAULT_HEIGHT,
      activeItem: this.defaultValue,
      activeIndex:0
    }
  },
  mounted(){
    this.getDefaultValue()
  },
  methods: {
    getDefaultValue(){
      if(this.defaultValue) {
        this.data.forEach((item,index)=>{
          let value = typeof item === 'object' ? item.value : item
          value === this.defaultValue && (this.activeIndex = index)
        })
      }
    },
    bindSlide(){

    }
  },
  watch: {
    defaultValue: (val)=> {
      this.activeItem = val
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../src/style/default.less';
.d-picker-item{
  display: block;
  position: relative;
  height: 238* @unit;
  overflow: hidden;
  width: 100%;
  flex:1;
}
.d-picker-mask{
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 3;
  top: 0;
  height: 100%;
  margin: 0 auto;
  background-image: linear-gradient(180deg,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6)),linear-gradient(0deg,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6));
  background-position: top,bottom;
  background-size: 100% 102*@unit;
  background-repeat: no-repeat;
}
.d-picker-indicator{
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 3;
  box-sizing: border-box;
  height: 34*@unit;
  top: 102*@unit;

}
.d-picker-content{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1;
  padding: 102*@unit 0;
  transform: translate3d(0px, 0px, 0px);

  &-item{
    touch-action: manipulation;
    text-align: center;
    font-size: 16px;
    height: 34px;
    line-height: 34px;
    color: #000;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &-item-selected{
    font-size: 17px;
  }
}
</style>


