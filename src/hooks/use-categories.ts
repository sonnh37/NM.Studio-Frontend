import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/services/category-service";
import { CategoryGetAllQuery } from "@/types/queries/category-query";

export const useCategories = (query: CategoryGetAllQuery) => {
  return useQuery({
    queryKey: ["categories", query],
    queryFn: async () => {
      const response = await categoryService.getAll(query);
      return response.data?.results ?? [];
    },
    refetchOnWindowFocus: false,
  });
};
