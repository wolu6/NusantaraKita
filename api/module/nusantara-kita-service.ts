import prisma from "../lib/prisma/config";
import ResponseData from "../interface/response-data";

class NusantaraKitaService {
  async getAll(limit: number, page: number): Promise<ResponseData> {
    try {
      if (page <= 0) {
        throw new Error('invalid page number, page must be greater than 0');
      }
      const totalItems = await prisma.wilayah_Level_1_2.count();
      const totalPages = Math.ceil(totalItems / limit);
      if (page > totalPages) {
        throw new Error(`page number exceeds total pages. Maximum page is ${totalPages}`);
      }
      const skip = (page - 1) * limit;
      const rawData = await prisma.wilayah_Level_1_2.findMany({
        take: limit,
        skip: skip,
      });
      if (rawData.length === 0) {
        throw new Error('no data found for the requested page');
      }
      const data = rawData.map(item => ({
        kode: item.kode,
        nama: item.nama,
        ibu_kota: item.ibukota,
        lat: item.lat,
        lon: item.lng,
        luas: item.luas,
        penduduk: item.penduduk,
      }));

      const result: ResponseData = {
        pagination: {
          total_items: totalItems,
          total_pages: totalPages,
          current_page: page,
          page_size: limit,
        },
        data: data,
      };
      return result;
    } catch (error) {
      throw new Error('error fetching data: ' + error.message);
    }
  }
}

export default NusantaraKitaService
