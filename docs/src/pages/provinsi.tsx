import useGetProvinsi from "@/hooks/use-get-provinsi";
import { useIsMobile } from "@/hooks/use-mobile";
import { useIsTablet } from "@/hooks/use-tablet";
import { cn } from "@/lib/utils";

export const Provinsi = () => {
  const { data, isError, isLoading } = useGetProvinsi({ limit: 3 });
  console.log("data", data);
  console.log("isError", isError);
  console.log("isLoading", isLoading);

  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const isSmallScreen = isMobile || isTablet;

  return (
    <section className={cn("bg-white text-gray-800 max-w-5xl", { "p-5": isSmallScreen, "p-8": !isSmallScreen })}>
      <h1 className="text-3xl font-bold mb-10 text-gray-700">Data Wilayah - Provinsi</h1>
    </section>
  );
};
