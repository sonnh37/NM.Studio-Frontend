"use client";
import { Resolver, useForm } from "react-hook-form";

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
  FormInputNumberCurrency,
  FormInputTextArea,
  FormSelectEnum,
  FormSelectObject,
  ImageUpload,
} from "@/lib/form-custom-shadcn";
import { getEnumOptions } from "@/lib/utils";
import { categoryService } from "@/services/category-service";
import { Category } from "@/types/entities/category";
import {
  ProductCreateCommand,
  ProductUpdateCommand,
} from "@/types/cqrs/commands/product-command";
import { Product, ProductStatus } from "@/types/entities/product";
import { BusinessResult, Status } from "@/types/models/business-result";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { HeaderForm } from "../../common/create-update-forms/header-form";
import { InformationBaseCard } from "../../common/create-update-forms/information-base-form";
import { CategoryGetAllQuery } from "@/types/cqrs/queries/category-query";
import { mediaUploadService } from "@/services/media-upload-service";
import { TypographyH1 } from "@/components/_common/typography/typography-h1";

interface ProductFormProps {
  initialData?: Product | null;
}

const formSchema = z.object({
  id: z.string().optional(),
  subCategoryId: z.string().nullable(),
  categoryId: z.string().nullable(),

  name: z.string().min(1, "Name is required").nullable(),
  sku: z.string().nullable(),
  description: z.string().nullable().optional(),
  price: z.number().nullable().default(0),
  status: z.nativeEnum(ProductStatus).nullable(),
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
  const [file, setFile] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const previousPath = usePreviousPath();

  const [categories, setCategories] = useState<Category[]>([]);

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as unknown as Resolver<
      z.infer<typeof formSchema>
    >,
    defaultValues: formSchema.parse(initialData ?? {}),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      if (initialData) {
        const updatedValues: ProductUpdateCommand = {
          ...values,
        };

        if (file) {
          const uploadResultThumb = await mediaUploadService.uploadFile(
            file,
            "Blog"
          );
          if (
            uploadResultThumb?.status == Status.OK &&
            uploadResultThumb?.data
          ) {
            updatedValues.thumbnailId = uploadResultThumb.data.id;
          }
        }

        const response = await productService.update(updatedValues);
        if (response.status != Status.OK)
          throw new Error(response.error?.detail);
        queryClient.refetchQueries({
          queryKey: ["fetchProductById", initialData.id],
        });
        toast.success("Updated!");
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

      if (file) {
        const uploadResultThumb = await mediaUploadService.uploadFile(
          file,
          "Blog"
        );
        if (uploadResultThumb?.status == Status.OK && uploadResultThumb?.data) {
          createdValues.thumbnailId = uploadResultThumb.data.id;
        }
      }

      const response = await productService.create(createdValues);
      if (response.status != Status.OK) throw new Error(response.error?.detail);

      toast.success("Created!");
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
    const query: CategoryGetAllQuery = {
      pagination: {
        isPagingEnabled: false,
      },
      includeProperties: ["subcategories"],
    };
    const response = await categoryService.getAll(query);
    return response.data?.results;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await fetchCategories();
        setCategories(categories!);
        // if (categories) {
        //   setSelectedCategory(
        //     categories.find(
        //       (ca) => ca.id == initialData?.subCategory?.categoryId
        //     ) ?? null
        //   );
        // }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const categoryIdWatch = form.watch("categoryId");
  const selectedCategory =
    categories.find((cat) => cat.id === categoryIdWatch) ?? null;

  return (
    <div className="w-full max-w-xl md:max-w-2xl mx-auto">
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
        title="Do you want to continue adding this blog?"
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
            <TypographyH1>{title}</TypographyH1>
          </div>
          <div className="grid gap-4">
            {/* main */}
            <div className="grid gap-6">
              <div className="grid gap-3">
                <ImageUpload
                  label="Thumbnail"
                  defaultValue={initialData?.thumbnail?.mediaUrl}
                  onFileChange={setFile}
                />

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

                <FormInputNumberCurrency
                  form={form}
                  name="price"
                  label="Price"
                  placeholder="Enter price"
                />
                <FormSelectObject
                  form={form}
                  name="categoryId"
                  label="Thể loại"
                  options={categories}
                  selectLabel="name"
                  selectValue="id"
                  placeholder="Chọn thể loại"
                />

                {selectedCategory &&
                selectedCategory.subCategories &&
                selectedCategory.subCategories.length > 0 ? (
                  <FormSelectObject
                    form={form}
                    name="subCategoryId"
                    label="Thể loại con"
                    options={selectedCategory.subCategories}
                    selectLabel="name"
                    selectValue="id"
                    placeholder="Chọn thể loại"
                  />
                ) : null}
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
