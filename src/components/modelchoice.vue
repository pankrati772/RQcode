<!--
 * @Author: PSB
 * @Date: 2020-04-01 09:53:47
--> 
<template>
  <div class="model" >
      <el-button class="btn" @click="numbers" type="primary">一次性多张标签打印</el-button>
      <el-button class="btn" @click="ones" type="primary">黑体流水线标签打印模板配置</el-button>
      <el-button class="btn" @click="camera" type="primary">景阳标签配置页面</el-button>
      <el-button class="btn" @click="DY" type="primary">选择模板打印</el-button>
      <el-button class="btn" @click="last" type="primary">包盒标签打印</el-button>
      <el-button class="btn" @click="Configuration" type="primary">黑体型号配置</el-button>
      <el-button class="btn" @click="SpecialLabel" type="primary">特殊标签信息录入</el-button>
      <el-button class="btn" @click="cameraLabel" type="primary">摄像机标签更换</el-button>
      <el-button class="btn" @click="outside" type="primary">外包装箱标签打印</el-button>


  </div>
</template>

<script>
import store from '@/vuex/store.js'
// import {mutations} from 'vuex'
export default {
  name: 'model',
  methods:{
      numbers(){
          this.$router.push('/numbers')
      },
      ones(){
          this.$router.push('/ones/blackmsg')

      },
      camera(){
        this.$router.push('/camera/cameramsg')
      },
      DY(){
        this.$router.push('/DY')
      },
      last(){
        this.$router.push('/last')
      },
      Configuration(){
        this.$router.push('/Configuration')
        // this.$store.commit('test')
      },
      SpecialLabel(){
        this.$router.push('/SpecialLabel')
      }
      ,
      cameraLabel(){
        this.$router.push('/cameraLabel')
      }
      ,
      outside(){
        this.$router.push('/outside')
      }
  },
  store,
  mounted(){
    // console.log(this.$store.state)
    // this.$store.commit('test')

    // console.log(...this.list)
   
  },
  data(){
    return {
      list:[1,2,2,3,4,5]
    }
  }
}
</script>

<style scoped>
.model{
  /* display: flex; */
  width:300px;
  position: absolute;
  top:10%;
  left:40%;
}
.btn{
  margin:10px;
  width:400px;
  height:65px;
  font-size: 20px;
}
</style>
