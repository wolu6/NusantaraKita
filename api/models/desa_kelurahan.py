from typing import TypedDict, List
from .pagination import PaginationMeta

class DesaKelurahan(TypedDict):
    kode: str
    nama: str
    lat: float
    lng: float
    kode_kecamatan: str

class PaginatedDesaKelurahanResponse(TypedDict):
    pagination: PaginationMeta
    data: List[DesaKelurahan]

class DesaKelurahanListResponse(TypedDict):
    data: List[DesaKelurahan]
