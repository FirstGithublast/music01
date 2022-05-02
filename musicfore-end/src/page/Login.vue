<template>
  <div class="infelx">
    <login-logo></login-logo>
    <div class="logins">
      <div class="inputs">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <div class="login-head">
            <span >用户登陆</span>
          </div>
          <el-form-item label="用户名" prop="username">
            <el-input type="username" v-model="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="验证吗">
            <el-input v-model="ruleForm.code" style="float: left; width: 172px" maxlength="5"></el-input>
            <el-image :src="captchaImg" class="captchaImg" @click="getCaptcha"></el-image>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">登陆</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>

      </div>
    </div>
  </div>
</template>

<script>
  import {logins,captcha} from "../api";
  import {mixin} from "../mixins";
  import LoginLogo from "../components/LoginLogo";
  import qs from 'qs'

  export default {
    mixins:[mixin],
    name: "Login",
    components:{
      LoginLogo,
    },
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          console.log(rule)
          return callback(new Error('用户名不能为空'));
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }
      };
      return {
        ruleForm: {
          username: '',
          password: '',
          code:'',
          token:''
        },
        captchaImg:'',
        rules: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          username: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    created(){
      this.getCaptcha();
    },
    methods: {
      submitForm() {
        console.log(this.ruleForm.token)
        this.$axios.post('/login?' + qs.stringify(this.ruleForm))
        .then(res=>{
          console.log("nihao:")
          console.log(res)
          const jwt = res.headers['authorization']
          console.log(jwt)
          this.$store.commit("setToken",jwt)
          if (res.data.code==200){
            this.$router.push('/')
            this.$store.commit("setActiveName",'首页')
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getCaptcha(){
        captcha().then(res=>{
          console.log("res:")
          console.log(res)
          this.captchaImg=res.date.captchaImg
          this.ruleForm.token=res.date.token
          this.$store.commit("SetToken",res.date.token)

        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/css/sign-up";
  .infelx{
    display: flex;
    flex-direction: row;
  }
  .logins{
    /*position: relative;*/
    display: flex;
    justify-content: center;
    align-items: center;
    /*text-align: center;*/
    background-color: white;
    /*float: left;*/
    padding:0 400px 0 0;
    /*position: relative;*/

  }
  .inputs{

  }
  .demo-ruleForm{
    /*position: absolute;*/
    /*top: 300px;*/
  }
  .login-head{
    margin-left: 135px;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 600;
    width: 200px;

  }
  .captchaImg {
    float: left;
    margin-left: 8px;
    border-radius: 4px;
  }
</style>