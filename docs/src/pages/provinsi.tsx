import { ProvinsiDescription } from "@/components/data-wilayah/provinsi/provinsi-description";
import { ProvinsiDisplayData } from "@/components/data-wilayah/provinsi/provinsi-display-data";
import { ProvinsiPagination } from "@/components/data-wilayah/provinsi/provinsi-pagination";
import LimitPerPage from "@/components/ui/limit-per-page";
import ResponseTypeSwitch from "@/components/ui/response-type";
import useGetProvinsi from "@/hooks/get-provinsi/use-get-provinsi";
import { useIsMobile } from "@/hooks/use-mobile";
import useParams from "@/hooks/use-params";
import { useIsTablet } from "@/hooks/use-tablet";
import { cn } from "@/lib/utils";

// Komponen utama
export const Provinsi = () => {
  const { params } = useParams();
  const { data, isError, isLoading, isSuccess, isPending } = useGetProvinsi(params);

  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isSmallScreen = isMobile || isTablet;

  return (
    <section className={cn("bg-white text-gray-800 max-w-5xl", { "p-5": isSmallScreen, "p-8": !isSmallScreen })}>
      <h1 className="text-3xl font-bold mb-10 text-gray-700">Data Wilayah - Provinsi</h1>

      <ProvinsiDescription />

      <div className="w-full flex justify-between mb-10">
        <ResponseTypeSwitch />
        <LimitPerPage />
      </div>

      <div className="w-full flex justify-between mb-10 flex-col gap-3">
        <ProvinsiDisplayData data={data} isError={isError} isLoading={isLoading} isSuccess={isSuccess} isPending={isPending} />
        <div className="self-center w-fit">
          <ProvinsiPagination data={data} isLoading={isLoading} isPending={isPending} />
        </div>
      </div>
    </section>
  );
};
