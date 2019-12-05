<template>
  <div class="users-container">
    <div class="user" v-for="user in users" :key="user.id">
      <div class="name">{{ user.name }}</div>
      <button class="delete-button" @click="deleteUser(user.id)">
        <font-awesome-icon icon="trash-alt" />
      </button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import UsersService from "@/services/UsersService";

export default {
  name: "UserList",
  data() {
    return {
      users: UsersService.getUsers()
    };
  },
  methods: {
    deleteUser(id) {
      UsersService.deleteUser(id);
      this.users = UsersService.getUsers();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/_variables.scss";

.users-container {
  @include user-list-and-button;
}
</style>
