<template>
  <div class="grid" @click="selectGame()">
    <div>
      <div>{{ game.title }}</div>
      <button @click="deleteGame()">
        <font-awesome-icon icon="user-secret" />
      </button>
    </div>
    <div v-for="user in game.users" v-bind:key="user.id">
      {{ user.name }}
    </div>
  </div>
</template>

<script>
import GamesService from "@/services/GamesService.js";
import router from "@/router/index.js";

export default {
  name: "GameOverview",
  props: {
    game: Object
  },
  methods: {
    deleteGame() {
      GamesService.deleteGame(this.game.id);
      this.$emit("element-deleted");
    },
    selectGame() {
      GamesService.setSelectedGame(this.game.id);
      router.push({
        name: "gameDetails",
        params: {
          id: this.game.id
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
