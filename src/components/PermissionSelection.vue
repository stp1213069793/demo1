<template>
  <div class="zong">
    <div class="select-all flex-between">
      <div>设置角色对应的功能操作、应用管理、后台管理权限</div>
      <div>
        <el-checkbox :v-model="isAll">全选</el-checkbox>
      </div>
    </div>


    <div class="check">
      <div class="message"><el-checkbox v-model="itemF" ref='itemf'>消息</el-checkbox></div>
      <div class="2">
        <div class="pd-20">
          <el-checkbox v-model="itemF" ref='itemf'>消息应用设置</el-checkbox>
        </div>
        <div>
          <el-checkbox v-model="itemF" ref='itemf'>管理公开群组</el-checkbox>
        </div>
        <div class="pd-20">
          <el-checkbox>群组中删除消息</el-checkbox>
        </div>
      </div>
      <div class="3">
        <div class="pd-20">
          <el-checkbox>创建公开群组</el-checkbox>
        </div>
        <div>
          <el-checkbox>群组企业公告中发送消息</el-checkbox>
        </div>
      </div>
      <div class="4">
        <div class="pd-20">
          <el-checkbox>创建私有群组</el-checkbox>
        </div>
      </div>
    </div>
    <div class="check">
      <div class="message"><el-checkbox>项目</el-checkbox></div>
      <div class="2">
        <div class="pd-20">
          <el-checkbox>消息应用设置</el-checkbox>
        </div>
        <div class="pb-20">
          <el-checkbox>管理公开群组</el-checkbox>
        </div>
        <!-- <div class="pd-20">
                      <el-checkbox>群组中删除消息</el-checkbox>
             </div> -->
      </div>
      <div class="3">
        <div class="pd-20">
          <el-checkbox>创建公开群组</el-checkbox>
        </div>
        <div>
          <el-checkbox>群组企业公告中发送消息</el-checkbox>
        </div>
      </div>
      <div class="4">
        <div class="pd-20">
          <el-checkbox>创建私有群组</el-checkbox>
        </div>
      </div>
    </div>
    <div class="check">
      <div class="message"><el-checkbox>日历</el-checkbox></div>
      <div class="2">
        <div class="pd-20">
          <el-checkbox>消息应用设置</el-checkbox>
        </div>
        <div class="pb-20">
          <el-checkbox>管理公开群组</el-checkbox>
        </div>
        <!-- <div class="pd-20">
                      <el-checkbox>群组中删除消息</el-checkbox>
             </div> -->
      </div>
      <div class="3">
        <div class="pd-20">
          <el-checkbox>创建公开群组</el-checkbox>
        </div>
      </div>
      <div class="4">
        <div class="pd-20">
          <el-checkbox>创建私有群组</el-checkbox>
        </div>
      </div>
    </div>
    <div class="check">
      <div class="message"><el-checkbox>网盘</el-checkbox></div>
      <div class="2">
        <div class="pd-20">
          <el-checkbox>消息应用设置</el-checkbox>
        </div>
        <div class="pb-20">
          <el-checkbox>管理公开群组</el-checkbox>
        </div>
        <!-- <div class="pd-20">
                      <el-checkbox>群组中删除消息</el-checkbox>
             </div> -->
      </div>
      <div class="3">
        <div class="pd-20">
          <el-checkbox>创建公开群组</el-checkbox>
        </div>
        <div>
          <el-checkbox>群组企业公告中发送消息</el-checkbox>
        </div>
      </div>
    </div>

    <button @click="dianji"></button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      itemF:false,
      isAll:false,
      form:[{
        cc:false
      }]
    };
  },
  computed:{
    // isAll: {
    //   //全选影响小选
    //   set(val) {
    //     //set(val) 设置全选的状态(true/ false)
    //     //我们手动设置了全选框的状态,就遍历数组里的每个对象的c属性, 也就是遍历看每个小选框的状态,让它的状态改为 val 全选框的状态
    //     this.arr.forEach((obj) => (obj.c = val));
    //   },
    //   //小选框影响全选框
    //   get() {
    //     //判断数组里的每一个对象的c属性 它是不是等于true, 就是判断每一个小选框的状态, 只要有一个小选框的状态不为true 就是没有被勾上, 那就返回false , 全选框的状态就是false
    //     // every口诀: 查找数组里"不符合"条件, 直接原地返回false
    //     return this.arr.every((obj) => obj.c === true);
    //   },
    // },
  },
  methods: {
    dianji(){
      this.isAll==true
      this.itemF=true
      if (this.isAll==false) {
        this.itemF=! this.itemF
      }
    }
  },
};
</script>
<style scoped lang='scss'>
.zong {
  background: #fafbfc;
}
.check {
  display: grid;
  grid-template-columns: 120px 1fr 1fr 2fr;
  border: 1px solid #eef3fc;
  padding: 0 15px;
}
.message {
  display: flex;
  align-items: center;
  border-right: 1px solid #eef3fc;
  margin-right: 15px;
}
</style>