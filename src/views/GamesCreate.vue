<template>
  <div class="games-create">
    <div class="title">New Game</div>
    <GameCreate></GameCreate>
  </div>
</template>

<script>
// @ is an alias to /src
import GameCreate from "../components/game/GameCreate.vue";

export default {
  name: "GamesCreate",
  components: { GameCreate }
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";

.games-create {
  font-family: "Play";
  margin: 10px;

  .title {
    @include title-style-with-font(10px, $blue-medium-dark);
  }
}
</style>
