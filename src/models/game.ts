import { IGameUser } from "./game-user";
import { GameUserComparingFunction } from "@/mixins/game-user-comparing-functions";

export interface IGame {
  id: string;
  title: string;
  users: IGameUser[];
  getUserPosition(userId: string): number;
}

export class Game implements IGame {
  constructor(
    public id: string,
    public title: string,
    public users: IGameUser[]
  ) {}

  getUserPosition(userId: string): number {
    const sortedUserArray = this.users
      .slice()
      .sort(GameUserComparingFunction.byPhase);
    return (
      sortedUserArray.findIndex(gameUser => gameUser.user.id === userId) + 1
    );
  }
}

export const nullGame: IGame = new Game("", "", []);
