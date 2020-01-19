<template>
  <div class="game-finish-round">
    <div class="title">Finish round</div>
    <div class="winner">
      <font-awesome-icon icon="trophy" />
      {{ winner.name }}
    </div>
    <div
      class="user-container"
      v-for="gameUser in game.users"
      v-bind:key="gameUser.user.id"
    >
      <div class="game-finish-round-user" v-if="gameUser.user.id != winner.id">
        <div class="name">{{ gameUser.user.name }}</div>
        <input
          class="points"
          type="number"
          :min="0"
          :max="999"
          :ref="inputPrefix + gameUser.user.id"
          @input="emitPointsUpdated(gameUser.user.id)"
          @focus="$event.target.select()"
          @keypress.enter="saveRound()"
        />
      </div>
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

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { User, nullUser } from "../../models/user";
import { Game, nullGame } from "../../models/game";

@Component
export default class GameRound extends Vue {
  winner: User = nullUser;
  game: Game = nullGame;
  inputPrefix: string = "points-input-";
  doubled: boolean = false;
  disableSaveButton: boolean = true;

  mounted() {
    let gameId = this.$route.params.id;

    if (
      !this.$store.getters.selectedGameUpToDate(gameId) ||
      this.$store.state.selectedGameRoundWinnerId === ""
    ) {
      this.$router.push({
        name: "game",
        params: {
          id: gameId
        }
      });
    }

    this.winner = this.$store.getters.user(
      this.$store.state.selectedGameRoundWinnerId
    );

    this.game = this.$store.state.selectedGame;
  }

  saveRound() {
    let shouldShowSummary = this.$store.getters.isSelectedGameFinished;

    this.$store.dispatch("saveRound", this.doubled);

    if (shouldShowSummary) {
      this.$router.push({
        name: "gameEnd",
        params: {
          id: this.game.id
        }
      });
    } else {
      this.$router.push({
        name: "game",
        params: {
          id: this.game.id
        }
      });
    }
  }

  toggleSaveButton() {
    let exit = false;

    for (let gameUser of this.game.users) {
      if (
        gameUser.user.id !== this.winner.id &&
        (gameUser.roundInfo.points === undefined ||
          gameUser.roundInfo.points === null ||
          gameUser.roundInfo.points === 0)
      ) {
        this.disableSaveButton = true;
        exit = true;
        return;
      }
    }

    if (exit) return;

    this.disableSaveButton = false;
  }

  emitPointsUpdated(userId: string) {
    let inputElement: any = this.$refs[this.inputPrefix + userId];

    this.$store.commit("updateSelectedGameUserRoundPoints", {
      userId,
      points: +inputElement[0].value
    });
    this.toggleSaveButton();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/styles/colors.scss";
@import "@/styles/mixins.scss";

.game-finish-round {
  font-family: "Play";
  margin: 10px;
  overflow-wrap: break-word;

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

  .game-finish-round-user {
    display: flex;
    color: $blue-dark;
    padding: 5px 0px;
    border: 1px solid $blue-light;
    border-collapse: collapse;
    justify-content: center;
    font-size: 1.3em;

    width: 80%;
    margin: 0 auto;

    .name {
      width: calc(80% - 5px);
    }

    .points {
      width: calc(10%);
      text-align: center;
      font-size: 1em;
      outline-color: $blue-medium;
    }
  }
}
</style>
