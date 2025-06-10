import { useIsMobile } from "@/hooks/use-mobile";
import { useMemo } from "react";
import { IoIosCompass, IoIosInformationCircle, IoIosLocate, IoIosPin } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { CardList } from "../ui/card-list";
import Code from "../ui/code";
import { useResponseType } from "../ui/response-type";
import SkeletonTable from "../ui/skelekton-table";
import { Skeleton } from "../ui/skeleton";
import Table from "../ui/table";
import { CardListSkeleton } from "../ui/skelekton-card-list";

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

const parseProvinsiCard = (provinsi: ProvinsiApi) => [
  {
    icon: IoIosInformationCircle,
    title: "Kode",
    value: provinsi.kode.toString(),
  },
  {
    icon: IoIosPin,
    title: "Provinsi",
    value: provinsi.nama,
  },
  {
    icon: IoIosLocate,
    title: "Latitude",
    value: provinsi.lat.toString(),
  },
  {
    icon: IoIosCompass,
    title: "Longitude",
    value: provinsi.lng.toString(),
  },
];

const ProvinsiErrorAlert = () => {
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
};

export const ProvinsiDisplayData = ({ data, isError, isLoading, isSuccess, isPending }: ProvinsiDataProps) => {
  const isMobile = useIsMobile();

  const { state } = useResponseType();
  const isShowData = isSuccess && data?.data;

  const parsedProvinsiCard = useMemo(() => (!data?.data ? [] : data.data.map(parseProvinsiCard)), [data]);
  const parsedProcinsiTable = useMemo(() => (!data?.data ? [] : data.data.map(parseProvinsi)), [data]);

  const renderData = useMemo(() => {
    const isTableShowData = isShowData && state.dataType === "TABLE";

    if ((isLoading || isPending) && !isMobile) return <SkeletonTable columnCount={5} rowCount={5} />;
    if ((isLoading || isPending) && isMobile) return <CardListSkeleton count={5} />;

    if ((isLoading || isPending) && state.dataType === "JSON") return <Skeleton className="h-50" />;
    if (isError) return <ProvinsiErrorAlert />;

    if (isTableShowData && isMobile) return <CardList listData={parsedProvinsiCard} />;
    if (isTableShowData) return <Table columnHeaders={provinsiTableHeaders} rowData={parsedProcinsiTable} />;

    if (isShowData && state.dataType === "JSON") return <Code content={JSON.stringify(data, null, 2)} showCopyButton />;
    return null;
  }, [data, isShowData, state.dataType, isLoading, isPending, isError, isMobile, parsedProcinsiTable, parsedProvinsiCard]);

  return <div>{renderData}</div>;
};
