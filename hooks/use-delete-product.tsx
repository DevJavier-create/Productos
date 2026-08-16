import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteProduct } from "@/lib/api";
export const UseDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DeleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["productos"],
      });
    },
  });
};
