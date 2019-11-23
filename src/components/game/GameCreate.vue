<template>
  <div class="grid">
    <input type="text" name="TitleInput" v-model="gameTitle" />
    <div
      v-for="user in users"
      :key="user.id"
      :class="{ selected: userIsInUsersList(user.id) }"
    >
      <div class="name-column">{{ user.name }}</div>
      <div class="delete-column">
        <button @click="toggleUser(user.id)">
          <font-awesome-icon
            icon="times-circle"
            v-if="userIsInUsersList(user.id)"
          />
          <font-awesome-icon
            icon="check-circle"
            v-if="!userIsInUsersList(user.id)"
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
  data() {
    return {
      users: UsersService.getUsers(),
      gameTitle: "",
      usersIds: []
    };
  },
  methods: {
    saveGame() {
      GamesService.addGame(this.gameTitle, this.usersIds);
      this.goToGamesOverview();
    },
    goToGamesOverview() {
      router.push({
        name: "games"
      });
    },
    userIsInUsersList(id) {
      let isInList =
        this.usersIds.find(function(userId) {
          return userId == id;
        }) != undefined;

      return isInList;
    },
    toggleUser(userId) {
      if (this.userIsInUsersList(userId)) {
        this.removeUser(userId);
      } else {
        this.usersIds.push(userId);
      }
    },
    removeUser(userId) {
      let list = this.usersIds.filter(function(id) {
        return id != userId;
      });

      this.usersIds = list;
    }
  },
  computed: {
    disableSaveButton() {
      return this.gameTitle == "" || this.usersIds.length == 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.selected {
  background-color: #ccc;
}
</style>
