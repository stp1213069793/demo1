<template>
  <div class="newRule">
    <div class="header">
      <h3>新增角色权限</h3>
      <div>
        <div class="header-size">
          <span class="el-icon-house"></span>
          <span>· 系统管理</span>
          <span>· 角色权限</span>
          <span>· 新增角色权限</span>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="select-rule">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="新增角色" class="ssss">
            <el-input
              v-model="formInline.roleName"
              placeholder="请输入名字"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属部门">
            <el-select v-model="formInline.groupId "  placeholder="请选择">
              <el-option :label="item.groupName" v-for="item in groups" :key="item.id" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <permissionSelection></permissionSelection>
    </div>
    <el-button type="primary" @click="createRule">点击创建</el-button>
  </div>
</template>
<script>
import permissionSelection from "@/components/PermissionSelection.vue";
import { queryRuleGroupListApi,createRuleApi } from "@/api/api";


export default {
  components: {
    permissionSelection,
  },
  data() {
    return {
      formInline: {
        roleName: "",
         groupId :''
      },
       groups:[]
    };
  },
  async created() {
    let res = await queryRuleGroupListApi();
  
    this.groups=res.data.data.rows
    
  
  },
  methods: {
    async createRule() {
        console.log(this.formInline.group);
      let res =await createRuleApi(this.formInline)
      console.log(res);
    },
  },
};
</script>
<style scoped lang='scss'>
.newRule {
  padding: 0 20px;
  & .header {
    display: grid;
    grid-template-columns: 200px auto;
    align-items: center;
    & .header-size {
      font-size: 13px;
      color: #4483cb;
    }
  }
  & .main {
    & .select-rule {
      //   display: flex;
      & .ssss {
        margin-right: 60px;
      }
    }
  }
}
</style>