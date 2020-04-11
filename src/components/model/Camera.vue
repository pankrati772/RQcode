<template>
  <div class="">
    
     <cameramsg></cameramsg>
  </div>
</template>

<script>
import cameramsg from '@/components/model/cameramsg'
export default {
  name: 'model',
  data(){
      return{
          options: [{
          value: 'ZKSC-60R-01-201',
          label: 'ZKSC-60R-01'
        }, {
          value: 'ZKSC-70R-01-202',
          label: 'ZKSC-70R-01'
        }, {
          value: 'ZKSC-10R-203',
          label: 'ZKSC-10R'
        }
        ],
        value: ''
      }
  },
  methods:{
      handleClick(tab, event) {
        // console.log(tab, event);
      }
  },updated(){
    
  },
  components:{
    cameramsg
  }
}
</script>

<style>

</style>
