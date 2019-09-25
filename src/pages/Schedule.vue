<template>
  <div class="schedule-box">
    <div class="schedule-content-box">
      <lunar-full-calendar
        :events="events"
        :config="config"
        class="schedule_div_fc-event"
      ></lunar-full-calendar>
    </div>
    <el-dialog title="日程" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-position="left">
        <el-form-item>
          <el-input
            v-model="form.scheduleName"
            autocomplete="off"
            placeholder="准备做什么~~"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="时间"
          style="margin-top: 20px"
          :label-width="formLabelWidth"
        >
          <el-time-select
            placeholder="起始时间"
            v-model="form.startTime"
            :picker-options="{
              start: '07:00',
              step: '00:15',
              end: '18:30'
            }"
          >
          </el-time-select>
          ~
          <el-time-select
            placeholder="结束时间"
            v-model="form.endTime"
            :picker-options="{
              start: '07:00',
              step: '00:15',
              end: '18:30',
              minTime: form.startTime
            }"
          >
          </el-time-select>
        </el-form-item>
        <el-form-item label="参与人" :label-width="formLabelWidth">
          <div class="schedule-participant-box">
            <div v-for="(item, index) in form.participant" :key="index">
              <el-popover
                placement="top-start"
                title="提示"
                width="200"
                trigger="hover"
              >
                <p>确定删除 {{ item }} 吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visible1 = false"
                    >取消</el-button
                  >
                  <el-button
                    type="primary"
                    size="mini"
                    @click="participantDelete(index)"
                    >确定</el-button
                  >
                </div>
                <div class="schedule-participant-loop" slot="reference">
                  {{ item }}
                </div>
              </el-popover>
            </div>
            <div>
              <el-popover
                placement="bottom"
                title="添加参与人"
                width="220"
                trigger="click"
                v-model="visible"
              >
                <i
                  class="el-icon-circle-plus-outline"
                  style="font-size: 18px; color: #00b7ff"
                  slot="reference"
                ></i>
                <el-input
                  v-model="input"
                  placeholder="请输入参与人"
                  @keyup.enter.native="KeyboardEvents4(input)"
                ></el-input>
                <div class="popover-button-box">
                  <el-button @click="visible = false" size="medium"
                    >取 消</el-button
                  >
                  <el-button
                    type="primary"
                    @click="popoverSure(input)"
                    size="medium"
                    >确 定</el-button
                  >
                </div>
              </el-popover>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="scheduleSure(form)">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="20%">
      <span>确定删除该日程安排吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { LunarFullCalendar } from "vue-lunar-full-calendar";
