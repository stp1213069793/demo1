<template>
  <div class="queryTask">
    <div class="task-header">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="任务名称">
          <el-input
            v-model="formInline.taskName"
            placeholder="请输入任务名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-date-picker
            v-model="formInline.value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="任务执行人">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <template>
            <el-button type="primary" @click="search(formInline)"
              >搜索</el-button
            >
          </template>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="empty">清空</el-button>
        </el-form-item>
      </el-form>
      <!-- <div style="display:flex">
        <span for="" class="mr-10">用户名</span>
        <el-input placeholder="请输入内容" v-model="input4">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
      <div>
        <el-button type="primary" icon="el-icon-edit"></el-button>
        <el-button type="primary" icon="el-icon-share"></el-button>
        <el-button type="primary" icon="el-icon-delete"></el-button>
      </div> -->
    </div>
    <div class="form">
      <el-table
        :data="tableData"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
        size="small"
        style="width: 100%"
      >
        <el-table-column width="50" type="selection"> </el-table-column>
        <el-table-column width="50" label="ID">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column width="150" label="taskName">
          <template slot-scope="scope">
            {{ scope.row.taskName }}
          </template>
        </el-table-column>

        <el-table-column width="60" label="level">
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.level">紧急</el-tag>
            <el-tag type="success" v-else>普通</el-tag>
          </template>
        </el-table-column>

        <el-table-column width="200" label="desc">
          <template slot-scope="scope">
            {{ scope.row.desc }}
          </template>
        </el-table-column>
        <el-table-column width="100" label="date">
          <template slot-scope="scope"> {{ scope.row.duration }}小时 </template>
        </el-table-column>

        <el-table-column width="80" label="name">
          <template slot-scope="scope">
            {{ scope.row.userName }}
          </template>
        </el-table-column>

        <el-table-column width="200" label="createdAt">
          <template slot-scope="scope">
            {{ formatDate(scope.row.createdAt) }}
          </template>
        </el-table-column>

        <el-table-column width="100" label="日期">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.isReceived" type="success">已领取</el-tag>
            <el-tag v-else type="info">未领取</el-tag>
          </template>
        </el-table-column>
        <el-table-column width="200" label="日期">
          <template slot-scope="scope">
            <el-link :underline="false" @click="taskDetails(scope.row)"
              >查看详情</el-link
            >
            <el-link :underline="false" @click="publishTask(scope.row)"
              >发布任务</el-link
            >
            <el-link
              :underline="false"
              v-if="!scope.row.isReceived"
              @click="receiveTask(scope.row)"
              >领取任务</el-link
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer flex-between mt-10">
      <div>{{ count }}条{{ pageCount }}页</div>
      <div>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="count"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog title="选择人员接受任务" :visible.sync="dialogFormVisible">
      <el-select v-model="value" multiple placeholder="请选择">
        <el-option
          v-for="item in newForm"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeTaskPersonnel">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  queryTaskApi,
  publishTaskApi,
  queryUserListApi,
  taskDetailsApi,
  getUesrInfoApi
} from "@/api/api";
import formatDate from "@/mixins/fomatDate";
export default {
  mixins: [formatDate],
  data() {
    return {
      input4: "",
      tableData: [
        {
          taskName: "",
          level: "",
          desc: "",
          createdAt: "",
          userName: "",
          duration: "",
          id: "",
          userId: "",
          isReceived: "",
        },
      ],
      count: 0,
      pageCount: 0,
      allUser: [],
      dialogFormVisible: false,
      form: [],
      newForm: [],
      value: "",
      tid: "",
      formInline: {
        taskName: "",
        region: "",
        value1: "",
      },
    };
  },
  async created() {
    this.queryTaskList();
    let resc = await queryUserListApi({
      pagination: false,
    });
    if (resc.data.data.status == 1) {
      var cc = resc.data.data.data.rows;
      for (const key in cc) {
        this.form.push(cc[key]);
      }
    }
  },

  methods: {
    assignmentData(res) {
      this.tableData = res.data.data.rows;
      this.count = res.data.data.count;
      this.pageCount = res.data.data.pageCount;
    },
    async queryTaskList() {
      let res = await queryTaskApi({});
      this.assignmentData(res);
    },
    async search(e) {
      let res = await queryTaskApi({ taskName: e.taskName });
      this.assignmentData(res);
    },
    empty(){
      this.formInline={}
    },
    async handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      let res = await queryTaskApi({ pageNum: val });
      this.assignmentData(res);
    },

    taskDetails(task) {
      this.$router.push({
        name: "taskDetails",
        query: {
          id: task.id,
        },
      });
    },
    async receiveTask(e) {
      let personalInfo= await getUesrInfoApi();
      let res = await publishTaskApi({
        userId: [personalInfo.data.data[0].id],
        taskId: e.id,
      });
      if (res.data.status == 1) {
        console.log(res);
        e.isReceived = 1;
      }
    },
    publishTask(e) {
      this.tid = e.id;
      this.dialogFormVisible = true;
      taskDetailsApi({
        taskId: e.id,
      }).then((res) => {
        if (res.data.status == 1) {
          this.newForm = [];
          this.form.forEach((item) => {
            if (!res.data.data.receivedData.find((i) => i.userId == item.id)) {
              this.newForm.push(item);
            }
          });
        }
      });
    },
    changeTaskPersonnel() {
      publishTaskApi({
        userId: this.value,
        taskId: this.tid,
      }).then((res) => {
        if (res.data.status == 1) {
          console.log("成功");
        }
      });

      this.dialogFormVisible = false;
    },
  },
};
</script>
<style scoped lang='scss'>
.queryTask {
  padding: 0 20px;
  & .task-header {
    padding-top: 8px;
  }
  .el-link {
    font-size: 12px;
    padding: 0 5px;
  }
}
</style>