import { useOverview } from "@/context/overview-provider";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

const indonesiaPosition: [number, number] = [-2.5489, 118.0149];

interface MapUpdaterProps {
  center: [number, number];
  zoom: number;
}

const MapUpdater = ({ center, zoom }: MapUpdaterProps) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
};

const OverviewMap = () => {
  const { state } = useOverview();

  const activePosition: [number, number] = state.selected.desaKel
    ? [state.selected.desaKel.lat, state.selected.desaKel.lng]
    : state.selected.kecamatan
    ? [state.selected.kecamatan.lat, state.selected.kecamatan.lng]
    : state.selected.kabKota
    ? [state.selected.kabKota.lat, state.selected.kabKota.lng]
    : state.selected.province
    ? [state.selected.province.lat, state.selected.province.lng]
    : indonesiaPosition;

  // Zoom dinamis: 5 kalau default Indonesia, 10 kalau wilayah dipilih
  const zoomLevel = activePosition === indonesiaPosition ? 5 : 9;

  return (
    <MapContainer
      center={activePosition}
      zoom={zoomLevel}
      scrollWheelZoom={true}
      className={cn("w-full rounded-lg aspect-square z-0 max-sm:max-h-60 sm:max-h-72 md:max-h-80")}
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      <MapUpdater center={activePosition} zoom={zoomLevel} />

      <Marker position={activePosition}>
        <Popup>
          {state.selected.desaKel
            ? `Desa/Kel: ${state.selected.desaKel.nama}`
            : state.selected.kecamatan
            ? `Kecamatan: ${state.selected.kecamatan.nama}`
            : state.selected.kabKota
            ? `Kab/Kota: ${state.selected.kabKota.nama}`
            : state.selected.province
            ? `Provinsi: ${state.selected.province.nama}`
            : `Indonesia 🇮🇩`}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default OverviewMap;
