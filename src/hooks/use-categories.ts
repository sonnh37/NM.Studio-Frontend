import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/services/category-service";
import { CategoryGetAllQuery } from "@/types/cqrs/queries/category-query";
import { processResponse } from "@/lib/utils";

export const useCategories = (query: CategoryGetAllQuery) => {
  return useQuery({
    queryKey: ["categories", query],
    queryFn: () => categoryService.getAll(query),
    select: (data) => processResponse(data).results,
    refetchOnWindowFocus: false,
  });
};
