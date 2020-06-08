<!--
 * @Author: PSB
 * @Date: 2020-06-06 11:34:36
 * @LastEditTime: 2020-06-08 10:20:13
 * @FilePath: \RQcode\src\components\outside.vue
--> 

<template>
    <div>
        <!-- <h1>这是外包装箱打印页面</h1> -->
         <div class="msgset" v-show="true">
   
      <el-form ref="form" :model="form" label-width="150px">
      <el-form-item label="请输入第一台设备SN">
         <el-input v-model="form.sn1" placeholder="请输入SN" @focus="cleanSN"></el-input>
      </el-form-item> 
      <el-form-item label="请输入第二台设备SN">
         <el-input v-model="form.sn2" placeholder="请输入SN"></el-input>
      </el-form-item> 
      <el-form-item label="请输入第三台设备SN">
         <el-input v-model="form.sn3" placeholder="请输入SN"></el-input>
      </el-form-item> 
      <el-form-item label="请输入第四台设备SN">
         <el-input v-model="form.sn4" placeholder="请输入SN"></el-input>
      </el-form-item> 
      <el-form-item label="请输入第五台设备SN">
         <el-input v-model="form.sn5" placeholder="请输入SN"></el-input>
      </el-form-item> 
      </el-form>
        <el-form ref="form" :model="form" label-width="150px">
            <el-form-item label="请输入订单号">
         <el-input v-model="form.orderNo" placeholder="请输入订单号"></el-input>
      </el-form-item> 
       <el-form-item label="请输入物料编码">
         <el-input v-model="form.materialCode" placeholder="请输入物料编码"></el-input>
               
            </el-form-item>
        <el-form-item label="请输入设备型号">
         <el-input v-model="form.model" style="width:220px" placeholder="请输入设备型号" ref="numend"></el-input>
        </el-form-item>
        <el-form-item label="请输入日期">
         <el-input v-model="form.mfgDate" style="width:220px" placeholder="例如（yyyy.mm.dd）" ref="numend"></el-input>
        </el-form-item>
       <el-form-item label="请输入重量">
         <el-input v-model="form.weight" style="width:220px" placeholder="请输入重量" ref="numend"></el-input>
        </el-form-item>
         <el-form-item label="请输入一箱数量">
         <el-input v-model="form.quantity" style="width:220px" placeholder="请输入一箱数量" ref="numend"></el-input>
        </el-form-item>
        <el-form-item label="请输入发货总数">
         <el-input v-model="form.allnumber" style="width:220px" placeholder="请输入发货总数" ref="numend"></el-input>
        </el-form-item>
        <!-- <el-form-item label="请输入发货总数">
         <el-input v-model="form.allnumber" style="width:220px" placeholder="请输入发货总数" ref="numend"></el-input>
        </el-form-item> -->
        <el-form-item label="请输入第几箱">
         <el-input v-model="form.numbers" style="width:220px" placeholder="请输入第几箱" ref="numend"></el-input>
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
import store from '@/vuex/store.js'
import axios from 'axios';
export default {
    store,
    data(){
        return{
            URL:'http://localhost:8080',
            form:{
                cartonNoall:'',
                cartonno:''
            }
        }
    },
    methods:{
        //创建标签
        onSubmit(){
            this.form.cartonNoall=this.form.allnumber/this.form.quantity
            this.form.cartonno=this.form.numbers+'/'+this.form.cartonNoall
            console.log(this.form)
            axios.post(this.URL+'/sys/publicZkCodeBox',this.form).then(data=>{
                console.log(data)
                this.form.sn1=''
                this.form.sn2=''
                this.form.sn3=''
                this.form.sn4=''
                this.form.sn5=''
            })
        },
        back(){
        this.$router.push('/')
        },
        clean(){
        window.location.reload()
        },
        cleanSN(){
           
        }
    },
    mounted(){
        this.URL=this.$store.state.URL
        console.log(this.URL)
    }
}
</script>

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