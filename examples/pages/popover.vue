<template>
  <section class="wrap">
    <d-popover :visible="visible" :position="position" :mask="mask" :maskClosable="maskClosable"></d-popover>
    <d-button class="btn" @click="handleClick('left')">popover bottomRight</d-button>
    <d-button class="btn" @click="handleClick('right')">popover bottomLeft</d-button>
    <d-button class="btn" @click="handleClick('top')">popover bottom</d-button>
    <d-button class="btn" @click="handleClick('bottom')">popover left</d-button>
    <d-button class="btn" @click="handleClick1('left')">popover right</d-button>
    <d-button class="btn" @click="handleClick1('right')">popover top</d-button>
    <d-button class="btn" @click="handleClick1('top')">popover topLeft</d-button>
    <d-button class="btn" @click="handleClick1('bottom')">popover topRight</d-button>
  </section>
</template>

<script>
export default {
  name:'drawer',
  data(){
    return {
      visible:false,
      position: 'bottomRight',
      mask:true,
      maskClosable:true
    }
  },
  methods: {
    handleClick(position){
      this.drawerMode = 'overlay'
      this.position = position
      this.showDrawer = !this.showDrawer
    },
    handleClick1(position){
      this.drawerMode = 'push'
      this.position = position
      this.showDrawer = !this.showDrawer
    },
    handleClick5(){
     this.$ActionSheet.showShareActionSheet({
        title: 'Title',
        message: 'test ShareActionSheet',
        options: [
          [
            { url: 'https://github.com/fantasydai/d-ui/blob/dev/0.0.1/src/assets/images/wechat.png?raw=true', title: '微信' },
            { url: 'https://github.com/fantasydai/d-ui/blob/dev/0.0.1/src/assets/images/pengyouquan.png?raw=true', title: '分享到朋友圈' },
            { url: 'https://github.com/fantasydai/d-ui/blob/dev/0.0.1/src/assets/images/qq.png?raw=true', title: 'QQ' },
            { url: 'https://github.com/fantasydai/d-ui/blob/dev/0.0.1/src/assets/images/weibo.png?raw=true', title: '新浪微博' },
            { url: 'https://github.com/fantasydai/d-ui/blob/dev/0.0.1/src/assets/images/zhifubao.png?raw=true', title: '支付宝' },
            { url: 'https://github.com/fantasydai/d-ui/blob/dev/0.0.1/src/assets/images/link.png?raw=true', title: '复制链接' }
          ],
          [
            { url: 'https://github.com/fantasydai/d-ui/blob/dev/0.0.1/src/assets/images/wechat.png?raw=true', title: '微信' },
            { url: 'https://github.com/fantasydai/d-ui/blob/dev/0.0.1/src/assets/images/pengyouquan.png?raw=true', title: '分享到朋友圈' },
          ],
        ],
        cancelIndex: 4,
        destructiveIndex: 3
      })
    },
    handleClick6(){
      this.$ActionSheet.showActionSheet({
        title: 'Title',
        message: 'test ActionSheet',
        options: [{text:'Operation1'},{text:'Operation2',color:'#ff5b05',},{text:'Operation3',color:'#6abf47'},{text:'Operation4',color:'#108ee9'},{text:'Cancel'}],
        cancelIndex: 4,
      })
    },
  }
}
</script>
<style lang="less" scoped>
  .drawer{
    height: 100vh;
    .left-sidebar{
      width: 260px;
      background: #FFF;
      height: 100%;
    }
  }
  .drawer-vertical{
    height: 100vh;
    .left-sidebar{
      background: #FFF;
      width: 100%;
    }
  }
  .wrap{
    background-color: #f5f5f9;
    .btn{
      margin: 20px;
    }
  }
</style>



