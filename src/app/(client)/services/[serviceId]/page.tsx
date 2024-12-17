"use client";
import { DisplayContent } from "@/components/client/common/display-content";
import { formatDate } from "@/lib/utils";
import { serviceService } from "@/services/service-service";
import { ServiceGetAllQuery } from "@/types/queries/service-query";
import { Service } from "@/types/service";
import { useQuery } from "@tanstack/react-query";
import ErrorPage from "../../error/page";

export default function Page({ params }: { params: { serviceId: string } }) {
  const { serviceId } = params;
  const query: ServiceGetAllQuery = {
    isNotNullSlug: true,
    isDeleted: [false],
    isPagination: true,
    pageSize: 1,
    pageNumber: 1,
    slug: serviceId,
  };

  const { data: service, error } = useQuery({
    queryKey: ["fetchService"],
    queryFn: async () => {
      const response = await serviceService.fetchAll(query);
      return response.data?.results?.[0] as Service;
    },
  });

  if (error) {
    console.log("Error fetching:", error);
    return <ErrorPage />;
  }

  return (
    <>
      {service && (
        <div className="service-details container mx-auto py-16 space-y-8">
          <div className="grid justify-center gap-8">
            <div className="grid justify-center gap-2 ">
              <h1 className="text-4xl text-center">{service.name}</h1>
              <div className="flex flex-row justify-center gap-4">
                <p className="text-gray-500 text-sm">
                  {service.createdBy ?? "Admin"}
                </p>
                <p className="text-gray-500 text-sm">|</p>
                <p className="text-gray-500 text-sm">
                  {formatDate(service.createdDate)}
                </p>
              </div>
            </div>
          </div>
          <div className="container">
            <DisplayContent value={service.description ?? ""} />
          </div>
        </div>
      )}
    </>
  );
}
