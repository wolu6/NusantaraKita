<template>
  <div class="flex flex-1 flex-col gap-4 p-4">
    <h1>Panduan Instalasi</h1>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'

useHead({
  title: 'Panduan Instalasi - Nusantara Kita',
  meta: [
    {
      name: 'description',
      content:
        'Nusantara Kita adalah sebuah API yang menyediakan data wilayah Indonesia. Project ini dirancang untuk memudahkan akses dan penggunaan data geospasial terkait wilayah-wilayah di Indonesia. API ini dapat digunakan untuk berbagai aplikasi yang memerlukan informasi seperti batas wilayah, data administratif, dan lain-lain.'
    },
    { property: 'og:title', content: 'Panduan Instalasi' },
    {
      property: 'og:description',
      content:
        'Nusantara Kita adalah sebuah API yang menyediakan data wilayah Indonesia....'
    },
    { property: 'og:image', content: 'https://nusakita.yuefii.site/logo.png' },
    {
      property: 'og:url',
      content: 'https://nusakita.yuefii.site/panduan-instalasi'
    }
  ],
  link: [
    { rel: 'canonical', href: 'https://nusakita.yuefii.site/panduan-instalasi' }
  ]
})
</script>
