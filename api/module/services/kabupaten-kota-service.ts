import prisma from '../../lib/prisma/config'

class KabupatenKotaServices {
  async Get(limit: number, halaman: number) {
    try {
      if (halaman <= 0) {
        throw new Error(
          'nomor halaman tidak valid, halaman harus lebih besar dari 0'
        )
      }
      const totalItem = await prisma.nk_kabupaten_kota.count()
      const totalHalaman = Math.ceil(totalItem / limit)
      if (halaman > totalHalaman) {
        throw new Error(
          `nomor halaman melebihi total halaman. Halaman maksimum adalah ${totalHalaman}`
        )
      }
      const skip = (halaman - 1) * limit
      const data = await prisma.nk_kabupaten_kota.findMany({
        take: limit,
        skip: skip
      })
      if (data.length === 0) {
        throw new Error('tidak ditemukan data untuk halaman yang diminta')
      }

      const result = {
        pagination: {
          total_item: totalItem,
          total_halaman: totalHalaman,
          halaman_saat_ini: halaman,
          ukuran_halaman: limit
        },
        data: data
      }
      return result
    } catch (error) {
      throw new Error('Gagal mengambil data: ' + error.message)
    }
  }

  async GetByProvinsi(
    kodeProvinsi: string,
    limit: number,
    halaman: number,
    pagination: boolean
  ) {
    try {
      const whereCondition = {
        kode_provinsi: kodeProvinsi
      }

      if (!pagination) {
        const data = await prisma.nk_kabupaten_kota.findMany({
          where: whereCondition
        })
        if (data.length === 0) {
          throw new Error('tidak ditemukan data')
        }

        return { data }
      }

      if (halaman <= 0) {
        throw new Error(
          'nomor halaman tidak valid, halaman harus lebih besar dari 0'
        )
      }

      const totalItem = await prisma.nk_kabupaten_kota.count({
        where: whereCondition
      })

      const totalHalaman = Math.ceil(totalItem / limit)

      if (halaman > totalHalaman) {
        throw new Error(
          `nomor halaman melebihi total halaman. Halaman maksimum adalah ${totalHalaman}`
        )
      }

      const skip = (halaman - 1) * limit
      const data = await prisma.nk_kabupaten_kota.findMany({
        where: whereCondition,
        take: limit,
        skip: skip
      })

      if (data.length === 0) {
        throw new Error(
          'tidak ditemukan data kabupaten untuk kode provinsi dan halaman yang diminta'
        )
      }

      const result = {
        pagination: {
          total_item: totalItem,
          total_halaman: totalHalaman,
          halaman_saat_ini: halaman,
          ukuran_halaman: limit
        },
        data: data
      }
      return result
    } catch (error) {
      throw new Error('Gagal mengambil data: ' + error.message)
    }
  }
}

export default KabupatenKotaServices
