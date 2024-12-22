import { columns } from "./columns";

import { isDeleted_options } from "@/components/common/filters";

import { DataTable } from "@/components/common/data-table-generic/data-table";
import DataTablePhotos from "@/components/dashboard/sections/products/photos";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { productService } from "@/services/product-service";
import { productXSizeService } from "@/services/product-x-size-service";
import { FilterEnum } from "@/types/filter-enum";
import { ProductXSizeGetAllQuery } from "@/types/queries/product-x-size-query";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import { formFilterAdvanceds } from "./filter-advanced-form";
import DataTableSizes from "./sizes";
import DataTableColors from "./colors";
import { productXColorService } from "@/services/product-x-color-service";
import { ProductXColorGetAllQuery } from "@/types/queries/product-x-color-query";

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

  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q");

  // Fetch product
  const { data: product, isLoading: isProductLoading } = useQuery({
    queryKey: ["product", queryParam?.toLowerCase()],
    queryFn: async () => {
      const response = await productService.fetchById(queryParam as string);
      return response.data;
    },
    enabled: !!queryParam,
  });

  // Fetch product sizes
  const { data: productXSizes, isLoading: isSizesLoading } = useQuery({
    queryKey: ["productXSizes", product?.id],
    queryFn: async () => {
      if (!product?.id) return null;
      const query: ProductXSizeGetAllQuery = {
        productId: product.id,
        isPagination: false,
      };
      const response = await productXSizeService.fetchAll(query);
      return response.data?.results;
    },
    enabled: !!product?.id,
  });

  // Fetch product colors
  const { data: productXColors, isLoading: isColorsLoading } = useQuery({
    queryKey: ["productXColors", product?.id],
    queryFn: async () => {
      if (!product?.id) return null;
      const query: ProductXColorGetAllQuery = {
        productId: product.id,
        isPagination: false,
      };
      const response = await productXColorService.fetchAll(query);
      return response.data?.results;
    },
    enabled: !!product?.id,
  });

  const isLoading = isProductLoading || isSizesLoading || isColorsLoading;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Tabs defaultValue="item-1">
      <TabsList>
        <TabsTrigger value="item-1">Products</TabsTrigger>
        <TabsTrigger value="item-2">Features</TabsTrigger>
      </TabsList>
      <TabsContent value="item-1">
        <DataTable
          deleteAll={productService.delete}
          deletePermanent={productService.deletePermanent}
          fetchData={productService.fetchAll}
          restore={productService.restore}
          columns={columns}
          columnSearch="name"
          filterEnums={filterEnums}
          formSchema={formFilterAdvancedSchema}
          formFilterAdvanceds={formFilterAdvanceds}
        />
      </TabsContent>
      <TabsContent value="item-2">
        {product && (
          <>
            {/* Tab cho productXPhotos */}
            <Tabs defaultValue="photos-selected" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="photos-selected">Selected Photos</TabsTrigger>
                <TabsTrigger value="photos-available">Available Photos</TabsTrigger>
              </TabsList>

              <TabsContent value="photos-selected">
                <Card className="p-4">
                  <DataTablePhotos
                    productId={product.id}
                    productXPhotos={product.productXPhotos ?? []}
                    tab={0}
                  />
                </Card>
              </TabsContent>
              <TabsContent value="photos-available">
                <Card className="p-4">
                  <DataTablePhotos
                    productId={product.id}
                    productXPhotos={product.productXPhotos ?? []}
                    tab={1}
                  />
                </Card>
              </TabsContent>
            </Tabs>

            {/* Tab cho productXSizes */}
            <Tabs defaultValue="sizes-selected" className="w-full mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="sizes-selected">Selected Sizes</TabsTrigger>
                <TabsTrigger value="sizes-available">Available Sizes</TabsTrigger>
              </TabsList>

              <TabsContent value="sizes-selected">
                <Card className="p-4">
                  <DataTableSizes
                    productId={product.id}
                    productXSizes={productXSizes ?? []}
                    tab={0}
                  />
                </Card>
              </TabsContent>
              <TabsContent value="sizes-available">
                <Card className="p-4">
                  <DataTableSizes
                    productId={product.id}
                    productXSizes={productXSizes ?? []}
                    tab={1}
                  />
                </Card>
              </TabsContent>
            </Tabs>

             {/* Tab cho productXColors */}
             <Tabs defaultValue="colors-selected" className="w-full mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="colors-selected">Selected Colors</TabsTrigger>
                <TabsTrigger value="colors-available">Available Colors</TabsTrigger>
              </TabsList>

              <TabsContent value="colors-selected">
                <Card className="p-4">
                  <DataTableColors
                    productId={product.id}
                    productXColors={productXColors ?? []}
                    tab={0}
                  />
                </Card>
              </TabsContent>
              <TabsContent value="colors-available">
                <Card className="p-4">
                  <DataTableColors
                    productId={product.id}
                    productXColors={productXColors ?? []}
                    tab={1}
                  />
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </TabsContent>
    </Tabs>
  );
}
