<template>
  <section class="item-wrap">
    <List header="Basic Carousel">
      <antv-carousel class="carousel">
        <antv-carousel-item v-for="(img, index) in imgs" :key="index">
          <img :src="`https://zos.alipayobjects.com/rmsportal/${img}.png`" alt="" srcset="">
        </antv-carousel-item>
      </antv-carousel>
    </List>
    <List header="AutoPlay Carousel">
      <antv-carousel class="carousel" :autoplay="true" :infinite="true">
        <antv-carousel-item v-for="(img, index) in imgs" :key="index">
          <img :src="`https://zos.alipayobjects.com/rmsportal/${img}.png`" alt="" srcset="">
        </antv-carousel-item>
      </antv-carousel>
    </List>
    <List header="Default Index Carousel">
      <antv-carousel class="carousel" :autoplay="true" :infinite="true" :selectedIndex="2">
        <antv-carousel-item v-for="(img, index) in imgs" :key="index">
          <img :src="`https://zos.alipayobjects.com/rmsportal/${img}.png`" alt="" srcset="">
        </antv-carousel-item>
      </antv-carousel>
    </List>
    <List header="Hide Indicator Carousel">
      <antv-carousel class="carousel" :autoplay="true" :infinite="true" :indicator="false">
        <antv-carousel-item v-for="(img, index) in imgs" :key="index">
          <img :src="`https://zos.alipayobjects.com/rmsportal/${img}.png`" alt="" srcset="">
        </antv-carousel-item>
      </antv-carousel>
    </List>
  </section>
</template>
<script>
export default {
  name: 'antv-carousel-example',
  data(){
    return {
      imgs: [
        'AiyWuByWklrrUDlFignR',
        'TekJlZRVCjLFexlOCuWn',
        'IJOtIlfsYdTyaDTRVrLI'
      ]
    }
  }
}
</script>

<style lang="less" scoped>
  .item-wrap{
    background-color: #f5f5f9;
    padding-bottom: 40px;
  }
  .carousel{
    margin: 0 auto;
    height: 184PX;
    width: 345PX;
  }
</style>