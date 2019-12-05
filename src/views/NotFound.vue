<template>
  <div class="not-found">
    404 Page not found
    <div>
      <font-awesome-icon class="icon" icon="sad-cry" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "PageNotFound"
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";

.not-found {
  font-size: 2rem;
  color: $blue-dark;
  display: inline-block;
  margin: 10%;
}

.icon {
  font-size: 2.8rem;
  margin: 10px;
  display: inline-block;
}
</style>
