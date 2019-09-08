import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store";
import "./mock";
import http from "./http";
import axios from "axios";
import moment from "dayjs";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VCharts from "v-charts";

Vue.use(VCharts);
Vue.use(ElementUI);
Vue.prototype.$axios = http;
Vue.prototype.$moment = moment;

Vue.config.productionTip = false;

// 处理响应超时时间
axios.defaults.timeout = 10000;

// 设置post请求的响应头
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";

// 设置请求拦截
// axios.interceptors.request.use( config => {
//   const token = localStorage.token;
//   token && (config.headers.Authorization = token);
//   return config
// }, error => {
//   return Promise.reject(error)
// })

// 设置响应拦截
axios.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error);
  }
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
