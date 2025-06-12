from typing import TypedDict, List
from .pagination import PaginationMeta

class KabupatenKota(TypedDict):
    kode: str
    nama: str
    lat: float
    lng: float
    kode_provinsi: str

class PaginatedKabupatenKotaResponse(TypedDict):
    pagination: PaginationMeta
    data: List[KabupatenKota]

class KabupatenKotaListResponse(TypedDict):
    data: List[KabupatenKota]
