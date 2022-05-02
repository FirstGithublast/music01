<template>
  <div>
<!--    以一行分布 gutter:间距20-->
    <el-row :gutter="20" class="mgb20">
<!--      以列分布 -->
      <el-col :span="6">
        <el-card>
          <div class="grid-content">
            <div class="grid-cont-content">
              <div class="grid-num">{{consumerCount}}</div>
              <div>{{"用户总数"}}</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="grid-content">
            <div class="grid-cont-content">
              <div class="grid-num">{{singCount}}</div>
              <div>{{"歌曲总数"}}</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="grid-content">
            <div class="grid-cont-content">
              <div class="grid-num">{{songCount}}</div>
              <div>{{"歌曲数量"}}</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="grid-content">
            <div class="grid-cont-content">
              <div class="grid-num">{{songListCount}}</div>
              <div>{{"歌单数量"}}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="mgb20">
      <el-col :span="12">
        <h3 class="align-items: center">用户性别比例</h3>
        <div style="background-color: white">
          <ve-pie :data="consumerSex">
          </ve-pie>
        </div>
      </el-col>
      <el-col :span="12">
        <h3 class="">歌曲类型分布</h3>
        <div style="background-color: white">
<!--          圆饼图-->
          <ve-pie :data="songListType">
          </ve-pie>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="mgb20">
      <el-col :span="12">
        <h3 class="align-items: center">歌手性别比例</h3>
        <div style="background-color: white">
          <ve-pie :data="singerType">
          </ve-pie>
        </div>
      </el-col>
      <el-col :span="12">
        <h3 class="">歌曲类型分布</h3>
        <div style="background-color: white">
          <!--          圆饼图-->
          <ve-pie :data="songListType">
          </ve-pie>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {getAllSinger,getAllSong,getAllSongList,getallConsumer} from "../api/index"
  export default {
    name: "InfoPage",
    data(){
      return{
        consumerCount:0,//用户总数
        songCount:0,    //歌曲总数
        singCount:0,    //歌手数量
        songListCount:0, //歌单数量
        allConsume:[],//所有用户
        allSong:[],   //所有歌曲
        allSinger:[],   //所有歌手
        allSongList:[],//所有歌单
        consumerSex:{
          columns:['性别','总数'],
          rows:[
            {'性别':'男','总数':0},
            {'性别':'女','总数':0},
          ]
        },
        songListType:{
          columns:['风格','总数'],
          rows:[
            {'风格':'轻音乐','总数':0},
            {'风格':'粤语','总数':0},
            {'风格':'日韩','总数':0},
            {'风格':'欧美','总数':0},
            {'风格':'BGM','总数':0},
            {'风格':'乐器','总数':0},
          ]
        },
        singerType:{
          columns:['性别','总数'],
          rows:[
            {'性别':'女','总数':0},
            {'性别':'男','总数':0},
            {'性别':'组合','总数':0},
            {'性别':'不明','总数':0},
          ]
        }
      }
    },
    mounted(){
      this.getallConsumers(),this.getAllSingers(),this.getAllSongLists(),this.getAllSongs()
    },
    methods:{
      getAllSingers(){
        getAllSinger().then(res=>{
          console.log(res.length)
          this.allSinger=res
          this.singCount=res.length
          this.allSinger.forEach(s=>{
            this.getSingerStyle(s.sex)
          })
        })
      },
      getSingerStyle(sex){
        if (sex==0){
          this.singerType.rows[0]['总数']++;
        }else if (sex==1){
          this.singerType.rows[1]['总数']++;
        }else if (sex==2){
          this.singerType.rows[2]['总数']++;
        }else {
          this.singerType.rows[3]['总数']++;
        }
      },
      getAllSongs(){
        getAllSong().then(res=>{
          this.allSong=res
          console.log(res.length)
          this.songCount=res.length
        })
      },
      getAllSongLists(){
        getAllSongList().then(res=>{
          this.allSongList=res
          this.songListCount=res.length
          this.allSongList.forEach(s=>{
            console.log(s.style)
            this.getSongListStyle(s.style,this.songListType.rows);
          })
        })
      },
      getSongListStyle(songList,songListStyle){
        songListStyle.forEach(s=>{
          if (songList.includes(s['风格'])){
            s['总数']++;
          }
        })
      },
      getallConsumers(){
        getallConsumer().then(res=>{
          console.log(res.length)
          this.consumerCount=res.length
          this.allConsume=res
          this.consumerSex.rows[0]['总数']=this.setSex(0,res)
          this.consumerSex.rows[1]['总数']=this.consumerCount-this.setSex(0,res)
        })
      },
      setSex(sex,consume){
        let count=0;
        consume.forEach(c=>{
          if (c.sex==sex){
            count++;
          }
        })
        return count;
      }
    }
  }
</script>

<style scoped>
  .grid-content{
    display: flex;
    align-items: center;
    height: 50px;
  }
  .grid-cont-content{
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: darkgray;
  }
  .grid-num{
    font-size: 30px;
    font-weight: bold;
  }
</style>