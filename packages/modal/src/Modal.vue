<template>
  <div class="d-modal">
    <div class="d-modal-mask"></div>
    <div class="d-modal-content">
      <div class="d-modal-header" v-if="title">
        <div class="d-modal-title">{{title}}</div>
      </div>
      <div class="d-modal-body" v-if="message">
        <div class="d-modal-body-content" v-html="message"></div>
        <slot name="message"></slot>
      </div>
      <div class="d-modal-footer">
        <div :class="['d-modal-buttons',footer.length === 2 ? 'd-modal-buttons-flex' : 'd-modal-buttons-normal']">
          <a class="d-modal-button" v-for="(item,index) in footer" :key="index" role="button" @click="item.onPress || onPress">{{item.text}}</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'd-modal',
  props: {
    title: String,
    message: String,
    visible: Boolean,
    maskClosable: Boolean,
    transparent: Boolean,
    onClose: {
      type: Function,
      default: ()=>{}
    },
    footer: {
      type: Array,
      default: [{text:'确定',onPress:()=>{}}]
    }
  },
  methods: {
    onPress(event){
      console.log(event)
    }
  }
}
</script>

