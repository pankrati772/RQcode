


<!--
 *                                                     __----~~~~~~~~~~~------___
 *                                    .  .   ~~//====......          __--~ ~~
 *                    -.            \_|//     |||\\  ~~~~~~::::... /~
 *                 ___-==_       _-~o~  \/    |||  \\            _/~~-
 *         __---~~~.==~||\=_    -_--~/_-~|-   |\\   \\        _/~
 *     _-~~     .=~    |  \\-_    '-~7  /-   /  ||    \      /
 *   .~       .~       |   \\ -_    /  /-   /   ||      \   /
 *  /  ____  /         |     \\ ~-_/  /|- _/   .||       \ /
 *  |~~    ~~|--~~~~--_ \     ~==-/   | \~--===~~        .\
 *           '         ~-|      /|    |-~\~~       __--~~
 *                       |-~~-_/ |    |   ~\_   _-~            /\
 *                            /  \     \__   \/~                \__
 *                        _--~ _/ | .-~~____--~-/                  ~~==.
 *                       ((->/~   '.|||' -_|    ~~-/ ,              . _||
 *                                  -_     ~\      ~~---l__i__i__i--~~_/
 *                                  _-~-__   ~)  \--______________--~~
 *                                //.-~~~-~_--~- |-------~~~~~~~~
 *                                       //.-~~~--\
 *                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 *                               神兽保佑            永无BUG
 -->

<template>
  <div class="hello">
  
    <div class="msgset" v-show="true">
   
      <el-form ref="form" :model="form" label-width="150px">
      <el-form-item label="请选择公司">
         <el-select value-key="id" v-model="form.company" @change="select()" placeholder="请选择标签打印的公司">
                <el-option
                v-for="item in Company"
                :key="item.length"
                :label="item.name"
                :value="item"
                >
                </el-option>
            </el-select>
      </el-form-item> 
       <el-form-item label="请选择产品型号">
                <el-select value-key="id" v-model="form.model"   placeholder="请选择产品型号">
                  <el-option
                  v-for="item in modeltype"
                  :key="item.length"
                  :label="item.model"
                  :value="item.model"
                  >
                  </el-option>
                </el-select>
            </el-form-item>
        <el-form-item label="请输入设备功率">
         <el-input v-model="form.power" style="width:220px" placeholder="请输入设备功率" ref="numend"></el-input>
        </el-form-item>
      </el-form>
        <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="请输入产品名称">
         <el-input v-model="form.modelname" style="width:220px" placeholder="输入产品名称" ref="numend"></el-input>
        </el-form-item>
       
        <el-form-item label="输入产品开始SN">
          <el-input v-model="form.beginSN" style="width:220px" placeholder="输入产品开始SN" ref="numend"></el-input>
        </el-form-item>
        <el-form-item label="输入产品结束SN">
          <el-input v-model="form.endSN" style="width:220px" placeholder="输入产品数量" ref="numend"></el-input>
        </el-form-item>
        <el-form-item label="请输入产品尺寸">
         <el-input v-model="form.size" style="width:220px" placeholder="请输入产品尺寸" ref="numend"></el-input>
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
      Company:[],
      company:{},
      modeltype:[],
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
          publishName:'',
          factory:''
       },
      makename:'广东中科四创科技有限公司',
      Printer:[],

      sn_model:''
    }
  },
  methods:{
        onSubmit() {
          // var str1 = '123123213123'
          // var str2 = str1.substr(str1.length-4,4)
          // console.log(str2)
          console.log(this.form.company.id)
          //宇视
          if(this.form.company.id=='78eaa46f0e25406f9d3197316cfc0285'){
            let beginstr = this.form.beginSN.substr(this.form.beginSN.length-4,4)
            let endstr = this.form.endSN.substr(this.form.endSN.length-4,4)
            console.log(beginstr,endstr)
            for(let i=beginstr;i<=endstr;i++){
              console.log(i)
              console.log(this.form.beginSN.substring(0,this.form.beginSN.length-4)+i)
              this.form.sn.push(this.form.beginSN.substring(0,this.form.beginSN.length-4)+i)
            }
            console.log(this.form)
            axios.post(this.URL+'/sys/publishSpecialAgain',this.form).then(data=>{
              console.log(data)
            })
          }
          //科艺光电
          else if(this.form.company.id=='7839115a75184e6391753965a54c0123'){
            let beginstr = this.form.beginSN.substr(this.form.beginSN.length-4,4)
            let endstr = this.form.endSN.substr(this.form.endSN.length-4,4)
            console.log(beginstr,endstr)
            for(let i=beginstr;i<=endstr;i++){
              console.log(i)
              console.log(this.form.beginSN.substring(0,this.form.beginSN.length-4)+i)
              this.form.sn.push(this.form.beginSN.substring(0,this.form.beginSN.length-4)+i)
            }
            console.log(this.form)
            axios.post(this.URL+'/sys/publishSpecialAgain',this.form).then(data=>{
              console.log(data)
            })
          }
          //中科四创
          else if(this.form.company.id=='78be893168234f3081121883bfe123e2'){
            let beginstr = this.form.beginSN.substr(this.form.beginSN.length-5,4)
            let endstr = this.form.endSN.substr(this.form.endSN.length-5,4)
            console.log(beginstr,endstr)
            for(let i=beginstr;i<=endstr;i++){
              console.log(i)
              // console.log(this.form.beginSN.substring(0,this.form.beginSN.length-4)+i)
              this.form.sn.push(this.form.beginSN.substring(0,this.form.beginSN.length-5)+i+'A')
            }
            console.log(this.form)
            axios.post(this.URL+'/sys/publishSpecialAgain',this.form).then(data=>{
              console.log(data)
            })
          }
          //外贸出口
          else if(this.form.company.id=='dbc3e688b9aa44f680fcf0aaf90ee736'){
            let beginstr = this.form.beginSN.substr(this.form.beginSN.length-5,4)
            let endstr = this.form.endSN.substr(this.form.endSN.length-5,4)
            console.log(beginstr,endstr)
            for(let i=beginstr;i<=endstr;i++){
              console.log(i)
              // console.log(this.form.beginSN.substring(0,this.form.beginSN.length-4)+i)
              this.form.sn.push(this.form.beginSN.substring(0,this.form.beginSN.length-5)+i+'A')
            }
            console.log(this.form)
            axios.post(this.URL+'/sys/publishSpecialAgain',this.form).then(data=>{
              console.log(data)
            })
          }
          //中性
          else if(this.form.company.id=='60c6b5d3f42445ef8953dbb92f8d861b'){
            let beginstr = this.form.beginSN.substr(this.form.beginSN.length-4,4)
            let endstr = this.form.endSN.substr(this.form.endSN.length-4,4)
            console.log(beginstr,endstr)
            for(let i=beginstr;i<=endstr;i++){
              console.log(i)
              console.log(this.form.beginSN.substring(0,this.form.beginSN.length-4)+i)
              this.form.sn.push(this.form.beginSN.substring(0,this.form.beginSN.length-4)+i)
            }
            console.log(this.form)
            axios.post(this.URL+'/sys/publishSpecialAgain',this.form).then(data=>{
              console.log(data)
            })
          }
          //中控
          else if(this.form.company.id=='b01530159dbe44c790029a05074358cc'){
            let beginstr = this.form.beginSN.substr(this.form.beginSN.length-6,6)
            let endstr = this.form.endSN.substr(this.form.endSN.length-6,6)
            console.log(beginstr,endstr)
            for(let i=beginstr;i<=endstr;i++){
              console.log(i)
              console.log(this.form.beginSN.substring(0,this.form.beginSN.length-6)+i)
              this.form.sn.push(this.form.beginSN.substring(0,this.form.beginSN.length-6)+i)
            }
            console.log(this.form)
            axios.post(this.URL+'/sys/publishSpecialAgain',this.form).then(data=>{
              console.log(data)
            })
          }
          
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
      select(){
      console.log(this.form.company)
    //   console.log(this.msg.factorY)
        this.form.factory=this.form.company.id;
        //根据所选公司指定查找公司的指定型号
        axios.post(this.URL+'/Dev/getDevModelByFactoryId',{factoryId:this.form.factory}).then((data)=>{
          console.log(data)
          this.modeltype=data.data.data
          console.log(this.modeltype)
        })
    }
      ,
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
   

//    获取公司

axios.get(this.URL+'/factory/getAll').then((data)=>{
        console.log(data.data)
        this.Company=data.data.data
        // console.log(this.company)
      })
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