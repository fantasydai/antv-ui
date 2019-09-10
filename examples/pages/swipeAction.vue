<!--
 * @Description: In User Settings Edit
 * @Author: daiyueyue
 * @Date: 2019-04-24 17:53:04
 * @LastEditTime: 2019-09-10 18:43:34
 * @LastEditors: Please set LastEditors
 -->
<template>
  <section class="item-wrap">
    <List header="swiperAction">
      <d-swipeAction :right="right" :left="left">
        <ListItem class="list-item" arrow="right" >left and right swipeAction</ListItem>
      </d-swipeAction>
      <d-swipeAction :left="left">
        <ListItem class="list-item" arrow="right" >left swipeAction</ListItem>
      </d-swipeAction>
      <d-swipeAction :right="right">
        <ListItem class="list-item" arrow="right" >right swipeAction</ListItem>
      </d-swipeAction>
      <d-swipeAction :right="right1">
        <ListItem class="list-item" arrow="right" >callback swipeAction</ListItem>
      </d-swipeAction>
    </List>
  </section>

</template>

<script>
export default {
  name:'swipeAction',
  data(){
    return {
      right: [{
        text: '取消',
        onPress(){console.log('取消')},
        style: {
          'background-color': 'rgb(221, 221, 221)',
          color: '#fff'
        }
      },{
        text: '删除',
        onPress(){console.log('删除')},
        style: {
          'background-color': 'rgb(244, 51, 60)',
          color: '#fff'
        }
      }],
      right1: [{
        text: '取消',
        onPress:() =>this.$Toast('取消'),
        style: {
          'background-color': 'rgb(221, 221, 221)',
          color: '#fff'
        }
      },{
        text: '删除',
        onPress:() =>this.$Toast('删除'),
        style: {
          'background-color': 'rgb(244, 51, 60)',
          color: '#fff'
        }
      }],
      left: [{
        text: '取消',
        onPress(){console.log('取消')},
        style: {
          'background-color': 'rgb(221, 221, 221)',
          color: '#fff'
        }
      },{
        text: '删除dddd',
        onPress(){console.log('删除')},
        style: {
          'background-color': 'rgb(244, 51, 60)',
          color: '#fff'
        }
      }]
    }
  }
}
</script>
<style lang="less" scoped>
  .item-wrap{
    background-color: #f5f5f9;
    padding-bottom: 40px;
  }
</style>


