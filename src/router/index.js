import Vue from "vue";
import Router from "vue-router";
import paths from "./paths";
import store from "@/store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

Vue.use(Router);
const router = new Router({
  base: "/",
  mode: "hash",
  linkActiveClass: "active",
  routes: paths
});
// router gards
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (store.getters.isAuthenticated) {
    next();
  } else {
    if (to.name === "Login") {
      next();
    } else {
      next("/");
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
