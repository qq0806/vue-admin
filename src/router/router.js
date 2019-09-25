import Vue from "vue";
import Router from "vue-router";
import Content from "../pages/content/Content";
import Home from "../pages/Home.vue";

Vue.use(Router);

const router = new Router({
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
    },
    {
      path: "/category",
      name: "category",
      component: Content,
      children: [
        {
          path: "personnel",
          component: () => import("../pages/Personnel.vue")
        }
      ],
      meta: {
        title: "人员信息"
      }
    },
    {
      path: "/category",
      name: "category",
      component: Content,
      children: [
        {
          path: "pay",
          component: () => import("../pages/Pay.vue")
        }
      ],
      meta: {
        title: "薪酬管理"
      }
    },
    {
      path: "/category",
      name: "category",
      component: Content,
      children: [
        {
          path: "stepForm",
          component: () => import("../pages/StepForm.vue")
        }
      ],
      meta: {
        title: "分布表单"
      }
    },
    {
      path: "/printing",
      name: "printing",
      component: () => import("../pages/Printing.vue"),
      meta: {
        title: "打印"
      }
    }
  ]
});
router.beforeEach((to, from, next) => {
  let user = localStorage.getItem("user");
  if (user) {
    next();
  } else if (
    to.path === "/login" ||
    to.path === "/register" ||
    to.path === "/retrieve"
  ) {
    next();
  } else {
    next("/login");
  }
  if (to.matched[0].meta.title) {
    document.title = to.matched[0].meta.title;
  }
});
export default router;
