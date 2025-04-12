<template>
  <div class="p-4 mb-4 md:mb-6">
    <h2 class="text-lg md:text-xl font-semibold text-gray-700 mb-3 md:mb-4">
      Endpoint API (Semua Desa/Kelurahan)
    </h2>
    <div class="bg-zinc-700 p-3 md:p-4 rounded-md overflow-x-auto">
      <code class="text-white text-sm md:text-base"
        ><span class="text-green-600">GET</span>
        http://localhost:1945/v2/desa-kel</code
      >
    </div>
  </div>

  <!-- Endpoint Berdasarkan Provinsi -->
  <div class="p-4 mb-4 md:mb-6">
    <h2 class="text-lg md:text-xl font-semibold text-gray-700 mb-3 md:mb-4">
      Endpoint API (Desa/Keluarahan berdasarkan kode Kecamatan)
    </h2>
    <div class="bg-zinc-700 p-3 md:p-4 rounded-md overflow-x-auto">
      <code class="text-white text-sm md:text-base"
        ><span class="text-green-600">GET</span>
        http://localhost:1945/v2/{kodeKecamatan}/desa-kel</code
      >
    </div>
    <p class="mt-2 text-gray-600 text-sm">
      Ganti {kodeKecamatan} dengan kode Kecamatan yang valid
    </p>
  </div>

  <!-- Description Section -->
  <div class="p-4 mb-4 md:mb-6">
    <h2 class="text-lg md:text-xl font-semibold text-gray-700 mb-3 md:mb-4">
      Description
    </h2>
    <p class="text-gray-600 text-sm md:text-base">
      API ini digunakan untuk mendapatkan daftar Desa/Keluarahan beserta
      informasi geografisnya. Dapat menampilkan semua Desa/Kelurahan atau
      berdasarkan Kecamatan tertentu. Response akan menampilkan data dengan
      paginasi default, tetapi dapat dimodifikasi melalui parameter query.
    </p>
  </div>

  <!-- Query Parameters Section -->
  <div class="bg-white p-4 mb-4 md:mb-6">
    <h2 class="text-lg md:text-xl font-semibold text-gray-700 mb-3 md:mb-4">
      Query Parameters
    </h2>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white text-sm md:text-base">
        <thead class="bg-zinc-700 text-white">
          <tr>
            <th class="py-2 px-3 md:px-4 border-b border-gray-300 text-left">
              Parameter
            </th>
            <th class="py-2 px-3 md:px-4 border-b border-gray-300 text-left">
              Type
            </th>
            <th
              class="py-2 px-3 md:px-4 border-b border-gray-300 text-left hidden sm:table-cell"
            >
              Description
            </th>
            <th class="py-2 px-3 md:px-4 border-b border-gray-300 text-left">
              Default
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="param in parameters" :key="param.name">
            <td class="py-2 px-3 md:px-4 border-b border-gray-300 font-mono">
              {{ param.name }}
            </td>
            <td class="py-2 px-3 md:px-4 border-b border-gray-300">
              {{ param.type }}
            </td>
            <td
              class="py-2 px-3 md:px-4 border-b border-gray-300 hidden sm:table-cell"
            >
              {{ param.description }}
            </td>
            <td class="py-2 px-3 md:px-4 border-b border-gray-300 font-mono">
              {{ param.default }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="sm:hidden mt-3 text-gray-600 text-sm">
        <p class="font-medium mb-1">Descriptions:</p>
        <ul class="list-disc pl-5 space-y-1">
          <li v-for="param in parameters" :key="'desc-' + param.name">
            <span class="font-mono">{{ param.name }}</span
            >: {{ param.description }}
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Example Requests Section -->
  <div class="bg-white p-4 mb-4 md:mb-6">
    <h2 class="text-lg md:text-xl font-semibold text-gray-700 mb-3 md:mb-4">
      Example Requests
    </h2>
    <div class="space-y-3 md:space-y-4">
      <div v-for="(example, index) in examples" :key="index">
        <p class="text-gray-700 font-medium mb-1 md:mb-2 text-sm md:text-base">
          {{ example.title }}
        </p>
        <div class="bg-zinc-700 p-3 md:p-4 rounded-md">
          <code class="text-white block text-xs md:text-sm overflow-x-auto"
            ><span class="text-green-600">GET </span>{{ example.code }}</code
          >
        </div>
      </div>
    </div>
  </div>

  <!-- Response Section -->
  <div class="bg-white p-4 mb-4 md:mb-6">
    <h2 class="text-lg md:text-xl font-semibold text-gray-700 mb-3 md:mb-4">
      Response (Success)
    </h2>
    <div class="mb-3 md:mb-4">
      <p class="text-gray-600 mb-1 md:mb-2 text-sm md:text-base">
        <span class="font-medium">Format:</span> JSON
      </p>
      <p class="text-gray-600 text-sm md:text-base">
        <span class="font-medium">Struktur:</span>
      </p>
      <ul
        class="list-disc pl-5 text-gray-600 mt-1 md:mt-2 text-sm md:text-base"
      >
        <li class="mb-1">
          <code class="bg-gray-300 px-1 rounded">pagination</code> (object) -
          Hanya muncul jika
          <code class="bg-gray-100 px-1 rounded">pagination=true</code>:
          <ul class="list-disc pl-5 mt-1">
            <li class="mb-1">
              <code class="bg-gray-300 px-1 rounded">total_item</code>
              (integer) - Total seluruh Desa/Kelurahan
            </li>
            <li class="mb-1">
              <code class="bg-gray-300 px-1 rounded">total_halaman</code>
              (integer) - Total halaman berdasarkan limit
            </li>
            <li class="mb-1">
              <code class="bg-gray-300 px-1 rounded">halaman_saat_ini</code>
              (integer) - Halaman yang sedang diakses
            </li>
            <li>
              <code class="bg-gray-300 px-1 rounded">ukuran_halaman</code>
              (integer) - Jumlah item per halaman
            </li>
          </ul>
        </li>
        <li>
          <code class="bg-gray-300 px-1 rounded">data</code> (array) - Daftar
          Desa/Kelurahan:
          <ul class="list-disc pl-5 mt-1">
            <li class="mb-1">
              <code class="bg-gray-300 px-1 rounded">kode</code> (string) - Kode
              unik Desa/Kelurahan
            </li>
            <li class="mb-1">
              <code class="bg-gray-300 px-1 rounded">nama</code> (string) - Nama
              Desa/Kelurahan
            </li>
            <li class="mb-1">
              <code class="bg-gray-300 px-1 rounded">lat</code> (double) -
              Koordinat latitude
            </li>
            <li>
              <code class="bg-gray-300 px-1 rounded">lng</code> (double) -
              Koordinat longitude
            </li>
            <li class="mb-1">
              <code class="bg-gray-300 px-1 rounded">kode_kecamatan</code>
              (string) - Kode Kecamatan induk
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <h3 class="text-base md:text-lg font-medium text-gray-700 mb-2">
      Example Response (Default):
    </h3>
    <pre
      class="bg-zinc-700 text-white p-3 md:p-4 rounded-md overflow-x-auto text-xs md:text-sm"
      >{{ defaultResponse }}</pre
    >

    <h3
      class="text-base md:text-lg font-medium text-gray-700 mt-3 md:mt-4 mb-2"
    >
      Example Response (Without Pagination):
    </h3>
    <pre
      class="bg-zinc-700 text-white p-3 md:p-4 rounded-md overflow-x-auto text-xs md:text-sm"
      >{{ noPaginationResponse }}</pre
    >
  </div>

  <!-- Error Handling Section -->
  <div class="bg-white p-4 mb-4 md:mb-6">
    <h2 class="text-lg md:text-xl font-semibold text-gray-700 mb-3 md:mb-4">
      Error Handling
    </h2>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white text-sm md:text-base">
        <thead class="bg-zinc-700 text-white">
          <tr>
            <th class="py-2 px-3 md:px-4 border-b border-gray-300 text-left">
              Code
            </th>
            <th
              class="py-2 px-3 md:px-4 border-b border-gray-300 text-left hidden sm:table-cell"
            >
              Description
            </th>
            <th class="py-2 px-3 md:px-4 border-b border-gray-300 text-left">
              Example
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="error in errors" :key="error.code">
            <td class="py-2 px-3 md:px-4 border-b border-gray-300 font-mono">
              {{ error.code }}
            </td>
            <td
              class="py-2 px-3 md:px-4 border-b border-gray-300 hidden sm:table-cell"
            >
              {{ error.description }}
            </td>
            <td
              class="py-2 px-3 md:px-4 border-b border-gray-300 font-mono text-xs md:text-sm"
            >
              {{ error.example }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="sm:hidden mt-3 text-gray-600 text-sm">
        <p class="font-medium mb-1">Descriptions:</p>
        <ul class="list-disc pl-5 space-y-1">
          <li v-for="error in errors" :key="'err-desc-' + error.code">
            <span class="font-mono">{{ error.code }}</span
            >: {{ error.description }}
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="bg-white p-4">
    <h2 class="text-lg md:text-xl font-semibold text-gray-700 mb-3 md:mb-4">
      Notes
    </h2>
    <ul class="list-disc pl-5 text-gray-600 space-y-1 text-sm md:text-base">
      <li>
        Jika <code class="bg-gray-300 px-1 rounded">pagination=false</code>,
        field <code class="bg-gray-100 px-1 rounded">pagination</code> tidak
        akan muncul di response
      </li>
      <li>Parameter dapat digabungkan sesuai kebutuhan</li>
      <li>
        Untuk endpoint berdasarkan Kecamatan, pastikan kode Kecamatan valid
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Parameter {
  name: string
  type: string
  description: string
  default: string
}

interface Example {
  title: string
  code: string
}

interface Error {
  code: string
  description: string
  example: string
}

const parameters: Parameter[] = [
  {
    name: 'pagination',
    type: 'boolean',
    description: 'Menampilkan/menyembunyikan informasi paginasi (true/false)',
    default: 'true'
  },
  {
    name: 'limit',
    type: 'integer',
    description: 'Menentukan jumlah item per halaman',
    default: '10'
  },
  {
    name: 'page',
    type: 'integer',
    description: 'Menentukan halaman yang ingin ditampilkan',
    default: '1'
  }
]

const examples: Example[] = [
  {
    title: 'Semua Desa/Kelurahan (dengan paginasi)',
    code: 'http://localhost:1945/v2/desa-kel'
  },
  {
    title: 'Semua Desa/Kelurahan (tanpa paginasi)',
    code: 'http://localhost:1945/v2/desa-kel?pagination=false'
  },
  {
    title: 'Custom limit per halaman',
    code: 'http://localhost:1945/v2/desa-kel?limit=20'
  },
  {
    title: 'Menuju halaman tertentu',
    code: 'http://localhost:1945/v2/desa-kel?page=2'
  },
  {
    title: 'Desa/Kelurahan berdasarkan kode Kecamatan',
    code: 'http://localhost:1945/v2/11.01/desa-kel'
  },
  {
    title: 'Gabungan parameter',
    code: 'http://localhost:1945/v2/desa-kel?pagination=true&limit=5&page=3'
  }
]

const defaultResponse = JSON.stringify(
  {
    pagination: {
      total_item: 516,
      total_halaman: 52,
      halaman_saat_ini: 1,
      ukuran_halaman: 10
    },
    data: [
      {
        kode: '11.01.01.2001',
        nama: 'Keude Bakongan',
        lat: 2.931094803160483,
        lng: 97.48458404258515,
        kode_kecamatan: '11.01.01'
      }
    ]
  },
  null,
  1
)

const noPaginationResponse = JSON.stringify(
  {
    data: [
      {
        kode: '11.01.01.2001',
        nama: 'Keude Bakongan',
        lat: 2.931094803160483,
        lng: 97.48458404258515,
        kode_kecamatan: '11.01.01'
      }
    ]
  },
  null,
  1
)

const errors: Error[] = [
  {
    code: '400',
    description: 'Parameter tidak valid',
    example:
      '{"error": "nomor halaman tidak valid, halaman harus lebih besar dari 0"}'
  },
  {
    code: '404',
    description: 'Data tidak ditemukan',
    example: '{"error": "tidak ditemukan data desa/kelurahan"}'
  },
  {
    code: '500',
    description: 'Server error',
    example: '{"error": "Gagal mengambil data: [error detail]"}'
  }
]
</script>

<style>
code {
  word-break: break-word;
}
</style>
