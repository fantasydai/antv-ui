<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-04-24 17:53:04
 * @LastEditTime: 2019-09-10 19:32:03
 * @LastEditors: Please set LastEditors
 -->
<template>
  <section class="item-wrap">
    <List header="Switch">
      <ListItem class="list-item"  extra="customer" :title="value1?'On':'Off'">
        <template slot="extra">
          <d-switch :checked="value1" v-model="value1" :onChange="onChange"></d-switch>
        </template>
      </ListItem>
      <ListItem class="list-item"  extra="customer" :title="value2?'On':'Off'">
        <template slot="extra">
          <d-switch :checked="value2" v-model="value2" :onChange="onChange"></d-switch>
        </template>
      </ListItem>
      <ListItem class="list-item"  extra="customer" :title="value3?'Disable On':'Disable Off'">
        <template slot="extra">
          <d-switch :checked="value3" disabled v-model="value3" :onChange="onChange"></d-switch>
        </template>
      </ListItem>
      <ListItem class="list-item"  extra="customer" :title="value4?'Disable On':'Disable Off'">
        <template slot="extra">
          <d-switch :checked="value4" disabled v-model="value4" :onChange="onChange"></d-switch>
        </template>
      </ListItem>
      <ListItem class="list-item" extra="customer" :title="value5?'Color on':'Color off'">
        <template slot="extra">
          <d-switch :checked="value5" color="#C60A1E"  v-model="value5" :onChange="onChange" :onClick="onClick"></d-switch>
        </template>
      </ListItem>
      <ListItem class="list-item" extra="customer" :title="value6?'Rectangle On':'Rectangle Off'">
        <template slot="extra">
          <d-switch :checked="value6" types="rectangle"  v-model="value6" :onChange="onChange" :onClick="onClick"></d-switch>
        </template>
      </ListItem>
      <ListItem class="list-item" extra="customer" :title="value7?'Rectangle On':'Rectangle Off'">
        <template slot="extra">
          <d-switch :checked="value7" types="rectangle" v-model="value7" :onChange="onChange" :onClick="onClick"></d-switch>
        </template>
      </ListItem>
      <ListItem class="list-item" extra="customer" :title="value8?'Rectangle Disable On':'Rectangle Disable Off'">
        <template slot="extra">
          <d-switch :checked="value8" disabled types="rectangle" v-model="value8" :onChange="onChange" :onClick="onClick"></d-switch>
        </template>
      </ListItem>
      <ListItem class="list-item" extra="customer" :title="value9?'Rectangle Disable On':'Rectangle Disable Off'">
        <template slot="extra">
          <d-switch :checked="value9" disabled types="rectangle" v-model="value9" :onChange="onChange" :onClick="onClick"></d-switch>
        </template>
      </ListItem>
      <ListItem class="list-item" extra="customer" :title="value10?'Rectangle Color On':'Rectangle Color Off'">
        <template slot="extra">
          <d-switch :checked="value10" color="#C60A1E" types="rectangle" v-model="value10" :onChange="onChange" :onClick="onClick"></d-switch>
        </template>
      </ListItem>
    </List>
  </section>
</template>

<script>
export default {
  name:'checkbox',
  data(){
    return {
      value1:false,
      value2:true,
      value3:false,
      value4:true,
      value5:true,
      value6:false,
      value7:true,
      value8:false,
      value9:true,
      value10:true,
    }
  },
  watch: {
    // currentValue(to,from){
    // }
  },
  methods: {
    onChange(){
    },
    onClick(){
      alert('disabled click callback')
    }
  }
}
</script>
<style lang="less" scoped>
  .item-wrap{
    background-color: #f5f5f9;
    padding-bottom: 40px;
  }
  .checkbox-item{
    border-bottom: 1px solid #ddd;
  }
  .selected-value{
    padding-left: 20px;
  }
</style>


