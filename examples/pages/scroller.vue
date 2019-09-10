<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-10 19:16:53
 * @LastEditTime: 2019-09-10 19:16:53
 * @LastEditors: your name
 -->
<template>
  <div>
    <List header="Scroller" class="menu">
      <ListItem class="list-item" title="pullDownRefresh" extra="customer">
        <template slot="extra">
          <d-switch :checked="!!pullDownRefreshObj" v-model="pullDownRefreshObj" :onChange="onChangePullDown"></d-switch>
        </template>
      </ListItem>
      <ListItem class="list-item" title="pullUpLoad" extra="customer">
        <template slot="extra">
          <d-switch :checked="!!pullUpLoadObj" v-model="pullUpLoadObj" :onChange="onChangePullUp"></d-switch>
        </template>
      </ListItem>
    </List>
    <div class="scroller-box">
      <d-scroller class="wrapper"
        ref="scroller"
        :scrollbar="scrollbarObj"
        :pullDownRefresh="pullDownRefreshObj"
        :pullUpLoad="pullUpLoadObj"
        :startY="parseInt(startY)"
        @pullingDown="onPullingDown"
        @pullingUp="onPullingUp"
        :data="items"
        :infinite="true">
        <ul class="list-content">
          <li class="list-item" v-for="(item,index) in items" :key="index">{{item}}</li>
        </ul>
      </d-scroller>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        scrollbarObj:true,
        pullDownRefreshObj:false,
        pullUpLoadObj:false,
        startY: 0, // 纵轴方向初始化位置
        scrollToX: 0,
        scrollToY: 0,
        scrollToTime: 700,
        items: []
      }
    },
    mounted() {
      this.onPullingDown()
    },
    methods: {
      scrollTo() {
        this.$refs.scroller.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime)
      },
      getData() {
        return new Promise(resolve => {
          setTimeout(() => {
            const arr = []
            for (let i = 0; i < 15; i++) {
              arr.push(parseInt(Math.random()*10))
            }
            resolve(arr)
          }, 1000)
        })
      },
      onPullingDown() {
        this.getData().then(res => {
          this.items = res
        })
      },
      onPullingUp() {
        if(this.items.length > 30) {
          this.$refs.scroller.forceUpdate()
          return
        }
        this.getData().then(res => {
          this.items = this.items.concat(res)
        })
      },
      onChangePullDown(){
        this.pullDownRefreshObj = this.pullDownRefreshObj ? {
          threshold: 60,
          stop: 40,
        } : false
        this.rebuildScroll()

      },
      onChangePullUp(){
         this.pullUpLoadObj = this.pullUpLoadObj ?  {
          threshold: 1000,
          txt: {
            more: '',
            noMore: '没有更多数据了'
          }
        } : false
        this.rebuildScroll()
      },
      rebuildScroll() {
        this.$nextTick(() => {
          this.$refs.scroller.destroy()
          this.$refs.scroller.initScroll()
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .scroller-box {
    position: relative;
    height: 600px;
    border-top: 1PX solid #ddd;
    margin-top: 130px;
  }
  .menu{
    height: 200px;
    margin-top: 10px;
    background: #fff;
  }

</style>
