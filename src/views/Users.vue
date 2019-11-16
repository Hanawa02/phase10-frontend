<template>
  <div class="games">
    <div>users</div>
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
