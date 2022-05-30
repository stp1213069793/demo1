<template>
  <div class="main">
    <h1>创建任务</h1>
    <el-form
      ref="form"
      :label-position="labelPosition"
      :model="form"
      label-width="110px"
    >
      <el-form-item label="任务名称：">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="任务时长：">
        <el-input type="text" v-model="form.duration"></el-input>
      </el-form-item>
      <el-form-item label="任务描述：">
        <el-input type="textarea" v-model="form.desc" :rows="8"></el-input>
      </el-form-item>

      <el-form-item label="执行人：">
        <el-select v-model="userId" filterable multiple placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否紧急：">
        <el-switch v-model="form.level"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { createTaskApi, queryUserListApi, publishTaskApi } from "@/api/api";
// publishTaskApi
export default {
  data() {
    return {
      labelPosition: "right",
      form: {
        name: "",
        level: 1,
        desc: "",
        duration: "",
      },
      userId: [],
      taskId: "",
      options: [
        {
          value: "",
          label: "",
        },
      ],
    };
  },
  async created() {
    let resc = await queryUserListApi({ pagination: false });

    this.options = resc.data.data.data.rows;
  },
  methods: {
    async onSubmit() {
      if (this.form.level == true) {
        this.form.level = 1;
      }
      if (this.form.level == false) {
        this.form.level = 0;
      }

      let res = await createTaskApi(this.form);
      if (res.data.status == 1) {
        let resd = await publishTaskApi({
          userId: this.userId,
          taskId: res.data.data[0].id,
        });
        if (resd.data.status == 1) {
          this.$confirm("创建成功", "提示", {
            cancelButtonText: "查看任务列表",
            confirmButtonText: "继续创建",
            type: "success",
          })
            .then(() => {
              this.form = {};
              this.$message({
                type: "info",
                message: "请创建",
              });
            })
            .catch(() => {
              this.$router.push({
                name: "queryTask",
              });
            });
        }
      }
    },
  },
};
</script>
<style scoped lang='scss'>
.main {
  margin: 50px auto;
  width: 50%;
}
</style>