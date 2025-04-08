<template>
  <div class="flex flex-1 flex-col p-4 2xl:max-w-6xl">
    <h1 class="p-4 text-2xl md:text-3xl font-bold text-gray-800">API Documentation - GET Provinsi</h1>
    <div class="p-4 mb-4 md:mb-6">
      <h2 class="text-lg md:text-xl font-semibold text-gray-700 mb-3 md:mb-4">Endpoint API</h2>
      <div class="bg-zinc-700 p-3 md:p-4 rounded-md overflow-x-auto">
        <code class="text-white text-sm md:text-base"><span class="text-green-600">GET</span> http://localhost:1945/v2/provinsi</code>
      </div>
    </div>
    <div class="p-4 mb-4 md:mb-6">
      <h2 class="text-lg md:text-xl font-semibold text-gray-700 mb-3 md:mb-4">Description</h2>
      <p class="text-gray-600 text-sm md:text-base">
        API ini digunakan untuk mendapatkan daftar provinsi beserta informasi geografisnya.
        Response akan menampilkan data provinsi dengan paginasi default, tetapi dapat dimodifikasi melalui parameter query.
      </p>
    </div>
    <div class="bg-white p-4 mb-4 md:mb-6">
      <h2 class="text-lg md:text-xl font-semibold text-gray-700 mb-3 md:mb-4">Query Parameters</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white text-sm md:text-base">
          <thead class="bg-zinc-700 text-white">
            <tr>
              <th class="py-2 px-3 md:px-4 border-b border-gray-300 text-left">Parameter</th>
              <th class="py-2 px-3 md:px-4 border-b border-gray-300 text-left">Type</th>
              <th class="py-2 px-3 md:px-4 border-b border-gray-300 text-left hidden sm:table-cell">Description</th>
              <th class="py-2 px-3 md:px-4 border-b border-gray-300 text-left">Default</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="param in parameters" :key="param.name">
              <td class="py-2 px-3 md:px-4 border-b border-gray-300 font-mono">{{ param.name }}</td>
              <td class="py-2 px-3 md:px-4 border-b border-gray-300">{{ param.type }}</td>
              <td class="py-2 px-3 md:px-4 border-b border-gray-300 hidden sm:table-cell">{{ param.description }}</td>
              <td class="py-2 px-3 md:px-4 border-b border-gray-300 font-mono">{{ param.default }}</td>
            </tr>
          </tbody>
        </table>
        <div class="sm:hidden mt-3 text-gray-600 text-sm">
          <p class="font-medium mb-1">Descriptions:</p>
          <ul class="list-disc pl-5 space-y-1">
            <li v-for="param in parameters" :key="'desc-'+param.name">
              <span class="font-mono">{{ param.name }}</span>: {{ param.description }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="bg-white p-4 mb-4 md:mb-6">
      <h2 class="text-lg md:text-xl font-semibold text-gray-700 mb-3 md:mb-4">Example Requests</h2>
      <div class="space-y-3 md:space-y-4">
        <div v-for="(example, index) in examples" :key="index">
          <p class="text-gray-700 font-medium mb-1 md:mb-2 text-sm md:text-base">{{ example.title }}</p>
          <div class="bg-zinc-700 p-3 md:p-4 rounded-md">
          <code class="text-white block text-xs md:text-sm overflow-x-auto"><span class="text-green-600">GET </span>{{ example.code }}</code>
        </div>
        </div>
      </div>
    </div>
    <div class="bg-white p-4 mb-4 md:mb-6">
      <h2 class="text-lg md:text-xl font-semibold text-gray-700 mb-3 md:mb-4">Response (Success)</h2>
      <div class="mb-3 md:mb-4">
        <p class="text-gray-600 mb-1 md:mb-2 text-sm md:text-base"><span class="font-medium">Format:</span> JSON</p>
        <p class="text-gray-600 text-sm md:text-base"><span class="font-medium">Struktur:</span></p>
        <ul class="list-disc pl-5 text-gray-600 mt-1 md:mt-2 text-sm md:text-base">
          <li class="mb-1"><code class="bg-gray-300 px-1 rounded">pagination</code> (object) - Hanya muncul jika <code class="bg-gray-100 px-1 rounded">pagination=true</code>:
            <ul class="list-disc pl-5 mt-1">
              <li class="mb-1"><code class="bg-gray-300 px-1 rounded">total_item</code> (integer) - Total seluruh provinsi</li>
              <li class="mb-1"><code class="bg-gray-300 px-1 rounded">total_halaman</code> (integer) - Total halaman berdasarkan limit</li>
              <li class="mb-1"><code class="bg-gray-300 px-1 rounded">halaman_saat_ini</code> (integer) - Halaman yang sedang diakses</li>
              <li><code class="bg-gray-300 px-1 rounded">ukuran_halaman</code> (integer) - Jumlah item per halaman</li>
            </ul>
          </li>
          <li><code class="bg-gray-300 px-1 rounded">data</code> (array) - Daftar provinsi:
            <ul class="list-disc pl-5 mt-1">
              <li class="mb-1"><code class="bg-gray-300 px-1 rounded">kode</code> (string) - Kode unik provinsi</li>
              <li class="mb-1"><code class="bg-gray-300 px-1 rounded">nama</code> (string) - Nama provinsi</li>
              <li class="mb-1"><code class="bg-gray-300 px-1 rounded">lat</code> (double) - Koordinat latitude</li>
              <li><code class="bg-gray-300 px-1 rounded">lng</code> (double) - Koordinat longitude</li>
            </ul>
          </li>
        </ul>
      </div>

      <h3 class="text-base md:text-lg font-medium text-gray-700 mb-2">Example Response (Default):</h3>
      <pre class="bg-zinc-700 text-white p-3 md:p-4 rounded-md overflow-x-auto text-xs md:text-sm">{{ defaultResponse }}</pre>

      <h3 class="text-base md:text-lg font-medium text-gray-700 mt-3 md:mt-4 mb-2">Example Response (Without Pagination):</h3>
      <pre class="bg-zinc-700 text-white p-3 md:p-4 rounded-md overflow-x-auto text-xs md:text-sm">{{ noPaginationResponse }}</pre>
    </div>
    <div class="bg-white p-4 mb-4 md:mb-6">
      <h2 class="text-lg md:text-xl font-semibold text-gray-700 mb-3 md:mb-4">Error Handling</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white text-sm md:text-base">
          <thead class="bg-zinc-700 text-white">
            <tr>
              <th class="py-2 px-3 md:px-4 border-b border-gray-300 text-left">Code</th>
              <th class="py-2 px-3 md:px-4 border-b border-gray-300 text-left hidden sm:table-cell">Description</th>
              <th class="py-2 px-3 md:px-4 border-b border-gray-300 text-left">Example</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="error in errors" :key="error.code">
              <td class="py-2 px-3 md:px-4 border-b border-gray-300 font-mono">{{ error.code }}</td>
              <td class="py-2 px-3 md:px-4 border-b border-gray-300 hidden sm:table-cell">{{ error.description }}</td>
              <td class="py-2 px-3 md:px-4 border-b border-gray-300 font-mono text-xs md:text-sm">{{ error.example }}</td>
            </tr>
          </tbody>
        </table>
        <div class="sm:hidden mt-3 text-gray-600 text-sm">
          <p class="font-medium mb-1">Descriptions:</p>
          <ul class="list-disc pl-5 space-y-1">
            <li v-for="error in errors" :key="'err-desc-'+error.code">
              <span class="font-mono">{{ error.code }}</span>: {{ error.description }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="bg-white p-4">
      <h2 class="text-lg md:text-xl font-semibold text-gray-700 mb-3 md:mb-4">Notes</h2>
      <ul class="list-disc pl-5 text-gray-600 space-y-1 text-sm md:text-base">
        <li>Jika <code class="bg-gray-300 px-1 rounded">pagination=false</code>, field <code class="bg-gray-100 px-1 rounded">pagination</code> tidak akan muncul di response</li>
        <li>Parameter dapat digabungkan sesuai kebutuhan</li>
      </ul>
    </div>
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
    name: 'halaman',
    type: 'integer',
    description: 'Menentukan halaman yang ingin ditampilkan',
    default: '1'
  }
]

