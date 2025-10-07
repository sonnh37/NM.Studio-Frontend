"use client";
import { useForm } from "react-hook-form";

import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { productService } from "@/services/product-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePreviousPath } from "@/hooks/use-previous-path";
import ConfirmationDialog, {
  FormInput,
  FormInputNumber,
  FormInputTextArea,
  FormSelectEnum,
} from "@/lib/form-custom-shadcn";
import { getEnumOptions } from "@/lib/utils";
import { categoryService } from "@/services/category-service";
import { Category } from "@/types/entities/category";
import {
  ProductCreateCommand,
  ProductUpdateCommand,
} from "@/types/commands/product-command";
import { Product, ProductStatus } from "@/types/entities/product";
import { BusinessResult } from "@/types/models/business-result";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { HeaderForm } from "../../common/create-update-forms/header-form";
import { InformationBaseCard } from "../../common/create-update-forms/information-base-form";

interface ProductFormProps {
  initialData: Product | null;
}

const formSchema = z.object({
  id: z.string().optional(),
  subCategoryId: z.string().nullable(),
  name: z.string().min(1, "Name is required").nullable(),
  sku: z.string().nullable(),
  description: z.string().nullable().optional(),
  price: z.number().nullable().default(0),
  status: z.nativeEnum(ProductStatus).nullable(),
  createdDate: z.date().optional().default(new Date()),
  createdBy: z.string().nullable().optional().default(null),
  isDeleted: z.boolean().default(false),
});

export const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Edit product" : "Create product";
  const action = initialData ? "Save and continue" : "Create";
  const router = useRouter();
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [pendingValues, setPendingValues] = useState<z.infer<
    typeof formSchema
  > | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const previousPath = usePreviousPath();

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [categories, setCategories] = useState<Category[]>([]);

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          createdDate: initialData.createdDate
            ? new Date(initialData.createdDate)
            : new Date(),
        }
      : {},
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      if (initialData) {
        const updatedValues: ProductUpdateCommand = {
          ...values,
        };
        const response = await productService.update(updatedValues);
        if (response.status != 1) throw new Error(response.message);
        queryClient.refetchQueries({
          queryKey: ["fetchProductById", initialData.id],
        });
        toast.success(response.message);
        router.push(previousPath);
      } else {
        setPendingValues(values);
        setShowConfirmationDialog(true);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateConfirmation = async (): Promise<
    BusinessResult<Product>
  > => {
    if (!pendingValues) {
      toast.error("No pending values to create product.");
      return Promise.reject(new Error("No pending values"));
    }
    setIsLoading(true);
    try {
      const createdValues: ProductCreateCommand = {
        ...pendingValues,
      };
      const response = await productService.create(createdValues);
      if (response.status !== 1) throw new Error(response.message);

      toast.success(response.message);
      setShowConfirmationDialog(false);
      setPendingValues(null);
      setIsLoading(false);

      return response;
    } catch (error: any) {
      console.error("Error creating product:", error);
      toast.error(error.message || "Failed to create product.");
      setShowConfirmationDialog(false);
      setPendingValues(null);
      setIsLoading(false);
      return Promise.reject(error);
    }
  };

  const fetchCategories = async () => {
    const response = await categoryService.getAll();
    return response.data?.results;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await fetchCategories();
        setCategories(categories!);
        if (categories) {
          setSelectedCategory(
            categories.find(
              (ca) => ca.id == initialData?.subCategory?.categoryId
            ) ?? null
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <ConfirmationDialog
        isLoading={isLoading}
        open={showConfirmationDialog}
        setOpen={setShowConfirmationDialog}
        onConfirm={handleCreateConfirmation}
        onClose={async () => {
          const res = await handleCreateConfirmation();
          if (res.status != Status.OK) {
            return;
          }
          router.push(previousPath);
        }}
        title="Do you want to continue adding this product?"
        description="This action cannot be undone. Are you sure you want to permanently delete this file from our servers?"
        confirmText="Yes"
        cancelText="No"
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-2">
            <HeaderForm
              previousPath={previousPath}
              title={title}
              initialData={initialData}
              loading={loading}
              action={action}
            />
          </div>
          <div className="grid gap-4">
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="grid gap-4 lg:col-span-2">
                {/* main */}
                <Card className="overflow-x-hidden">
                  <CardContent className="p-6">
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <FormInput
                          form={form}
                          name="name"
                          label="Name"
                          description="This is your public display name."
                          placeholder="Enter name"
                        />
                        <FormInput
                          form={form}
                          name="sku"
                          label="Code"
                          description="This is your public display code."
                          placeholder="Enter code"
                        />

                        <FormInputTextArea
                          form={form}
                          name="description"
                          label="Description"
                          description="This is your public display description."
                          placeholder="Enter description"
                        />

                        <FormSelectEnum
                          form={form}
                          name="status"
                          label="Status"
                          description="Select the current status of the course."
                          enumOptions={getEnumOptions(ProductStatus)}
                          placeholder="Select status"
                        />

                        <FormInputNumber
                          form={form}
                          name="price"
                          label="Price"
                          placeholder="Enter price"
                          className="mt-2 w-full"
                        />

                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={(value) => {
                              const selectedCategory = categories.find(
                                (cat) => cat.id === value
                              );
                              setSelectedCategory(selectedCategory ?? null);
                            }}
                            value={
                              selectedCategory ? selectedCategory.id : undefined
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem
                                  key={category.id}
                                  value={category.id!}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>

                        <FormField
                          control={form.control}
                          name="subCategoryId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>SubCategory</FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={(value) =>
                                    field.onChange(value)
                                  }
                                  value={field.value ?? undefined} // Ensure the value is set correctly
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select subcategory" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {selectedCategory ? (
                                      <>
                                        {selectedCategory?.subCategories!.map(
                                          (subCategory) => (
                                            <SelectItem
                                              key={subCategory.id}
                                              value={subCategory.id!}
                                            >
                                              {subCategory.name}
                                            </SelectItem>
                                          )
                                        )}
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 h-fit">
                <InformationBaseCard form={form} initialData={initialData} />
              </div>
            </div>
            <div>{/* sub */}</div>
          </div>
        </form>
      </Form>
    </>
  );
};
