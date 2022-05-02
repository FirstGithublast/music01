<template>
  <div class="play-bar" :class="{show:!toggle}">
    <div class="item-up" @click="toggle=!toggle" :class="{turn:toggle}">
      <svg class="icon">
        <use xlink:href="#icon-jiantou-xia-cuxiantiao"></use>
      </svg>
    </div>
    <div class="kongjian">
<!--      上一首-->
      <div class="item" @click="prev">
        <svg class="icon">
          <use xlink:href="#icon-ziyuanldpi"></use>
        </svg>
      </div>
<!--      播放-->
      <div class="item" @click="togglePlay">
        <svg class="icon">
          <use :xlink:href="playButtonUrl"></use>
        </svg>
      </div>
<!--       下一首-->
      <div class="item" @click="next">
        <svg class="icon">
          <use xlink:href="#icon-ziyuanldpi1"></use>
        </svg>
      </div>
<!--      歌曲图片-->
      <div class="item-img" @click="toLyric">
        <img :src="picUrl"/>
      </div>
<!--     播放进度-->
      <div class="playing-speed">
<!--     播放开始时间-->
        <div class="current-time">{{nowTime}}</div>
        <div class="progress-box">
          <div class="item-song-title">
            <div>{{this.title}}</div>
            <div>{{this.artist}}</div>
          </div>
          <div class="progress" ref="progress" @mousemove="mousemove">
<!--       进度条-->
            <div ref="bg" class="bg" @click="updatemove">
              <div ref="curProgress" class="cur-progress" :style="{width:curLength+'%'}"></div>
            </div>
<!--            拖动的点点-->
            <div ref="idot" class="idot" :style="{left:curLength+'%'}" @mousedown="mousedown" @mouseup="mouseup"></div>
          </div>
        </div>
<!--        播放结束时间-->
        <div class="left-time">{{songTime}}</div>
<!--        音量-->
        <div class="item item-volume">
          <svg class="icon" v-if="volume == 0">
            <use xlink:href="#icon-yinliangjingyinheix"></use>
          </svg>
          <svg class="icon" v-else>
            <use xlink:href="#icon-yinliang1"></use>
          </svg>
          <el-slider class="volume" v-model="volume" :vertical="true"></el-slider>
        </div>
