import React, { useState } from "react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IconFolderCode } from "@tabler/icons-react";
import { CirclePlus, ArrowUpRight, Plus, Trash2, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product, ProductStatus } from "@/types/entities/product";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  InventoryStatus,
  ProductVariant,
} from "@/types/entities/product-variant";
import { Separator } from "@/components/ui/separator";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { getEnumLabel } from "@/lib/utils/enum-utils";
import { processResponse } from "@/lib/utils";
import { TypographyMuted } from "@/components/_common/typography/typography-muted";
import { FieldInput } from "@/lib/field-tanstack/field-input";
import { TypographyH4 } from "@/components/_common/typography/typography-h4";
import { TypographyList } from "@/components/_common/typography/typography-list";
import { TypographyP } from "@/components/_common/typography/typography-p";
import { productVariantService } from "@/services/product-variant-service";
import { ProductVariantCreateCommand } from "@/types/cqrs/commands/product-variant-command";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { DataOnlyTable } from "@/components/_common/data-table-origin/data-only-table";
import { columns } from "./columns";
import { DataTableComponent } from "@/components/_common/data-table-generic/data-table-component";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { DataTableDownload } from "@/components/_common/data-table-generic/data-table-download";
import { DataTableFilterSheet } from "@/components/_common/data-table-generic/data-table-filter-sheet";
import { DataTableSortColumnsPopover } from "@/components/_common/data-table-generic/data-table-sort-column";
import { DataTableToggleColumnsPopover } from "@/components/_common/data-table-generic/data-table-toggle-columns";
import { DataTableToolbar } from "@/components/_common/data-table-generic/data-table-toolbar";
import { DeleteBaseEntitysDialog } from "@/components/_common/data-table-generic/delete-dialog-generic";
import { productService } from "@/services/product-service";

interface SheetAddVariantProps {
  product: Product;
}

