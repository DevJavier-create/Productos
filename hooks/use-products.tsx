import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { GetProducts } from "@/lib/api";

export const UseProducts = () => {
  return useQuery({
    queryKey: ["productos"],
    queryFn: GetProducts,
  });
};
