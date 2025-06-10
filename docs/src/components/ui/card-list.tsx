import { CardItem, type CardItemData } from "./card-item";

interface CardListProps {
  listData: CardItemData[][];
}

export const CardList: React.FC<CardListProps> = ({ listData }) => {
  return (
    <div className="flex flex-col gap-4">
      {listData.map((items, index) => (
        <CardItem key={index} items={items} />
      ))}
    </div>
  );
};
