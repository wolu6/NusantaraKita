<template>
  <div class="flex flex-1 flex-col gap-4 p-4">
    <div class="p-8">
      <h1 class="p-4 text-2xl md:text-3xl font-bold text-gray-800">
        Data Provinsi
      </h1>
      <DetailDataProvinsi />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import DetailDataProvinsi from '@/components/DetailDataProvinsi.vue'

useHead({
  title: 'Data Provinsi - Nusantara Kita',
  meta: [
    {
      name: 'description',
      content:
        'Nusantara Kita adalah sebuah API yang menyediakan data wilayah Indonesia. Project ini dirancang untuk memudahkan akses dan penggunaan data geospasial terkait wilayah-wilayah di Indonesia. API ini dapat digunakan untuk berbagai aplikasi yang memerlukan informasi seperti batas wilayah, data administratif, dan lain-lain.'
    },
    { property: 'og:title', content: 'Data Provinsi' },
    {
      property: 'og:description',
      content:
        'Nusantara Kita adalah sebuah API yang menyediakan data wilayah Indonesia....'
    },
    { property: 'og:image', content: 'https://nusakita.yuefii.site/logo.png' },
    {
      property: 'og:url',
      content: 'https://nusakita.yuefii.site/data-wilayah/provinsi'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://nusakita.yuefii.site/data-wilayah/provinsi'
    }
  ]
})
</script>
