<template>
  <div class="games-overview">
    <div class="title">
      <h1 class="text">Games</h1>
      <button id="new-game-button" @click="goToNewGamePage()">
        <font-awesome-icon icon="plus-circle" />
      </button>
    </div>
    <div v-for="game in games" :key="game.id" class="game">
      <div class="title">
        <h3 class="text" @click="selectGame()">{{ game.title }}</h3>
        <button id="delete-game-button" @click="deleteGame(game.id)">
          <font-awesome-icon icon="trash-alt" />
        </button>
      </div>
      <div class="user-container" @click="selectGame(game.id)">
        <div
          class="user"
          v-for="gameUser in game.users"
          v-bind:key="gameUser.user.id"
        >
          {{ gameUser.user.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IGame, nullGame } from "../../models/game";

@Component
export default class Games extends Vue {
  get games(): IGame[] {
    if (this.$store.state.games.includes(nullGame)) {
      this.$store.dispatch("updateGamesList");
    }
    return this.$store.state.games;
  }

  goToNewGamePage() {
    this.$router.push({
      name: "newGame"
    });
  }

  deleteGame(gameId: string) {
    this.$store.dispatch("deleteGame", gameId);
  }
  selectGame(gameId: string) {
    this.$store.commit("setSelectedGame", gameId);
    this.$router.push({
      name: "game",
      params: {
        id: gameId
      }
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/styles/colors.scss";
@import "@/styles/mixins.scss";

.games-overview {
  font-family: "Play";
  margin: 10px;
  overflow-wrap: break-word;

  .title {
    @include title-style(10px, $blue-medium-dark);

    .text {
      @include title-text-style;
    }
    #new-game-button {
      @include title-button-style(1.8rem);
    }
  }

  $border-radius: 12px;

  .game {
    border: 1px solid $blue-light-medium;
    border-radius: $border-radius;
    margin: 15px;

    .title {
      @include title-style(0px, $blue-light);
      @include subtitle-background;

      border-top-left-radius: $border-radius;
      border-top-right-radius: $border-radius;

      .text {
        @include title-text-style;
      }

      #delete-game-button {
        @include title-button-style(1.2rem);
        margin-right: 10px;
      }
    }
    .user-container {
      padding: 5px;

      .user {
        width: calc(50% - 5px);
        display: inline-block;
        padding: 1px;
      }
    }
  }
}
</style>
