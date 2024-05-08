import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { createVuetify } from "vuetify";
import "vuetify/dist/vuetify.min.css";

const app = createApp(App);
const vuetify = createVuetify();

app.use(createPinia());
app.use(vuetify);
app.use(router);

app.mount("#app");
