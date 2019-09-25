<template>
  <div class="app">
    <section ref="print">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>账单详情</span>
        </div>
        <div>
          <div class="printing-content-box">付款账户：{{ name1 }}</div>
          <div class="printing-content-box">收款账户：{{ receivables1 }}</div>
          <div class="printing-content-box">收款人：{{ receivablesName1 }}</div>
          <div class="printing-content-box">收款金额：{{ money1 }}</div>
        </div>
        <div class="no-print printing-button-box">
          <el-button type="primary" @click="printingReturn"
            >返回表单页</el-button
          >
          <el-button type="success" @click="printBills">打印</el-button>
        </div>
      </el-card>
    </section>
  </div>
</template>

<script>
export default {
  name: "Printing",
  components: {},
  props: {},
  data() {
    return {
      name1: "",
      receivables1: "",
      receivablesName1: "",
      money1: ""
    };
  },
  methods: {
    printingReturn() {
      this.$router.push("/category/stepForm");
    },
    printBills() {
      this.$print(this.$refs.print);
    }
  },
  mounted() {
    this.name1 = this.$route.query.name1;
    this.receivables1 = this.$route.query.receivables1;
    this.receivablesName1 = this.$route.query.receivablesName1;
    this.money1 = this.$route.query.money1;
    // console.log(this.$route.query);
    // console.log(this.name1);
    // console.log(this.receivables1);
    // console.log(this.receivablesName1);
    // console.log(this.money1);
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 360px;
  margin-left: 50%;
  transform: translateX(-180px);
}
.app {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0;
  right: 0px;
  background-color: #f2f3f6;
  padding-top: 200px;
}
.printing-content-box {
  margin-top: 10px;
}
.printing-button-box {
  margin-top: 20px;
  text-align: center;
}
</style>
