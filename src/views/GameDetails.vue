/* eslint-disable vue/no-side-effects-in-computed-properties */ /*
eslint-disable vue/no-side-effects-in-computed-properties */
<template>
  <div class="game-detail" v-if="game">
    <div class="title">{{ game.title }}</div>
    <div class="column-descriptin">
      <div class="phase">Current Phase</div>
      <div class="name">
        Player
        <div class="sort-icon" @click="changeSort()">
          <font-awesome-icon :icon="sorting ? 'trophy' : 'sort-alpha-down'" />
        </div>
      </div>
      <div class="status">Phase Status</div>
      <div class="winner-button">Finish Game</div>
    </div>
    <div class="users-container">
      <div
        v-for="userSnapshot in sortedUsersSnapshots"
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
      game: {},
      sorting: false,
      comparerFunction: undefined
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
    changeSort() {
      this.sorting = !this.sorting;

      if (this.sorting) {
        this.comparerFunction = GamesService.compareByName;
      } else {
        this.comparerFunction = GamesService.compareByPhase;
      }
      GamesService.setSelectedComparer(this.comparerFunction);
    },
    async getGameData() {
      let selectedGame = GamesService.selectedGameSnapshot;

      if (GamesService.selectedComparer === undefined) {
        GamesService.setSelectedComparer(GamesService.selectedComparer);
      }

      this.comparerFunction = GamesService.selectedComparer;

      this.sorting = this.comparerFunction === GamesService.compareByName;

      if (selectedGame.id === this.$route.params.id) {
        this.game = selectedGame;
      } else {
        await GamesService.setSelectedGame(this.$route.params.id);
        this.game = GamesService.selectedGameSnapshot;
      }

      if (this.game === undefined) {
        router.push({
          name: "games"
        });
      }
    }
  },
  computed: {
    sortedUsersSnapshots() {
      let result = this.game.userSnapshots;

      if (result === undefined) {
        return [];
      } else {
        result = result.sort(this.comparerFunction);
        console.log(this.comparerFunction["name"]);
        console.log(result[0].user.name);
        return result;
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

    .sort-icon {
      margin-left: 5px;
      background-color: $blue-medium-dark;
      border-radius: 50%;
      padding: 5px;
      width: 2rem;
      text-align: center;
      display: inline-block;
      cursor: pointer;

      &:hover {
        background-color: $blue-dark;
      }

      &:active {
        background-color: $blue-light-medium;
      }
    }
  }

  .title {
    @include title-style-with-font(10px, $blue-light-medium);
  }
}
</style>
