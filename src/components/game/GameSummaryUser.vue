<template>
  <div class="game-summary-user">
    <font-awesome-icon class="trophy" icon="trophy" :class="positionClass" />
    <div class="name">{{ userSnapshot.user.name }}</div>
    <div class="phase">{{ userSnapshot.phase }}</div>
    <div class="points">{{ userSnapshot.points }}</div>
  </div>
</template>

<script>
export default {
  name: "GameSummaryUser",
  props: {
    userSnapshot: Object,
    position: Number
  },
  computed: {
    positionClass() {
      let classAtr = "";

      switch (this.position) {
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
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/_variables.scss";

.game-summary-user {
  @include details;

  border: 1px solid $blue-light;
  justify-content: center;

  width: 80%;
  margin: 0 auto;

  .trophy {
    width: 20%;
  }
  .name {
    width: calc(60% - 5px);
  }

  @include trophy-position;
}
</style>
