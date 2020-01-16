import { IGame } from "./game";
import { IUser } from "./user";

export interface IState {
  games: IGame[];
  users: IUser[];
  selectedGame: IGame;
  isLoading: boolean;
  gameUserCompareFunction: any;
}
