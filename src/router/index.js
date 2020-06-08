/*
 * @Author: your name
 * @Date: 2020-06-02 09:13:19
 * @LastEditTime: 2020-06-06 13:43:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RQcode\src\router\index.js
 */ 
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Model from '@/components/modelchoice'
import Once from '@/components/onsemodel'
import blackmsg from '@/components/model/blackmsg'
import cameramsg from '@/components/model/cameramsg'
import camera from '@/components/camera'
import DY from '@/components/DY'
import last from '@/components/last'
import JYlast from '@/components/JYlast'
import Configuration from '@/components/Configuration'
import SpecialLabel from '@/components/SpecialLabel'
import cameraLabel from '@/components/cameraLabel'
import outside from '@/components/outside'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'model',
      component:Model
    }
    ,
    {
      path: '/numbers',
      name: 'HelloWorld',
      component: HelloWorld
    }
    ,
    {
      path: '/Configuration',
      name: 'Configuration',
      component: Configuration
    },
    {
      path: '/outside',
      name: 'outside',
      component: outside
    },
    {
      path: '/SpecialLabel',
      name: 'SpecialLabel',
      component: SpecialLabel
    }
    ,
    {
      path: '/cameraLabel',
      name: 'cameraLabel',
      component: cameraLabel
    }
    ,
    {
      path: '/JYlast',
      name: 'JYlast',
      component: JYlast
    },
    {
      path: '/DY',
      name: 'DY',
      component: DY
    },
    {
      path: '/last',
      name: 'last',
      component: last
    },
    {
      path: '/camera',
      name: 'camera',
      component: camera,
      children:[
        {
          path:'cameramsg',
          name:'cameramsg',
          component:cameramsg
        }
      ]
    },
    {
      path:'/ones',
      name:'ones',
      component:Once,
      children:[
        {
          path:'blackmsg',
          name:'blackmsg',
          component:blackmsg
        }
      ]
    }
  ]
})
