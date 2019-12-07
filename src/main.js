import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckCircle,
  faTimesCircle,
  faUsers,
  faHome,
  faPlusCircle,
  faTrashAlt,
  faTrophy,
  faCompress,
  faSave,
  faBroom,
  faSadCry,
  faCaretLeft
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faCheckCircle,
  faTimesCircle,
  faUsers,
  faHome,
  faPlusCircle,
  faTrashAlt,
  faTrophy,
  faCompress,
  faSave,
  faBroom,
  faSadCry,
  faCaretLeft
);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
