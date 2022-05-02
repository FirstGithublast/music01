import {getAllSongName} from '../api/index.js'
import user from '../assets/img/user.jpg'
export const mixin={
  methods:{
    //提示信息
    notify(title,type){
      this.$notify({
        title:title,
        type:type
      })
    },
    //获取图片地址
    attachImageUrl(serUrl){
      return serUrl ? this.$store.state.configure.HOST+serUrl : user
      // return serUrl ? this.$store.state.configure.HOST + serUrl || '../assets/img/user.jpg' : ''
    },
    //根据歌手名字模糊查询歌手
    getSong(){
      if (!this.$route.query.keywords){
        this.$store.commit("setListOfSongs",res)
        this.notify('您输入的内容为空','warning')
      }else {
        getAllSongName(this.$route.query.keywords).then(res=>{
          if (!res.length){
            this.$store.commit("setListOfSongs",res)
            this.notify('暂无符合条件的歌曲','waring');
          }else {
            this.$store.commit("setListOfSongs",res)
          }
        }).catch(error=>{
          console.log(e)
        })
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
    //播放
   toplay(id,url,pic,name,index,lyric){
      this.$store.commit('setId',id);
      this.$store.commit('setUrl',this.$store.state.configure.HOST+url);
      this.$store.commit('setpicUrl',this.$store.state.configure.HOST+pic);
      this.$store.commit('setTitle',this.replaceLName(name));
      this.$store.commit('setArtist',this.replaceFName(name));
      this.$store.commit('setListIndex',index);
      this.$store.commit('setLyric',this.parseLyric(lyric));
      this.$store.commit('setIsPlay',true)  //开始播放
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
          let times=t.slice(1,-1).split(':')//取出时间 换算成数组
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
    }
  }
}