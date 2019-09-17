<template>
  <div class="personnel-box">
    <div class="personnel-content-title">
      <div class="personnel-content-left">
        <div class="personnel-img">
          <i class="el-icon-user" style="color: white "></i>
        </div>
        <div class="personnel-title-name">人员信息</div>
      </div>
      <div class="personnel-content-right">
        <el-row>
          <el-button
            type="primary"
            size="mini"
            @click="batch"
            v-if="showButton === false"
            >批量转正申请</el-button
          >
          <el-button
            type="primary"
            size="mini"
            @click="determine"
            v-if="showButton === true"
            >确定</el-button
          >
          <el-button
            type="primary"
            size="mini"
            @click="showButton = false"
            v-if="showButton === true"
            >取消</el-button
          >
          <el-button type="primary" size="mini">导出</el-button>
        </el-row>
      </div>
    </div>
    <div class="personnel-box1">
      <div class="personnel-button-box">
        <el-row>
          <el-button
            type="primary"
            size="small"
            plain
            round
            autofocus
            @click="personnelAll"
            >全部员工</el-button
          >
          <el-button
            type="primary"
            size="small"
            plain
            round
            @click="examination"
            >考核中员工</el-button
          >
          <el-button type="primary" size="small" plain round @click="adopt"
            >已转正员工</el-button
          >
        </el-row>
      </div>
      <div>
        <el-table
          ref="multipleTable"
          :data="
            personnelData.slice((currentPage - 1) * num, currentPage * num)
          "
          tooltip-effect="dark"
          style="width: 98%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" align="center">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="100" align="center">
          </el-table-column>
          <el-table-column
            prop="JobNumber"
            label="工号"
            width="100"
            sortable
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="mechanism"
            label="机构"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="region"
            label="部门"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="startTime"
            label="试用期开始时间"
            sortable
            width="150 "
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="endTime"
            label="试用期结束时间"
            width="150"
            sortable
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="state"
            label="转正审批状态"
            align="center"
          >
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="small" type="primary" @click="seeClick(scope)"
                >编辑试用期</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <paging
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
          :arrData="personnelData"
          :pageSizesArr="pageSizesArr2"
          :pageSize="num"
        ></paging>
      </div>
    </div>
  </div>
</template>

<script>
import paging from "../components/paging/Paging";
export default {
  name: "personnel",
  components: {
    paging
  },
  props: {},
  data() {
    return {
      showButton: false, //buttons的显示、隐藏
      num: 10, //每页显示条数的初始化值
      pageSizesArr2: [10, 20, 30, 40], //每页选择条数
      currentPage: 1,
      personnelData: [], //人员信息渲染页面数据
      personnelData1: [], //全部人员数据
      // personnelData2: [], //考核中人员的数据
      // personnelData3: [], //已转正人员的数据
      // personnelData4: [], //除已转正人员的数据
      multipleSelection: []
    };
  },
  methods: {
    handleSizeChange(data) {
      this.num = data;
    },
    handleCurrentChange(data) {
      this.currentPage = data;
    },
    // 获取人员信息
    getPersonnelData() {
      this.$axios
        .req("api/personnel")
        .then(res => {
          if (res) {
            this.personnelData = res.data;
            this.personnelData1 = res.data;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    // 确定按钮
    determine() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: "最少选择一条信息",
          type: "warning"
        });
      } else {
        this.multipleSelection.map(item => {
          return (item.state = "审批通过");
        });
        let statusName = "审批通过";
        let arr = this.personnelData1.filter(item => {
          return JSON.stringify(item).indexOf(statusName) === -1;
          // console.log(JSON.stringify(item).indexOf(statusName));
        });
        this.personnelData = arr;
        this.showButton = false;
        this.$message({
          message: "操作成功",
          type: "success"
        });
      }
    },
    // 选择框
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 全部员工按钮
    personnelAll() {
      this.personnelData = this.personnelData1;
    },
    // 审核中按钮
    examination() {
      let statusName = "审批中";
      let arr = this.personnelData1.filter(item => {
        return JSON.stringify(item).indexOf(statusName) !== -1;
      });
      this.personnelData = arr;
    },
    // 转正按钮
    adopt() {
      let statusName = "审批通过";
      let arr = this.personnelData1.filter(item => {
        return JSON.stringify(item).indexOf(statusName) !== -1;
      });
      this.personnelData = arr;
    },
    //批量转正
    batch() {
      this.showButton = true;
      let statusName = "审批通过";
      let arr = this.personnelData1.filter(item => {
        return JSON.stringify(item).indexOf(statusName) === -1;
      });
      this.personnelData = arr;
    }
  },
  mounted() {
    this.getPersonnelData();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.personnel-box {
  padding-top: 80px;
  height: 100%;
  background-color: #f2f3f6;
}
/*头部内容*/
.personnel-content-title {
  display: flex;
  justify-content: space-between;
}
/*左边内容*/
.personnel-content-left {
  margin-left: 40px;
  display: flex;
  align-items: center;
}
/*右边内容*/
.personnel-content-right {
  margin-right: 20px;
}
/*引入的图标*/
.personnel-img {
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #35b872;
}
/*标题栏*/
.personnel-title-name {
  font-weight: bold;
  margin-left: 10px;
}
.personnel-box1 {
  margin-left: 40px;
}
.personnel-button-box {
  height: 80px;
  line-height: 80px;
}
</style>
