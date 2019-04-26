<template>
  <section class="wrap">
    <d-popover :visible="visible2" v-model="visible2" :position="position" :mask="mask" :maskClosable="maskClosable">
      <div class="content" slot="content" @click="closePopover('visible2')">
        <div><i class="d-icon-scan"></i>扫码</div>
        <div><i class="d-icon-qrcode"></i>二维码</div>
        <div><i class="d-icon-question-circle"></i>帮助</div>
      </div>
      <d-button class="btn" @click="handleClick('visible2','bottom')">popover bottom</d-button>
    </d-popover>
    <d-popover :visible="visible" v-model="visible" :position="position" :mask="mask" :maskClosable="maskClosable">
      <div class="content" slot="content" @click="closePopover('visible')">
        <div><i class="d-icon-scan"></i>扫码</div>
        <div><i class="d-icon-qrcode"></i>二维码</div>
        <div><i class="d-icon-question-circle"></i>帮助</div>
      </div>
      <d-button class="btn" @click="handleClick('visible','bottomRight')">popover bottomRight</d-button>
    </d-popover>
    <d-popover :visible="visible1" v-model="visible1" :position="position" :mask="mask" :maskClosable="maskClosable">
      <div class="content" slot="content" @click="closePopover('visible1')">
        <div><i class="d-icon-scan"></i>扫码</div>
        <div><i class="d-icon-qrcode"></i>二维码</div>
        <div><i class="d-icon-question-circle"></i>帮助</div>
      </div>
      <d-button class="btn" @click="handleClick('visible1','bottomLeft')">popover bottomLeft</d-button>
    </d-popover>
    <d-popover :visible="visible5" v-model="visible5" :position="position" :mask="mask" :maskClosable="maskClosable">
      <div class="content" slot="content" @click="closePopover('visible5')">
        <div><i class="d-icon-scan"></i>扫码</div>
        <div><i class="d-icon-qrcode"></i>二维码</div>
        <div><i class="d-icon-question-circle"></i>帮助</div>
      </div>
      <d-button class="btn" @click="handleClick('visible5','top')">popover top</d-button>
    </d-popover>
    <d-popover :visible="visible6" v-model="visible6" :position="position" :mask="mask" :maskClosable="maskClosable">
      <div class="content" slot="content" @click="closePopover('visible6')">
        <div><i class="d-icon-scan"></i>扫码</div>
        <div><i class="d-icon-qrcode"></i>二维码</div>
        <div><i class="d-icon-question-circle"></i>帮助</div>
      </div>
      <d-button class="btn" @click="handleClick('visible6','topLeft')">popover topLeft</d-button>
    </d-popover>
    <d-popover :visible="visible7" v-model="visible7" :position="position" :mask="mask" :maskClosable="maskClosable">
      <div class="content" slot="content" @click="closePopover('visible7')">
        <div><i class="d-icon-scan"></i>扫码</div>
        <div><i class="d-icon-qrcode"></i>二维码</div>
        <div><i class="d-icon-question-circle"></i>帮助</div>
      </div>
      <d-button class="btn" @click="handleClick('visible7','topRight')">popover topRight</d-button>
    </d-popover>
    <d-popover :visible="visible3" v-model="visible3" :position="position" :mask="mask" :maskClosable="maskClosable" :bgColor="bgColor">
      <span class="small-content" slot="content" @click="closePopover('visible3')">popover</span>
      <d-button class="btn" @click="handleClick('visible3','left')">popover left</d-button>
    </d-popover>
    <d-popover :visible="visible4" v-model="visible4" :position="position" :mask="mask" :maskClosable="maskClosable" :bgColor="bgColor">
      <span class="small-content" slot="content" @click="closePopover('visible4')">popover</span>
      <d-button class="btn" @click="handleClick('visible4','right')">popover right</d-button>
    </d-popover>
  </section>
</template>

<script>
export default {
  name:'drawer',
  data(){
    return {
      visible:false,
      visible1:false,
      visible2:false,
      visible3: false,
      visible4: false,
      visible5: false,
      visible6: false,
      visible7: false,
      visible8: false,
      bgColor:'#35495e',
      position: 'bottomRight',
      mask:true,
      maskClosable:true
    }
  },
  methods: {
    handleClick(type,position){
      this[type] = false
      this.position = position
      this[type] = true
    },
   closePopover(type){
     console.log(type,this[type])
     this[type] = false
     console.log(this.visible)
   }
  }
}
</script>
<style lang="less" scoped>
  .wrap{
    .content{
      width: 120PX;
      background: #fff;
      padding: 5PX;
      &>div{
        height: 25PX;
        line-height: 25PX;
        padding: 5PX 0;
        &:not(:last-child){
          border-bottom: 1PX solid #ddd;
        }

        &>i {
          margin-right: 10PX;
        }
      }
    }
    .small-content{
      display: inline-block;
      background: #35495e;
      color: #fff;
      padding: 5PX;
    }
    background-color: #f5f5f9;
    .btn{
      margin: 20PX 80px;
    }
  }
</style>



