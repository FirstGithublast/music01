<template>
  <div class="home">
    <swiper></swiper>
    <div class="section" v-for="(item,index) in songList" :key="index">
      <div class="section-title">
        {{item.name}}
      </div>
      <content-list :contentList="item.list"></content-list>
    </div>
  </div>
</template>

<script>

  import ContentList from "../components/ContentList";
  import Swiper from "../components/Swiper";
  import {getAllSongList,getAllSinger} from "../api";

  export default {
    name: "Home",
    components: {
      Swiper,
      ContentList
    },
    data(){
      return{
        songList:[
          {name:"歌单",list:[]},
          {name:"歌手",list:[]},
        ]
      }
    },
    created(){
      this.getSongList();
      this.getSinger();
      this.$store.commit("setChapter",false)
    },
    methods:{
      getSongList(){
        getAllSongList().then(res=>{
          this.songList[0].list=res.slice(0,10)
        })
      },
      getSinger(){
        getAllSinger().then(res=>{
          this.songList[1].list=res.slice(0,10)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "../assets/css/home.scss";
</style>