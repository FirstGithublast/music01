<template>
  <div class="singer">
    <content-list :contentList="singer"></content-list>
  </div>
</template>

<script>
  import SongListAlbum from "../components/SongListAlbum";
  import ContentList from "../components/ContentList";
  import {getAllSinger} from "../api"
  export default {
    name: "Singer",
    components:{
      SongListAlbum,
      ContentList
    },
    data(){
      return{
        singer:[],        //所有歌单
      }

    },
    created(){
      this.getSinger()
      this.$store.commit("setChapter",true)
    },
    methods:{
      getSinger(){
        getAllSinger().then(res=>{
          this.singer=res
        })
      },
    },
  }
</script>

<style lang="scss" scoped lans="scss">
  @import "../assets/css/singer";
</style>