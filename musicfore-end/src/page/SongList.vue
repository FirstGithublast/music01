<template>
  <div class="song-list">
    <content-list :contentList="songList"></content-list>
  </div>
</template>

<script>
  import SongListAlbum from "../components/SongListAlbum";
  import ContentList from "../components/ContentList";
  import Comment from "../components/Comment";
  import {getAllSongList} from "../api"
  export default {
    name: "SongList",
    components:{
      SongListAlbum,
      ContentList,
      Comment
    },
    data(){
      return{
        songList:[],        //所有歌单
      }

    },
    created(){
      this.getSongList()
      this.$store.commit("setChapter",true)
    },
    methods:{
      getSongList(){
        getAllSongList().then(res=>{
          this.songList=res
        })
      },
    },


  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/song-list";
  .SongList-head{
    *zoom: 1;
    min-width: 982px;
    background: #f5f5f5;
    margin-top: 100px;
  }
  .g-wrap6 {
    padding: 47px 30px 40px 39px;
  }
</style>