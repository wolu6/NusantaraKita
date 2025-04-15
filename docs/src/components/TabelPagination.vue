<template>
  <div class="container mx-auto p-4">
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white rounded-md overflow-hidden">
        <thead class="bg-zinc-700 text-white">
          <tr>
            <th class="py-3 px-4 text-left">Kode</th>
            <th class="py-3 px-4 text-left">Nama</th>
            <th class="py-3 px-4 text-left">Latitude</th>
            <th class="py-3 px-4 text-left">Longitude</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="item in data" :key="item.kode" class="hover:bg-gray-50">
            <td class="py-3 px-4">{{ item.kode }}</td>
            <td class="py-3 px-4">{{ item.nama }}</td>
            <td class="py-3 px-4">{{ item.lat }}</td>
            <td class="py-3 px-4">{{ item.lng }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex items-center justify-between mt-4">
      <div class="text-sm text-gray-700">
        Menampilkan
        {{
          (pagination.halaman_saat_ini - 1) * pagination.ukuran_halaman + 1
        }}
        sampai
        {{
          Math.min(
            pagination.halaman_saat_ini * pagination.ukuran_halaman,
            pagination.total_item
          )
        }}
        dari {{ pagination.total_item }} data
      </div>

      <div class="flex space-x-1">
        <button
          @click="changePage(pagination.halaman_saat_ini - 1)"
          :disabled="pagination.halaman_saat_ini === 1"
          class="px-3 py-1 rounded border bg-white disabled:opacity-50 hover:bg-gray-100 transition-colors"
        >
          Sebelumnya
        </button>

        <button
          v-for="page in visiblePages"
          :key="page"
          @click="changePage(page)"
          :class="{
            'bg-zinc-700 text-white border-zinc-700':
              pagination.halaman_saat_ini === page,
            'bg-white hover:bg-gray-100': pagination.halaman_saat_ini !== page
          }"
          class="px-3 py-1 rounded border transition-colors"
        >
          {{ page }}
        </button>

        <button
          @click="changePage(pagination.halaman_saat_ini + 1)"
          :disabled="pagination.halaman_saat_ini === totalPages"
          class="px-3 py-1 rounded border bg-white disabled:opacity-50 hover:bg-gray-100 transition-colors"
        >
          Selanjutnya
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

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

const props = defineProps<{
  data: Province[]
  pagination: Pagination
}>()

const emit = defineEmits<{
  (e: 'page-changed', page: number): void
}>()

const totalPages = computed(() => props.pagination.total_halaman)

const visiblePages = computed(() => {
  const current = props.pagination.halaman_saat_ini
  const total = totalPages.value
  const range = 2

  let start = Math.max(1, current - range)
  let end = Math.min(total, current + range)

  if (current <= range + 1) {
    end = Math.min(2 * range + 1, total)
  }

  if (current >= total - range) {
    start = Math.max(1, total - 2 * range)
  }

  const pages: number[] = []
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    emit('page-changed', page)
  }
}
</script>
