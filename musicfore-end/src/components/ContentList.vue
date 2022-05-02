<template>
  <div class="content-list">
    <ul class="section-content">
      <li class="content-item" v-for="(item,index) in songList" :key="index" @click="goAblum(item,item.name)">
        <img :src="attachImageUrl(item.pic)" class="item-img">
        <div class="mask">
          <svg class="icon">
            <use xlink:href="#icon-bofang"></use>
          </svg>
        </div>
        <p class="item-name">{{item.name||item.title}}</p>
      </li>
    </ul>

    <div class="block" v-if="this.chapter">
      <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              layout="total, prev, pager, next"
              :current-page.sync="currentPage"
              :page-size="pageSize"
              :total="this.contentList.length">
      </el-pagination>
    </div>
  </div>
</template>
<!--主页显示歌手歌单-->
<script>
  import {mixin} from "../mixins";
  import {mapGetters} from "vuex"
  export default {
    mixins:[mixin],
    name: "ContentList",
    props:['contentList'],
    data(){
      return{
        total:10,
        pageSize:10,
        currentPage:1,
        songList:[]
      }
    },
    created() {
    },
    watch:{
      data(){
        this.songList=this.data
      }
    },
    computed:{
      data(){
        return this.contentList.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
      },
      ...mapGetters([
          'chapter'
      ])
    },
    methods:{
      goAblum(item,name){
        this.$store.commit('setTempList',item)    //当前歌单（歌手）信息
        if (name){
          this.$router.push({path:`/singer-album/${item.id}`})
        }else {
          this.$router.push({path:`/song-list-album/${item.id}`})
        }
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize=val
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage=val
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "../assets/css/content-list.scss";
  .block{
    display: flex;
    justify-content: center;

  }
</style>