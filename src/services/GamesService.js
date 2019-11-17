import UsersService from "@/services/UsersService";

export default {
  cachedGameList: [
    {
      id: 1,
      title: "Family",
      players: [
        { id: 1, name: "Niklas", phase: 2, score: 28 },
        { id: 3, name: "Alina", phase: 2, score: 28 },
        { id: 4, name: "Birgit", phase: 2, score: 28 },
        { id: 5, name: "Lüdger", phase: 2, score: 28 }
      ]
    },
    {
      id: 2,
      title: "Family + Laura",
      players: [
        { id: 1, name: "Niklas", phase: 2, score: 28 },
        { id: 2, name: "Laura", phase: 2, score: 28 },
        { id: 3, name: "Alina", phase: 2, score: 28 },
        { id: 4, name: "Birgit", phase: 2, score: 28 },
        { id: 5, name: "Lüdger", phase: 2, score: 28 }
      ]
    }
  ],

  selectedGameData: {},

  setSelectedGame(gameId) {
    this.selectedGameData = this.getGame(gameId);
  },

  getSelectedGame() {
    return this.selectedGameData;
  },

  addGame(gameTitle, playersIds) {
    let users = playersIds.map(function(playerId) {
      let playerName = UsersService.getUserName(playerId);

      return { id: playerId, name: playerName };
    });

    let game = {
      id: this.cachedGameList.length + 2,
      title: gameTitle,
      players: users
    };

    this.cachedGameList.push(game);
  },

  deleteGame(gameId) {
    let list = this.cachedGameList.filter(function(game) {
      return game.id != gameId;
    });
    console.log(list);

    this.cachedGameList = list;
  },

  getGames() {
    // add logic here to only get data from server if the cached game list is empty
    return this.cachedGameList;
  },

  getGame(id) {
    return this.cachedGameList.find(function(game) {
      return game.id == id;
    });
  }
};
