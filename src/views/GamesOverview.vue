<template>
  <div class="games-overview">
    <div class="title">
      <h1 class="text">Games</h1>
      <button id="new-game-button" @click="goToNewGamePage()">
        <font-awesome-icon icon="plus-circle" />
      </button>
    </div>
    <div v-for="gameItem in games" :key="gameItem.id">
      <GameOverview
        :game="gameItem"
        @element-deleted="updateGamesList()"
      ></GameOverview>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import GamesService from "@/services/GamesService";
import GameOverview from "@/components/game/GameOverview.vue";
import router from "@/router/index.js";

export default {
  name: "GamesOverview",
  components: { GameOverview },
  async mounted() {
    this.games = await GamesService.getGames();
  },
  data() {
    return {
      games: []
    };
  },
  methods: {
    async updateGamesList() {
      this.games = await GamesService.getGames();
    },
    goToNewGamePage() {
      router.push({
        name: "newGame"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";

.games-overview {
  font-family: "Play";
  margin: 10px;

  .title {
    @include title-style(10px, $blue-medium-dark);

    .text {
      @include title-text-style;
    }
    #new-game-button {
      @include title-button-style(1.8rem);
    }
  }
}
</style>
