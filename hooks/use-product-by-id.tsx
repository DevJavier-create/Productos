import { useQuery } from "@tanstack/react-query";
import { GetProductById } from "@/lib/api";
export const UseProductById = (id: number) => {
  return useQuery({
    queryKey: ["producto", id],
    queryFn: () => GetProductById(id),
  });
};
