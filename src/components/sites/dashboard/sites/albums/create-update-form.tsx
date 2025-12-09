// "use client";
// import { Resolver, useForm } from "react-hook-form";

// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { albumService } from "@/services/album-service";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";
// import { z } from "zod";

// import { FileUpload } from "@/components/_common/custom/file-upload";
// import { usePreviousPath } from "@/hooks/use-previous-path";
// import ConfirmationDialog, {
//   FormInput,
//   FormInputDate,
//   FormInputDateTimePicker,
//   FormInputTextArea,
//   FormSwitch,
// } from "@/lib/utils/form-custom-shadcn";
// import { Album } from "@/types/entities/album";
// import {
//   AlbumCreateCommand,
//   AlbumUpdateCommand,
// } from "@/types/cqrs/commands/album-command";
// import { BusinessResult, Status } from "@/types/models/business-result";
// import { useQueryClient } from "@tanstack/react-query";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { HeaderForm } from "../../common/create-update-forms/header-form";
// import { InformationBaseCard } from "../../common/create-update-forms/information-base-form";
// import { TypographyH1 } from "@/components/_common/typography/typography-h1";
// import { mediaUploadService } from "@/services/media-upload-service";

// interface AlbumFormProps {
//   initialData?: Album | null;
// }

// const formSchema = z.object({
//   id: z.string().optional(),
//   title: z.string().min(1, "Title is required").nullable().optional(),
//   slug: z.string().nullable().optional(),
//   description: z.string().nullable().optional(),
//   eventDate: z.string().nullable().optional(),
//   brideName: z.string().nullable().optional(),
//   groomName: z.string().nullable().optional(),
//   location: z.string().nullable().optional(),
//   photographer: z.string().nullable().optional(),
//   isFeatured: z.boolean().default(false),
// });

// export const AlbumForm: React.FC<AlbumFormProps> = ({ initialData }) => {
//   const [loading, setLoading] = useState(false);
//   const title = initialData ? "Update album" : "New album";
//   const action = "Submit";
//   const router = useRouter();
//   const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
//   const [pendingValues, setPendingValues] = useState<z.infer<
//     typeof formSchema
//   > | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const previousPath = usePreviousPath();
//   const [file, setFile] = useState<File | null>(null);
//   const queryClient = useQueryClient();

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema) as unknown as Resolver<
//       z.infer<typeof formSchema>
//     >,
//     defaultValues: formSchema.parse(initialData ?? {}),
//   });

//   const handleFileUpload = (file: File | null) => {
//     setFile(file);
//   };
//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     setLoading(true);
//     if (initialData) {
//       const combinedValues = initialData
//         ? { ...initialData, ...values }
//         : values;
//       const command: AlbumUpdateCommand = {
//         ...combinedValues,
//       };

//       const response = await albumService.update(command);
//       if (response.status == Status.ERROR) {
//         toast.error(response.error?.detail);
//         setLoading(false);
//         return;
//       }
//       queryClient.refetchQueries({
//         queryKey: ["fetchAlbumById", initialData.id],
//       });
//       toast.success("Album updated successfully.");
//       router.push(previousPath);
//     } else {
//       setPendingValues(values);
//       setShowConfirmationDialog(true);
//     }

//     setLoading(false);
//   };

//   const handleCreateConfirmation = async (): Promise<BusinessResult<Album>> => {
//     if (!pendingValues) {
//       toast.error("No pending values to create album.");
//       return Promise.reject(new Error("No pending values"));
//     }
//     setIsLoading(true);

//     const command: AlbumCreateCommand = {
//       ...pendingValues,
//     };
//     const response = await albumService.create(command);

//     if (response.status == Status.ERROR) {
//       toast.error(response.error?.detail);
//       setShowConfirmationDialog(false);
//       setPendingValues(null);
//       setIsLoading(false);
//       return Promise.reject(response);
//     }

//     toast.success("Album created successfully.");
//     setShowConfirmationDialog(false);
//     setPendingValues(null);
//     setIsLoading(false);

