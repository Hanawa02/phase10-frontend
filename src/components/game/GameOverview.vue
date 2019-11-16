<template>
  <div class="grid">
    <div>
      <div>{{ game.title }}</div>
      <button @click="deleteGame()">
        <font-awesome-icon icon="user-secret" />
      </button>
    </div>
    <div v-for="player in game.players" v-bind:key="player.id">
      {{ player.name }}
    </div>
  </div>
</template>

<script>
import GamesService from "@/services/GamesService.js";

export default {
  name: "GameOverview",
  components: {},
  props: {
    game: Object
  },
  methods: {
    deleteGame() {
      GamesService.deleteGame(this.game.id);
      this.$emit("element-deleted");
    }
  }
};
</script>

<style lang="scss" scoped></style>
