<script setup lang="ts">
import { onUnmounted, onMounted, ref, watch } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

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
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    if (marker) {
      map.removeLayer(marker)
    }

    marker = L.marker([props.lat, props.lng]).addTo(map)
      .bindPopup(`
        <b>${props.namaProvinsi}</b><br>
        Latitude: ${props.lat.toFixed(4)}<br>
        Longitude: ${props.lng.toFixed(4)}
      `)
  }
}

watch(() => [props.lat, props.lng, props.namaProvinsi], () => {
  initMap()
}, { immediate: true })

onMounted(() => {
  initMap()
})

onUnmounted(() => {
  if (map) {
    map.remove()
  }
})
</script>

<template>
  <div ref="mapContainer" class="h-[500px] w-full rounded-md border" style="z-index: 0;"></div>
</template>