//     return response;
//   };

//   return (
//     <div className="w-full max-w-xl md:max-w-2xl mx-auto">
//       <ConfirmationDialog
//         isLoading={isLoading}
//         setOpen={setShowConfirmationDialog}
//         open={showConfirmationDialog}
//         onConfirm={handleCreateConfirmation}
//         onClose={async () => {
//           const res = await handleCreateConfirmation();
//           if (res.status != Status.OK) {
//             return;
//           }
//           router.push(previousPath);
//         }}
//         title="Do you want to continue adding this album?"
//         description="This action cannot be undone. Are you sure you want to permanently delete this file from our servers?"
//         confirmText="Yes"
//         cancelText="No"
//       />
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//           <div className="grid gap-2">
//             <HeaderForm
//               previousPath={previousPath}
//               title={title}
//               initialData={initialData}
//               loading={loading}
//               action={action}
//             />
//             <TypographyH1>{title}</TypographyH1>
//           </div>
//           <div className="grid gap-4">
//             {/* main */}
//             <div className="grid gap-6">
//               <div className="grid gap-3">
//                 <FormSwitch
//                   form={form}
//                   name="isFeatured"
//                   label="Is Featured"
//                   description="If enabled, this album will be publicly accessible."
//                 />

//                 <FormInput
//                   form={form}
//                   name="title"
//                   label="Title"
//                   placeholder="Enter title"
//                 />

//                 <FormInput
//                   form={form}
//                   name="slug"
//                   label="Slug"
//                   placeholder="Enter slug"
//                 />

//                 <FormInputTextArea
//                   form={form}
//                   name="description"
//                   label="Description"
//                   placeholder="Enter description"
//                 />

//                 <FormInputDateTimePicker
//                   form={form}
//                   name="eventDate"
//                   label="Event Date"
//                 />

//                 <FormInput
//                   form={form}
//                   name="brideName"
//                   label="Bride Name"
//                   placeholder="Enter bride name"
//                 />

//                 <FormInput
//                   form={form}
//                   name="groomName"
//                   label="Groom Name"
//                   placeholder="Enter groom name"
//                 />

//                 <FormInput
//                   form={form}
//                   name="location"
//                   label="Location"
//                   placeholder="Enter location"
//                 />

//                 <FormInput
//                   form={form}
//                   name="photographer"
//                   label="Photographer"
//                   placeholder="Enter photographer"
//                 />
//               </div>
//             </div>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// };

"use client";

import { albumService } from "@/services/album-service";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { LoadingPageComponent } from "@/components/_common/loading-page";
import { CardUpload, FileUploadItem } from "@/components/card-upload";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { FileMetadata } from "@/hooks/use-file-upload";
import { usePreviousPath } from "@/hooks/use-previous-path";
import { Constants } from "@/lib/constants/constants";
import { FieldInput } from "@/lib/field-tanstack/field-input";
import { FieldEditor } from "@/lib/field-tanstack/field-input-rich-editor";
import { FieldSelectOptions } from "@/lib/field-tanstack/field-select-options";
import { createVirtualFileMetaFromMedia, processResponse } from "@/lib/utils";
import { getEnumLabel } from "@/lib/utils/enum-utils";
import ConfirmationDialog from "@/lib/utils/form-custom-shadcn";
import { categoryService } from "@/services/category-service";
import { mediaUploadService } from "@/services/media-upload-service";
import {
  AlbumCreateCommand,
  AlbumUpdateCommand,
} from "@/types/cqrs/commands/album-command";
import { CategoryGetAllQuery } from "@/types/cqrs/queries/category-query";
import { Album } from "@/types/entities/album";
import { BusinessResult, Status } from "@/types/models/business-result";
import { useForm } from "@tanstack/react-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Archive,
  ArchiveRestore,
  ChevronLeft,
  Layers2,
  Pen,
  Save,
  StickyNote,
  Upload,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { SheetAddVariant } from "./variants/add-variant";
