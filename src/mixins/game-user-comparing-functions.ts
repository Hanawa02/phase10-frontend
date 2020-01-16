import { IGameUser } from "@/models/game-user";

function compareByPhase(user: IGameUser, otherUser: IGameUser) {
  if (user.roundInfo.phase > otherUser.roundInfo.phase) {
    return -1;
  } else if (user.roundInfo.phase < otherUser.roundInfo.phase) {
    return +1;
  } else {
    return user.points - otherUser.points;
  }
}

function compareByName(user: IGameUser, otherUser: IGameUser) {
  if ("" + user.user.name < "" + otherUser.user.name) {
    return -1;
  }
  if ("" + user.user.name > "" + otherUser.user.name) {
    return +1;
  }

  return 0;
}

export const GameUserComparingFunction = {
  byPhase: compareByPhase,
  byName: compareByName
};
