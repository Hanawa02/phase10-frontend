<template>
  <div class="grid">
    <input
      class="user-name"
      type="text"
      name="NameInput"
      v-model="userName"
      placeholder="player name"
    />
    <button class="save-button" @click="addUser()" :disabled="disableAddButton">
      <font-awesome-icon icon="save" />
    </button>
  </div>
</template>

<script>
// @ is an alias to /src
import UsersService from "@/services/UsersService";

export default {
  name: "UserCreate",
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

<style lang="scss" scoped>
@import "../../scss/_variables.scss";

.user-name {
  @include description;
}

.save-button {
  @include save-button;
}
</style>
