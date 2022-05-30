<template>
  <div class="register flex-center">
    <div class="step shadow" v-show="page">
      <el-container class="container">
        <el-header class="align-center">
          <div>注册</div>
        </el-header>
        <el-main class="main shadow flex-column">
          <el-steps
            class="steps"
            :active="active"
            finish-status="success"
            align-center
          >
            <el-step title="注册账号"></el-step>
            <el-step title="注册成功"></el-step>
          </el-steps>
          <el-input
            prefix-icon="el-icon-user-solid"
            class="mt-15"
            v-model="username"
            placeholder="请输入用户名"
          ></el-input>
          <el-input
            prefix-icon="el-icon-user-solid"
            class="mt-15"
            v-model="password"
            placeholder="请输入密码"
            show-password
          ></el-input>
          <el-input
            prefix-icon="el-icon-user-solid"
            class="mt-15"
            v-model="password"
            placeholder="请再次输入密码"
            show-password
          ></el-input>
          <div class="align-center">
            <el-input
              prefix-icon="el-icon-user-solid"
              class="mt-15 pr-5"
              v-model="captcha"
              placeholder="请输入验证码"
            ></el-input>
            <img @click="getCaptch" :src="captchaSrc" alt="" />
          </div>
          <el-input
            prefix-icon="el-icon-user-solid"
            class="mt-15"
            v-model="email"
            placeholder="请输入邮箱"
            email
          ></el-input>
          <el-input
            prefix-icon="el-icon-user-solid"
            class="mt-15"
            v-model="phone"
            placeholder="请输入手机号"
          ></el-input>
          <el-input
            prefix-icon="el-icon-user-solid"
            class="mt-15"
            v-model="name"
            placeholder="请输入真实姓名"
          ></el-input>
          <el-button
            class="btn"
            style="margin-top: 12px"
            @click="registered"
            type="primary"
            >注册</el-button
          >
        </el-main>
      </el-container>
    </div>
    <div v-if="page2" class="flex-colum">
      <!-- <h1>注册成功,{{ count }}秒后跳转首页</h1> -->
      <i class="el-icon-circle-check"></i>
      <p>注册成功,{{ count }}秒后跳转首页</p>
      <el-button type="primary" plain @click="confirm">确认</el-button>
    </div>
  </div>
</template>

<script>
import { encrypt } from "@/assets/utils/index";
import { registerApi, getCapchaApi, loginApi } from "@/api/api";
export default {
  name: "RegisterView",
  data() {
    return {
      labelPosition: "left",
      active: 0,
      username: "",
      password: "",
      captcha: "",
      captchaSrc: "/api/captcha",
      email: "",
      phone: "",
      page: true,
      page2: false,
      count: 3,
      timer:'',
      name:''
    };
  },
  created(){
    this.getCaptch()
  },
   
  methods: {
    next() {
      if (this.active++ > 1) this.active = 0;
    },
    getCaptch() {
      this.captchaSrc = getCapchaApi();
    },
    getValidateResult() {
      var res = { result: true };
      if (this.username == "") {
        this.$message();
        res.result = false;
        res.message = { type: "warning", message: "用户名不能为空" };
      } else if (this.password == "") {
        res.result = false;
        res.message = { type: "warning", message: "密码不能为空" };
      }else if(this.email==''){
        res.result = false;
        res.message = { type: "warning", message: "邮箱不能为空" };
      } else if(this.phone==''){
        res.result = false;
        res.message = { type: "warning", message: "手机号不能为空" };
      }else if (this.captcha == "") {
        res.result = false;
        res.message = { type: "warning", message: "验证码不能为空" };
      } else if (5 > this.username.length || this.username.length > 16) {
        res.result = false;
        res.message = { type: "warning", message: "用户名长度应该在6-15之间" };
      } else if (5 > this.password.length || this.password.length > 16) {
        res.result = false;
        res.message = { type: "warning", message: "密码长度应该在6-15之间" };
      } else if (this.captcha.length != 4) {
        res.result = false;
        res.message = { type: "warning", message: "验证码输入不正确" };
      } else if (/(\W)/.test(this.username)) {
        res.result = false;
        res.message = { type: "warning", message: "用户名有非法字符" };
      }
      if (!res.result) this.$message(res.message);
      return res;
    },
    fn() {
      this.timer = setInterval(() => {
        this.count--;
          console.log(this.timer);
        if (this.count == 0) {
          console.log("成功");
          this.$router.push({
            name: "home",
          });
        }
      }, 1000);
    },
    confirm() {
      this.getToken();
      this.$router.push("/home");
    },
    async getToken() {
      const { username, password, captcha } = this;
      let res = await loginApi({
        username: username,
        password: encrypt(password),
        captcha: captcha,
      });
      if (res.data.status == 1) {
        sessionStorage.setItem("token", res.data.data);
      }
    },
    async registered() {
       var isValidate = this.getValidateResult();
       if (!isValidate) return;
      this.next();
      const { username, password, captcha, email, phone,name } = this;
      let res = await registerApi({
        username: username,
        password: password,
        captcha: captcha,
        email: email,
        phone: phone,
        name:name
      });
      if (res.data.status == 1) {
        console.log(res);
        console.log("成功");
        this.page = false;
        this.page2 = true;
        this.fn();
        this.getToken();
      } else {
        this.getCaptch();
        console.log("失败");
      }
    },
  },
   destroyed(){
     clearInterval(this.timer);
    },
};
</script>

<style lang="scss" scoped>
.register {
  height: 100vh;
  background-color: #fefefe;
  padding: 0 60px;
  & .el-icon-circle-check {
    color: #74f474;
    font-size: 50px;
  }
  & .step {
    background-color: #f9f9fd;
    height: 600px;
    border-radius: 4px;
    min-width: 800px;
    padding: 0 60px;
    & .container {
      height: 100%;
      padding-bottom: 60px;
      & .main {
        background-color: #fff;
        padding: 15px 30%;
        & .steps {
          width: 100%;
        }
        & .btn {
          width: 100%;
        }
      }
    }
  }
}

</style>