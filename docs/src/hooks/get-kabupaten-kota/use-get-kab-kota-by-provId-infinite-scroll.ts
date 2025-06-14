import axiosInstance from "@/lib/axios";
import { useInfiniteQuery } from "@tanstack/react-query";

interface GetKabKotaByProvIdInfiniteParams extends ParamsApi {
  kodeProvinsi: string;
}

export const getKabKotaByProvIdInfinite = async (params: GetKabKotaByProvIdInfiniteParams) => {
  const response = await axiosInstance.get(`${params.kodeProvinsi}/kab-kota`, {
    params: {
      pagination: params.pagination,
      limit: params.limit,
      halaman: params.halaman,
    },
  });
  return response.data;
};

const useGetKabKotaByProvIdInfiniteScroll = (params: GetKabKotaByProvIdInfiniteParams, queryOptions?: { enabled?: boolean }) => {
  return useInfiniteQuery({
    queryKey: ["kab-kota-by-provinsi-infinite", params.kodeProvinsi, params.limit, params.pagination],
    queryFn: ({ pageParam }) => getKabKotaByProvIdInfinite({ ...params, halaman: pageParam }),
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

export default useGetKabKotaByProvIdInfiniteScroll;
