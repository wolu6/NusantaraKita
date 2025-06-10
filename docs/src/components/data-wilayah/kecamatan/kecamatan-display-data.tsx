import { useIsMobile } from "@/hooks/use-mobile";
import { useMemo } from "react";
import { FaArrowsAltH, FaArrowsAltV, FaHashtag, FaMap, FaMapMarkerAlt } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { Alert, AlertDescription, AlertTitle } from "../../ui/alert";
import { CardList } from "../../ui/card-list";
import Code from "../../ui/code";
import { useResponseType } from "../../ui/response-type";
import { CardListSkeleton } from "../../ui/skelekton-card-list";
import SkeletonTable from "../../ui/skelekton-table";
import { Skeleton } from "../../ui/skeleton";
import Table from "../../ui/table";

interface KecamatanProps {
  data: KecamatanApiRes | undefined;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isPending: boolean;
}

const KecamatanTableHeaders = ["Kode Kecamatan", "Kode Kab", "Nama Kecamatan", "Latitude", "Longitude"];

const parseKecamatanTable = (kecamatan: KecamatanApi) => ({
  "Kode Kecamatan": kecamatan.kode,
  "Kode Kab": kecamatan.kode_kab_kota,
  "Nama Kecamatan": kecamatan.nama,
  Latitude: kecamatan.lat,
  Longitude: kecamatan.lng,
});

const parseKecamatanCard = (kecamatan: KecamatanApi) => [
  {
    icon: FaMap,
    title: "Kode Kab",
    value: kecamatan.kode_kab_kota,
  },
  {
    icon: FaHashtag,
    title: "Kode Kecamatan",
    value: kecamatan.kode,
  },

  {
    icon: FaMapMarkerAlt,
    title: "Nama Kecamatan",
    value: kecamatan.nama,
  },
  {
    icon: FaArrowsAltV,
    title: "Latitude",
    value: kecamatan.lat.toString(),
  },
  {
    icon: FaArrowsAltH,
    title: "Longitude",
    value: kecamatan.lng.toString(),
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

export const KecamatanDisplayData = ({ data, isError, isLoading, isSuccess, isPending }: KecamatanProps) => {
  const isMobile = useIsMobile();

  const { state } = useResponseType();
  const isShowData = isSuccess && data?.data;

  const parsedKecamatanCards = useMemo(() => (!data?.data ? [] : data.data.map(parseKecamatanCard)), [data]);
  const parsedKecamatanTable = useMemo(() => (!data?.data ? [] : data.data.map(parseKecamatanTable)), [data]);

  const renderData = useMemo(() => {
    const isTableShowData = isShowData && state.dataType === "TABLE";

    if ((isLoading || isPending) && !isMobile) return <SkeletonTable columnCount={5} rowCount={5} />;
    if ((isLoading || isPending) && isMobile) return <CardListSkeleton count={5} />;

    if ((isLoading || isPending) && state.dataType === "JSON") return <Skeleton className="h-50" />;
    if (isError) return <KabKotaErrorAlert />;

    if (isTableShowData && isMobile) return <CardList listData={parsedKecamatanCards} />;
    if (isTableShowData) return <Table columnHeaders={KecamatanTableHeaders} rowData={parsedKecamatanTable} />;

    if (isShowData && state.dataType === "JSON") return <Code content={JSON.stringify(data, null, 2)} showCopyButton />;
    return null;
  }, [data, isShowData, state.dataType, isLoading, isPending, isError, isMobile, parsedKecamatanTable, parsedKecamatanCards]);

  return <div>{renderData}</div>;
};
