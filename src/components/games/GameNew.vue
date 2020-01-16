<template>
  <div class="games-create">
    <div class="title">New Game</div>
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
        <font-awesome-icon icon="save" /> Create Game
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IUser } from "../../models/user";

@Component
export default class GameNew extends Vue {
  gameTitle: string = "";
  users: IUser[] = [];
  selectedUsersId: string[] = [];

  mounted() {
    this.users = this.$store.state.users;
    this.users.sort();

    if (this.users.length === 0) {
      this.$router.push({
        name: "users"
      });
    }
  }

  saveGame() {
    this.$store.dispatch("createGame", {
      gameTitle: this.gameTitle,
      usersId: this.selectedUsersId
    });

    this.$router.push({
      name: "games"
    });
  }

  userIsInUsersList(id: string) {
    let isInList =
      this.selectedUsersId.find(function(userId) {
        return userId === id;
      }) != undefined;

    return isInList;
  }

  removeUser(userId: string) {
    let list = this.selectedUsersId.filter(function(id) {
      return id != userId;
    });

    this.selectedUsersId = list;
  }

  toggleUser(userId: string) {
    if (this.userIsInUsersList(userId)) {
      this.removeUser(userId);
    } else {
      this.selectedUsersId.push(userId);
    }
  }

  get disableSaveButton() {
    return this.gameTitle == "" || this.selectedUsersId.length <= 1;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/styles/colors.scss";
@import "@/styles/mixins.scss";
.games-create {
  font-family: "Play";
  margin: 10px;

  .title {
    @include title-style-with-font(10px, $blue-medium-dark);
  }
  .game-create {
    .description {
      @include description;
    }

    .users-container {
      @include user-list-and-button;
      width: 75%;
      margin: 20px auto;

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
}
</style>
