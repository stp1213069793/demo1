<template>
  <div class="home">
    <el-container class="container">
      <el-header class="header flex-between">
        <div class="grid-content align-center">
          <img class="icon-logo" src="../assets/icon-menu.png" alt="" />
          现代学徒云平台
        </div>
        <div class="grid-content align-center font-size_12">
          <div>武汉市 2017-07-20 15:00 星期三 21-22℃ 晴 风力 2级 风向 微风</div>
          <img
            class="icon-headportrait"
            src="../assets/icon_avatar.png"
            alt=""
          />
          <span class="user" v-if="userInfo" >{{userInfo.phone}}</span>
          <img @click="signOut" class="icon-close" src="../assets/icon-close.png" alt="" />
          <span @click="signOut">退出</span>
        </div>
      </el-header>
      <el-container>
        <el-aside>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#0c1c35"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>题库管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click="navigator('questionBank')">题库管理</el-menu-item>
                <el-menu-item index="1-2" @click="navigator('htmlBank')">HTML题库</el-menu-item>
                <el-menu-item index="1-3" @click="navigator('cssBank')">CSS题库</el-menu-item>
                <el-menu-item index="1-4" @click="navigator('jsBank')">JS题库</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="2" @click="navigator('')">
              <i class="el-icon-menu"></i>
              <span slot="title">匹配比赛</span>
            </el-menu-item>
            <el-menu-item index="3" @click="navigator('register')">
              <i class="el-icon-menu"></i>
              <span slot="title">注册</span>
            </el-menu-item>
            <el-menu-item index="4" @click="navigator('login')">
              <i class="el-icon-menu"></i>
              <span slot="title">登录</span>
            </el-menu-item>
            <el-menu-item index="5" @click="navigator('queryTask')">
              <i class="el-icon-document"></i>
              <span slot="title">查询任务列表</span>
            </el-menu-item>
            <el-menu-item index="6" @click="navigator('ceshi')">
              <i class="el-icon-setting"></i>
              <span slot="title">测试</span>
            </el-menu-item>
            <el-submenu index="7">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>账号设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="7-1" @click="navigator('personInfo')">个人资料</el-menu-item>
                <el-menu-item index="7-2" @click="navigator('AuthorityMmanagement')">权限管理</el-menu-item>
                <el-menu-item index="7-3" @click="navigator('cssBank')">修改密码</el-menu-item>
                <el-menu-item index="7-4" @click="navigator('')">账号绑定</el-menu-item>
                <el-menu-item index="7-4" @click="navigator('')">认证信息</el-menu-item>
                <el-menu-item index="7-4" @click="navigator('')">企业链接</el-menu-item>
                <el-menu-item index="7-4" @click="navigator('jsBank')">焦点图片</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
                <el-menu-item index="8" @click="navigator('chatInterface')">
              <i class="el-icon-setting"></i>
              <span slot="title">聊天界面</span>
            </el-menu-item>
                <el-menu-item index="9" @click="navigator('ctreateTask')">
              <i class="el-icon-setting"></i>
              <span slot="title">创建任务</span>
            </el-menu-item>
                <el-menu-item index="10" @click="navigator('userInformationList')">
              <i class="el-icon-setting"></i>
              <span slot="title">用户信息列表</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {getUesrInfoApi,logOutApi} from '@/api/api'
export default {
  data() {
    return {
      // username:'',
    userInfo:[]
    };
  },
  created(){
     getUesrInfoApi().then(res=>{
       this.userInfo=res.data.data[0];
       if (res.data.status==401) {
         this.$router.push({
           name:'login'
         })
       }
     });
        // 不要用循环
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    navigator(name) {
      if (this.$route.name == name) return;
      this.$router.push({
        name: name,
      });
    },
   async signOut(){
     let res= await logOutApi();
        if (res.data.status==1) {
          sessionStorage.removeItem('token')
          this.$router.push('/');
        }
    }
  },
};
</script>
<style lang="scss" scoped>
.header {
  background-color: #3981ed;
  color: #fff;
  min-width: 800px;
  & .grid-content {
    padding-right: 4px;
  }
  & .font-size_12 {
    font-size: 12px;
  }
  & .icon-logo {
    width: 40px;
    height: 30px;
    vertical-align: middle;
  }
  & .icon-headportrait {
    width: 30px;
    height: 30px;
    vertical-align: middle;
    border-radius: 20px;
    margin-left:20px;
  }
  & .user{
    margin-right: 15px;
  }
  & .icon-close {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin-left:  7px;
  }
}
.el-aside {
  background-color: #0c1c35;
  color: #fff;
  height: calc(100vh - 60px);
  overflow-x: hidden;

}
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
.el-main {
  height: calc(100vh - 60px);
  padding: 0;
  & .title {
    display: flex;
  }
}
</style>

