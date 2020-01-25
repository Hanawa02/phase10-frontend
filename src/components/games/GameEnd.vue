<template>
  <div class="games">
    <div class="title">Game Over</div>
    <div v-for="gameUser in sortedGameUsers" v-bind:key="gameUser.id">
      <div class="game-summary-user">
        <font-awesome-icon
          class="trophy"
          icon="trophy"
          :class="positionClass(game.getUserPosition(gameUser.user.id))"
        />
        <div class="name">{{ gameUser.user.name }}</div>
        <div class="phase">{{ gameUser.roundInfo.phase }}</div>
        <div class="points">{{ gameUser.points }}</div>
      </div>
    </div>

    <div class="next-action">
      Create new Game with same users?
      <div class="buttons">
        <button class="yes-button" @click="createNewGame()">
          Yes
        </button>
        <button class="no-button" @click="goToGame()">
          No
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Game, nullGame } from "../../models/game";
import { ClassFunctions } from "../../mixins/get-class-function";
import { GameUserComparingFunction } from "../../mixins/game-user-comparing-functions";

@Component
export default class GameEnd extends Vue {
  game: Game = nullGame;

  mounted() {
    let gameId = this.$route.params.id;

    if (
      !this.$store.getters.selectedGameUpToDate(gameId) ||
      this.$store.state.selectedGameRoundWinnerId === ""
    ) {
      this.$router.push({
        name: "game",
        params: {
          id: gameId
        }
      });
    }

    this.game = this.$store.state.selectedGame;
  }

  createNewGame() {
    let usersId = this.game.users.map(gameUser => gameUser.user.id);

    this.$store.dispatch("createGame", { gameTitle: this.game.title, usersId });
    this.goToGame();
  }

  goToGame() {
    this.$router.push({
      name: "games"
    });
  }

  positionClass(userId: string) {
    let userPosition = this.game.getUserPosition(userId);
    return ClassFunctions.getPositionClass(userPosition);
  }

  get sortedGameUsers() {
    return this.game.users.slice().sort(GameUserComparingFunction.byPhase);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/styles/colors.scss";
@import "@/styles/mixins.scss";
.games {
  font-family: "Play";
  overflow-wrap: break-word;

  .title {
    @include title-style-with-font(10px, $blue-light-medium);
  }

  .next-action {
    margin: 15px 5px;

    font-size: 1.1rem;
  }

  .buttons {
    margin: 15px 5px;

    .yes-button,
    .no-button {
      @include standard-button;
    }
  }

  .game-summary-user {
    @include details;

    border: 1px solid $blue-light;
    justify-content: center;

    width: 80%;
    margin: 0 auto;

    .trophy {
      width: 20%;
    }
    .name {
      width: calc(60% - 5px);
    }
    .phase {
      width: 10%;
    }
    .points {
      width: 10%;
    }
    @include trophy-position;
  }
}
</style>
