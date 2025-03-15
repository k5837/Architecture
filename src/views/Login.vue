


<template>
  <div class="login-container">
    <div>
    </div>
    <el-form :model="loginForm" :rules="rules2" status-icon ref="loginForm" label-position="left" label-width="0px"
      class="demo-ruleForm login-page">
      <h3 class="title" style="color: #fff; text-align: center;">Sign in</h3>
      <br />
      <el-form-item prop="userid">
        <el-input type="text" v-model="loginForm.userid" auto-complete="off" placeholder="user id"></el-input>
      </el-form-item>
      <!-- <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="password"></el-input>
        </el-form-item> -->

      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%; background-color: rgba(111, 32, 120, 0.49); border: none;"
          @click="handleSubmit" :loading="logining">Sign in</el-button>
      </el-form-item>
      <div>
       Don't have an account yet?  <RouterLink to="Register"> Sign up now!</RouterLink>
      </div>
    </el-form>
  </div>
</template>
    
  
<script>

// import  {getTransitionRawChildren } from '@vue/runtime-core';
import axios from 'axios'

export default {
  data() {
    return {
      logining: false,
      loginForm: {
        userid: '',
      },
      rules2: {
        userid: [{ required: true, message: 'Please enter the id number', trigger: 'blur' }],
        // password: [{ required: true, message: 'Please input a password', trigger: 'blur' }]
      },
      checked: false
    }
  },
  methods: {

    handleSubmit(event) {   //只有username 没有密码验证 
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$axios.post('http://127.0.0.1/login', {
            userid: this.loginForm.userid, //name/key
          })
            .then((response) => {
              if (response.status === 200) {

                console.log(response.data.message);
                console.log('登录全部数据', response.data.userData)

                const userid = response.data.userData.id;
                console.log('登录ID数据', userid)

                this.$store.commit('GET_USERID', userid)

                window.sessionStorage.getItem('userid', userid);
                console.log('后台储存数据id', window.sessionStorage.getItem('userid', userid))


                this.$message({
                  message: '登录成功',
                  type: 'success'
                })
                this.$router.push({ path: '/generate' })
              }
            })
            .catch((error) => {
              console.log(error)
              this.$message({
                message: '登录失败',
                type: 'error'
              })

            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  }
}



</script>
    
<style scoped>
.login-container {
  background: url("../assets/bg0.jpeg") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
  /* 登录框上下对齐 */
  display: flex;
  align-items: center;
}

.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 0px auto;
  width: 350px;
  padding: 35px 35px 35px 35px;
  background: rgba(255, 255, 255, 0.279);

  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.224);
}

label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}
</style>




