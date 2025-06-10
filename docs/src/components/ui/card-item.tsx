import type { IconType } from "react-icons/lib";

export type CardItemData = {
  icon: IconType;
  title?: string;
  value: string;
};

export interface CardItemProps {
  items: CardItemData[];
}

export const CardItem: React.FC<CardItemProps> = ({ items }) => {
  return (
    <div className="border border-gray-300 rounded-xl p-4 pl-6 relative flex flex-col gap-2 bg-white shadow-sm overflow-hidden">
      <div className="absolute w-1.5 h-full bg-primary top-0 left-0" />
      {items.map((item, index) => (
        <div key={index} className="flex items-center text-[#4A4A4A] gap-2">
          <item.icon />
          <span className="font-medium">
            {item.title ? `${item.title}: ` : ""} {item.value}
          </span>
        </div>
      ))}
    </div>
  );
};
