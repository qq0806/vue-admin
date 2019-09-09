<template>
  <div class="network-box">
    <div class="network-title">
      网站问卷调查
    </div>
    <div class="title-loop-box">
      <div v-for="(item, index) in titleName" :key="index">
        <div>{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Network",
  components: {},
  props: {},
  data() {
    return {
      websiteData: [],
      titleName: [
        {
          name: "问卷名称"
        },
        {
          name: "问卷描述"
        },
        {
          name: "创建时间"
        },
        {
          name: "截止时间"
        },
        {
          name: "问卷主题"
        },
        {
          name: "网站名称"
        },
        {
          name: "操作"
        }
      ]
    };
  },
  methods: {
    //获取问卷调查数据
    getWebsiteData() {
      this.$axios
        .req("api/website")
        .then(res => {
          this.websiteData = res.data;
          console.log(this.websiteData);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.getWebsiteData(); //获取问卷调查数据
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.network-box {
  width: 94%;
  margin-left: 50px;
  padding-top: 30px;
}
/*标题名*/
.network-title {
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
  background-color: white;
  border-bottom: #edf0f6 solid 1px;
}
.title-loop-box {
  padding-top: 40px;
  display: flex;
  justify-content: space-evenly;
  background-color: white;
}
</style>