const examples: Example[] = [
  {
    title: 'Default (dengan paginasi)',
    code: 'http://localhost:1945/v2/provinsi'
  },
  {
    title: 'Tanpa paginasi',
    code: 'http://localhost:1945/v2/provinsi?pagination=false'
  },
  {
    title: 'Custom limit per halaman',
    code: 'http://localhost:1945/v2/provinsi?limit=20'
  },
  {
    title: 'Menuju halaman tertentu',
    code: 'http://localhost:1945/v2/provinsi?halaman=2'
  },
  {
    title: 'Gabungan parameter',
    code: 'http://localhost:1945/v2/provinsi?pagination=true&limit=5&halaman=3'
  }
]

const defaultResponse = JSON.stringify({
  "pagination": {
    "total_item": 38,
    "total_halaman": 4,
    "halaman_saat_ini": 1,
    "ukuran_halaman": 10
  },
  "data": [
    {
      "kode": "11",
      "nama": "Aceh",
      "lat": 4.225728583038235,
      "lng": 96.91187408609952
    }
  ]
}, null, 2)

const noPaginationResponse = JSON.stringify({
  "data": [
    {
      "kode": "11",
      "nama": "Aceh",
      "lat": 4.225728583038235,
      "lng": 96.91187408609952
    }
  ]
}, null, 2)

const errors: Error[] = [
  {
    code: '400',
    description: 'Parameter tidak valid',
    example: '{"error": "nomor halaman tidak valid, halaman harus lebih besar dari 0"}'
  },
  {
    code: '404',
    description: 'Data tidak ditemukan',
    example: '{"error": "tidak ditemukan data"}'
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
