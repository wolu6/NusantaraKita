import http from "k6/http";

export const options = {
  scenarios: {
    provinsi: {
      executor: "constant-vus",
      vus: 10,
      duration: "30s",
      exec: "GetProvinsi",
    },
    kabupaten_kota: {
      executor: "constant-vus",
      vus: 10,
      duration: "30s",
      exec: "GetKabupatenKota",
    },
    kabupaten_kota_by_provinsi: {
      executor: "constant-vus",
      vus: 10,
      duration: "30s",
      exec: "GetKabupatenKotaByProvinsi",
    },
    kecamatan: {
      executor: "constant-vus",
      vus: 10,
      duration: "30s",
      exec: "GetKecamatan",
    },
    kecamatan_by_kabupaten_kota: {
      executor: "constant-vus",
      vus: 10,
      duration: "30s",
      exec: "GetKecamatanByKabupatenKota",
    },
    desa_kelurahan: {
      executor: "constant-vus",
      vus: 10,
      duration: "30s",
      exec: "GetDesaKelurahan",
    },
    desa_kelurahan_by_kecamatan: {
      executor: "constant-vus",
      vus: 10,
      duration: "30s",
      exec: "GetDesaKelurahanByKecamatan",
    },
  },
};

export function GetProvinsi() {
  http.get("http://127.0.0.1:8000/v2/provinsi");
}
export function GetKabupatenKota() {
  http.get("http://127.0.0.1:8000/v2/kab-kota");
}
export function GetKabupatenKotaByProvinsi() {
  http.get("http://127.0.0.1:8000/v2/36/kab-kota");
}
export function GetKecamatan() {
  http.get("http://127.0.0.1:8000/v2/kecamatan");
}
export function GetKecamatanByKabupatenKota() {
  http.get("http://127.0.0.1:8000/v2/36.71/kecamatan");
}
export function GetDesaKelurahan() {
  http.get("http://127.0.0.1:8000/v2/desa-kel");
}
export function GetDesaKelurahanByKecamatan() {
  http.get("http://127.0.0.1:8000/v2/36.71.01/desa-kel");
}
