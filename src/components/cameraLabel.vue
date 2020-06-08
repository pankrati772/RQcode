



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
      这是摄像机标签更换页面
    <div class="msgset" v-show="true">
   
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="请输入设备1MAC地址">
            <el-input v-model="form.MAC1" style="width:220px" placeholder="请输入MAC地址" ref="numend"></el-input>
        </el-form-item>
        <el-form-item label="请输入设备2MAC地址">
            <el-input v-model="form.MAC2" style="width:220px" placeholder="请输入MAC地址" ref="numend"></el-input>
        </el-form-item>
      </el-form>
        <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="请输入产品1SN">
         <el-input v-model="form.cameraSN1" style="width:220px" placeholder="输入产品SN" ref="numend"></el-input>
        </el-form-item>
        <el-form-item label="请输入产品2SN">
         <el-input v-model="form.cameraSN2" style="width:220px" placeholder="输入产品SN" ref="numend"></el-input>
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
        
          
      
       },
      makename:'广东中科四创科技有限公司',
      Printer:[],

      sn_model:''
    }
  },
  methods:{
   onSubmit() {
       this.form.sn1='ZK'+this.form.cameraSN1+'SC'
       this.form.sn2='ZK'+this.form.cameraSN2+'SC'
       console.log(this.form)

       axios.post(this.URL+'/sys/publishCameraCode',this.form).then((data)=>{
           console.log(data)
       })
      
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
    //   console.log(this.form.company)
    // //   console.log(this.msg.factorY)
    //     this.form.factory=this.form.company.id;
    //     //根据所选公司指定查找公司的指定型号
    //     axios.post(this.URL+'/Dev/getDevModelByFactoryId',{factoryId:this.form.factory}).then((data)=>{
    //       console.log(data)
    //       this.modeltype=data.data.data
    //       console.log(this.modeltype)
    //     })
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