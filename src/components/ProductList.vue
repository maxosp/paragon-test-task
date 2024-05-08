<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="searchTerm"
          label="Search products"
          append-icon="mdi-magnify"
          outlined
          dense
        />
      </v-col>

      <v-col cols="12" sm="6">
        <v-select
          :model-value="itemsPerPage"
          :items="[10, 20, 30, 40]"
          label="Items per page"
          dense
          @update:model-value="onItemsPerPageChange"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card class="pa-2 overflow-y-auto" height="600px">
          <v-simple-table v-if="!loading && products.length > 0">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left" style="width: 30%">Product</th>
                  <th class="text-left" style="width: 10%">Price</th>
                  <th class="text-left" style="width: 20%">Category</th>
                  <th class="text-left" style="width: 40%">Description</th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="product in products"
                  :key="product.id"
                  class="hover-effect"
                  @click="goToProductDetail(product.id)"
                >
                  <td>{{ product.title }}</td>
                  <td>{{ product.price }}</td>
                  <td>{{ product.category }}</td>
                  <td>{{ product.description }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <v-row
            v-if="!products.length && !loading"
            justify="center"
            align-content="center"
            class="fill-height"
          >
            <td colspan="4" class="text-center">No products found</td>
          </v-row>

          <v-row
            v-if="loading"
            justify="center"
            align-content="center"
            class="fill-height"
          >
            <v-progress-circular indeterminate color="primary" />
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" class="my-5">
      <v-btn
        color="primary"
        class="mx-2"
        :disabled="!canGoPrev"
        @click="prevPage"
      >
        Prev
      </v-btn>

      <v-btn
        color="primary"
        class="mx-2"
        :disabled="!canGoNext"
        @click="nextPage"
      >
        Next
      </v-btn>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { computed, onMounted, ref, watch } from "vue";

import { useProductsStore } from "@/stores/products";
import { useDebounce } from "@/composables/useDebounce";

const router = useRouter();
const store = useProductsStore();

const { currentPage, totalPages, products, loading, itemsPerPage } =
  storeToRefs(store);

const searchTerm = ref("");
const debouncedSearchTerm = useDebounce(searchTerm, 500);

const canGoPrev = computed(() => currentPage.value > 1);
const canGoNext = computed(() => currentPage.value < totalPages.value);

const fetchProducts = () => {
  store.fetchProducts();
};

watch(debouncedSearchTerm, (newSearchTerm) => {
  store.fetchProducts(newSearchTerm);
});

const nextPage = () => store.nextPage();
const prevPage = () => store.prevPage();

const onItemsPerPageChange = (newItemsPerPage: number) => {
  store.itemsPerPage = newItemsPerPage;
  fetchProducts();
};

const goToProductDetail = (id: number) => {
  router.push(`/product/${id}`);
};

onMounted(fetchProducts);
</script>

<style scoped>
.hover-effect:hover {
  background-color: #f5f5f5;
  cursor: pointer;
}
</style>
