<template>
  <div>
    <router-view
      v-if="$route.path === '/login' || $route.path === '/register'"
    ></router-view>
    <el-container v-else>
      <el-header style="padding: 0">
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside :width="widthShow">
          <Aside></Aside>
        </el-aside>
        <el-main class="crumbs-box">
          <Crumbs class="crumbs-box1"></Crumbs>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "../../components/header/Header";
import Aside from "../../components/aside/Aside";
import Crumbs from "../../components/crumbs/Crumbs";
export default {
  name: "Content",
  components: {
    Header,
    Aside,
    Crumbs
  },
  props: {},
  data() {
    return {
      widthShow: ""
    };
  },
  methods: {},
  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style lang="scss">
* {
  padding: 0px;
  margin: 0px;
}
@import "../../style/common";
.el-main {
  padding: 0px;
}
.crumbs-box {
  position: relative;
}
//定位面包屑
.crumbs-box1 {
  position: absolute;
  left: 25px;
  top: 35px;
  z-index: 1000;
}
</style>
