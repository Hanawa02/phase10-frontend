<template>
  <div class="grid">
    <div>
      <button @click="goToNewGamePage()">
        <font-awesome-icon icon="user-secret" />
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
  data() {
    return {
      games: GamesService.getGames()
    };
  },
  methods: {
    updateGamesList() {
      this.games = GamesService.getGames();
    },
    goToNewGamePage() {
      router.push({
        name: "newGame"
      });
    }
  }
};
</script>
