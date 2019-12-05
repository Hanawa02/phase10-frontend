<template>
  <div class="game-summary-user">
    <font-awesome-icon class="trophy" icon="trophy" :class="positionClass" />
    <div class="name">{{ user.name }}</div>
    <div class="phase">{{ user.phase }}</div>
    <div class="score">{{ user.score }}</div>
  </div>
</template>

<script>
export default {
  name: "GameSummaryUser",
  props: {
    user: Object,
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

  .first {
    color: $gold;
  }

  .second {
    color: $silver;
  }

  .third {
    color: $bronze;
  }

  .no-position {
    color: transparent;
  }
}
</style>
