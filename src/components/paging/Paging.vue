<template>
  <div>
    <div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizesArr"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="arrData.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "Paging",
  components: {},
  props: {
    arrData: {
      type: Array
    },
    pageSizesArr: {
      type: Array
    },
    pageSize: {
      type: Number
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize1: 0
      // pageSizesArr: []
    };
  },
  methods: {
    // 选择每页多少条
    handleSizeChange(val) {
      this.pageSize1 = val;
      this.$emit("handleSizeChange", this.pageSize1);
    },
    // 选择多少页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.$emit("handleCurrentChange", this.currentPage);
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

<style scoped lang="scss"></style>
