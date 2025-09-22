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
import { albumService } from "@/services/album-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { FileUpload } from "@/components/_common/custom/file-upload";
import { usePreviousPath } from "@/hooks/use-previous-path";
import ConfirmationDialog, {
  FormInput,
  FormInputDate,
  FormInputDateTimePicker,
  FormInputTextArea,
  FormSwitch,
} from "@/lib/form-custom-shadcn";
import { Album } from "@/types/entities/album";
import {
  AlbumCreateCommand,
  AlbumUpdateCommand,
} from "@/types/commands/album-command";
import { BusinessResult } from "@/types/models/business-result";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HeaderForm } from "../../common/create-update-forms/header-form";
import { InformationBaseCard } from "../../common/create-update-forms/information-base-form";
import { TypographyH1 } from "@/components/_common/typography/typography-h1";

interface AlbumFormProps {
  initialData: Album | null;
}

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required").nullable(),
  slug: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  background: z.string().nullable().optional(),
  eventDate: z.string().nullable().optional(),
  brideName: z.string().nullable().optional(),
  groomName: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  photographer: z.string().nullable().optional(),
  isPublic: z.boolean().default(false),
});

export const AlbumForm: React.FC<AlbumFormProps> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Update album" : "New album";
  const action = "Submit";
  const router = useRouter();
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [pendingValues, setPendingValues] = useState<z.infer<
    typeof formSchema
  > | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const previousPath = usePreviousPath();
  const [file, setFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
        }
      : {},
  });

  const handleFileUpload = (file: File | null) => {
    setFile(file);
  };
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      if (initialData) {
        const updatedValues: AlbumUpdateCommand = {
          ...values,
          id: initialData.id,
          file: file,
          isDeleted: false
        };
        const response = await albumService.update(updatedValues);
        if (response.status != 1) throw new Error(response.message);
        queryClient.refetchQueries({
          queryKey: ["fetchAlbumById", initialData.id],
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

  const handleCreateConfirmation = async (): Promise<BusinessResult<Album>> => {
    if (!pendingValues) {
      toast.error("No pending values to create album.");
      return Promise.reject(new Error("No pending values"));
    }
    setIsLoading(true);
    try {
      const createdValues: AlbumCreateCommand = {
        ...pendingValues,
        file: file,
      };
      const response = await albumService.create(createdValues);
      if (response.status !== 1) throw new Error(response.message);

      toast.success(response.message);
      setShowConfirmationDialog(false);
      setPendingValues(null);
      setIsLoading(false);

      return response;
    } catch (error: any) {
      console.error("Error creating album:", error);
      toast.error(error.message || "Failed to create album.");
      setShowConfirmationDialog(false);
      setPendingValues(null);
      setIsLoading(false);
      return Promise.reject(error);
    }
  };

  return (
    <div className="w-full max-w-xl md:max-w-2xl mx-auto">
      <ConfirmationDialog
        isLoading={isLoading}
        isOpen={showConfirmationDialog}
        onConfirm={handleCreateConfirmation}
        onClose={async () => {
          const res = await handleCreateConfirmation();
          if (res.status != Status.OK) {
            return;
          }
          router.push(previousPath);
        }}
        title="Do you want to continue adding this album?"
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
                <FormSwitch
                  form={form}
                  name="isPublic"
                  label="Is Public"
                  description="If enabled, this album will be publicly accessible."
                />

                <FormInput
                  form={form}
                  name="title"
                  label="Title"
                  placeholder="Enter title"
                />

                <FormInput
                  form={form}
                  name="slug"
                  label="Slug"
                  placeholder="Enter slug"
                />

                <FormInputTextArea
                  form={form}
                  name="description"
                  label="Description"
                  placeholder="Enter description"
                />

                <FormField
                  control={form.control}
                  name="background"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Background</FormLabel>
                      <FormControl>
                        <div className="grid gap-2">
                          {field.value ? (
                            <>
                              <Image
                                alt="Picture"
                                className="w-[30%] rounded-md "
                                height={9999}
                                src={field.value ?? "/image-notfound.png"}
                                width={9999}
                              />
                            </>
                          ) : (
                            <></>
                          )}
                          <div className="w-full mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                            <FileUpload onChange={handleFileUpload} />
                          </div>
                          <FormMessage />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormInputDateTimePicker
                  form={form}
                  name="eventDate"
                  label="Event Date"
                />

                <FormInput
                  form={form}
                  name="brideName"
                  label="Bride Name"
                  placeholder="Enter bride name"
                />

                <FormInput
                  form={form}
                  name="groomName"
                  label="Groom Name"
                  placeholder="Enter groom name"
                />

                <FormInput
                  form={form}
                  name="location"
                  label="Location"
                  placeholder="Enter location"
                />

                <FormInput
                  form={form}
                  name="photographer"
                  label="Photographer"
                  placeholder="Enter photographer"
                />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
