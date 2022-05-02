<template>
  <div class="song-lyric">
    <h1 class="lyric-title">歌词</h1>
<!--    有歌词-->
    <ul class="has-lyric" v-if="lyr.length" key="index">
      <li v-for="(item,index) in lyr" v-bind:key="index">
        {{item[1]}}
      </li>
    </ul>
<!--    没有歌词-->
    <div v-else class="no-lyric" key="no-lyric">
      <span>暂无歌词</span>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "Lyric",
    data(){
      return{
        lyr:[]
      }
    },
    computed:{
      ...mapGetters([
          'lyric',
          'curTime', // 当前音乐的播放位置
          'id',
          'listIndex' , // 当前歌曲在歌曲列表的位置
          'listOfSongs',//当前歌曲列表
      ])
    },
    watch:{
      id(){
        this.lyr=this.lyric
        console.log("lyr:"+this.lyr)
      },
      curTime(){
        if (this.lyr.length>0){
          for (let i=0;i<this.lyr.length;i++){
            if (this.curTime>=this.lyr[i][0]){
              for (let j=0;j<this.lyr.length;j++){
                document.querySelectorAll('.has-lyric li')[j].style.color='#000';
                document.querySelectorAll('.has-lyric li')[j].style.fontSize='15px';
              }
              if(i>=0) {
                  document.querySelectorAll('.has-lyric li')[i].style.color='#95d2f6';
                  document.querySelectorAll('.has-lyric li')[i].style.fontSize='25px';
                  document.querySelectorAll('.has-lyric li')[i].style.font='center';
                }
            }
          }
        }
      }
    },
    created() {
      this.lyr=this.lyric
      console.log("lyric:"+this.lyr.length)
    },

  }
</script>

<style scoped lang="scss">
  @import "../assets/css/lyric";
  ul{
      list-style: none;
  }
</style>