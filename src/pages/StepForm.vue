<template>
  <div class="stepForm-box">
    <div class="stepForm-content-box">
      <div class="stepForm-title-box">
        <div class="stepForm-title-tips1">请填写您的转账信息</div>
        <div class="stepForm-title-tips2">
          请务必是您本人操作,确认转账金额及收款人信息
        </div>
      </div>
      <div class="stepForm-StepBar-box">
        <el-steps
          :active="active"
          finish-status="success"
          space="70%"
          status="success"
          align-center
          class="stepForm_tips_description"
        >
          <el-step title="" description="填写转账信息"></el-step>
          <el-step title="" description="确认转账信息"></el-step>
          <el-step title="" description="完成"></el-step>
        </el-steps>
        <div class="stepForm-StepBar" v-if="active === 0">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="付款账户" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="支付方式" prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择支付方式">
                <el-option label="支付宝" value="支付宝"></el-option>
                <el-option label="银行卡" value="银行卡"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="收款账户" prop="receivables">
              <el-input v-model="ruleForm.receivables"></el-input>
            </el-form-item>
            <el-form-item label="收款人姓名" prop="receivablesName">
              <el-input v-model="ruleForm.receivablesName"></el-input>
            </el-form-item>
            <el-form-item label="收款金额" prop="money">
              <div class="money-img-box">
                <el-input v-model="ruleForm.money"></el-input>
                <img src="../images/money.png" alt="" class="money-img" />
              </div>
            </el-form-item>
          </el-form>
          <el-button
            type="primary"
            style="margin-top: 12px;"
            @click="next(ruleForm)"
            >下一步</el-button
          >
        </div>
        <div class="stepForm-StepBar" v-else-if="active === 1">
          <div class="stepForm-tips-box" v-if="tipsShow === true">
            <i class="el-icon-warning" style="margin-left: 10px"></i>
            <span class="stepForm-tips-span"
              >确认转账后，资金将直接打入对方账户，无法退回</span
            >
            <i
              class="el-icon-close"
              style="margin-left: 260px"
              @click="cancel"
            ></i>
          </div>
          <div class="stepForm-StepBar-name">
            付款账户：{{ userTransfer.name }}
          </div>
          <div class="stepForm-StepBar-name">
            收款账户：{{ userTransfer.receivables }}
          </div>
          <div class="stepForm-StepBar-name">
            收款人姓名：{{ userTransfer.receivablesName }}
          </div>
          <div class="stepForm-StepBar-name">
            付款金额：{{ userTransfer.money }}元
          </div>
          <div class="stepForm-password-box">
            <el-form
              ref="ruleForm1"
              :model="ruleForm1"
              :rules="rules1"
              label-width="80px"
            >
              <el-form-item
                label="支付密码"
                prop="password"
                style="width: 300px"
              >
                <el-input
                  v-model="ruleForm1.password"
                  type="password"
                ></el-input>
              </el-form-item>
              <div>
                <el-button
                  type="primary"
                  style="margin-top: 12px;"
                  @click="submitButton(ruleForm1)"
                  >提交</el-button
                >
                <el-button style="margin-top: 12px;" @click="goReturn"
                  >上一步</el-button
                >
              </div>
            </el-form>
          </div>
        </div>
        <div class="stepForm-StepBar-end" v-else-if="active === 2">
          <div class="stepForm-StepBar-end1">
            <div class="stepForm-StepBar-end-img">
              <div class="end-img-background">
                <i
                  class="el-icon-check"
                  style="color:white;font-size: 40px;margin-top: 10px"
                ></i>
              </div>
            </div>
            <div>操作成功</div>
            <div class="Estimate-box">预计两小时到账</div>
          </div>
          <div>
            <div class="stepForm-StepBar-name">
              付款账户：{{ userTransfer.name }}
            </div>
            <div class="stepForm-StepBar-name">
              收款账户：{{ userTransfer.receivables }}
            </div>
            <div class="stepForm-StepBar-name">
              收款人姓名：{{ userTransfer.receivablesName }}
            </div>
            <div class="stepForm-StepBar-name">
              收款金额：{{ userTransfer.money }}元
            </div>
          </div>
          <div class="stepForm-StepBar-end-button">
            <el-button type="primary" style="margin-top: 12px;" @click="ReTurn"
              >再转一笔</el-button
            >
            <el-button style="margin-top: 12px;" @click="seeBill"
              >查看账单</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "stepForm",
  components: {},
  props: {},
  data() {
    return {
      active: 0,
      tipsShow: true,
      ruleForm: {
        name: "",
        region: "",
        receivables: "",
        receivablesName: "",
        money: ""
      },
      rules: {
        name: [{ required: true, message: "请输入付款账户", trigger: "blur" }],
        region: [
          { required: true, message: "请选择支付方式", trigger: "change" }
        ],
        receivables: [
          { required: true, message: "请输入收款账户", trigger: "blur" }
        ],
        receivablesName: [
          { required: true, message: "请输入收款人姓名", trigger: "blur" }
        ],
        money: [{ required: true, message: "请输入金额", trigger: "blur" }]
      },
      userTransfer: {},
      ruleForm1: {
        password: ""
      },
      rules1: {
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    next(ruleForm) {
      if (
        ruleForm.name === "" ||
        ruleForm.region === "" ||
        ruleForm.receivables === "" ||
        ruleForm.receivablesName === "" ||
        ruleForm.money === ""
      ) {
        this.$message({
          message: "请按要求填写",
          type: "warning"
        });
      } else {
        // if (this.active++ > 2) this.active = 0;
        this.active = 1;
        this.userTransfer = ruleForm;
      }
    },
    // 提交
    submitButton(ruleForm1) {
      if (ruleForm1.password === "") {
        this.$message({
          message: "请输入密码",
          type: "warning"
        });
      } else {
        this.ruleForm1 = { password: "" };
        this.active = 2;
      }
    },
    // 上一步
    goReturn() {
      this.active = 0;
    },
    // 取消提示
    cancel() {
      this.tipsShow = false;
    },
    // 再转一笔
    ReTurn() {
      this.active = 0;
      this.ruleForm = {
        name: "",
        region: "",
        receivables: "",
        receivablesName: "",
        money: ""
      };
    },
    // 查看账单
    seeBill() {
      const { href } = this.$router.resolve({
        path: "/printing",
        query: {
          name1: this.ruleForm.name,
          receivables1: this.ruleForm.receivables,
          receivablesName1: this.ruleForm.receivablesName,
          money1: this.ruleForm.money
        }
      });
      window.open(href, "_blank");
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
/*背景*/
.stepForm-box {
  height: 100%;
  padding-top: 80px;
  background-color: #f2f3f6;
}
/*内容*/
.stepForm-content-box {
  margin-left: 50px;
}
/*头部标题*/
.stepForm-title-box {
  width: 98%;
  height: 60px;
  background-color: white;
  display: flex;
  flex-direction: column; //决定主轴的方向（即项目的排列方向）垂直向下、起点在上
  justify-content: center;
}
/*标题提示*/
.stepForm-title-tips1 {
  margin-left: 20px;
}
/*标题提示*/
.stepForm-title-tips2 {
  margin-left: 20px;
  color: gray;
  font-size: 12px;
}
.stepForm-StepBar-box {
  width: 98%;
  margin-top: 20px;
  background-color: white;
  padding: 20px 0px;
}
/*步骤*/
.stepForm-StepBar {
  width: 50%;
  margin: 30px auto;
}
/*提示*/
.stepForm-tips-box {
  width: 100%;
  height: 30px;
  line-height: 30px;
  background-color: #eaf7ff;
}
.stepForm-tips-span {
  margin-left: 10px;
  font-size: 14px;
}

.stepForm-StepBar-name {
  margin-top: 10px;
}
/*密码框*/
.stepForm-password-box {
  border-top: gray solid 1px;
  margin-top: 20px;
  padding-top: 20px;
}
/*结束步骤*/
.stepForm-StepBar-end {
  width: 40%;
  background-color: white;
  margin: 30px auto;
}
.money-img-box {
  position: relative;
}
.money-img {
  height: 20px;
  width: 20px;
  position: absolute;
  left: 0px;
  top: 50%;
  /*margin-top: -10px;*/
  /*transform: translate(-50%, -50%);*/
  transform: translateY(-10px);
}

.stepForm-StepBar-end1 {
  width: 40%;
  margin: auto;
  text-align: center;
}

.stepForm-StepBar-end-img {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
/*结束图片背景*/
.end-img-background {
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background-color: #50c324;
}
/*预计提示*/
.Estimate-box {
  font-size: 12px;
  color: gray;
  margin-top: 5px;
  padding-bottom: 10px;
}
/*转账完成提示框*/
.stepForm-StepBar-end-button {
  width: 50%;
  margin: auto;
  text-align: center;
}
</style>
