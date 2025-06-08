import type { ResponseJsonListItem } from "./response-json-structure";
import ResponseJsonStructure from "./response-json-structure";

interface ResponseSuccessProps {
  items: ResponseJsonListItem[];
}

const ResponseSuccess: React.FC<ResponseSuccessProps> = ({ items }) => {
  return (
    <div className="py-4">
      <h3 className="text-2xl font-semibold mb-4 text-gray-700">Response (Success)</h3>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium">Format:</span> JSON
      </p>
      <p className="text-sm text-gray-600 mb-3">
        <span className="font-medium">Struktur:</span>
      </p>
      <div className="pl-1">
        <ResponseJsonStructure items={items} />
      </div>
    </div>
  );
};

export default ResponseSuccess;