import { FieldInputDateTime } from "@/lib/field-tanstack/field-input-date-time";
import { FieldSwitch } from "@/lib/field-tanstack/field-switch";
import { FieldTextarea } from "@/lib/field-tanstack/field-textarea";
import {
  AlbumImageCreateCommand,
  AlbumImageDeleteCommand,
} from "@/types/cqrs/commands/album-media-command";
import { albumImageService } from "@/services/album-image-service";
import { ALBUM_FORM_KEY, ALBUM_GET_BY_ID_KEY } from "./keys/album-key";
import { FieldError, FieldLabel } from "@/components/ui/field";
import { SelectImagesDialog } from "./select-image";
import { FieldSelectImages } from "@/lib/field-tanstack/field-select-images";

interface AlbumFormProps {
  initialData?: Album | null;
}

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required").nullable().optional(),
  description: z.string().nullable().optional(),
  eventDate: z.string().nullable().optional(),
  brideName: z.string().nullable().optional(),
  groomName: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  photographer: z.string().nullable().optional(),
  thumbnailId: z.string().nullable().optional(),
  coverId: z.string().nullable().optional(),
  isFeatured: z.boolean().default(false).optional(),
});

export const AlbumForm: React.FC<AlbumFormProps> = ({ initialData }) => {
  const isEdit = initialData != null && initialData != undefined;
  const title = isEdit ? "Edit album" : "Create album";
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

  const formId = ALBUM_FORM_KEY;
  const form = useForm({
    defaultValues: isEdit ? formSchema.parse(initialData) : undefined,
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        setLoading(true);
        if (isEdit) {
          const updatedValues: AlbumUpdateCommand = {
            ...initialData,
            ...value,
          };

          // toastPrintJSON(updatedValues);
          const response = await albumService.update(updatedValues);
          processResponse(response);
          queryClient.refetchQueries({
            queryKey: ["fetchAlbumById", initialData?.id],
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
        return Promise.reject(error);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleCreateConfirmation = async (): Promise<BusinessResult<Album>> => {
    if (!pendingValues) {
      toast.error("No pending values to create album.");
      return Promise.reject(new Error("No pending values"));
    }
    setIsLoading(true);
    try {
      const createdValues: AlbumCreateCommand = {
        ...pendingValues,
        isFeatured: pendingValues.isFeatured ?? false,
      };

      const response = await albumService.create(createdValues);
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

  const handleDuplicate = async () => {
    setShowConfirmDup(true);
  };

  const confirmDuplicate = async () => {
    if (!initialData) return;

    try {
      const createdValues: AlbumCreateCommand = {
        ...initialData,
      };

      const response = await albumService.create(createdValues);
      processResponse(response);

      toast.success("Created!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setShowConfirmDup(false);
    }
  };

  const buildAlbumImageCreateCommand = (
    imageId: string,
    albumId: string
  ): AlbumImageCreateCommand => {
    return {
      imageId,
      albumId,
    } as AlbumImageCreateCommand;
  };

  const buildAlbumImageDeleteCommand = (
    imageId: string,
    albumId: string,
    isPermanent: boolean
  ): AlbumImageDeleteCommand => {
    return {
      imageId,
      albumId,
      isPermanent,
      id: crypto.randomUUID(),
    } as AlbumImageDeleteCommand;
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
            "AlbumImage"
          );

          processResponse(uploadResult);

          const mediaBaseIds = uploadResult.data?.map((m) => m.id) ?? [];

          const albumImageCreateCommands = mediaBaseIds.map((n) =>
            buildAlbumImageCreateCommand(n, initialData.id)
          );

          // create product media
          const albumImageResult = await albumImageService.createList(
            albumImageCreateCommands
          );
          processResponse(albumImageResult);
          queryClient.refetchQueries({
            queryKey: [ALBUM_GET_BY_ID_KEY, initialData?.id],
          });
          toast.success("Uploaded!");
        }
      }
    }
  };

  const handleRemoveFiles = async (fileUploadItems: FileUploadItem[]) => {
    if (initialData && fileUploadItems) {
      const fileUploadeds = fileUploadItems
        .filter((f) => f.file.status == "uploaded")
        .flatMap((m) => m.file as FileMetadata);
      if (fileUploadeds.length > 0) {
        const albumImageDeleteCommands = fileUploadeds.map((n) =>
          buildAlbumImageDeleteCommand(n.id, initialData.id, true)
        );
        const deleteResult = await albumImageService.deleteList(
          albumImageDeleteCommands
        );
        processResponse(deleteResult);
        queryClient.refetchQueries({
          queryKey: [ALBUM_GET_BY_ID_KEY, initialData?.id],
        });
        toast.success(`Deleted ${fileUploadeds.length} files!`);
      }
    }
  };

  const fileMetaDatas: FileMetadata[] =
    initialData?.albumImages
      .flatMap((n) =>
        n.image ? [createVirtualFileMetaFromMedia(n.image)] : []
      )
      .filter((m) => m !== undefined) ?? [];

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
        title="Duplicate Album?"
        description="Are you sure you want to create a duplicate of this album?"
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
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    onClick={handleDuplicate}
                    disabled={isEditing}
                  >
                    <Layers2 /> Duplicate
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
            {isEdit ? (
              <form.Field
                name="thumbnailId"
                children={(field) => {
                  const images = initialData.albumImages
                    .flatMap((m) => m.image)
                    .filter((f) => f != undefined);

                  return (
                    <div className="space-y-2">
                      <FieldSelectImages
                        images={images}
                        field={field}
                        label="Ảnh đại diện"
                        placeholder=""
                        disabled={!isEditing}
                      />
                    </div>
                  );
                }}
              />
            ) : null}

            {isEdit ? (
              <form.Field
                name="coverId"
                children={(field) => {
                  const images = initialData.albumImages
                    .flatMap((m) => m.image)
                    .filter((f) => f != undefined);

                  return (
                    <div className="space-y-2">
                      <FieldSelectImages
                        images={images}
                        field={field}
                        label="Ảnh nền"
                        disabled={!isEditing}
                      />
                    </div>
                  );
                }}
              />
            ) : null}

            <form.Field
              name="isFeatured"
              children={(field) => (
                <FieldSwitch
                  field={field}
                  label="Đặc biệt"
                  disabled={!isEditing}
                />
              )}
            />

            <form.Field
              name="title"
              children={(field) => (
                <FieldInput
                  field={field}
                  label="Tựa đề"
                  placeholder="Sinh nhật"
                  disabled={!isEditing}
                />
              )}
            />
            <form.Field
              name="description"
              children={(field) => (
                <FieldTextarea
                  field={field}
                  label="Mô tả album"
                  placeholder="Sự kiện `abc` này đã được makeup và lựa chọn nơi chụp cho khách."
                  disabled={!isEditing}
                />
              )}
            />
            <form.Field
              name="eventDate"
              children={(field) => (
                <FieldInputDateTime
                  field={field}
                  label="Ngày diễn ra "
                  placeholder="12/04/2025"
                  disabled={!isEditing}
                  isTime={false}
                />
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <form.Field
                name="groomName"
                children={(field) => (
                  <FieldInput
                    field={field}
                    label="Chú rễ"
                    placeholder="Anh A"
                    disabled={!isEditing}
                  />
                )}
              />
              <form.Field
                name="brideName"
                children={(field) => (
                  <FieldInput
                    field={field}
                    label="Cô dâu"
                    placeholder="Chị B"
                    disabled={!isEditing}
                  />
                )}
              />
            </div>

            <CardUpload
              defaultValues={fileMetaDatas}
              accept={Constants.IMAGE_EXT_STRING}
              maxFiles={100}
              onFilesAdded={handleFilesAdded}
              onFilesRemoved={handleRemoveFiles}
            />

            {/* {isEdit && <SheetAddVariant album={initialData} />} */}
          </div>
        </form>
      </div>
    </div>
  );
};
