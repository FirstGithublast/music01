import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'login',
    component:()=>import('../pages/Login.vue')
  },
  {
    path:'/home',
    name:'home',
    component:()=>import('../components/Home.vue'),
    children:[
      {
        path:"/info",
        component:()=>import('../pages/InfoPage.vue')
      },
      {
        path:"/theAside",
        component:()=>import('../components/TheAside.vue')
      },
      {
        path:"/theHeader",
        component:()=>import('../components/TheHeader.vue')
      },
      {
        path:"/consumer",
        component:()=>import('../pages/ComsumerPage.vue')
      },
      {
        path:"/singer",
        component:()=>import('../pages/SingerPage.vue')
      },
      {
        path:"/songList",
        component:()=>import('../pages/SongListPage.vue')
      },
      {
        path:"/songPage",
        component:()=>import('../pages/SongPage.vue')
      },
      {
        path:"/listSongPage",
        component:()=>import('../pages/ListSongPage.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
