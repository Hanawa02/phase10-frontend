import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import axios from "axios";
import VueAxios from "vue-axios";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faHome,
  faUsers,
  faCompress,
  faCaretLeft,
  faSadCry,
  faTrashAlt,
  faPlusCircle,
  faTrophy,
  faSortAlphaDown,
  faSave,
  faTimesCircle,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faHome,
  faUsers,
  faCompress,
  faCaretLeft,
  faSadCry,
  faTrashAlt,
  faPlusCircle,
  faTrophy,
  faSortAlphaDown,
  faSave,
  faTimesCircle,
  faCheckCircle
);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
