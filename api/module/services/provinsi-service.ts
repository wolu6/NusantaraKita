import prisma from "../../lib/prisma/config";

class ProvinsiServices {
  async Get(limit: number, halaman: number) {
    try {
      if (halaman <= 0) {
        throw new Error('nomor halaman tidak valid, halaman harus lebih besar dari 0');
      }
      const totalItem = await prisma.nk_provinsi.count();
      const totalHalaman = Math.ceil(totalItem / limit);
      if (halaman > totalHalaman) {
        throw new Error(`nomor halaman melebihi total halaman. Halaman maksimum adalah ${totalHalaman}`);
      }
      const skip = (halaman - 1) * limit;
      const data = await prisma.nk_provinsi.findMany({
        take: limit,
        skip: skip,
      });
      if (data.length === 0) {
        throw new Error('tidak ditemukan data untuk halaman yang diminta');
      }

      const result = {
        pagination: {
          total_item: totalItem,
          total_halaman: totalHalaman,
          halaman_saat_ini: halaman,
          ukuran_halaman: limit,
        },
        data: data,
      };
      return result;
    } catch (error) {
      throw new Error('Gagal mengambil data: ' + error.message);
    }
  }
}

export default ProvinsiServices
