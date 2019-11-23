<template>
  <div class="grid">
    <div>{{ user.name }}</div>
    <div>{{ user.phase }}</div>
    <div>{{ user.score }}</div>
    <div>
      <input type="checkbox" v-model="user.completedPhase" />
    </div>
    <div>
      <button @click="selectWinner()">
        <font-awesome-icon icon="user-secret" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameUserDetails",
  props: {
    user: Object
  },
  methods: {
    selectWinner() {
      this.user.completedPhase = true;

      this.$emit("winner-selected");
    }
  }
};
</script>

<style lang="scss" scoped></style>
