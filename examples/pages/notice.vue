<template>
  <section class="item-wrap">
    <antv-notice
      class="notice" 
      :icon="icon"
      :loop="true"
      :marqueeProps="marqueeProps"
    >
      Notice: The arrival time of incomes and transfers of Yu 'E Bao will be delayed during National Day.
    </antv-notice>
    <antv-notice 
      class="notice"
      :marqueeProps="marqueeProps"
    >
      Notice: The arrival time of incomes and transfers of Yu 'E Bao will be delayed during National Day.
      <img slot="operation" style="width:18PX;height: 18px; " src="../../src/assets/images/right.png" alt="" srcset="">
    </antv-notice>
    <antv-notice 
      class="notice"
      :marqueeProps="marqueeProps"
    >
      Notice: The arrival time of incomes and transfers
    </antv-notice>
    <antv-notice 
      class="notice"
      :marqueeProps="marqueeProps"
    >
      Closable demo for `actionText`.
      <span slot="operation" style="color: rgb(161, 161, 161);">不再提示</span>
    </antv-notice>
  </section>
</template>

<script>
export default {
  name: 'notice',
  data(){
    return {
      icon: require('../../src/assets/images/sound-fill.png'),
      marqueeProps: {
        loop: false,
        leading: 500,
        trailing: 800,
        style: {},
        action: '',
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .notice{
    margin-top: 20PX;
  }
</style>
