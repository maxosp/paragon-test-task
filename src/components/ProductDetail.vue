<template>
  <v-container>
    <v-card v-if="product" class="my-4" elevation="2">
      <v-carousel v-if="product?.images" cycle height="400px" hide-delimiters>
        <v-carousel-item
          v-for="(image, index) in product.images"
          :key="index"
          :src="image"
          :alt="`Image ${index + 1} of ${product.title}`"
        ></v-carousel-item>
      </v-carousel>

      <v-card-text>
        <div><strong>Price:</strong> {{ product?.price }}</div>
        <div><strong>Title:</strong> {{ product?.title }}</div>
        <div><strong>Category:</strong> {{ product?.category }}</div>
        <div><strong>Description:</strong> {{ product?.description }}</div>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" @click="goBack">Back to List</v-btn>
      </v-card-actions>
    </v-card>

    <v-row v-if="loading" justify="center" align-content="center">
      <v-progress-circular indeterminate color="primary" />
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import { Product } from "@/types";
import { useNotificationStore } from "@/stores/notifications";

const route = useRoute();
const router = useRouter();
const notificationStore = useNotificationStore();

const product = ref<Product | null>(null);
const loading = ref(false);

onMounted(() => {
  fetchProduct();
});

async function fetchProduct() {
  loading.value = true;
  try {
    const response = await axios.get(
      `https://dummyjson.com/products/${route.params.id}`
    );
    product.value = response.data;
  } catch (error) {
    notificationStore.displayMessage(
      "Product not found. Redirecting to product list...",
      () => router.push("/")
    );
  } finally {
    loading.value = false;
  }
}

function goBack() {
  router.push("/");
}
</script>
