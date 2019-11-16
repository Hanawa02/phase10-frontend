<template>
  <div class="grid">
    <input type="text" name="TitleInput" v-model="gameTitle" />
    <div
      v-for="user in users"
      :key="user.id"
      :class="{ selected: userIsInPlayersList(user.id) }"
    >
      <div class="name-column">{{ user.name }}</div>
      <div class="delete-column">
        <button @click="toggleUser(user.id)">
          <font-awesome-icon
            icon="times-circle"
            v-if="userIsInPlayersList(user.id)"
          />
          <font-awesome-icon
            icon="check-circle"
            v-if="!userIsInPlayersList(user.id)"
          />
        </button>
      </div>
    </div>
    <div>
      <button @click="saveGame()" :disabled="disableSaveButton">
        <font-awesome-icon icon="user-secret" />
      </button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import GamesService from "@/services/GamesService";
import UsersService from "@/services/UsersService";

import router from "@/router/index.js";

export default {
  name: "GamesOverview",
  components: {},
  data() {
    return {
      users: UsersService.getUsers(),
      gameTitle: "",
      playersIds: []
    };
  },
  methods: {
    saveGame() {
      GamesService.addGame(this.gameTitle, this.playersIds);
      this.goToGamesOverview();
    },
    goToGamesOverview() {
      router.push("/");
    },
    userIsInPlayersList(id) {
      let isInList =
        this.playersIds.find(function(playerId) {
          return playerId == id;
        }) != undefined;

      return isInList;
    },
    toggleUser(playerId) {
      if (this.userIsInPlayersList(playerId)) {
        this.removeUser(playerId);
      } else {
        this.playersIds.push(playerId);
      }
    },
    removeUser(playerId) {
      let list = this.playersIds.filter(function(id) {
        return id != playerId;
      });

      this.playersIds = list;
    }
  },
  computed: {
    disableSaveButton() {
      return this.gameTitle == "" || this.playersIds.length == 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.selected {
  background-color: #ccc;
}
</style>
