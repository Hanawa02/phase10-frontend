import Vue from "vue";
import VueRouter from "vue-router";
import Games from "../components/games/Games.vue";
import Store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/games"
  },
  {
    path: "/games",
    name: "games",
    component: Games
  },
  {
    path: "/games/new",
    name: "newGame",
    component: () => import("../components/games/GameNew.vue")
  },
  {
    path: "/games/:id",
    name: "game",
    component: () => import("../components/games/Game.vue")
  },
  {
    path: "/games/:id/round/",
    name: "gameRound",
    component: () => import("../components/games/GameRound.vue")
  },
  {
    path: "/games/:id/end",
    name: "gameEnd",
    component: () => import("../components/games/GameEnd.vue")
  },
  {
    path: "/users",
    name: "users",
    component: () => import("../components/users/Users.vue")
  },
  {
    // will match everything
    path: "*",
    name: "Page Not Found",
    component: () => import("../views/PageNotFound.vue")
  }
  // ,{
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  Store.commit("startLoading");
  next();
});

router.afterEach((to, from) => {
  Store.commit("stopLoading");
});
export default router;
