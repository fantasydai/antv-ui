<template>
  <section class="item-wrap">
    <List header="Basic Style">
      <ListItem class="list-item" >
        <d-badge dot>
          <span :style="{ width: '26px', height: '26px', background: '#ddd', display: 'inline-block'}"></span>
        </d-badge>
        <span style="marginLeft:12px">Dot badge</span>
      </ListItem>
      <ListItem class="list-item" arrow="right" :onClick="()=>{}">Title</ListItem>
      <ListItem class="list-item" title="Title" :onClick="()=>{}" extra="customer" arrow="right">
        <span slot="extra">
          <d-badge text="123" maxNumber="99">
          </d-badge>
          extra text
        </span>

      </ListItem>
      <ListItem class="list-item" >Title,Title,Title,Title,Title,Title,Title,Title,Title, Title,Title,Title,</ListItem>
    </List>
    <List header="Sub Title">
      <ListItem class="list-item" title="Title" subTitle="subTitle" extra="customer">
        <template slot="extra">
          12345
        </template>
      </ListItem>
      <ListItem class="list-item" title="asd" subTitle="subTitle" arrow="right" :onClick="()=>{}" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"></ListItem>
    </List>
    <List header="Multiple Line">
      <ListItem class="list-item" multipleLine>Multiple Title,Title,Multiple Title, Title, Multiple Title,</ListItem>
      <ListItem class="list-item" multipleLine extra="extra text">Multiple Title,Multiple Title,Multiple Title,Multiple Title,Multiple Title,</ListItem>
    </List>
  </section>

</template>

<script>
export default {

}
</script>
<style lang="less" scoped>
  .item-wrap{
    background-color: #f5f5f9;
    padding-bottom: 40px;
  }
</style>


