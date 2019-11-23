<template>
  <div class="grid">
    <div>{{ user.name }}</div>
    <div>
      <input type="number" v-model="user.points" @input="emitPointsUpdated()" />
      <button @click="cleanPoints()">
        <font-awesome-icon icon="user-secret" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameFinishRoundUser",
  props: {
    user: Object
  },
  methods: {
    cleanPoints() {
      this.user.points = 0;
    },
    emitPointsUpdated() {
      this.$emit("points-updated");
    }
  }
};
</script>

<style lang="scss" scoped></style>
