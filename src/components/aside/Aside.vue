<template>
  <div class="Aside-box">
    <el-menu
      :default-active="indexNum"
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
          >{{ asideName[index].name
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
          <span slot="title">{{ asideName[index].name }}</span>
          <span v-if="item.boolean === true" class="newStyle">new</span>
        </template>
        <el-menu-item-group v-for="(item1, index1) in staffArr" :key="index1">
          <el-menu-item
            :index="String(item1.id)"
            @click="staffClick(item, item1, index1)"
            >{{ staffName[index1].name }}</el-menu-item
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
          <span slot="title">{{ asideName[index].name }}</span>
          <span v-if="item.boolean === true" class="newStyle">new</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="13" @click="formClick(item)">{{
            formName[0].name
          }}</el-menu-item>
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
import Vue from "vue";
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
          image: "el-icon-location"
        },
        {
          id: 7,
          num: 12,
          image: "el-icon-date"
        },
        {
          id: 8,
          num: 13,
          image: "el-icon-document"
        },
        {
          id: 9,
          num: 14,
          image: "el-icon-user"
        },
        {
          id: 10,
          num: 15,
          image: "el-icon-files"
        }
      ], //侧边栏大类
      staffArr: [
        {
          id: "1-1"
        },
        {
          id: "1-2"
        },
        {
          id: "1-3"
        }
      ], //侧边栏小类
      newNoticeArr: [], //新通知数据
      textArr: [], //通知内容
      dialogVisible: false,
      text1: [], //通知内容
      // isCollapse: false //展开、收起
      indexNum: "0", //el-menu-item 动态绑定的index
      asideName: [
        { name: this.$t("message.asName1"), value: 0 },
        { name: this.$t("message.asName2"), value: 0 },
        { name: this.$t("message.asName3"), value: 0 },
        { name: this.$t("message.asName4"), value: 0 },
        { name: this.$t("message.asName5"), value: 0 }
      ], //大类名
      staffName: [
        { name: this.$t("message.asName4_1"), value: 0 },
        { name: this.$t("message.asName4_2"), value: 0 },
        { name: this.$t("message.asName4_3"), value: 0 }
      ], //组织员工的小类名
      formName: [{ name: this.$t("message.asName5_1"), value: 0 }] //分布表单
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
        localStorage.setItem("indexNum", JSON.stringify(index));
      } else if (index === 1) {
        this.$router.push("/schedule");
        localStorage.setItem("indexNum", JSON.stringify(index));
      } else if (index === 2) {
        this.$router.push("/mailList");
        localStorage.setItem("indexNum", JSON.stringify(index));
      }
    },
    // 组织员工，显示新通知的内容
    staffClick(item, item1, index1) {
      if (item.boolean === true && index1 === 0) {
        this.dialogVisible = true;
        this.text1 = item.text;
      }
      if (index1 === 0) {
        this.$router.push("/category/offer");
        localStorage.setItem("indexNum", JSON.stringify(item1.id));
      } else if (index1 === 1) {
        this.$router.push("/category/personnel");
        localStorage.setItem("indexNum", JSON.stringify(item1.id));
      } else if (index1 === 2) {
        this.$router.push("/category/pay");
        localStorage.setItem("indexNum", JSON.stringify(item1.id));
      }
    },
    //分布表单，显示新通知的内容
    formClick(item) {
      if (item.boolean === true) {
        this.dialogVisible = true;
        this.text1 = item.text;
      }
      this.$router.push("/category/stepForm");
      localStorage.setItem("indexNum", JSON.stringify(13));
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
    if (JSON.parse(localStorage.getItem("indexNum")) !== null) {
      this.indexNum = JSON.parse(localStorage.getItem("indexNum")).toString();
    }
  },
  created() {},
  filters: {},
  computed: {
    isCollapse() {
      return this.$store.state.isCollapse1;
    },
    // 监听语言切换
    languageData() {
      return this.$i18n.locale;
    }
  },
  watch: {
    languageData(val) {
      if (val === "tcc") {
        this.$i18n.locale = "tcc";
        Vue.set(this.asideName, 0, {
          name: this.$t("message.asName1"),
          value: 0
        });
        Vue.set(this.asideName, 1, {
          name: this.$t("message.asName2"),
          value: 1
        });
        Vue.set(this.asideName, 2, {
          name: this.$t("message.asName3"),
          value: 2
        });
        Vue.set(this.asideName, 3, {
          name: this.$t("message.asName4"),
          value: 3
        });
        Vue.set(this.asideName, 4, {
          name: this.$t("message.asName5"),
          value: 4
        });
        Vue.set(this.staffName, 0, {
          name: this.$t("message.asName4_1"),
          value: 0
        });
        Vue.set(this.staffName, 1, {
          name: this.$t("message.asName4_2"),
          value: 1
        });
        Vue.set(this.staffName, 2, {
          name: this.$t("message.asName4_3"),
          value: 2
        });
        Vue.set(this.formName, 0, {
          name: this.$t("message.asName5_1"),
          value: 0
        });
      } else if (val === "en") {
        this.$i18n.locale = "en";
        Vue.set(this.asideName, 0, {
          name: this.$t("message.asName1"),
          value: 0
        });
        Vue.set(this.asideName, 1, {
          name: this.$t("message.asName2"),
          value: 1
        });
        Vue.set(this.asideName, 2, {
          name: this.$t("message.asName3"),
          value: 2
        });
        Vue.set(this.asideName, 3, {
          name: this.$t("message.asName4"),
          value: 3
        });
        Vue.set(this.asideName, 4, {
          name: this.$t("message.asName5"),
          value: 4
        });
        Vue.set(this.staffName, 0, {
          name: this.$t("message.asName4_1"),
          value: 0
        });
        Vue.set(this.staffName, 1, {
          name: this.$t("message.asName4_2"),
          value: 1
        });
        Vue.set(this.staffName, 2, {
          name: this.$t("message.asName4_3"),
          value: 2
        });
        Vue.set(this.formName, 0, {
          name: this.$t("message.asName5_1"),
          value: 0
        });
      } else if (val === "zh") {
        this.$i18n.locale = "zh";
        Vue.set(this.asideName, 0, {
          name: this.$t("message.asName1"),
          value: 0
        });
        Vue.set(this.asideName, 1, {
          name: this.$t("message.asName2"),
          value: 1
        });
        Vue.set(this.asideName, 2, {
          name: this.$t("message.asName3"),
          value: 2
        });
        Vue.set(this.asideName, 3, {
          name: this.$t("message.asName4"),
          value: 3
        });
        Vue.set(this.asideName, 4, {
          name: this.$t("message.asName5"),
          value: 4
        });
        Vue.set(this.staffName, 0, {
          name: this.$t("message.asName4_1"),
          value: 0
        });
        Vue.set(this.staffName, 1, {
          name: this.$t("message.asName4_2"),
          value: 1
        });
        Vue.set(this.staffName, 2, {
          name: this.$t("message.asName4_3"),
          value: 2
        });
        Vue.set(this.formName, 0, {
          name: this.$t("message.asName5_1"),
          value: 0
        });
      }
    }
  },
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
