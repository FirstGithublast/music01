<template>
  <div class="song-audio">
    <audio :src="url" ref="player" controls="controls" @timeupdate="timeupdate" preload="true" @canplay="startPlay" @ended="ended">
    </audio>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "SongAudio",
    data(){
      return{
        src:''
      }
    },
    computed:{
      ...mapGetters([
        'id',
        'isPlay',
        'url',
        'changeTime', // 指定播放时刻
        'volume',
      ])
    },
    watch:{
      isPlay:function () {
        this.togglePlay()
      },
      changeTime:function () {
        let player=this.$refs.player
        player.currentTime=this.changeTime
      },
      volume:function(val){
        this.$refs.player.volume=this.volume
      }
    },
    methods:{
      //获取连接准备播放
      startPlay(){
        console.log("获取连接准备播放")
        let player = this.$refs.player
        //  记录音乐时长
        this.$store.commit('setDuration', player.duration)
        //  开始播放
        player.play()
        this.$store.commit('setIsPlay', true)
      },
      // 音乐播放结束时触发
      ended () {
        console.log("暂停播放")
        this.$store.commit('setIsPlay', false)
        this.$store.commit('setCurTime', 0)
        this.$store.commit('setAutoNext', !this.autoNext)//每次结束时，autoNext都会发生变化
      },
      //开始暂停播放
      togglePlay(){
        let player=this.$refs.player
        if (this.isPlay){
          //开始播放
          player.play()
        }else {
          //暂停播放
          player.pause()
        }
      },
      // 音乐播放时记录音乐的播放位置
      timeupdate(){
        let player=this.$refs.player
        this.$store.commit('setCurTime', player.currentTime)
      }
    }
  }
</script>

<style scoped>
  .song-audio{
    display: none;
  }
</style>