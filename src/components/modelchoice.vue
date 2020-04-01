<template>
  <div class="model" >
      <el-button class="btn" @click="numbers" type="primary">一次性多张标签打印</el-button>
      <el-button class="btn" @click="ones" type="primary">黑体流水线标签打印模板配置</el-button>
      <el-button class="btn" @click="camera" type="primary">摄像机流水线标签打印模板配置</el-button>
      <el-button class="btn" @click="DY" type="primary">选择模板打印</el-button>
      <el-button class="btn" @click="last" type="primary">校验报告与打包盒标签打印</el-button>
  </div>
</template>

<script>
export default {
  name: 'model',
  methods:{
      numbers(){
          this.$router.push('/numbers')
      },
      ones(){
          this.$router.push('/ones')

      },
      camera(){
        this.$router.push('/camera')
      },
      DY(){
        this.$router.push('/DY')
      },
      last(){
        this.$router.push('/last')
      }
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
.btn{
  margin:10px;
  width:400px;
  height:65px;
  font-size: 20px;
}
</style>
