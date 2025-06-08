import type React from "react";

export interface NotesProps {
  items: (string | React.JSX.Element)[];
}

export const Notes: React.FC<NotesProps> = ({ items }) => {
  return (
    <div className="mb-10">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Notes</h3>
      <ul className="list-disc list-outside space-y-2 text-gray-700 pl-4">
        {items.map((item, index) => (
          <li key={`note-${index}`}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
