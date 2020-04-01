<template>
  <div class="">
    摄像头选择
      <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      <router-view/>
  </div>
</template>

<script>
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
    if(this.value==='ZKSC-60R-01-201'){
        //   this.$router.push('/ones/blackmsg',query:{})
          this.$router.push({path:"/camera/cameramsg",query:{value:this.value}})
      }else if(this.value==='ZKSC-70R-01-202'){
          this.$router.push({path:"/camera/cameramsg",query:{value:this.value}})
      }else if(this.value==='ZKSC-10R-203'){
          this.$router.push({path:"/camera/cameramsg",query:{value:this.value}})
      }
  }
}
</script>

<style>

</style>
