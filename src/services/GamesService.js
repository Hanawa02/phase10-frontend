import UsersService from "@/services/UsersService";

export default {
  cachedGameList: [],

  selectedGameData: {},

  setSelectedGame(gameId) {
    this.selectedGameData = this.getGame(gameId);
  },

  getSelectedGame() {
    return this.selectedGameData;
  },

  addGame(gameTitle, userIds) {
    let usersAdded = userIds.map(function(userId) {
      let uesrName = UsersService.getUserName(userId);

      return { id: userId, name: uesrName };
    });

    let game = {
      id: this.cachedGameList.length + 2,
      title: gameTitle,
      users: usersAdded
    };

    // * will push the created game returned by the server to the "cached" list
    this.cachedGameList.push(game);
  },

  deleteGame(gameId) {
    // * just call the delete from server and keep the removing from the "cached" list like it is

    let list = this.cachedGameList.filter(function(game) {
      return game.id != gameId;
    });
    console.log(list);

    this.cachedGameList = list;
  },

  getGames() {
    this.updateGamesListIfEmpty();

    this.sortGames();
    return this.cachedGameList;
  },

  getGame(id) {
    this.updateGamesListIfEmpty();

    return this.cachedGameList.find(function(game) {
      return game.id == id;
    });
  },

  updateGamesList() {
    // set the internal list to the content from server.

    this.cachedGameList.push({
      id: 1,
      title: "Family",
      users: [
        { id: 1, name: "Niklas", phase: 10, score: 28 },
        { id: 3, name: "Alina", phase: 2, score: 28 },
        { id: 4, name: "Birgit", phase: 2, score: 28 },
        { id: 5, name: "Ludger", phase: 2, score: 28 }
      ]
    });
    this.cachedGameList.push({
      id: 2,
      title: "Family + Laura",
      users: [
        { id: 1, name: "Niklas", phase: 7, score: 28 },
        { id: 2, name: "Laura", phase: 8, score: 28 },
        { id: 3, name: "Alina", phase: 10, score: 28 },
        { id: 4, name: "Birgit", phase: 9, score: 28 },
        { id: 5, name: "Ludger", phase: 8, score: 12 }
      ]
    });

    this.updateSelectedGameContent();
  },

  updateSelectedGameContent() {
    if (
      this.selectedGameData != null &&
      this.selectedGameData != undefined &&
      this.selectedGameData != {}
    ) {
      this.selectedGameData = this.getGame(this.selectedGameData.id);
    }
  },

  updateGamesListIfEmpty() {
    if (
      this.cachedGameList == undefined ||
      this.cachedGameList == null ||
      this.cachedGameList.length == 0
    )
      this.updateGamesList();
  },

  saveRound(game, winner, doubled) {
    console.log(game + winner + doubled);
    // should call the server to save name;
    this.updateGamesListIfEmpty();
  },

  gameFinished(game) {
    let finished = false;
    game.users.forEach(user => {
      if (user.phase == 10 && user.completedPhase) {
        finished = true;
        return;
      }
    });

    return finished;
  },

  sortGames() {
    this.cachedGameList.forEach(game => {
      game.users.sort((firstUser, secondUser) => {
        return this.sortCompareFunction(firstUser, secondUser);
      });
    });
  },

  sortCompareFunction(user, otherUser) {
    if (user.phase > otherUser.phase) {
      return -1;
    } else if (user.phase < otherUser.phase) {
      return +1;
    } else {
      return user.score - otherUser.score;
    }
  },

  createNewGame(game) {
    this.addGame(
      game.title,
      game.users.map(user => user.id)
    );
  }
};
