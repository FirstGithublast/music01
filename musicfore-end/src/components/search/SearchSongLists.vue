<template>
  <div class="search-song-Lists">
    <div></div>
    <content-list :contentList="songLists"></content-list>
  </div>
</template>

<script>
  import ContentList from "../ContentList";
  import {download,getSongListOfTitle} from "../../api";
  import {mixin} from "../../mixins";

  export default {
    mixins:[mixin],
    name: "SearchSongList",
    components:{
      ContentList
    },
    created() {
      this.getListSong()
    },
    data(){
      return{
        songLists:[],       //搜素查询到的歌单
      }
    },
    methods:{
      getListSong(){
        if(!this.$route.query.keywords){
          this.notify("你输入的内容为空",'waring')
        }else {
          getSongListOfTitle(this.$route.query.keywords).then(res=>{
            console.log(this.$route.query.keywords)
            if (res.code==1){
              this.songLists=res.title;
              this.notify("查询成功",'waring')
            }else {
              this.notify("您查询的歌单不存在",'waring')
            }
          })
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/search-song-Lists";

</style>