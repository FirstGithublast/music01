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
        <el-input v-model="select_word" size="mini" placeholder="请输入歌手名" class="handle-input"></el-input>
        <el-divider direction="vertical"></el-divider>
        <el-button type="primary" size="mini" @click="centerDialogVisible=true">添加歌手</el-button>
      </div>
    </div>
    <el-table size="mini" border style="width:100%" heigt="680px" :data="data"@selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column label="用户图片" width="110" align="center">
        <template slot-scope="scope">
          <div class="singer-img">
            <img :src="getUrl(scope.row.avator)" style="width: 100%">
          </div>
          <el-upload :action="uploadUrl(scope.row.id)" :on-success="handleAvatarSuccess"
                     :before-upload="beforeAvatarUpload">
            <el-button size="mini">跟新图片</el-button>
          </el-upload>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="120" align="center"></el-table-column>
      <el-table-column prop="sex" label="性别" width="50" align="center">
        <template slot-scope="scope">
          <el-tag size="small" v-if="scope.row.sex === 0" type="success">女</el-tag>
          <el-tag size="small" v-else-if="scope.row.sex === 1">男</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="phoneNum" label="手机号" width="120" align="center"></el-table-column>
      <el-table-column prop="email" label="电子邮箱" width="120" align="center"></el-table-column>
      <el-table-column prop="birth" label="生日" width="120" align="center"></el-table-column>
      <el-table-column prop="introduction" label="签名" width="120" align="center"></el-table-column>
      <el-table-column prop="location" label="地区" width="100" align="center"></el-table-column>
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
    <el-dialog title="添加歌手" :visible.sync="centerDialogVisible" width="400px" center>
      <el-form label-width="80px" :model="registerForm">
        <el-form-item prop="username" label="用户名" size="mini">
          <el-input v-model="registerForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" size="mini">
          <el-input v-model="registerForm.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="性别" size="mini">
          <el-radio-group v-model="registerForm.sex" >
            <el-radio :label="0">女</el-radio>
            <el-radio :label="1">男</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="phoneNum" label="手机号" size="mini">
          <el-input v-model="registerForm.phoneNum" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="电子邮箱" size="mini">
          <el-date-picker type="email" placeholder="xxxxx@xx.com" v-model="registerForm.email" style="width:100%"></el-date-picker>
        </el-form-item>
        <el-form-item prop="birth" label="生日" size="mini">
          <el-date-picker type="date" placeholder="选择日期" v-model="registerForm.birth" style="width:100%"></el-date-picker>
        </el-form-item>
        <el-form-item prop="introduction" label="签名" size="mini">
          <el-input v-model="registerForm.introduction" placeholder="签名" type="textarea"></el-input>
        </el-form-item>
        <el-form-item prop="location" label="地区" size="mini">
          <el-input v-model="registerForm.location" placeholder="地区"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" @click="centerDialogVisible=false">取消</el-button>
          <el-button type="primary" size="mini" @click="addsinger('registerForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--    编辑管理-->
    <el-dialog title="编辑歌手" :visible.sync="editVisible" width="400px" center>
      <el-form :model="editForm" label-width="80px">
        <el-form-item prop="name" label="歌手名" label-width="80px" size="mini">
          <el-input v-model="editForm.name" placeholder="歌手名"></el-input>
        </el-form-item>
        <el-form-item label="性别" size="mini">
          <el-radio-group v-model="editForm.sex">
            <el-radio :label="0">女</el-radio>
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">组合</el-radio>
            <el-radio :label="3">不明</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="birth" label="生日" size="mini">
          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth" style="width:100%"></el-date-picker>
        </el-form-item>
        <el-form-item prop="location" lobel="地区" size="mini">
          <el-input v-model="editForm.location" placeholder ="地区"></el-input>
        </el-form-item>
        <el-form-item prop="introduction" lobel="简介" size="mini">
          <el-input v-model="editForm.introduction" placeholder="简介" type="textarea"></el-input>
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
  import {getallConsumer,addConsumer} from "../api/index"
  import {mixin} from "../mixins";

  export default {
    mixins:[mixin],
    name: "ComsumerPage",
    data(){
      return{
        centerDialogVisible:false,
        editVisible:false,
        registerForm:{//添加框
          username:'',
          password:'',
          sex:'',
          phoneNum:'',
          email:'',
          birth:'',
          introduction:'',
          location:'',
        },
        editForm:{
          id:'',
          name:'',
          sex:'',
          birth:'',
          location:'',
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
            if (item.name.includes(this.select_word)){
              this.tableData.push(item)
            }
          }
        }
      }
    },
    created(){
      this.getData()
    },
    computed:{
      //计算当前表里的数据
      data(){
        return this.tableData.slice((this.current-1)*this.size,this.current*this.size)
      },
      total(){
        return this.tableData.length
      }
    },
    methods:{
      //查询所有歌手
      getData(){
        getallConsumer().then(res=>{
          console.log("查询所有歌手")
          console.log(res)
          this.tempDate=res
          this.tableData=res
        })
      },
      addsinger(registerForm){
        addConsumer(this.registerForm).then(res =>{
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
        return `${this.$store.state.HOST}/singer/updateSingerPic?id=${id}`
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
          sex:row.sex,
          birth:row.birth,
          location:row.location,
          introduction:row.introduction
        }
      },
      //编辑保存
      editSave(editForm){
        let d=this.editForm.birth
        // const datetime=d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
        updateSinger(this.editForm).then(res =>{
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
      deleteSinger(id){
        deleteSinger(id).then(res=>{
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
          this.deleteSinger(d.id)
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

  .singer-img{
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