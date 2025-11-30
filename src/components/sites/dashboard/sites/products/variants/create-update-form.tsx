"use client";

import { productService } from "@/services/product-service";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { LoadingPageComponent } from "@/components/_common/loading-page";
import CardUpload, { FileUploadItem } from "@/components/card-upload";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { usePreviousPath } from "@/hooks/use-previous-path";
import { Constants } from "@/lib/constants/constants";
import { FieldInput } from "@/lib/field-tanstack/field-input";
import { FieldEditor } from "@/lib/field-tanstack/field-input-rich-editor";
import { FieldSelectOptions } from "@/lib/field-tanstack/field-select-options";
import ConfirmationDialog from "@/lib/utils/form-custom-shadcn";
import { getEnumLabel, getEnumOptions } from "@/lib/utils/enum-utils";
import {  processResponse } from "@/lib/utils";
import { categoryService } from "@/services/category-service";
import { mediaUploadService } from "@/services/media-upload-service";
import {
  ProductVariantCreateCommand,
  ProductVariantUpdateCommand,
  ProductVariantUpdateStatusCommand,
} from "@/types/cqrs/commands/product-variant-command";
import { CategoryGetAllQuery } from "@/types/cqrs/queries/category-query";
import {
  InventoryStatus,
  ProductVariant,
} from "@/types/entities/product-variant";
import { BusinessResult, Status } from "@/types/models/business-result";
import { useForm } from "@tanstack/react-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Archive,
  ArchiveRestore,
  ArrowUpRightIcon,
  ChevronLeft,
  CirclePlus,
  Layers2,
  Pen,
  Save,
  StickyNote,
  Upload,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconFolderCode } from "@tabler/icons-react";
import { productVariantService } from "@/services/product-variant-service";
import { FieldSelectEnums } from "@/lib/field-tanstack/field-select-enum";
import { FieldInputNumber } from "@/lib/field-tanstack/field-input-number";

interface ProductVariantFormProps {
  initialData?: ProductVariant | null;
  onSuccess?: () => void;
}

const formSchema = z.object({
  id: z.string().nullable().optional(),
  sku: z.string().nullable().optional(),
  color: z.string().nullable().optional(),
  size: z.string().nullable().optional(),
  price: z.number().nullable().optional(),
  rentalPrice: z.number().nullable().optional(),
  deposit: z.number().nullable().optional(),
  stockQuantity: z.number().nullable().optional(),
  stockDefaultQuantity: z.number().nullable().optional(),
  status: z
    .enum(InventoryStatus)
    .default(InventoryStatus.Available)
    .nullable()
    .optional(),
});

