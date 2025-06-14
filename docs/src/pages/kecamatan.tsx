import { KecamatanDescription } from "@/components/data-wilayah/kecamatan/kecamatan-description";
import { KecamatanDisplayData } from "@/components/data-wilayah/kecamatan/kecamatan-display-data";
import { KecamatanPagination } from "@/components/data-wilayah/kecamatan/kecamatan-pagination";
import LimitPerPage from "@/components/ui/limit-per-page";
import ResponseTypeSwitch from "@/components/ui/response-type";
import useGetKecamatan from "@/hooks/get-kecamatan/use-get-kecamatan";
import { useIsMobile } from "@/hooks/use-mobile";
import useParams from "@/hooks/use-params";
import { useIsTablet } from "@/hooks/use-tablet";
import { cn } from "@/lib/utils";

export const Kecamatan = () => {
  const { params } = useParams();
  const { data, isError, isLoading, isSuccess, isPending } = useGetKecamatan(params);

  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isSmallScreen = isMobile || isTablet;

  return (
    <section className={cn("bg-white text-gray-800 max-w-5xl", { "p-5": isSmallScreen, "p-8": !isSmallScreen })}>
      <h1 className="text-3xl font-bold mb-10 text-gray-700">Data Wilayah - Kecamatan</h1>

      <KecamatanDescription />

      <div className="w-full flex justify-between mb-10">
        <ResponseTypeSwitch />
        <LimitPerPage />
      </div>

      <div className="w-full flex justify-between mb-10 flex-col gap-3">
        <KecamatanDisplayData data={data} isError={isError} isLoading={isLoading} isSuccess={isSuccess} isPending={isPending} />
        <div className="self-center w-fit">
          <KecamatanPagination data={data} isLoading={isLoading} isPending={isPending} />
        </div>
      </div>
    </section>
  );
};
