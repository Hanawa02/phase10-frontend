<template>
  <div class="game-finish-round-user">
    <div class="name">{{ userSnapshot.user.name }}</div>
    <input
      class="points"
      type="number"
      v-model="userSnapshot.user.score"
      @input="emitPointsUpdated()"
    />
    <button class="clean-button" @click="cleanPoints()">
      <font-awesome-icon icon="broom" />
    </button>
  </div>
</template>

<script>
export default {
  name: "GameFinishRoundUser",
  props: {
    userSnapshot: Object
  },
  methods: {
    cleanPoints() {
      this.userSnapshot.user.score = 0;
    },
    emitPointsUpdated() {
      this.$emit("score-updated");
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

  width: 80%;
  margin: 0 auto;

  .name {
    width: calc(80% - 5px);
  }

  .points {
    width: calc(10%);
    text-align: center;
  }

  .clean-button {
    @include icon-button($blue-dark);

    width: calc(10%);
  }
}
</style>
