import Code from "@/components/ui/code";
import { useIsMobile } from "@/hooks/use-mobile";
import { useIsTablet } from "@/hooks/use-tablet";
import { cn } from "@/lib/utils";

const cloneCommand = [
  "git clone --filter=blob:none --no-checkout https://github.com/Yuefii/NusantaraKita.git",
  "cd NusantaraKita",
  "git sparse-checkout set api",
  "git checkout",
].join("\n");

export const InstalationGuide = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isSmallScreen = isMobile || isTablet;

  return (
    <section
      className={cn("bg-white text-gray-800 max-w-5xl", {
        "p-5": isSmallScreen,
        "p-8": !isSmallScreen,
      })}
    >
      <h1 className="text-3xl font-bold mb-10 text-gray-700">
        API Documentation - Installation Guide
      </h1>

      {/* Section Clone */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-600">
          Clone Repository
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Clone project NusantaraKita ke local kamu menggunakan perintah
          berikut:
        </p>
        <Code content={cloneCommand} showCopyButton />
      </div>

      {/* Section Masuk API Directory */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-600">
          Masuk ke Direktori API
        </h2>
        <Code content={`cd api`} showCopyButton />
      </div>

      {/* Section Setup Env */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-600">
          Setup Environment
        </h2>
        <Code content={`cp .env.example .env`} showCopyButton />
      </div>

      {/* Section Virtual Environment */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-600">
          Menjalankan Project dengan pip
        </h2>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2 text-gray-600">
            Buat Virtual Environment
          </h3>
          <Code content={`python -m venv venv`} showCopyButton />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2 text-gray-600">
            Aktifkan Virtual Environment
          </h3>
          <Code content={`source venv/bin/activate`} showCopyButton />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2 text-gray-600">
            Install Dependencies
          </h3>
          <Code content={`pip install -r requirements.txt`} showCopyButton />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2 text-gray-600">
            Jalankan Project
          </h3>
          <Code content={`uvicorn generate:app --reload`} showCopyButton />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2 text-gray-600">
            Testing Project
          </h3>
          <Code content={`pytest tests/`} showCopyButton />
        </div>
      </div>
    </section>
  );
};
