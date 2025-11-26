"use client";

import { productService } from "@/services/product-service";
import { useState } from "react";
import { toast } from "sonner";
import { set, z } from "zod";

import { LoadingPageComponent } from "@/components/_common/loading-page";
import { TypographyH1 } from "@/components/_common/typography/typography-h1";
import CardUpload, { FileUploadItem } from "@/components/card-upload";
import { Button } from "@/components/ui/button";
import { usePreviousPath } from "@/hooks/use-previous-path";
import { FieldInput } from "@/lib/field-tanstack/field-input";
import { FieldInputNumber } from "@/lib/field-tanstack/field-input-number";
import { FieldSelectEnums } from "@/lib/field-tanstack/field-select-enum";
import { FieldSelectOptions } from "@/lib/field-tanstack/field-select-options";
import { FieldTextarea } from "@/lib/field-tanstack/field-textarea";
import ConfirmationDialog from "@/lib/form-custom-shadcn";
import { cn, getEnumOptions, processResponse } from "@/lib/utils";
import { categoryService } from "@/services/category-service";
import { mediaUploadService } from "@/services/media-upload-service";
import {
  ProductCreateCommand,
  ProductUpdateCommand,
} from "@/types/cqrs/commands/product-command";
import { CategoryGetAllQuery } from "@/types/cqrs/queries/category-query";
import { Product, ProductStatus } from "@/types/entities/product";
import { BusinessResult, Status } from "@/types/models/business-result";
import { useForm } from "@tanstack/react-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Archive,
  ChevronLeft,
  Layers2,
  Loader2,
  Pen,
  Plus,
  Save,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { TypographyH2 } from "@/components/_common/typography/typography-h2";
import { TypographyH3 } from "@/components/_common/typography/typography-h3";
import { Card, CardContent } from "@/components/ui/card";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
} from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { ButtonGroup } from "@/components/ui/button-group";
import { toastPrintJSON } from "@/lib/helpers/toast-print-json";
import { Const } from "@/lib/constants/const";

interface ProductFormProps {
  initialData?: Product | null;
}

const formSchema = z.object({
  id: z.string().nullable().optional(),
  subCategoryId: z.string().nullable().optional(),
  categoryId: z.string().nullable().optional(),

  thumbnailId: z.string().nullable().optional(),
  name: z.string().min(1, "Name is required").nullable().optional(),
  sku: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  price: z.number().nullable().default(0).optional(),
  status: z
    .enum(ProductStatus)
    .default(ProductStatus.Draft)
    .nullable()
    .optional(),
});

