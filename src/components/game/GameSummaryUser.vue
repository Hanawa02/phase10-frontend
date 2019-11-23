<template>
  <div class="grid">
    <div>
      <font-awesome-icon icon="user-secret" />
    </div>
    <div>{{ user.name }}</div>
    <div>{{ user.phase }}</div>
    <div>{{ user.score }}</div>
  </div>
</template>

<script>
export default {
  name: "GameSummaryUser",
  props: {
    user: Object,
    position: Number
  }
};
</script>

<style lang="scss" scoped></style>
