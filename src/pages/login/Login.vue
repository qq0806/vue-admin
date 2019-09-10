<template>
  <div class="login-background">
    <div class="login-content-box">
      <div class="login-content-title">
        <h3>欢迎来到晓晓后台管理系统</h3>
      </div>
      <div class="login-content-form">
        <el-form
          :model="form"
          :rules="rules"
          ref="ruleForm"
          label-width="110px"
          class="demo-ruleForm"
          label-position="left"
        >
          <el-form-item label="请输入用户名" prop="username">
            <el-input v-model="form.username" style="width: 300px;"></el-input>
          </el-form-item>
          <div class="login-password">
            <el-form-item label="请输入密码" prop="password">
              <el-input
                v-model="form.password"
                style="width: 200px;"
                type="password"
              ></el-input>
            </el-form-item>
            <div @click="forget">
              <el-row>
                <el-button type="success">忘记密码</el-button>
              </el-row>
            </div>
          </div>
          <div class="login-code">
            <el-form-item label="请输入验证码" prop="code">
              <el-input
                v-model="form.code"
                style="width: 200px;"
                type="code"
              ></el-input>
            </el-form-item>
            <div
              v-html="VerificationCode"
              @click="RefreshCode"
              class="login-VerificationCode"
            ></div>
          </div>
        </el-form>
      </div>
      <div class="login-button-box">
        <el-row>
          <el-button type="primary" @click="loginClick">立即登录</el-button>
        </el-row>
        <el-row>
          <el-button type="primary" @click="registerClick">立即注册</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
  props: {},
  data() {
    return {
      VerificationCode: "",
      form: {
        username: "",
        password: "",
        code: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { max: 10, message: "用户名最多为10位", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码最少为6位", trigger: "blur" }
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 获取图形验证码
    getVerificationCode() {
      this.$axios
        .req("api/users/captcha")
        .then(res => {
          this.VerificationCode = res;
        })
        .catch(e => {
          console.log(e);
        });
    },
    // 刷新验证码
    RefreshCode() {
      this.getVerificationCode();
    },
    // 忘记密码
    forget() {
      this.$router.push("/retrieve");
      console.log(1234566554);
    },
    // 登录按钮
    loginClick() {
      this.$axios
        .req("api/users/login", {
          username: this.form.username,
          password: this.form.password,
          code: this.form.code
        })
        .then(res => {
          if (res.code === 200) {
            this.$message({
              message: "登录成功",
              type: "success"
            });
            localStorage.setItem("user", JSON.stringify(res.data));
            this.$router.push("/");
          } else if (res.code === 500) {
            this.$message({
              message: "用户不存在",
              type: "error"
            });
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    // 注册按钮
    registerClick() {
      this.$router.push("/register");
    }
  },
  mounted() {
    this.getVerificationCode(); //获取图形验证码
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
/*登录背景*/
.login-background {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url("../../images/login.jpeg");
  background-size: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
/*登录内容*/
.login-content-box {
  height: 340px;
  width: 560px;
  background-color: #fff;
}
/*内容的标题*/
.login-content-title {
  width: 100%;
  text-align: center;
}

/*输入框*/
.login-content-form {
  padding: 0 30px;
}
/*密码输入和忘记密码按钮*/
.login-password {
  display: flex;
  justify-content: space-between;
}
/*验证码输入框和图形验证码*/
.login-code {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/*图形验证码背景颜色*/
.login-VerificationCode {
  background-color: skyblue;
  margin-top: -20px;
}
/*按钮的div*/
.login-button-box {
  margin-top: 40px;
  display: flex;
  justify-content: space-evenly;
}
</style>
