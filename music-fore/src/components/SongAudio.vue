<template>
  <div class="song-audio">
    <audio :src="url" id="player" controls="controls" preload="true" @canplay="startPlay" @ended="ended">
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
        'url'
      ])
    },
    watch: {
      // 监听播放还是暂停
      isPlay: function () {
        this.togglePlay()
      }
    },
    methods:{
      //获取连接准备播放
      startPlay(){
        let player=document.querySelector('#player');
        //开始播放
        player.play();
      },
      //播放完之后触发
      ended(){
        //停止播放
        this.isPlay=false
      },
      //开始暂停播放
      togglePlay(){
        let player=document.querySelector('#player');
        if (this.isPlay){
          //开始播放
          player.play()
        }else {
          //暂停播放
          player.pause()
        }
      }
    }
  }
</script>

<style scoped>
  .song-audio{
    display: none;
  }
</style>