<template>
  <div class="grid">
    <input
      class="user-name"
      type="text"
      name="NameInput"
      v-model="userName"
      placeholder="player name"
      @keypress.enter="addUser()"
    />
    <button class="save-button" @click="addUser()" :disabled="disableAddButton">
      <font-awesome-icon icon="save" />
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class UserCreate extends Vue {
  userName: string = "";

  addUser() {
    this.$store.dispatch("createUser", this.userName);
    this.userName = "";
  }

  get disableAddButton() {
    return this.userName == "";
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/styles/mixins.scss";

.user-name {
  @include description;
}

.save-button {
  @include save-button;
}
</style>
