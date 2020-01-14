import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import deviceCenter from '../views/deviceCenter.vue'
import deviceList from '../views/deviceList.vue'
import deviceManage from '../views/deviceManage.vue'
import organManage from '../views/organManage.vue'
import roleManage from '../views/roleManage.vue'
import userManage from '../views/userManage.vue'
import infoCenter from '../views/infoCenter.vue'
import videoPlayer from '../views/videoPlayer.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children:[
      {
        path:'/deviceCenter',
        name:'deviceCenter',
        component:deviceCenter,
        redirect:'/deviceList',
        children:[
          {
            path:'/deviceList',
            name:'deviceList',
            component:deviceList
          },
          {
            path:'/deviceManage',
            name:'deviceManage',
            component:deviceManage
          },
          {
            path:'/deviceManage/edit/:id',
            name:'deviceEdit',
            component:deviceManage,
            props:true
          },
          
        ]
      },
      {
        path:'/organManage',
        name:"organManage",
        component:organManage
      },
      {
        path:'/roleManage',
        name:"roleManage",
        component:roleManage
      },
      {
        path:'/userManage',
        name:"userManage",
        component:userManage
      },
      {
        path:'/infoCenter',
        name:"infoCenter",
        component:infoCenter
      },
      {
        path:'/video',
        name:"videoPlayer",
        component:videoPlayer
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
