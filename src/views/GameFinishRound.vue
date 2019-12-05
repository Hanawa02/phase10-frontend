<template>
  <div class="game-finish-round">
    <div class="title">Finish round</div>
    <div class="winner">
      <font-awesome-icon icon="trophy" />
      {{ winner.name }}
    </div>
    <div class="user-container" v-for="user in game.users" v-bind:key="user.id">
      <GameFinishRoundUser
        v-if="user.id != winner.id"
        :user="user"
        @points-updated="toggleSaveButton()"
      />
    </div>
    <div class="doubled-button">
      <input type="checkbox" v-model="doubled" />
      <label>Double Points</label>
    </div>
    <button
      class="save-button"
      @click="saveRound()"
      :disabled="disableSaveButton"
    >
      <font-awesome-icon icon="save" />
    </button>
  </div>
</template>

<script>
// @ is an alias to /src
import GameFinishRoundUser from "@/components/game/GameFinishRoundUser.vue";
import GamesService from "@/services/GamesService.js";
import router from "@/router/index.js";

export default {
  name: "GameFinishRound",
  components: { GameFinishRoundUser },
  data() {
    return {
      winner: this.$route.params.winner,
      game: this.$route.params.game,
      doubled: false,
      disableSaveButton: true
    };
  },
  methods: {
    saveRound() {
      let shouldShowSummary = GamesService.gameFinished(this.game);

      GamesService.saveRound(this.game, this.winner, this.doubled);

      if (shouldShowSummary) {
        router.push({
          name: "gameSummary",
          params: {
            id: this.game.id,
            game: this.game
          }
        });
      } else {
        router.push({
          name: "gameDetails",
          params: {
            id: this.game.id
          }
        });
      }
    },
    toggleSaveButton() {
      let exit = false;

      this.game.users.forEach(user => {
        if (
          user.id != this.winner.id &&
          (user.points == undefined || user.points == null || user.points == 0)
        ) {
          this.disableSaveButton = true;
          exit = true;
          return;
        }
      });

      if (exit) return;

      this.disableSaveButton = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";

.game-finish-round {
  font-family: "Play";
  margin: 10px;

  .title {
    @include title-style-with-font(10px, $blue-light-medium);
  }

  .winner {
    color: $blue-dark;
    margin: 15px 5px;
  }

  .doubled-button {
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $blue-dark;
  }

  .save-button {
    @include save-button;
  }
}
</style>
