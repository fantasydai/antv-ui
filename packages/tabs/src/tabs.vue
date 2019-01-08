<template>
  <div :class="['d-tabs',`d-tabs-${tabBarPosition}`]"></div>
</template>
<script>
export default {
  props:{
    tabBarPosition:{
      type: String,
      default: 'top',
      validator(val){
        return ['left','right','top','bottom'].indexOf(val) > -1
      }
    }
  }
}
</script>

