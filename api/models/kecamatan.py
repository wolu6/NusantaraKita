from typing import TypedDict, List
from .pagination import PaginationMeta

class Kecamatan(TypedDict):
    kode: str
    nama: str
    lat: float
    lng: float
    kode_kabupaten_kota: str

class PaginatedKecamatanResponse(TypedDict):
    pagination: PaginationMeta
    data: List[Kecamatan]

class KecamatanListResponse(TypedDict):
    data: List[Kecamatan]
