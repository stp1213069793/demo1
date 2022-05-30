<template>
  <div class="main">
    <div class="aside">
      <div class="calendar">
        <el-calendar v-model="value"> </el-calendar>
      </div>
      <div class="task">
        <div class="task-header flex-between">
          <div>
            <span>Today Task(3)</span>
          </div>
          <div>
            <span @click="drawer = true" class="el-icon-plus"></span>
          </div>
        </div>
        <div class="task-main">
          <div class="grid-c">
            <el-checkbox> </el-checkbox>
            <span>Working on Asla Project</span>

            <span>08:00-11:00 AM</span>
          </div>
          <div class="grid-c">
            <el-checkbox> </el-checkbox>
            <span>Working on Asla Project</span>

            <span>08:00-11:00 AM</span>
          </div>
          <div class="grid-c">
            <el-checkbox> </el-checkbox>
            <span>Working on Asla Project</span>
            <span>08:00-11:00 AM</span>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="notification">
        <div class="flex-between">
          <div>Notification</div>
          <div>View all</div>
        </div>
      <div class="assign mt-30">
        <div class="util">
          <img
            src="../../assets/icon-updates.png"
            class="icon-updates icon"
            alt=""
          />
        </div>
        <div class="task-assign">
          <div style="color: #edeede">Emily just sent you task to assign</div>
          <div class="pbt-8" style="color: #a79cc4">18 Aug 2020 - 10.00 AM</div>
          <el-button class="btn-assign" type="warning">Assign Now</el-button>
        </div>
      </div>
      </div>

      <div class="chat">
          <div class="teamChat mt-30">
        <div class="flex-between">
          <div class="flex-center">
            <div class="mr-30">
              <span>Team Chat</span>
            </div>
            <div>
              <span class="el-icon-s-custom"></span>
              <span class="el-icon-s-custom"></span>
              <span class="el-icon-s-custom"></span>
              <span>+17</span>
            </div>
          </div>
          <div class="invite-people">
            <span class="el-icon-s-custom"></span>
            <span>Invite People</span>
          </div>
        </div>
      </div>

           <div class="chat-box" ref="scoll">
          <div v-for="(item, index) in textArr" :key="index">
            <div class="left" v-if="item.name != 'stp'">
              <div class="mr-10 head-portrait">
                {{item.name }} 
                <!-- <img class="icon-male" v-if="item.name" src="../assets/icon-male.png" alt="" /> -->
              </div>
              <div class="neirong" v-if="item.msg">{{ item.msg }}</div>
            </div>
            <div v-else class="right">
              <div class="neirong" v-if="item.msg">{{ item.msg }}</div>
              <img class="icon-male" src="../../assets/icon-male.png" alt="" />
            </div>
          </div>
        
      </div>


        <div class="footer">
          <el-input placeholder="请输入内容" v-model="obj.msg">
          <el-button  slot="append"  @click="sendSocketMsg"  icon="el-icon-position">发送</el-button></el-input>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: new Date(),
      textArr: [],
      obj: {
        name: "stp",
        msg: "",
      },
      drawer: false,
      form: {
        Worktasks: "",
        taskProgress: "",
      },
    };
  },
  created() {
    this.handleEnter();
  },
  // computed:{
  
  // },
  updated() {
    this.$refs.scoll.scrollTop = this.$refs.scoll.scrollHeight + 200;
  },
  sockets: {
    connect: function () {
      //建立连接后调用的函数
      console.log("socket connected...");
    },
    // message 是服务端返回的信息
    res: function (message) {
      console.log("服务的返回的信息", message);
      this.textArr.push(message);
      // console.log( message.name.substr(1));
    },
    // 断开时调用的函数
    disconnect: function () {
      console.log("disconnect!");
    },
  },
  methods: {
    sendSocketMsg() {
      console.log("------------------------------");
      console.log(this.$refs);
      if (this.obj.msg.trim() == "") {
        this.$message({
          type: "warning",
          message: "聊天内容不能为空",
        });
      } else {
        this.$socket.emit("server", this.obj);
      }
      this.obj.msg = "";
    },
    handleEnter() {
      document.onkeydown = () => {
        let _key = window.event.keyCode;
        //!this.clickState是防止用户重复点击回车
        if (_key === 13 && !this.clickState) {
          this.sendSocketMsg();
        }
      };
    },
    // getName(val){
    //   console.log(val);
    //   return val.substr(0,1)
    // }
  },
};
</script>

<style scoped lang='scss'>
.main {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
//   box-sizing: border-box;
max-height: 600px;
  & .aside {
    display: grid;
    grid-template-rows: 2fr 0.8fr;
  }
  & .calendar {
    padding-bottom: 30px;
    ::v-deep .el-calendar-day {
      height: 40px;
    }
  }
  & .task {
    & .task-main {
      padding: 20px 16px;
    }
  }
  & .container {
    display: grid;
    grid-template-rows: 220px auto;
    height: calc(100vh - 60px - 40px);
    & .notification{
        // padding-bottom: 70px;
        & .assign{
          background: #58419c;
          display: flex;
          border-radius: 10px;
        }
         & .util {
            margin: 24px 34px 0 24px;
            & .icon-updates {
              background: #7c68b0;
              padding: 6px;
            }
          }
          & .task-assign {
           padding: 28px 0;
            & .btn-assign {
              border-radius: 10px;
            }
          }
    }
    & .chat{
  height: 100%;
      overflow: hidden;
    & .teamChat {
      margin-bottom: 38px;
      & .invite-people {
        background: #58419b;
        padding: 8px;
        color: #ccc;
      }
    }
    & .chat-box {
        height: calc(100% - 145px - 40px);
        background: #e6e6f0;
        padding: 18px 10px;
        overflow: hidden;
        overflow-y: scroll;
      
      & .left {
        display: flex;
        margin: 10px 0;
        & .head-portrait{
          background: #de61d4;

        }
      }
      & .right {
        display: flex;
        justify-content: flex-end;
        // padding: 10px;
      }
      .neirong {
        max-width: 250px;
        word-wrap: break-word;
        white-space: pre-wrap;
        background: #ffffff;
        border-radius: 10px;
        padding: 5px 5px;
      }
      & .footer{
        height: 40px;
      }
    }
    }
  }
}
.grid-c {
  display: grid;
  grid-template-columns: 26px auto 150px;
}
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
   .icon-male {
    width: 30px;
    height: 30px;
  }
</style>