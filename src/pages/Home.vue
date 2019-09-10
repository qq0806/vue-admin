<template>
  <div class="home">
    <div class="home-revenue-box">
      <div
        v-for="(item, index) in titleData"
        :key="item.id"
        class="home-loop-box1"
      >
        <hr class="home-hr" v-if="borderShow === index" :style="item.color" />
        <div class="home-loop-box" @click="borderClick(item, index)">
          <div>
            <div class="home-title-name">{{ item.name }}(元)</div>
            <div class="home-title-num">
              ￥
              <countTo
                :startVal="item.startVal"
                :endVal="item.price"
                :duration="3000"
              ></countTo>
            </div>
          </div>
          <div class="home-circular" v-if="item.isShow">
            <circle-progress
              v-if="item.isShow"
              key="animation-model1"
              :id="123456"
              :isAnimation="true"
              :isRound="true"
              :width="width"
              :radius="radius"
              :progress="item.value"
              :barColor="item.barColor"
              :duration="duration"
              :delay="delay"
              :timeFunction="timeFunction"
              :backgroundColor="backgroundColor"
            >
            </circle-progress>
            <div class="home-Completion">
              <div>{{ item.value }}%</div>
              <div>完成率</div>
            </div>
          </div>
          <circle-progress
            v-show="item.isShow === false"
            key="animation-Model2"
            :id="654321"
            :isAnimation="true"
            :isRound="true"
            :width="width"
            :radius="radius"
            :progress="progress"
            :barColor="backgroundColor"
            :duration="duration"
            :delay="delay"
            :timeFunction="timeFunction"
            :backgroundColor="backgroundColor"
          >
          </circle-progress>
          <div v-if="index < 2">|</div>
        </div>
      </div>
    </div>
    <CityDynamic></CityDynamic>
    <Network></Network>
  </div>
</template>

<script>
import countTo from "vue-count-to";
import CircleProgress from "../components/circleChart/Circle-progress";
import CityDynamic from "../components/cityDynamic/CityDynamic";
import Network from "../components/network/Network";
export default {
  name: "home",
  components: {
    countTo, //计数器
    CircleProgress, //圆形进度条
    CityDynamic, //词云图、个人动态
    Network //问卷调查
  },
  props: {},
  data() {
    return {
      titleData: [
        {
          name: "本月营收",
          startVal: 0,
          price: 0,
          value: 0,
          color: "background-color: #5fb0fe;",
          barColor: "#5fb0fe",
          isShow: true
        },
        {
          name: "待回款",
          startVal: 0,
          price: 0,
          value: 0,
          color: "background-color: #80e425;",
          barColor: "#80e425",
          isShow: false
        },
        {
          name: "客单价/合同",
          startVal: 0,
          price: 0,
          value: 0,
          color: "background-color: #f3af5a;",
          barColor: "#f3af5a",
          isShow: false
        }
      ],
      listNum: [], //利润数组
      listPercentage: [], //百分比数组
      // startVal: 0, //计数器开始时间
      // endVal: 8086, //计数器结束时间
      borderShow: 0, //hr标签的显示和隐藏
      isDurationModel: true, // 是否打开持续缓动模式
      width: 70,
      radius: 8,
      progress: 60,
      duration: 1000,
      delay: 20,
      backgroundColor: "#DFE5E9",
      timeFunction: "cubic-bezier(0.99, 0.01, 0.22, 0.94)",
      intervalTimer: null, // 持续模式，循环计时器
      currentTime: 0, // 当前时间
      durationTime: 60, // 持续模式总时长
      dialogVisible: false
    };
  },
  methods: {
    borderClick(item, index) {
      this.borderShow = index;
      item.startVal = item.startVal + 1;
      item.isShow = true;
      this.titleData.forEach(item => {
        item.isShow = false;
        item.startVal = item.price;
      });
      this.$nextTick(() => {
        this.titleData[index].isShow = true;
        this.titleData[index].startVal = 1;
      });
    }
  },
  mounted() {
    // 获取利润
    this.$axios
      .req("api/profit")
      .then(res => {
        // res.data.forEach(i => {
        //   this.listNum.push(i.num);
        //   this.listPercentage.push(i.percentage);
        // });
        // this.titleData.forEach((item, index) => {
        //   this.$set(item, "num", this.listNum[index]);
        //   this.$set(item, "percentage", this.listPercentage[index]);
        // });
        //用$set添加的属性，不能传值到子组件
        res.data.map((item, index) => {
          this.titleData[index].price = item.price;
          this.titleData[index].value = item.value;
        });
        this.titleData.map(item => {
          item.isShow = false;
          item.startVal = item.price;
        });
        this.$nextTick(() => {
          this.titleData[0].isShow = true;
          this.titleData[0].startVal = 1;
        });
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
<style>
.home {
  height: 100%;
  background-color: #f2f3f6;
  position: relative;
}
/*利润的最大div*/
.home-revenue-box {
  width: 94%;
  height: 100px;
  background-color: white;
  margin-left: 50px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  top: 80px;
}
/*标题的名字*/
.home-title-name {
  color: #e6d9d0;
  margin-bottom: 10px;
}
/*金额*/
.home-title-num {
  margin-top: 10px;
}
/*循环的div*/
.home-loop-box1 {
  width: 100%;
  position: relative;
}
/*循环内容的div*/
.home-loop-box {
  height: 100px;
  padding-left: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
/*home的水平线*/
.home-hr {
  position: absolute;
  top: -8px;
  height: 6px;
  width: 100%;
  border: 0px;
}
/*完成率的父组件*/
.home-circular {
  display: flex;
  position: relative;
}
/*完成率的div*/
.home-Completion {
  text-align: center;
  font-size: 12px;
  position: absolute;
  left: 17px;
  bottom: 26px;
}
</style>