export const SheetAddVariant = ({ product }: SheetAddVariantProps) => {
  const queryClient = useQueryClient();
  const [variants, setVariants] = useState<ProductVariantCreateCommand[]>([
    {
      productId: product.id,
      sku: "",
      color: "",
      size: "",
      price: 0,
      rentalPrice: 0,
      deposit: 0,
      stockQuantity: 0,
      stockDefaultQuantity: 0,
      status: InventoryStatus.Available,
    },
  ]);

  const handleSaveVariant = async () => {
    // TODO: Implement save variant logic
    console.log("Saving variants:", variants);
    try {
      const response = await productVariantService.createList(variants);
      processResponse(response);
      queryClient.refetchQueries({
        queryKey: ["fetchProductById", product.id],
      });
      toast.success("Variants saved successfully");
    } catch (error: any) {
      console.error("Error saving variants:", error);
      toast.error(error.message);
    }
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      {
        sku: "",
        color: "",
        size: "",
        price: 0,
        rentalPrice: 0,
        deposit: 0,
        stockQuantity: 0,
        stockDefaultQuantity: 0,
        status: InventoryStatus.Available,
      },
    ]);
  };

  const removeVariant = (index: number) => {
    if (variants.length > 1) {
      setVariants(variants.filter((_, i) => i !== index));
    }
  };

  const updateVariant = (index: number, field: string, value: any) => {
    const updatedVariants: ProductVariantCreateCommand[] = [...variants];
    updatedVariants[index] = {
      productId: product.id,
      ...updatedVariants[index],
      [field]: value,
    };
    setVariants(updatedVariants);
  };

  const hasVariants = product?.variants && product.variants.length > 0;

  const inventoryStatusOptions = [
    { value: InventoryStatus.Available, label: "Available" },
    { value: InventoryStatus.Rented, label: "Rented" },
    { value: InventoryStatus.InMaintenance, label: "In Maintenance" },
  ];
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data: product.variants ?? [],
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getRowId: (originalRow) => originalRow.id,
  });

  const renderVariantTable = () => {
    if (!hasVariants) {
      return (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-muted-foreground py-8">
              <p className="font-medium">No data added</p>
              <p className="text-sm mt-1">
                The variant you added, will be displayed here
              </p>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>Variant Table</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTableComponent
            // isLoading={isFetching}
            deletePermanentFunc={(command) =>
              productVariantService.delete(command)
            }
            updateUndoFunc={(command) => productVariantService.update(command)}
            table={table}
            queryKey={"fetchProductById"}
          >
            <DataTableToolbar table={table}>
              <DeleteBaseEntitysDialog
                list={table
                  .getFilteredSelectedRowModel()
                  .rows.map((row) => row.original)}
                query_keys={["fetchProductById"]}
                deleteFunc={(command) => productVariantService.delete(command)}
                onSuccess={() => table.toggleAllRowsSelected(false)}
              />

              <DataTableSortColumnsPopover table={table} />
              <DataTableToggleColumnsPopover table={table} />
            </DataTableToolbar>
          </DataTableComponent>
        </CardContent>
      </Card>
    );
  };

  const renderVariantForm = (
    variant: ProductVariantCreateCommand,
    index: number
  ) => (
    <Card key={index}>
      {/* Header với nút xóa */}
      <CardContent>
        <div className="flex items-center justify-between pb-4">
          <TypographyP className="font-medium">Variant {index + 1}</TypographyP>
          {variants.length > 1 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeVariant(index)}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="grid gap-4">
          {/* Variant Details */}
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor={`sku-${index}`}>SKU</FieldLabel>
              <Input
                id={`sku-${index}`}
                placeholder="Enter SKU"
                value={variant.sku || ""}
                onChange={(e) => updateVariant(index, "sku", e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor={`status-${index}`}>Status</FieldLabel>
              <Select
                value={variant.status?.toString()}
                onValueChange={(value) =>
                  updateVariant(
                    index,
                    "status",
                    Number(value) as InventoryStatus
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {inventoryStatusOptions.map((status) => (
                    <SelectItem
                      key={status.value}
                      value={status.value.toString()}
                    >
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor={`color-${index}`}>Color</FieldLabel>
              <Input
                id={`color-${index}`}
                placeholder="Color"
                value={variant.color || ""}
                onChange={(e) => updateVariant(index, "color", e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`size-${index}`}>Size</FieldLabel>
              <Input
                id={`size-${index}`}
                placeholder="Size"
                value={variant.size || ""}
                onChange={(e) => updateVariant(index, "size", e.target.value)}
              />
            </Field>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Field>
              <FieldLabel htmlFor={`price-${index}`}>Price (VND)</FieldLabel>
              <Input
                id={`price-${index}`}
                type="number"
                placeholder="0.00"
                value={variant.price || 0}
                onChange={(e) =>
                  updateVariant(index, "price", Number(e.target.value))
                }
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`rental-price-${index}`}>
                Rental Price ($)
              </FieldLabel>
              <Input
                id={`rental-price-${index}`}
                type="number"
                placeholder="0.00"
                value={variant.rentalPrice || 0}
                onChange={(e) =>
                  updateVariant(index, "rentalPrice", Number(e.target.value))
                }
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`deposit-${index}`}>Deposit ($)</FieldLabel>
              <Input
                id={`deposit-${index}`}
                type="number"
                placeholder="0.00"
                value={variant.deposit || 0}
                onChange={(e) =>
                  updateVariant(index, "deposit", Number(e.target.value))
                }
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor={`stock-${index}`}>Stock Quantity</FieldLabel>
              <Input
                id={`stock-${index}`}
                type="number"
                placeholder="0"
                value={variant.stockQuantity || 0}
                onChange={(e) =>
                  updateVariant(index, "stockQuantity", Number(e.target.value))
                }
              />
            </Field>

            <Field>
              <FieldLabel htmlFor={`price-${index}`}>
                Default Quantity
              </FieldLabel>
              <Input
                id={`default-quantity-${index}`}
                type="number"
                placeholder="0"
                value={variant.stockDefaultQuantity || 0}
                onChange={(e) =>
                  updateVariant(
                    index,
                    "stockDefaultQuantity",
                    Number(e.target.value)
                  )
                }
              />
            </Field>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (hasVariants) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Variants</h3>
            <p className="text-sm text-muted-foreground">
              Manage your product variants and inventory
            </p>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button>
                <CirclePlus /> Add Variant
              </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-2xl overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Add Product Variants</SheetTitle>
                <SheetDescription>
                  Add new variants for {product.name}
                </SheetDescription>
              </SheetHeader>

              <div className="grid flex-1 auto-rows-min gap-6 px-4 py-4">
                {/* Dynamic Variant Forms */}
                <div className="space-y-4">
                  {variants.map((variant, index) =>
                    renderVariantForm(variant, index)
                  )}

                  {/* Add Variant Button */}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addVariant}
                    className="w-full"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Another Variant
                  </Button>
                </div>

                {/* Variant Table Preview */}

                {/* Learn More Link */}
                <div className="text-center">
                  <Button
                    variant="link"
                    asChild
                    className="text-muted-foreground"
                    size="sm"
                  >
                    <a href="#">
                      Learn more about Product variant{" "}
                      <ArrowUpRight className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>

              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="outline">Cancel</Button>
                </SheetClose>
                <Button onClick={handleSaveVariant}>Save Variants</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {renderVariantTable()}
      </div>
    );
  }

  // Empty state when no variants
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconFolderCode />
        </EmptyMedia>
        <EmptyTitle>There's no variant</EmptyTitle>
        <EmptyDescription>
          You can add more variants for your product to manage stock by clicking
          add variant button below
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button>
                <CirclePlus className="mr-2 h-4 w-4" /> Add Variant
              </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-2xl overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Add Product Variants</SheetTitle>
                <Separator />
              </SheetHeader>

              <div className="grid flex-1 auto-rows-min gap-6 px-4 py-4">
                <FieldGroup>
                  <FieldSet>
                    <FieldLegend>Product Detail</FieldLegend>
                    <FieldGroup>
                      <Field>
                        <FieldLabel>{product.name}</FieldLabel>
                        <Card>
                          <CardContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>
                                    <TypographyMuted>Category</TypographyMuted>
                                  </TableHead>
                                  <TableHead>
                                    <TypographyMuted>
                                      Sub-Category
                                    </TypographyMuted>
                                  </TableHead>
                                  <TableHead>
                                    <TypographyMuted> Sku </TypographyMuted>
                                  </TableHead>
                                  <TableHead>
                                    <TypographyMuted> Status </TypographyMuted>
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow key={product.id}>
                                  <TableCell className="font-medium">
                                    {product.category?.name}
                                  </TableCell>
                                  <TableCell className="font-medium">
                                    {product.subCategory?.name}
                                  </TableCell>
                                  <TableCell className="font-medium">
                                    {product.sku}
                                  </TableCell>
                                  <TableCell className="font-medium">
                                    {getEnumLabel(
                                      ProductStatus,
                                      product.status
                                    )}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>
                      </Field>
                    </FieldGroup>

                    <FieldGroup>
                      <Field>
                        <div className="flex justify-between items-center mb-4">
                          <FieldLabel>Variant</FieldLabel>
                          <Button variant={"link"} onClick={addVariant}>
                            <Plus /> Add variant
                          </Button>
                        </div>

                        {/* Dynamic Variant Forms */}
                        <div className="grid gap-4 space-y-4">
                          {variants.map((variant, index) =>
                            renderVariantForm(variant, index)
                          )}
                        </div>
                      </Field>
                    </FieldGroup>
                  </FieldSet>
                </FieldGroup>

                {/* Variant Table Preview */}
              </div>

              <SheetFooter className="flex flex-row justify-end gap-2">
                <SheetClose asChild>
                  <Button variant="link">Cancel</Button>
                </SheetClose>
                <Button onClick={handleSaveVariant}>Save Variants</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </EmptyContent>
    </Empty>
  );
};
