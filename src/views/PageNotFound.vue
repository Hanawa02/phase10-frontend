<template>
  <div class="not-found" @click="goToMainPage()">
    404 Page not found
    <div>
      <font-awesome-icon class="icon" icon="sad-cry" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PageNotFound extends Vue {
  goToMainPage() {
    this.$router.push({
      name: "games"
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/colors.scss";

.not-found {
  font-size: 2rem;
  color: $blue-medium;
  display: inline-block;
  margin: 10%;
}

.icon {
  font-size: 2.8rem;
  margin: 10px;
  display: inline-block;
}
</style>
