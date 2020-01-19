<template>
  <div class="games">
    <div class="title">Users</div>
    <user-create />
    <div class="users-container">
      <div class="user" v-for="user in users" :key="user.id">
        <div class="name">{{ user.name }}</div>
        <button class="delete-button" @click="deleteUser(user.id)">
          <font-awesome-icon icon="trash-alt" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import UserCreate from "./UserCreate.vue";
import { User, nullUser } from "../../models/user";

@Component({
  components: {
    "user-create": UserCreate
  }
})
export default class Users extends Vue {
  mounted() {
    this.$store.dispatch("updateUserList");
  }

  get users(): User[] {
    if (this.$store.state.users.includes(nullUser)) {
      this.$store.dispatch("updateUserList");
    }
    return this.$store.state.users;
  }

  deleteUser(id: string) {
    this.$store.dispatch("deleteUser", id);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/styles/mixins.scss";

.title {
  @include title-style-with-font(0px, $blue-light);
}

.users-container {
  @include user-list-and-button;
}
</style>
