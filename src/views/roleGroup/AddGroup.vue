<template>
  <div>
    <el-form
      :model="form"
      status-icon

      label-width="100px"

    >
      <el-form-item label="分组名称" prop="groupName">
        <el-input
          type="text"
          v-model="form.groupName"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createGroup">点击创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {createRuleGroupApi} from '@/api/api'
export default {
  data() {
    return {
      form: {
        groupName: "",
      },
    };
  },
  methods: {
   async createGroup() {
       let res=await createRuleGroupApi(this.form)
       console.log(res);
   },
  },
};
</script>