<template>
  <div class="content">
    <h1 class="title">
      <slot name="title"></slot>
    </h1>
    <ul>
      <li>
        <div class="song-item">
          <span class="item-index"></span>
          <span class="item-title">歌曲名</span>
          <span class="item-title">歌手</span>
          <span class="item-intro">专辑</span>
        </div>
      </li>
      <li v-for="(item,index) in songList" :key="index" @mousemove="mouseMove(index)" id="float" @mouseout="mouseEnter">
        <div class="song-item" @click="toplay(item.id,item.url,item.pic,item.name,index,item.lyric)"  >
          <span class="item-index">
            {{index + 1}}
          </span>
          <span class="item-title">{{replaceLName(item.name)}}</span>
          <span class="item-title">{{replaceFName(item.name)}}</span>
          <div>
            <ul v-show="index===icon" >
              <li class="icons">
                <!--        收藏-->
                <div class="item item-volume">
                  <svg class="icon">
                    <use xlink:href="#icon-xihuan-shi"></use>
                  </svg>
                </div>
                <!--       下载-->
                <div class="item" @click="download">
                  <svg class="icon">
                    <use xlink:href="#icon-xiazai"></use>
                  </svg>
                </div>
              </li>
            </ul>
          </div>
          <span class="item-intro">{{item.introduction}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mixin} from "../mixins";
  import {mapGetters} from 'vuex'
  export default {
    mixins:[mixin],
    name: "AlbumContent",
    props:['songList'],
    computed:{
      ...mapGetters([
          'icon'
      ])
    },
    methods:{
      mouseMove(index){
        this.$store.commit('setIcon',index)
      },
      mouseEnter(){
        this.$store.commit('setIcon',false)
      },
      download(){

      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/album-content";
  .icons{
    /*<!--margin-left: -60px;-->*/
    list-style: none;
    display: flex;
    flex-direction: row;
  }
  .item{
    margin-left: 5px;
  }
</style>