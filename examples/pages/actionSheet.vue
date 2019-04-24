<template>
  <section class="btn-wrap">
    <d-button class="btn" @click="handleClick1">showActionSheet</d-button>
    <d-button class="btn" @click="handleClick2">showActionSheet with bedge</d-button>
     <d-button class="btn" @click="handleClick6">showActionSheet Custom</d-button>
    <d-button class="btn" @click="handleClick3">showActionSheet promise</d-button>
    <d-button class="btn" @click="handleClick4">showShareActionSheet</d-button>
    <d-button class="btn" @click="handleClick5">showShareActionSheet Multiple</d-button>
  </section>

</template>

<script>
export default {
  name:'toast',
  methods: {
    handleClick1(){
      this.$ActionSheet.showActionSheet({
        title: 'Title',
        message: 'test ActionSheet',
        options: ['Operation1','Operation2','Operation3','Operation3','Cancel',],
        cancelIndex: 4,
        destructiveIndex: 3,
        callback:(index,btn)=>{
          this.$Toast(`click ${btn}`)
        }
      })
    },
    handleClick2(){
      this.$ActionSheet.showActionSheet({
        title: 'Title',
        message: 'test ActionSheet',
        options: [{text:'Operation1'},{text:'Operation2',badge:'99+'},{text:'Operation3',badge:'热门'},{text:'Operation4',badge:'···'},{text:'Cancel'}],
        cancelIndex: 4,
      })
    },
    handleClick3(){
      this.$ActionSheet.showActionSheet({
        title: 'Title',
        message: 'test ActionSheet',
        options: ['Operation1','Operation2','Operation3','Cancel',],
        cancelIndex: 3,
        callback:(index,btn)=>{
          return new Promise((resolve)=>{
            this.$Toast('2s后关闭')
            setTimeout(resolve, 2000);
          })
        }
      })
    },
    handleClick4(){
     this.$ActionSheet.showShareActionSheet({
        title: 'Title',
        message: 'test ShareActionSheet',
        options: [
          { url: 'https://github.com/fantasydai/d-ui/blob/dev/0.0.1/src/assets/images/wechat.png?raw=true', title: '微信' },
            { url: 'https://github.com/fantasydai/d-ui/blob/dev/0.0.1/src/assets/images/pengyouquan.png?raw=true', title: '分享到朋友圈' },
            { url: 'https://github.com/fantasydai/d-ui/blob/dev/0.0.1/src/assets/images/qq.png?raw=true', title: 'QQ' },
            { url: 'https://github.com/fantasydai/d-ui/blob/dev/0.0.1/src/assets/images/weibo.png?raw=true', title: '新浪微博' },
            { url: 'https://github.com/fantasydai/d-ui/blob/dev/0.0.1/src/assets/images/zhifubao.png?raw=true', title: '支付宝' },
            { url: 'https://github.com/fantasydai/d-ui/blob/dev/0.0.1/src/assets/images/link.png?raw=true', title: '复制链接' }
        ],
        cancelIndex: 4,
        destructiveIndex: 3,
      })
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
  .btn-wrap{
    background-color: #f5f5f9;
    padding: 0 15px 40px;
    .btn{
      margin-top: 20px;
    }
  }
</style>
<style>
  .cancel-btn{
    color: #f4333c !important;
  }
  .confirm-btn{
    color: #6abf47 !important;
  }
</style>



