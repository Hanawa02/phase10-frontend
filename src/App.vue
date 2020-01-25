<template>
  <div id="app">
    <div class="spinner-container" v-if="isLoading">
      <div class="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="logo" v-if="notOnLandscape" @click="goToMainPage()">
      Phase
      <span class="logo-10">10</span>
    </div>
    <div ref="fullscreen" id="app-fullscreen-container">
      <div id="nav">
        <router-link to="/" class="full-width">
          <font-awesome-icon icon="home" /> </router-link
        >|
        <router-link to="/users" class="full-width">
          <font-awesome-icon icon="users" /> </router-link
        >|

        <font-awesome-icon
          v-if="!onFullScreen"
          icon="compress"
          @click="goFullScreen()"
          class="full-width"
        />
        <font-awesome-icon
          v-if="onFullScreen"
          icon="caret-left"
          @click="goBack()"
          class="full-width"
        />
      </div>
      <router-view id="app-container" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IHTMLDocument } from "./models/html-document";

@Component
export default class App extends Vue {
  isOnFullScreen: boolean = false;
  isNotOnLandscape: boolean = true;

  mounted() {
    this.$store.dispatch("updateUserList");
    this.$store.dispatch("updateGamesList");

    document.addEventListener("fullscreenchange", this.updateButton);
    window.addEventListener("orientationchange", this.updateLogo);
  }

  goFullScreen() {
    const fullscreenElement: any = this.$refs.fullscreen;
    fullscreenElement.requestFullscreen();
  }

  goBack() {
    this.$router.go(-1);
  }

  updateButton() {
    this.isOnFullScreen = document.fullscreenElement !== null;
  }

  updateLogo() {
    this.isNotOnLandscape = window.matchMedia(
      "(orientation: landscape)"
    ).matches;
  }

  goToMainPage() {
    if (this.$router.currentRoute.name !== "games") {
      this.$router.push({
        name: "games"
      });
    }
  }

  get onFullScreen() {
    return this.isOnFullScreen;
  }

  get notOnLandscape() {
    return this.isNotOnLandscape;
  }

  get isLoading(): boolean {
    return this.$store.getters.isLoading;
  }
}
</script>

<style lang="scss">
@import "./styles/colors.scss";
@import "./styles/fonts.scss";
@import "./styles/mixins.scss";

#app,
#app-fullscreen-container {
  background-color: white;

  &:fullscreen {
    background-color: white;
  }

  overflow-y: auto;
}

body {
  margin: 0;
  outline: none;
  font-size: 1.2em;
}
#app-container {
  margin-bottom: calc(1rem + 40px);
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
  cursor: pointer;

  &:active {
    color: $blue-light;
  }

  .logo-10 {
    font-family: "Play", sans-serif;
  }
}

#nav {
  padding-top: 10px;
  padding-bottom: 10px;
  color: $blue-medium;
  width: 100%;

  z-index: 2;
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
    outline: none;

    & :active {
      outline: none;
    }
    & :hover {
      color: $blue-dark;
      outline: none;
    }

    &.router-link-exact-active {
      color: $blue-medium;
    }
  }

  .full-width {
    width: 33%;
    cursor: pointer;
  }
}
$spinner-color: $blue-dark;
$shadows-screen-color: #005b9640;

.spinner-container {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: $shadows-screen-color;
  z-index: 3;
}
.lds-spinner {
  width: 3.5em;
  margin: 0 auto;
  position: relative;
  top: calc(50% - calc(3.5em / 2));
}
.lds-spinner div {
  transform-origin: 1.8em 1.8em;
  animation: lds-spinner 1.2s linear infinite;
}
.lds-spinner div:after {
  content: " ";
  display: block;
  position: absolute;
  top: 3px;
  left: 1.6em;
  width: 6px;
  height: 1em;
  border-radius: 20%;
  background: $spinner-color;
}
.lds-spinner div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -1.1s;
}
.lds-spinner div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -1s;
}
.lds-spinner div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.9s;
}
.lds-spinner div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.8s;
}
.lds-spinner div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.7s;
}
.lds-spinner div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.6s;
}
.lds-spinner div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.5s;
}
.lds-spinner div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.4s;
}
.lds-spinner div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.3s;
}
.lds-spinner div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.2s;
}
.lds-spinner div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.1s;
}
.lds-spinner div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
}
@keyframes lds-spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
