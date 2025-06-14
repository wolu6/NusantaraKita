import axiosInstance from "@/lib/axios";
import { useInfiniteQuery } from "@tanstack/react-query";

type GetProvinsiInfiniteParams = ParamsApi;

export const getProvinsiInfinite = async (params: GetProvinsiInfiniteParams) => {
  const response = await axiosInstance.get("provinsi", {
    params: {
      pagination: params.pagination,
      limit: params.limit,
      halaman: params.halaman,
    },
  });
  return response.data;
};

const useGetProvinsiInfiniteScroll = (params: GetProvinsiInfiniteParams, queryOptions?: { enabled?: boolean }) => {
  return useInfiniteQuery({
    queryKey: ["provinsi-infinite", params.limit, params.pagination],
    queryFn: ({ pageParam }) => getProvinsiInfinite({ ...params, halaman: pageParam }),
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

export default useGetProvinsiInfiniteScroll;
