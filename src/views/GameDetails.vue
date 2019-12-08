<template>
  <div class="game-detail" v-if="game">
    <div class="title">{{ game.title }}</div>
    <div class="column-descriptin">
      <font-awesome-icon class="winner-button" icon="trophy" />
      <div class="name">Player</div>
      <div class="phase">Phase</div>
      <div class="points">Points</div>
    </div>
    <div class="users-container">
      <div
        v-for="userSnapshot in game.userSnapshots"
        v-bind:key="userSnapshot.id"
      >
        <GameUserDetails
          :userSnapshot="userSnapshot"
          @winner-selected="finishRound(userSnapshot)"
        />
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
    finishRound(userSnapshot) {
      router.push({
        name: "finishRound",
        params: {
          id: this.game.id,
          gameSnapshot: this.game,
          winner: userSnapshot.user
        }
      });
    },
    async getGameData() {
      let selectedGame = GamesService.selectedGameSnapshot;

      if (selectedGame.id === this.$route.params.id) {
        this.game = selectedGame;
      } else {
        this.game = await GamesService.getGameSnapshot(this.$route.params.id);
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
  margin: 10px 5px;

  .users-container {
    border: $border;
  }

  .column-descriptin {
    @include details;
    border: $border;
    font-weight: bold;
    background-color: $blue-medium;
    color: $white;
    padding: 5px 0px;
  }

  .title {
    @include title-style-with-font(10px, $blue-light-medium);
  }
}
</style>
