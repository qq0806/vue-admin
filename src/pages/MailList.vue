<template>
  <div class="mailList-box">
    <div class="mailList-content-box">
      <div class="mailListName-box">
        <el-tree
          :data="mailListDAta"
          :props="defaultProps"
          @node-click="handleNodeClick"
        ></el-tree>
      </div>
    </div>
  </div>
</template>

<script>
import mailListName from "../mock/mailList";
export default {
  name: "mailList",
  components: {},
  props: {},
  data() {
    return {
      mailListDAta: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    }
  },
  mounted() {
    this.mailListDAta = mailListName.data;
    console.log(this.mailListDAta);
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
/*背景*/
.mailList-box {
  /*height: 100vh;*/
  /*position: absolute;*/
  /*top: 0px;*/
  /*left: 0px;*/
  /*right: 0px;*/
  background-color: #f2f3f6;
}
.mailList-content-box {
 padding-top: 80px;
}
.mailListName-box {
  width: 200px;
}
</style>
