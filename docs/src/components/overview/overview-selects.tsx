import { useOverview } from "@/context/overview-provider";
import { MapSelect } from "../ui/map-select";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import useGetProvinsiInfiniteScroll from "@/hooks/get-provinsi/use-get-provinsi-infinite-scroll";
import useGetKabKotaByProvIdInfiniteScroll from "@/hooks/get-kabupaten-kota/use-get-kab-kota-by-provId-infinite-scroll";
import { useMemo } from "react";
import useGetKecamatanByKabKotaIdInfiniteScroll from "@/hooks/get-kecamatan/use-get-kecamatan-by-kab-kotaId-infinite-scroll";
import useGetDesaByKecamatanIdInfiniteScroll from "@/hooks/get-desa-kelurahan/use-get-desa-kelurahan-by-kecamatanId-infinite-scroll";

const queryOptions: Pick<ParamsApi, "pagination" | "limit"> = {
  pagination: true,
  limit: 15,
};

const OverViewSelects = () => {
  const { state, dispatch } = useOverview();

  // Provinsi query
  const provinsiQuery = useGetProvinsiInfiniteScroll(queryOptions, { enabled: true });
  const kodeProvinsi = useMemo(() => state.selected.province?.kode || "", [state.selected.province]);
  const shouldFetchKabKota = useMemo(() => !!state.selected.province, [state.selected.province]);

  // KabKota query
  const kabKotaQuery = useGetKabKotaByProvIdInfiniteScroll({ kodeProvinsi, ...queryOptions }, { enabled: shouldFetchKabKota });
  const kodeKabKota = useMemo(() => state.selected.kabKota?.kode || "", [state.selected.kabKota]);
  const shouldFetchKecamatan = useMemo(() => !!state.selected.kabKota, [state.selected.kabKota]);

  // Kecamatan query
  const kecamatanQuery = useGetKecamatanByKabKotaIdInfiniteScroll({ kodeKabKota, ...queryOptions }, { enabled: shouldFetchKecamatan });
  const kodeKecamatan = useMemo(() => state.selected.kecamatan?.kode || "", [state.selected.kecamatan]);
  const shouldFetchDesaKel = useMemo(() => !!state.selected.kecamatan, [state.selected.kecamatan]);

  // DesaKel query
  const desaKelQuery = useGetDesaByKecamatanIdInfiniteScroll({ kodeKecamatan, ...queryOptions }, { enabled: shouldFetchDesaKel });

  // Handler Provinsi
  const handleSelectProvinsi = (provinsi: ProvinsiApi) => {
    dispatch({ type: "SET_PROVINCE", payload: provinsi });
    dispatch({ type: "SET_KABKOTA", payload: null });
    dispatch({ type: "SET_KECAMATAN", payload: null });
    dispatch({ type: "SET_DESA", payload: null });
  };
  const handleOpenProvinsi = () => {
    if (!provinsiQuery.isSuccess && !provinsiQuery.isFetching) provinsiQuery.refetch();
  };
  const handleReachEndProvinsi = () => {
    if (provinsiQuery.hasNextPage) provinsiQuery.fetchNextPage();
  };

  // Handler KabKota
  const handleSelectKabKota = (kabkota: KabKotaApi) => {
    dispatch({ type: "SET_KABKOTA", payload: kabkota });
    dispatch({ type: "SET_KECAMATAN", payload: null });
  };
  const handleOpenKabKota = () => {
    if (state.selected.province && !kabKotaQuery.isSuccess && !kabKotaQuery.isFetching) {
      kabKotaQuery.refetch();
    }
  };
  const handleReachEndKabKota = () => {
    if (kabKotaQuery.hasNextPage) kabKotaQuery.fetchNextPage();
  };

  // Handler Kecamatan
  const handleSelectKecamatan = (kecamatan: KecamatanApi) => {
    dispatch({ type: "SET_KECAMATAN", payload: kecamatan });
    dispatch({ type: "SET_DESA", payload: null });
  };
  const handleOpenKecamatan = () => {
    if (state.selected.kabKota && !kecamatanQuery.isSuccess && !kecamatanQuery.isFetching) {
      kecamatanQuery.refetch();
    }
  };
  const handleReachEndKecamatan = () => {
    if (kecamatanQuery.hasNextPage) kecamatanQuery.fetchNextPage();
  };

  // handler desa/kelurahan
  const handleSelectDesaKel = (desa: DesaKelApi) => {
    dispatch({ type: "SET_DESA", payload: desa });
  };
  const handleOpenDesaKel = () => {
    if (state.selected.kecamatan && !desaKelQuery.isSuccess && !desaKelQuery.isFetching) {
      desaKelQuery.refetch();
    }
  };
  const handleReachEndDesaKel = () => {
    if (desaKelQuery.hasNextPage) desaKelQuery.fetchNextPage();
  };

  // Data Result
  const provinsiData = provinsiQuery.data?.pages.flatMap((page) => page.data) || [];
  const kabKotaData = kabKotaQuery.data?.pages.flatMap((page) => page.data) || [];
  const kecamatanData = kecamatanQuery.data?.pages.flatMap((page) => page.data) || [];
  const desaKelData = desaKelQuery.data?.pages.flatMap((page) => page.data) || [];

  return (
    <div className="space-y-4 mb-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Provinsi */}
        <MapSelect
          data={provinsiData}
          selectedValue={state.selected.province}
          onSelect={handleSelectProvinsi}
          placeholder="Pilih Provinsi"
          getLabel={(item) => item.nama}
          getValue={(item) => item.kode}
          onOpen={handleOpenProvinsi}
          isLoading={provinsiQuery.isFetching && !provinsiQuery.hasNextPage}
          hasNextPage={provinsiQuery.hasNextPage}
          isFetchingNextPage={provinsiQuery.isFetchingNextPage}
          onReachEnd={handleReachEndProvinsi}
        />

        {/* KabKota */}
        <MapSelect
          data={kabKotaData}
          selectedValue={state.selected.kabKota}
          onSelect={handleSelectKabKota}
          placeholder="Pilih Kabupaten / Kota"
          getLabel={(item) => item.nama}
          getValue={(item) => item.kode}
          onOpen={handleOpenKabKota}
          isLoading={kabKotaQuery.isFetching && !kabKotaQuery.hasNextPage}
          hasNextPage={kabKotaQuery.hasNextPage}
          isFetchingNextPage={kabKotaQuery.isFetchingNextPage}
          onReachEnd={handleReachEndKabKota}
          disabled={!state.selected.province}
        />

        {/* Kecamatan */}
        <MapSelect
          data={kecamatanData}
          selectedValue={state.selected.kecamatan}
          onSelect={handleSelectKecamatan}
          placeholder="Pilih Kecamatan"
          getLabel={(item) => item.nama}
          getValue={(item) => item.kode}
          onOpen={handleOpenKecamatan}
          isLoading={kecamatanQuery.isFetching && !kecamatanQuery.hasNextPage}
          hasNextPage={kecamatanQuery.hasNextPage}
          isFetchingNextPage={kecamatanQuery.isFetchingNextPage}
          onReachEnd={handleReachEndKecamatan}
          disabled={!state.selected.kabKota}
        />

        {/* desa/kelurahan */}
        <MapSelect
          data={desaKelData}
          selectedValue={state.selected.desaKel}
          onSelect={handleSelectDesaKel}
          placeholder="Pilih Desa / Kelurahan"
          getLabel={(item) => item.nama}
          getValue={(item) => item.kode}
          onOpen={handleOpenDesaKel}
          isLoading={desaKelQuery.isFetching && !desaKelQuery.hasNextPage}
          hasNextPage={desaKelQuery.hasNextPage}
          isFetchingNextPage={desaKelQuery.isFetchingNextPage}
          onReachEnd={handleReachEndDesaKel}
          disabled={!state.selected.kecamatan}
        />
      </div>

      {/* Switch */}
      <div className="flex items-center gap-5 w-full justify-between">
        <Label htmlFor="endpoint-switch" className="font-normal">
          Tampilkan Endpoint
        </Label>
        <Switch
          disabled={!state.selected.province}
          id="endpoint-switch"
          className="cursor-pointer"
          checked={state.isShowEndpoints}
          onCheckedChange={(checked) => dispatch({ type: "TOGGLE_ENDPOINTS", payload: checked })}
        />
      </div>
    </div>
  );
};

export default OverViewSelects;
