<template>
  <div id="DY" class="model">
      <h1>流水线打印界面</h1>
      <el-form style="width:500px;position:relative">
        <el-form-item label="选择公司">
            <el-select value-key="id" v-model="company"  placeholder="请选择打印模板">
                <el-option
                v-for="item in Company"
                :key="item.value"
                :label="item.name"
                :value="item"
                >
                </el-option>
            </el-select>
        </el-form-item>
      </el-form>

      <!--景阳-->
      <el-form style="width:500px;position:relative" v-show="jingyang"> 
            
        <el-form-item label="选择打印模板">
            <el-select value-key="id" v-model="value" placeholder="请选择打印模板">
                <el-option
                v-for="item in option"
                :key="item.value"
                :label="item.planname"
                :value="item"
                >
                </el-option>
            </el-select>
        </el-form-item>
        
        <el-form-item label="选择打印机">
            <el-select value-key="id" v-model="msg.publishName" placeholder="请选择打印机">
                <el-option
                v-for="item in printer"
                :key="item"
                :label="item"
                :value="item"
                >
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="选择临标打印机">
            <el-select value-key="id" v-model="msg.publishCode" placeholder="请选择打印机">
                <el-option
                v-for="item in printer"
                :key="item"
                :label="item"
                :value="item"
                >
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="输入打印日期">
            <el-input v-model="msg.date" style="width:220px" placeholder="请输入起始打印序号" ref='modelname' ></el-input>
        </el-form-item>
        <el-form-item label="开始打印值">
            <el-input v-model="msg.numstart" style="width:220px" placeholder="请输入结束打印值" ref='modelname' ></el-input>
        </el-form-item>
        <el-form-item label="结束打印值">
            <el-input v-model="msg.numend" style="width:220px" placeholder="请输入结束打印值" ref='modelname' ></el-input>
        </el-form-item>
        <!-- <el-form-item label="扫描  P　I　D">
            <el-input v-model="msg.PID" style="width:220px" @keyup.enter.native="automake()" placeholder="请使用扫码枪输入PID" ref='modelname' ></el-input>
        </el-form-item> -->
        <el-form-item style="position:absolute;left:-8%;">
            <el-button class="btn" @click="JYmake()" type="primary">打印标签</el-button>
            <el-button class="btn" @click="back()">返回</el-button>
        </el-form-item>
      </el-form>

      <!--中科四创二维码信息打印-->
      <el-form style="width:500px;position:relative" v-show="companys"> 
            
        <el-form-item label="选择打印模板">
            <el-select value-key="id" v-model="value" placeholder="请选择打印模板">
                <el-option
                v-for="item in option"
                :key="item.value"
                :label="item.planname"
                :value="item"
                >
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="选择打印机">
            <el-select value-key="id" v-model="msg.publishName" placeholder="请选择打印机">
                <el-option
                v-for="item in printer"
                :key="item"
                :label="item"
                :value="item"
                >
                </el-option>
            </el-select>
        </el-form-item>


        
        <el-form-item label="输入打印日期">
            <el-input v-model="msg.date" style="width:220px" placeholder="请输入起始打印序号" ref='modelname' ></el-input>
        </el-form-item>
        <el-form-item label="开始打印值">
            <el-input v-model="msg.numstart" style="width:220px" placeholder="请输入结束打印值" ref='modelname' ></el-input>
        </el-form-item>
        <el-form-item label="结束打印值">
            <el-input v-model="msg.numend" style="width:220px" placeholder="请输入结束打印值" ref='modelname' ></el-input>
        </el-form-item>
        <!-- <el-form-item label="扫描  P　I　D">
            <el-input v-model="msg.PID" style="width:220px" @keyup.enter.native="automake()" placeholder="请使用扫码枪输入PID" ref='modelname' ></el-input>
        </el-form-item> -->
        <el-form-item style="position:absolute;left:-8%;">
            <el-button class="btn" @click="automake()" type="primary">打印二维码</el-button>
            <el-button class="btn" @click="back()">返回</el-button>
        </el-form-item>
      </el-form>
        
  </div>
</template>

