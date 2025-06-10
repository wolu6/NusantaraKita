import { useMemo } from "react";
import AppPagination, { SkeletonPagination } from "../ui/app-pagination";

interface PaginationProps {
  data: ProvinsiApiRes | undefined;
  isLoading: boolean;
  isPending: boolean;
}

export const ProvinsiPagination = ({ data, isLoading, isPending }: PaginationProps) => {
  const isShowPagination = data?.pagination;

  const renderPagination = useMemo(() => {
    if (!data?.pagination) return null;

    if (isShowPagination) {
      return <AppPagination currentPage={data.pagination.halaman_saat_ini} totalPages={data.pagination.total_halaman} />;
    } else if (isLoading || isPending) return <SkeletonPagination />;
    else return null;
  }, [isShowPagination, data, isLoading, isPending]);

  return <>{renderPagination}</>;
};
