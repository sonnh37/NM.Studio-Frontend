import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/services/category-service";
import { CategoryGetAllQuery } from "@/types/cqrs/queries/category-query";

export const useCategories = (query: CategoryGetAllQuery) => {
  return useQuery({
    queryKey: ["categories", query],
    queryFn: () => categoryService.getAll(query),
    select: (data) => data.data?.results,
    refetchOnWindowFocus: false,
  });
};
