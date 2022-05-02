<template>
  <div class="the-header">
    <div @click="goHome" class="header-logo">
      <svg class="icon">
        <use xlink:href="#icon-erji"></use>
      </svg>
      <span>music</span>
    </div>
    <ul class="thes-navbar" ref="change">
      <li :class="{active: item.name === activeName}" v-for="item in navMsg" :key="item.path" @click="goPage(item.path,item.name)">
        <span class="the-title">{{item.name}}</span>
      </li>
    </ul>
    <div class="header-search" >
      <input class="text" @keyup.enter="goSearch()" v-model="keywords" value="搜素音乐">
      <div class="search-btn" @click="goSearch()">
        <svg class="icon">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
      </div>
    </div>
    <ul class="thes-navbar" ref="change" v-if="signLogin">
      <li :class="{active: item.name === activeName}" v-for="item in rightNav" :key="item.path" @click="goPage(item.path,item.name)">
        <span class="the-title">{{item.name}}</span>
      </li>
    </ul>
    <div v-else class="img">
      <el-dropdown>
        <span class="el-dropdown-link">
           <!--    头像-->
          <el-avatar class="avators" :size="50" :src="this.avator"></el-avatar>
        </span>
<!--        下拉框-->
        <el-dropdown-menu slot="dropdown" style="margin-top: 10px">
          <el-dropdown-item  v-for="(item,index) in menuLists" @click.native="goSet(item.path)" :key="index">
            {{item.name}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<!--导航栏-->
<script>
  import {navMsg,loginMsg,menuList} from "../assets/data/header";
  import {mapGetters} from "vuex"
  import {getAllSongName} from "../api"
  export default {
    name: "TheHeader",
    data(){
      return{
        navMsg:[],    //左侧导航栏
        keywords:'',  //关键字
        rightNav:[],  //右侧导航栏
        users:'',
        avator:'',    //头像
        menuLists:[]  //菜单设置
      }
    },
    created(){
      this.navMsg=navMsg
      this.rightNav=loginMsg
      this.menuLists=menuList
      this.$store.commit("setChapter",false)
    },
    computed:{
      ...mapGetters([
        'activeName',
        'signLogin',//是否登陆
        'user',
      ])
    },
    watch:{
      user(){
        this.users=this.user
        this.avator=this.$store.state.configure.HOST+this.user.avator
      },

    },
    methods:{
      goHome(){
        this.$router.push({path:'/'})
      },
      goPage(path,name){
        this.$router.push({path:path})
        this.$store.commit("setActiveName",name)
      },
      goSearch(){
        if (this.$route.path!="/search"){
          this.$router.push({path:'/search',query:{keywords:this.keywords}}).catch(error=>error)
        }else {
          this.getSong(this.keywords)
        }

      },
      //下拉框跳转
      goSet(path){
        console.log(path)
        if (path==0){
          this.$store.commit('setSignLogin',true)
          this.$store.commit('setAvator',false)
        }else {
          this.$router.push(path)
        }
      },
      getSong(keywords){
        getAllSongName(keywords).then(res=>{
          if (!res.length){
            this.$store.commit("setListOfSongs",res)
            this.notify('暂无符合条件的歌曲','waring');
          }else {
            this.$store.commit("setListOfSongs",res)
          }
        }).catch(error=>{
          console.log(e)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "../assets/css/the-header.scss";
  .thes-navbar{
    display: flex;
    flex-direction: row;
    align-items: center;
    list-style:none;
    margin-left: 10px;

  }
  .thes-navbar li{
    padding: 0 10px;
    flex-direction: row;
  }
  .el-dropdown-link {
    margin-left: 30px;

  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .avators{
    margin-top: 10px;
  }
</style>