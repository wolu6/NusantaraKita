import axiosInstance from "@/lib/axios";
import { useInfiniteQuery } from "@tanstack/react-query";

interface GetKecamatanByKabKotaIdInfiniteParams extends ParamsApi {
  kodeKabKota: string;
}

// Fetcher infinite
export const getKecamatanByKabKotaIdInfinite = async (params: GetKecamatanByKabKotaIdInfiniteParams) => {
  const response = await axiosInstance.get(`${params.kodeKabKota}/kecamatan`, {
    params: {
      pagination: params.pagination,
      limit: params.limit,
      halaman: params.halaman,
    },
  });
  return response.data;
};

// Custom hook infinite query
const useGetKecamatanByKabKotaIdInfiniteScroll = (params: GetKecamatanByKabKotaIdInfiniteParams, queryOptions?: { enabled?: boolean }) => {
  return useInfiniteQuery({
    queryKey: ["kecamatan-by-kabkota-infinite", params.kodeKabKota, params.limit, params.pagination],
    queryFn: ({ pageParam }) => getKecamatanByKabKotaIdInfinite({ ...params, halaman: pageParam }),
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

export default useGetKecamatanByKabKotaIdInfiniteScroll;
