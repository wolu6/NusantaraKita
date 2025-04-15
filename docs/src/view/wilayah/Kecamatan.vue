<template>
  <div class="flex flex-1 flex-col gap-4 p-4">
    <div class="p-8">
      <h1 class="p-4 text-2xl md:text-3xl font-bold text-gray-800">
        Data Kecamatan
      </h1>

      <div v-if="loading" class="text-center py-[200px]">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-zinc-700 mb-2"
        ></div>
        <p>Memuat data...</p>
      </div>

      <div
        v-else-if="error"
        class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4"
      >
        <p class="font-bold">Terjadi kesalahan</p>
        <p>{{ error }}</p>
        <button
          @click="fetchData(pagination.halaman_saat_ini)"
          class="mt-2 px-3 py-1 bg-red-100 hover:bg-red-200 rounded text-red-700 transition-colors"
        >
          Coba Lagi
        </button>
      </div>

      <TabelPagination
        v-else
        :data="data"
        :pagination="pagination"
        @page-changed="fetchData"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import TabelPagination from '@/components/TabelPagination.vue'

interface Pagination {
  total_item: number
  total_halaman: number
  halaman_saat_ini: number
  ukuran_halaman: number
}

interface Province {
  kode: string
  nama: string
  lat: number
  lng: number
}

const data = ref<Province[]>([])
const pagination = ref<Pagination>({
  total_item: 0,
  total_halaman: 0,
  halaman_saat_ini: 1,
  ukuran_halaman: 10
})
const loading = ref(false)
const error = ref<string | null>(null)
const BASE_URL = import.meta.env.VITE_API_URL || ''

const fetchData = async (page: number = 1) => {
  try {
    loading.value = true
    error.value = null

    const response = await axios.get(`${BASE_URL}/kecamatan`, {
      params: {
        halaman: page
      }
    })

    data.value = response.data.data
    pagination.value = response.data.pagination

    window.history.pushState({}, '', `?halaman=${page}`)
  } catch (err) {
    error.value = axios.isAxiosError(err)
      ? err.response?.data?.message || 'Gagal memuat data. Silakan coba lagi.'
      : 'Terjadi kesalahan'
    console.error('Error fetching data:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const initialPage = urlParams.get('halaman') || 1
  fetchData(Number(initialPage))
})
</script>
