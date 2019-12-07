import Vue from "vue";
import VueRouter from "vue-router";
import GamesOverview from "../views/GamesOverview.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "games",
    component: GamesOverview
  },
  {
    path: "/games/new",
    name: "newGame",
    component: () => import("../views/GamesCreate.vue")
  },
  {
    path: "/games/:id",
    name: "gameDetails",
    component: () => import("../views/GameDetails.vue")
  },
  {
    path: "/games/:id/finishRound/",
    name: "finishRound",
    component: () => import("../views/GameFinishRound.vue")
  },
  {
    path: "/games/:id/summary",
    name: "gameSummary",
    component: () => import("../views/GameSummary.vue")
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("../views/Users.vue")
  },
  {
    // will match everything
    path: "*",
    name: "Page Not Found",
    component: () => import("../views/NotFound.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
