import { KabupatenKodeDescription } from "@/components/data-wilayah/kabupaten-kota/kabupaten-kota-description";
import { KabupatenKotaDisplayData } from "@/components/data-wilayah/kabupaten-kota/kabupaten-kota-display-data";
import { KabupatenKotaPagination } from "@/components/data-wilayah/kabupaten-kota/kabupaten-kota-pagination";
import LimitPerPage from "@/components/ui/limit-per-page";
import ResponseTypeSwitch from "@/components/ui/response-type";
import useGetKabKota from "@/hooks/use-get-kab-kota";
import { useIsMobile } from "@/hooks/use-mobile";
import useParams from "@/hooks/use-params";
import { useIsTablet } from "@/hooks/use-tablet";
import { cn } from "@/lib/utils";

export const KabupatenKota = () => {
  const { params } = useParams();
  const { data, isError, isLoading, isSuccess, isPending } = useGetKabKota(params);

  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isSmallScreen = isMobile || isTablet;

  return (
    <section className={cn("bg-white text-gray-800 max-w-5xl", { "p-5": isSmallScreen, "p-8": !isSmallScreen })}>
      <h1 className="text-3xl font-bold mb-10 text-gray-700">Data Wilayah - API Kabupaten/Kota</h1>

      <KabupatenKodeDescription />

      <div className="w-full flex justify-between mb-10">
        <ResponseTypeSwitch />
        <LimitPerPage />
      </div>

      <div className="w-full flex justify-between mb-10 flex-col gap-3">
        <KabupatenKotaDisplayData data={data} isError={isError} isLoading={isLoading} isSuccess={isSuccess} isPending={isPending} />
        <div className="self-center w-fit">
          <KabupatenKotaPagination data={data} isLoading={isLoading} isPending={isPending} />
        </div>
      </div>
    </section>
  );
};
