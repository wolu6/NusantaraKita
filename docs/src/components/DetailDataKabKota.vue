<template>
  <Loading v-if="loading" />

  <ErrorFetchData
    v-else-if="error"
    :message="error"
    :on-retry="() => fetchData(pagination.halaman_saat_ini)"
  />

  <TabelPagination
    v-else
    :data="data"
    :pagination="pagination"
    @page-changed="fetchData"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Loading from '@/components/Loading.vue'
import ErrorFetchData from '@/components/ErrorFetchData.vue'
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

    const response = await axios.get(`${BASE_URL}/kab-kota`, {
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
