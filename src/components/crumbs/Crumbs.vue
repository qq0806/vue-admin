<template>
  <div class="Crumbs-box">
    <i
      class="el-icon-s-fold"
      style="color: white;background-color: gray;margin-right: 5px"
      v-if="isCollapse === false"
      @click="leftClick"
    ></i>
    <i
      class="el-icon-s-unfold"
      style="color: white;background-color: gray;margin-right: 5px"
      v-else-if="isCollapse === true"
      @click="rightClick"
    ></i>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        :to="routePath"
        v-if="this.routeName !== '首页' && this.routeName !== ''"
        >{{ routeName }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "Crumbs",
  components: {},
  props: {},
  data() {
    return {
      routeName: "",
      routePath: ""
    };
  },
  methods: {
    leftClick() {
      this.$store.state.isCollapse1 = true;
    },
    rightClick() {
      this.$store.state.isCollapse1 = false;
    }
  },
  mounted() {},
  created() {},
  filters: {},
  computed: {
    isCollapse() {
      return this.$store.state.isCollapse1;
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        // if (this.routeName === "首页" && this.routePath === "/") {
        //   this.routeName = "";
        //   this.routePath = "";
        // } else {
        //   this.routeName = val.matched[0].meta.title;
        //   this.routePath = val.matched[1].path;
        // }
        this.routeName = val.matched[0].meta.title;
        this.routePath = val.matched[1].path;
        console.log(this.routeName);
        console.log(this.routePath);
        console.log(val);
      },
      // 深度观察监听
      deep: true
    }
  },
  directives: {}
};
</script>

<style scoped lang="scss">
.Crumbs-box {
  display: flex;
  align-items: center;
}
</style>
