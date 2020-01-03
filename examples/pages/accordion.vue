<template>
  <section class="antv-accordion">
    <antv-accordion :data="data"></antv-accordion>
  </section>
</template>

<script>
export default {
  name: 'accordion',
  data(){
    return {
      data: [
        {
          value: 'Title 1',
          children: [
            'content 1',
            'content 2',
            'content 3'
          ]
        },
        {
          value: 'Title 2',
          children: [
            {
              value: 'content 1',
              style: {}
            }
            
          ]
        },
        {
          value: 'Title 3',
          children: [
            {
              value: 'content 2',
              style: {}
            }
            
          ]
        }
      ]
    }
  }
}
</script>