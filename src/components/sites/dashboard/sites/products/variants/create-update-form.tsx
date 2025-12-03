"use client";

import { Button } from "@/components/ui/button";
// import {
//   FileUpload,
//   FileUploadDropzone,
//   ,
//   FileUploadItemDelete,
//   FileUploadItemMetadata,
//   FileUploadItemPreview,
//   FileUploadItemProgress,
//   FileUploadList,
//   FileUploadTrigger,
// } from "@/components/ui/file-upload";
import { productService } from "@/services/product-service";
import { Upload, X } from "lucide-react";
import * as React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { LoadingPageComponent } from "@/components/_common/loading-page";
import { Badge } from "@/components/ui/badge";
import { ButtonGroup } from "@/components/ui/button-group";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { FileMetadata } from "@/hooks/use-file-upload";
import { usePreviousPath } from "@/hooks/use-previous-path";
import { FieldInput } from "@/lib/field-tanstack/field-input";
import { FieldInputNumber } from "@/lib/field-tanstack/field-input-number";
import { FieldSelectEnums } from "@/lib/field-tanstack/field-select-enum";
import {
  createFilesFromMediaList,
  createVirtualFileMetaFromMedia,
  processResponse,
} from "@/lib/utils";
import { getEnumLabel, getEnumOptions } from "@/lib/utils/enum-utils";
import ConfirmationDialog from "@/lib/utils/form-custom-shadcn";
import { mediaUploadService } from "@/services/media-upload-service";
import { productMediaService } from "@/services/product-media-service";
import { productVariantService } from "@/services/product-variant-service";
import {
  ProductMediaCreateCommand,
  ProductMediaDeleteCommand,
} from "@/types/cqrs/commands/product-media-command";
import {
  ProductVariantCreateCommand,
  ProductVariantUpdateCommand,
} from "@/types/cqrs/commands/product-variant-command";
import {
  InventoryStatus,
  ProductVariant,
} from "@/types/entities/product-variant";
import { BusinessResult, Status } from "@/types/models/business-result";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { Pen, Save, StickyNote } from "lucide-react";
import { useRouter } from "next/navigation";
import { MediaBase } from "@/types/entities/media-base";
import { CardUpload, FileUploadItem } from "@/components/card-upload";
import { Constants } from "@/lib/constants/constants";

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

