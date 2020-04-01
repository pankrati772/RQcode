<template>
  <div id="DY" class="model">
      <h1>流水线打印界面</h1>
      <el-form style="width:500px;position:relative"> 
            
        <el-form-item label="选择打印模板">
            <el-select v-model="value" placeholder="请选择打印模板">
                <el-option
                v-for="item in option"
                :key="item.value"
                :label="item.planname"
                :value="item"
                >
                </el-option>
            </el-select>
        </el-form-item>
        
        <el-form-item label="输入打印总数">
            <el-input v-model="msg.num" style="width:220px" placeholder="请输入起始打印序号" ref='modelname' ></el-input>
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
export default {
  name: 'App',
  data(){
      return{
        
        value: '',
        msg:{
            sn:[],
            date:'',
            num:'',
            
            id:'',
            sn_model:''
        },
        option:[]
      }
  },updated(){
    //   console.log(this.value)
      
  },
  mounted(){
      axios.get('http://192.168.4.83:8080/bplan/getAllBPlan').then((data)=>{
          console.log(data.data)
          this.option=data.data.data
          console.log(this.option)

      })
      var myDate = new Date();
            myDate.toLocaleDateString(); //获取当前日期
            this.msg.date=myDate.toLocaleDateString().replace('/','').replace('/','').substr(2,7)
            var nian =myDate.getFullYear()
            var yue = myDate.getMonth()+1
            var ri = myDate.getDate()   
            if(yue.toString().length<2){
                yue = '0'+yue
            }
            this.msg.date=nian.toString().substr(2,2)+yue+ri.toString()
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
      automake(){
          console.log(this.option)
          
          // if(this.msg.numstart<10){
          //     this.msg.sn=this.msg.sn_model+this.msg.date+'00'+this.msg.numstart+'A'
          // }else if(this.msg.numstart<100){
          //     this.msg.sn=this.msg.sn_model+this.msg.date+'0'+this.msg.numstart+'A'
          // }else{
          //     this.msg.sn=this.msg.sn_model+this.msg.date+this.msg.numstart+'A'
          // }
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
          // console.log("00"+i);
          // console.log(this.sn_model+this.form.date+'00'+i+this.form.last)
          var arr = {sn:this.msg.sn_model+this.msg.date+'00'+i+'A'}
          this.msg.sn.push(arr)
          }else  if(i<100){
            // console.log("0"+i); 
            // console.log(this.sn_model+this.form.date+'0'+i+this.form.last)
            var arr = {sn:this.msg.sn_model+this.msg.date+'0'+i+'A'}
          this.msg.sn.push(arr)
          }else{
            // console.log(i)
            // console.log(this.sn_model+this.form.date+i+this.form.last)
            var arr = {sn:this.msg.sn_model+this.msg.date+i+'A'}
          this.msg.sn.push(arr)
          }
           }
          console.log(this.msg)
          axios.post('http://192.168.4.83:8080/sys/public',this.msg).then((data)=>{
          console.log(data)
          this.$notify({
                title: '正在打印标签',
                message: '',
                type: 'success'
                });

      })
          // this.msg.numstart=parseInt(this.msg.numstart)+1
        //   console.log(this.msg.numstart)
        
        

      }
  }
  
  ,watch:{
    value(){
        
        
          console.log(this.value.id)
          this.msg.blackplanfk=this.value.id
          this.msg.sn_model=this.value.sn_model
        //   if(this.value==='黑体70R200x110x110'){
        //       this.msg={
        //       name:'广东中科四创科技有限公司',
        //       modelname:'人体测温黑体',
        //       sn_model:'102',
        //       area:'中国',
        //       last:'A',
        //       weight:'1.45(Kg)',
        //       size:'200x110x110(mm)',
        //       power:'30(W)',
        //       date:this.msg.date,
        //       sn:this.msg.sn,
        //       PID:this.msg.PID
        //     }
        //   }else if(this.value==='黑体70R200x120x103'){
        //       this.msg={
        //       name:'广东中科四创科技有限公司',
        //       modelname:'人体测温黑体',
        //       area:'中国',
        //       sn_model:'102',
        //       last:'A',
        //       weight:'1.45(Kg)',
        //       size:'200x120x103(mm)',
        //       power:'30(W)',
        //       date:this.msg.date,
        //       sn:this.msg.sn
        //     }
        //   }else if(this.value==='黑体70R180x110x110'){
        //       this.msg={
        //       name:'广东中科四创科技有限公司',
        //       modelname:'人体测温黑体',
        //       area:'中国',
        //       sn_model:'102',
        //       last:'A',
        //       weight:'1.45(Kg)',
        //       size:'180x110x110(mm)',
        //       power:'30(W)',
        //       date:this.msg.date,
        //       sn:this.msg.sn
        //     }
          // }
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
