<template>
  <div class="grid">
    <div v-for="user in users" :key="user.id">
      <div class="name-column">{{ user.name }}</div>
      <div class="delete-column">
        <button @click="deleteUser(user.id)">
          <font-awesome-icon icon="user-secret" />
        </button>
      </div>
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

<style lang="scss" scoped></style>
