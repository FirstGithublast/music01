<template>
  <div class="comment">
    <h2>评论</h2>
    <div class="comment-msg">
      <div class="comment-img">
        <img :src="attachImageUrl(this.avator)" alt="">
      </div>
      <el-input
              class="comment-input"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="textarea">
      </el-input>
    </div>
    <el-button type="primary" class="sub-btn" @click="postComment()">评论</el-button>
    <p>精彩评论: 共 {{userComment.length}} 条评论</p>
    <ul v-for="(item,index) in userComment" class="popular" :key="index">
      <li>
        <div class="popular-img">
          <img :src="attachImageUrl(userpic[index])" alt="">
        </div>
        <div class="popular-msg">
          <ul>
            <li class="name">{{username[index]}}</li>
            <li class="time">{{item.createTime}}</li>
            <li class="content">{{item.content}}</li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>
<!--评论-->
<script>
  import {mixin} from "../mixins";
  import {mapGetters} from "vuex"
  import {getComment,getUserById,addComment} from "../api"
  export default {
    name: "comment",
    mixins:[mixin],
    props:[
      'songListId',         // 歌曲ID或歌单ID
      'type',               // 歌单（1）/歌曲（0）
    ],
    computed:{
      ...mapGetters([
          'user',
          'avator',
          'signLogin'
      ])
    },
    data(){
      return{
        userpic:[],     //所有用户评论的头像
        userComment:[], //获取所有用户评论的信息
        username:[],    //保存所有用户名字
        textarea:'',    //评论
        phtos: '../assets/img/user.jpg'
      }
    },
    mounted() {
      this.getUserComment()
    },
    methods:{
      postComment(){
        if (!this.signLogin){
          if (this.type==1){
            addComment({userId:this.user.id,songListId:this.songListId,content:this.textarea,type:this.type}).then(res=>{
              if (res.code === 1) {
                this.notify('添加成功', 'success')
                this.getUserComment();
                this.textarea=''
              } else {
                this.notify('添加失败', 'error')
              }

            })
          }
        }else{
          this.notify('请登录','warning')
        }
      },
      getUserComment(){
        if (this.type==1){
          getComment().then(res=>{
            res.sort(function (a, b) {
              let aTimeString=a.createTime
              let bTimeString=b.createTime
              // let time=new Date(aTimeString).getTime()
              // aTimeString=aTimeString.replace(/-/g,'/')
              // bTimeString=bTimeString.replace(/-/g,'/')
              let aTime=new Date(aTimeString).getTime()
              let bTime=new Date(bTimeString).getTime()
              // console.log("bTime:")
              // console.log(bTime)
              return bTime-aTime
            })
            this.userComment=res
            // console.log("res:")
            // console.log(res)
            res.forEach(comment=>{
              this.getUserPic(comment.userId)
            })
          })
        }

      },
      getUserPic(id){
        getUserById(id).then(res=>{
          this.userpic.push(res.avator)
          this.username.push(res.username)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
@import "../assets/css/comment";
</style>