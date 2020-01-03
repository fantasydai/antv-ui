<template>
  <div class="lazyload">
    <ul class="lazyload-list">
      <li class="lazyload-item" v-for="item in list">
        <img v-lazy="item">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'lazyload',
  data() {
      return {
        list: [
          require('../../src/assets/images/imagePreview-1.jpg'),
          require('../../src/assets/images/imagePreview-2.jpg'),
          require('../../src/assets/images/imagePreview-3.jpg'),
          require('../../src/assets/images/imagePreview-4.jpg'),
          require('../../src/assets/images/imagePreview-1.jpg'),
          require('../../src/assets/images/imagePreview-2.jpg'),
          require('../../src/assets/images/imagePreview-3.jpg'),
          require('../../src/assets/images/imagePreview-4.jpg'),
        ]
      };
    }
}
</script>

<style lang="less" scoped>
  .lazyload{
    padding: 20px 40px;
    &-list{
      text-align: center;
    }
    &-item{
      margin: 0 auto;
      margin-bottom: 10px;
      background-color: #ddd;
      &>img{
        display: block;
        width: 100%;
      }
    }
  }
</style>