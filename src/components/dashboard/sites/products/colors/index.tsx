import { ButtonLoading } from "@/components/_common/buttons/button-loading";
import { DataTable } from "@/components/_common/data-table-generic/data-table";
import { DataTableColumnHeader } from "@/components/_common/data-table-generic/data-table-column-header";
import { DataOnlyTable } from "@/components/_common/data-table-origin/data-only-table";
import {
  isActive_options,
  isDeleted_options,
} from "@/components/_common/filters";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput, FormSwitch } from "@/lib/form-custom-shadcn";
import { productXColorService } from "@/services/product-x-color-service";
import { colorService } from "@/services/color-service";
import {
  ProductXColorCreateCommand,
  ProductXColorUpdateCommand,
} from "@/types/commands/product-x-color-command";
import { ColorCreateCommand } from "@/types/commands/color-command";
import { ProductXColor } from "@/types/product-x-color";
import { ColorGetAllQuery } from "@/types/queries/color-query";
import { Color } from "@/types/color";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GrSubtract } from "react-icons/gr";
import { HiOutlinePlus } from "react-icons/hi";
import { toast } from "sonner";
import { z } from "zod";
import { columns } from "./columns";
interface DataTableColorsProps {
  productId?: string;
  productXColors?: ProductXColor[];
  tab?: number;
}

const formSchema = z.object({
  name: z.string().min(1, "Name is required").nullable(),
  isActive: z.boolean().default(false),
});

export default function DataTableColors({
  productId,
  tab,
  productXColors,
}: DataTableColorsProps) {
  const [getQueryParams, setGetQueryParams] = useState<ColorGetAllQuery>();

  useEffect(() => {
    const defaultQueryParams: ColorGetAllQuery = {
      isPagination: true,
      isDeleted: false,
      productId: productId,
    };

    setGetQueryParams(defaultQueryParams);
  }, [productId]);

  const queryClient = useQueryClient();

  const handleRemoveColor = (value: ProductXColor) => {
    const productXColor_: ProductXColorUpdateCommand = {
      colorId: value.colorId,
      productId: productId,
    };

    productXColorService.delete_(productXColor_).then(async (response) => {
      if (response.status === 1) {
        queryClient.invalidateQueries({ queryKey: ["product", productId] });
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    });
  };

  const handleAddColor = (value: Color) => {
    const productXColor_: ProductXColorCreateCommand = {
      colorId: value.id,
      productId: productId,
      isActive: true,
    };

    productXColorService.create(productXColor_).then((response) => {
      if (response.status === 1) {
        queryClient.invalidateQueries({ queryKey: ["product", productId] });
        queryClient.invalidateQueries({ queryKey: ["data", getQueryParams] });
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    });
  };

  const handleUpdateColor = (row: ProductXColor, isActive: boolean) => {
    const productXColor_: ProductXColorUpdateCommand = {
      colorId: row.colorId,
      productId: productId,
      isActive: isActive,
    };

    productXColorService.update(productXColor_).then((response) => {
      if (response.status === 1) {
        queryClient.invalidateQueries({ queryKey: ["product", productId] });
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    });
  };

  const columns_tab0: ColumnDef<ProductXColor>[] = [
    {
      accessorKey: "select",
      header: ({ table }) => <></>,
      cell: ({ row }) => (
        <Button
          type="button"
          variant="outline"
          color="icon"
          onClick={() => handleRemoveColor(row.original)}
        >
          <GrSubtract />
        </Button>
      ),
    },
    {
      accessorKey: "activeEdit",
      header: ({ table }) => <p>Edit active</p>,
      cell: ({ row }) => {
        const isActive = row.getValue("isActive") as boolean;
        return isActive ? (
          <Button
            type="button"
            variant="outline"
            color="icon"
            onClick={() => handleUpdateColor(row.original, false)}
          >
            <Badge variant={"default"}>On</Badge>
          </Button>
        ) : (
          <Button
            type="button"
            variant="outline"
            color="icon"
            onClick={() => handleUpdateColor(row.original, true)}
          >
            <Badge variant={"destructive"}>Off</Badge>
          </Button>
        );
      },
    },
    ...columns,
  ];

  const columns_tab1: ColumnDef<Color>[] = [
    {
      accessorKey: "select",
      header: ({ table }) => <></>,
      cell: ({ row }) => {
        return (
          <Button
            type="button"
            color="icon"
            onClick={() => handleAddColor(row.original)}
          >
            <HiOutlinePlus />
          </Button>
        );
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
    },

    {
      accessorKey: "createdDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Data created" />
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdDate"));
        return date.toLocaleDateString("en-US", {
          weekday: "short", // Thu
          year: "numeric", // 2022
          month: "short", // Oct
          day: "numeric", // 20
        });
      },
    },
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const updatedValues: ColorCreateCommand = {
        name: data.name,
      };
      colorService.create(updatedValues).then((response) => {
        if (response.status === 1) {
          const colorId = response.data?.id;
          if (colorId) {
            const productXColor_: ProductXColorCreateCommand = {
              colorId: colorId,
              productId,
              isActive: data.isActive,
            };
            productXColorService.create(productXColor_).then((response) => {
              if (response.status === 1) {
                queryClient.invalidateQueries({
                  queryKey: ["product", productId],
                });

                toast.success(response.message);
              } else {
                toast.error(response.message);
              }
            });
          }
        } else {
          toast.error(response.message);
        }
        setIsLoading(false);
      });
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  return tab == 0 ? (
    <div className="grid gap-3">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormSwitch form={form} name="isActive" label="Is Active" />
            <FormInput form={form} name="name" label="Name" />
            <ButtonLoading disabled={isLoading}>Add Color</ButtonLoading>
          </form>
        </Form>
      </div>
      <DataOnlyTable columns={columns_tab0} data={productXColors ?? []} />
    </div>
  ) : (
    <DataTable
      columns={columns_tab1}
      fetchData={colorService.fetchAll}
      columnSearch="name"
      defaultParams={getQueryParams}
      filterEnums={[
        { columnId: "isActive", title: "Is Active", options: isActive_options },
        {
          columnId: "isDeleted",
          title: "Is deleted",
          options: isDeleted_options,
        },
      ]}
    />
  );
}
