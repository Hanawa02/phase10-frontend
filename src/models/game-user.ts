import {
  IGameUserRoundInfo,
  getNullGameUserRoundInfo
} from "./game-user-round-info";
import { IUser } from "./user";

export interface IGameUser {
  user: IUser;
  points: number;
  roundInfo: IGameUserRoundInfo;
}

export class GameUser implements IGameUser {
  constructor(
    public readonly user: IUser,
    public points: number = 0,
    public roundInfo: IGameUserRoundInfo = getNullGameUserRoundInfo()
  ) {}
}
