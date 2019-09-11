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
          <el-card>
            <div class="mailListData-loop-box1">
              <!--              <img :src="item.img" alt="" class="mailListData-loop-img" />-->
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
        <paging
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
          :arrData="mailListData"
          :pageSizesArr="pageSizesArr1"
          :pageSize="num"
        ></paging>
      </div>
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
      num: 30, //每页多少条初始化数据
      currentPage: 1, //多少页
      pageSizesArr1: [30, 60, 90, 200] //一页多少条选择数据
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
      console.log(data);
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
}
/*树形控件的div*/
.mailListName-box {
  width: 15%;
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
  height: 90px;
  width: 90px;
  border-radius: 50%;
  text-align: center;
  line-height: 90px;
  color: white;
  /*margin: 15px;*/
}
/*循环的div*/
.mailListData-loop-box {
  width: 32%;
  background-color: white;
  margin-bottom: 20px;
  margin-right: 1%;
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
  margin-top: 10px;
}
/*个性标签*/
.label-box {
  display: flex;
}
/*人员信息*/
.personnel-information {
  margin-top: 20px;
}
/*标签内容*/
.label-loop-box1 {
  height: 20px;
  font-size: 14px;
  border-radius: 10px;
  padding: 2px 11px;
  color: white;
  margin-right: 6px;
  margin-top: 4px;
}
/*添加标签提示*/
.label-Tips {
  font-size: 14px;
  color: gray;
}
</style>
