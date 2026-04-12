import { ref, computed } from "vue";

export function useCoins() {
  const coins = ref([]);
  const loading = ref(false);
  const error = ref("");
  const search = ref("");

  const fetchCoins = async () => {
    loading.value = true;
    error.value = "";

    try {
      const response = await fetch("http://127.0.0.1:8787/api/coins");
      const data = await response.json();
      coins.value = data.data;
    } catch {
      error.value = "Could not load coins.";
    } finally {
      loading.value = false;
    }
  };

  const filteredCoins = computed(() => {
    return coins.value.filter((coin) =>
      coin.name.toLowerCase().includes(search.value.toLowerCase()),
    );
  });

  return {
    loading,
    error,
    search,
    filteredCoins,
    fetchCoins,
  };
}
