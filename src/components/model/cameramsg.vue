<template>
  <div class="">
      
      <div class="msgbox" style="display:flex;margin-left:32%;">
          <el-form label-width="80px">
            <el-form-item label="当前机型">
                <!--<span>{{this.$route.query.value.substring(0,this.$route.query.value.length-4)}}</span>-->
                <el-autocomplete
                class="inline-input"
                v-model="msg.model"
                :fetch-suggestions="querySearch"
                placeholder="请输入当前机型"
                :trigger-on-focus="false"
                @select="handleSelect"
                style="width:220px"
                ></el-autocomplete>
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
                
                <el-autocomplete
                class="inline-input"
                v-model="msg.modelname"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                :trigger-on-focus="false"
                @select="handleSelect"
                style="width:220px"
                ></el-autocomplete>
            </el-form-item>
           
           
            
            
          </el-form>
          <el-form label-width="80px">
            <el-form-item label="辐射面">
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
            
              <el-form-item label="设备温度">
                <el-autocomplete
                class="inline-input"
                v-model="msg.power"
                :fetch-suggestions="querySearch"
                placeholder="输入温度"
                :trigger-on-focus="false"
                @select="handleSelect"
                style="width:220px"
                ><template slot="append">(℃)</template></el-autocomplete>
            </el-form-item>
            
            <el-form-item label="输入电源">
                <el-select v-model="msg.election" placeholder="请选择电源">
                <el-option label="DC24V 90W" value="DC24V 90W"></el-option>
                
                
            </el-select>
            </el-form-item>
            <el-form-item label="设备料号">
                <el-select v-model="msg.area" placeholder="请选择标签规格">
                <el-option label="300-000-0091 中规" value="300-000-0091"></el-option>
                <el-option label="300-000-0090 欧规" value="300-000-0090"></el-option>
                <el-option label="300-000-0089 英规" value="300-000-0089"></el-option>
                <el-option label="300-000-0088 美规" value="300-000-0088"></el-option>
                <el-option label="300-000-0092 日规" value="300-000-0092"></el-option>
                

                
            </el-select>
            </el-form-item>
            <el-form-item label="标签规格">
                
                 <el-select value-key="index" v-model="msg.identification" placeholder="请选择标签规格">
                <el-option label="中文 小标" value="1"></el-option>
                <el-option label="中文 大标" value="2"></el-option>
                <el-option label="英文 小标" value="3"></el-option>
                <el-option label="英文 大标" value="4"></el-option>
                

                
            </el-select>
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
  name: '',
  data(){
      return{
          msg:{
              model:"",
              modelname:'',
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
              Factory:[]
          },
          control:true,
          URL:'http://localhost:8080'
      }
  },
  store,

  methods:{
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      select(){
        console.log(this.msg.factorY)
        this.msg.factory=this.msg.factorY.id;
      },

      make(){
          
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
          {"value":'便携式黑体'},
          {"value":'200x110x110'},
          {"value":'200x120x103'},
          {"value":'180x110x110'},
          {"value":'72mm*72mm'},
          {"value":'SN-TH01'},
          {"value":'40(+5℃-50℃ adjustable)'},
          {"value":'40(环温+5℃-50℃可调)'},
          {"value":"Protable Blackbody"}
        ];
      },
      handleSelect(item) {
        console.log(item);
      },
      back(){
          
          this.$router.push('/')
      }
  },updated(){
    
  },mounted(){
    this.restaurants = this.loadAll();
    // this.$store.commit('test')
    // console.log(this.$store.state.compant)
    // this.msg.Factory=this.$store.state.compant
    // console.log(this.msg.Factory)
    this.URL=this.$store.state.URL
    axios.get(this.URL+'/factory/getAll').then((data)=>{
            console.log(data)
            this.msg.Factory=data.data.data
            // console.log(state)
        })
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
