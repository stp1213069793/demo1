<template>
  <div class="userInfo">
    <div class="userInfo-header flex-between">
      <div class="left">
        <div class="header">User Management</div>
        <div class="count">{{ count }}条数据</div>
      </div>
      <div class="right">
        <div>
          <span class="el-icon-refresh"></span>
          <span>Refresh</span>
        </div>
        <div class="mrl-15">|</div>
        <div>
          <span class="el-icon-search"></span>
          <span>Search</span>
        </div>
      </div>
    </div>
    <div class="userInfo-main">
      <div class="title">
        <el-table
          :data="tableData"
          :header-cell-style="{ textAlign: 'center' }"
          :cell-style="{ textAlign: 'center' }"
          stripe
          size="small"
          style="width: 100%"
        >
          <el-table-column prop="id" label="id" width="50"> </el-table-column>
          <el-table-column prop="avatarName" label="avatarName" width="120">
          </el-table-column>
          <el-table-column prop="name" label="name" width="80">
          </el-table-column>
          <el-table-column label="sex" width="40">
            <template slot-scope="scope">
              <span>{{ scope.row.sex | sexName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="phone" width="100">
          </el-table-column>
          <el-table-column prop="email" label="email" width="160">
          </el-table-column>
          <el-table-column label="province" width="80">
            <template slot-scope="scope">
              <span>{{ provinceData(scope.row.provinceNo).name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="city" width="100">
            <template slot-scope="scope">
              <span>{{
                formData(scope.row.cityNo, provinceData(scope.row.provinceNo))
                  .name
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="area" width="100">
            <template slot-scope="scope">
              <span>{{
                formData(
                  scope.row.areaNo,
                  formData(scope.row.cityNo, provinceData(scope.row.provinceNo))
                ).name
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="ceateAt" width="200">
            <template slot-scope="scope">
              <span>{{ formatDate(scope.row.createdAt) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="operation" width="180">
            <template slot-scope="scope">
              <el-button size="mini" @click="uerDdetails(scope.row)"
                >详情</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >权限</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="userInfo-pages">
      <el-pagination
        background
        layout="prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="count"
      >
      </el-pagination>
      <div class="flex-center">d1321d3as1d32a</div>
    </div>
  </div>
</template>
<script>
import { queryUserListApi } from "@/api/api";
import data from "@/citydata.json";
import formatDate from "@/mixins/fomatDate";
export default {
  mixins: [formatDate],
  data() {
    return {
      tableData: [
        {
          id: "",
          name: "",
          avatarName: "",
          createdAt: "",
          email: "",
          phone: "",
          sex: "",
          provinceNo: "",
          cityNo: "",
          areaNo: "",
        },
      ],
      count: 0,
      pageCount: 0,
      province: data,
      city: [],
      area: [],
    };
  },
  methods: {
    provinceData(code) {
      let res = "";
      if (code) {
        res = this.province.find((item) => item.code == code);
      }
      return res;
    },
    formData(code, data) {
      let res = "";
      if (data.children) {
        res = data.children.find((item) => item.code == code);
      }
      return res;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    async handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      let res = await queryUserListApi({
        pageNum: val,
      });
      this.assignmentData(res);
    },
    uerDdetails(user) {
      this.$router.push({
        name: "uerDdetails",
        query: {
          id: user.id,
        },
      });
    },
    assignmentData(res) {
      this.tableData = res.data.data.data.rows;
      this.count = res.data.data.data.count;
      this.pageCount = res.data.data.data.pageCount;
    },
  },
  filters: {
    sexName(val) {
      return val == 1 ? "男" : "女";
    },
  },

  async created() {
    let res = await queryUserListApi();
    this.assignmentData(res);
  },
};
</script>
<style scoped lang='scss'>
.userInfo {
  width: 100%;
  // padding: 0 12px;
  & .userInfo-header {
    padding: 10px 30px 8px 30px;
    & .left {
      color: #311e9e;
      & .header {
        font-size: 20px;
        font-weight: 600;
      }
      & .count {
        font-size: 12px;
      }
    }
    & .right {
      display: flex;
      color: #6f60bd;
    }
  }
  & .userInfo-main {
    & .el-table {
      padding: 0 15px;
    }
    & .title {
      .row-style {
        font-size: 12px;
      }
    }
  }
  & .userInfo-pages {
    padding: 10px 0;
    display: grid;
    grid-template-rows: 1fr 1fr;
    justify-content: center;
  }
  .mrl-15 {
    margin: 0 15px;
  }
}
</style>