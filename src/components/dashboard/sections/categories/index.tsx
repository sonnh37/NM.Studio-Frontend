import { columns } from "./columns";

import { isDeleted_options } from "@/components/common/filters";

import { DataTable } from "@/components/common/data-table-generic/data-table";
import { FilterEnum } from "@/types/filter-enum";
import { formFilterAdvanceds } from "./filter-advanced-form";
import { categoryService } from "@/services/category-service";
import { z } from "zod";

import { Card } from "@/components/ui/card";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import DataTableSubCategorys from "./sub-categories";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

export default function DataTableCategorys() {
  const filterEnums: FilterEnum[] = [
    { columnId: "isDeleted", title: "Is deleted", options: isDeleted_options },
  ];
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q");
  const { data: category, isLoading } = useQuery({
    queryKey: ["category", queryParam?.toLowerCase()], // Cache theo queryParam
    queryFn: async () => {
      const response = await categoryService.fetchById(queryParam as string);
      return response.data;
    }, // Gọi API với queryParam
  });

  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading && queryParam && tabsRef.current) {
      tabsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isLoading, queryParam]);
  return (
      <Tabs defaultValue={"item-1"} className="w-full">
        <TabsList>
          <TabsTrigger value="item-1">List</TabsTrigger>
          <TabsTrigger value="item-2">Sub-Categories</TabsTrigger>
        </TabsList>
        <TabsContent value="item-1">
          <DataTable
            deleteAll={categoryService.delete}
            deletePermanent={categoryService.deletePermanent}
            update={categoryService.update}
            columns={columns}
            fetchData={categoryService.fetchAll}
            columnSearch="name"
            filterEnums={filterEnums}
            formSchema={formFilterAdvancedSchema}
            formFilterAdvanceds={formFilterAdvanceds}
          />
        </TabsContent>
        <TabsContent value="item-2">
          {isLoading || !category ? (
            <></>
          ) : (
            <Tabs ref={tabsRef} defaultValue="selected" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="selected">Selected</TabsTrigger>
                <TabsTrigger value="available">Available</TabsTrigger>
              </TabsList>

              <TabsContent value="selected">
                <Card className="p-4">
                  <DataTableSubCategorys
                    categoryId={category.id}
                    subCategories={category.subCategories ?? []}
                    tab={0}
                  />
                </Card>
              </TabsContent>
              <TabsContent value="available">
                <Card className="p-4">
                  <DataTableSubCategorys
                    categoryId={category.id}
                    subCategories={category.subCategories ?? []}
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
