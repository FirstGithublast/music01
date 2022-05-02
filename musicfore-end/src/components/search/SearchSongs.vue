<template>
  <div>
    <album-content :songList="listOfSongs"></album-content>
  </div>
</template>

<script>
  import {mapGetters} from "vuex"
  import {mixin} from "../../mixins";
  import AlbumContent from "../AlbumContent";
  import {getAllSongName} from "../../api"
  export default {
    mixins:[mixin],
    name: "SearchSongs",
    components:{
      AlbumContent
    },
    computed:{
      ...mapGetters([
          'listOfSongs'
      ])
    },
    mounted() {
      this.getSong()
    },
    methods:{
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
  @import "../../assets/css/search-songs.scss";

</style>