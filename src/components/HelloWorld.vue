<template>
  <div class="hello">
  
    <div class="msgset" v-show="true">
   
      <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="打印模板">
          <el-select v-model="optionmodel" placeholder="请选择打印模板">
         
            <el-option label="黑体70R（180x110x110)" value="180x110x110"></el-option>
            <el-option label="黑体70R（200x110x110)" value="200x110x110"></el-option>
            <el-option label="黑体70R（200x120x103)" value="200x120x103"></el-option>
          </el-select>
      </el-form-item> 
        <el-form-item label="公司名称">
          <el-autocomplete
          class="inline-input"
          v-model="form.name"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          :trigger-on-focus="false"
          @select="handleSelect"
          style="width:220px"
        ></el-autocomplete>
        </el-form-item>
        <el-form-item label="产品名称">
           <el-autocomplete
          class="inline-input"
          v-model="form.modelname"
          :fetch-suggestions="querySearch"
          placeholder="请输入产品名称"
          :trigger-on-focus="false"
          @select="handleSelect"
          style="width:220px"
        ></el-autocomplete>
        </el-form-item>
        <el-form-item label="生产数量">
          <el-input v-model="form.num" style="width:220px" placeholder="1~999" ref='num' ></el-input>
        </el-form-item>
        <el-form-item label="开始数量">
          <el-input v-model="form.numstart" style="width:220px" placeholder="1~999" ref="numstart"></el-input>
        </el-form-item>
        <el-form-item label="结束数量">
          <el-input v-model="form.numend" style="width:220px" placeholder="1~999" ref="numend"></el-input>
        </el-form-item>
        <el-form-item label="型号选择">
          <el-select v-model="form.model" placeholder="请选择型号">
            <el-option label="热成像摄像机60R" value="ZKSC-60R-01-201"></el-option>
            <el-option label="热成像摄像机70R" value="ZKSC-70R-01-202"></el-option>
            <el-option label="高精度黑体60R" value="ZKSC-60R-02-101"></el-option>
            <el-option label="高精度黑体70R" value="ZKSC-70R-02-102"></el-option>
            <el-option label="高精度黑体80R" value="ZKSC-80R-103"></el-option>

            <el-option label="高精度黑体炉-单腔" value="ZKSC-160R-105"></el-option>
            <el-option label="高精度黑体炉-双腔" value="ZKSC-180R-106"></el-option>
            <el-option label="超高精度耳/额温计校准装置-双工位" value="ZKSC-100R-104"></el-option>
            <el-option label="实验室级高精度制冷恒温槽" value="ZKSC-200R-107"></el-option>
            <el-option label="测温人脸一体机" value="ZKSC-10R-203"></el-option>
            
          </el-select>
        </el-form-item>
      </el-form>
        <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="输入电源">
          <el-select v-model="form.election" placeholder="请选择电源">
           
            <el-option label="DC24V" value="DC24V"></el-option>
            <el-option label="DC12V" value="DC12V"></el-option>
            
          </el-select>
        </el-form-item>
        <el-form-item label="输入功率">
          <el-input v-model="form.power" style="width:220px" placeholder="请输入功率">
            <template slot="append">(W)</template>
          </el-input>
          
        </el-form-item>
        <el-form-item label="输入日期">
          <el-input v-model="form.date" style="width:220px" placeholder="例：200317">
            
          </el-input>
          
        </el-form-item>
        <el-form-item label="输入尺寸">
          <el-input v-model="form.size" style="width:220px" placeholder="长X宽X高">
            <template slot="append">(mm)</template>
          </el-input>
          
        </el-form-item>
        <el-form-item label="输入重量">
          <el-input v-model="form.weight" style="width:220px" placeholder="请输入重量">
            <template slot="append">(Kg)</template>
          </el-input>
          
          
        </el-form-item>
        <el-form-item label="输入产地">
          <el-input v-model="form.area" style="width:220px" placeholder="请输入产地"></el-input>
         
        </el-form-item>
    
         <el-form-item label='输入编码'>
           <el-input v-model="form.last" style="width:220px" placeholder="请输入单个大写英文字母"></el-input>
         </el-form-item>

         <el-form-item label='选择打印机'>
            <el-select value-key="id" v-model="form.publishName" placeholder="请选择打印模板">
                <el-option
                v-for="item in Printer"
                :key="item.length"
                :label="item"
                :value="item"
                >
                </el-option>
            </el-select>
         </el-form-item>
        <el-form-item style="position:absolute;botton:0;left:-5%;">
          <el-button class="btn" type="primary" @click="onSubmit">立即创建</el-button>
          <el-button class="btn" @click="back">返回</el-button>
          <el-button class="btn" @click="clean" type="danger">清空数据</el-button>
        </el-form-item>
      </el-form>
      
      
    </div>
  
    
  </div>
</template>

<script>
import QRcode from 'qrcodejs2'
import axios from 'axios'
import store from '@/vuex/store.js'

