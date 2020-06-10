<template>
  <div id="app">
    
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
      <el-table-column
        label="公司名称"
        prop="factory">
      </el-table-column>
      <el-table-column
        label="黑体型号"
        prop="model">
      </el-table-column>
      <el-table-column
        align="right">
        
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
     
    
    </el-table>

 <!-- 分页模块 -->
      <el-pagination
        class="page"
        background
        layout="prev, pager, next"
        @current-change="handleSizeChange"
        :page-size='8'
        :total="this.ALL"
        >
      </el-pagination>
    

    <div class="msgset" v-show="true">
   
      <el-form ref="form" :model="form" label-width="80px">

        <el-form-item label="选择公司">
            <el-select value-key="id" v-model="company"  placeholder="请选择公司">
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
        <el-form ref="form" :model="form" label-width="80px">
        
        <el-form-item label="设备型号">
          <el-input v-model="form.model" style="width:220px" placeholder="请输入设备型号">
            
          </el-input>
          <!-- <input class="changenum" type="text" v-model="form.model"> -->
        </el-form-item>
        
    
         

         
        <el-form-item style="position:absolute;botton:0;left:2%;" >
          <el-button class="btn" type="primary" @click="onSubmit" v-show="build">立即创建</el-button>
          <el-button class="btn" type="primary" @click="EDIT" v-show="edit">修改数据</el-button>
          <el-button class="btn" type="danger" @click="back">返回</el-button>
          
        </el-form-item>
        
      </el-form>
      
      
    </div>
    
  </div>
</template>

<script>
import store from '@/vuex/store.js'
import axios from 'axios'
export default {
  name: 'App',
  store,
  methods:{
    back(){
        this.$router.push('/')
      },
      onSubmit(){
        console.log('确定添加')
        console.log(this.form)
        axios.post(this.URL+'/Dev/inSertDevModel',this.form).then((data)=>{
          console.log(data)
          axios.post(this.URL+'/Dev/ModelGetAll',{"pageNum":"1","pageSize":"8"}).then((data)=>{
            // console.log(data.data.data)
            this.tableData=data.data.data.data
            this.ALL=data.data.data.pagetotal*8
            this.company=''
            this.form.model=''
          })
        })
      },
      // 修改接口
      handleEdit(index, row) {
        let {id,model,factory} = row
        this.form.model=model
        
        this.company=factory
        setTimeout(()=>{
          this.form.id=id
        },200)
        console.log(this.form)
        this.edit=true
        this.build=false
      },
      // 删除接口
      handleDelete(index, row) {
        console.log(index, row);
        axios.post(this.URL+'/Dev/DeleteDevModel',{id:row.id}).then((data)=>{
          
          console.log(data)

          axios.post(this.URL+'/Dev/ModelGetAll',{"pageNum":"1","pageSize":"8"}).then((data)=>{
            // console.log(data.data.data)
            this.tableData=data.data.data.data
            this.ALL=data.data.data.pagetotal*8
          })
        })
      },
      //翻页事件
     handleSizeChange(value){
       console.log(value)
       axios.post(this.URL+'/Dev/ModelGetAll',{"pageNum":value,"pageSize":"8"}).then((data)=>{
      // console.log(data.data.data)
      this.tableData=data.data.data.data
    })
     },
     EDIT(){
      //  console.log('这是修改按钮')
       console.log(this.form)
               // 更新接口
        axios.post(this.URL+'/Dev/updateDevModel',this.form).then((data)=>{
          console.log(data)
          this.company=''
          this.form.model=''
          this.build=true
          this.edit=false
          axios.post(this.URL+'/Dev/ModelGetAll',{"pageNum":"1","pageSize":"8"}).then((data)=>{
            // console.log(data.data.data)
            this.tableData=data.data.data.data
            this.ALL=data.data.data.pagetotal*8
          })
        })

     }
  },
  data(){
    return{
      form:{
        factory:'',
        model:''
      },
      Company:'',
      company:'',
      ALL:8,
      URL:'',
      build:true,
      edit:false,

      tableData: [{
          name: '',
          model: '无数据',
         
        }, 
        ],
        search: ''
    }
  },
  mounted(){
    this.URL=this.$store.state.URL
    // 获取公司名字
    axios.get(this.URL+'/factory/getAll').then((data)=>{
        console.log(data.data)
        this.Company=data.data.data
        console.log(this.Company)
      })
      // 获取第一页列表
    axios.post(this.URL+'/Dev/ModelGetAll',{"pageNum":"1","pageSize":"8"}).then((data)=>{
      console.log(data.data.data)
      this.tableData=data.data.data.data
      this.ALL=data.data.data.pagetotal*8
    })
  },
  watch:{
    company(newValue){
      console.log(newValue)
        this.form.factory = newValue.id
    }
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
.page{
  margin:20px 38%;
}
.changenum{
        -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-variant: tabular-nums;
    list-style: none;
    -webkit-font-feature-settings: 'tnum';
    font-feature-settings: 'tnum';
    position: relative;
    display: inline-block;
    width: 53%;
    height: 40px;
    padding: 4px 11px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    line-height: 1.5;
    background-color: #fff;
    background-image: none;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
}
</style>
