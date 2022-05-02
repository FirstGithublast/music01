import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/page/Home";
import MyMusic from "@/page/MyMusic";
import Singer from "@/page/Singer";
import SongList from "@/page/SongList";
import Search from "@/page/Search";
import Lyric from "@/page/Lyric";
import Signup from "@/page/Signup";
import Login from "@/page/Login";
import Setter from "@/page/Setter";
import SongListAlbum from "@/components/SongListAlbum";
import SingerAlbum from "@/components/SingerAlbum";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/my-music',
    component: MyMusic,
  },
  {
    path: '/singer',
    component: Singer,
  },
  {
    path: '/song-list',
    component: SongList,
  },
  {
    path:'/search',
    component:Search
  },
  {
    path:'/login-in',
    component:Login
  },
  {
    path:'/sign-up',
    component:Signup
  },
  {
    path:'/setting',
    component:Setter
  },
  {
    path:'/song-list-album/:id',
    component:SongListAlbum
  },
  {
    path:'/singer-album/:id',
    component:SingerAlbum
  },
  {
    path:'/lyric',
    component:Lyric
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior(to,from,savePosition){  //在点击浏览器后退按钮或切换导航时触发
    return{x:0,y:0}   //滚动条坐标
  }
})
// router.beforeEach((to, from, next) => {
//
// })

export default router
