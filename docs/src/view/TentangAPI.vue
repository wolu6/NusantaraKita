<template>
  <div class="flex flex-1 flex-col gap-4 p-4 md:p-10 2xl:max-w-6xl">
    <img src="/logo.png" alt="Logo Nusantara Kita" class="w-32 h-32" />
    <h1 class="text-3xl font-bold">Nusantara Kita</h1>
    <p class="text-lg text-gray-700 text-justify leading-relaxed mb-4">
      Nusantara Kita adalah sebuah API yang menyediakan data wilayah Indonesia.
      Proyek ini dirancang untuk memudahkan akses dan penggunaan data geospasial
      terkait wilayah-wilayah di Indonesia. API ini dapat digunakan untuk
      berbagai aplikasi yang memerlukan informasi seperti batas wilayah, data
      administratif, dan lain-lain.
    </p>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'

useHead({
  title: 'Tentang API - Nusantara Kita',
  meta: [
    {
      name: 'description',
      content:
        'Nusantara Kita adalah sebuah API yang menyediakan data wilayah Indonesia. Project ini dirancang untuk memudahkan akses dan penggunaan data geospasial terkait wilayah-wilayah di Indonesia. API ini dapat digunakan untuk berbagai aplikasi yang memerlukan informasi seperti batas wilayah, data administratif, dan lain-lain.'
    },
    { property: 'og:title', content: 'Tentang API' },
    {
      property: 'og:description',
      content:
        'Nusantara Kita adalah sebuah API yang menyediakan data wilayah Indonesia....'
    },
    { property: 'og:image', content: 'https://nusakita.yuefii.site/logo.png' },
    { property: 'og:url', content: 'https://nusakita.yuefii.site/tentang-api' }
  ],
  link: [{ rel: 'canonical', href: 'https://nusakita.yuefii.site/tentang-api' }]
})
</script>
