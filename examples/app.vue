<template>
  <div class="root">
    <Header></Header>
    <Title v-if="title !== 'Index' && title !== 'App'" :title="title"></Title>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/header'
import Title from './components/component-title'
export default {
  name: 'App',
  data(){
    return {
      title: 'App'
    }
  },
  components: {
    Header,
    Title
  },
  watch:{
    '$route'(route){
      this.title = route && route.name
    }
  }
}
</script>

<style lang="less">
.root{
  max-width: 750px;
  margin: 0 auto;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
