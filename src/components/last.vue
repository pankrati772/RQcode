<template>
  <div id="last" class="model">
    <el-row>
      <el-col class="title" :span="3">扫码打印标签：</el-col>
      <el-col class="topbar" :span="6">
        
        <el-input
          v-model="snnum"
          @input="sninput()"
          @blur="getSN()"
          @focus="clearSN()"
          class="gum-input"
          placeholder="请使用扫码枪扫描二维码"
          ref="modelname"
        ></el-input>
        <span>请选择标签公司 ：</span>
        <el-select value-key="id" v-model="company" @change="select()" placeholder="请选择标签打印的公司">
                <el-option
                v-for="item in Company"
                :key="item.length"
                :label="item.name"
                :value="item"
                >
                </el-option>
            </el-select>
            <div>
              <span>请 选 择 打 印 机</span>
              <el-select value-key="value" v-model="publishName" placeholder="请选择打印模板">
                <el-option
                v-for="item in Printer"
                :key="item.id"
                :label="item"
                :value="item"
                >
                </el-option>
            </el-select>
            </div>
            
       
      </el-col>
      
    </el-row>
    <div class="topbar">
    </div>
    
    

    <!-- <el-button class="btns" type="danger" @click="print">打印</el-button> -->
    <!-- <a :href=this.sn target="_blank"><el-button @click="DY()" type="primary">查看</el-button></a> -->
    <el-button class="btns" type="danger" @click="back">返回</el-button>

    <!--<div class="iframe-box">
      <report :SN="currentSN" @stop="selectStop()" />
    </div>-->
  </div>
</template>

<script>
import report from "../components/autoprint";
import axios from 'axios'
import store from '@/vuex/store.js'

export default {
  name: "last",
  store,
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
      Company:[],
      company:{},
      length:'',
      URL:'http://localhost:8080/autotest',
      publishName:'',
      Printer:[]
    };
  },
  methods: {
    print(){
      console.log(this.ssn1,this.ssn2)
      axios.post(this.URL+'')
      
    },
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
    sninput() {
      let regular = new RegExp(this.company.regular)

      this.inputTime.nextTime = new Date();
      if (this.inputTime.nextTime - this.inputTime.lastTime < 20) {
        if (regular.test(this.snnum)) {
          // if (this.snnum.length >= 13||this.snnum.length<=15) {
          if (this.snnum.length >= this.company.type.length) {
            this.snnum.match(regular);
            this.snnum = RegExp.$1;
            this.currentSN = this.snnum;
            this.snnum = ''
             console.log(this.currentSN)
             let SN={sn:this.currentSN}
             let msg = {
               publishName:this.publishName,
               sn:this.currentSN
             }
             if(this.company.name==='中科四创'){
              axios.post(this.URL+'/sys/publicBox',msg).then((data)=>{
                console.log(data)
              })
             }else if(this.company.name==='景阳'){
               axios.post(this.URL+'/sys/publicJYBig',msg).then((data)=>{
                    console.log(data)
                    this.snnum=''
                })
             }else if(this.company.name==='出口外贸'){
               
               axios.post(this.URL+'/sys/publishForeignTradeBig',msg).then((data)=>{
                    console.log(data)
                    this.snnum=''
                })
             }
            
          }
        } else {
          // console.log(this.snnum)
        }
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
      let regular = new RegExp(this.company.regular)
      if (regular.test(this.snnum)) {
        this.snnum.match(regular);
        this.snnum = RegExp.$1;
      } else {
      }
      console.log(this.snnum)
      let SN={sn:this.snnum}
      if(this.snnum===''){

      }else{
        axios.post(this.URL+'/sys/publicBox',SN).then((data)=>{
              console.log(data)
            })
      }
      
    },
    back() {
      this.$router.push({ path: "/" });
    },
    select(){
      console.log(this.company)
      
    }
  },
  watch: {
    // company(newValue){
    //   console.log(newValue)
    //   // this.company = newValue.regular
    //   // this.length = newValue.type.length
    //   // console.log(this.company,this.length)
    //   // console.log(this.company)
    // }

  },
  mounted() {
      this.URL=this.$store.state.URL

    this.$refs.modelname.focus();
    axios.get(this.URL+'/factory/getAll').then((data)=>{
        console.log(data.data)
        this.Company=data.data.data
        // console.log(this.company)
      })


      axios.get(this.URL+"/sys/publishList").then((data)=>{
      console.log(data)
      this.Printer = data.data.data
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
.btns{
  width:400px;
  height:85px;
  font-size: 50px;
}
</style>
