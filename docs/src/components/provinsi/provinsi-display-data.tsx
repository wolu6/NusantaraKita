import { useMemo } from "react";
import { useResponseType } from "../ui/response-type";
import SkeletonTable from "../ui/skelekton-table";
import { Skeleton } from "../ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { MdErrorOutline } from "react-icons/md";
import Table from "../ui/table";
import Code from "../ui/code";

interface ProvinsiDataProps {
  data: ProvinsiApiRes | undefined;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isPending: boolean;
}

const provinsiTableHeaders = ["Kode", "Provinsi", "Latitude", "Longitude"];

const parseProvinsi = (provinsi: ProvinsiApi) => ({
  Kode: provinsi.kode,
  Provinsi: provinsi.nama,
  Latitude: provinsi.lat,
  Longitude: provinsi.lng,
});

export const ProvinsiDisplayData = ({ data, isError, isLoading, isSuccess, isPending }: ProvinsiDataProps) => {
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
            <AlertDescription className="text-red-500 leading-relaxed">
              <span>
                Maaf, terjadi kesalahan saat memuat data.{" "}
                <span className="font-semibold underline cursor-pointer" onClick={() => window.history.back()}>
                  Kembali
                </span>
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
