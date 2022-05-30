<template>
  <div class="body zong">
    <div class="header">
      <div class="p-20">
        <div class="align-center">
          <label for="">所属题型：</label>
          <div class="header-text mr-5">全部</div>
          <div class="header-text mr-5">单选题</div>
          <div class="header-text mr-5">多选题</div>
          <div class="header-text mr-5">判断题</div>
          <div class="header-text mr-5">排序题</div>
          <div class="header-text mr-5">填空题</div>
          <div class="header-text mr-5">简答题</div>
        </div>
        <div class="align-center mt-30">
          <label for="">难易程度：</label>
          <div class="header-text mr-5">全部</div>
          <div class="header-text mr-5">简单</div>
          <div class="header-text mr-5">中等</div>
          <div class="header-text mr-5">困难</div>
        </div>
        <div class="mt-30 flex-between">
          <div>
            <!-- <el-button @click="createQuestion" type="primary">添加习题</el-button> -->
            <el-button type="primary" @click="showDialogVisible"
              >添加习题</el-button
            >
            <el-button type="primary">主要按钮</el-button>
            <el-button type="primary">主要按钮</el-button>
          </div>
          <div>
            <el-input placeholder="请输入要搜索的内容" v-model="input1">
              <i slot="suffix"  class="el-input__icon el-icon-search" @click="search"></i>
            </el-input>
          </div>
        </div>
      </div>
    </div>
    <!-- 中间 -->

    <div class="mt-30 main p-20" v-for="item in data" :key="item.id">
      <div class="flex-between">
        <div class="align-center">
          <div class="mr-30">创建时间：{{ formatDate(item.createdAt) }}</div>
          <div class="align-center mr-30">
            <span class="p-z mr-5">{{ getTypeName(item.type) }}</span>
            <!-- 1：简单  2：普通 3：困难 -->
            <span class="p-b">{{ getLevelName(item.level) }}</span>
          </div>
          <div>使用次数：18次</div>
        </div>
        <div>
          <button
            class="update-icon mr-5"
            @click="showDialogVisible1(item)"
          ></button>

          <button
            class="delete-icon"
            @click="deleteQuestion(item.id, item.type)"
          ></button>
        </div>
      </div>
      <div>
        <!-- 标题 -->
        <div class="align-center mt-20 p-center-20">
          <el-checkbox></el-checkbox>
          <div class="p-l">{{ item.title }}</div>
        </div>
        <!-- 选项 -->
        <div class="choice mt-20 p-center-20">
          <el-radio-group v-model="item.answer">
            <el-radio
              align-center
              v-if="item.questionA != ''"
              disabled
              label="A"
              >{{ item.questionA }}</el-radio
            >
            <el-radio
              align-center
              v-if="item.questionB != ''"
              disabled
              label="B"
              >{{ item.questionB }}</el-radio
            >
            <el-radio
              align-center
              v-if="item.questionC != ''"
              disabled
              label="C"
              >{{ item.questionC }}</el-radio
            >
            <el-radio
              align-center
              v-if="item.questionD != ''"
              disabled
              label="D"
              >{{ item.questionD }}</el-radio
            >
          </el-radio-group>
        </div>
        <!-- 答案 -->
        <div class="mt-20 p-center-42">答案：{{ item.answer }}</div>
        <div class="dotted-line mt-20"></div>
        <div class="p-center-20">
          <div class="mt-20 align-center">
            <div class="mr-30">所需知识点：</div>
            <div class="mr-30">知识点一</div>
            <div class="mr-30">知识点二</div>
            <div class="mr-30">知识点三</div>
          </div>
          <div class="mt-20 align-center">
            <div class="mr-30">解析：</div>
            <div>这是解析</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <div class="footer">
      <div class="block mt-30">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="新增内容"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      class="dialog"
    >
      <div class="form">
        <div class="item">
          <label for="">
            <span class="c-ff4400">*</span>
            <span> 标题::</span>
          </label>
          <el-input v-model="form.title" placeholder="请输入标题"></el-input>
        </div>
        <div
          class="item"
          v-for="(option, index) in questionOptions"
          :key="option.id"
        >
          <label>
            <span v-if="index <= 1" class="c-ff4400">*</span>
            <span> {{ option.lable }}:</span>
          </label>
          <el-input
            v-model="option.value"
            :placeholder="option.placeholder"
          ></el-input>
          <div>
            <span
              @click="addQuestionOption"
              v-if="index == questionOptions.length - 1 && index < 3"
              class="el-icon-circle-plus-outline"
            ></span>
            <span
              @click="removeQuestionOption"
              v-if="index > 1 && index == questionOptions.length - 1"
              class="el-icon-remove-outline"
            ></span>
          </div>
        </div>
        <div class="item">
          <label for="">
            <span class="c-ff4400">*</span>
            <span> 答案:</span>
          </label>
          <el-select v-model="form.answer" placeholder="请选择">
            <el-option
              v-for="items in questionOptions"
              :key="items.key"
              :label="items.lable"
              :value="items.key"
            >
            </el-option>
          </el-select>
        </div>
        <div class="item">
          <label for="">
            <span class="c-ff4400">*</span>
            <span> 类型:</span>
          </label>
          <el-select v-model="form.type" placeholder="请选择">
            <el-option
              v-for="item in typeArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="item">
          <label for="">
            <span class="c-ff4400">*</span>
            <span> 难易程度:</span>
          </label>
          <el-select v-model="form.level" placeholder="请选择">
            <el-option
              v-for="item in levelArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="hiddenDialog">取 消</el-button>
        <el-button type="primary" v-if="flag == true" @click="createQuestion"
          >确 定</el-button
        >
        <el-button
          type="primary"
          v-else-if="flag == false"
          @click="updateQuestion"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  questionApi,
  deleteQuestionApi,
  updateQuestionApi,
  createQuestionApi,
} from "@/api/api";
import formatDate from "@/mixins/fomatDate";
export default {
  mixins: [formatDate],
  data() {
    return {
      form: {},
      levelArr: [
        {
          value: 1,
          label: "简单",
        },
        {
          value: 2,
          label: "中等",
        },
        {
          value: 3,
          label: "困难",
        },
      ],
      typeArr: [
        {
          value: 1,
          label: "单",
        },
        {
          value: 2,
          label: "多",
        },
        {
          value: 3,
          label: "选",
        },
        {
          value: 4,
          label: "判",
        },
      ],
      options: [
        {
          value: "A",
          label: "选项A",
        },
        {
          value: "B",
          label: "选项B",
        },
        {
          value: "C",
          label: "选项C",
        },
        {
          value: "D",
          label: "选项D",
        },
      ],
      questionOptions: [],
      questionOptionsTemp: [
        {
          id: 1,
          lable: "选项A",
          key: "A",
          value: "",
          placeholder: "请输入选项A的值",
        },
        {
          id: 2,
          lable: "选项B",
          key: "B",
          value: "",
          placeholder: "请输入选项B的值",
        },
        {
          id: 3,
          lable: "选项C",
          key: "C",
          value: "",
          placeholder: "请输入选项C的值,非必填",
        },
        {
          id: 4,
          lable: "选项D",
          key: "D",
          value: "",
          placeholder: "请输入选项D的值,非必填",
        },
      ],
      input1: "",
      data: "",
      radio1: "全部",
      radio2: "全部",
      radio: "",
      dialogVisible: false,
      pageSizes: [2, 5, 10, 15, 20, 30, 50],
      count: 0,
      pageCount: 0,
      pageSize: 10,
      flag: true,
    };
  },

  created() {
    this.initFormParms();
    questionApi({ type: 1, pageSize: 5 }).then((res) => {
      this.data = res.data.data.rows;
      this.count = res.data.data.count;
      this.pageCount = res.data.data.pageCount;
    });
  },
  methods: {
    // 模糊查询
    async search() {
      console.log(this.input1);
      let res = await questionApi({ type: 1, title: this.input1.trim() });
      if (res.data.status == 1) {
        console.log(res);
        this.data = res.data.data.rows;
        this.count = res.data.data.count;
        this.pageCount = res.data.data.pageCount;
      }
    },
    // 查询方法
    queryQuestion() {
      questionApi({ type: 1 }).then((res) => {
        this.data = res.data.data.rows;
        this.count = res.data.data.count;
        this.pageCount = res.data.data.pageCount;
      });
    },
    huoqu(that, response) {
      that.data = response.rows;
      that.count = response.count;
      that.pageCount = response.pageCount;
    },
    //   改变每页多少条的时候触发
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;

      questionApi({
        type: 1,
        pageSize: this.pageSize,
        title: this.input1,
      }).then((res) => {
        console.log(res);
        this.data = res.data.data.rows;
        this.count = res.data.data.count;
        this.pageCount = res.data.data.pageCount;
      });
    },
    // 改变第几页的时候触发
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      questionApi({
        type: 1,
        pageNum: val,
        pageSize: this.pageSize,
        title: this.input1,
      }).then((res) => {
        console.log(this.pageSize);
        this.data = res.data.data.rows;
        this.count = res.data.data.count;
        this.pageCount = res.data.data.pageCount;
      });
    },
    // 获取类型
    getTypeName(type) {
      switch (type) {
        case 1:
          return "单";
        case 2:
          return "多";
        case 3:
          return "选";
        case 4:
          return "填";
      }
    },
    // 获取等级
    getLevelName(level) {
      switch (level) {
        case 1:
          return "简单";
        case 2:
          return "中等";
        case 3:
          return "困难";
      }
    },
    hiddenDialog() {
      this.dialogVisible = false;
    },
    // 修改的点击
    showDialogVisible1(item) {
      // console.log(this.vals);
      this.flag = false;
      console.log("数据是");
      console.log(item);
      this.dialogVisible = true;
      this.form.type = item.type;
      this.form.title = item.title;
      this.form.answer = item.answer;
      this.form.level = item.level;
      this.form.id = item.id;
      let questionOptions = JSON.parse(
        JSON.stringify(this.questionOptionsTemp)
      );
      questionOptions[0].value = item.questionA;
      questionOptions[1].value = item.questionB;
      questionOptions[2].value = item.questionC;
      questionOptions[3].value = item.questionD;
      this.questionOptions = questionOptions.filter((item) => item.value);
    },

    // 修改的确定placeholde
    updateQuestion() {
      const params = this.getFormParams();
      let validate = this.validateFormParams(params);
      if (!validate) return;
      if (this.questionOptions.length == 4) {
        this.form.questionA = this.questionOptions[0].value;
        this.form.questionB = this.questionOptions[1].value;
        this.form.questionC = this.questionOptions[2].value;
        this.form.questionD = this.questionOptions[3].value;
      } else if (this.questionOptions.length == 3) {
        this.form.questionA = this.questionOptions[0].value;
        this.form.questionB = this.questionOptions[1].value;
        this.form.questionC = this.questionOptions[2].value;
        this.form.questionD = "";
      } else if (this.questionOptions.length == 2) {
        this.form.questionA = this.questionOptions[0].value;
        this.form.questionB = this.questionOptions[1].value;
        this.form.questionC = "";
        this.form.questionD = "";
      }
      updateQuestionApi(this.form).then((res) => {
        console.log(res);
        if (res.data.status == 1) {
          this.dialogVisible = false;

          this.$message({
            type: "success",
            message: "修改成功",
          });
          questionApi({
            type: 1,
          }).then((res) => {
            console.log(this.pageSize);
            this.data = res.data.data.rows;
            this.count = res.data.data.count;
            this.pageCount = res.data.data.pageCount;
          });
        }
      });
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    // 新增的点击
    showDialogVisible() {
      this.flag = true;
      this.dialogVisible = true;
      this.initFormParms();
    },
    // 增加按钮
    addQuestionOption() {
      let option = JSON.parse(JSON.stringify(this.questionOptionsTemp));
      this.questionOptions.push(option[this.questionOptions.length]);
    },

    // 获取弹层数据
    getFormParams() {
      let res = {};
      res.type = this.form.type;
      res.title = this.form.title;
      this.questionOptions.forEach((items) => {
        res["question" + items.key] = items.value;
      });
      res.answer = this.form.answer;
      res.level = this.form.level;
      return res;
    },
    // 初始化弹层
    initFormParms() {
      this.form = {
        title: "",
        // questionA: "",
        // questionB: "",
        // questionC: "",
        // questionD: "",
        answer: "",
        type: "",
        level: "",
      };
      //  this.questionOptionsTemp.forEach(el=>{
      //    el.value=''
      //  })
      this.questionOptions = JSON.parse(
        JSON.stringify(this.questionOptionsTemp)
      ).slice(0, 2);
      this.form.answer = "";
    },
    validateFormParams(params) {
      let res = true;
      let rule = {
        title: "标题",
        questionA: "选项A",
        questionB: "选项B",
        questionC: "选项C",
        questionD: "选项D",
        answer: "答案",
        type: "类型",
        level: "难易程度",
      };
      for (let key in params) {
        if (!params[key]) {
          this.$message({
            type: "warning",
            message: rule[key] + "不能为空",
          });
          res = false;
          break;
        }
      }
      return res;
    },
    // 增加的确定
    async createQuestion() {
      const params = this.getFormParams();
      let validate = this.validateFormParams(params);
      if (!validate) return;
      console.log(this.form);
      let res = await createQuestionApi(params);
      console.log(res);
      if (res.data.status == 1) {
        this.$message({
          type: "success",
          message: "新增成功",
        });
        this.hiddenDialog();
      }
    },
    // 删除按钮
    removeQuestionOption() {
      this.questionOptions.pop();

      // 是把答案置空；
      // 如果当前答案未被删除，那么不清空这个值；

      // let arr = ['A','b','c','d'];

      // answerObj   {id:1,key:'A',value:''}
      let isExist = this.questionOptions.find(
        (item) => item.key == this.form.answer
      );
      this.form.answer = isExist ? this.form.answer : "";
    },
    // 删除
    deleteQuestion(id, type) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteQuestionApi({ id: id, type: type }).then((res) => {
            if (res.data.status == 1) {
              this.queryQuestion();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.zong {
  min-width: 700px;
  height: calc(100vh - 60px);
  overflow-x: hidden;
}
.dan {
  background: red;
  color: #fff;
}
.jian {
  background: blue;
  color: #fff;
}
.img-flex {
  display: flex;
  justify-content: flex-end;
}
.icon-img {
  width: 20px;
  height: 20px;
}
.update-icon {
  width: 20px;
  height: 20px;
  background: url("../../assets/icon-update.png") no-repeat;
  background-size: 24px 24px;
  border-style: none;
}
.delete-icon {
  width: 22px;
  height: 22px;
  background: url("../../assets/icon-delete.png") no-repeat;
  background-size: 24px 24px;
  border-style: none;
}
.main {
  border: 3px solid #d3dce6;
}
.dotted-line {
  border-bottom: 2px dashed #d3dce6;
}
.choice {
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.p-center-20 {
  padding: 0 20px;
}
.p-center-42 {
  padding: 0 42px;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
.dialog {
  ::v-deep.el-dialog {
    width: 440px !important;
  }
  & .form {
    display: flex;
    flex-direction: column;
    gap: 20px 0;
    & .item {
      display: grid;
      grid-template-columns: 70px 240px 50px;
      align-items: center;
    }
  }
}
</style>