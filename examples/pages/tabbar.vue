<template>
  <section class="item-wrap">
    <div class="content" ref=page>
      <div v-for="tab in tabbars" :key="tab.title" class="content-page">
        {{`Clicked “${tab.title}” tab， show “${tab.title}” information`}}
        <a class="hide-btn" @click="switchHide">Click to show/hide tab-bar</a>
      </div>
    </div>
    <antv-tabbar class="tabbar" :hidden="hide">
      <antv-tabbar-item v-for="tab in tabbars" 
        :key="tab.title" 
        :title="tab.title" 
        :icon="tab.icon" 
        :selectedIcon="tab.selectedIcon"
        :dot="tab.dot"
        :badge="tab.badge"
        :selected="tab.title === activeTab"
        :onPress="onPress">
      </antv-tabbar-item>
    </antv-tabbar>
  </section>
</template>
<script>

import translateUtil from '../../src/utils/translate.js'

export default {
  name: 'tabbar',
  data(){
    return {
      activeTab: 'android',
      hide: false,
      tabbars: [
        {
          title: 'android',
          icon: require('../../src/assets/images/android.png'),
          selectedIcon: require('../../src/assets/images/android-fill.png'),
          badge: 1
        },
        {
          title: 'apple',
          icon: require('../../src/assets/images/apple.png'),
          selectedIcon: require('../../src/assets/images/apple-fill.png'),
          dot: true
        },
        {
          title: 'windows',
          icon: require('../../src/assets/images/windows.png'),
          selectedIcon: require('../../src/assets/images/windows-fill.png'),
        },
        {
          title: 'github',
          icon: require('../../src/assets/images/github.png'),
          selectedIcon: require('../../src/assets/images/github-fill.png'),
        }
      ]
    }
  },
  methods: {
    switchHide(){
      this.hide = !this.hide
    },
    onPress(title){
      this.activeTab = title
      let pageIndex = this.tabbars.findIndex((tab, index)=>{
        return tab.title === title
      })
      if(pageIndex >=0) {
        this.$refs.page.style.transform=`translateX(-${pageIndex*100}%)`
      }
    }
  },
}
</script>

<style lang="less">
.item-wrap{
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f9;
  padding-bottom: 40px;
  height: 600px;
  overflow: hidden;
}
.content{
  flex:1;
  display: flex;
  transition: all .3s ease;
  &-page{
    padding-top: 200px;
    text-align: center;
    min-width: 100%;
    float: left;
  }
  .hide-btn{
    display: block;
    margin-top: 40px;
    margin-bottom: 20px;
    color: rgb(16, 142, 233);
  }
}
.tabbar{
  margin-top: 100px;
}
  
</style>