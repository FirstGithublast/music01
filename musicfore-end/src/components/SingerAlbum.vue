<template>
  <div class="singer-album">
    <el-button type="primary" icon="el-icon-arrow-left">上一页</el-button>
    <div class="album-slide">
      <div class="singer-img">
        <img :src="attachImageUrl(tempList.pic)">
      </div>
      <ul class="info">
        <li v-if="singer.sex !== 2">性别：{{attachSex(singer.sex)}}</li>
        <li>生日：{{singer.birth}}</li>
        <li>故乡：{{singer.location}}</li>
      </ul>
    </div>
    <div class="album-content">
      <div class="intro">
        <h2>{{singer.name}}</h2>
        <span>{{singer.introduction}}</span>
      </div>
      <div class="content">
        <album-content :songList="listOfSongs">
          <template slot="title">歌单</template>
        </album-content>
      </div>
    </div>
  </div>
</template>
<!--歌手信息页面-->
<script>
  import {mixin} from "../mixins";
  import {mapGetters} from 'vuex'
  import AlbumContent from "./AlbumContent";
  import {getAllSingerSong} from "../api";
  export default {
    mixins:[mixin],
    name: "SingerAlbum",
    components:{
        AlbumContent,
    },
    data(){
      return{
        singerId:'',        //歌手id
        singer:'',          //当前歌手信息

      }
    },
    computed:{
      ...mapGetters([
          'tempList',
          'listOfSongs',
      ])
    },
    created() {
      console.log(this.$route)
      this.singerId=this.$route.params.id
      this.singer=this.tempList
      this.getAllSong(this.singerId)
    },
    methods:{
      attachSex(value){
        if (value =='女'){
          return '女'
        }else {
          return '男'
        }
      },
      getAllSong(id){
        getAllSingerSong(id).then(res=>{
          this.$store.commit("setListOfSongs",res)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
@import "../assets/css/singer-album";
</style>