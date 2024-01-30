import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { Tab, Tabs, Card } from "vant";
import "vant/lib/index.css";

const app = createApp(App);

// Vuetify
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";

const vuetify = createVuetify({
  components,
  directives,
  defaults: {
    VBtn: { variant: "outlined" },
    VTextField: { variant: "solo" },
  },
  theme: {
    defaultTheme: "light",
  },
});

app.use(router);
app.use(Tab);
app.use(Tabs);
app.use(Card);
app.use(vuetify);
app.mount("#app");
