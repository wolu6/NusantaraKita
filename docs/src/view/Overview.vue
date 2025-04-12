<template>
  <div class="flex flex-1 flex-col gap-4 p-4">
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-6">Lokasi Wilayah Indonesia</h1>
      <AppDropdown />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import AppDropdown from '@/components/AppDropdown.vue'

useHead({
  title: 'Halaman Utama - Nusantara Kita',
  meta: [
    {
      name: 'description',
      content:
        'Nusantara Kita adalah sebuah API yang menyediakan data wilayah Indonesia. Project ini dirancang untuk memudahkan akses dan penggunaan data geospasial terkait wilayah-wilayah di Indonesia. API ini dapat digunakan untuk berbagai aplikasi yang memerlukan informasi seperti batas wilayah, data administratif, dan lain-lain.'
    },
    { property: 'og:title', content: 'Halaman Utama' },
    {
      property: 'og:description',
      content:
        'Nusantara Kita adalah sebuah API yang menyediakan data wilayah Indonesia....'
    },
    { property: 'og:image', content: 'https://nusakita.yuefii.site/logo.png' },
    { property: 'og:url', content: 'https://nusakita.yuefii.site/' }
  ],
  link: [{ rel: 'canonical', href: 'https://nusakita.yuefii.site/' }]
})
</script>
