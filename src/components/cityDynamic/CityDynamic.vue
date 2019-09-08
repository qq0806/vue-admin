<template>
  <div class="cityDynamic-box">
    <div class="cityDynamic-city">
      <div class="cityDynamic-profit">利润(万)</div>
      <ve-wordcloud :data="chartData" :settings="chartSettings"></ve-wordcloud>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "cityDynamic",
  components: {},
  props: {},
  data() {
    this.chartSettings = {
      color: [],
      sizeMin: 12,
      sizeMax: 22
    };
    return {
      chartData: {
        columns: ["city", "num"],
        rows: []
      }
    };
  },
  methods: {},
  mounted() {
    //获取城市
    this.$axios
      .req("api/city")
      .then(res => {
        if (res) {
          this.chartData.rows = res.data;
          res.data.forEach(item => {
            this.chartSettings.color.push(item.color);
          });
        }
        // console.log(this.chartSettings.color);
        // console.log(this.chartData.rows);
      })
      .catch(e => {
        console.log(e);
      });
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.cityDynamic-box {
  width: 94%;
  padding-top: 200px;
  /*display: flex;*/
  /*justify-content: space-around;*/
}
.cityDynamic-profit {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  padding-left: 20px;
  border-bottom: #EDF0F6 solid 1px;
}
.cityDynamic-city {
  margin-left: 50px;
  height: 440px;
  width: 48%;
  background-color: white;
}
</style>
