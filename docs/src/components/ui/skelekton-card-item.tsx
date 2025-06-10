import React from "react";

export const SkeletonCardItem: React.FC = () => {
  return (
    <div className="flex animate-pulse items-center space-x-4 rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex-1 space-y-3 py-1">
        <div className="flex items-center gap-3">
          <div className="h-4 w-1/12 rounded bg-gray-300"></div>
          <div className="h-4 w-3/6 rounded bg-gray-300"></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-4 w-1/12 rounded bg-gray-300"></div>
          <div className="h-4 w-3/6 rounded bg-gray-300"></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-4 w-1/12 rounded bg-gray-300"></div>
          <div className="h-4 w-3/4 rounded bg-gray-300"></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-4 w-1/12 rounded bg-gray-300"></div>
          <div className="h-4 w-3/5 rounded bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};
