<template>
  <div class="games">
    <div>{{ game.title }}</div>
    <div v-for="player in game.players" v-bind:key="player.id">
      <GameUserDetails
        :user="player"
        @winner-selected="finishRound(player.id)"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import GamesService from "@/services/GamesService.js";
import GameUserDetails from "@/components/game/GameUserDetails.vue";
import router from "@/router/index.js";

export default {
  name: "GameDetails",
  components: { GameUserDetails },
  data() {
    return {
      game: this.getGameData()
    };
  },
  methods: {
    finishRound(userId) {
      router.push({
        name: "finishRound",
        params: {
          id: this.game.id,
          gameTitle: this.game.title,
          usersPhaseStatus: []
        }
      });
    },
    getGameData() {
      let selectedGame = GamesService.getSelectedGame();

      if (selectedGame.id == this.$route.params.id) {
        this.game = selectedGame;
      } else {
        this.game = GamesService.getGame(this.$route.params.id);
      }
    }
  }
};
</script>
