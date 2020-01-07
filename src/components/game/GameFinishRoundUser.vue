<template>
  <div class="game-finish-round-user">
    <div class="name">{{ userSnapshot.user.name }}</div>
    <input
      class="points"
      type="number"
      v-model="score"
      @input="emitPointsUpdated()"
      @focus="$event.target.select()"
      @keypress.enter="emitFinishGame()"
    />
  </div>
</template>

<script>
export default {
  name: "GameFinishRoundUser",
  props: {
    userSnapshot: Object
  },
  data() {
    return {
      score: 0
    };
  },
  methods: {
    emitPointsUpdated() {
      this.userSnapshot.user.score = this.score;
      this.$emit("score-updated");
    },
    emitFinishGame() {
      console.log("finish game pressed");
      this.$emit("finish-game");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/_variables.scss";

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
  }
}
</style>
