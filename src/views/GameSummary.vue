<template>
  <div class="games">
    <div v-for="(user, index) in game.users" v-bind:key="user.id">
      <GameSummaryUser :user="user" :position="index" />
    </div>

    <div>
      Create new Game with same users?
      <div>
        <button @click="createNewGame()">
          Yes <font-awesome-icon icon="user-secret" />
        </button>
        <button @click="goToGameOverview()">
          No <font-awesome-icon icon="user-secret" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import GamesService from "@/services/GamesService.js";
import GameSummaryUser from "@/components/game/GameSummaryUser.vue";
import router from "@/router/index.js";

export default {
  name: "GamesSummary",
  components: {
    GameSummaryUser
  },
  data() {
    return {
      game: this.$route.params.game
    };
  },
  methods: {
    createNewGame() {
      GamesService.createNewGame(this.game);
      this.goToGameOverview();
    },
    goToGameOverview() {
      router.push({
        name: "games"
      });
    }
  }
};
</script>
