<template>
  <div class="offer-box">
    <div class="offer-content-box">
      <div class="offer-title-content">
        <div class="offer-title-left">
          <div class="offer-content-img">
            <i class="el-icon-folder-opened" style="color: white"></i>
          </div>
          <div class="offer-title-name">offer管理</div>
        </div>
        <div>
          <el-row>
            <el-button type="primary" size="small">新建offer</el-button>
            <el-button type="primary" size="small">转移状态</el-button>
            <el-button type="primary" size="small">导出</el-button>
          </el-row>
        </div>
      </div>
      <div class="offer-content-box1">
        <div class="offer-content1-button">
          <el-row>
            <el-button type="primary" size="mini" round
              >代发offer({{ offerData1.length }})</el-button
            >
            <el-button type="primary" size="mini" round
              >已发offer({{ offerData2.length }})</el-button
            >
            <el-button type="primary" size="mini" round
              >已接受offer({{ offerData3.length }})</el-button
            >
            <el-button type="primary" size="mini" round
              >已拒绝offer({{ offerData4.length }})</el-button
            >
            <el-button type="primary" size="mini" round
              >已入职offer({{ offerData5.length }})</el-button
            >
          </el-row>
        </div>
        <div>
          <el-table
            ref="multipleTable"
            :data="offerAll.slice((currentPage - 1) * num, currentPage * num)"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            :row-style="{ height: height1 }"
            :cell-style="{ padding: '0px' }"
          >
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column
              v-for="(item, index) in offerTitle1"
              :key="index"
              :prop="item.type"
              :label="item.label"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column align="center">
              <template slot="header">
                <el-popover placement="bottom" width="200" trigger="click">
                  <i
                    class="el-icon-setting"
                    style="color: #00B7FF;font-size: 20px"
                    slot="reference"
                  ></i>
                  <div class="offer-tips-field">
                    <el-popover placement="left" trigger="click" width="70">
                      <div slot="reference" @click="addField" class="popover_1">
                        添加显示字段
                      </div>
                      <el-checkbox-group
                        v-model="addVal"
                        @change="handleCheckedCitiesChange"
                      >
                        <el-checkbox
                          v-for="(item1, index1) in offerTitle2"
                          :label="item1"
                          :key="index1"
                          >{{ item1.label }}</el-checkbox
                        >
                      </el-checkbox-group>
                      <el-button
                        type="primary"
                        size="mini"
                        style="margin-left: 100px;"
                        @click="addSure"
                        >确定</el-button
                      >
                    </el-popover>
                    <el-popover placement="left" trigger="click" width="70">
                      <div
                        slot="reference"
                        @click="deleteField"
                        class="popover_1"
                      >
                        删除显示字段
                      </div>
                      <el-checkbox-group
                        v-model="deleteVal"
                        @change="handleCheckedCitiesChange1"
                      >
                        <el-checkbox
                          v-for="(item2, index2) in offerTitle1"
                          :label="item2"
                          :key="index2"
                          >{{ item2.label }}</el-checkbox
                        >
                      </el-checkbox-group>
                      <el-button
                        type="primary"
                        size="mini"
                        style="margin-left: 100px;"
                        @click="deleteSure"
                        >确定</el-button
                      >
                    </el-popover>
                  </div>
                  <div class="offer-tips-field-box">
                    <div>
                      选择间距类型
                    </div>
                    <div class="offer-tips-field">
                      <div
                        class="popover_1_1"
                        :class="{ popover_1_2: popoverShow === 0 }"
                        @click="compactObj"
                      >
                        紧凑
                      </div>
                      <div
                        class="popover_1_1"
                        :class="{ popover_1_2: popoverShow === 1 }"
                        @click="moderateObj"
                      >
                        适中
                      </div>
                      <div
                        class="popover_1_1"
                        :class="{ popover_1_2: popoverShow === 2 }"
                        @click="easyObj"
                      >
                        宽松
                      </div>
                    </div>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <paging
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
          :arrData="offerAll"
          :pageSizesArr="pageSizesArr3"
          :pageSize="num"
        ></paging>
      </div>
    </div>
  </div>
</template>

