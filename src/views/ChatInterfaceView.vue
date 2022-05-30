<template>
  <div class="chatInterface">
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
            <span @click="jumpCcreation" class="el-icon-plus"></span>
          </div>
        </div>
        <div class="task-main" >
          <div class="grid-c" v-for="item in notepadArr" :key="item.id">
            <el-checkbox> </el-checkbox>
            <span>{{item.content}}</span>

            <span>{{formatDate(item.createdAt)}}</span>
          </div>
          <!-- <div class="grid-c">
            <el-checkbox> </el-checkbox>
            <span>Working on Asla Project</span>

            <span>08:00-11:00 AM</span>
          </div>
          <div class="grid-c">
            <el-checkbox> </el-checkbox>
            <span>Working on Asla Project</span>
            <span>08:00-11:00 AM</span>
          </div> -->
        </div>
      </div>
    </div>
    <div class="chat">
      <div class="header">
        <div class="flex-between">
          <div>Notification</div>
          <div>View all</div>
        </div>

        <!-- 中间 -->
        <div class="assign mt-30">
          <div class="util">
            <img
              src="../assets/icon-updates.png"
              class="icon-updates icon"
              alt=""
            />
          </div>
          <div class="task-assign">
            <div style="color: #edeede">Emily just sent you task to assign</div>
            <div class="pbt-8" style="color: #a79cc4">
              18 Aug 2020 - 10.00 AM
            </div>
            <el-button class="btn-assign" type="warning">Assign Now</el-button>
          </div>
        </div>
      </div>
      <!-- Team Chat -->

      <div class="waiceng">
        <div class="teamChat">
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
            <div
              class="flex-center timer"
              v-if="(new Date() - new Date(item.date)) / 1000 <= 60"
            >
              刚刚
            </div>
            <div
              class="flex-center timer"
              v-else-if="60 <= (new Date() - new Date(item.date)) / 1000 <= 600"
            >
              {{
                Math.round((new Date() - new Date(item.date)) / 1000 / 60)
              }}分钟之前
            </div>
            <div
              class="flex-center timer"
              v-else-if="600 <= (new Date() - new Date(item.date)) / 1000 <= 3600"
            >
              {{
                Math.round((new Date() - new Date(item.date)) / 1000 / 60)
              }}分钟之前
            </div>
            <div
              class="flex-center timer"
              v-else-if="1 <= (new Date() - new Date(item.date)) / 1000/24 <= 24"
            >
              {{
                Math.round((new Date() - new Date(item.date)) / 1000 / 60 /60)
              }}小時之前
            </div>
            <div class="left" v-if="item.avatarName != myName">
              <div class="mr-10 head-portrait">
                {{ item.avatarName.substring(item.avatarName.length - 2) }}
                <!-- <img class="icon-male" v-if="item.name" src="../assets/icon-male.png" alt="" /> -->
              </div>
              <div class="neirong" v-if="item.msg">{{ item.msg }}</div>
            </div>
            <!-- <div v-if="(new Date() - new Date(item.date)) / 1000> 60">刚刚</div> -->

            <div v-else class="right mt-10">
              <div class="neirong" v-if="item.msg">{{ item.msg }}</div>
              <div class="ml-10 head-portrait">
                {{ item.avatarName.substring(item.avatarName.length - 2) }}
              </div>
            </div>
          </div>
        </div>
        <div class="footer">
          <el-input placeholder="请输入内容" v-model="obj.msg">
            <el-button
              slot="append"
              @click="sendSocketMsg"
              icon="el-icon-position"
              >发送</el-button
            ></el-input
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUesrInfoApi ,queryNotepadApi} from "@/api/api";
import formatDate from "@/mixins/fomatDate";
export default {
  mixins: [formatDate],
  data() {
    return {
      value: new Date(),
      textArr: [],
      obj: {
        avatarName: "",
        msg: "",
        id: "",
        type: 1,
      },
      drawer: false,
      form: {
        Worktasks: "",
        taskProgress: "",
      },
      myName: "",
      count: 0,
      notepadArr:[]
    };
  },
  async created() {
    this.handleEnter();
    let res = await getUesrInfoApi({});
    if (res.data.status == 1) {
      this.obj.id = res.data.data[0].id;
      this.myName = res.data.data[0].name;
      this.obj.avatarName = res.data.data[0].name;
    }
    let resc = await queryNotepadApi()
    if (resc.data.status==1) {
      console.log(resc);
      this.notepadArr=resc.data.data.rows
    }
    console.log(this.notepadArr);
    this.$socket.emit("addUser", {});
  },

  updated() {
    this.$refs.scoll.scrollTop = this.$refs.scoll.scrollHeight + 200;
  },
  sockets: {
    connect: function () {
      //建立连接后调用的函数
      console.log("socket connected...");
      this.$socket.emit("addUser", {
        userId: this.obj.id,
        avatarName: this.obj.avatarName,
      });
    },
    userCount(message) {
      console.log("总数是：");
      console.log(message);
    },
    // message 是服务端返回的信息
    receiveMsg: function (message) {
      // console.log("服务的返回的信息", message);
      this.textArr.push(message);
    },
    // 断开时调用的函数
    disconnect: function () {
      console.log("disconnect!");
      this.$socket.emit("removeUser", {
        userId: this.obj.id,
        avatarName: this.obj.avatarName,
      });
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
        this.$socket.emit("sendMsg", this.obj);
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
    jumpCcreation(){
      this.$router.push({
        name:'ctreateTask'
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.chatInterface {
  // padding: 30px 0;
  min-width: 800px;
  box-sizing: border-box;
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  & .aside {
    display: grid;
    grid-template-rows: auto 1fr;
    & .calendar {
      & ::v-deep .el-calendar-day {
        height: 40px;
      }
    }
    & .task {
      & .task-main {
        padding: 45px 16px;
      }
    }
  }
  & .chat {
    display: grid;
    grid-template-rows: 190px auto;
    height: calc(100vh - 60px - 40px);
    // background: #26409c;
    & .assign {
      background: #58419c;
      display: flex;
      border-radius: 10px;
      & .util {
        margin: 12px 14px 12px 18px;
        & .icon-updates {
          background: #7c68b0;
          padding: 6px;
        }
      }
      & .task-assign {
        padding: 12px 0 18px 0;
        & .btn-assign {
          border-radius: 10px;
        }
      }
    }
    & .waiceng {
      height: 100%;
      overflow: hidden;
      & .teamChat {
        margin: 20px 0;
        & .invite-people {
          background: #58419b;
          padding: 8px;
          color: #ccc;
        }
      }
      & .chat-box {
        height: calc(100% - 120px - 40px);
        background: #e6e6f0;
        padding: 18px 10px;
        overflow-y: scroll;

        & .left {
          display: flex;
          margin: 10px 0;
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
          padding: 12px 20px;
          // display: flex;
          // justify-content: center;
          // align-items: center;
        }
        & .footer {
          height: 40px;
        }
      }
    }
  }
  .grid-c {
    display: grid;
    grid-template-columns: 26px auto 150px;
  }
  .icon-male {
    width: 30px;
    height: 30px;
  }
}
.head-portrait {
  background: #ffffff;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.timer{
  color: #ccc;
}
// @media screen and (max-width: 1000px) {
//   .chat .header {
//     display: none;
//     }
//   }
</style>