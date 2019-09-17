<template>
  <div class="Aside-box">
    <el-menu
      default-active="0"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <el-menu-item
        :index="String(index)"
        @click="itemClick(item, index)"
        v-for="(item, index) in asideArr"
        v-show="index < 3"
        :key="index"
      >
        <i :class="item.image"></i>
        <img
          src="../../images/dot.png"
          alt=""
          class="aside-dot"
          v-if="item.boolean === true && isCollapse === true"
        />
        <span slot="title"
          >{{ item.name
          }}<span v-if="item.boolean === true" class="newStyle">new</span></span
        >
      </el-menu-item>
      <el-submenu
        :index="String(index + 6)"
        v-for="(item, index) in asideArr"
        v-show="index === 3"
        :key="item.id"
      >
        <template slot="title">
          <i :class="item.image"></i>
          <img
            src="../../images/dot.png"
            alt=""
            class="aside-dot"
            v-if="item.boolean === true && isCollapse === true"
          />
          <span slot="title">{{ item.name }}</span>
          <span v-if="item.boolean === true" class="newStyle">new</span>
        </template>
        <el-menu-item-group v-for="(item1, index1) in staffArr" :key="index1">
          <el-menu-item
            :index="String(item1.id)"
            @click="staffClick(item, index1)"
            >{{ item1.name }}</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
      <el-submenu
        :index="String(index + 11)"
        v-for="(item, index) in asideArr"
        v-show="index === 4"
        :key="item.num"
      >
        <template slot="title">
          <i :class="item.image"></i>
          <img
            src="../../images/dot.png"
            alt=""
            class="aside-dot"
            v-if="item.boolean === true && isCollapse === true"
          />
          <span slot="title">{{ item.name }}</span>
          <span v-if="item.boolean === true" class="newStyle">new</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="11" @click="formClick(item)"
            >分布表单</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
      <el-dialog title="更新提示" :visible="dialogVisible" width="30%">
        <div v-for="(item2, index2) in text1" :key="index2">
          <div v-if="item2 !== ''">
            <span>{{ index2 + 1 }}、</span>
            <span>{{ item2 }}</span>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false"
            >知道了</el-button
          >
        </span>
      </el-dialog>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Aside",
  components: {},
  props: {},
  data() {
    return {
      //id、num 再循环的时候为了key值不一样
      asideArr: [
        {
          id: 6,
          num: 11,
          name: "首页",
          image: "el-icon-location"
        },
        {
          id: 7,
          num: 12,
          name: "日程管理",
          image: "el-icon-date"
        },
        {
          id: 8,
          num: 13,
          name: "通讯录",
          image: "el-icon-document"
        },
        {
          id: 9,
          num: 14,
          name: "组织员工",
          image: "el-icon-user"
        },
        {
          id: 10,
          num: 15,
          name: "表单页",
          image: "el-icon-files"
        }
      ], //侧边栏大类
      staffArr: [
        {
          id: "1-1",
          name: "offer管理"
        },
        {
          id: "1-2",
          name: "人员信息"
        },
        {
          id: "1-3",
          name: "薪酬管理"
        }
      ], //侧边栏小类
      newNoticeArr: [], //新通知数据
      textArr: [], //通知内容
      dialogVisible: false,
      text1: [] //通知内容
      // isCollapse: false //展开、收起
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //每个大类的新通知
    itemClick(item, index) {
      if (item.boolean === true) {
        this.dialogVisible = true;
        this.text1 = item.text;
      }
      if (index === 0) {
        this.$router.push("/");
      } else if (index === 1) {
        this.$router.push("/schedule");
      } else if (index === 2) {
        this.$router.push("/mailList");
      }
    },
    // 组织员工，显示新通知的内容
    staffClick(item, index1) {
      if (item.boolean === true && index1 === 0) {
        this.dialogVisible = true;
        this.text1 = item.text;
      }
      if (index1 === 0) {
        this.$router.push("/category/offer");
      } else if (index1 === 1) {
        this.$router.push("/category/personnel");
      } else if (index1 === 2) {
        this.$router.push("/category/pay");
      }
    },
    //分布表单，显示新通知的内容
    formClick(item) {
      if (item.boolean === true) {
        this.dialogVisible = true;
        this.text1 = item.text;
      }
      this.$router.push("/category/stepForm");
    }
  },
  mounted() {
    // 新通知数据;
    this.$axios
      .req("api/newNotice")
      .then(res => {
        if (res.code === 200) {
          res.data.forEach(i => {
            this.newNoticeArr.push(i.boolean);
            this.textArr.push(i.text.split("。"));
          });
          this.asideArr.forEach((item, index) => {
            this.$set(item, "boolean", this.newNoticeArr[index]);
            this.$set(item, "text", this.textArr[index]);
          });
          //判断首页是否有新通知
          if (this.asideArr[0].boolean === true) {
            this.dialogVisible = true;
            this.text1 = this.asideArr[0].text;
          }
          // console.log(this.textArr);
          // console.log(this.newNoticeArr);
          // console.log(this.asideArr);
        }
      })
      .catch(e => {
        console.log(e);
      });
  },
  created() {},
  filters: {},
  computed: {
    isCollapse() {
      return this.$store.state.isCollapse1;
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  /*min-height: 400px;*/
  height: 100vh;
}
.el-menu {
  border: 0px;
}
/*new*/
.newStyle {
  margin-left: 30px;
  right: 10px;
  color: red;
  vertical-align: bottom;
  font-style: oblique;
}
/*圆点*/
.aside-dot {
  height: 15px;
  width: 15px;
}
</style>
