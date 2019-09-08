<template>
  <div class="Retrieve-background">
    <div class="Retrieve-content-box">
      <div class="Retrieve-content-title">
        <h3>欢迎来到晓晓后台管理系统</h3>
      </div>
      <div class="Retrieve-content-form">
        <el-form
          :model="form"
          :rules="rules"
          ref="ruleForm"
          label-width="110px"
          class="demo-ruleForm"
          label-position="left"
        >
          <el-form-item label="请输入用户名" prop="username">
            <el-input v-model="form.username" style="width: 260px;"></el-input>
          </el-form-item>

          <el-form-item label="请输邮箱" prop="email">
            <el-input
              v-model="form.email"
              style="width: 260px;"
              type="email"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="Retrieve-button-box">
        <el-row>
          <el-button type="primary" @click="login">立即登录</el-button>
        </el-row>
        <el-row>
          <el-button type="primary" @click="Retrieve">找回密码</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Retrieve",
  components: {},
  props: {},
  data() {
    return {
      form: {
        username: "",
        email: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { max: 10, message: "用户名最多为10位", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    // 登录
    login() {
      this.$router.push("/login");
    },
    // 找回密码
    Retrieve() {
      this.$axios
        .req("api/users/findPwd", {
          username: this.form.username,
          email: this.form.email
        })
        .then(res => {
          if (res.code === 200) {
            this.$message({
              showClose: true,
              message: "邮件发送成功",
              type: "success"
            });
            this.$router.push("/login")
          } else if (res.code === 500) {
            this.$message({
              showClose: true,
              message: "用户不存在",
              type: "error"
            });
          }
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
/*找回密码背景*/
.Retrieve-background {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url("../../images/retrieve.jpg");
  background-size: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
/*内容的标题*/
.Retrieve-content-title {
  width: 100%;
  text-align: center;
}
/*找回密码的内容*/
.Retrieve-content-box {
  height: 260px;
  background-color: #fff;
}
/*输入框*/
.Retrieve-content-form {
  padding: 0 30px;
}
/*验证码输入框和发送按钮*/
.Retrieve-code {
  display: flex;
  justify-content: space-between;
}
/*按钮的div*/
.Retrieve-button-box {
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
}
</style>
