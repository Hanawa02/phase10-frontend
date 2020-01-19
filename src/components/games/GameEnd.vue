<template>
  <div class="games">
    <div class="title">Game Over</div>
    <div v-for="gameUser in game.users" v-bind:key="gameUser.id">
      <div class="game-summary-user">
        <font-awesome-icon
          class="trophy"
          icon="trophy"
          :class="positionClass(game.getUserPosition(gameUser.user.id))"
        />
        <div class="name">{{ gameUser.user.name }}</div>
        <div class="phase">{{ gameUser.phase }}</div>
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

@Component
export default class GameEnd extends Vue {
  game: Game = nullGame;

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

    @include trophy-position;
  }
}
</style>
