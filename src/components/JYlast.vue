<template>
  <div id="last" class="model">
    <el-row>
      <el-col class="title" :span="3">扫码查看报告：</el-col>
      <el-col class="topbar" :span="6">
        
        <el-input
          v-model="snnum"
          @input="sninput()"
          @blur="search()"
          @focus="clearSN()"
          class="gum-input"
          placeholder="请使用扫码枪扫描二维码"
          ref="modelname"
        ></el-input>
      </el-col>
      
    </el-row>
    <div class="topbar"></div>

    <!-- <a :href=this.sn target="_blank"><el-button @click="DY()" type="primary">查看</el-button></a> -->
    <!-- <el-button @click="back">返回</el-button> -->

    <div class="iframe-box">
      <report :SN="currentSN" @stop="selectStop()" />
    </div>
  </div>
</template>

<script>
import report from "../components/autoprint";
import axios from 'axios'
export default {
  name: "last",
  data() {
    return {
      snnum: "",
      sn: "http://192.168.4.77:8188/#/report?SN=" + this.snnum,
      currentSN: "",
      inputTime: {
        lastTime: "",
        nextTime: ""
      },
      flg: false,
      Company:[]
    };
  },
  methods: {
    clearSN() {
      this.snnum = "";
    },
    selectStop() {
      this.$refs.modelname.focus();
      this.clearSN();
    },
    DY() {
      this.sn = "http://192.168.4.77:8188/#/report?SN=" + this.snnum;
      // console.log(this.snnum)
      this.snnum = "";
    },
    search(){
      if(this.snnum.length===17){
        let SN={sn:this.snnum}
        console.log(SN)
                // axios.post('http://192.168.4.83:8080/sys/publishIntelBig',SN).then((data)=>{
                //     console.log(data)
                //     this.snnum=''
                // })
      }
      
    }
    ,

    sninput() {
    //   this.inputTime.nextTime = new Date();
    //   if (this.inputTime.nextTime - this.inputTime.lastTime < 20) {
    //     if (/(\d{12}\w)/.test(this.snnum)) {
    //       if (this.snnum.length >= 13||this.snnum.length<=15) {
    //         this.snnum.match(/(\d{12}\w)/g);
    //         this.snnum = RegExp.$1;
    //         this.currentSN = this.snnum;
    //         this.snnum = ''
    //          console.log(this.currentSN)
    //          let SN={sn:this.currentSN}
    //         // axios.post('http://192.168.4.83:8080/sys/publicBox',SN).then((data)=>{
    //         //   console.log(data)
    //         // })
    //       }
    //     } else {
    //       console.log(this.snnum)
    //     }
    //   }
    if(this.snnum.length==17){
        console.log(this.snnum)
       let SN={sn:this.snnum}
        axios.post('http://192.168.4.83:8080/sys/publishIntelBig',SN).then((data)=>{
            console.log(data)
            this.snnum=''
        })
    }
       
      // if(this.currentSN.length<13){
      //   console.log('no')
      // }else{
      //   console.log(this.currentSN)
        
      
      // }
      // console.log(this.currentSN)

      this.inputTime.lastTime = this.inputTime.nextTime;
    },
    getSN() {
      //       console.log(/(\d{12}\w)/.test(this.snnum));
      if (/(\d{12}\w)/.test(this.snnum)) {
        this.snnum.match(/(\d{12}\w)/);
        this.snnum = RegExp.$1;
      } else {
      }
      console.log(this.snnum)
      let SN={sn:this.snnum}
      if(this.snnum===''){

      }else{
        axios.post('http://192.168.4.83:8080/sys/publicBox',SN).then((data)=>{
              console.log(data)
            })
      }
      
    },
    back() {
      this.$router.push({ path: "/" });
    }
  },
  watch: {
    snnum() {
      // console.log(this.snnum.length)
      // if(this.snnum.length===13){
      //   this.DY()
      //   window.location.href='http://192.168.4.77:8188/#/report?SN='+this.snnum;
      // }
    }
  },
  mounted() {
    this.$refs.modelname.focus();
    //获取公司
     axios.get('http://192.168.4.64:8080/factory/getAll').then((data)=>{
        console.log(data.data)
        this.Company=data.data.data
        console.log(this.Company)
      })
  },
  components: {
    report
  }
};
</script>

<style scoped>
.report {
  width: 105%;
  margin: 0px auto;
  height: 100%;
  border: 1px solid #eee;
}
.iframe-box {
  width: 100%;
  overflow: hidden;
}

.title,.topbar{
  margin-top: 20px;
}
.title {
  font-size: 3.0rem;
  margin-left: 50px; 
}
</style>
