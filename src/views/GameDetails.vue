<template>
  <div class="games" v-if="game">
    <div>{{ game.title }}</div>
    <div v-for="user in game.users" v-bind:key="user.id">
      <GameUserDetails :user="user" @winner-selected="finishRound(user)" />
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
      game: {}
    };
  },
  created() {
    this.getGameData();
  },
  methods: {
    finishRound(user) {
      console.log(user);
      router.push({
        name: "finishRound",
        params: {
          id: this.game.id,
          game: this.game,
          winner: user
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

      if (this.game == undefined) {
        router.push({
          name: "games"
        });
      }
    }
  }
};
</script>
