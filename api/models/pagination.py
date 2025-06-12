from typing import TypedDict

class PaginationMeta(TypedDict):
    total_item: int
    total_halaman: int
    halaman_saat_ini: int
    ukuran_halaman: int
