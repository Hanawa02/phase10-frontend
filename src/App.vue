<template>
  <div id="app">
    <div class="logo">
      Phase
      <span class="logo-10">10</span>
    </div>

    <div id="nav">
      <router-link to="/">
        <font-awesome-icon icon="home" />
      </router-link>

      <router-link to="/users">
        <font-awesome-icon icon="users" />
      </router-link>

      <font-awesome-icon icon="compress" @click="goFullScreen()" />
    </div>
    <router-view id="app-container" />
  </div>
</template>

<script>
export default {
  methods: {
    goFullScreen() {
      document.getElementById("app").requestFullscreen();
    }
  }
};
</script>

<style lang="scss">
@import "./scss/_variables.scss";

#app {
  background-color: white;

  &:fullscreen {
    background-color: white;
  }
}

body {
  margin: 0;
}
#app-container {
  margin-bottom: calc(1em + 40px);
}

#app {
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.logo {
  font-family: "Playball", cursive;
  font-size: 1.8em;
  padding: 10px;
  margin-bottom: 10px;
  background-color: $blue-medium;
  color: $white;

  .logo-10 {
    font-family: "Play", sans-serif;
  }
}

#nav {
  padding-top: 10px;
  padding-bottom: 10px;
  color: $blue-medium;
  width: 100%;

  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: stretch;
  align-content: space-around;

  /* Position the Nav in the bottom */
  overflow: hidden;
  position: fixed;
  bottom: 0;
  left: 0;
  border-top: 2px solid $blue-light-medium;
  background-color: $blue-light;

  a {
    text-decoration: none;
    font-weight: bold;
    color: $blue-light-medium;

    & :hover {
      color: $blue-dark;
    }

    &.router-link-exact-active {
      color: $blue-medium;
    }
  }
}

// @media screen and (min-width: $screen-large) {
//   #nav {
//     overflow: hidden;
//     position: initial;
//     border-top: none;
//     margin-bottom: 10px;
//     border-bottom: 2px solid $blue-light-medium;
//     width: auto;
//     background-color: $blue-medium;

//     a {
//       color: $blue-light-medium;

//       &.router-link-exact-active {
//         color: $white;
//       }
//     }
//   }

//   .logo {
//     margin-bottom: 0;
//   }
// }
</style>
