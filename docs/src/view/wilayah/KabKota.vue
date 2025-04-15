<template>
  <div class="flex flex-1 flex-col gap-4 p-4">
    <div class="p-8">
      <h1
        class="container mx-auto p-4 text-2xl md:text-3xl font-bold text-gray-800"
      >
        Data Kabupaten/Kota
      </h1>
      <DetailDataKabKota />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import DetailDataKabKota from '@/components/DetailDataKabKota.vue'

useHead({
  title: 'Data Kabupaten/Kota - Nusantara Kita',
  meta: [
    {
      name: 'description',
      content:
        'Nusantara Kita adalah sebuah API yang menyediakan data wilayah Indonesia. Project ini dirancang untuk memudahkan akses dan penggunaan data geospasial terkait wilayah-wilayah di Indonesia. API ini dapat digunakan untuk berbagai aplikasi yang memerlukan informasi seperti batas wilayah, data administratif, dan lain-lain.'
    },
    { property: 'og:title', content: 'Data Kabupaten/Kota' },
    {
      property: 'og:description',
      content:
        'Nusantara Kita adalah sebuah API yang menyediakan data wilayah Indonesia....'
    },
    { property: 'og:image', content: 'https://nusakita.yuefii.site/logo.png' },
    {
      property: 'og:url',
      content: 'https://nusakita.yuefii.site/data-wilayah/kabupaten-kota'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://nusakita.yuefii.site/data-wilayah/kabupaten-kota'
    }
  ]
})
</script>
