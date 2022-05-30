<template>
  <div>
    <div class="login flex-center">
      <div class="popup flex-center">
        <div class="logo flex-colum">
          <div class="icon-logo shadow">H5</div>
          <div class="decs mt-20">mobideo</div>
          <div class="mt-20">DIGITIZING INDUSTRIAL SERVICES</div>
        </div>
        <div class="from">
          <div>
            <div class="lable">USERNAME</div>
            <el-input
              v-model="username"
              placeholder="请输入账号"
              @keyup.enter.native="submit"
            ></el-input>
          </div>
          <div class="mt-10">
            <div class="lable">PASSWORD</div>
            <el-input
              v-model="password"
              placeholder="请输入密码"
              show-password
              @keyup.enter.native="submit"
            ></el-input>
          </div>
          <div class="mt-10 flex-between">
            <el-input
              placeholder="请输入验证码"
              max-length="4"
              v-model="captcha"
              @keyup.enter.native="submit"
            ></el-input>
            <img @click="getCaptch" :src="captchaSrc" alt="" />
            <!-- <img src="/api/captcha" alt=""> -->
          </div>
          <el-button class="mt-30" type="primary" @click="submit"
            >LOGIN</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { encrypt } from "@/assets/utils/index";
import { loginApi, getCapchaApi } from "@/api/api";
export default {
  data() {
    return {
      username: "stp123",
      password: "111111",
      captcha: "",
      captchaSrc: "/api/captcha",
    };
  },
    created(){
    this.getCaptch()
  },
  methods: {
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
      } else if (this.captcha == "") {
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

    enterDown() {
      console.log(window.Event);
    },
    async submit() {
      var isValidate = this.getValidateResult();
      if (!isValidate) return;
      const { username, password, captcha } = this;
      let res = await loginApi({
        username: username,
        password: encrypt(password),
        captcha: captcha,
      });
      console.log(res);
      if (res.data.status == 1) {
        this.$message({
          message: "恭喜你，这是一条成功消息",
          type: "success",
        });
        sessionStorage.setItem("token", res.data.data);
        this.$router.push({
          name: "home",
        });
      } else {
        this.getCaptch();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  background-color: #f5f8fd;
  & .popup {
    width: 800px;
    display: grid;
    grid-template-columns: 2.7fr 3fr;
    border: 14px solid #1e80e1;
    padding: 40px;
    color: #0c80e7;
    font-size: 12px;
    gap: 0 30px;
    & .logo {
      height: 478px;
      background-color: #1e80e1;
      transform: skewX(-10deg) translateX(40px);
      z-index: 100;
      color: #fff;
      & .icon-logo {
        padding: 20px;
        font-size: 60px;
        box-sizing: border-box;
        transform: skewX(10deg);
      }
    }
    & .from {
      min-height: 50%;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 50px;
      box-sizing: border-box;
      & .lable {
        padding: 10px 0;
      }
    }
  }
}
</style>