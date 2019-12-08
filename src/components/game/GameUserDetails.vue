<template>
  <div class="game-user-detail" :class="{ 'phase-completed': phaseCompleted }">
    <font-awesome-icon
      icon="trophy"
      class="winner-button"
      @click="selectWinner()"
    />
    <div class="name" @click="toggleCompletedPhase()">
      {{ userSnapshot.user.name }}
    </div>
    <div class="phase" @click="toggleCompletedPhase()">
      {{ userSnapshot.phase }}
    </div>
    <div class="points" @click="toggleCompletedPhase()">
      {{ userSnapshot.points }}
    </div>
  </div>
</template>

<script>
export default {
  name: "GameUserDetails",
  props: {
    userSnapshot: Object
  },
  data() {
    return {
      phaseCompleted: false
    };
  },
  mounted() {
    this.phaseCompleted = this.userSnapshot.completedPhase;
  },
  methods: {
    selectWinner() {
      this.userSnapshot.completedPhase = true;

      this.$emit("winner-selected");
    },
    toggleCompletedPhase() {
      this.userSnapshot.completedPhase = !this.userSnapshot.completedPhase;
      this.phaseCompleted = this.userSnapshot.completedPhase;
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
}

.phase-completed {
  margin: 0;
  background-color: #bbf8bb;
  color: #004400;
  font-weight: bold;
}
</style>
