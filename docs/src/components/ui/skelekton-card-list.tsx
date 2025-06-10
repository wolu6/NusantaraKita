import { SkeletonCardItem } from "./skelekton-card-item";

interface CardListSkeletonProps {
  count?: number;
}

export const CardListSkeleton: React.FC<CardListSkeletonProps> = ({ count = 3 }) => {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCardItem key={index} />
      ))}
    </div>
  );
};
