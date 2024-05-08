<template>
  <v-app>
    <v-app-bar app color="indigo" dark>
      <v-toolbar-title>Product Catalog</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>

    <v-footer color="indigo" app inset>
      <span class="white--text">&copy; 2024 My Company</span>
    </v-footer>

    <v-snackbar v-model="show" :timeout="timeout" color="red">
      {{ message }}
    </v-snackbar>
  </v-app>
</template>

<script setup lang="ts">
import { useNotificationStore } from "@/stores/notifications";
import { storeToRefs } from "pinia";

const notificationStore = useNotificationStore();
const { message, show, timeout } = storeToRefs(notificationStore);
</script>
