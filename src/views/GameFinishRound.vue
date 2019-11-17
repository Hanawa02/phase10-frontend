<template>
  <div class="games">
    <div>
      <div>Winner</div>
      <div>{{ winner.name }}</div>
    </div>
    <div v-for="player in game.players" v-bind:key="player.id">
      <GameUserDetails
        :user="player"
        @winner-selected="finishRound(player.id)"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import UsersService from "@/services/UsersService";
import GamesService from "@/services/GamesService.js";
export default {
  name: "GameFinishRound",
  components: {},
  data() {
    return {
      winner: UsersService.getUser(this.$route.params.userid),
      game: GamesService.getGameDetails(this.$route.params.id)
    };
  }
};
</script>
