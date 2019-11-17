<template>
  <div class="grid">
    <div>{{ user.name }}</div>
    <div>{{ user.phase }}</div>
    <div>{{ user.score }}</div>
    <div><input type="checkbox" :checked="completedPhase" /></div>
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
  components: {},
  props: {
    user: Object
  },
  data() {
    return {
      completedPhase: false
    };
  },
  methods: {
    selectWinner() {
      this.completedPhase = true;
      this.$emit("winner-selected");
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped></style>
