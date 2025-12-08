import { useQuery } from "@tanstack/react-query";
import { serviceService } from "@/services/service-service";
import { ServiceGetAllQuery } from "@/types/cqrs/queries/service-query";
import { processResponse } from "@/lib/utils";

export const useServices = (query: ServiceGetAllQuery) => {
  return useQuery({
    queryKey: ["services", query],
    queryFn: () => {
      return serviceService.getAll(query);
    },
    select: (data) => processResponse(data).results,
    refetchOnWindowFocus: false,
  });
};
