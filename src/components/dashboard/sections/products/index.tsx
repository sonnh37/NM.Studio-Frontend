import { columns } from "./columns";

import { isDeleted_options } from "@/components/common/filters";

import { DataTable } from "@/components/common/data-table-generic/data-table";
import { FilterEnum } from "@/types/filter-enum";
import { formFilterAdvanceds } from "./filter-advanced-form";
import { productService } from "@/services/product-service";
import { z } from "zod";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import DataTablePhotos from "@/components/dashboard/sections/products/photos";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

const formFilterAdvancedSchema = z.object({
  id: z.string().nullable().optional(),
  date: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .refine((date) => !!date.to, { message: "End Date is required." })
    .optional(),
  isDeleted: z.boolean().nullable().optional(),
});

export default function DataTableProducts() {
  const filterEnums: FilterEnum[] = [
    { columnId: "isDeleted", title: "Is deleted", options: isDeleted_options },
  ];
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q");
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", queryParam?.toLowerCase()], // Cache theo queryParam
    queryFn: async () => {
      const response = await productService.fetchById(queryParam as string);
      return response.data;
    },
  });

  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading && queryParam && tabsRef.current) {
      tabsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isLoading, queryParam]);
  return (
      <Tabs defaultValue="item-1">
        <TabsList>
          <TabsTrigger value="item-1">Albums</TabsTrigger>
          <TabsTrigger value="item-2">Photos</TabsTrigger>
        </TabsList>
        <TabsContent value="item-1">
          <DataTable
            deleteAll={productService.delete}
            deletePermanent={productService.deletePermanent}
            fetchData={productService.fetchAll}
            update={productService.update}
            columns={columns}
            columnSearch="name"
            filterEnums={filterEnums}
            formSchema={formFilterAdvancedSchema}
            formFilterAdvanceds={formFilterAdvanceds}
          />
        </TabsContent>
        <TabsContent value="item-2">
          {isLoading || !product ? (
            <></>
          ) : (
            <Tabs ref={tabsRef} defaultValue="selected" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="selected">Selected</TabsTrigger>
                <TabsTrigger value="available">Available</TabsTrigger>
              </TabsList>

              <TabsContent value="selected">
                <Card className="p-4">
                  <DataTablePhotos
                    productId={product.id}
                    productXPhotos={product.productXPhotos ?? []}
                    tab={0}
                  />
                </Card>
              </TabsContent>
              <TabsContent value="available">
                <Card className="p-4">
                  <DataTablePhotos
                    productId={product.id}
                    productXPhotos={product.productXPhotos ?? []}
                    tab={1}
                  />
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </TabsContent>
      </Tabs>
  );
}
