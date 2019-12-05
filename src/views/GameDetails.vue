<template>
  <div class="game-detail" v-if="game">
    <div class="title">{{ game.title }}</div>
    <div class="column-descriptin">
      <div class="name">Player</div>
      <div class="phase">Phase</div>
      <div class="score">Score</div>
      <div class="phase-completed">
        <font-awesome-icon icon="check-circle" />
      </div>
      <font-awesome-icon class="winner-button" icon="trophy" />
    </div>
    <div class="users-container">
      <div v-for="user in game.users" v-bind:key="user.id">
        <GameUserDetails :user="user" @winner-selected="finishRound(user)" />
      </div>
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

<style lang="scss" scoped>
@import "../scss/_variables.scss";
$border: 1px solid $blue-light-medium;

.game-detail {
  font-family: "Play";
  margin: 10px;

  .users-container {
    border: $border;
  }

  .column-descriptin {
    @include details;
    border: $border;
    font-weight: bold;
    background-color: $blue-light;
    padding: 5px 0px;
  }

  .title {
    @include title-style-with-font(10px, $blue-light-medium);
  }
}
</style>
