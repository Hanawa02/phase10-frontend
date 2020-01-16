<template
  ><div class="game-detail" v-if="game">
    <div class="title">{{ game.title }}</div>
    <div class="column-descriptin">
      <div class="phase">Current Phase</div>
      <div class="name">
        Player
        <div class="sort-icon" @click="changeSort()">
          <font-awesome-icon :icon="sorting ? 'trophy' : 'sort-alpha-down'" />
        </div>
      </div>
      <div class="status">Phase Status</div>
      <div class="winner-button">Finish Game</div>
    </div>
    <div class="users-container">
      <div
        v-for="gameUser in sortedGameUsers"
        v-bind:key="gameUser.user.id"
        class="game-user-detail"
      >
        <div class="phase" @click="toggleCompletedPhase(gameUser.user.id)">
          {{ gameUser.roundInfo.phase }}
        </div>
        <div class="name" @click="toggleCompletedPhase(gameUser.user.id)">
          {{ gameUser.user.name }}
          <font-awesome-icon
            class="trophy"
            icon="trophy"
            :class="positionClass(game.getUserPosition(gameUser.user.id))"
          />
        </div>
        <div class="status">
          <button
            :class="
              gameUser.roundInfo.completedPhase
                ? 'phase-completed'
                : 'phase-not-completed'
            "
            @click="toggleCompletedPhase(gameUser.user.id)"
          >
            {{ gameUser.user.phaseCompleted ? "completed" : "not completed" }}
          </button>
        </div>
        <div class="winner-button">
          <button class="finish-button" @click="finishRound(gameUser.user.id)">
            Finish Game
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IGame, nullGame } from "../../models/game";
import { IGameUser } from "../../models/game-user";
import { GameUserComparingFunction } from "../../mixins/game-user-comparing-functions";

@Component
export default class Game extends Vue {
  game: IGame = nullGame;
  compareFunction: any = this.$store.state.gameUserCompareFunction;
  sorting: boolean = false;

  mounted() {
    let gameId = this.$route.params.id;

    if (!this.$store.getters.selectedGameUpToDate(gameId)) {
      this.$store.commit("setSelectedGame", gameId);
    }

    this.game = this.$store.state.selectedGame;

    if (!this.game || this.game === nullGame) {
      this.$router.push({
        name: "games"
      });
    }

    this.sorting = this.compareFunction === GameUserComparingFunction.byName;
  }

  get sortedGameUsers(): IGameUser[] {
    return this.game.users.slice().sort(this.compareFunction);
  }
  positionClass(userPosition: number) {
    let classAtr: string = "";

    switch (userPosition) {
      case 1:
        classAtr = "first";
        break;
      case 2:
        classAtr = "second";
        break;
      case 3:
        classAtr = "third";
        break;
      default:
        classAtr = "no-position";
    }

    return classAtr;
  }
  toggleCompletedPhase(userId: string) {
    this.$store.commit("togglePhaseCompleted", userId);
  }

  finishRound(winnerUserId: string) {
    this.$store.commit("setSelectedGameRoundWinnerId", winnerUserId);

    this.$router.push({
      name: "gameRound",
      params: {
        id: this.game.id
      }
    });
  }

  changeSort() {
    this.sorting = !this.sorting;

    if (this.sorting) {
      this.$store.commit(
        "setgameUserCompareFunction",
        GameUserComparingFunction.byName
      );
    } else {
      this.$store.commit(
        "setgameUserCompareFunction",
        GameUserComparingFunction.byPhase
      );
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/styles/colors.scss";
@import "@/styles/mixins.scss";

$border: 1px solid $blue-light-medium;
$font-size-standard: 1em;
.game-detail {
  font-family: "Play";
  margin: 10px 5px;

  .users-container {
    border: $border;
    .phase {
      font-weight: bold;
      font-size: 1.1em;
    }
    .game-user-detail {
      @include details;

      font-size: 1em;
      border: 1px solid $blue-light;
      .winner-button {
        & :active {
          color: $blue-light;
        }
      }

      .name {
        font-weight: bold;
        font-size: 1.1em;
        @include trophy-position;
      }
    }

    .phase-completed {
      $dark-color: #004400;
      $light-color: #bbf8bb;

      outline: none;
      width: 95%;
      font-size: $font-size-standard;
      margin: 0;
      background-color: $light-color;
      color: $dark-color;
      font-weight: bold;
      border-radius: 8px;
      border: 0px solid $dark-color;
      box-shadow: 1px 1px 1px $dark-color;
    }

    .phase-not-completed {
      $dark-color: #b20000;
      $light-color: #ffcccc;

      outline: none;
      width: 95%;
      font-size: $font-size-standard;
      margin: 0;
      background-color: $light-color;
      color: $dark-color;
      font-weight: bold;
      border-radius: 8px;
      border: 0px solid $dark-color;
      box-shadow: 1px 1px 1px $dark-color;
    }

    .finish-button {
      width: 80%;

      outline: none;
      width: 90%;
      font-size: 1em;
      margin: 0;
      background-color: $blue-light;
      color: $blue-dark;
      font-weight: bold;
      border-radius: 8px;
      border: 0px solid $blue-dark;
      box-shadow: 1px 1px 1px $blue-dark;
    }
  }

  .column-descriptin {
    @include details;
    border: $border;
    font-weight: bold;
    background-color: $blue-medium;
    color: $white;
    padding: 5px 0px;

    .sort-icon {
      margin-left: 5px;
      background-color: $blue-medium-dark;
      border-radius: 50%;
      padding: 5px;
      width: 2em;
      text-align: center;
      display: inline-block;
      cursor: pointer;

      &:hover {
        background-color: $blue-dark;
      }

      &:active {
        background-color: $blue-light-medium;
      }
    }
  }

  .title {
    @include title-style-with-font(10px, $blue-light-medium);
  }
}
</style>
