<template>
  <section class="wrap">
    <d-drawer :class="[['left','right'].indexOf(position) > -1 ?'drawer':'drawer-vertical']" :visible="showDrawer" :position="position" :mode="drawerMode"  v-model="showDrawer">
      <List slot="side" header="Basic Style" class="left-sidebar">
        <ListItem class="list-item" >Title</ListItem>
        <ListItem class="list-item">Title</ListItem>
        <ListItem class="list-item" title="Title" extra="extra text"></ListItem>
        <ListItem class="list-item" >Title,Title,Title,Title,Title,Title,Title,Title,Title, Title,Title,Title,</ListItem>
        <d-button class="btn" @click="()=>{this.showDrawer = false}">click to hidden</d-button>
      </List>
      <d-button class="btn" @click="handleClick('left')">drawer left</d-button>
      <d-button class="btn" @click="handleClick('right')">drawer right</d-button>
      <d-button class="btn" @click="handleClick('top')">drawer top</d-button>
      <d-button class="btn" @click="handleClick('bottom')">drawer bottom</d-button>
      <d-button class="btn" @click="handleClick1('left')">push drawer left</d-button>
      <d-button class="btn" @click="handleClick1('right')">push drawer right</d-button>
      <d-button class="btn" @click="handleClick1('top')">push drawer top</d-button>
      <d-button class="btn" @click="handleClick1('bottom')">push drawer bottom</d-button>
    </d-drawer>
    <d-button class="btn" @click="handleClick1('bottom')">push drawer bottom</d-button>
  </section>

</template>

<script>
export default {
  name:'drawer',
  data(){
    return {
      showDrawer:false,
      position:'left',
      drawerMode:'overlay'
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
<style>
  .cancel-btn{
    color: #f4333c !important;
  }
  .confirm-btn{
    color: #6abf47 !important;
  }
</style>



