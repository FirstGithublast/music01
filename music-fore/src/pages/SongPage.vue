<template>
  <div class="table">
    <div class="crumds">
      <i class="el-icon-tickets">歌曲信息</i>
    </div>
    <div class="container">
      <div class="handle-box">
        <!--        <el-button type="primary" size="mini" @click="centerDialogVisible=true">批量删除</el-button>-->
        <template>
          <el-popconfirm title="这是一段内容确定删除吗？" @confirm="delHandle(null)">
            <el-button size="mini" type="primary" slot="reference" :disable="delBtlStatu">批量删除</el-button>
          </el-popconfirm>
        </template>
        <el-divider direction="vertical"></el-divider>
        <el-input v-model="select_word" size="mini" placeholder="请输入歌曲名" class="handle-input"></el-input>
        <el-divider direction="vertical"></el-divider>
        <el-button type="primary" size="mini" @click="centerDialogVisible=true">添加歌曲</el-button>
      </div>
    </div>
    <el-table size="mini" border style="width:100%" heigt="680px" :data="data"@selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column label="歌曲图片" width="110" align="center">
        <template slot-scope="scope">
          <div class="song-img">
            <img :src="getUrl(scope.row.pic)" style="width: 100%">
          </div>
          <div class="play" @click="setSongUrl(scope.row.url, scope.row.name)">
            <div v-if="toggle !== scope.row.name">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofanganniu"></use>
              </svg>
            </div>
            <div v-if="toggle === scope.row.name">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zanting"></use>
              </svg>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="歌手-歌名" width="120" align="center"></el-table-column>
      <el-table-column prop="introduction" label="专辑" width="120" align="center"></el-table-column>
      <el-table-column label="歌词" align="center">
        <template slot-scope="scope">
          <ul style="height: 100px;overflow: scroll">
            <li v-for="(item,index) in parseLyric(scope.row.lyric)" :key="index">{{item}}</li>
          </ul>
<!--          {{scope.row.lyric}}-->
        </template>
      </el-table-column>
      <el-table-column label="更新资源" align="center" width="100px">
        <template slot-scope="scope">
          <el-upload :action="uploadUrl(scope.row.id)" :on-success="handleAvatarSuccess"
                     :before-upload="beforeAvatarUpload">
            <el-button size="mini" type="text">更新图片</el-button>
          </el-upload>
          <el-divider direction="horizontal "></el-divider>
          <el-upload :action="uploadSongUrl(scope.row.id)" :on-success="handleSongAvatarSuccess"
                     :before-upload="beforeSongAvatarUpload">
            <el-button size="mini" type="text">更新歌曲</el-button>
          </el-upload>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center"  >
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <template>
            <el-popconfirm title="这是一段内容确定删除吗？" @confirm="deleteSinger(scope.row.id)">
              <el-button size="mini" type="text" slot="reference" >删除</el-button>
            </el-popconfirm>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div class="pageination">
      <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="[100, 200, 300, 400]"
              layout="total, prev, pager, next"
              :current-page="current"
              :page-size="size"
              :total="total">
      </el-pagination>
    </div>
    <!--    弹窗管理-->
    <el-dialog title="添加歌曲" :visible.sync="centerDialogVisible" width="400px" center>
      <el-form :model="registerForm" res="registerForm" label-width="80px" action="" id="tf">
       <div>
         <label>歌名</label>
         <el-input type="text" name="name" size="mini" v-model="registerForm.name"></el-input>
       </div>
        <div>
          <label>专辑</label>
          <el-input type="text" name="introduction" v-model="registerForm.introduction"></el-input>
        </div>
        <div>
          <label>歌词</label>
          <el-input type="textarea" name="lyric" v-model="registerForm.lyric"></el-input>
        </div>
        <div>
          <el-input type="file" name="file" v-model="file"></el-input>
        </div>
        <el-form-item>
          <el-button size="mini" @click="centerDialogVisible=false">取消</el-button>
          <el-button type="primary" size="mini" @click="addsong">提交</el-button>
        </el-form-item>
      </el-form>
