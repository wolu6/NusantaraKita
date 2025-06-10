import axiosInstace from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const getKabKota = async (params?: ParamsApi): Promise<KabKotaApiRes> => {
  const response = await axiosInstace.get("kab-kota", { params });
  return response.data as KabKotaApiRes;
};

const useGetKabKota = (options: ParamsApi) => {
  const { data, isLoading, isError, isSuccess, isPending } = useQuery({
    queryKey: ["kab-kota", options],
    queryFn: () => getKabKota(options),
    refetchOnWindowFocus: false,
    retry: false,
  });

  return { data, isLoading, isError, isSuccess, isPending };
};

export default useGetKabKota;
