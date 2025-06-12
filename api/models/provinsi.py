from typing import TypedDict, List
from .pagination import PaginationMeta

class Provinsi(TypedDict):
    kode: str
    nama: str
    lat: float
    lng: float

class PaginatedProvinsiResponse(TypedDict):
    pagination: PaginationMeta
    data: List[Provinsi]

class ProvinsiListResponse(TypedDict):
    data: List[Provinsi]
