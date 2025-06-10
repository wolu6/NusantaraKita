import { useIsMobile } from "@/hooks/use-mobile";
import { useMemo } from "react";
import { FaArrowsAltH, FaArrowsAltV, FaHashtag, FaMap, FaMapMarkerAlt } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { CardList } from "../ui/card-list";
import Code from "../ui/code";
import { useResponseType } from "../ui/response-type";
import { CardListSkeleton } from "../ui/skelekton-card-list";
import SkeletonTable from "../ui/skelekton-table";
import { Skeleton } from "../ui/skeleton";
import Table from "../ui/table";

interface KabKotaProps {
  data: KabKotaApiRes | undefined;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isPending: boolean;
}

const KabKotaTableHeaders = ["Kode Kabupaten", "Kode Provinsi", "Nama Kab/Kota", "Latitude", "Longitude"];

const parseKabKotaTable = (kabKota: KabKotaApi) => ({
  "Kode Kab/Kota": kabKota.kode,
  "Kode Provinsi": kabKota.kode_provinsi,
  "Nama Kab/Kota": kabKota.nama,
  Latitude: kabKota.lat,
  Longitude: kabKota.lng,
});

const parseKabKotCard = (kabKota: KabKotaApi) => [
  {
    icon: FaHashtag,
    title: "Kode Kabupaten",
    value: kabKota.kode.toString(),
  },
  {
    icon: FaMap,
    title: "Kode Provinsi",
    value: kabKota.kode_provinsi.toString(),
  },
  {
    icon: FaMapMarkerAlt,
    title: "Nama Kab/Kota",
    value: kabKota.nama,
  },
  {
    icon: FaArrowsAltV,
    title: "Latitude",
    value: kabKota.lat.toString(),
  },
  {
    icon: FaArrowsAltH,
    title: "Longitude",
    value: kabKota.lng.toString(),
  },
];

const KabKotaErrorAlert = () => {
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

export const KabupatenKotaDisplayData = ({ data, isError, isLoading, isSuccess, isPending }: KabKotaProps) => {
  const isMobile = useIsMobile();

  const { state } = useResponseType();
  const isShowData = isSuccess && data?.data;

  const parsedKabKotaCard = useMemo(() => (!data?.data ? [] : data.data.map(parseKabKotCard)), [data]);
  const parsedProcinsiTable = useMemo(() => (!data?.data ? [] : data.data.map(parseKabKotaTable)), [data]);

  const renderData = useMemo(() => {
    const isTableShowData = isShowData && state.dataType === "TABLE";

    if ((isLoading || isPending) && !isMobile) return <SkeletonTable columnCount={5} rowCount={5} />;
    if ((isLoading || isPending) && isMobile) return <CardListSkeleton count={5} />;

    if ((isLoading || isPending) && state.dataType === "JSON") return <Skeleton className="h-50" />;
    if (isError) return <KabKotaErrorAlert />;

    if (isTableShowData && isMobile) return <CardList listData={parsedKabKotaCard} />;
    if (isTableShowData) return <Table columnHeaders={KabKotaTableHeaders} rowData={parsedProcinsiTable} />;

    if (isShowData && state.dataType === "JSON") return <Code content={JSON.stringify(data, null, 2)} showCopyButton />;
    return null;
  }, [data, isShowData, state.dataType, isLoading, isPending, isError, isMobile, parsedProcinsiTable, parsedKabKotaCard]);

  return <div>{renderData}</div>;
};
