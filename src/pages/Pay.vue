<template>
  <div class="pay-box">
    <div class="pay-content-box">
      <div class="pay-content-box1">
        <div class="pay-content-title">
          <div class="content-title-img">
            <i class="el-icon-discount" style="color: white"></i>
          </div>
          <div class="content-title-name">薪酬管理</div>
        </div>
      </div>
      <div class="pay-content-box2">
        <div class="pay-content-name">
          <span class="content-time-span">{{ monthData }} </span>
          <span> 薪酬预算</span>
        </div>
        <div class="month-box">
          <el-date-picker
            v-model="value"
            type="month"
            align="right"
            placeholder="请选择月份"
            :picker-options="pickerOptions"
            @change="timeChange"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="pay-content-tips">
        <span class="content-tips-span"
          >如果有更多的渠道请自行添加，所有添加的渠道会显示在CRM系统中</span
        >
      </div>
      <div>
        <el-table
          :data="payDAta"
          border
          :summary-method="getSummaries"
          show-summary
          style="width: 98%"
        >
          <el-table-column prop="title" label="薪资构成" align="center">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.title"
                v-if="scope.row.isInput1 === true"
                @blur="inputBlur1(scope)"
                placeholder="请输入内容"
              ></el-input>
              <div
                v-if="scope.row.isInput1 === false"
                @click="inputShow1(scope)"
              >
                {{ scope.row.title }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="plan" label="计划支出(元)" align="center">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.plan"
                v-if="scope.row.isInput2 === true"
                @blur="inputBlur2(scope)"
                placeholder="请输入内容"
              ></el-input>
              <div
                v-if="scope.row.isInput2 === false"
                @click="inputShow2(scope)"
              >
                {{ scope.row.plan }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="actual" label="实际支出(元)" align="center">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.actual"
                v-if="scope.row.isInput3 === true"
                @blur="inputBlur3(scope)"
                placeholder="请输入内容"
              ></el-input>
              <div
                v-if="scope.row.isInput3 === false"
                @click="inputShow3(scope)"
              >
                {{ scope.row.actual }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="LastPlan" label="上月计划(元)" align="center">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.LastPlan"
                :disabled="true"
                class="payLastPlanInput"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="lastActual"
            label="上月实际(元)"
            align="center"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.lastActual"
                :disabled="true"
                class="payLastPlanInput"
              ></el-input>
            </template>
          </el-table-column>
        </el-table>
        <div class="add-box">
          <el-button type="primary" @click="addClick">添加更多</el-button>
          <el-button
            type="primary"
            v-if="buttonShow === true"
            @click="cancelClick"
            >取消</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "pay",
  components: {},
  props: {},
  data() {
    return {
      monthData: "", //默认本月
      value: "", //用户选择的日期
      pickerOptions: {
        shortcuts: [
          {
            text: "本月",
            onClick(picker) {
              picker.$emit("pick", [new Date(), new Date()]);
            }
          },
          {
            text: "上月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 1);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      payDAta: [],
      buttonShow: false
    };
  },
  methods: {
    // 获取薪酬数据
    getPayData() {
      this.$axios.req("api/pay").then(res => {
        if (res) {
          this.payDAta = res.data;
          console.log(this.payDAta);
        }
      });
    },
    // 监听时间选择器的值
    timeChange(val) {
      if (val.length > 0) {
        this.monthData = this.$moment(val[0]).format("YYYY年MM月");
        this.value = this.$moment(val[0]).format("YYYY-MM");
      } else {
        this.monthData = this.$moment(val).format("YYYY年MM月");
      }
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += " 元";
        } else {
          sums[index] = "N/A";
        }
      });
      return sums;
    },
    //input失去焦点事件
    inputBlur1(scope) {
      if (scope.row.title === "") {
        this.$message({
          message: "请输入标题",
          type: "warning"
        });
      } else {
        scope.row.isInput1 = false;
        this.$message({
          message: "操作成功",
          type: "success"
        });
      }
      console.log(scope);
    },
    inputBlur2(scope) {
      if (scope.row.plan === "") {
        this.$message({
          message: "请输入金额",
          type: "warning"
        });
      } else {
        scope.row.isInput2 = false;
        this.$message({
          message: "操作成功",
          type: "success"
        });
      }
    },
    inputBlur3(scope) {
      if (scope.row.actual === "") {
        this.$message({
          message: "请输入金额",
          type: "warning"
        });
      } else {
        scope.row.isInput3 = false;
        this.$message({
          message: "操作成功",
          type: "success"
        });
      }
    },
    // input框显示事件
    inputShow1(scope) {
      scope.row.isInput1 = true;
    },
    inputShow2(scope) {
      scope.row.isInput2 = true;
    },
    inputShow3(scope) {
      scope.row.isInput3 = true;
    },
    // 添加按钮
    addClick() {
      if (
        this.payDAta[this.payDAta.length - 1].title === "" ||
        this.payDAta[this.payDAta.length - 1].plan === "" ||
        this.payDAta[this.payDAta.length - 1].actual === ""
      ) {
        this.$message({
          message: "请输入完整数据",
          type: "warning"
        });
      } else {
        let dataArr = {
          title: "",
          plan: "",
          actual: "",
          lastActual: 0,
          LastPlan: 0,
          isInput1: true,
          isInput2: true,
          isInput3: true
        };
        this.buttonShow = true;
        this.payDAta.push(dataArr);
      }
    },
    // 取消按钮
    cancelClick() {
      if (
        this.payDAta[this.payDAta.length - 1].title === "" ||
        this.payDAta[this.payDAta.length - 1].plan === "" ||
        this.payDAta[this.payDAta.length - 1].actual === ""
      ) {
        this.payDAta.pop();
        this.buttonShow = false;
      }
    }
  },
  mounted() {
    this.monthData = this.$moment(new Date()).format("YYYY年MM月");
    this.value = this.$moment(new Date()).format("YYYY-MM");
    this.getPayData();
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
.pay-box {
  padding-top: 80px;
  height: 100%;
  background-color: #f2f3f6;
}
/*全部内容*/
.pay-content-box {
  margin-left: 50px;
}
/*头部内容*/
.pay-content-title {
  display: flex;
  align-items: center;
}
/*引入图标 */
.content-title-img {
  height: 30px;
  width: 30px;
  background-color: #35b872;
  display: flex;
  justify-content: center;
  align-items: center;
}
/*标题名*/
.content-title-name {
  font-weight: bold;
  margin-left: 10px;
}
/*月份选择的内容*/
.pay-content-box2 {
  width: 98%;
  height: 80px;
  background-color: white;
  margin-top: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.pay-content-name {
  font-size: 25px;
  font-weight: bold;
}
/*显示时间的span标签*/
.content-time-span {
  margin-left: 20px;
}
/*月份选择框*/
.month-box {
  margin-right: 40px;
}
/*提示*/
.pay-content-tips {
  width: 98%;
  height: 60px;
  line-height: 60px;
  background-color: #e7f4e3;
}
/*提示内容*/
.content-tips-span {
  margin-left: 20px;
}
.add-box {
  margin-left: 50px;
  margin-top: 50px;
}
</style>
