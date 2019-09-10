<template>
  <div class="register-background">
    <div class="register-content-box">
      <div class="register-content-title">
        <h3>欢迎来到晓晓后台管理系统</h3>
      </div>
      <div class="register-content-form">
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
          <el-form-item label="请输入密码" prop="password">
            <el-input
              v-model="form.password"
              style="width: 260px;"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item label="请输入手机号" prop="phone">
            <el-input
              v-model="form.phone"
              style="width: 260px;"
              type="phone"
            ></el-input>
          </el-form-item>
          <el-form-item label="请输邮箱" prop="email">
            <el-input
              v-model="form.email"
              style="width: 260px;"
              type="email"
            ></el-input>
          </el-form-item>
          <div class="register-code">
            <el-form-item label="请输入验证码" prop="code">
              <el-input
                v-model="form.code"
                style="width: 260px;"
                type="code"
              ></el-input>
            </el-form-item>
            <div @click="SendMsg" v-if="tabShow === true">
              <el-row>
                <el-button type="success">发送验证码</el-button>
              </el-row>
            </div>
            <div v-else-if="tabShow === false">
              <el-row>
                <el-button type="success">重新发送{{ times }}秒</el-button>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
      <div class="register-button-box">
        <el-row>
          <el-button type="primary" @click="login">立即登录</el-button>
        </el-row>
        <el-row>
          <el-button type="primary" @click="register">立即注册</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  components: {},
  props: {},
  data() {
    return {
      form: {
        username: "",
        password: "",
        phone: "",
        email: "",
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
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确的手机号码", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 6, max: 6, message: "请输入6位数的验证码", trigger: "blur" }
        ]
      },
      times: 60, //倒计时的时间
      tabShow: true //发送按钮的显示
    };
  },
  methods: {
    // 发送验证码
    SendMsg() {
      this.tabShow = false;
      let time = 60;
      let timer = setInterval(() => {
        time--;
        this.times = time;
        console.log(this.times);
        if (time === 0) {
          // 倒计时结束后，恢复初始状态
          clearInterval(timer);
          this.tabShow = true;
        }
      }, 1000);
      this.$axios
        .req("api/users/sendMsg", {
          phone: this.form.phone
        })
        .then(res => {
          if (res.code === 200) {
            this.$message({
              message: "发送成功",
              type: "success"
            });
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    // 登录
    login() {
      this.$router.push("/login");
    },
    // 注册
    register() {
      this.$axios
        .req("api/users/register", {
          username: this.form.username,
          password: this.form.password,
          phone: this.form.phone,
          email: this.form.email,
          sms: this.form.code
        })
        .then(res => {
          if (res.code === 200) {
            this.$message({
              message: "注册成功",
              type: "success"
            });
            this.$router.push("/login");
          } else if (res.code === 500) {
            this.$message({
              message: "用户已存在",
              type: "error"
            });
          }
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
/*注册背景*/
.register-background {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url("../../images/register.jpg");
  background-size: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
/*内容的标题*/
.register-content-title {
  width: 100%;
  text-align: center;
}
/*登录内容*/
.register-content-box {
  height: 480px;
  width: 560px;
  background-color: #fff;
}
/*输入框*/
.register-content-form {
  padding: 0 30px;
}
/*验证码输入框和发送按钮*/
.register-code {
  display: flex;
  justify-content: space-between;
}
/*按钮的div*/
.register-button-box {
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
}
</style>
