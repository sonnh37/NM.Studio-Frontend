"use client";
import { Resolver, useForm } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { serviceService } from "@/services/service-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { FileUpload } from "@/components/_common/custom/file-upload";
import { usePreviousPath } from "@/hooks/use-previous-path";
import ConfirmationDialog, {
  FormInput,
  FormInputNumber,
  FormInputReactTipTapEditor,
  FormSwitch,
  ImageUpload,
} from "@/lib/form-custom-shadcn";

import { BusinessResult, Status } from "@/types/models/business-result";
import { Service } from "@/types/entities/service";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HeaderForm } from "../../common/create-update-forms/header-form";
import { InformationBaseCard } from "../../common/create-update-forms/information-base-form";
import { mediaUploadService } from "@/services/media-upload-service";
import {
  ServiceUpdateCommand,
  ServiceCreateCommand,
} from "@/types/cqrs/commands/service-command";
import { TypographyH1 } from "@/components/_common/typography/typography-h1";

interface ServiceFormProps {
  initialData?: Service | null;
}

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required").nullable(),
  slug: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  price: z.number().nullable().default(0),
  isFeatured: z.boolean().default(false),
});
export const ServiceForm: React.FC<ServiceFormProps> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Edit service" : "Create service";
  const action = initialData ? "Save and continue" : "Create";
  const router = useRouter();
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [pendingValues, setPendingValues] = useState<z.infer<
    typeof formSchema
  > | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const previousPath = usePreviousPath();
  const [file, setFile] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
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
        const command: ServiceUpdateCommand = {
          ...initialData,
          ...values,
        };

        if (file) {
          const uploadResultThumb = await mediaUploadService.uploadFile(
            file,
            "Service"
          );
          if (
            uploadResultThumb?.status == Status.OK &&
            uploadResultThumb?.data
          ) {
            command.thumbnailId = uploadResultThumb.data.id;
          }
        }

        if (file2) {
          const uploadResultBg = await mediaUploadService.uploadFile(
            file2,
            "Service"
          );
          if (uploadResultBg?.status == Status.OK && uploadResultBg?.data) {
            command.backgroundCoverId = uploadResultBg.data.id;
          }
        }

        const response = await serviceService.update(command);
        if (response.status != Status.OK)
          throw new Error(response.error?.detail);
        // queryClient.refetchQueries({
        //   queryKey: ["fetchServiceById", initialData.id],
        // });
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
    BusinessResult<Service>
  > => {
    if (!pendingValues) {
      toast.error("No pending values to create service.");
      return Promise.reject(new Error("No pending values"));
    }
    setIsLoading(true);
    try {
      const command: ServiceCreateCommand = {
        ...pendingValues,
      };

      if (file) {
        const uploadResultThumb = await mediaUploadService.uploadFile(
          file,
          "Service"
        );
        if (uploadResultThumb?.status == Status.OK && uploadResultThumb?.data) {
          command.thumbnailId = uploadResultThumb.data.id;
        }
      }

      if (file2) {
        const uploadResultBg = await mediaUploadService.uploadFile(
          file2,
          "Service"
        );
        if (uploadResultBg?.status == Status.OK && uploadResultBg?.data) {
          command.backgroundCoverId = uploadResultBg.data.id;
        }
      }
      const response = await serviceService.create(pendingValues);
      if (response.status != Status.OK) throw new Error(response.error?.detail);
      toast.success("Created!");
      setShowConfirmationDialog(false);
      setPendingValues(null);
      setIsLoading(false);

      return response;
    } catch (error: any) {
      console.error("Error creating service:", error);
      toast.error(error.message || "Failed to create service.");
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
                <FormSwitch
                  form={form}
                  name="isFeatured"
                  label="Is Main"
                  description="If enabled, this blog will be about page."
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
                  name="slug"
                  label="Slug"
                  placeholder="Enter slug"
                />

                <FormInputNumber
                  form={form}
                  name="price"
                  label="Price"
                  placeholder="Enter price"
                />

                <ImageUpload
                  label="Thumbnail"
                  defaultValue={initialData?.thumbnail?.mediaUrl}
                  onFileChange={setFile}
                />

                <ImageUpload
                  label="Background Cover"
                  defaultValue={initialData?.backgroundCover?.mediaUrl}
                  onFileChange={setFile2}
                />

                <FormInputReactTipTapEditor form={form} name="description" />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
