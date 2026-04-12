<script setup>
defineProps({
  coin: Object,
});
</script>

<template>
  <div class="rounded-xl border p-4">
    <h2>{{ coin.name }}</h2>
    <p>{{ coin.symbol }}</p>
    <p>${{ coin.price }}</p>
    <p>{{ coin.change24h }}%</p>
  </div>
</template>
