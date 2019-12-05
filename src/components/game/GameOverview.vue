<template>
  <div class="game">
    <div class="title">
      <h3 class="text" @click="selectGame()">{{ game.title }}</h3>
      <button id="delete-game-button" @click="deleteGame()">
        <font-awesome-icon icon="trash-alt" />
      </button>
    </div>
    <div class="user-container" @click="selectGame()">
      <div class="user" v-for="user in game.users" v-bind:key="user.id">
        {{ user.name }}
      </div>
    </div>
  </div>
</template>

<script>
import GamesService from "@/services/GamesService.js";
import router from "@/router/index.js";

export default {
  name: "GameOverview",
  props: {
    game: Object
  },
  methods: {
    deleteGame() {
      GamesService.deleteGame(this.game.id);
      this.$emit("element-deleted");
    },
    selectGame() {
      GamesService.setSelectedGame(this.game.id);
      router.push({
        name: "gameDetails",
        params: {
          id: this.game.id
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/_variables.scss";
$border-radius: 12px;

.game {
  border: 1px solid $blue-light-medium;
  border-radius: $border-radius;
  margin: 5px;

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
</style>
