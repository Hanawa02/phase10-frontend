<template>
  <div class="game-user-detail">
    <font-awesome-icon
      icon="trophy"
      class="winner-button"
      @click="selectWinner()"
    />
    <div class="name" @click="selectWinner()">{{ userSnapshot.user.name }}</div>
    <div class="phase">{{ userSnapshot.phase }}</div>
    <div class="points">{{ userSnapshot.points }}</div>

    <input
      class="phase-completed"
      type="checkbox"
      v-model="userSnapshot.completedPhase"
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
  border: 1px solid $blue-light;
  .winner-button {
    & :active {
      color: $blue-light;
    }
  }
  .phase-completed {
    margin: 0;
  }
}
</style>
