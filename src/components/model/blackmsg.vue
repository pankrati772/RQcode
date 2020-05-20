<template>
  <div class="">
      
      <div class="msgbox" style="display:flex;margin-left:32%;">
          <el-form label-width="80px">
             <el-form-item label="选择公司">
                <el-select value-key="id" v-model="msg.factorY" @change="select()" placeholder="请选择公司">
                  <el-option
                  v-for="item in msg.Factory"
                  :key="item.length"
                  :label="item.name"
                  :value="item"
                  >
                  </el-option>
                </el-select>
            </el-form-item>
           <el-form-item label="产品名称">
                <el-select value-key="id" v-model="msg.model"   placeholder="请选择产品型号">
                  <el-option
                  v-for="item in msg.modeltype"
                  :key="item.length"
                  :label="item.model"
                  :value="item.model"
                  >
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="方案名称">
                <el-input v-model="msg.planname" style="width:220px" placeholder="请输入方案配置名称" ref='modelname' ></el-input>
            </el-form-item>
            <el-form-item label="公司名称">
                <el-autocomplete
                class="inline-input"
                v-model="msg.name"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                :trigger-on-focus="false"
                @select="handleSelect"
                style="width:220px"
                ></el-autocomplete>
            </el-form-item>
            
            <el-form-item label="产品名称">
                <el-input v-model="msg.modelname" style="width:220px" placeholder="请勿随意修改" ref='modelname' ></el-input>
            </el-form-item>
           
            <el-form-item label="设备重量">
                <el-input v-model="msg.weight" style="width:220px" placeholder="请勿随意修改" ref='date' >
                    <template slot="append">(Kg)</template>
                </el-input>
            </el-form-item>
           
          </el-form>
          <el-form label-width="80px">
            <el-form-item label="设备尺寸">
                <!-- <el-input v-model="msg.size" style="width:220px" placeholder="长x宽x高" ref='size' >
                    <template slot="append">(mm)</template>
                </el-input> -->
                 <el-autocomplete
                class="inline-input"
                v-model="msg.size"
                :fetch-suggestions="querySearch"
                placeholder="长x宽x高"
                :trigger-on-focus="false"
                @select="handleSelect"
                style="width:220px"
                ><template slot="append">(mm)</template></el-autocomplete>
                <!-- <el-select v-model="msg.size" placeholder="请选择尺寸" v-show="control">
                <el-option label="200x110x110(mm)" value="200x110x110(mm)"></el-option>
                <el-option label="200x120x103(mm)" value="200x120x103(mm)"></el-option>
                <el-option label="180x110x110(mm)" value="180x110x110(mm)"></el-option>
            </el-select> -->
            </el-form-item>
            <el-form-item label="设备功率">
                <el-input v-model="msg.power" style="width:220px" placeholder="请勿随意修改" ref='power'  >
                    <template slot="append">(W)</template>
                </el-input>
            </el-form-item>
            <el-form-item label="输入电源">
                <el-select v-model="msg.election" placeholder="请选择电源">
                <el-option label="DC24V" value="DC24V"></el-option>
                <el-option label="DC12V" value="DC12V"></el-option>
                
            </el-select>
            </el-form-item>
            <el-form-item label="设备产地">
                <el-input v-model="msg.area" style="width:220px" placeholder="请勿随意修改" ref='power'  ></el-input>
            </el-form-item>
            <el-form-item label="最后编码">
                <el-input v-model="msg.last" style="width:220px" placeholder="请勿随意修改" ref='last'  ></el-input>
            </el-form-item>
            
          </el-form>
          <br/>
          
      </div>
      <el-form style="width:30%;margin-left:38%">
              <!-- <el-form-item label="扫码输入PID码">
                <el-input v-model="msg.PID"  @keyup.enter.native="make()" style="width:220px" placeholder="请使用扫码枪扫码PID码" ref='PID'  ></el-input>
              </el-form-item> -->
              <el-form-item>
                  <el-button class="btn" @click='make' type="primary">保存方案</el-button>
                  <el-button class="btn" @click="back">返回</el-button>
              </el-form-item>
          </el-form>
      <!-- this.form.model.substring(0,this.form.model.length-4) -->
     
  </div>
</template>

<script>
import axios from 'axios'
import store from '@/vuex/store.js'

export default {
  name: 'model',
  store,
  data(){
      return{
          msg:{
              model:"",
              modelname:'人体测温黑体',
              name:'',
              date:'',
              sn:[],
              size:'',
              last:'',
              power:'',
              election:'',
              weight:'',
              area:'',
              sn_model:'',
              factory:'',
              factorY:'',
              Factory:[],
              modeltype:[]
          },
          control:true,
          URL:'http://localhost:8080',
          serveURL:''
          
      }
  },
  methods:{
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      make(){
          this.msg.weight=this.msg.weight+'Kg'
          this.msg.size=this.msg.size+'mm'
          this.msg.power=this.msg.power+'W'
          // console.log(this.$route.query.value)
          // console.log(this.msg.model.substr(this.msg.model.length-3,3))
          setTimeout(()=>{
            this.msg.sn_model=this.msg.model.substr(this.msg.model.length-3,3)
          },200)
          // this.msg.sn_model=this.msg.model.substr(this.$route.query.value.length-3,3)
          console.log(this.msg)
          axios.post(this.URL+'/bplan/insertBplan',this.msg).then((data)=>{
          console.log(data)
          if(data.msg="插入成功给"){
              this.$notify({
                title: '保存成功',
                message: '',
                type: 'success'
                });
          }else{
              this.$notify.error({
                title: '保存错误',
                message: '',
                
              });
          }
        })

      },createFilter(queryString) {
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
            {"value":'200x110x110'},
            {"value":'200x120x103'},
            {"value":'180x110x110'},
        ];
      },
      handleSelect(item) {
        // console.log(item);
        
      },
      back(){
          
          this.$router.push('/')
      },
       select(){
        console.log(this.msg.factorY)
        this.msg.factory=this.msg.factorY.id;
        //根据所选公司指定查找公司的指定型号
        axios.post(this.serveURL+'/Dev/getDevModelByFactoryId',{factoryId:this.msg.factory}).then((data)=>{
          console.log(data)
          this.msg.modeltype=data.data.data
          console.log(this.msg.modeltype)
        })
      },
  },
  mounted(){
      this.restaurants = this.loadAll();
    //   console.log(this.$route.query.value)
      this.URL=this.$store.state.URL
      this.serveURL=this.$store.state.serverURL
      console.log(this.serveURL)
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

    // 获取公司
    axios.get(this.URL+'/factory/getAll').then((data)=>{
            console.log(data)
            this.msg.Factory=data.data.data
            // console.log(state)
        })
        
  },
  updated(){
    
  }
}
</script>

<style scoped>
.msgbox{
  width:100%;
}
.btn{
  width:200px;
  height:60px;
  font-size: 20px;
}
</style>
