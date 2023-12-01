<template>
  <div>
    <el-form ref="form" label-width="70px" :inline="true" class="login-container" :model="form" :rules="rules">
      <h3 class="login-title">系统登录</h3>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          placeholder="请输入密码"
          type="password"
        ></el-input>
      </el-form-item>
      <div class="login-button"> 
        <el-form-item>
            <el-button type="primary" @click="submit()">登录</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import Mock from 'mockjs';
import Cookie from 'js-cookie';
import { getMenu } from '../api'
export default {
  name: "Login",
  data() {  
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, trigger: "blur", message: "请输入用户名" },
        ],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
      },
    };
  },
  methods: {
    //登录
    submit() {
      // const token = Mock.Random.guid()
      // Cookie.set('token',token)
      this.$refs.form.validate((valid) => {
        if(valid) {
          getMenu( this.form ).then (({ data }) => {
            console.log(data);
            if( data.code === 20000 ) {
              Cookie.set('token',data.data.token)
              this.$router.push('home')
            }else {
              this.$message.error("密码错误")
            }
          })
        }
      })  
    


    }
  }
};
</script>

<style lang="less" scoped>
.login-container{
    width: 350px;
    border: 1px solid #eaeaea;
    margin: 180px auto;
    padding: 35px 35px 15px 15px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 25px #cacac6;
    box-sizing: border-box;
    .login-title {
        text-align: center;
        margin-bottom: 40px;
        color: #505458;
    }
    .el-input {
        width: 198px;
    }
    .login-button {
        text-align: center;
    }  
}
</style>