export const ProductVariantForm: React.FC<ProductVariantFormProps> = ({
  initialData,
  onSuccess,
}) => {
  const isEdit = initialData != null && initialData != undefined;
  const title = isEdit ? "Edit variant" : "Create variant";
  const router = useRouter();
  const previousPath = usePreviousPath();
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [showConfirmDup, setShowConfirmDup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(isEdit ? false : true);
  const [openSheet, setOpenSheet] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [pendingValues, setPendingValues] = useState<z.infer<
    typeof formSchema
  > | null>(null);

  const formId = "product-variant-form";
  const form = useForm({
    defaultValues: isEdit ? formSchema.parse(initialData) : undefined,
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        setLoading(true);
        if (isEdit) {
          const updatedValues: ProductVariantUpdateCommand = {
            ...initialData,
            ...value,
          };

          // toastPrintJSON(updatedValues);

          //   if (file) {
          //     const uploadResultThumb = await mediaUploadService.uploadFile(
          //       file,
          //       "Blog"
          //     );
          //     if (
          //       uploadResultThumb?.status == Status.OK &&
          //       uploadResultThumb?.data
          //     ) {
          //       updatedValues. = uploadResultThumb.data.id;
          //     }
          //   }

          const response = await productService.update(updatedValues);
          processResponse(response);
          // queryClient.refetchQueries({
          //   queryKey: ["fetchProductVariantById", initialData?.id],
          // });
          toast.success("Updated!");
          onSuccess?.();
          setIsEditing(false);
          // router.push(previousPath);
        } else {
          setPendingValues(value);
          setShowConfirmationDialog(true);
        }
      } catch (error: any) {
        console.error(error);
        toast.error(error.message);
        return Promise.reject(error);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleCreateConfirmation = async (): Promise<
    BusinessResult<ProductVariant>
  > => {
    if (!pendingValues) {
      toast.error("No pending values to create product.");
      return Promise.reject(new Error("No pending values"));
    }
    setIsLoading(true);
    try {
      const createdValues: ProductVariantCreateCommand = {
        ...pendingValues,
        stockQuantity: null,
        stockDefaultQuantity: null,
        status: pendingValues?.status ?? null,
      };

      //   if (file) {
      //     const uploadResultThumb = await mediaUploadService.uploadFile(
      //       file,
      //       "Blog"
      //     );
      //     if (uploadResultThumb?.status == Status.OK && uploadResultThumb?.data) {
      //       createdValues.thumbnailId = uploadResultThumb.data.id;
      //     }
      //   }

      const response = await productVariantService.create(createdValues);
      processResponse(response);

      toast.success("Created!");
      setShowConfirmationDialog(false);
      setPendingValues(null);
      setIsLoading(false);

      return response;
    } catch (error: any) {
      setShowConfirmationDialog(false);
      setPendingValues(null);
      setIsLoading(false);
      return Promise.reject(error);
    }
  };

  // const handleFilesChange = (files: FileUploadItem[]) => {
  //   const fileLocals = files.filter((f) => !f.file.id);
  //   const fileUploadeds = files.filter((f) => f.file.id);
  //   if (fileLocals.length > 0) {
  //     setFile(files[0].file as File);
  //   } else {
  //     setFile(null);
  //   }

  //   if (fileUploadeds.length == 0) {
  //     form.setFieldValue("thumbnailId", null);
  //   }

  //   console.log("check_handles", files);
  //   console.log("check_handles_local", fileLocals);
  //   console.log("check_handles_uploaded", fileUploadeds);
  // };

  const handleChangeStatus = async (status: InventoryStatus, id: string) => {
    try {
      const updateStatusCommand: ProductVariantUpdateStatusCommand = {
        status: status,
        id: id,
      };

      const response =
        await productVariantService.updateStatus(updateStatusCommand);
      processResponse(response);
      queryClient.refetchQueries({
        queryKey: ["fetchProductById", initialData?.id],
      });
      toast.success("Updated status!");
      setIsEditing(false);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const confirmDuplicate = async () => {
    if (!initialData) return;

    try {
      const createdValues: ProductVariantCreateCommand = {
        ...initialData,
      };

      const response = await productService.create(createdValues);
      processResponse(response);

      toast.success("Created!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setShowConfirmDup(false);
    }
  };

  const status = getEnumLabel(InventoryStatus, initialData?.status);

  if (isLoading) return <LoadingPageComponent />;

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
          router.push(`${res.data?.id}`);
        }}
        title="Do you want to continue adding this?"
        description="This action cannot be undone. Are you sure you want to permanently delete this file from our servers?"
        confirmText="Yes"
        cancelText="No"
      />

      <ConfirmationDialog
        open={showConfirmDup}
        setOpen={setShowConfirmDup}
        onConfirm={confirmDuplicate}
        title="Duplicate ProductVariant?"
        description="Are you sure you want to create a duplicate of this product?"
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
              <div className="flex items-center gap-2">
                <Badge variant="outline">{status}</Badge>
                <ButtonGroup>
                  {initialData?.status == InventoryStatus.Available ? (
                    <>
                      <Button
                        variant={"outline"}
                        size={"sm"}
                        disabled={isEditing}
                        onClick={() =>
                          handleChangeStatus(
                            InventoryStatus.Rented,
                            initialData?.id!
                          )
                        }
                      >
                        <Archive /> Archive
                      </Button>
                    </>
                  ) : initialData?.status == InventoryStatus.InMaintenance ? (
                    <>
                      <Button
                        variant={"outline"}
                        size={"sm"}
                        disabled={isEditing}
                        onClick={() =>
                          handleChangeStatus(
                            InventoryStatus.Available,
                            initialData?.id!
                          )
                        }
                      >
                        <Upload /> Publish
                      </Button>
                    </>
                  ) : initialData?.status == InventoryStatus.Rented ? (
                    <>
                      <Button
                        variant={"outline"}
                        size={"sm"}
                        disabled={isEditing}
                        onClick={() =>
                          handleChangeStatus(
                            InventoryStatus.InMaintenance,
                            initialData?.id!
                          )
                        }
                      >
                        <ArchiveRestore /> Restore
                      </Button>
                    </>
                  ) : null}

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
                      size="sm"
                      onClick={() => setIsEditing(true)}
                    >
                      <Pen /> Edit
                    </Button>
                  )}
                </ButtonGroup>
              </div>
            ) : (
              <ButtonGroup>
                <Button
                  type="button"
                  variant="outline"
                  disabled={loading}
                  onClick={async () => {
                    form.setFieldValue("status", InventoryStatus.Available);
                    form.handleSubmit();
                  }}
                >
                  {loading ? <Spinner /> : <StickyNote />}
                  Draft
                </Button>
                <Button
                  type="submit"
                  form={formId}
                  className=""
                  variant={"outline"}
                  disabled={loading}
                >
                  {loading ? <Spinner /> : <Save />}
                  Submit
                </Button>
              </ButtonGroup>
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
            <div className="grid grid-cols-2 gap-4">
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

              <form.Field
                name="status"
                children={(field) => (
                  <FieldSelectEnums
                    field={field}
                    label="Status"
                    placeholder="Select status"
                    enumOptions={getEnumOptions(InventoryStatus)}
                    disabled={!isEditing}
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <form.Field
                name="color"
                children={(field) => (
                  <FieldInput
                    field={field}
                    label="Color"
                    placeholder="Enter Color"
                    disabled={!isEditing}
                  />
                )}
              />

              <form.Field
                name="size"
                children={(field) => (
                  <FieldInput
                    field={field}
                    label="Size"
                    placeholder="Enter Size"
                    disabled={!isEditing}
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <form.Field
                name="price"
                children={(field) => (
                  <FieldInputNumber
                    field={field}
                    label="Price"
                    placeholder="Enter Price"
                    disabled={!isEditing}
                  />
                )}
              />

              <form.Field
                name="rentalPrice"
                children={(field) => (
                  <FieldInputNumber
                    field={field}
                    label="Rental Price"
                    placeholder="Enter Rental Price"
                    disabled={!isEditing}
                  />
                )}
              />

              <form.Field
                name="deposit"
                children={(field) => (
                  <FieldInputNumber
                    field={field}
                    label="Deposit"
                    placeholder="Enter Deposit"
                    disabled={!isEditing}
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <form.Field
                name="stockQuantity"
                children={(field) => (
                  <FieldInputNumber
                    field={field}
                    label="Stock Quantity"
                    placeholder="Enter stock"
                    disabled={!isEditing}
                  />
                )}
              />

              <form.Field
                name="rentalPrice"
                children={(field) => (
                  <FieldInputNumber
                    field={field}
                    label="Rental Price"
                    placeholder="Enter Rental Price"
                    disabled={!isEditing}
                  />
                )}
              />

              <form.Field
                name="deposit"
                children={(field) => (
                  <FieldInputNumber
                    field={field}
                    label="Deposit"
                    placeholder="Enter Deposit"
                    disabled={!isEditing}
                  />
                )}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
