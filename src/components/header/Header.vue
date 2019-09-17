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
        <el-dropdown @command="handCommand2">
          <span class="el-dropdown-link">
            亲爱的:{{ user.username
            }}<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <div v-for="(item1, index1) in downData" :key="index1">
              <div v-if="index1 === 0">
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="onSuccess"
                  :before-upload="beforeUpload"
                >
                  <el-dropdown-item>{{ item1.name }}</el-dropdown-item>
                </el-upload>
              </div>
              <div v-else-if="index1 > 0">
                <el-dropdown-item :command="index1">{{
                  item1.name
                }}</el-dropdown-item>
              </div>
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
  methods: {
    handCommand2(command) {
      if (command === 1) {
        console.log(command);
      } else if (command === 2) {
        this.$axios
          .req("api/users/logout")
          .then(res => {
            if (res.code === 200) {
              localStorage.removeItem("user");
              this.$message({
                message: "退出登录",
                type: "success"
              });
              this.$router.push("/login");
            }
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    onSuccess(file) {
      console.log(file);
    },
    beforeUpload() {}
  },
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
