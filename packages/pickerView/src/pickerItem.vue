<template>
  <div class="d-picker-item">
    <div class="d-picker-mask" :style="{'background-size': `100% ${defaultTop}px`}"></div>
    <div class="d-picker-indicator" :style="Object.assign({},{height: defaultHeight+'px',top:`${defaultTop}px`},indicatorStyle)"></div>
    <div class="d-picker-content" :style="Object.assign({},{padding: `${defaultTop}px 0px`},styles)" ref="dragContent">
      <div v-for="(item,index) in  formatData" :key="index" :style="{height:defaultHeight+'px','line-height':defaultHeight+'px'}" :class="['d-picker-content-item',index === activeIndex && 'd-picker-content-item-selected']">{{typeof item === 'object' ? item.label:item}}</div>
    </div>
  </div>
</template>
<script>
import draggable from '../../../src/utils/slide.js'
import translateUtil from '../../../src/utils/translate.js'

const DEFAULT_HEIGHT = 34
const DEFAULT_TOP = 102
const TOTAL_HEIGHT = 238
export default {
  name: 'd-pickerItem',
  props:{
    styles:Object,
    indicatorStyle: {
      type: Object,
      default: ()=>{
        return {}
      }
    },
    format: String,
    defaultValue:[String,Number],
    slotIndex:Number,
    data:{
      type: Array,
      default: ()=>[]
    }
  },
  data(){
    return {
      defaultHeight: DEFAULT_HEIGHT,
      defaultTop:DEFAULT_TOP,
      activeIndex: 0,
      dragState: {
        start:0,
        startPos: 0,
        endPos:0,
        dragDistance:0,
        initialTranslateTop: 0
      },
    }
  },
  mounted(){
    this.getDefaultStyle()
    this.getDefaultValue()
    this.bindSlide()
  },
  watch: {
    data(val){
      this.getDefaultValue()
      this.$emit('dataChange',this.slotIndex,this.data.length ? this.data[this.activeIndex] : undefined)
    },
    defaultValue(){
      this.getDefaultValue()
    },
    activeIndex(to,from){
      to !== from && this.$emit('change',this.slotIndex,this.data.length ? this.data[this.activeIndex] : this.data[0])
    },
  },
  computed: {
    formatData:function(){
      return this.data.map(item=>{
        if(this.format){
          item.label ? (item.label = this.format.replace('${value}',item.label)) : (item = this.format.replace('${value}',item))
        }
        return item
      })
    }
  },
  methods: {
    getDefaultValue(){
      if(this.defaultValue) {
        let valueExist = false
        this.data.forEach((item,index)=>{
          let value = typeof item === 'object' ? item.value : item
          if(value === this.defaultValue) {
            this.activeIndex = index
            valueExist = translateUtil
          }
        })
        !valueExist && (this.activeIndex = '',this.activeIndex = 0)
        this.locateItem(-this.activeIndex)
      }
    },
    getDefaultStyle(){
      let customHeight = this.styles.height || this.indicatorStyle.height
      if(customHeight) {
        this.defaultHeight = parseInt(customHeight)
        this.defaultTop = (TOTAL_HEIGHT - this.defaultHeight)/2
      }
    },
    bindSlide(){
      let el = this.$refs.dragContent
      draggable(el,{
        start: (e) =>{
          this.dragState.start = new Date()
          this.dragState.startPos = e.pageY
          this.dragState.initialTranslateTop = this.defaultHeight * -this.activeIndex
        },
        drag: (e) => {
          this.dragState.dragDistance = e.pageY - this.dragState.startPos
          this.dragState.endPos = this.dragState.dragDistance + this.dragState.initialTranslateTop
          translateUtil.translateElement(el, null, this.dragState.endPos)
        },
        end: (e) => {
          if(!this.dragState.endPos) {
            this.dragState = {}
            return
          }
          let index = Math.round(this.dragState.endPos/this.defaultHeight)
          this.dragState = {}
          this.locateItem(index)
        }
      })
    },
    locateItem(index){
      index = Math.max(0,Math.min(this.data.length - 1,-index))
      let el = this.$refs.dragContent
      let translate = -this.defaultHeight * index
      translateUtil.translateElement(el, null, translate)
      this.activeIndex = index
    }
  },
}
</script>

<style lang="less" scoped>
@import '../../../src/style/default.less';
@import '../../../src/style/var.less';
.d-picker-item{
  display: block;
  position: relative;
  height: 238* @unit;
  overflow: hidden;
  width: 100%;
  flex:1;
  padding: 1*@unit 0;
  box-sizing: border-box;
}
.d-picker-mask{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 3;
  height: 100%;
  margin: 0 auto;
  background-image: linear-gradient(180deg,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6)),linear-gradient(0deg,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6));
  background-position: top,bottom;
  background-size: 100% 102*@unit;
  background-repeat: no-repeat;
  pointer-events: none;
}
.d-picker-indicator{
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 3;
  box-sizing: border-box;
  height: 34*@unit;
  top: 102*@unit;
  pointer-events: none;
  .borderLine('top',@fill-tap,0,0,0,0);
  .borderLine('bottom',@fill-tap,0,0,0,0);

}
.d-picker-content{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1;
  padding: 102*@unit 0;
  transition: transform ease-out .3s;
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


