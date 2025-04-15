<template>
  <div class="flex flex-1 flex-col gap-4 p-4">
    <div class="p-8">
      <h1 class="p-4 text-2xl md:text-3xl font-bold text-gray-800">
        Data Kabupaten/Kota
      </h1>
      <DetailDataKabKota />
    </div>
  </div>
</template>

<script setup lang="ts">
import DetailDataKabKota from '@/components/DetailDataKabKota.vue'
</script>
