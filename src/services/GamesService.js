import UsersService from "@/services/UsersService";

export default {
  GamesList: [
    {
      id: 1,
      title: "Family",
      players: [
        { id: 1, name: "Niklas" },
        { id: 3, name: "Alina" },
        { id: 4, name: "Birgit" },
        { id: 5, name: "Lüdger" }
      ]
    },
    {
      id: 2,
      title: "Family + Laura",
      players: [
        { id: 1, name: "Niklas" },
        { id: 2, name: "Laura" },
        { id: 3, name: "Alina" },
        { id: 4, name: "Birgit" },
        { id: 5, name: "Lüdger" }
      ]
    }
  ],

  addGame(gameTitle, playersIds) {
    let users = playersIds.map(function(playerId) {
      let playerName = UsersService.getUserName(playerId);

      return { id: playerId, name: playerName };
    });

    let game = {
      id: this.GamesList.length + 2,
      title: gameTitle,
      players: users
    };

    this.GamesList.push(game);
  },

  deleteGame(gameId) {
    let list = this.GamesList.filter(function(game) {
      return game.id != gameId;
    });
    console.log(list);

    this.GamesList = list;
  },

  getGames() {
    return this.GamesList;
  }
};
