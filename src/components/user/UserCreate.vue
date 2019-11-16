<template>
  <div class="grid">
    <input type="text" name="NameInput" v-model="userName" />
    <button @click="addUser()" :disabled="disableAddButton">
      <font-awesome-icon icon="user-secret" />
    </button>
  </div>
</template>

<script>
// @ is an alias to /src
import UsersService from "@/services/UsersService";

export default {
  name: "UserCreate",
  components: {},
  data() {
    return {
      userName: ""
    };
  },
  methods: {
    addUser() {
      UsersService.addUser(this.userName);
      this.userName = "";
    }
  },
  computed: {
    disableAddButton() {
      return this.userName == "";
    }
  }
};
</script>

<style lang="scss" scoped></style>
