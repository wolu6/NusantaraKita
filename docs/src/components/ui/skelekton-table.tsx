interface SkeletonTableProps {
  columnCount: number;
  rowCount: number;
}

const SkeletonTable: React.FC<SkeletonTableProps> = ({ columnCount, rowCount }) => {
  const headerStyle = "bg-[#4A4A4A] text-white text-left";
  const thStyle = "py-3 px-4 font-semibold";
  const tdStyle = "py-3 px-4 border-b border-gray-200";

  return (
    <div className="overflow-x-auto shadow-md rounded-lg animate-pulse">
      <table className="min-w-full bg-white">
        <thead className={headerStyle}>
          <tr>
            {Array.from({ length: columnCount }).map((_, index) => (
              <th key={index} className={thStyle}>
                <div className="h-4 bg-gray-500 rounded w-3/4"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columnCount }).map((_, colIndex) => (
                <td key={colIndex} className={tdStyle}>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkeletonTable;
