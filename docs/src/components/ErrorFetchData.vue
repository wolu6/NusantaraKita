<template>
  <div
    class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4"
  >
    <p class="font-bold">Terjadi kesalahan</p>
    <p>{{ message }}</p>
    <button
      @click="onRetry"
      class="mt-2 px-3 py-1 bg-red-100 hover:bg-red-200 rounded text-red-700 transition-colors"
    >
      Coba Lagi
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string | null
  onRetry: () => void
}>()
</script>