export default {
  name: "schedule",
  components: { LunarFullCalendar },
  props: {},
  data() {
    return {
      events: [
        {
          title: "事件内容", // 事件内容
          start: "", // 事件开始时间
          end: "", // 事件结束时间
          color: "rgba(9, 9, 9, 0.3)" // 事件的显示颜色
        }
      ],
      config: {
        buttonText: { today: "今天", month: "月", week: "周", day: "日" },
        locale: "zh-cn",
        editable: false, //是否允许修改事件
        selectable: false,
        eventLimit: 4, //事件个数
        allDaySlot: false, //是否显示allDay
        defaultView: "month", //显示默认视图
        eventClick: this.eventClick, //点击事件
        dayClick: this.dayClick, //点击日程表上面某一天
        eventRender: this.eventRender //日程渲染事件
      },
      dialogVisible: false, //删除日程安排对话框的显示、隐藏
      dialogFormVisible: false, //添加日程对话框的显示、隐藏
      form: {
        scheduleName: "", //添加的事件名
        startTime: "", //开始时间
        endTime: "", //结束时间
        participant: [] //参与人
      },
      username: "", //用户名
      formLabelWidth: "80px",
      toDay: "", //今天的时间
      visible: false, //添加参与人
      visible1: false, //删除参与人
      input: "", //参与人
      currentTime: "", //添加日程的日期
      scheduleData: "", //添加日程的数据
      scheduleDelete: "" //删除的日程
    };
  },
  methods: {
    //删除日程点击事件
    eventClick(event, jsEvent, pos) {
      let time = this.$moment(event.startTime).format("YYYY-MM-DD");
      if (this.toDay > time) {
        this.dialogVisible = false;
      } else {
        this.dialogVisible = true;
        this.scheduleDelete = event;
      }
    },
    // 点击当天
    dayClick(day, jsEvent) {
      // console.log("dayClick", day, jsEvent);
      let time = this.$moment(day._d).format("YYYY-MM-DD");
      if (this.toDay > time) {
        this.$message.error("抱歉，不能添加今天之前的日程");
      } else {
        this.dialogFormVisible = true;
        this.currentTime = time;
      }
    },
    //日程渲染事件
    eventRender(calEvent, element, view) {
      let start = this.$moment(calEvent.startTime).format("HH:mm");
      let end = this.$moment(calEvent.endTime).format("HH:mm");
      let contentTitle = calEvent.schedule;
      let people = calEvent.users.toString();
      let peopleNum = calEvent.users.length;
      element[0].innerHTML =
        "<div>" +
        start +
        "~" +
        end +
        "  " +
        contentTitle +
        "</div>" +
        "<div>" +
        "参与人:" +
        "  " +
        people +
        "</div>" +
        "<div>" +
        "参与人数:" +
        "  " +
        "  " +
        "<i class=\"el-icon-user-solid\" style='color: #000000'></i>" +
        "  " +
        "  " +
        peopleNum +
        "</div>";
      // console.log(Array.isArray(calEvent.users));
    },
    // 添加参与人的确定按钮
    popoverSure(input) {
      if (input === "") {
        this.$message.warning("输入框不能为空");
      } else {
        this.form.participant.push(input);
        this.input = "";
        this.visible = false;
      }
    },
    // 添加参与人的enter键盘事件
    KeyboardEvents4(input) {
      this.popoverSure(input);
    },
    // 删除参与人
    participantDelete(index) {
      this.form.participant.splice(index, 1);
      this.visible1 = false;
    },
    //添加日程的确按钮
    scheduleSure(form) {
      if (
        form.scheduleName === "" ||
        form.startTime === "" ||
        form.endTime === "" ||
        form.participant.length === 0
      ) {
        this.$message.warning("请填入完整信息");
      } else {
        this.$axios
          .req("api/calendar", {
            users: form.participant,
            startTime: this.currentTime + " " + form.startTime,
            endTime: this.currentTime + " " + form.endTime,
            schedule: form.scheduleName
          })
          .then(res => {
            if (res.code === 200) {
              this.getScheduleData();
              this.dialogFormVisible = false;
              (this.form = {
                scheduleName: "",
                startTime: "",
                endTime: "",
                participant: [this.username]
              }),
                this.$message({
                  showClose: true,
                  message: "添加日程成功",
                  type: "success"
                });
            } else if (res.code === 500) {
              this.$message({
                showClose: true,
                message: "添加日程失败",
                type: "error"
              });
            }
          })
          .catch(e => {
            console.log(e);
          });
      }
      // let users = form.participant;
      // let startTime = this.currentTime + " " + form.startTime;
      // let endTime = this.currentTime + " " + form.endTime;
      // let schedule = form.scheduleName;
      // console.log(users);
      // console.log(startTime);
      // console.log(endTime);
      // console.log(schedule);
    },
    // 删除日程确定按钮
    deleteSure() {
      let id = this.scheduleDelete._id;
      this.$axios
        .req("api/delCalendar", { id: id })
        .then(res => {
          if (res.code === 200) {
            this.$message({
              showClose: true,
              message: "删除日程成功",
              type: "success"
            });
            this.getScheduleData();
            this.dialogVisible = false;
          } else if (res.code === 500) {
            this.$message({
              showClose: true,
              message: "删除日程失败",
              type: "error"
            });
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    // 获取日程
    getScheduleData() {
      this.$axios
        .req("api/calendar")
        .then(res => {
          if (res.code === 200) {
            this.scheduleData = res.data;
            this.scheduleData.forEach(item => {
              item.start = this.$moment(item.startTime).format(
                "YYYY-MM-DD HH:mm"
              );
              item.end = this.$moment(item.endTime).format(" YYYY-MM-DD HH:mm");
              item.title = item.scheduleName;
            });
            this.events = this.scheduleData;
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.toDay = this.$moment(new Date()).format("YYYY-MM-DD"); //获取今天日期
    this.getScheduleData(); //获取日程
    this.username = JSON.parse(localStorage.getItem("user")).username;
    this.form.participant.push(this.username);
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
/*背景*/
.schedule-box {
  height: 100%;
  width: 100%;
  background-color: #f2f3f6;
}
/*内容*/
.schedule-content-box {
  width: 95%;
  padding-top: 80px;
  margin-left: 40px;
  padding-bottom: 40px;
}
/*参与人的div*/
.schedule-participant-box {
  width: 90%;
  display: flex;
  align-items: center;
}
/*每一位参与人*/
.schedule-participant-loop {
  margin-right: 10px;
}
/*添加参与人的按钮div*/
.popover-button-box {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
}
/*日历插件自带类名*/
body .fc {
  padding: 10px;
  background-color: white;
}
/*.fc-event{*/
/*  background-color: skyblue;*/
/*}*/
</style>
