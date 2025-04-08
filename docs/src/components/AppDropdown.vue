<template>
  <div class="w-full mx-auto space-y-4">
    <div v-if="isLoading">Memuat data provinsi...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else>
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <label for="provinsi" class="block mb-2 text-sm font-medium text-gray-900">
            Pilih Provinsi
          </label>
          <select id="provinsi" v-model="selectedProvinsiKode"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option value="">-- Pilih Provinsi --</option>
            <option v-for="provinsi in provinsiList" :key="provinsi.kode" :value="provinsi.kode">
              {{ provinsi.nama }}
            </option>
          </select>
        </div>

        <div v-if="selectedProvinsiKode" class="flex-1">
          <label for="kabupaten" class="block mb-2 text-sm font-medium text-gray-900">
            Pilih Kabupaten/Kota
          </label>
          <div v-if="isLoadingKabupaten">Memuat data kabupaten/kota...</div>
          <select v-else id="kabupaten" v-model="selectedKabupatenKotaKode"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option value="">-- Pilih Kabupaten/Kota --</option>
            <option v-for="kabupaten in kabupatenKotaList" :key="kabupaten.kode" :value="kabupaten.kode">
              {{ kabupaten.nama }}
            </option>
          </select>
        </div>

        <div v-if="selectedKabupatenKotaKode" class="flex-1">
          <label for="kecamatan" class="block mb-2 text-sm font-medium text-gray-900">
            Pilih Kecamatan
          </label>
          <div v-if="isLoadingKecamatan">Memuat data kecamatan...</div>
          <select v-else id="kecamatan" v-model="selectedKecamatanKode"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option value="">-- Pilih Kecamatan --</option>
            <option v-for="kecamatan in kecamatanList" :key="kecamatan.kode" :value="kecamatan.kode">
              {{ kecamatan.nama }}
            </option>
          </select>
        </div>

        <div v-if="selectedKecamatanKode" class="flex-1">
          <label for="desa" class="block mb-2 text-sm font-medium text-gray-900">
            Pilih Desa/Kelurahan
          </label>
          <div v-if="isLoadingDesa">Memuat data desa/kelurahan...</div>
          <select v-else id="desa" v-model="selectedDesaKelurahanKode"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option value="">-- Pilih Desa/Kelurahan --</option>
            <option v-for="desa in desaKelurahanList" :key="desa.kode" :value="desa.kode">
              {{ desa.nama }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
  <div class="mt-4">
    <Map :namaProvinsi="mapData.nama" :lat="mapData.lat" :lng="mapData.lng" />
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import Map from '@/components/Map.vue'
import { watch, ref, onMounted, computed } from 'vue'

const DEFAULT_PROVINSI = {
  kode: '31',
  nama: 'DKI Jakarta',
  lat: -6.2088,
  lng: 106.8456
}

interface Provinsi {
  kode: string
  nama: string
  lat: number
  lng: number
}

const provinsiList = ref < Provinsi[] > ([])
interface KabupatenKota {
  kode: string
  nama: string
  lat: number
  lng: number
}

const kabupatenKotaList = ref < KabupatenKota[] > ([])
interface Kecamatan {
  kode: string
  nama: string
  lat: number
  lng: number
}

const kecamatanList = ref < Kecamatan[] > ([])

interface DesaKelurahan {
  kode: string
  nama: string
  lat: number
  lng: number
}

const desaKelurahanList = ref < DesaKelurahan[] > ([])

const selectedProvinsiKode = ref('')
const selectedKabupatenKotaKode = ref('')
const selectedKecamatanKode = ref('')
const selectedDesaKelurahanKode = ref('')

const isLoading = ref(false)
const isLoadingKabupaten = ref(false)
const isLoadingKecamatan = ref(false)
const isLoadingDesa = ref(false)
const error = ref < string | null > (null)

const mapData = ref({
  nama: DEFAULT_PROVINSI.nama,
  lat: DEFAULT_PROVINSI.lat,
  lng: DEFAULT_PROVINSI.lng
})

const BASE_URL = import.meta.env.VITE_API_URL || ''

const fetchProvinsi = async () => {
  try {
    isLoading.value = true
    const response = await axios.get(`${BASE_URL}/provinsi?pagination=false`)
    provinsiList.value = response.data.data
  } catch (err) {
    error.value = (err as Error).message
    console.error('Error fetching provinsi:', err)
  } finally {
    isLoading.value = false
  }
}

const fetchKabupatenKota = async (kodeProvinsi: string) => {
  try {
    isLoadingKabupaten.value = true
    kabupatenKotaList.value = []
    selectedKabupatenKotaKode.value = ''
    kecamatanList.value = []
    selectedKecamatanKode.value = ''
    desaKelurahanList.value = []
    selectedDesaKelurahanKode.value = ''

    const response = await axios.get(`${BASE_URL}/${kodeProvinsi}/kab-kota?pagination=false`)
    kabupatenKotaList.value = response.data.data

    const provinsi = provinsiList.value.find(p => p.kode === kodeProvinsi)
    if (provinsi) {
      updateMapData(provinsi.nama, provinsi.lat, provinsi.lng)
    }
  } catch (err) {
    error.value = (err as Error).message
    console.error('Error fetching kabupaten/kota:', err)
  } finally {
    isLoadingKabupaten.value = false
  }
}

const fetchKecamatan = async (kodeKabupaten: string) => {
  try {
    isLoadingKecamatan.value = true
    kecamatanList.value = []
    selectedKecamatanKode.value = ''
    desaKelurahanList.value = []
    selectedDesaKelurahanKode.value = ''

    const response = await axios.get(`${BASE_URL}/${kodeKabupaten}/kecamatan?pagination=false`)
    kecamatanList.value = response.data.data

    const kabupaten = kabupatenKotaList.value.find(k => k.kode === kodeKabupaten)
    if (kabupaten) {
      updateMapData(`${kabupaten.nama}, ${selectedProvinsi.value.nama}`, kabupaten.lat, kabupaten.lng)
    }
  } catch (err) {
    error.value = (err as Error).message
    console.error('Error fetching kecamatan:', err)
  } finally {
    isLoadingKecamatan.value = false
  }
}

const fetchDesaKelurahan = async (kodeKecamatan: string) => {
  try {
    isLoadingDesa.value = true
    desaKelurahanList.value = []
    selectedDesaKelurahanKode.value = ''

    const response = await axios.get(`${BASE_URL}/${kodeKecamatan}/desa-kel?pagination=false`)
    desaKelurahanList.value = response.data.data

    const kecamatan = kecamatanList.value.find(k => k.kode === kodeKecamatan)
    if (kecamatan) {
      updateMapData(
        `${kecamatan.nama}, ${selectedKabupaten.value?.nama || ''}, ${selectedProvinsi.value.nama}`,
        kecamatan.lat,
        kecamatan.lng
      )
    }
  } catch (err) {
    error.value = (err as Error).message
    console.error('Error fetching desa/kelurahan:', err)
  } finally {
    isLoadingDesa.value = false
  }
}

const updateMapData = (nama: string, lat: number, lng: number) => {
  mapData.value = { nama, lat, lng }
}

watch(selectedProvinsiKode, (newValue) => {
  if (newValue) {
    fetchKabupatenKota(newValue)
  } else {
    kabupatenKotaList.value = []
    kecamatanList.value = []
    desaKelurahanList.value = []
    updateMapData(DEFAULT_PROVINSI.nama, DEFAULT_PROVINSI.lat, DEFAULT_PROVINSI.lng)
  }
})

watch(selectedKabupatenKotaKode, (newValue) => {
  if (newValue) {
    fetchKecamatan(newValue)
  } else {
    kecamatanList.value = []
    desaKelurahanList.value = []
    const provinsi = selectedProvinsi.value
    updateMapData(provinsi.nama, provinsi.lat, provinsi.lng)
  }
})

watch(selectedKecamatanKode, (newValue) => {
  if (newValue) {
    fetchDesaKelurahan(newValue)
  } else {
    desaKelurahanList.value = []
    const kabupaten = selectedKabupaten.value
    if (kabupaten) {
      updateMapData(
        `${kabupaten.nama}, ${selectedProvinsi.value.nama}`,
        kabupaten.lat,
        kabupaten.lng
      )
    }
  }
})

watch(selectedDesaKelurahanKode, (newValue) => {
  if (newValue) {
    const desa = desaKelurahanList.value.find(d => d.kode === newValue)
    if (desa) {
      updateMapData(
        `${desa.nama}, ${selectedKecamatan.value?.nama || ''}, ${selectedKabupaten.value?.nama || ''}`,
        desa.lat,
        desa.lng
      )
    }
  } else {
    const kecamatan = selectedKecamatan.value
    if (kecamatan) {
      updateMapData(
        `${kecamatan.nama}, ${selectedKabupaten.value?.nama || ''}`,
        kecamatan.lat,
        kecamatan.lng
      )
    }
  }
})

const selectedProvinsi = computed(() => {
  if (!selectedProvinsiKode.value) return DEFAULT_PROVINSI
  return provinsiList.value.find(prov => prov.kode === selectedProvinsiKode.value) || DEFAULT_PROVINSI
})

const selectedKabupaten = computed(() => {
  if (!selectedKabupatenKotaKode.value) return null
  return kabupatenKotaList.value.find(kab => kab.kode === selectedKabupatenKotaKode.value)
})

const selectedKecamatan = computed(() => {
  if (!selectedKecamatanKode.value) return null
  return kecamatanList.value.find(kec => kec.kode === selectedKecamatanKode.value)
})

onMounted(() => {
  fetchProvinsi()
})
</script>
