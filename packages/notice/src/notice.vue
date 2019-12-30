<template>
  <section class="antv-notice" role="alert">
    <div class="antv-notice-icon" aria-hidden="true" v-if="icon">
      <img :src="icon" alt="" srcset="">
    </div>
    <div :class="['antv-notice-content',icon && 'antv-notice-content-with-icon']" ref="notice"> 
      <div class="antv-notice-marquee-wrap">
        <div class="antv-notice-marquee" ref="marqueue">
          <slot></slot>
        </div>
      </div>
    </div>
    <div class="antv-notice-operation" role="button" v-if="$slots.operation">
      <slot name="operation"></slot>
    </div>
  </section>
</template>
<script>

export default {
  name: 'antv-notice',
  props: {
    icon: {
      type: String,
      default: ''
    },
    loop: Boolean,
    loppSpan: {
      type: Number,
      default: 800
    },
    duration: {
      type: Number,
      default: 4000
    }
  },
  data(){
    return {
      wrapWidth: 0,
      marqueueWidth: 0,
      distance: 0,
      step: 0,
    }
  },
  mounted() {
    this.initProps()
    requestAnimationFrame(this.translate)
  },
  methods: {
    initProps(){
      this.wrapWidth = this.$refs.notice.clientWidth
      this.marqueueWidth = this.$refs.marqueue.clientWidth
      this.distance = this.marqueueWidth - this.wrapWidth
      this.step = this.distance/(this.duration / 17)
    },
    translate(){
      let nextPosition = (parseFloat(this.$refs.marqueue.style.right)|| 0) + this.step
      this.$refs.marqueue.style.right = nextPosition + 'px'
      if(nextPosition <= this.distance) {
         requestAnimationFrame(this.translate)
      } else if(this.loop) {
        setTimeout(() => {
          this.$refs.marqueue.style.right = '0px'
          requestAnimationFrame(this.translate)
        }, this.loppSpan);
      }
    }
  },
}
</script>

<style lang="less" scoped>
@import '../../../src/style/default.less';
  .antv-notice{
    background: #fefcec;
    height: 36*@unit;
    overflow: hidden;
    font-size: 14*@unit;
    line-height: 36*@unit;
    color: #f76a24;
    display: flex;
    width: 100%;

    &-icon{
      margin-left: 15*@unit;
      display: flex;
      align-items: center;
      width: 15*@unit;
      &>img{
        width: 15*@unit;
        height: 15*@unit;
      }
    }
    &-content{
      flex: 1;
      width: auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin: auto 15*@unit;
      &-with-icon{
        margin-left: 5*@unit;
      }
    }
    &-marquee-wrap{
      overflow: hidden;
    }
    &-marquee{
      position: relative;
      display: inline-block;
      white-space: nowrap;
      padding: 0 7.5*@unit;
      right: 0;
    }
    &-operation{
      padding-right: 8*@unit;
      display: flex;
      align-items: center;
    }
  }
</style>