<template>
  <div>
    <!-- 省 -->
    <el-select v-model="province" @change="sheng" placeholder="请选择">
      <el-option
        v-for="item in data"
        :key="item.code"
        :label="item.name"
        :value="item.code"
      >
        <span style="float: left">{{ item.name }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{
          item.code
        }}</span>
      </el-option>
    </el-select>
    <!-- 市 -->
    <el-select v-model="city" @change="shi" placeholder="请选择">
      <el-option
        v-for="item in citydata"
        :key="item.code"
        :label="item.name"
        :value="item.code"
      >
        <span style="float: left">{{ item.name }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{
          item.code
        }}</span>
      </el-option>
    </el-select>
    <!-- 区县 -->
    <el-select v-model="county" placeholder="请选择">
      <el-option
        v-for="item in countydata"
        :key="item.code"
        :label="item.name"
        :value="item.code"
      >
        <span style="float: left">{{ item.name }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{
          item.code
        }}</span>
      </el-option>
    </el-select>
    <div>123</div>
    <div id="app1">
          <h1 ref="h1Ele">这是H1</h1>
          <hello ref="ho"></hello>
      
          <button @click="getref">获取H1元素</button>
</div>
<div>
  <span>1</span>
  <span>2</span>
  <span>3</span>
  <button @click="shu($event)">获取数据</button>
</div>
  </div>
</template>

<script>
import js from "@/citydata.json";
export default {
  data() {
    return {
      data: js,
      province: "",
      city: "",
      citydata: "",
      county: "",
      countydata: "",
    };
  },
  created() {
    // var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 3, 213, 546, 5765, 43, 32, 87];
    // function find(arr, cb) {
    //   let res;
    //   for (let i = 0; i < arr.length; i++) {
    //     let resd = cb(arr[i]);
    //     if (resd) {
    //       res = resd;
    //       break;
    //     }
    //   }
    //   return res;
    // }

    // console.log(
    //   find(arr, (val) => {
    //     // console.log('执行了回调函数');
    //     if (val > 7) {
    //       return val;
    //     }
    //   })
    // );
    
  },
  // components:{
  //   'hello':hello
  // },
  methods: {
    shu(e){
      console.log(e);
    },
    sheng() {
      var data = this.data.find((item) => item.code == this.province);
      this.citydata = data.children;
      this.county = "";
      this.city = "";
    },
    shi() {
      var data = this.citydata.find((item) => item.code == this.city);
      this.countydata = data.children;
      this.county = "";
    },
     getref() {
          // 表示从 $refs对象 中, 获取 ref 属性值为: h1ele DOM元素或组件
          // console.log(this.$refs);
          // console.log(this.$refs.color);
           console.log(this.$refs.h1Ele.innerText);
           this.$refs.h1Ele.style.display = 'none';// 修改html样式
 
          console.log(this.$refs.ho.msg);// 获取组件数据
          console.log(this.$refs.ho.test);// 获取组件的方法
        }
  },
};
</script>

<style lang="scss" scoped>
  h1{
    color: green;
  }
</style>