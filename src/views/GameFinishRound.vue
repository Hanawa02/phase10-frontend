<template>
  <div class="games">
    <div>
      <div>Winner</div>
      <div>{{ winner.name }}</div>
    </div>
    <div v-for="user in game.users" v-bind:key="user.id">
      <GameFinishRoundUser
        v-if="user.id != winner.id"
        :user="user"
        @points-updated="toggleSaveButton()"
      />
    </div>
    <div>
      <input type="checkbox" v-model="doubled" />
      <label>Double Points</label>
    </div>
    <div>
      <button @click="saveRound()" :disabled="disableSaveButton">
        <font-awesome-icon icon="user-secret" />
      </button>
    </div>
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
