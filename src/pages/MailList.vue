<template>
  <div class="mailList-box">
    <div class="mailList-content-box">
      <div class="mailListName-box">
        <el-tree
          :data="mailListArr"
          :props="defaultProps"
          @node-click="handleNodeClick"
        ></el-tree>
      </div>
      <div class="mailList-loop-box">
        <div
          v-for="item in mailListData.slice(
            (currentPage - 1) * num,
            currentPage * num
          )"
          :key="item.id"
          class="mailListData-loop-box"
        >
          <el-card class="box-card">
            <div class="mailListData-loop-box1">
              <div
                class="mailListData-loop-img"
                :style="'backgroundColor:' + item.backgroundColor"
              >
                {{ item.name }}
              </div>
              <div class="mailListData-loop-name">
                <div>{{ item.name }}</div>
                <div>
                  <span>{{ item.region }} / </span>
                  <span>{{ item.position }}</span>
                </div>
                <div class="label-box">
                  <div v-for="(item1, index1) in item.label" :key="index1">
                    <div
                      v-if="item1.teg"
                      class="label-loop-box1"
                      :style="'backgroundColor:' + item1.color"
                    >
                      {{ item1.teg }}
                    </div>
                  </div>
                  <div v-if="item.label.length === 0" class="label-Tips">
                    <i class="el-icon-circle-plus-outline"></i>
                    快来给他添加一个标签吧
                  </div>
                </div>
              </div>
            </div>
            <div class="personnel-information">
              <div>邮箱:{{ item.email }}</div>
              <div>办公电话:{{ item.tel }}</div>
              <div>手机号码:{{ item.phone }}</div>
              <div>性别:{{ item.gender }}</div>
              <div>QQ:{{ item.qq }}</div>
            </div>
          </el-card>
        </div>
        <div v-if="mailListData.length === 0" class="mailList-tips">
          暂无数据
        </div>
      </div>
    </div>
    <div class="paging-box">
      <paging
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        :arrData="mailListData"
        :pageSizesArr="pageSizesArr1"
        :pageSize="num"
      ></paging>
    </div>
  </div>
</template>

<script>
import mailListName from "../mock/mailList";
import paging from "../components/paging/Paging";
export default {
  name: "mailList",
  components: {
    paging
  },
  props: {},
  data() {
    return {
      mailListArr: [], //树状图数据
      mailListData: [], //通讯录数据
      mailListData1: [], //通讯录数据
      defaultProps: {
        children: "children",
        label: "label"
      },
      num: 15, //每页多少条初始化数据
      currentPage: 1, //多少页
      pageSizesArr1: [15, 30, 60, 90, 200] //一页多少条选择数据
    };
  },
  methods: {
    handleNodeClick(data) {
      this.mailListData = this.mailListData1;
      if (!data.children) {
        let arr = this.mailListData.filter(item => {
          return JSON.stringify(item).indexOf(data.label) !== -1;
        });
        this.mailListData = arr;
      }
    },
    // 获取通讯录数据
    getMailListData() {
      this.$axios
        .req("api/mailListData")
        .then(res => {
          this.mailListData = res.data;
          this.mailListData1 = res.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    //子组件传值分发事件
    handleSizeChange(data) {
      this.num = data;
    },
    handleCurrentChange(data) {
      this.currentPage = data;
    }
  },
  mounted() {
    this.mailListArr = mailListName.data;
    this.getMailListData();
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
.mailList-box {
  height: 100%;
  background-color: #f2f3f6;
}
/*内容*/
.mailList-content-box {
  padding-top: 80px;
  display: flex;
  align-items: flex-start; //在flex容器的当前行的侧轴（纵轴）方向上的对齐方式.避免树状图全部点开时,由于渲染数据过少时,出现的元素之间height和定义值不一样
}
/*树形控件的div*/
.mailListName-box {
  width: 18%;
  margin-left: 2%;
}
/*暂无数据提示*/
.mailList-tips {
  width: 100%;
  height: 300px;
  line-height: 300px;
  font-size: 30px;
  color: skyblue;
  text-align: center;
}
/*循环外的div*/
.mailList-loop-box {
  width: 85%;
  display: flex;
  /*justify-content: space-evenly;*/
  flex-wrap: wrap;
  margin-left: 1%;
}
/*员工头像*/
.mailListData-loop-img {
  height: 80px;
  width: 80px;
  border-radius: 50%;
  text-align: center;
  line-height: 80px;
  color: white;
  margin-top: 15px;
  margin-left: 15px;
  /*margin: 15px;*/
}
/*循环的div*/
.mailListData-loop-box {
  width: 32%;
  height: 301px;
  margin-bottom: 10px;
  margin-right: 1%;
  /*border: gray solid 1px;*/
}
/*名字、img*/
.mailListData-loop-box1 {
  display: flex;
  border-bottom: #f2f2f2 solid 1px;
  padding-bottom: 20px;
}
/*循环的名字div*/
.mailListData-loop-name {
  margin-left: 15px;
  margin-top: 23px;
  font-size: 13px;
}
/*个性标签*/
.label-box {
  display: flex;
}
/*人员信息*/
.personnel-information {
  margin: 20px 0px 20px 20px;
}
/*标签内容*/
.label-loop-box1 {
  height: 20px;
  font-size: 12px;
  line-height: 20px;
  border-radius: 10px;
  padding: 0px 11px;
  color: white;
  margin-right: 5px;
  margin-top: 5px;
}
/*添加标签提示*/
.label-Tips {
  font-size: 14px;
  color: gray;
}
/*分页*/
.paging-box {
  margin-left: 20%;
  padding-bottom: 20px;
}
</style>