export default {
  
  name: 'HelloWorld',
  store,
  data () {
    return {
      URL:'http://localhost:8080',
      optionmodel: '',
       form:{
         num: '',
          model: '',
          date: '',
          power:'',
          election:'',
          weight:'',
          size:'',
          sn:[],
          showtime:'',
          publishName:''
       },
      makename:'广东中科四创科技有限公司',
      Printer:[],

      sn_model:''
    }
  },
  methods:{
   onSubmit() {
        
         
        
        this.sn_model=this.form.model.toString().substr(this.form.model.length-3,3)
        var myDate = new Date();
        
        if(this.form.date==''){
          myDate.toLocaleDateString(); //获取当前日期
          // 按照SN格式提交当前日期
          this.form.date=myDate.toLocaleDateString().replace('/','').replace('/','').substr(2,7)
        
          // 显示标签日期信息
          var nian =myDate.getFullYear()
          var yue = myDate.getMonth()+1
          var ri = myDate.getDate()
          console.log(ri)
         if(ri<10){
           ri='0'
         }
          if(yue.toString().length<2){
            yue = '0'+yue
          }
          
          this.form.date=nian.toString().substr(2,2)+yue+ri.toString()
          this.form.showtime='20'+this.form.date.substr(0,2)+'年'+this.form.date.substr(3,1)+'月'+this.form.date.substr(4,2)+'日'
          
        }else{
          // 用户自定义日期
          this.form.date=this.form.date
          this.form.showtime='20'+this.form.date.substr(0,2)+'年'+this.form.date.substr(3,1)+'月'+this.form.date.substr(4,2)+'日'
        }
        // 截取用户所选择黑体型号
       this.form.model = this.form.model.toString().substring(0,this.form.model.length-4)
      //  补齐数据单位
       this.form.weight = this.form.weight+'(Kg)'
       this.form.size = this.form.size+'(mm)'
       this.form.power = this.form.power+'(W)'
      //  若次数为0默认一次 开始数值到结束数值拼接字符串
        if(this.form.num.length===0){
          for(let i = parseInt(this.form.numstart,10);i<=this.form.numend;i++){
          if(i<10){
          var arr = {sn:this.sn_model+this.form.date+'00'+i+this.form.last}
          this.form.sn.push(arr)
          }else  if(i<100){
            var arr = {sn:this.sn_model+this.form.date+'0'+i+this.form.last}
          this.form.sn.push(arr)
          }else{    
            var arr = {sn:this.sn_model+this.form.date+i+this.form.last}
          this.form.sn.push(arr)
          }
        }
        }else{
          // 若次数不为0 则循环 多次打印标签
          for(var i = 1;i<=this.form.num;i++){
            for(let i = parseInt(this.form.numstart,10);i<=this.form.numend;i++){
              if(i<10){
              var arr = {sn:this.sn_model+this.form.date+'00'+i+this.form.last}
              this.form.sn.push(arr)
              }else  if(i<100){
                var arr = {sn:this.sn_model+this.form.date+'0'+i+this.form.last}
              this.form.sn.push(arr)
              }else{    
                var arr = {sn:this.sn_model+this.form.date+i+this.form.last}
              this.form.sn.push(arr)
              }
            }

            
          }
        }
        // 标签打印接口，axios请求
        axios.post(this.URL+'/sys/publicAgain',this.form).then((data)=>{
          console.log(data)
        })
       
        console.log(this.form)
        
        console.log('这是提交完的'+this.form)
        // 数据清空
        window.location.reload()
        
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      
      
      loadAll() {
        return [
          { "value": "广东中科四创科技有限公司"},
          {"value":'人体测温黑体'},
          {"value":'高精度恒温制冷槽'},
          {"value":'热成像摄像机'},
          {"value":'测温人脸一体机'},

        ];
      },
      handleSelect(item) {
        console.log(item);
      },
      back(){
        this.$router.push('/')
      },
      clean(){
               window.location.reload()

      }
  },
  mounted(){
    this.restaurants = this.loadAll();
    // console.log(this.form.date=='')
    // 获取本机打印机驱动
    // this.$store.state.URL=this.URL
      this.URL=this.$store.state.URL

    axios.get(this.URL+"/sys/publishList").then((data)=>{
      console.log(data)
      this.Printer = data.data.data
    })
    console.log(this.form.Printer)
   
  },
  updated(){
    
  },
  watch:{
    optionmodel:{
      // 根据监听模板动态不全信息
      handler(newName, oldName) {
			console.log(newName)
      if(newName==='180x110x110'){
        this.form.name='广东中科四创科技有限公司',
        this.form.modelname='人体测温黑体'
        this.form.weight='1.45'
        this.form.size='180x110x110'
        this.form.area='中国'
        this.form.power='90'
        this.form.election='DC24V'
        this.form.model='ZKSC-70R-02-102'
      }else if(newName==='200x110x110'){
        this.form.name='广东中科四创科技有限公司',
        this.form.modelname='人体测温黑体'
        this.form.weight='1.45'
        this.form.size='200x110x110'
        this.form.area='中国'
        this.form.power='90'
        this.form.election='DC24V'
        this.form.model='ZKSC-70R-02-102'
      }else if(newName==='200x120x103'){
        this.form.name='广东中科四创科技有限公司',
        this.form.modelname='人体测温黑体'
        this.form.weight='1.45'
        this.form.size='200x120x103'
        this.form.area='中国'
        this.form.power='90'
        this.form.election='DC24V'
        this.form.model='ZKSC-70R-02-102'
      }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.msgset{
  display: flex;
  width:auto;
  margin-left:30%;
  padding-top:5%;
  position: relative;
}
.btn{
  width:200px;
  height:60px;
  font-size: 20px;
}
</style>