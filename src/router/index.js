import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";
import Index from "../views/index/index.vue";
import Home from "../views/home/index.vue";
import SginByQrcode from "../views/sign-by-qrcode/index.vue"
import User from "../views/user/index.vue";
import Login from "../views/login/index.vue";

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
      },
      {
        path: "/user",
        name: "User",
        component: User,
      },
    ],
  },
  {
    path: "/sign-by-qrcode",
    name: "SginByQrcode",
    component: SginByQrcode
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
]

const router = createRouter({
  history: createWebHashHistory("/attendance_student/"),
  routes,
});

export default router;