import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { Product, ApiError } from "@/types";

export const useProductsStore = defineStore("products", () => {
  const products = ref<Product[]>([]);
  const error = ref<ApiError | null>(null);
  const loading = ref(false);
  const currentPage = ref(1);
  const itemsPerPage = ref(10);
  const totalProducts = ref(0);

  const totalPages = computed(() =>
    Math.ceil(totalProducts.value / itemsPerPage.value)
  );

  const fetchProducts = async (searchTerm: string = "") => {
    loading.value = true;
    try {
      const offset = (currentPage.value - 1) * itemsPerPage.value;

      const baseApiUrl = "https://dummyjson.com/products";
      let apiUrl = `${baseApiUrl}?limit=${itemsPerPage.value}&skip=${offset}`;

      if (searchTerm) {
        apiUrl = `${baseApiUrl}/search?q=${encodeURIComponent(
          searchTerm
        )}&limit=${itemsPerPage}&skip=${offset}`;
      }

      const response = await axios.get(apiUrl);

      products.value = response.data.products;
      totalProducts.value = response.data.total;
    } catch (error) {
      error = { message: (error as ApiError).message };
    } finally {
      loading.value = false;
    }
  };

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
      fetchProducts();
    }
  };

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
      fetchProducts();
    }
  };

  return {
    products,
    error,
    loading,
    currentPage,
    itemsPerPage,
    totalProducts,
    totalPages,
    fetchProducts,
    nextPage,
    prevPage,
  };
});
