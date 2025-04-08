<template>
  <div class="flex flex-1 flex-col gap-4 p-4">
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-6">Lokasi Wilayah Indonesia</h1>
      <AppDropdown />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppDropdown from '@/components/AppDropdown.vue'
</script>
