<template>
  <section class="item-wrap">
    <List header="Badge">
      <ListItem class="list-item" >
        <d-badge dot>
          <span :style="{ width: '26px', height: '26px', background: '#ddd', display: 'inline-block'}"></span>
        </d-badge>
        <span style="marginLeft:12px">Dot badge</span>
      </ListItem>
      <ListItem class="list-item" title="Badge" :onClick="()=>{}" extra="customer" arrow="right">
        <span slot="extra">
          <d-badge text="123" maxNumber="99">
          </d-badge>
          extra text
        </span>

      </ListItem>
      <ListItem class="list-item" :onClick="()=>{}" arrow="right">
        <span style="marginRight:12px">Custom</span>
        <d-badge text="热门" :styles="{'background-color':'#ff5b05','border-radius':'4px'}">
        </d-badge>
        <d-badge text="new" :styles="{'background-color':'#f96268','border-radius':'0'}">
        </d-badge>
        <d-badge text="红包" :styles="{'background-color':'#fff',color:'#ed0a17',border:'1px solid #ed0a17','border-radius':'4px'}">
        </d-badge>
        <d-badge text="会员" :styles="{'background-color':'rgb(33, 182, 138)','border-radius':'4px'}">
        </d-badge>
      </ListItem>
       <ListItem class="list-item" arrow="right" :onClick="()=>{}">
        <d-badge text="hot" turning>
          <div class="turning"> turning badge</div>
        </d-badge>
       </ListItem>
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
  .turning{
    width: 200px;
    height: 50px;
    line-height: 50px;
  }
</style>