export function ProductVariantForm({
  initialData,
  onSuccess,
}: ProductVariantFormProps) {
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
  const [files, setFiles] = React.useState<File[]>(
    createFilesFromMediaList(
      initialData?.productMedias
        ?.flatMap((n) => n.mediaBase)
        .filter((m) => m != undefined) as MediaBase[]
    )
  );
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

          const response = await productVariantService.update(updatedValues);
          // processResponse throws if status != OK, so it acts as validation
          processResponse(response);

          // Only reach here if response.status === OK
          queryClient.refetchQueries({
            queryKey: ["fetchProductById", initialData?.productId],
          });
          toast.success("Updated!");
          onSuccess?.();
          setIsEditing(false);
        } else {
          setPendingValues(value);
          setShowConfirmationDialog(true);
        }
      } catch (error: any) {
        console.error(error);
        toast.error(error.message || "An error occurred");
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

  const buildProductMediaCreateCommand = (
    mediaBaseId: string,
    productVariantId: string
  ): ProductMediaCreateCommand => {
    return {
      mediaBaseId,
      productVariantId,
    } as ProductMediaCreateCommand;
  };

  const buildProductMediaDeleteCommand = (
    mediaBaseId: string,
    productVariantId: string,
    isPermanent: boolean
  ): ProductMediaDeleteCommand => {
    return {
      mediaBaseId,
      productVariantId,
      isPermanent,
      id: crypto.randomUUID(),
    } as ProductMediaDeleteCommand;
  };

  const handleFilesAdded = async (fileUploadItems: FileUploadItem[]) => {
    if (initialData && fileUploadItems) {
      const unCompleted = fileUploadItems.some((n) => n.status != "completed");
      if (!unCompleted) {
        // setFiles(fileUploadItems.map((f) => f.file as File));
        const fileUnUpload = fileUploadItems
          .filter((f) => (f.file.status = "local"))
          .flatMap((m) => m.file as File);

        // upload file local
        if (fileUnUpload.length > 0) {
          // setFiles(fileLocals);
          const uploadResult = await mediaUploadService.uploadFiles(
            fileUnUpload,
            "ProductVariant"
          );

          processResponse(uploadResult);

          const mediaBaseIds = uploadResult.data?.map((m) => m.id) ?? [];

          const productMediaCreateCommands = mediaBaseIds.map((n) =>
            buildProductMediaCreateCommand(n, initialData.id)
          );

          // create product media
          const productMediaResult = await productMediaService.createList(
            productMediaCreateCommands
          );
          processResponse(productMediaResult);
          queryClient.refetchQueries({
            queryKey: ["fetchProductById", initialData?.productId],
          });
          toast.success("Uploaded!");
        }
      }
    }
  };

  // const handleFilesAdded = async (files: File[]) => {
  //   if (initialData && files) {
  //     const uploadResult = await mediaUploadService.uploadFiles(
  //       files,
  //       "ProductVariant"
  //     );

  //     processResponse(uploadResult);

  //     const mediaBaseIds = uploadResult.data?.map((m) => m.id) ?? [];

  //     const productMediaCreateCommands = mediaBaseIds.map((n) =>
  //       buildProductMediaCreateCommand(n, initialData.id)
  //     );

  //     // create product media
  //     const productMediaResult = await productMediaService.createList(
  //       productMediaCreateCommands
  //     );
  //     processResponse(productMediaResult);
  //     queryClient.refetchQueries({
  //       queryKey: ["fetchProductById", initialData?.productId],
  //     });
  //     toast.success("Uploaded!");
  //   }
  // };

  const handleRemoveFiles = async (fileUploadItems: FileUploadItem[]) => {
    if (initialData && fileUploadItems) {
      const fileUploadeds = fileUploadItems
        .filter((f) => f.file.status == "uploaded")
        .flatMap((m) => m.file as FileMetadata);
      if (fileUploadeds.length > 0) {
        const productMediaDeleteCommands = fileUploadeds.map((n) =>
          buildProductMediaDeleteCommand(n.id, initialData.id, true)
        );
        const deleteResult = await productMediaService.deleteList(
          productMediaDeleteCommands
        );
        processResponse(deleteResult);
        queryClient.refetchQueries({
          queryKey: ["fetchProductById", initialData?.productId],
        });
        toast.success(`Deleted ${fileUploadeds.length} files!`);
      }
    }
  };

  // const onUpload = React.useCallback(
  //   async (
  //     files: File[],
  //     {
  //       onProgress,
  //       onSuccess,
  //       onError,
  //     }: {
  //       onProgress: (file: File, progress: number) => void;
  //       onSuccess: (file: File) => void;
  //       onError: (file: File, error: Error) => void;
  //     }
  //   ) => {
  //     try {
  //       // 1. HIỂN THỊ PROGRESS TRƯỚC
  //       const simulateProgressPromises = files.map(async (file) => {
  //         const totalChunks = 10;
  //         let uploadedChunks = 0;

  //         for (let i = 0; i < totalChunks; i++) {
  //           await new Promise((resolve) =>
  //             setTimeout(resolve, Math.random() * 200 + 100)
  //           );

  //           uploadedChunks++;
  //           const progress = (uploadedChunks / totalChunks) * 80; // Chỉ đến 80%
  //           onProgress(file, progress);
  //         }
  //       });

  //       // Chờ progress simulation xong
  //       await Promise.all(simulateProgressPromises);

  //       // 2. THỰC HIỆN UPLOAD THẬT
  //       const serverUploadPromise = handleFilesAdded(files);

  //       // Update progress lên 90% khi đang upload thật
  //       files.forEach((file) => onProgress(file, 90));

  //       // Chờ upload thật hoàn thành
  //       await serverUploadPromise;

  //       // 3. HOÀN TẤT
  //       files.forEach((file) => {
  //         onProgress(file, 100);
  //         onSuccess(file);
  //       });
  //     } catch (error) {
  //       // This handles any error that might occur outside the individual upload processes
  //       console.error("Unexpected error during upload:", error);
  //     }
  //   },
  //   []
  // );

  // const onFileReject = React.useCallback((file: File, message: string) => {
  //   toast(message, {
  //     description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`,
  //   });
  // }, []);

  const status = getEnumLabel(InventoryStatus, initialData?.status);

  const fileMetaDatas: FileMetadata[] =
    initialData?.productMedias
      .flatMap((n) =>
        n.mediaBase ? [createVirtualFileMetaFromMedia(n.mediaBase)] : []
      )
      .filter((m) => m !== undefined) ?? [];

  console.log("check_fileMetadata", fileMetaDatas);

  if (isLoading) return <LoadingPageComponent />;
  console.log("check_files", files);
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
          <div className="flex flex-row items-center"></div>
          <div className="flex justify-end">
            {isEdit ? (
              <div className="flex items-center gap-2">
                <Badge variant="outline">{status}</Badge>
                <ButtonGroup>
                  {isEditing ? (
                    <>
                      <Button
                        variant={"outline"}
                        size="icon-sm"
                        type="button"
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
                        onClick={(e) => {
                          e.preventDefault();
                          form.handleSubmit();
                        }}
                      >
                        {loading ? <Spinner /> : <Save />}
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant={"outline"}
                      size="sm"
                      type="button"
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
                  type="button"
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
        <form>
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
                name="stockDefaultQuantity"
                children={(field) => (
                  <FieldInputNumber
                    field={field}
                    label="Stock Default Quantity"
                    placeholder="Enter default quantity"
                    disabled={!isEditing}
                  />
                )}
              />
            </div>

            <div>
              {/* {initialData?.productMedias && (
                <>
                  {console.log(
                    "check_initialData?.productMedias",
                    initialData?.productMedias.length
                  )}
                  <CardUpload
                    defaultValues={
                      initialData?.productMedias
                        .flatMap((n) => n.mediaBase)
                        .filter((m) => m != undefined) ?? []
                    }
                    accept={Constants.IMAGE_EXT_STRING}
                    maxFiles={5}
                    onFilesAdded={handleFilesAdded}
                    onFilesRemoved={handleRemoveFiles}
                  />
                </>
              )} */}

              <CardUpload
                defaultValues={fileMetaDatas}
                accept={Constants.IMAGE_EXT_STRING}
                maxFiles={5}
                onFilesAdded={handleFilesAdded}
                onFilesRemoved={handleRemoveFiles}
              />

              {/* <FileUpload
                value={files}
                onValueChange={setFiles}
                maxFiles={10}
                maxSize={5 * 1024 * 1024}
                className="w-full max-w-md"
                onUpload={onUpload}
                onFileReject={onFileReject}
                multiple
              >
                <FileUploadDropzone>
                  <div className="flex flex-col items-center gap-1 text-center">
                    <div className="flex items-center justify-center rounded-full border p-2.5">
                      <Upload className="size-6 text-muted-foreground" />
                    </div>
                    <p className="font-medium text-sm">
                      Drag & drop files here
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Or click to browse (max 10 files, up to 5MB each)
                    </p>
                  </div>
                  <FileUploadTrigger asChild>
                    <Button variant="outline" size="sm" className="mt-2 w-fit">
                      Browse files
                    </Button>
                  </FileUploadTrigger>
                </FileUploadDropzone>
                <FileUploadList orientation="horizontal">
                  {files.map((file, index) => (
                    <FileUploadItem key={index} value={file} className="p-0">
                      <FileUploadItemPreview className="size-20 [&>svg]:size-12">
                        <FileUploadItemProgress variant="circular" size={40} />
                      </FileUploadItemPreview>
                      <FileUploadItemMetadata className="sr-only" />
                      <FileUploadItemDelete asChild>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="-top-1 -right-1 absolute size-5 rounded-full"
                        >
                          <X className="size-3" />
                        </Button>
                      </FileUploadItemDelete>
                    </FileUploadItem>
                  ))}
                </FileUploadList>
              </FileUpload> */}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
