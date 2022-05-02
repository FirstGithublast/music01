<template>
  <div class="search">
    <nav class="searchList-nav" ref="change">
      <span :class="{isActive:toggle=='Songs'}" @click="handleChangeView('Songs')">歌曲</span>
      <span  :class="{isActive:toggle=='SongLists'}"  @click="handleChangeView('SongLists')">歌单</span>
    </nav>
<!--    判断是否显示哪个页面-->
    <component :is="currentViews"></component>
  </div>
</template>
<!--搜索页面-->
<script>
  import searchSongs from "../components/search/SearchSongs";
  import searchSongLists from "../components/search/SearchSongLists";
  export default {
    name: "Search",
    components:{
      searchSongLists,
      searchSongs,
    },
    data(){
      return{
        toggle:'Songs',
        currentViews:'searchSongs'
      }
    },
    methods:{
      //切换组件
     handleChangeView(component){
       console.log(component)
       this.currentViews='search'+component
       this.toggle=component
     }
    }
  }
</script>

<style lang="scss" scoped>
@import "../assets/css/search.scss";
</style>