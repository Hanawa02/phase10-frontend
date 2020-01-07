<template>
  <div class="game-user-detail">
    <div class="phase" @click="toggleCompletedPhase()">
      {{ userSnapshot.phase }}
    </div>
    <div class="name" @click="toggleCompletedPhase()">
      {{ userSnapshot.user.name }}
      <font-awesome-icon class="trophy" icon="trophy" :class="positionClass" />
    </div>
    <div class="status">
      <button
        :class="phaseCompleted ? 'phase-completed' : 'phase-not-completed'"
        @click="toggleCompletedPhase()"
      >
        {{ phaseCompleted ? "completed" : "not completed" }}
      </button>
    </div>
    <div class="winner-button">
      <button class="finish-button" @click="selectWinner()">
        Finish Game
      </button>
    </div>
  </div>
</template>

<script>
import GamesService from "@/services/GamesService.js";

export default {
  name: "GameUserDetails",
  props: {
    userSnapshot: Object
  },
  computed: {
    positionClass() {
      let classAtr = "";

      switch (this.userSnapshot.position) {
        case 1:
          classAtr = "first";
          break;
        case 2:
          classAtr = "second";
          break;
        case 3:
          classAtr = "third";
          break;
        default:
          classAtr = "no-position";
      }

      return classAtr;
    }
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

      GamesService.updateUserSnapshot(this.userSnapshot);
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

  .name {
    @include trophy-position;
  }
}

.phase-completed {
  $dark-color: #004400;
  $light-color: #bbf8bb;

  outline: none;
  width: 95%;
  font-size: 1.3rem;
  margin: 0;
  background-color: $light-color;
  color: $dark-color;
  font-weight: bold;
  border-radius: 8px;
  border: 0px solid $dark-color;
  box-shadow: 1px 1px 1px $dark-color;
}

.phase-not-completed {
  $dark-color: #b20000;
  $light-color: #ffcccc;

  outline: none;
  width: 95%;
  font-size: 1.3rem;
  margin: 0;
  background-color: $light-color;
  color: $dark-color;
  font-weight: bold;
  border-radius: 8px;
  border: 0px solid $dark-color;
  box-shadow: 1px 1px 1px $dark-color;
}

.finish-button {
  width: 80%;

  outline: none;
  width: 90%;
  font-size: 1.3rem;
  margin: 0;
  background-color: $blue-light;
  color: $blue-dark;
  font-weight: bold;
  border-radius: 8px;
  border: 0px solid $blue-dark;
  box-shadow: 1px 1px 1px $blue-dark;
}
</style>
