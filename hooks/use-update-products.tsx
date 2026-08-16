import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PutProduct, Product } from "@/lib/api";

export const UseUpdateProducts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, producto }: { id: number; producto: Product }) =>
      PutProduct(id, producto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["productos"],
      });
    },
  });
};
