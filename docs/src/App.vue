<script setup lang="ts">
import Layout from '@/layouts/Main.vue'
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Layout>
      <component :is="Component" />
    </Layout>
  </RouterView>
</template>
