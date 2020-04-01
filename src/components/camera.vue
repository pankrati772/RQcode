<template>
  <div class="">
      <!-- <h1>单次打印模板</h1> -->

        <el-tabs v-model="activeName" @tab-click="handleClick">
          <!-- <el-tab-pane label="黑体系列" name="first">
            
            <BlacBox></BlacBox>

          </el-tab-pane> -->
          <el-tab-pane label="摄像头系列" name="first">
              <Camera/>
          </el-tab-pane>
         
          
        </el-tabs>
  </div>
</template>

<script>

import Camera  from '@/components/model/Camera'
export default {
  name: 'model',
  data(){
      return{
          activeName: 'first'
      }
  },
  methods:{
      handleClick(tab, event) {
        // console.log(tab, event);
      }
  },
  components:{
      Camera
  }
}
</script>

<style scoped>
.model{
  /* display: flex; */
  width:300px;
  position: absolute;
  top:30%;
  left:40%;
}
</style>
