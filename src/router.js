import Vue from "vue";
import Router from "vue-router";
import User from "./Views/User";
import Chart from "./Views/Chart";
import Home from "./Views/Home";
import Logs from "./Views/Logs";
import Scheduler from "./Views/Scheduler";

const routes = [
    { path: "/", component: Home, name: "home" },
    { path: "/user", component: User, name: "user" },
    { path: "/chart", component: Chart, name: "chart" },
    { path: "/logkeeping", component: Logs, name: "logkeeping" },
    { path: "/scheduler", component: Scheduler, name: "scheduler" },
]

Vue.use(Router)
export const router = new Router({
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      }
      if (to.hash) {
        return { selector: to.hash };
      }
      return {x: 0, y: 0};
    }
  });