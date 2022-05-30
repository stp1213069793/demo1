<template>
  <div class="box-info">
    <div class="person-info">
      <h1 style="padding-left: 36px">个人信息</h1>
      <el-form class="form" :label-position="labelPosition" label-width="80px" :model="form">
        <el-form-item label="账号昵称">
          <el-input type="text" class="nickname ml-15" v-model="form.avatarName" maxlength="8" show-word-limit>
          </el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input class="ml-15" v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-radio-group v-model="form.sex" class="ml-15">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input class="ml-15" v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input class="ml-15" v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="所在地">
          <!-- 省 -->
          <el-select v-model="form.provinceNo" class="ml-15" placeholder="请选择" @change="sheng">
            <el-option v-for="item in data" :key="item.code" :label="item.name" :value="item.code">
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                  item.code
              }}</span>
            </el-option>
          </el-select>
          <!-- 市 -->
          <el-select v-model="form.cityNo" placeholder="请选择" @change="shi" ref="city">
            <el-option v-for="item in citydata" :key="item.code" :label="item.name" :value="item.code">
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                  item.code
              }}</span>
            </el-option>
          </el-select>
          <!-- 区县 -->
          <el-select v-model="form.areaNo" placeholder="请选择" class="county" ref='county1'>
            <el-option v-for="item in countydata" :key="item.code" :label="item.name" :value="item.code">
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                  item.code
              }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="简介">
          <el-input class="ml-15" type="textarea" placeholder="请输入内容" :rows="8" v-model="form.desc" maxlength="30"
            show-word-limit>
          </el-input>
        </el-form-item>
        <div style="padding-left: 96px">
          <el-button type="primary" plain @click="preservation">保存</el-button>
          <el-button type="primary" plain @click="ceshi">取消</el-button>
        </div>
      </el-form>
    </div>

    <div class="person-info" style="padding-left: 36px">
      <h1>职业信息</h1>
    </div>
    <div class="person-info" style="padding-left: 36px">
      <h1>企业信息</h1>
    </div>
  </div>
</template>

<script>
import js from "@/citydata.json";
import { getUesrInfoApi, updateUesrInfoApi } from "@/api/api";
export default {
  data() {
    return {
      labelPosition: "right",
      form: {
        name: "",
        avatarName: "",
        desc: "",
        email: "",
        phone: "",
        sex: '',
        provinceNo: "",
        cityNo: "",
        areaNo: "",
      },
      data: js,
      countydata: [],
      citydata: [],
    };
  },
  async created() {
    let res = await getUesrInfoApi();
    if (res.data.status == 1) {
      this.form = res.data.data[0];
    }
  },
  watch: {
    'form.provinceNo': {
      handler(newValue) {
      // 判断如果区县为空，那么隐藏区县的选择
      // 判断如果市为空，那么隐藏市的选择
        if (this.data.find((item) => item.code == newValue).children.length==0) {
          this.$refs.city.$el.style.display = 'none'
          this.$refs.county1.$el.style.display = 'none'
        } else {
          this.$refs.city.$el.style.display = ''
          this.$refs.county1.$el.style.display = ''
            if (!this.data.find((item) => item.code == newValue).children[0].children) {
          this.$refs.county1.$el.style.display = 'none'
        } else {
          this.$refs.county1.$el.style.display = ''
        }
        }
        this.citydata = this.data.find((item) => item.code == newValue).children
      }
    },
    'form.cityNo': {
      handler(newV) {
        if (newV == '') return
        this.countydata = this.citydata.find((item) => item.code == newV).children
      }
    },
  },
  methods: {
    async preservation() {
      delete this.form.updatedAt;
      delete this.form.createdAt;
      delete this.form.townNo
      delete this.form.id
      let res = await updateUesrInfoApi(this.form)
      if (res.data.status == 1) {
        this.$message({
          type: "success",
          message: '修改成功'
        })
      }
    },
    ceshi() {
      console.log(this.form);
    },
    sheng() {
      this.form.cityNo = ''
      this.form.areaNo = ''
    },
    shi() {
      this.form.areaNo = ''
    }
  },
};
</script>
<style scoped lang='scss'>
.box-info {
  background: #f7f7f7;

  padding: 0 142px 30px 50px;

  & .person-info {
    background: #ffffff;
    padding: 0 0 30px 0;
    min-width: 900px;

    & .nickname {
      background: #fafafa;
    }

    & .form {
      padding: 0 50px;
    }
  }
}
</style>