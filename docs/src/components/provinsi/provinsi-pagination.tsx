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
    if (isLoading || isPending) return <SkeletonPagination />;

    if (!data) return null;
    if (!data.pagination) return null;

    if (isShowPagination) {
      return <AppPagination currentPage={data.pagination.halaman_saat_ini} totalPages={data.pagination.total_halaman} />;
    }

    return null;
  }, [isShowPagination, data, isLoading, isPending]);

  return <>{renderPagination}</>;
};
