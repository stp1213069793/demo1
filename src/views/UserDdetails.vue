<template>
  <div>
    <el-descriptions title="用户信息" v-for="(item,index) in userInfo" :key="index">
      <el-descriptions-item label="用户名">{{item.avatarName}}</el-descriptions-item>
      <el-descriptions-item label="手机号">{{item.phone}}</el-descriptions-item>
      <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
      <el-descriptions-item label="备注">
        <el-tag size="small">学校</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="联系地址"
        >江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item
      >
    </el-descriptions>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {},
    };
  },
  created(){
      console.log(this.$route.query.id);
   
  },
};
</script>
<style scoped lang='scss'>
</style>