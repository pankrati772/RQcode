/*
 * @Author: PSB
 * @Date: 2020-04-13 14:37:54
 */ 




// 引入vue
import Vue from 'vue';
// 引入vuex
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

// 声明常量
const state = {
    URL:'http://192.168.4.64:8080',
    autotest:'http://192.168.4.83:8080/autotest',
    serverURL:'http://192.168.3.119:8080/autotest',
    compant:''
    // localhost:8080/autotest
}


// 辅助函数
const mutations = {

    test(state){
        // console.log(state.URL)
        axios.get(state.URL+'/factory/getAll').then((data)=>{
            console.log(data)
            state.compant=data.data.data
            console.log(state)
        })
    }
    
}

// 暴露变量
export default new Vuex.Store({
	state,mutations
});