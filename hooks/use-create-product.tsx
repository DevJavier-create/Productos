import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostProduct } from "@/lib/api";
export const UseCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PostProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["productos"],
      });
    },
  });
};
