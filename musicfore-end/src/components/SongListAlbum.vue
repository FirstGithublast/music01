<template>
  <div class="song-list-album">
    <div class="album-slide">
      <div class="album-img">
        <img :src="attachImageUrl(tempList.pic)">
      </div>
      <div class="album-info">
        <h2>简介</h2>
        <span>
          {{tempList.introduction}}
        </span>
      </div>
    </div>
    <div class="album-content">
      <div class="album-title">
        <p>{{tempList.title}}</p>
      </div>
<!--      评分-->
      <div class="album-score">
        <div>
          <h3>歌单评分</h3>
        </div>
        <div>
          <div>
            <el-rate v-model="value5" disabled></el-rate>
          </div>
        </div>
        <span>{{value5*2}}</span>
        <div>
          <h3>评价：</h3>
          <div @click="pushValue()">
            <el-rate v-model="value3" show-text allow-half></el-rate>
          </div>
        </div>
      </div>
<!--      歌曲-->
      <div class="songs-body">
        <album-content :song-list="listSongs">
          <template name="title">歌单</template>
        </album-content>
      </div>
    </div>
    <comment :songListId="this.songListId" :type="1"></comment>
  </div>
</template>
<!--歌单歌曲列表信息-->
<script>
  import {mixin} from "../mixins";
  import {mapGetters} from 'vuex'
  import {getAllListSong,getScore,addRank} from "../api"
  import AlbumContent from "./AlbumContent";
  import Comment from "./Comment";
  export default {
    mixins:[mixin],
    name: "SongListAlbum",
    data(){
      return{
        songListId:'',      //当前歌单id
        listSongs:[],        //当前页面所展示的歌单歌曲列表
        value5:'',          //歌单评分
        value3:'',          //个人歌单评分
      }
    },
    computed:{
      ...mapGetters([
          'tempList',       //当前歌单信息
          'listOfSongs',    //当前歌单列表
          'signLogin',      //判断是否登陆
          'user',           //用户信息
      ])
    },
    created() {
      this.songListId=this.$route.params.id
      this.getListSongId()
      this.getScores(this.songListId)
    },
    components:{
      AlbumContent,
      Comment,
    },
    methods:{
      //获取当前歌单歌曲列表
      getListSongId(){
        getAllListSong(this.songListId).then(res=>{
          console.log("res:")
          console.log(res)
          this.listSongs=res
          this.$store.commit('setListOfSongs',this.listSongs)
        })
      },
      getScores(id){
        getScore(id).then(res=>{
          this.value5=res/2
        })
      },
      //提交评分
      pushValue(){
        if (!this.signLogin){
          let params = new URLSearchParams()
          params.append('songlistid', this.songListId)
          console.log('consumerid'+this.user.id)
          params.append('score', this.value3 * 2)
          addRank({songListId:this.songListId,consumerId:this.user.id,score:this.value3 * 2}).then(res=>{
            if (res.code === 1) {
              this.getScores(this.songListId)
              this.notify('评分成功', 'success')
            } else {
              this.notify('评分失败', 'error')
            }
          })
              .catch(err => {
                console.log(err)
              })
        } else {
          this.value3 = null
          this.notify('请先登录', 'warning')
        }
      }
    }
  }
</script>

<style scoped lang="scss">
@import "../assets/css/song-list-album";
</style>