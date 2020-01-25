export interface IGameUserRoundInfo {
  phase: number;
  completedPhase: boolean;
  points: number;
}

export class GameUserRoundInfo {
  constructor(
    public phase: number = 1,
    public completedPhase: boolean = false,
    public points: number = 0
  ) {
    if (this.phase > 10) {
      this.phase = 10;
    }
  }
}

export function getNullGameUserRoundInfo() {
  return new GameUserRoundInfo();
}
