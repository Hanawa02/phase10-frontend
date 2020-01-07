<template>
  <div class="game-finish-round">
    <div class="title">Finish round</div>
    <div class="winner">
      <font-awesome-icon icon="trophy" />
      {{ winner.name }}
    </div>
    <div
      class="user-container"
      v-for="userSnapshot in game.userSnapshots"
      v-bind:key="userSnapshot.id"
    >
      <GameFinishRoundUser
        v-if="userSnapshot.user.id != winner.id"
        :userSnapshot="userSnapshot"
        @score-updated="toggleSaveButton()"
        @finish-game="saveRound()"
      />
    </div>
    <div class="doubled-button">
      <input type="checkbox" v-model="doubled" />
      <label @click="doubled = !doubled">Double Points</label>
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
      game: this.$route.params.gameSnapshot,
      doubled: false,
      disableSaveButton: true
    };
  },
  methods: {
    async saveRound() {
      let shouldShowSummary = GamesService.gameFinished(this.game);

      await GamesService.saveRound(this.game, this.winner, this.doubled);

      if (shouldShowSummary) {
        router.push({
          name: "gameSummary",
          params: {
            id: this.game.id
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

      for (let userSnapshot of this.game.userSnapshots) {
        if (
          userSnapshot.user.id != this.winner.id &&
          (userSnapshot.user.score == undefined ||
            userSnapshot.user.score == null ||
            userSnapshot.user.score == 0)
        ) {
          this.disableSaveButton = true;
          exit = true;
          return;
        }
      }

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
