<template>
  <section class="antv-accordion">
    <div class="antv-accordion-item" v-for="(item, index) in list" :key="index">
      <div :class="['antv-accordion-header', item.expend && 'antv-accordion-header-active']" @click="switchExpend(item)" role="button" :tabindex="index">{{item | filterItemTitle}} {{item.expend}}<i class="d-icon-right"></i></div>
      <div :class="['antv-accordion-content', item.expend && 'antv-accordion-content-active']">
        <transition name="slide">
          <div class="antv-accordion-content-box" v-if="item.children&& item.expend">
            <ListItem class="antv-accordion-content-item" v-for="child in item.children" :onClick="()=>{}">{{child | filterItemTitle}}</ListItem>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'antv-accordion',
  props: {
    data: {
      type: Array,
      default: ()=>{
        return []
      }
    }
  },
  data(){
    return {
      list: []
    }
  },
  filters: {
    filterItemTitle(val) {
      return typeof val == 'object' ? val.value : val
    }
  },
  created(){
    this.initData()
  },
  methods: {
    initData(){
      this.list = this.data.map(item=>{
        if(item.expend === undefined) item.expend = false
        return Object.assign({},item)
      })
    },
    switchExpend(item){
      item.expend = !item.expend
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../../src/style/default.less';
  .antv-accordion{
    position: relative;
    border-top: 1@unit solid @border-color-base;
    &-header{
      position: relative;
      color: #000;
      font-size: 17*@unit;
      height: 44*@unit;
      line-height: 44*@unit;
      background-color: @fill-base;
      -webkit-box-sizing: content-box;
      box-sizing: content-box;
      padding-left: 15*@unit;
      padding-right: 3*@unit;
      border-bottom: 1*@unit solid @border-color-base;
      width: auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      outline: none;
      & > i {
        position: absolute;
        display: block;
        top: 0;
        right: 15*@unit;
        width: 15*@unit;
        height: 15*@unit;
        transition: transform .2s ease;
        transform-origin: 5*@unit 20*@unit;
      }
      &-active{
        & > i {
          transform: rotate(90deg);
          
        }
      }
    }
    &-content{
      overflow: hidden;
      background: #fff;
      transition: transform .2s ease;
      &-box{
        font-size: 15*@unit;
        color: #333;
        position: relative;
        border-bottom: 1*@unit solid #ddd;
      }
      &-item{
        border-top: 1*@unit solid #ddd;
      }
    }

  }
// .slide-enter-active, .slide-leave-active {
//     transition:  all .5s ease;
//   }
//   .slide-leave-to,.slide-enter{
//     max-height:0;
//   }
//   .slide-leave,.slide-enter-to{
//     max-height: 1350px;
//   }
</style>

