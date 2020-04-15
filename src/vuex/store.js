// 引入vue
import Vue from 'vue';
// 引入vuex
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

// 声明常量
const state = {
    URL:'http://192.168.4.83:8080',
    autotest:'http://192.168.4.83:8080/autotest',
    compant:''
}


// 辅助函数
const mutations = {
	add(state){
		state.count++;	
	},
	jian(state){
		state.count--;
    },
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