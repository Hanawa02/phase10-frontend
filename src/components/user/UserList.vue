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
  async mounted() {
    this.users = await UsersService.getUsers();
  },
  data() {
    return {
      users: []
    };
  },
  methods: {
    async deleteUser(id) {
      await UsersService.deleteUser(id);
      this.users = await UsersService.getUsers();
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
