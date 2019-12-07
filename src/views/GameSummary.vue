<template>
  <div class="games">
    <div class="title">Game Over</div>
    <div
      v-for="(userSnapshot, index) in game.userSnapshots"
      v-bind:key="userSnapshot.id"
    >
      <GameSummaryUser :userSnapshot="userSnapshot" :position="index + 1" />
    </div>

    <div class="next-action">
      Create new Game with same users?
      <div class="buttons">
        <button class="yes-button" @click="createNewGame()">
          Yes
        </button>
        <button class="no-button" @click="goToGameOverview()">
          No
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
  async mounted() {
    this.game = await GamesService.selectedGameSnapshot;
  },
  data() {
    return {
      game: {}
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

<style lang="scss" scoped>
@import "../scss/_variables.scss";
.games {
  font-family: "Play";

  .title {
    @include title-style-with-font(10px, $blue-light-medium);
  }

  .next-action {
    margin: 15px 5px;

    font-size: 1.1em;
  }

  .buttons {
    margin: 15px 5px;

    .yes-button,
    .no-button {
      @include standard-button;
    }
  }
}
</style>
