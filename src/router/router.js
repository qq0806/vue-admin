import Vue from "vue";
import Router from "vue-router";
import Content from "../pages/content/Content";
import Home from "../pages/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("../pages/login/Login.vue"),
      meta: {
        title: "登录"
      }
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../pages/register/Register.vue"),
      meta: {
        title: "注册"
      }
    },
    {
      path: "/retrieve",
      name: "retrieve",
      component: () => import("../pages/retrieve/Retrieve.vue"),
      meta: {
        title: "找回密码"
      }
    },
    {
      path: "/",
      name: "home",
      component: Content,
      children: [
        {
          path: "",
          component: Home
        }
      ],
      meta: {
        title: "首页"
      }
    },
    {
      path: "/schedule",
      name: "schedule",
      component: Content,
      children: [
        {
          path: "",
          component: () => import("../pages/Schedule.vue")
        }
      ],
      meta: {
        title: "日程管理"
      }
    },
    {
      path: "/mailList",
      name: "mailList",
      component: Content,
      children: [
        {
          path: "",
          component: () => import("../pages/MailList.vue")
        }
      ],
      meta: {
        title: "通讯录"
      }
    },
    {
      path: "/category",
      name: "category",
      component: Content,
      children: [
        {
          path: "offer",
          component: () => import("../pages/Offer.vue")
        }
      ],
      meta: {
        title: "offer管理"
      }
    }
  ]
});
