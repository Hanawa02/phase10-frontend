import axios from "axios";

export default {
  baseUrl: "http://eckon.me:3000",

  cachedGameList: [],

  selectedGameSnapshot: {},

  async setSelectedGame(gameId) {
    this.selectedGameSnapshot = await this.getGameSnapshot(gameId);
  },

  getSelectedGame() {
    return this.selectedGameSnapshot;
  },

  async addGame(gameTitle, userIds) {
    let response = await axios.post(`${this.baseUrl}/games`, {
      title: gameTitle,
      userIds: userIds
    });
    this.cachedGameList.push(response.data);
  },

  async deleteGame(gameId) {
    await axios.delete(`${this.baseUrl}/games/${gameId}`);

    let list = this.cachedGameList.filter(function(game) {
      return game.id != gameId;
    });

    this.cachedGameList = list;
  },

  async getGames() {
    await this.updateGamesListIfEmpty();

    this.sortGames();

    return this.cachedGameList;
  },

  async getGameSnapshot(id) {
    if (id == undefined) {
      return null;
    }
    let response = await axios.get(`${this.baseUrl}/games/${id}/snapshot`);

    let gameSnapshot = response.data.game;
    gameSnapshot.userSnapshots = response.data.userSnapshots;

    gameSnapshot.userSnapshots.sort(this.sortCompareFunction);

    return gameSnapshot;
  },

  async updateGamesList() {
    let response = await axios.get(`${this.baseUrl}/games/running`);

    this.cachedGameList = response.data;
  },

  async updateSelectedGameContent() {
    if (
      this.selectedGameSnapshot != null &&
      this.selectedGameSnapshot != undefined &&
      this.selectedGameSnapshot != {}
    ) {
      this.selectedGameSnapshot = await this.getGameSnapshot(
        this.selectedGameSnapshot.id
      );
    }
  },

  async updateGamesListIfEmpty() {
    if (
      this.cachedGameList == undefined ||
      this.cachedGameList == null ||
      this.cachedGameList.length == 0
    )
      await this.updateGamesList();
  },

  async saveRound(game, winner, doubled) {
    let users = [];

    for (const element of game.userSnapshots) {
      let user = {
        id: element.user.id,
        points: element.user.score,
        completedPhase: element.completedPhase
      };

      users.push(user);
    }

    await axios.post(`${this.baseUrl}/rounds`, {
      gameId: game.id,
      winnerId: winner.id,
      doubled: doubled,
      users: users
    });

    await this.updateSelectedGameContent();
    await this.updateGamesList();
  },

  gameFinished(game) {
    for (const user of game.userSnapshots) {
      if (user.phase == 10 && user.completedPhase) {
        return true;
      }
    }

    return false;
  },

  sortGames() {
    for (let game of this.cachedGameList) {
      game.users.sort((firstUser, secondUser) => {
        return this.sortCompareFunction(firstUser, secondUser);
      });
    }
  },

  sortCompareFunction(user, otherUser) {
    if (user.phase > otherUser.phase) {
      return -1;
    } else if (user.phase < otherUser.phase) {
      return +1;
    } else {
      return user.points - otherUser.points;
    }
  },

  createNewGame(game) {
    this.addGame(
      game.title,
      game.userSnapshots.map(userSnapshot => userSnapshot.user.id)
    );
  }
};
