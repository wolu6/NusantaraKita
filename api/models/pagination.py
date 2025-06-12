from typing import TypedDict

class PaginationMeta(TypedDict):
    """
    Struktur metadata pagination untuk response yang mendukung pagination.

    Attributes:
        total_item (int): Jumlah total item yang tersedia pada response.
        total_halaman (int): Jumlah total halaman yang tersedia pada response.
        halaman_saat_ini (int): Halaman saat ini yang sedang diakses.
        ukuran_halaman (int): Jumlah item per halaman.
    """
    total_item: int
    total_halaman: int
    halaman_saat_ini: int
    ukuran_halaman: int
