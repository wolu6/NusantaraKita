"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import AppPagination, { SkeletonPagination } from "@/components/ui/app-pagination";
import Code from "@/components/ui/code";
import LimitPerPage from "@/components/ui/limit-per-page";
import ResponseTypeSwitch, { useResponseType } from "@/components/ui/response-type";
import SkeletonTable from "@/components/ui/skelekton-table";
import { Skeleton } from "@/components/ui/skeleton";
import Table from "@/components/ui/table";
import useGetProvinsi from "@/hooks/use-get-provinsi";
import { useIsMobile } from "@/hooks/use-mobile";
import useParams from "@/hooks/use-params";
import { useIsTablet } from "@/hooks/use-tablet";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { MdErrorOutline } from "react-icons/md";

interface ProvinsiDataProps {
  data: ProvinsiApiRes | undefined;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isPending: boolean;
}

interface PaginationProps {
  data: ProvinsiApiRes | undefined;
  isLoading: boolean;
  isPending: boolean;
}

const provinsiTableHeaders = ["Kode", "Provinsi", "Latitude", "Longitude"];

const parseProvinsi = (provinsi: ProvinsiApi) => ({
  Kode: provinsi.kode,
  Provinsi: provinsi.nama,
  Latitude: provinsi.lat,
  Longitude: provinsi.lng,
});

// Komponen Pagination
const ProvinsiPagination = ({ data, isLoading, isPending }: PaginationProps) => {
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

// Komponen Description
const ProvinsiDescription = () => (
  <div className="mb-10">
    <h2 className="text-xl font-semibold mb-4 text-gray-600">Description</h2>
    <p className="text-gray-600 leading-relaxed">Menampilkan daftar data provinsi di Indonesia, Dari Sabang sampai Merauke 🇮🇩</p>
  </div>
);

// Komponen Data
const ProvinsiData = ({ data, isError, isLoading, isSuccess, isPending }: ProvinsiDataProps) => {
  const { state } = useResponseType();
  const isShowData = isSuccess && data?.data;

  const renderData = useMemo(() => {
    if ((isLoading || isPending) && state.dataType === "TABLE") {
      return <SkeletonTable columnCount={5} rowCount={5} />;
    }

    if ((isLoading || isPending) && state.dataType === "JSON") {
      return <Skeleton className="h-50" />;
    }

    if (isError) {
      return (
        <Alert variant="destructive" className="border-red-500 bg-red-100 flex items-start gap-4">
          <div className="text-red-600 text-2xl">
            <MdErrorOutline />
          </div>
          <div className="flex-1">
            <AlertTitle className="text-xl font-bold text-red-500 mb-2">Gagal Memuat Data</AlertTitle>
            <AlertDescription className="text-red-500 leading-relaxed flex">
              Maaf, terjadi kesalahan saat memuat data.{" "}
              <span className="cursor-pointer underline font-semibold" onClick={() => window.history.back()}>
                Kembali
              </span>
            </AlertDescription>
          </div>
        </Alert>
      );
    }

    if (isShowData && state.dataType === "TABLE") {
      return <Table columnHeaders={provinsiTableHeaders} rowData={data.data.map(parseProvinsi)} />;
    }

    if (isShowData && state.dataType === "JSON") {
      return <Code content={JSON.stringify(data, null, 2)} showCopyButton />;
    }

    return null;
  }, [data, isShowData, state.dataType, isLoading, isPending, isError]);

  return <div>{renderData}</div>;
};

// Komponen utama
export const Provinsi = () => {
  const { params } = useParams();
  const { data, isError, isLoading, isSuccess, isPending } = useGetProvinsi(params);

  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isSmallScreen = isMobile || isTablet;

  return (
    <section className={cn("bg-white text-gray-800 max-w-5xl", { "p-5": isSmallScreen, "p-8": !isSmallScreen })}>
      <h1 className="text-3xl font-bold mb-10 text-gray-700">Data Wilayah - API Provinsi</h1>

      <ProvinsiDescription />

      <div className="w-full flex justify-between mb-10">
        <ResponseTypeSwitch />
        <LimitPerPage />
      </div>

      <div className="w-full flex justify-between mb-10 flex-col gap-3">
        <ProvinsiData data={data} isError={isError} isLoading={isLoading} isSuccess={isSuccess} isPending={isPending} />
        <div className="self-center w-fit">
          <ProvinsiPagination data={data} isLoading={isLoading} isPending={isPending} />
        </div>
      </div>
    </section>
  );
};