<script>
import axios from 'axios'
import store from '@/vuex/store.js'
export default {
  name: 'App',
  store,
  data(){
      return{
        
        value: '',
        msg:{
            sn:[],
            date:'',
            num:'',
            publishName:'TSC TX600',
            publishCode:'TSC TTP-342 Pro',
            id:'',
            sn_model:'',
            identification:''
        },
        date:'',
        option:[],
        Company:[],
        company:"",
        companys:true,
        jingyang:false,
        printer:[],
        factory:'',
        URL:'http://localhost:8080'

      }
  },updated(){
    //   console.log(this.value)
      
  },
  mounted(){
      console.log(this.$store.state.URL)
      this.URL=this.$store.state.URL
      // 获取公司
      axios.get(this.URL+'/factory/getAll').then((data)=>{
        console.log(data.data)
        this.Company=data.data.data
        console.log(this.Company)
      })
      // 获取打印机
      axios.get(this.URL+"/sys/publishList").then((data)=>{
      console.log(data)
      this.printer = data.data.data
      this.printer.push("")
    })


      var myDate = new Date();
            myDate.toLocaleDateString(); //获取当前日期
            this.msg.date=myDate.toLocaleDateString().replace('/','').replace('/','').substr(2,7)
            var nian =myDate.getFullYear()
            var yue = myDate.getMonth()+1
            var ri = myDate.getDate()   
            if(yue.toString().length<2){
                yue = '0'+yue
            }if(ri.toString().length<2){
              ri='0'+ri
            }
            this.msg.date=nian.toString().substr(2,2)+yue+ri.toString()
            this.date=nian.toString().substr(2,2)+yue+ri.toString();
            console.log(this.msg.date)



  },methods:{
      
      make(){
          console.log(this.msg.numstart)
          for(let i = parseInt(this.msg.numstart,10);i<=this.msg.numend;i++){
          if(i<10){
          var arr = {sn:this.msg.sn_model+this.msg.date+'00'+i+this.msg.last}
          this.msg.sn.push(arr)
          }else  if(i<100){
            var arr = {sn:this.msg.sn_model+this.msg.date+'0'+i+this.msg.last}
          this.msg.sn.push(arr)
          }else{    
            var arr = {sn:this.msg.sn_model+this.msg.date+i+this.msg.last}
          this.msg.sn.push(arr)
          }
        }
        console.log(this.msg)
      },
      back(){
          this.msg={
              
          }
          this.$router.push('/')
      },
      JYmake(){
        for(let i = parseInt(this.msg.numstart,10);i<=this.msg.numend;i++){
          if(i<10){
            var arr={sn:'S1000'+this.msg.date+'000'+i}
            this.msg.sn.push(arr)
          }else if(i<100){
            var arr={sn:'S1000'+this.msg.date+'00'+i}
            this.msg.sn.push(arr)
          }else if(i<1000){
            var arr={sn:'S1000'+this.msg.date+'0'+i}
            this.msg.sn.push(arr)
          }else{
            var arr={sn:'S1000'+this.msg.date+i}
            this.msg.sn.push(arr)
          }
        }
        console.log(this.msg)
        axios.post(this.URL+'/sys/publishIntel',this.msg).then((data)=>{
          console.log(data)
        })
        this.msg={
          sn:[],
            date:'',
            num:'',
            publishName:'TSC TX600',
            
            id:'',
            sn_model:'',
            identification:''
        }
        
        
      }
      ,
      automake(){
          console.log(this.option)
          
          
          if(this.msg.num===''){
            for(let i = parseInt(this.msg.numstart,10);i<=this.msg.numend;i++){
              if(i<10){
              var arr = {sn:this.msg.sn_model+this.msg.date+'00'+i+'A'}
              this.msg.sn.push(arr)
              }else  if(i<100){
                var arr = {sn:this.msg.sn_model+this.msg.date+'0'+i+'A'}
              this.msg.sn.push(arr)
              }else{    
                var arr = {sn:this.msg.sn_model+this.msg.date+i+'A'}
              this.msg.sn.push(arr)
              }
          }  }



           for(var i = 1;i<=this.msg.num;i++){
         
          if(i<10){
          
          var arr = {sn:this.msg.sn_model+this.msg.date+'00'+i+'A'}
          this.msg.sn.push(arr)
          }else  if(i<100){
            
            var arr = {sn:this.msg.sn_model+this.msg.date+'0'+i+'A'}
          this.msg.sn.push(arr)
          }else{
            
            var arr = {sn:this.msg.sn_model+this.msg.date+i+'A'}
          this.msg.sn.push(arr)
          }
           }
          console.log(this.msg)
          axios.post(this.URL+'/sys/public',this.msg).then((data)=>{
          console.log(data)
          this.$notify({
                title: '正在打印标签',
                message: '',
                type: 'success'
                });

                

      })
      this.msg={
          sn:[],
            date:'',
            num:'',
            publishName:'TSC TX600',
            publishCode:'TSC TTP-342 Pro',
            id:'',
            sn_model:'',
            identification:''
        }
         
        
        

      }
  }
  
  ,watch:{
    value(newName){
        
        
          console.log(newName)
          this.msg.blackplanfk=newName.id
    
          this.msg.sn_model=newName.sn_model
          this.msg.identification=newName.identification

    },
    company(newName){
      console.log(newName)
      if(newName.name==='中科四创'){
        this.companys=true
        this.jingyang=false
        this.msg.date=this.date
        this.factory=newName.id
        axios.post(this.URL+'/bplan/getAllBPlan',{factory:this.factory}).then((data)=>{
          console.log(data.data)
          this.option=data.data.data
          console.log(this.option)

      })

      }else if(newName.name==='景阳'){
        this.companys=false
        this.jingyang=true
        this.msg.date='20'+this.msg.date
        this.factory=newName.id
        axios.post(this.URL+'/bplan/getAllBPlan',{factory:this.factory}).then((data)=>{
          console.log(data.data)
          this.option=data.data.data
          console.log(this.option)

      })
        

      }
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
  width:200px;
  height:60px;
  font-size: 20px;
}
</style>
