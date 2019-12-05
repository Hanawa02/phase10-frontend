<template>
  <div class="games">
    <div class="title">Users</div>
    <UserCreate></UserCreate>
    <UserList></UserList>
  </div>
</template>

<script>
// @ is an alias to /src
import UserList from "../components/user/UserList.vue";
import UserCreate from "../components/user/UserCreate.vue";

export default {
  name: "Users",
  components: { UserList, UserCreate }
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";
.title {
  @include title-style-with-font(0px, $blue-light);
}
</style>
