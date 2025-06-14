import axiosInstance from "@/lib/axios";
import { useInfiniteQuery } from "@tanstack/react-query";

interface GetDesaByKecamatanIdInfiniteParams extends ParamsApi {
  kodeKecamatan: string;
}

// Fetcher infinite
export const getDesaByKecamatanIdInfinite = async (params: GetDesaByKecamatanIdInfiniteParams) => {
  const response = await axiosInstance.get(`${params.kodeKecamatan}/desa-kel`, {
    params: {
      pagination: params.pagination,
      limit: params.limit,
      halaman: params.halaman,
    },
  });
  return response.data;
};

// Custom hook infinite query
const useGetDesaByKecamatanIdInfiniteScroll = (params: GetDesaByKecamatanIdInfiniteParams, queryOptions?: { enabled?: boolean }) => {
  return useInfiniteQuery({
    queryKey: ["desa-by-kecamatan-infinite", params.kodeKecamatan, params.limit, params.pagination],
    queryFn: ({ pageParam }) => getDesaByKecamatanIdInfinite({ ...params, halaman: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { halaman_saat_ini, total_halaman } = lastPage.pagination;
      return halaman_saat_ini < total_halaman ? halaman_saat_ini + 1 : undefined;
    },
    refetchOnWindowFocus: false,
    retry: false,
    enabled: queryOptions?.enabled ?? true,
  });
};

export default useGetDesaByKecamatanIdInfiniteScroll;
