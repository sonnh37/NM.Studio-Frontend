import { useQuery } from "@tanstack/react-query";
import { serviceService } from "@/services/service-service";
import { ServiceGetAllQuery } from "@/types/queries/service-query";

export const useServices = (query: ServiceGetAllQuery) => {
  return useQuery({
    queryKey: ["services", query],
    queryFn: async () => {
      const response = await serviceService.fetchAll(query);
      return response.data?.results ?? [];
    },
    refetchOnWindowFocus: false,
  });
};
