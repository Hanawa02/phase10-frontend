<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Games Overview-</router-link> |
      <router-link to="/games/new">New Games-</router-link>
      <router-link to="/games/1">Game Details-</router-link>
      <router-link to="/games/1/finishRound">Game Finish Round-</router-link>
      <router-link to="/games/1/summary">Game Summary-</router-link>
      <router-link to="/users">Users-</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
