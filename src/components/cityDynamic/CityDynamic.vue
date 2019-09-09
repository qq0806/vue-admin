<template>
  <div class="cityDynamic-box">
    <div class="cityDynamic-city">
      <div class="cityDynamic-profit">利润(万)</div>
      <ve-wordcloud :data="chartData" :settings="chartSettings"></ve-wordcloud>
    </div>
    <div class="cityDynamic-personal-box">
      <div class="cityDynamic-dynamic">
        <div class="cityDynamic-personal">个人动态</div>
        <el-row>
          <el-button type="primary" size="mini" @click="addTo"
            >添加动态</el-button
          >
        </el-row>
      </div>
      <div class="cityDynamic-time-box">
        <el-date-picker
          v-model="timeDate"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
          @change="changeObj"
        >
        </el-date-picker>
      </div>
      <div>
        <div v-for="(item1, index1) in reportData" :key="index1">
          <div
            class="report-loop-box"
            :class="
              index1 % 2 === 0 ? 'report_background1' : 'report_background2'
            "
            v-if="item1.releaseTime1 === timeDate"
          >
            <div class="report-loop-box1">
              <div>{{ item1.classification }}</div>
              <div>{{ item1.username }}</div>
            </div>
            <div class="report-loop-box2">
              <div v-if="item1.reportUsers.length > 0">汇报人:</div>
              <div v-for="(item2, index2) in item1.reportUsers" :key="index2">
                &nbsp;<span> {{ item2 }}</span>
              </div>
            </div>
            <div class="report-loop-box1">
              <div>动态:{{ item1.dynamic }}</div>
              <div class="releaseTime-box">发布于{{ item1.releaseTime }}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="noShow === true" class="cityDynamic-no-data">
        暂无动态
      </div>
    </div>
    <el-dialog title="添加动态" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="动态类型" :label-width="formLabelWidth">
          <el-select v-model="region" placeholder="请选择动态类型">
            <div v-for="(item, index) in dynamicType" :key="index">
              <el-option :label="item.name" :value="item.name"></el-option>
            </div>
          </el-select>
        </el-form-item>
        <el-form-item
          label="相关汇报人"
          :label-width="formLabelWidth"
          v-if="reportShow === true"
        >
          <el-select v-model="reporter" multiple placeholder="请选择汇报人">
            <el-option
              v-for="(item, index) in reporterData"
              :key="index"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细内容" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="textarea"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureClick(region, reporter, textarea)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "cityDynamic",
  components: {},
  props: {},
  data() {
    this.chartSettings = {
      color: [],
      sizeMin: 12,
      sizeMax: 22
    };
    return {
      chartData: {
        columns: ["city", "num"],
        rows: []
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      dynamicType: [
        {
          name: "个人心情"
        },
        {
          name: "工作汇报"
        },
        {
          name: "公司相关"
        },
        {
          name: "其他事物"
        }
      ],
      users: {}, //用户名
      timeDate: "", //选择的时间
      dialogFormVisible: false, //弹出框的显示、隐藏
      formLabelWidth: "120px",
      region: "", //动态的类型
      textarea: "", //提示框详细内容
      reporter: [], //汇报人初始值
      reporterData: [], //汇报人数据
      reportShow: false, //汇报人的选择框显示、隐藏
      releaseTime: "", //发布时间
      reportData: [], //汇报数据
      noShow: false //暂无动态显示、隐藏
    };
  },
  methods: {
    //获取城市
    getCityData() {
      this.$axios
        .req("api/city")
        .then(res => {
          if (res) {
            this.chartData.rows = res.data;
            res.data.forEach(item => {
              this.chartSettings.color.push(item.color);
            });
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    // 获取汇报人数据
    getReporterData() {
      this.$axios
        .req("api/reporter")
        .then(res => {
          this.reporterData = res.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    // 添加动态
    addTo() {
      this.dialogFormVisible = true;
    },
    // 确定添加
    sureClick(region, reporter, textarea) {
      this.region = region;
      this.reporter = reporter;
      this.textarea = textarea;
      this.releaseTime = this.timeDate;
      // console.log(this.region);
      // console.log(this.reporter);
      // console.log(this.textarea);
      // console.log(this.users.username);
      // console.log(this.releaseTime);
      this.$axios
        .req("api/addDynamic", {
          username: this.users.username,
          date: this.releaseTime,
          dynamic: this.textarea,
          classification: this.region,
          reportUsers: this.reporter
        })
        .then(res => {
          if (res.code === 200) {
            this.dialogFormVisible = false;
            this.region = "";
            this.reporter = [];
            this.textarea = "";
            this.getDynamicData(); //获取回报数据
            this.$message({
              showClose: true,
              message: "添加成功",
              type: "success"
            });
          } else if (res.code === 500) {
            this.$message({
              showClose: true,
              message: "添加失败",
              type: "error"
            });
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    // 获取汇报数据
    getDynamicData() {
      this.$axios
        .req("api/getDynamic")
        .then(res => {
          if (res.code === 200) {
            this.reportData = res.data;
            this.reportData.forEach(item => {
              item.releaseTime = this.$moment(item.date).format(
                "YYYY年MM月DD日"
              );
              item.releaseTime1 = this.$moment(item.date).format("YYYY-MM-DD");
            });
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    changeObj() {
      let num = 0;
      this.reportData.forEach(item => {
        if (item.releaseTime1 === this.timeDate) {
          num++;
        }
        return num;
      });
      if (num === 0) {
        this.noShow = true;
      } else {
        this.noShow = false;
      }
      // console.log(num);
    }
  },
  mounted() {
    this.getCityData(); //获取城市
    this.getReporterData(); // 获取汇报人数据
    this.getDynamicData(); //获取回报数据
    // let time = this.$moment(new Date());//用day.js获取当前时间
    // let time = new Date();//获取当前时间
    // let year = time.getFullYear();
    // let month = time.getMonth() + 1;
    // let day = time.getDay();
    // let time2 = `${year}-${month}-${day}`;
    // console.log(time2);
    // console.log(day);

    this.timeDate = this.$moment(new Date()).format("YYYY-MM-DD"); //获取当前日期，让时间选择器显示的日期是今天
    this.users = JSON.parse(localStorage.getItem("user")); //获取用户信息
  },
  created() {},
  filters: {},
  computed: {},
  watch: {
    //监听时间选择器选择的时间
    timeDate(val) {
      this.timeDate = this.$moment(val).format("YYYY-MM-DD");
      // this.releaseTime = this.$moment(val).format("YYYY年MM月DD日");
    },
    // 监听添加动态的类型
    region(val) {
      if (val === "工作汇报") {
        this.reportShow = true;
      } else {
        this.reportShow = false;
      }
    }
  },
  directives: {}
};
</script>

<style scoped lang="scss">
.cityDynamic-box {
  width: 94%;
  margin-left: 50px;
  padding-top: 200px;
  display: flex;
  justify-content: space-between;
}
/*城市*/
.cityDynamic-city {
  height: 440px;
  width: 49%;
  background-color: white;
}
/*利润*/
.cityDynamic-profit {
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  padding-left: 20px;
  border-bottom: #edf0f6 solid 1px;
}

.cityDynamic-personal-box {
  height: 440px;
  width: 49%;
  background-color: white;
  overflow: auto;
}
/*个人动态*/
.cityDynamic-personal {
  height: 50px;
  line-height: 50px;
  font-size: 14px;
}
/*个人动态和添加按钮的div*/
.cityDynamic-dynamic {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: #edf0f6 solid 1px;
  padding: 0 20px;
}
/*日期选择的div*/
.cityDynamic-time-box {
  margin-top: 20px;
  margin-left: 20px;
}
/*选择框的宽度*/
.el-select {
  width: 100%;
}
.report-loop-box {
  width: 95%;
  margin: 20px auto;
}
.report_background1 {
  background-color: #f0f0f1;
}
.report_background2 {
  background-color: #fafafb;
}
/*汇报动态类型、汇报详细内容*/
.report-loop-box1 {
  display: flex;
  justify-content: space-between;
  padding: 20px 20px;
}
/*汇报人div*/
.report-loop-box2 {
  display: flex;
  padding-left: 20px;
}
/*发布时间*/
.releaseTime-box {
  color: #cfcfcf;
}
/*暂无动态*/
.cityDynamic-no-data {
  margin-top: 20px;
  margin-left: 20px;
}

/*个人动态的进度条样式*/
::-webkit-scrollbar {
  width: 16px;
  height: 16px;
}

::-webkit-scrollbar-track,
::-webkit-scrollbar-thumb {
  border-radius: 999px;
  border: 5px solid transparent;
}

::-webkit-scrollbar-track {
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2) inset;
}

::-webkit-scrollbar-thumb {
  min-height: 20px;
  background-clip: content-box;
  box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.2) inset;
}

::-webkit-scrollbar-corner {
  background: transparent;
}
</style>
