import Vue from "vue";
import { Game, nullGame } from "@/models/game";
import { User } from "@/models/user";
import { GameUser } from "@/models/game-user";
import { GameUserRoundInfo } from "@/models/game-user-round-info";

export abstract class BackendAPI {
  private static baseUrl: string = "http://eckon.me:3000";

  public static async addGame(
    gameTitle: string,
    userIds: string[]
  ): Promise<boolean> {
    await Vue.axios
      .post(`${this.baseUrl}/games`, {
        title: gameTitle,
        userIds: userIds
      })
      .catch((error: any) => {
        // console.log("An error ocurred in 'BackendAPI.addGame':");
        // console.log(error);

        //add error handling: modal to display errors
        return false;
      });
    return true;
  }

  public static async deleteGame(gameId: string): Promise<boolean> {
    await Vue.axios
      .delete(`${this.baseUrl}/games/${gameId}`)
      .catch((error: any) => {
        // console.log("An error ocurred in 'BackendAPI.deleteGame':");
        // console.log(error);

        //add error handling: modal to display errors
        return false;
      });
    return true;
  }

  public static async getGameInfo(gameId: string): Promise<Game> {
    let result = nullGame;
    if (gameId === undefined) {
      // console.log("An error ocurred in 'BackendAPI.getGameInfo':");
      // console.log("Game Id is undefined!");
      //add error handling: modal to display errors
    }

    await Vue.axios
      .get(`${this.baseUrl}/games/${gameId}/snapshot`)
      .then((response: any) => {
        result = new Game(
          response.data.game.id,
          response.data.game.title,
          response.data.userSnapshots.map((item: any) => {
            return new GameUser(
              new User(item.user.id, item.user.name),
              item.points,
              new GameUserRoundInfo(item.phase, false, 0)
            );
          })
        );
      });

    return result;
  }

  public static async getGameList(): Promise<Game[]> {
    let result: Game[] = [];
    await Vue.axios
      .get(`${this.baseUrl}/games/running`)
      .then((response: any) => {
        result = response.data.map((item: any) => {
          return new Game(
            item.id,
            item.title,
            item.users.map((user: User) => new GameUser(user))
          );
        });
      })
      .catch((error: any) => {
        // console.log("An error ocurred in 'BackendAPI.getGameList':");
        // console.log(error);
        //add error handling: modal to display errors
      });
    return result;
  }

  public static async saveRound(
    game: Game,
    winnerId: string,
    doubled: boolean
  ): Promise<Game> {
    await Vue.axios.post(`${this.baseUrl}/rounds`, {
      gameId: game.id,
      winnerId: winnerId,
      doubled: doubled,
      users: game.users.map((item: GameUser) => {
        return {
          id: item.user.id,
          points: item.roundInfo.points,
          completedPhase: item.roundInfo.completedPhase
        };
      })
    });

    return this.getGameInfo(game.id);
  }

  public static async addUser(userName: string): Promise<boolean> {
    await Vue.axios
      .post(`${this.baseUrl}/users`, {
        name: userName
      })
      .catch((error: any) => {
        // console.log("An error ocurred in 'BackendAPI.addUser':");
        // console.log(error);

        //add error handling: modal to display errors
        return false;
      });
    return true;
  }

  public static async deleteUser(userId: string): Promise<boolean> {
    await Vue.axios
      .delete(`${this.baseUrl}/users/${userId}`)
      .catch((error: any) => {
        // console.log("An error ocurred in 'BackendAPI.deleteUser':");
        // console.log(error);

        //add error handling: modal to display errors
        return false;
      });
    return true;
  }

  public static async getUsersList(): Promise<User[]> {
    let result: User[] = [];
    await Vue.axios
      .get(`${this.baseUrl}/users`)
      .then((response: any) => {
        result = response.data;
      })
      .catch((error: any) => {
        // console.log("An error ocurred in 'BackendAPI.getUsersList':");
        // console.log(error);
        //add error handling: modal to display errors
      });
    return result;
  }
}
