import Vue from "vue";
import Vuex, { Store } from "vuex";
import { IState } from "../models/state";
import { Game, nullGame, IGame } from "@/models/game";
import { User, nullUser } from "@/models/user";
import { GameUser, IGameUser } from "@/models/game-user";
import { GameUserComparingFunction } from "@/mixins/game-user-comparing-functions";
import { GameUserRoundInfo } from "@/models/game-user-round-info";
import { BackendAPI } from "@/apis/backend-api";
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    games: [nullGame],
    users: [nullUser],
    isLoading: false,
    selectedGame: nullGame,
    selectedGameRoundWinnerId: "",
    gameUserCompareFunction: GameUserComparingFunction.byPhase
  },
  mutations: {
    updateSelectedGame(state, game: Game) {
      state.selectedGame = game;
    },
    setgameUserCompareFunction(state, gameUserCompareFunction: any) {
      state.gameUserCompareFunction = gameUserCompareFunction;
    },
    togglePhaseCompleted(state, userId) {
      let user = state.selectedGame.users.find(
        gameUser => gameUser.user.id === userId
      );

      if (user) {
        user.roundInfo.completedPhase = !user.roundInfo.completedPhase;
      }
    },
    setSelectedGameRoundWinnerId(state, winnerUserId: string) {
      state.selectedGameRoundWinnerId = winnerUserId;
    },
    setGameList(state, games: Game[]) {
      state.games = games;
    },
    setUserList(state, users: User[]) {
      state.users = users;
    },
    updateSelectedGameUserRoundPoints(state, { userId, points }) {
      let user = state.selectedGame.users.find(
        gameUser => gameUser.user.id === userId
      );
      if (user) {
        user.roundInfo.points = points;
      }
    },
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    }
  },
  actions: {
    createGame({ commit }, { gameTitle, usersId }) {
      commit("startLoading");
      BackendAPI.addGame(gameTitle, usersId).then(() => {
        this.dispatch("updateGamesList");
      });
      commit("stopLoading");
    },
    deleteGame({ commit }, gameId) {
      commit("startLoading");
      BackendAPI.deleteGame(gameId).then(() => {
        this.dispatch("updateGamesList");
      });
      commit("stopLoading");
    },
    updateGamesList({ commit }) {
      commit("startLoading");
      BackendAPI.getGameList().then(gameList => {
        commit("setGameList", gameList);
      });
      commit("stopLoading");
    },
    createUser({ commit }, name: string) {
      commit("startLoading");
      BackendAPI.addUser(name).then(() => this.dispatch("updateUserList"));
      commit("stopLoading");
    },
    deleteUser({ commit }, id: string) {
      commit("startLoading");
      BackendAPI.deleteUser(id).then(() => this.dispatch("updateUserList"));
      commit("stopLoading");
    },
    updateUserList({ commit }) {
      commit("startLoading");
      BackendAPI.getUsersList().then(userList => {
        commit("setUserList", userList);
      });
      commit("stopLoading");
    },
    saveRound({ commit }, { doubledPoints, redirect }) {
      commit("startLoading");
      BackendAPI.saveRound(
        this.state.selectedGame,
        this.state.selectedGameRoundWinnerId,
        doubledPoints
      ).then(game => {
        if (game) {
          commit("updateSelectedGame", game);
          if (redirect) {
            router.push({
              name: "game",
              params: {
                id: game.id
              }
            });
          }
        }
      });
      commit("stopLoading");
    },
    setSelectedGame({ commit }, gameId: string) {
      commit("startLoading");
      BackendAPI.getGameInfo(gameId).then(game => {
        if (game) {
          commit("updateSelectedGame", game);
          router.push({
            name: "game",
            params: {
              id: gameId
            }
          });
        }
      });
      commit("stopLoading");
    }
  },
  modules: {},
  getters: {
    game: state => (gameId: string) => {
      return state.games.find(item => item.id === gameId);
    },
    selectedGameUpToDate: state => (gameId: string) => {
      return (
        state.selectedGame !== nullGame && state.selectedGame.id === gameId
      );
    },
    user: state => (userId: string) => {
      let user = state.users.find(user => user.id === userId);

      return user;
    },
    users: state => {
      return state.users;
    },
    isSelectedGameFinished: state => {
      for (const user of state.selectedGame.users) {
        if (user.roundInfo.phase == 10 && user.roundInfo.completedPhase) {
          return true;
        }
      }

      return false;
    },
    isLoading: state => {
      return state.isLoading;
    }
  }
});
