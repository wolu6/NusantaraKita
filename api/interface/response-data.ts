interface Pagination {
  total_items: number;
  total_pages: number;
  current_page: number;
  page_size: number;
}

interface Data {
  kode: string;
  nama: string;
  ibu_kota: string;
  lat: number;
  lon: number;
  luas: number;
  penduduk: number;
}

interface ResponseData {
  pagination: Pagination;
  data: Data[];
}

export default ResponseData;
