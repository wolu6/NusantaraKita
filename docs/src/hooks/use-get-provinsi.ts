import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const getProvinsi = async (params?: ParamsApi): Promise<ProvinsiApiRes> => {
  const response = await axiosInstance.get("provinsi", { params });
  return response.data as ProvinsiApiRes;
};

const useGetProvinsi = (options: ParamsApi) => {
  const { data, isLoading, isError, isSuccess, isPending } = useQuery({
    queryKey: ["provinsi", options],
    queryFn: () => getProvinsi(options),
    refetchOnWindowFocus: false,
    retry: false,
  });

  return { data, isLoading, isError, isSuccess, isPending };
};

export default useGetProvinsi;
