<template>
  <div class="game-user-detail">
    <div class="name">{{ user.name }}</div>
    <div class="phase">{{ user.phase }}</div>
    <div class="score">{{ user.score }}</div>

    <input
      class="phase-completed"
      type="checkbox"
      v-model="user.completedPhase"
    />

    <font-awesome-icon
      icon="trophy"
      class="winner-button"
      @click="selectWinner()"
    />
  </div>
</template>

<script>
export default {
  name: "GameUserDetails",
  props: {
    user: Object
  },
  methods: {
    selectWinner() {
      this.user.completedPhase = true;

      this.$emit("winner-selected");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/_variables.scss";

.game-user-detail {
  @include details;

  .phase-completed {
    margin: 0;
  }
}
</style>
