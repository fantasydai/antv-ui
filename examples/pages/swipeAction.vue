<template>
  <section class="item-wrap">
    <List header="swiperAction">
      <d-swipeAction :right="right">
        <ListItem class="list-item" arrow="right" >right swipeAction</ListItem>
      </d-swipeAction>
      <ListItem class="list-item" arrow="right" :onClick="()=>{}">Title</ListItem>
      <ListItem class="list-item" title="Title" :onClick="()=>{}" extra="extra text" arrow="right"></ListItem>
      <ListItem class="list-item" arrow="right">Title,Title,Title,Title,Title,Title,Title,Title,Title, Title,Title,Title,</ListItem>
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