<!--        收藏-->
        <div class="item item-volume" @click="addOrUpCollect(this.user.id,id)">
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
<!--        当前播放的歌曲列表-->
        <div class="item" @click="changeAside">
          <svg class="icon">
            <use xlink:href="#icon-liebiao"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex"
  import {download} from "../api";

  export default {
    name: "PlayBar",
    data(){
      return{
        nowTime:'00:00',    //当前播放进度的时间
        songTime:'00:00',    //当前歌曲总时间
        curLength:0,        //进度条的位置
        progressLength:0,   //进度条的总长度
        mouseStartx: 0,     //拖拽开始位置
        tag:false,          //拖拽开始结束的标志，当开始拖拽，值会变成true
        volume: 50,         //
        toggle:true,        //是否隐藏进度条
      }
    },
    computed:{
      ...mapGetters([
        'isPlay',     //是否播放中
        'url',        //歌曲地址
        'id',         //歌曲id
        'duration',   //  音乐时长
        'curTime',    // 当前音乐的播放位置
        'changeTime', //  指定播放时刻
        'playButtonUrl', // 播放状态的图标
        'title', //  歌名
        'artist', //  歌手名
        'picUrl', // 歌曲图片
        'listIndex' , // 当前歌曲在歌曲列表的位置
        'listOfSongs',//当前歌曲列表
        'autoNext',//自动播放下一首音乐
        'user',   //用户信息
      ])
    },
    mounted(){
      this.progressLength=this.$refs.progress.getBoundingClientRect().width// 通过dom元素来得到盒子大小和位置
      this.$store.commit('setPlayButtonUrl','#icon-bofang')
      //通过class样式来的得到dome节点
      document.querySelector('.item-volume').addEventListener('click',function (e) {//通过事件进行监听
        document.querySelector('.volume').classList.add('show-volume');//通过dom元素来添加一个样式
        e.stopPropagation();//停止操作其他父控件
      },false),
      document.querySelector('.volume').addEventListener('click',function (e) {
        e.stopPropagation();
      },false)
      document.addEventListener('click',function () {
        document.querySelector('.volume').classList.remove('show-volume')
      },false)
    },
    watch:{//监控发生的值
        isPlay(){
          //切换播放状态的图标
          if (this.isPlay){
            this.$store.commit('setPlayButtonUrl','#icon-zanting')
          }else {
            this.$store.commit('setPlayButtonUrl','#icon-bofang')
          }
        },
      curTime(){
          this.nowTime=this.formatSeconds(this.curTime);
          this.songTime=this.formatSeconds(this.duration);
          this.curLength=(this.curTime/this.duration)*100
        },
      //音量变化
      volume(){
          this.$store.commit('setVolume',this.volume/100)
      },
      autoNext(){
          this.next();
      }
    },
    methods:{
    //  控制音乐播放、暂停
      togglePlay(){
        if (this.isPlay){
          this.$store.commit('setIsPlay',false)
        }else {
          this.$store.commit('setIsPlay',true)
        }
      },
      // 解析时间格式
      formatSeconds(value){
        let theTime=parseInt(value)
        let result='' //返回值
        let hour=parseInt(theTime/3600);//小时
        let minute=parseInt((theTime/60)%60) //分钟
        let second=parseInt(theTime%60)//秒
        if (hour>0){
          if (hour<10){
            result='0'+hour+":"
          }else {
            result=hour+":"
          }
        }
        if (minute>0){
          if (minute<10){
            result+='0'+minute+":"
          }else {
            result+=minute+":"
          }
        }else {
          result+="00:"
        }
        if (second>0){
          if (second<10){
            result+='0'+second
          }else {
            result+=second
          }
        }else {
          result+="00"
        }
        return result;
      },
      mousemove(e){
        if (!this.duration){
          return false
        }
        if (this.tag){
          let movementX=e.clientX-this.mouseStartx //点点移动的距离
          //getBoundingClientRect() 方法返回一个DOMRect对象，其中包含了盒子的大小及其相对于浏览器窗口的位置
          let curLength=this.$refs.curProgress.getBoundingClientRect().width //得到进度条的长度
          let newPercent=((movementX+curLength)/this.progressLength)*100    //得到鼠标拖拽进度条加当前进度条的长度
          if (newPercent>100){
            newPercent=100
          }
          console.log(newPercent)
          this.curLength=newPercent;
          this.mouseStartx=e.clientX
          this.chageTime(newPercent)
        }

      },
      //更改歌曲进度
      chageTime(percent){
        let newCurTime=(percent*0.01)*this.duration
        this.$store.commit('setChangeTime',newCurTime)
      },
      //鼠标点击事件
      mousedown(e){
        this.mouseStartx=e.clientX //移动开始的位置
        this.tag=true
      },
      //鼠标松开事件
      mouseup(){
        this.tag=false
      },
    //  点击进度条切换播放进度
      updatemove(e){
        if (!this.tag){
        //  进度条的左侧坐标    offsetLeft 指 obj 距离左方或上层控件的位置
          let curLength=this.$refs.bg.offsetLeft;
          console.log("curLength:"+curLength)
          console.log(e.clientX)
          let newPercent=((e.clientX-curLength)/this.progressLength)*100;
          if (newPercent>100){
            newPercent=100
          }else if (newPercent<0){
            newPercent=0
          }
          this.curLength=newPercent
          this.chageTime(newPercent)
        }
      },
      //显示歌曲列表
      changeAside(){
        this.$store.commit('setShowAside',true)
      },
      prev(){//上一首
        if (this.listIndex!=-1 && this.listOfSongs.length>1){//音乐只有一首或者是没有时
          if (this.listIndex>0){//也就是说不是第一首音乐
            this.$store.commit('setListIndex',this.listIndex-1)
          }else {//第一首音乐
            this.$store.commit('setListIndex',this.listOfSongs.length-1)//播放最后一首
          }
          this.toplay(this.listOfSongs[this.listIndex].url)
        }
      },
      next(){
        if (this.listIndex!=-1 && this.listOfSongs.length>1){//音乐只有一首或者是没有时
          if (this.listIndex<this.listOfSongs.length-1){//也就是说不是最后一首音乐
            this.$store.commit('setListIndex',this.listIndex+1) //最后一首
          }else {//第一首音乐
            this.$store.commit('setListIndex',0)//播放第一首
          }
          this.toplay(this.listOfSongs[this.listIndex].url) //播放歌曲
        }
      },
      //获取名字 通过歌曲
      replaceLName(name){
        let arr=name.split('-')
        return arr[0]
      },
      //获取歌名 通过歌曲
      replaceFName(name){
        let arr=name.split('-')
        return arr[1]
      },
      //解析歌词
      parseLyric(text){
        let lines=text.split("\n");                   //将歌词分解成数组
        let patten=/\[\d{2}:\d{2}.(\d{2}|\d{3})\]/g;  //时间格式的正则表达式
        let result=[];
        //对于歌词不正确的直接返回
        if (!(/\[.+\]/.test(text))){
          return [[0,text]]
        }
        //去掉格式不正确的行
        while(!patten.test(lines[0])){
          lines=lines.slice(1) //从哪个元素（下标）开始取值
          console.log("lines:"+lines)
        }
        //遍历每一行，形成一个每行带着两元素的数组。第一个是时间，第二个是歌词
        lines.forEach(line=>{
          let time=line.match(patten)//存前面的时间段   match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。
          let value=line.replace(patten,"");//replace:替换格式  存歌词
          time.forEach(t=>{
            let times=t.slice(1,-1).split(":")//取出时间 换算成数组
            if (value!='') {
              result.push([parseInt(times[0], 10) * 60 + parseFloat(times[1]), value])
            }
          })
        })
        //按照的一个元素 时间-排序
        result.sort(function (a, b) {
          return a[0]-b[0]  //从小到大排列
        })
        return result;
      },
      //播放
      toplay(url){
        if (url!=this.url && url){//当地址不是同一个地址，进行播放且url不能为空
          this.$store.commit('setId',this.listOfSongs[this.listIndex].id);
          this.$store.commit('setUrl',this.$store.state.configure.HOST+this.listOfSongs[this.listIndex].url);
          this.$store.commit('setpicUrl',this.$store.state.configure.HOST+this.listOfSongs[this.listIndex].pic);
          this.$store.commit('setTitle',this.replaceLName(this.listOfSongs[this.listIndex].name));
          this.$store.commit('setArtist',this.replaceFName(this.listOfSongs[this.listIndex].name));
          this.$store.commit('setLyric',this.parseLyric(this.listOfSongs[this.listIndex].lyric));
          this.$store.commit('setIsPlay',true)  //开始播放
        }
      },
      //跳转到歌词
      toLyric(){
        this.$router.push(`/lyric`)
      },
      //下载歌曲
      download(){
        download(this.url).then(res=>{
          let content=res.data;
          let eleLink=document.createElement('a')
          eleLink.download=`$(this.artist)-$(this.title).mp3`;
          eleLink.style.display='none';
          //把字符内容转换blob地址
          let blob=new Blob([content])
          eleLink.href=URL.createObjectURL(blob)
          //把链接地址加到document
          document.body.appendChild(eleLink)
          //触发点击
          eleLink.click();
          //然后移除掉新加的控件
          document.body.removeChild(eleLink)
        }).catch(err=>{
          console.log(err)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/play-bar";

</style>