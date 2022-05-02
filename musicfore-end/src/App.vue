<template>
  <div id="app">
    <the-header></the-header>
    <router-view/>
    <the-aside></the-aside>
    <play-bar></play-bar>
    <scroll-top></scroll-top>
    <song-audio></song-audio>
    <TheFooter></TheFooter>
  </div>
</template>

<script>
  import TheHeader from "./components/TheHeader";
  import ScrollTop from "./components/ScrollTop";
  import TheFooter from "./components/TheFooter";
  import SongAudio from "./components/SongAudio";
  import PlayBar from "./components/PlayBar";
  import TheAside from "./components/TheAside";
  export default {
    name: 'App',
    components: {
      TheHeader,
      ScrollTop,
      TheFooter,
      SongAudio,
      PlayBar,
      TheAside
    }
  }
</script>
<style lang="scss" scoped>
@import "assets/css/app.scss";
</style>
