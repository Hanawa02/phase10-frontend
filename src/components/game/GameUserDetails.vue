<template>
  <div class="game-user-detail">
    <div class="name">{{ userSnapshot.user.name }}</div>
    <div class="phase">{{ userSnapshot.phase }}</div>
    <div class="points">{{ userSnapshot.points }}</div>

    <input
      class="phase-completed"
      type="checkbox"
      v-model="userSnapshot.completedPhase"
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
    userSnapshot: Object
  },
  methods: {
    selectWinner() {
      this.userSnapshot.completedPhase = true;

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
