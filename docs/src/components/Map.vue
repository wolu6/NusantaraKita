<template>
  <div
    ref="mapContainer"
    class="h-[500px] w-full rounded-md border"
    style="z-index: 0"
  />
</template>

<script setup lang="ts">
import L from 'leaflet'
import { onUnmounted, onMounted, ref, watch } from 'vue'
import 'leaflet/dist/leaflet.css'

const fixLeafletIcon = () => {
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: new URL(
      'leaflet/dist/images/marker-icon-2x.png',
      import.meta.url
    ).href,
    iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url)
      .href,
    shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url)
      .href
  })
}

const props = defineProps({
  lat: {
    type: Number,
    required: true,
    validator: (value: number) => !isNaN(value)
  },
  lng: {
    type: Number,
    required: true,
    validator: (value: number) => !isNaN(value)
  },
  namaProvinsi: {
    type: String,
    default: 'Lokasi'
  }
})

const mapContainer = ref(null)
let map: L.Map | null = null
let marker: L.Marker | null = null

const initMap = () => {
  if (mapContainer.value && !isNaN(props.lat) && !isNaN(props.lng)) {
    if (map) {
      map.remove()
    }

    map = L.map(mapContainer.value).setView([props.lat, props.lng], 10)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    if (marker) {
      map.removeLayer(marker)
    }

    marker = L.marker([props.lat, props.lng]).addTo(map).bindPopup(`
        <b>${props.namaProvinsi}</b><br>
        Latitude: ${props.lat.toFixed(4)}<br>
        Longitude: ${props.lng.toFixed(4)}
      `)
  }
}

fixLeafletIcon()

watch(
  () => [props.lat, props.lng, props.namaProvinsi],
  () => {
    initMap()
  },
  { immediate: true }
)

onMounted(() => {
  initMap()
})

onUnmounted(() => {
  if (map) {
    map.remove()
  }
})
</script>
