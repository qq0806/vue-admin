<template>
  <div id="header">
    <div class="header-box">
      <div class="header-title-name">{{ titleName[0].name }}</div>
      <div class="header-user-box">
        <el-dropdown placement="bottom" @command="handCommand">
          <div class="header-Typeface-box">
            <img
              src="../../images/Typeface.png"
              alt=""
              class="header-Typeface-img"
            />
            <el-dropdown-menu slot="dropdown">
              <div v-for="(item, index) in TypefaceData" :key="index">
                <el-dropdown-item :command="index">{{
                  item.name
                }}</el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </div>
        </el-dropdown>
        <img
          src="../../images/header.jpg"
          alt=""
          class="header-img"
          v-if="imageUrl === null"
        />
        <img :src="imageUrl" alt="" class="header-img" v-else />
        <el-dropdown @command="handCommand2">
          <span class="el-dropdown-link">
            {{ dearName[0].name }}:{{ user.username || user.login
            }}<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <div v-for="(item1, index1) in downData" :key="index1">
              <div v-if="index1 === 0">
                <el-upload
                  class="upload-demo"
                  action="api/upload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  list-type="picture"
                >
                  <el-dropdown-item>{{ item1.name }}</el-dropdown-item>
                </el-upload>
              </div>
              <div v-if="index1 > 0">
                <el-dropdown-item :command="index1">{{
                  item1.name
                }}</el-dropdown-item>
              </div>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="dialogFormVisible" width="30%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="请输入原密码" prop="password">
          <el-input v-model="ruleForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="请输入新密码" prop="newPas1">
          <el-input v-model="ruleForm.newPas1" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="newPas2">
          <el-input v-model="ruleForm.newPas2" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="Determine(ruleForm)"
            >确认修改</el-button
          >
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "Header",
  components: {},
  props: {},
  data() {
    return {
      user: "", //用户信息
      userId: "", //用户id
      imageUrl: "", //用户头像
      titleName: [{ name: this.$t("message.headLeft"), value: 0 }],
      dearName: [{ name: this.$t("message.hello"), value: 0 }],
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
      ],
      dialogFormVisible: false,
      formLabelWidth: "120px",
      ruleForm: {
        password: "",
        newPas1: "",
        newPas2: ""
      },
      rules: {
        password: [
          { required: true, message: "请输入原密码", trigger: "blur" }
        ],
        newPas1: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 6, message: "密码最少为6位", trigger: "blur" }
        ],
        newPas2: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 6, message: "密码最少为6位", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 语言切换下拉框`
    handCommand(command) {
      if (command === 0) {
        this.$i18n.locale = "zh";
        Vue.set(this.titleName, 0, {
          name: this.$t("message.headLeft"),
          value: 0
        });
        Vue.set(this.dearName, 0, { name: this.$t("message.hello"), value: 0 });
      } else if (command === 1) {
        this.$i18n.locale = "tcc";
        Vue.set(this.titleName, 0, {
          name: this.$t("message.headLeft"),
          value: 0
        });
        Vue.set(this.dearName, 0, { name: this.$t("message.hello"), value: 0 });
      } else if (command === 2) {
        this.$i18n.locale = "en";
        Vue.set(this.titleName, 0, {
          name: this.$t("message.headLeft"),
          value: 0
        });
        Vue.set(this.dearName, 0, { name: this.$t("message.hello"), value: 0 });
      }
    },
    //下拉框的点击事件
    handCommand2(command) {
      if (command === 1) {
        this.dialogFormVisible = true;
      } else if (command === 2) {
        this.$axios
          .req("api/users/logout")
          .then(res => {
            if (res.code === 200) {
              localStorage.removeItem("user");
              localStorage.removeItem("indexNum");
              localStorage.removeItem("routeNames");
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
    //上传头像
    handleAvatarSuccess(res, file) {
      this.userId = this.user._id;
      let UrlObj = file.response.url;
      this.$axios
        .req("api/updateImg", {
          id: this.userId,
          imgUrl: UrlObj
        })
        .then(res => {
          if (res.code === 200) {
            this.imageUrl = UrlObj;
            this.$message.success("修改头像成功");
          } else if (res.code === 500) {
            this.$message({
              message: "修改头像成功",
              type: "error"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
      // console.log(res);
      // console.log(file);
      // console.log(file.response.url);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 修改密码
    Determine(ruleForm) {
      if (
        ruleForm.password === "" ||
        ruleForm.newPas1 === "" ||
        ruleForm.newPas2 === ""
      ) {
        this.$message({
          showClose: true,
          message: "请按需求输入",
          type: "error"
        });
      } else if (ruleForm.newPas1 !== ruleForm.newPas2) {
        this.$message({
          showClose: true,
          message: "输入的新密码不一致",
          type: "warning"
        });
      } else if (this.user.password === ruleForm.newPas1) {
        this.$message({
          showClose: true,
          message: "新密码不能与原密码相同",
          type: "error"
        });
      } else {
        this.$axios
          .req("api/users/updatePwd", {
            username: this.user.username,
            password: ruleForm.password,
            id: this.user._id,
            newPwd: ruleForm.newPas1
          })
          .then(res => {
            if (res.code === 200) {
              this.user.password = ruleForm.newPas1;
              localStorage.setItem("user", JSON.stringify(this.user));
              this.ruleForm = {
                password: "",
                newPwd1: "",
                newPwd2: ""
              };
              this.dialogFormVisible = false;
              this.$message({
                showClose: true,
                message: "修改成功",
                type: "success"
              });
            } else if (res.code === 500) {
              this.$message({
                showClose: true,
                message: "原密码不正确,请重新输入",
                type: "error"
              });
            }
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.user.avatar_url) {
      this.imageUrl = this.user.avatar_url;
    } else {
      this.imageUrl = this.user.imageUrl;
    }
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
#header {
  height: 60px;
  width: 100%;
  line-height: 60px;
}
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
.header-Typeface-box {
  display: flex;
  align-items: center;
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
