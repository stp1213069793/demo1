<template>
  <div class="jurisdiction">
    <div class="jurisdiction-header">
      <span class="el-icon-user"></span>
      <span>角色管理</span>
    </div>

    <div class="jurisdiction-all">
      <div class="jurisdiction-aside">
        <div class="add">
          <div @click="newRole">
            <span class="el-icon-coffee"></span>
            <span>新增角色</span>
          </div>
          <div>
            <span class="el-icon-coffee"></span>
            <span @click="addGroup">新建分组</span>
          </div>
        </div>
        <div>
          <el-tree
            :data="data"
            :props="defaultProps"
            @node-click="handleNodeClick"
          ></el-tree>
        </div>
      </div>
      <div class="main">
        <div style="padding: 10px 0">
          <span>所有者</span>
          <span>系统默认角色</span>
        </div>

        <div class="select">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="角色成员" name="first">
              <div v-for="item in ruleList" :key="item.id">
                <el-button
                  >名称：{{ item.roleName }}————分组ID：{{
                    item.groupId
                  }}</el-button
                >
              </div>
            </el-tab-pane>
            <el-tab-pane label="功能权限" name="second">
              <permissionSelection></permissionSelection>
            </el-tab-pane>
            <el-tab-pane label="数据范围" name="third">数据范围</el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const cityOptions = ["上海", "北京", "广州", "深圳"];
import PermissionSelection from "@/components/PermissionSelection.vue";
import { queryRuleListApi, queryRuleGroupListApi } from "@/api/api";
import Group from "@/assets/data/group";
export default {
  components: {
    PermissionSelection,
  },
  data() {
    return {
      data: [],
      activeName: "second",
      checkAll: false,
      checkedCities: ["上海", "北京"],
      cities: cityOptions,
      isIndeterminate: true,
      defaultProps: {
        children: "children",
        label: "label",
      },
      ruleList: [],
      groupList: [],
    };
  },
  created() {
    this.getMenuList();

  },
  methods: {
    async getMenuList() {
      let [roleData, groupData] = await Promise.all([
        queryRuleListApi({pagination:false}),
        queryRuleGroupListApi({pagination:false}),
      ]);
      let roleList = roleData.data.data.rows;
      let groupList = groupData.data.data.rows;
      console.log(groupList);
      console.log(roleList);
      let group = new Group({
        groupList,
        roleList,
      });
      this.data = group.menu;
     console.log(this.data);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    newRole() {
      this.$router.push({
        name: "newRole",
      });
    },
    addGroup() {
      this.$router.push({
        name: "addGroup",
      });
    },
  },
};
</script>
<style scoped lang='scss'>
.jurisdiction {
  box-sizing: border-box;
  padding: 10px;
  height: 100%;
  & .jurisdiction-header {
    padding: 8px 0;
    border-bottom: 1px solid #ccc;
  }
  & .jurisdiction-all {
    display: grid;
    grid-template-columns: 200px auto;
    & .jurisdiction-aside {
      //   height: calc(100vh - 60px - 60px);

      border-right: 1px solid blueviolet;
      & .add {
        padding: 10px 0;
        display: flex;
        justify-content: space-evenly;
      }
    }
    & .main {
      padding: 0 16px;
      & .select {
        .select-all {
          padding: 0 0 20px 0;
        }
      }
    }
  }
}
</style>