import useParams from "@/hooks/use-params";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

export const LIMI_PER_PAGE = [5, 10, 20, 30, 40, 50];

export default function LimitPerPage() {
  const { params, setParams } = useParams();

  return (
    <div className="flex items-center">
      <span className="mr-2">Tampilkan :</span>
      <Select
        value={params.limit.toString()}
        onValueChange={(value) => {
          setParams({ limit: Number(value) });
        }}
      >
        <SelectTrigger className="w-fit">
          <SelectValue placeholder={params.limit.toString()} />
        </SelectTrigger>
        <SelectContent>
          {LIMI_PER_PAGE.map((limit) => (
            <SelectItem key={limit} value={limit.toString()}>
              {limit}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
