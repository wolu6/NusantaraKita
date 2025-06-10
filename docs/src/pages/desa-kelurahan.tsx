import DesaKelDescription from "@/components/data-wilayah/desa-kelurahan/desa-kel-description";
import { DesaKelDisplayData } from "@/components/data-wilayah/desa-kelurahan/desa-kel-display-data";
import { DesaKelPagination } from "@/components/data-wilayah/desa-kelurahan/desa-kel-pagination";
import LimitPerPage from "@/components/ui/limit-per-page";
import ResponseTypeSwitch from "@/components/ui/response-type";
import useGetDesaKelurahan from "@/hooks/use-get-desa-kelurahan";
import { useIsMobile } from "@/hooks/use-mobile";
import useParams from "@/hooks/use-params";
import { useIsTablet } from "@/hooks/use-tablet";
import { cn } from "@/lib/utils";

export const DesaKelurahan = () => {
  const { params } = useParams();
  const { data, isError, isLoading, isSuccess, isPending } = useGetDesaKelurahan(params);

  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isSmallScreen = isMobile || isTablet;

  return (
    <section className={cn("bg-white text-gray-800 max-w-5xl", { "p-5": isSmallScreen, "p-8": !isSmallScreen })}>
      <h1 className="text-3xl font-bold mb-10 text-gray-700">Data Wilayah - Desa/Kelurahan</h1>

      <DesaKelDescription />

      <div className="w-full flex justify-between mb-10">
        <ResponseTypeSwitch />
        <LimitPerPage />
      </div>

      <div className="w-full flex justify-between mb-10 flex-col gap-3">
        <DesaKelDisplayData data={data} isError={isError} isLoading={isLoading} isSuccess={isSuccess} isPending={isPending} />
        <div className="self-center w-fit">
          <DesaKelPagination data={data} isLoading={isLoading} isPending={isPending} />
        </div>
      </div>
    </section>
  );
};
