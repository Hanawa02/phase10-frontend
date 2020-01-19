import Vue from "vue";
import Vuex, { Store } from "vuex";
import { IState } from "../models/state";
import { Game, nullGame, IGame } from "@/models/game";
import { User, nullUser } from "@/models/user";
import { GameUser, IGameUser } from "@/models/game-user";
import { GameUserComparingFunction } from "@/mixins/game-user-comparing-functions";
import { GameUserRoundInfo } from "@/models/game-user-round-info";
import { BackendAPI } from "@/apis/backend-api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    games: [
      nullGame
      // new Game("1", "Game 1", [
      //   new GameUser(new User("1", "User B"), 28, new GameUserRoundInfo(10)),
      //   new GameUser(new User("2", "User A"), 12),
      //   new GameUser(new User("3", "User F"), 2),
      //   new GameUser(new User("4", "User G"), 8)
      // ]),
      // new Game("2", "Game 2", [
      //   new GameUser(new User("1", "User B")),
      //   new GameUser(new User("2", "User A"))
      // ]),
      // new Game("3", "Game 3", [
      //   new GameUser(new User("1", "User B")),
      //   new GameUser(new User("3", "User F"))
      // ]),
      // new Game("4", "Game 4", [
      //   new GameUser(new User("2", "User A")),
      //   new GameUser(new User("4", "User C"))
      // ])
    ],
    users: [nullUser],
    isLoading: false,
    selectedGame: nullGame,
    selectedGameRoundWinnerId: "",
    gameUserCompareFunction: GameUserComparingFunction.byPhase
  },
  mutations: {
    setSelectedGame(state, gameId: string) {
      let game = state.games.find(item => item.id === gameId);

      if (game) {
        state.selectedGame = game;
      }
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
    }
  },
  actions: {
    createGame({ commit }, { gameTitle, usersId }) {
      // need to call server to add game
      console.log(gameTitle);
      console.log(usersId);

      this.dispatch("updateGamesList");
    },
    deleteGame({ commit }, gameId) {
      // need to call server to add game
      console.log(gameId);

      this.dispatch("updateGamesList");
    },
    updateGamesList({ commit }) {
      BackendAPI.getGameList().then(gameList => {
        commit("setGameList", gameList);
      });
    },
    createUser({ commit }, name: string) {
      BackendAPI.addUser(name).then(() => this.dispatch("updateUserList"));
    },
    deleteUser({ commit }, id: string) {
      BackendAPI.deleteUser(id).then(() => this.dispatch("updateUserList"));
    },
    updateUserList({ commit }) {
      BackendAPI.getUsersList().then(userList => {
        commit("setUserList", userList);
      });
    },
    saveRound({ commit }, doubledPoints: boolean) {
      // call server
      console.log(doubledPoints);
      console.log(this.state.selectedGame);
      this.dispatch("updateGamesList");
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
    isSelectedGameFinished: state => {
      for (const user of state.selectedGame.users) {
        if (user.roundInfo.phase == 10 && user.roundInfo.completedPhase) {
          return true;
        }
      }

      return false;
    }
  }
});
