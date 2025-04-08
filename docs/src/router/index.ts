import { createRouter, createWebHistory } from 'vue-router'
import Overview from '@/view/Overview.vue'
import TentangAPI from '@/view/TentangAPI.vue'
import PanduanInstalasi from '@/view/PanduanInstalasi.vue'
import GetProvinsi from '@/view/documentation/GetProvinsi.vue'
import GetKabKota from '@/view/documentation/GetKabKota.vue'
import GetKecamatan from '@/view/documentation/GetKecamatan.vue'
import GetDesaKel from '@/view/documentation/GetDesaKel.vue'
import Provinsi from '@/view/wilayah/Provinsi.vue'
import KabKota from '@/view/wilayah/KabKota.vue'
import Kecamatan from '@/view/wilayah/Kecamatan.vue'
import DesaKel from '@/view/wilayah/DesaKel.vue'
import FiturUtama from '@/view/FiturUtama.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Overview',
      component: Overview
    },
    {
      path: '/tentang-api',
      name: 'Tentang API',
      component: TentangAPI
    },
    {
      path: '/fitur-utama',
      name: 'Fitur Utama',
      component: FiturUtama
    },
    {
      path: '/panduan-instalasi',
      name: 'Panduan Instalasi',
      component: PanduanInstalasi
    },
    {
      path: '/api-documentation/get-provinsi',
      name: 'GET Provinsi',
      component: GetProvinsi
    },
    {
      path: '/api-documentation/get-kabupaten-kota',
      name: 'GET Kabupaten/Kota',
      component: GetKabKota
    },
    {
      path: '/api-documentation/get-kecamatan',
      name: 'GET Kecamatan',
      component: GetKecamatan
    },
    {
      path: '/api-documentation/get-desa-kelurahan',
      name: 'Get Desa/Kelurahan',
      component: GetDesaKel
    },
    {
      path: '/data-wilayah/provinsi',
      name: 'Data Provinsi',
      component: Provinsi
    },
    {
      path: '/data-wilayah/kabupaten-kota',
      name: 'Data Kabupaten/Kota',
      component: KabKota
    },
    {
      path: '/data-wilayah/kecamatan',
      name: 'Data Kecamatan',
      component: Kecamatan
    },
    {
      path: '/data-wilayah/desa-kelurahan',
      name: 'Data Desa/Kelurahan',
      component: DesaKel
    }
  ]
})

export default router
