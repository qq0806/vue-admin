<template>
  <div id="header">
    <div class="header-box">
      <div class="header-title-name">晓晓后台管理系统</div>
      <div class="header-user-box">
        <el-dropdown placement="bottom">
          <img
            src="../../images/Typeface.png"
            alt=""
            class="header-Typeface-img"
          />
          <el-dropdown-menu slot="dropdown">
            <div v-for="(item, index) in TypefaceData" :key="index">
              <el-dropdown-item>{{ item.name }}</el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
        <img src="../../images/header.jpg" alt="" class="header-img" />
        <el-dropdown>
          <span class="el-dropdown-link">
            亲爱的:{{ user.username
            }}<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <div v-for="(item1, index1) in downData" :key="index1">
              <el-dropdown-item>{{ item1.name }}</el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  components: {},
  props: {},
  data() {
    return {
      user: "", //用户信息
      TypefaceData: [
        {
          name: "简体中文"
        },
        {
          name: "繁體中文"
        },
        {
          name: "English"
        }
      ],
      downData: [
        {
          name: "上传头像"
        },
        {
          name: "修改密码"
        },
        {
          name: "退出登录"
        }
      ]
    };
  },
  methods: {},
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
/*#header {*/
/*  height: 60px;*/
/*  width: 100%;*/
/*  position: fixed;*/
/*  top: 0px;*/
/*  background-color: #2e5e85;*/
/*  z-index: 1000;*/
/*}*/
/*头部*/
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
/*标题名*/
.header-title-name {
  color: skyblue;
}
/*头像*/
.header-img {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-left: 20px;
  margin-right: 10px;
}
/*字体图标*/
.header-Typeface-img {
  height: 30px;
  width: 30px;
}
/*用户信息的div*/
.header-user-box {
  display: flex;
  align-items: center;
  margin-right: 20px;
}
.el-dropdown-link {
  cursor: pointer;
  color: skyblue;
}
</style>
