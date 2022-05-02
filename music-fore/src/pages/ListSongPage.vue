<template>
  <div class="table">
    <div class="container">
      <div class="handle-box">
        <!--        <el-button type="primary" size="mini" @click="centerDialogVisible=true">批量删除</el-button>-->
        <template>
          <el-popconfirm title="这是一段内容确定删除吗？" @confirm="delHandle(null)">
            <el-button size="mini" type="primary" slot="reference" :disable="delBtlStatu">批量删除</el-button>
          </el-popconfirm>
        </template>
        <el-divider direction="vertical"></el-divider>
        <el-input v-model="select_word" size="mini" placeholder="筛选关键字" class="handle-input"></el-input>
        <el-divider direction="vertical"></el-divider>
        <el-button type="primary" size="mini" @click="centerDialogVisible=true">添加歌曲</el-button>
      </div>
    </div>
    <el-table size="mini" border style="width:100%" heigt="680px" :data="data"@selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column label="歌曲图片" width="110" align="center">
        <template slot-scope="scope">
          <div class="songList-img">
            <img :src="getUrl(scope.row.pic)" style="width: 100%">
          </div>
          <el-upload :action="uploadUrl(scope.row.id)" :on-success="handleAvatarSuccess"
                     :before-upload="beforeAvatarUpload">
            <el-button size="mini">跟新歌单</el-button>
          </el-upload>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="歌手-歌名" width="120" align="center"></el-table-column>
      <el-table-column prop="introduction" label="简介" align="center">
        <template slot-scope="scope">
          <p style="height: 100px;overflow: scroll">{{scope.row.introduction}}</p>
        </template>
      </el-table-column>
      <el-table-column label="歌单管理" width="150" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="songManage(scope.row.id)">歌单管理</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center"  >
        <template slot-scope="scope">
          <template>
            <el-popconfirm title="这是一段内容确定删除吗？" @confirm="deleteSongLists(scope.row.id)">
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
      <el-form :model="registerForm" res="registerForm">
        <el-form-item prop="name" label="歌手" size="mini">
          <el-input v-model="registerForm.name" placeholder="歌手"></el-input>
        </el-form-item>
        <el-form-item prop="songName" label="歌曲" size="mini">
          <el-input v-model="registerForm.songName" placeholder="歌曲" type="text"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" @click="centerDialogVisible=false">取消</el-button>
          <el-button type="primary" size="mini" @click="addSongList('registerForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--    编辑管理-->
    <el-dialog title="编辑歌单" :visible.sync="editVisible" width="400px" center>
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
  import {getAllListSong,addListSong,deleteListSong} from "../api/index"
  import {mixin} from "../mixins";

  export default {
    mixins:[mixin],
    name: "ListSongPage.vue",
    data(){
      return{
        centerDialogVisible:false,
        editVisible:false,
        registerForm:{//添加框
          name:'',
          songName:'',
          songListId:''
        },
        editForm:{
          id:'',
          title:'',
          style:'',
          introduction:''
        },
        tableData:[],
        tempDate:[],
        select_word:'',
        // total: 0,
        size: 5,
        current: 1,
        multipleSelection:[], //那些框打钩值
        delBtlStatu:true

      }
    },
    watch:{
      //搜索框里面的内容发生变化的时候，搜索结果table列表的内容跟着他的内容发生变化
      select_word:function (){
        if(this.select_word == ''){
          this.tableData=this.tempDate
        }else {
          this.tableData=[];
          for (let item of this.tempDate){
            if (item.title.includes(this.select_word)){
              this.tableData.push(item)
            }
          }
        }
      }
    },
    created(){
      this.registerForm.songListId=this.$route.query.id
      this.getData()
    },
    computed:{
      //计算当前表里的数据
      data(){
        if (this.tableData.length!=null){
          return this.tableData.slice((this.current-1)*this.size,this.current*this.size)
        }

      },
      total(){
        return this.tableData.length
      }
    },
    methods:{
      //查询所有歌手
      getData(){
        getAllListSong(this.registerForm.songListId).then(res=>{
          console.log(this.getUrl())
          console.log("查询所有歌手")
          console.log(res)
          this.tempDate=res
          this.tableData=res
        })
      },
      addSongList(registerForm){
        addListSong(this.registerForm).then(res =>{
          if (res.code==1){
            this.getData();
            this.notify("添加成功","success");
          }else {
            this.notify("添加失败","error")
          }
        })
        this.centerDialogVisible=false
      },
      uploadUrl(id){
        return `${this.$store.state.HOST}/songlist/updateSingerPic?id=${id}`
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
          title:row.title,
          introduction:row.introduction,
          style: row.style
        }
      },
      //编辑保存
      editSave(editForm){
        assListSong(this.editForm).then(res =>{
          if (res.code==1){
            this.notify("编辑成功","success");
          }else {
            this.notify("编辑失败","error")
          }
        })
        this.editVisible=false
        this.getData()
      },
      //  删除歌手
      deleteSongLists(id){
        deleteListSong(id,this.registerForm.songListId).then(res=>{
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
        console.log("val")
        console.log(val)
        this.multipleSelection=val
        this.delBtlStatu= val.length == 0
        console.log(this.delBtlStatu)
      },
      //批量删除
      delHandle(id){
        this.multipleSelection.forEach(d=>{
          this.deleteSongLists(d.id)
        })
      },
      songManage(id,name){
        this.$router.push({path:`/songPage`,query:{id,name}})
      }
    }
  }
</script>

<style scoped>
  .handle-box{
    margin-bottom: 20px;
  }

  .songList-img{
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
</style>