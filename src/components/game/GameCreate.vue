<template>
  <div class="game-create">
    <input
      class="description"
      type="text"
      name="TitleInput"
      v-model="gameTitle"
      placeholder="game description"
    />
    <div class="users-container">
      <div
        v-for="user in users"
        :key="user.id"
        :class="{ selected: userIsInUsersList(user.id), user: true }"
      >
        <div class="name" @click="toggleUser(user.id)">{{ user.name }}</div>
        <button class="delete-button" @click="toggleUser(user.id)">
          <font-awesome-icon
            class="not-included"
            icon="times-circle"
            v-if="!userIsInUsersList(user.id)"
          />
          <font-awesome-icon
            class="included"
            icon="check-circle"
            v-if="userIsInUsersList(user.id)"
          />
        </button>
      </div>
    </div>
    <button
      class="save-button"
      @click="saveGame()"
      :disabled="disableSaveButton"
    >
      <font-awesome-icon icon="save" />
    </button>
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
      return this.gameTitle == "" || this.usersIds.length <= 1;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/_variables.scss";
.game-create {
  .description {
    @include description;
  }

  .users-container {
    @include user-list-and-button;

    .user {
      .delete-button {
        .not-included {
          color: red;
        }

        .included {
          color: green;
          background-color: white;
          border-radius: 50%;
        }
      }
    }
    .selected {
      background-color: $blue-light;
    }
  }
  .save-button {
    @include save-button;
  }
}
</style>
