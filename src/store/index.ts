import Vue from "vue";
import Vuex from "vuex";
import { IState } from "../models/state";
import { Game, nullGame, IGame } from "@/models/game";
import { User } from "@/models/user";
import { GameUser, IGameUser } from "@/models/game-user";
import { GameUserComparingFunction } from "@/mixins/game-user-comparing-functions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    games: [
      new Game("1", "Game 1", [
        new GameUser(new User("1", "User 1")),
        new GameUser(new User("2", "User 2")),
        new GameUser(new User("3", "User 3")),
        new GameUser(new User("4", "User 4"))
      ]),
      new Game("2", "Game 2", [
        new GameUser(new User("1", "User 1")),
        new GameUser(new User("2", "User 2"))
      ]),
      new Game("3", "Game 3", [
        new GameUser(new User("1", "User 1")),
        new GameUser(new User("3", "User 3"))
      ]),
      new Game("4", "Game 4", [
        new GameUser(new User("2", "User 2")),
        new GameUser(new User("4", "User 4"))
      ])
    ],
    users: [
      new User("1", "User 1"),
      new User("2", "User 2"),
      new User("3", "User 3"),
      new User("4", "User 4")
    ],
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
      // call server
      let gameList = this.state.games;
      commit("setGameList", gameList);
    },
    createUser({ commit }, name: string) {
      // need to call server to add game
      console.log(name);

      this.dispatch("updateUserList");
    },
    deleteUser({ commit }, id: string) {
      // need to call server to add game
      console.log(id);

      this.dispatch("updateUserList");
    },
    updateUserList({ commit }) {
      // call server
      let userList = this.state.users;
      commit("setUserList", userList);
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
