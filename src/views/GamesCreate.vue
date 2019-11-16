<template>
  <div class="games">
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
