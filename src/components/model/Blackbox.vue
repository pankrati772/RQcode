<template>
  <div class="">
      <!-- 黑体选择
      <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <router-view/>  -->
          <blackmsg></blackmsg>
  </div>
</template>

<script>
import blackmsg from '@/components/model/blackmsg'
export default {
  name: 'model',
  data(){
      return{
           options: [{
          value: 'ZKSC-60R-02-101',
          label: 'ZKSC-60R-02'
        }, {
          value: 'ZKSC-70R-02-102',
          label: 'ZKSC-70R-02'
        }, {
          value: 'ZKSC-80R-103',
          label: 'ZKSC-80R'
        }, 
        {
          value: 'ZKSC-100R-104',
          label: 'ZKSC-100R'
        }, 
        {
          value: 'ZKSC-160R-105',
          label: 'ZKSC-160R'
        }, 
        {
          value: 'ZKSC-180R-106',
          label: 'ZKSC-180R'
        }, 
        {
          value: 'ZKSC-200R-107',
          label: 'ZKSC-200R'
        }
        ],
        value: ''
      }
  },
  components:{
    blackmsg
  },
  methods:{
      handleClick(tab, event) {
        // console.log(tab, event);
      }
  },
  updated(){
      // console.log(this.value)
      
  }
}
</script>

<style>

</style>