export const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const isEdit = Boolean(initialData);
  const title = isEdit ? "Edit product" : "Create product";
  const router = useRouter();
  const previousPath = usePreviousPath();
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [pendingValues, setPendingValues] = useState<z.infer<
    typeof formSchema
  > | null>(null);

  const query: CategoryGetAllQuery = {
    pagination: {
      isPagingEnabled: false,
    },
    includeProperties: ["subcategories"],
  };

  const {
    data: categories = [],
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: [query],
    queryFn: () => categoryService.getAll(query),
    refetchOnWindowFocus: false,
    select: (res) => processResponse(res).results,
  });

  const formId = "product-form";
  const form = useForm({
    defaultValues: isEdit ? formSchema.parse(initialData) : undefined,
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        setLoading(true);
        if (isEdit) {
          const updatedValues: ProductUpdateCommand = {
            ...initialData,
            ...value,
          };

          // toastPrintJSON(updatedValues);

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
            queryKey: ["fetchProductById", initialData?.id],
          });
          toast.success("Updated!");
          setIsEditing(false);
          // router.push(previousPath);
        } else {
          setPendingValues(value);
          setShowConfirmationDialog(true);
        }
      } catch (error: any) {
        console.error(error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    },
  });

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

  const handleFilesChange = (files: FileUploadItem[]) => {
    const fileLocals = files.filter((f) => !f.file.id);
    const fileUploadeds = files.filter((f) => f.file.id);
    if (fileLocals.length > 0) {
      setFile(files[0].file as File);
    } else {
      setFile(null);
    }

    if (fileUploadeds.length == 0) {
      form.setFieldValue("thumbnailId", null);
    }

    console.log("check_handles", files);
    console.log("check_handles_local", fileLocals);
    console.log("check_handles_uploaded", fileUploadeds);
  };

  if (isLoading) return <LoadingPageComponent />;
  if (isError) {
    console.log("Error fetching:", error);
    return <div>Error categories.</div>;
  }

  return (
    <div className="w-full max-w-xl md:max-w-2xl mx-auto grid gap-4">
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
      <div className="grid gap-4">
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="flex flex-row items-center">
            <Link href={previousPath}>
              <Button
                type="button"
                className="-ml-4 gap-1"
                variant="ghost"
                size="sm"
              >
                <ChevronLeft />
                Back
              </Button>
            </Link>
          </div>
          <div className="flex justify-end">
            {isEdit ? (
              <ButtonGroup>
                <Button
                  variant={"outline"}
                  size={"icon-sm"}
                  disabled={isEditing}
                >
                  <Archive />
                </Button>
                <Button
                  variant={"outline"}
                  size={"icon-sm"}
                  disabled={isEditing}
                >
                  <Layers2 />
                </Button>

                {isEditing ? (
                  <>
                    <Button
                      variant={"outline"}
                      size="icon-sm"
                      onClick={() => setIsEditing(false)}
                      // disabled={isSubmitting}
                    >
                      <X />
                    </Button>
                    <Button
                      variant={"outline"}
                      size="icon-sm"
                      type="submit"
                      // disabled={isSubmitting}
                      form={formId}
                    >
                      {loading ? <Spinner /> : <Save />}
                    </Button>
                  </>
                ) : (
                  <Button
                    variant={"outline"}
                    size="icon-sm"
                    onClick={() => setIsEditing(true)}
                  >
                    <Pen />
                  </Button>
                )}
              </ButtonGroup>
            ) : (
              <Button
                type="submit"
                form={formId}
                className=""
                disabled={loading}
              >
                {loading ? <Spinner /> : <Plus />}
                Create
              </Button>
            )}
          </div>
        </div>
      </div>

      <Separator />
      <div className="grid gap-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          id={formId}
        >
          <div className="grid gap-4">
            <CardUpload
              defaultValues={
                initialData?.thumbnail ? [initialData?.thumbnail] : []
              }
              accept={Const.IMAGE_EXT_STRING}
              maxFiles={1}
              onFilesChange={handleFilesChange}
              // multiple={false}
              disabled={!isEditing}
            />

            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <form.Field
                name="name"
                children={(field) => (
                  <FieldInput
                    field={field}
                    label="Name"
                    placeholder="Enter Name"
                    disabled={!isEditing}
                  />
                )}
              />
              <form.Field
                name="sku"
                children={(field) => (
                  <FieldInput
                    field={field}
                    label="Sku"
                    placeholder="Enter SKU"
                    disabled={!isEditing}
                  />
                )}
              />
            </div>

            <form.Field
              name="description"
              children={(field) => (
                <FieldTextarea
                  field={field}
                  label="Description"
                  placeholder="Enter desc"
                  disabled={!isEditing}
                />
              )}
            />
            <form.Field
              name="status"
              children={(field) => (
                <FieldSelectEnums
                  field={field}
                  label="Status"
                  placeholder="Enter status"
                  enumOptions={getEnumOptions(ProductStatus)}
                  disabled={!isEditing}
                />
              )}
            />

            <form.Field
              name="price"
              children={(field) => (
                <FieldInputNumber
                  field={field}
                  label="Price VND"
                  placeholder="Enter price vnd"
                  disabled={!isEditing}
                />
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <form.Field
                name="categoryId"
                children={(field) => (
                  <FieldSelectOptions
                    label="Category"
                    field={field}
                    placeholder="Enter category"
                    options={categories}
                    selectLabel="name"
                    selectValue="id"
                    disabled={!isEditing}
                  />
                )}
              />

              <form.Subscribe selector={(state) => state.values.categoryId}>
                {(categoryId) => {
                  const selectedCategory =
                    categories?.find((cat) => cat.id === categoryId) ?? null;

                  // set subCategoryId nếu category thay đổi
                  if (selectedCategory?.subCategories?.length) {
                    const firstSub = selectedCategory.subCategories[0];
                    // chỉ set nếu field chưa bằng giá trị đầu tiên
                    if (initialData?.categoryId !== selectedCategory.id) {
                      form.state.values.subCategoryId = firstSub.id;
                    } else {
                      // giữ nguyên giá trị subCategoryId hiện tại
                      form.state.values.subCategoryId =
                        initialData.subCategoryId;
                    }
                  }

                  return (
                    <>
                      {selectedCategory?.subCategories?.length ? (
                        <form.Field
                          name="subCategoryId"
                          children={(field) => (
                            <FieldSelectOptions
                              label="Sub Category"
                              field={field}
                              placeholder="Enter sub category"
                              options={selectedCategory.subCategories}
                              selectLabel="name"
                              disabled={!isEditing}
                              selectValue="id"
                            />
                          )}
                        />
                      ) : null}
                    </>
                  );
                }}
              </form.Subscribe>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
