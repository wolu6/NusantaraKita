const MainFeatures = () => {
  const fiturUtamaData = [
    "Data batas wilayah administratif Indonesia, seperti provinsi, kabupaten/kota, dan kecamatan.",
    "Informasi geospasial terkait koordinat wilayah yang dapat diintegrasikan dengan aplikasi peta.",
    "Menyediakan endpoint untuk mendapatkan data berdasarkan jenis wilayah atau nama wilayah tertentu.",
    "Dukungan untuk format data JSON yang mudah digunakan di berbagai platform dan bahasa pemrograman.",
    "Akses ke data yang selalu diperbarui untuk memastikan akurasi informasi yang diberikan.",
  ];

  const kelebihanApiData = [
    "API yang ringan dan cepat, ideal untuk aplikasi yang membutuhkan akses cepat ke data wilayah.",
    "Dokumentasi API yang jelas dan mudah diikuti untuk pengembang.",
    "Didukung oleh sistem yang scalable, cocok untuk aplikasi besar dengan kebutuhan data tinggi.",
    "Penggunaan yang mudah di berbagai platform, termasuk mobile dan web applications.",
  ];

  const informasiText =
    "API Nusantara Kita dapat digunakan untuk berbagai kebutuhan aplikasi yang memerlukan data terkait wilayah Indonesia. Pengguna dapat mengakses data melalui berbagai endpoint yang telah disediakan, baik untuk mendapatkan informasi batas wilayah atau data administratif lainnya.";

  return (
    <section className="p-6 flex flex-col gap-6 max-w-5xl">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Fitur Utama</h3>
        <ul className="list-disc list-outside pl-5 space-y-2 text-gray-700">
          {fiturUtamaData.map((fitur, index) => (
            <li key={`fitur-${index}`}>{fitur}</li>
          ))}
        </ul>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Kelebihan API</h3>
        <ul className="list-disc list-outside pl-5 space-y-2 text-gray-700">
          {kelebihanApiData.map((fitur, index) => (
            <li key={`fitur-${index}`}>{fitur}</li>
          ))}
        </ul>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Informasi</h3>
        <p className="text-gray-700 leading-relaxed">{informasiText}</p>
      </div>
    </section>
  );
};

export default MainFeatures;
