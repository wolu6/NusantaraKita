import aiomysql
from typing import List, Union
from config import get_connection
from models.kecamatan import Kecamatan, KecamatanListResponse, PaginatedKecamatanResponse


class KecamatanService:
    async def get(
            self, 
            limit: int, 
            halaman: int, 
            pagination: bool
            ) -> Union[KecamatanListResponse, PaginatedKecamatanResponse]:
        conn = await get_connection()
        async with conn.cursor(aiomysql.DictCursor) as cursor:
            try:
                if not pagination:
                    await cursor.execute("SELECT * FROM nk_kecamatan")
                    data: List[Kecamatan] = await cursor.fetchall()
                    if not data:
                        raise Exception("tidak ditemukan data")
                    return {"data": data}

                if halaman <= 0:
                    raise Exception(
                        "nomor halaman tidak valid, halaman harus lebih besar dari 0"
                    )

                await cursor.execute("SELECT COUNT(*) AS total FROM nk_kecamatan")
                total_item: int = (await cursor.fetchone())["total"]
                total_halaman: int = -(-total_item // limit)

                if halaman > total_halaman:
                    raise Exception(
                        f"nomor halaman melebihi total halaman. Halaman maksimum adalah {total_halaman}"
                    )

                offset: int = (halaman - 1) * limit
                await cursor.execute(
                    "SELECT * FROM nk_kecamatan LIMIT %s OFFSET %s", (limit, offset)
                )
                data: List[Kecamatan] = await cursor.fetchall()

                if not data:
                    raise Exception("tidak ditemukan data untuk halaman yang diminta")

                return {
                    "pagination": {
                        "total_item": total_item,
                        "total_halaman": total_halaman,
                        "halaman_saat_ini": halaman,
                        "ukuran_halaman": limit,
                    },
                    "data": data,
                }
            finally:
                conn.close()

    async def get_by_kabupaten_kota(
            self, 
            kode_kabupaten_kota: str, 
            limit: int, 
            halaman: int, 
            pagination: bool
            ) -> Union[KecamatanListResponse, PaginatedKecamatanResponse]:
        conn = await get_connection()
        async with conn.cursor(aiomysql.DictCursor) as cursor:
            try:
                if not pagination:
                    await cursor.execute("SELECT * FROM nk_kecamatan WHERE kode_kabupaten_kota = %s", 
                                         (kode_kabupaten_kota,))
                    data: List[Kecamatan] = await cursor.fetchall()
                    if not data:
                        raise Exception("tidak ditemukan data untuk kode provinsi tersebut")
                    return {"data": data}

                if halaman <= 0:
                    raise Exception("nomor halaman tidak valid, halaman harus lebih besar dari 0")

                await cursor.execute(
                    "SELECT COUNT(*) AS total FROM nk_kecamatan WHERE kode_kabupaten_kota = %s",
                    (kode_kabupaten_kota,)
                )
                total_item: int = (await cursor.fetchone())["total"]
                total_halaman: int = -(-total_item // limit)

                if halaman > total_halaman:
                    raise Exception(f"nomor halaman melebihi total halaman. Halaman maksimum adalah {total_halaman}")

                offset: int = (halaman - 1) * limit
                await cursor.execute(
                    "SELECT * FROM nk_kecamatan WHERE kode_kabupaten_kota = %s LIMIT %s OFFSET %s",
                    (kode_kabupaten_kota, limit, offset)
                )
                data: List[Kecamatan] = await cursor.fetchall()

                if not data:
                    raise Exception("tidak ditemukan data untuk halaman yang diminta")

                return {
                    "pagination": {
                        "total_item": total_item,
                        "total_halaman": total_halaman,
                        "halaman_saat_ini": halaman,
                        "ukuran_halaman": limit,
                    },
                    "data": data,
                }
            finally:
                conn.close()
