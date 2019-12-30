<template>
  <section class="item-wrap">
    <List header="Badge">
      <ListItem class="list-item" >
        <antv-badge dot>
          <span :style="{ width: '26px', height: '26px', background: '#ddd', display: 'inline-block'}"></span>
        </antv-badge>
        <span style="marginLeft:12px">Dot badge</span>
      </ListItem>
      <ListItem class="list-item" title="Badge" :onClick="()=>{}" extra="customer" arrow="right">
        <span slot="extra">
          <antv-badge text="123" maxNumber="99">
          </antv-badge>
          extra text
        </span>

      </ListItem>
      <ListItem class="list-item" :onClick="()=>{}" arrow="right">
        <span style="marginRight:12px">Custom</span>
        <antv-badge text="热门" :styles="{'margin-left': '10px', 'background-color':'#ff5b05','border-radius':'4px'}">
        </antv-badge>
        <antv-badge text="new" :styles="{'margin-left': '10px', 'background-color':'#f96268','border-radius':'0'}">
        </antv-badge>
        <antv-badge text="红包" :styles="{'margin-left': '10px', 'background-color':'#fff',color:'#ed0a17',border:'1px solid #ed0a17','border-radius':'4px'}">
        </antv-badge>
        <antv-badge text="会员" :styles="{'margin-left': '10px', 'background-color':'rgb(33, 182, 138)','border-radius':'4px'}">
        </antv-badge>
      </ListItem>
       <ListItem class="list-item" arrow="right" :onClick="()=>{}">
        <antv-badge text="hot" turning>
          <div class="turning"> turning badge</div>
        </antv-badge>
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
    width: 200PX;
    height: 50PX;
    line-height: 50PX;
  }
</style>


