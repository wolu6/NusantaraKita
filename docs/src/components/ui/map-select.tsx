"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface MapSelectProps<T> {
  data: T[];
  selectedValue: T | null;
  onSelect: (item: T) => void;
  placeholder?: string;
  getLabel: (item: T) => string;
  getValue: (item: T) => string | number;
  disabled?: boolean;
  onOpen?: () => void;
  isLoading?: boolean;
  onReachEnd?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

export function MapSelect<T>({
  data,
  selectedValue,
  onSelect,
  placeholder = "Pilih Data",
  getLabel,
  getValue,
  disabled,
  onOpen,
  isLoading,
  onReachEnd,
  hasNextPage,
  isFetchingNextPage,
}: MapSelectProps<T>) {
  return (
    <Select
      value={selectedValue ? String(getValue(selectedValue)) : ""}
      onValueChange={(value) => {
        const selectedItem = data.find((item) => String(getValue(item)) === value);
        if (selectedItem) {
          onSelect(selectedItem);
        }
      }}
      onOpenChange={(open) => {
        if (open && onOpen) onOpen();
      }}
    >
      <SelectTrigger className="w-full cursor-pointer" disabled={disabled}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        <div
          onScroll={(e) => {
            const bottomReached = e.currentTarget.scrollTop + e.currentTarget.clientHeight >= e.currentTarget.scrollHeight - 10;
            if (bottomReached && hasNextPage && !isFetchingNextPage && onReachEnd) {
              onReachEnd();
            }
          }}
          className="max-h-60 overflow-y-auto"
        >
          {isLoading ? (
            <div className="flex items-center justify-center p-6">
              <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
            </div>
          ) : data.length === 0 ? (
            <SelectItem value="kosong" disabled>
              Data kosong
            </SelectItem>
          ) : (
            <>
              {data.map((item) => (
                <SelectItem key={getValue(item)} value={String(getValue(item))}>
                  {getLabel(item)}
                </SelectItem>
              ))}

              {isFetchingNextPage && (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                </div>
              )}
            </>
          )}
        </div>
      </SelectContent>
    </Select>
  );
}