<script>
import paging from "../components/paging/Paging";
export default {
  name: "offer",
  components: {
    paging
  },
  props: {},
  data() {
    return {
      offerAll: [], //全部offer数据
      offerData1: [], //代发offer
      offerData2: [], //已发offer
      offerData3: [], //已接受offer
      offerData4: [], //已拒绝offer
      offerData5: [], //已入职offer
      offerTitle1: [], //渲染\删除的标题
      offerTitle2: [], //添加的标题
      addVal: [], //添加选中标题
      deleteVal: [], //删除选中标题
      visible: false,
      multipleSelection: [],
      num: 10, //每页多少条初始化数据
      currentPage: 1, //多少页
      pageSizesArr3: [10, 20, 30, 40], //一页多少条选择数据
      height1: "60px", //控制表格的行高
      popoverShow: 1,
      offerTitle: [
        {
          type: "name",
          label: "姓名"
        },
        {
          type: "email",
          label: "个人邮箱"
        },
        {
          type: "documentType",
          label: "证件类型"
        },
        {
          type: "documentNum",
          label: "证件号码"
        },
        {
          type: "gender",
          label: "性别"
        },
        {
          type: "position",
          label: "职位"
        },
        {
          type: "nativePlace",
          label: "籍贯"
        },
        {
          type: "QQ",
          label: "QQ"
        },
        {
          type: "entry",
          label: "入职时间"
        },
        {
          type: "dateOfBirth",
          label: "出生日期"
        },
        {
          type: "famousRace",
          label: "民族"
        },
        {
          type: "phone",
          label: "电话"
        },
        {
          type: "tel",
          label: "座机电话"
        },
        {
          type: "approval",
          label: "offer状态"
        },
        {
          type: "region",
          label: "部门"
        },

        {
          type: "marriage",
          label: "婚姻状态"
        },
        {
          type: "age",
          label: "年龄"
        },
        {
          type: "education",
          label: "学历"
        },
        {
          type: "city",
          label: "工作地点"
        }
      ] //数组的全部标题
    };
  },
  methods: {
    // 获取offer数据
    getOfferData() {
      this.$axios
        .req("api/offerData")
        .then(res => {
          this.offerAll = res.data;
          // for (let key in res.data[0]) {
          //   this.offerTitle.push({ type: key, label: res.data[0][key] });
          // this.offerTitle.push({ type: key });
          //   console.log(key);
          // }
          //可以获取对象的key值
          this.offerData1 = this.offerAll.filter(item => {
            return JSON.stringify(item).indexOf("代发") !== -1;
          });
          this.offerData2 = this.offerAll.filter(item => {
            return JSON.stringify(item).indexOf("已发") !== -1;
          });
          this.offerData3 = this.offerAll.filter(item => {
            return JSON.stringify(item).indexOf("已接受") !== -1;
          });
          this.offerData4 = this.offerAll.filter(item => {
            return JSON.stringify(item).indexOf("已拒绝") !== -1;
          });
          this.offerData5 = this.offerAll.filter(item => {
            return JSON.stringify(item).indexOf("已入职") !== -1;
          });
        })
        .catch(e => {
          console.log(e);
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 添加显示字段的change事件
    handleCheckedCitiesChange(val) {
      this.addVal = val;
    },
    // 删除显示字段的change事件
    handleCheckedCitiesChange1(val) {
      this.deleteVal = val;
    },
    // 添加字段控制多选框的显示、隐藏
    addField() {},
    // 删除字段控制多选框的显示、隐藏
    deleteField() {},
    // 添加字段的确定按钮
    addSure() {
      // this.addVal.forEach(item => {
      //   this.offerTitle1.push(item);
      // });
      // this.offerTitle2 = this.offerTitle.filter(item => {
      //   return !this.offerTitle1.includes(item);
      // });
      // // includes 判断次属性是否在另外一个数组中存在
      // this.addVal = [];
      this.addVal.forEach(item => {
        this.offerTitle1.push(item);
        this.offerTitle2 = this.offerTitle2.filter(item1 => {
          return JSON.stringify(item1).indexOf(item.label) === -1;
        });
      });
      this.addVal = [];
    },
    // 添加字段的删除按钮
    deleteSure() {
      // this.deleteVal.forEach(item => {
      //   this.offerTitle2.push(item);
      // });
      // this.offerTitle1 = this.offerTitle1.filter(item => {
      //   return !this.offerTitle3.includes(item);
      // });
      // // includes 判断次属性是否在另外一个数组中存在
      // this.deleteVal = [];
      this.deleteVal.forEach(item => {
        this.offerTitle2.push(item);
        this.offerTitle1 = this.offerTitle1.filter(item1 => {
          return JSON.stringify(item1).indexOf(item.label) === -1;
        });
      });
      this.deleteVal = [];
    },
    // 紧凑
    compactObj() {
      this.height1 = "30px";
      this.popoverShow = 0;
    },
    // 适中
    moderateObj() {
      this.height1 = "60px";
      this.popoverShow = 1;
    },
    // 宽松
    easyObj() {
      this.height1 = "100px";
      this.popoverShow = 2;
    },
    //子组件传值分发事件（分页）
    handleSizeChange(data) {
      this.num = data;
    },
    handleCurrentChange(data) {
      this.currentPage = data;
    }
  },
  mounted() {
    this.getOfferData();
    this.offerTitle1 = this.offerTitle.slice(0, 9); //初始化渲染页面、删除的标题
    this.offerTitle2 = this.offerTitle.slice(9, this.offerTitle.length); //初始化添加列表的标题
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
.offer-box {
  height: 100%;
  background-color: #f2f3f6;
  padding-top: 80px;
}
/*内容*/
.offer-content-box {
  width: 95%;
  margin-left: 50px;
}
/*头部标题内容*/
.offer-title-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.offer-title-left {
  display: flex;
  align-items: center;
}
/*引入图片*/
.offer-content-img {
  height: 30px;
  width: 30px;
  background-color: #35b872;
  display: flex;
  align-items: center;
  justify-content: center;
}
/*标题名*/
.offer-title-name {
  font-weight: bold;
  margin-left: 10px;
}
.offer-content-box1 {
  width: 100%;
  margin-top: 15px;
  padding-top: 15px;
  background-color: white;
}
/*offer按钮*/
.offer-content1-button {
  margin-left: 20px;
}
/*字段提示*/
.offer-tips-field {
  height: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.popover_1 {
  font-size: 14px;
}
/*鼠标浮上显示小手和颜色*/
.popover_1:hover {
  cursor: pointer;
  color: #00b7ff;
}
.popover_1_1:hover {
  cursor: pointer;
  color: #00b7ff;
}
.popover_1_2 {
  color: #00b7ff;
}
.offer-tips-field-box {
  width: 95%;
  height: 30px;
  margin: 5px auto;
  padding-top: 5px;
  border-top: #9d78a6 solid 1px;
}
/*element自带样式名*/
.el-checkbox {
  margin-bottom: 10px;
}
.el-checkbox-group {
  width: 120px;
}
</style>