<!--      <el-button size="mini" @click="centerDialogVisible=false">取消</el-button>-->
<!--      <el-button type="primary" size="mini" @click="addsong('registerForm')">提交</el-button>-->
    </el-dialog>
    <!--    编辑管理-->
    <el-dialog title="修改歌曲" :visible.sync="editVisible" width="400px" center>
      <el-form :model="editForm">
        <el-form-item prop="name" label="歌手-歌名" size="mini">
          <el-input v-model="editForm.name" placeholder="歌手-歌名"></el-input>
        </el-form-item>
        <el-form-item prop="introduction" label="专辑" size="mini">
          <el-input v-model="editForm.introduction" placeholder="专辑" type="text"></el-input>
        </el-form-item>
        <el-form-item prop="lyric" label="歌词" size="mini">
          <el-input v-model="editForm.lyric" placeholder="歌词" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" @click="editVisible=false">取消</el-button>
          <el-button type="primary" size="mini" @click="editSave('editForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {getAllSingerSong,updateSong,deleteSong} from "../api/index"
  import {mixin} from "../mixins";
  import {mapGetters} from "vuex";
  import '@/assets/js/iconfont.js';

  export default {
    mixins:[mixin],
    name: "SongPage",
    data(){
      return{
        file:[],//提交文件列表
        centerDialogVisible:false,
        editVisible:false,
        registerForm:{//添加框
          name:'',
          introduction:'',
          // singerName:'',
          lyric:'',//歌词
          singerId:''
        },
        editForm:{//编辑框
          id:'',
          name:'',
          introduction:'',
          lyric:'',

        },
        singerName:'',
        tableData:[],
        tempDate:[],
        select_word:'',
        // total: 0,
        size: 5,
        current: 1,
        multipleSelection:[], //那些框打钩值
        delBtlStatu:true,
        toggle: false,          //播放器的图标状态

      }
    },
    watch:{
      // 搜索框里面的内容发生变化的时候，搜索结果table列表的内容跟着他的内容发生变化
      select_word:function (){
        if(this.select_word == ''){
          this.tableData=this.tempDate
        }else {
          this.tableData=[];
          for (let item of this.tempDate){
            if (item.name.includes(this.select_word)){
              this.tableData.push(item)
            }
          }
        }
      }
    },
    created(){
      this.registerForm.singerId=this.$route.query.id;
      this.singerName=this.$route.query.name;
      this.getData()
    },
    destroyed() {
      this.$store.commit('setIsPlay',false)
    },
    computed:{
      //计算当前表里的数据
      data(){
        return this.tableData.slice((this.current-1)*this.size,this.current*this.size)
      },
      total(){
        return this.tableData.length
      },
      ...mapGetters([
        'id',
        'isPlay',
        'url'
      ])
    },
    methods:{
      //查询所有歌手
      getData(){
        console.log(this.registerForm.singerId)
        getAllSingerSong(this.registerForm.singerId).then(res=>{
          console.log(this.getUrl())
          console.log("查询所有歌手")
          console.log(res)
          this.tempDate=res
          this.tableData=res
        })
      },
      addsong(){
        // var form=new FormData;
        // form.append("file",this.fileList)
        // this.$axios.post('/song/add',{song:this.registerForm,form}).then(res=>{
        //   if (res.code==1){
        //     this.getData();
        //     this.notify("添加成功","success");
        //   }else {
        //     this.notify("添加失败","error")
        //   }
        // })
        let _this=this;
        var form=new FormData(document.getElementById("tf"));
        form.append("file",this.file)
        form.set("name",this.singerName+"-"+this.registerForm.name);
        console.log(form.get("name"));
        form.append("singerId",this.registerForm.singerId)
       if (!form.get("lyric")){
         form.set("lyric",'[00:00:00]暂无歌词')
       }
       console.log(form.get("file"))
        console.log(form.get("name"))
        var req=new XMLHttpRequest();
        req.onreadystatechange=function () {
          if (req.readyState==4&&req.status==200){
            let res=JSON.parse(req.response);
            if (res.code){
              _this.getData();
              _this.registerForm={};
              _this.notify(res.msg,'succes');
            }else {
              _this.notify('保存失败','error')
            }
          }
        }
        req.open('post',`${this.$store.state.HOST}/song/add`,false);

        req.send(form);
        this.centerDialogVisible=false
      },
      uploadSongUrl(id){
        return `${this.$store.state.HOST}/song/updateSong?id=${id}`
      },
      uploadUrl(id){
        return `${this.$store.state.HOST}/song/updateSongPic?id=${id}`
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.size=val
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.current=val
      },
      //弹出编辑页面
      handleEdit(row){
        this.editVisible=true;
        this.editForm={
          id:row.id,
          name:row.name,
          introduction:row.introduction,
          lyric:row.lyric
        }
      },
      //编辑保存
      editSave(editForm){
        updateSong(this.editForm).then(res =>{
          if (res.code==1){
            this.getData()
            this.notify("编辑成功","success");
          }else {
            this.notify("编辑失败","error")
          }
        })
        this.editVisible=false
      },
      //  删除歌手
      deleteSinger(id){
        deleteSong(id).then(res=>{
          if (res.code==1){
            this.getData();
            this.notify("删除成功","success");
          }else {
            this.notify("删除失败","error")
          }
        })
      },
      //下拉列表赋值
      handleSelectionChange(val){
        this.multipleSelection=val
        this.delBtlStatu= val.length == 0
      },
      //批量删除
      delHandle(id){
        this.multipleSelection.forEach(d=>{
          this.deleteSinger(d.id)
        })
        this.getData()
      },
      //解析文本
      parseLyric(text){
        let linse=text.split("\n");//切割成数组
        console.log(linse)
        let patten=/\[\d{2}:\d{2}.(\d{3}|\d{2})\]/g;
        let result=[];
        for (let item of linse){
          let value=item.replace(patten,'');
          result.push(value)
        }
        return result;
      },
      //播放音乐歌曲
      setSongUrl(url,name){
        if (this.toggle===name){
          this.toggle=false
        }else {
          this.toggle=name
        }

        this.$store.commit('setUrl',this.$store.state.HOST+url);
        if (this.isPlay){
          console.log("toggle:"+this.isPlay)
          this.$store.commit('setIsPlay',false)
        }else {
          console.log("toggle:"+name)
          this.$store.commit('setIsPlay',true)
        }
      }
    }

  }
</script>

<style scoped>
  .handle-box{
    margin-bottom: 20px;
  }

  .song-img{
    width: 100%;
    height: 80px;
    border-radius: 5px;
    margin-bottom: 5px;
    overflow: hidden;
  }

  .pageination{
    display: flex;
    justify-content: center;
  }

  .container{
    padding: 20px;
    background: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 5px;
  }
  .crumbs{
    margin-bottom: 20px;
  }
  .handle-input{
    width: 200px;
  }
  .play{
    position: absolute;
    z-index: 100;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    top: 18px;
    left: 15px;
  }
  .icon{
    width: 2em;
    height: 2em;
    color: white;
    fill: currentColor;
    overflow: hidden;
  }
</style>