const AboutApi = () => {
  return (
    <section className="p-6 max-w-5xl bg-white">
      <div className="flex flex-col items-start mb-4">
        <img src="/logo.png" alt="Nusantara Kita Logo" className="size-28 mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Nusantara Kita</h2>
        <p className="text-gray-600 text-base leading-relaxed">
          Nusantara Kita adalah sebuah API yang menyediakan data wilayah Indonesia. Proyek ini dirancang untuk memudahkan akses dan
          penggunaan data geospasial terkait wilayah-wilayah di Indonesia. API ini dapat digunakan untuk berbagai aplikasi yang memerlukan
          informasi seperti batas wilayah, data administratif, dan lain-lain.
        </p>
      </div>
    </section>
  );
};

export default AboutApi;
