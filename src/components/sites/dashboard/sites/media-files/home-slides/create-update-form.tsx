"use client";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { usePreviousPath } from "@/hooks/use-previous-path";
import ConfirmationDialog, {
  FormInputNumber,
  ImageUpload,
} from "@/lib/utils/form-custom-shadcn";

import { TypographyH1 } from "@/components/_common/typography/typography-h1";

import { mediaUploadService } from "@/services/media-upload-service";
import { BusinessResult, Status } from "@/types/models/business-result";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { HeaderForm } from "../../../common/create-update-forms/header-form";
import { HomeSlide } from "@/types/entities/home-slide";
import { homeSlideService } from "@/services/home-slide-service";
import {
  HomeSlideCreateCommand,
  HomeSlideUpdateCommand,
} from "@/types/cqrs/commands/home-slide-command";

interface HomeSlideFormProps {
  initialData?: HomeSlide | null;
}

const formSchema = z.object({
  id: z.string().optional(),
  slideId: z.string().optional(),
  displayOrder: z.number(),
  // startDate: z.date().nullable().optional(),
  // endDate: z.date().nullable().optional(),
});

export const HomeSlideForm: React.FC<HomeSlideFormProps> = ({
  initialData,
}) => {
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Update homeSlide" : "New homeSlide";
  const action = "Submit";
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
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
        }
      : {},
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      if (initialData) {
        const command: HomeSlideUpdateCommand = {
          ...initialData,
          ...values,
        };

        if (file) {
          const uploadResultThumb = await mediaUploadService.uploadFile(
            file,
            "HomeSlide"
          );
          if (
            uploadResultThumb?.status == Status.OK &&
            uploadResultThumb?.data
          ) {
            command.slideId = uploadResultThumb.data.id;
          }
        }

        const response = await homeSlideService.update(command);
        if (response.status != Status.OK) {
          toast.error(response.error?.detail);
          return;
        }
        // queryClient.refetchQueries({
        //   queryKey: ["fetchBlogById", initialData.id],
        // });
        toast.success("Slide updated successfully.");
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
    BusinessResult<HomeSlide>
  > => {
    if (!pendingValues) {
      toast.error("No pending values to create homeSlide.");
      return Promise.reject(new Error("No pending values"));
    }
    setIsLoading(true);
    try {
      const command: HomeSlideCreateCommand = {
        ...pendingValues,
      };
      if (file) {
        const uploadResultThumb = await mediaUploadService.uploadFile(
          file,
          "HomeSlide"
        );
        if (uploadResultThumb?.status == Status.OK && uploadResultThumb?.data) {
          command.slideId = uploadResultThumb.data.id;
        }
      }

      const response = await homeSlideService.create(command);
      if (response.status != Status.OK) {
        toast.error(response.error?.detail);
        return response;
      }

      toast.success("Blog created successfully.");
      setShowConfirmationDialog(false);
      setPendingValues(null);
      setIsLoading(false);

      return response;
    } catch (error: any) {
      console.error("Error creating homeSlide:", error);
      toast.error(error.message || "Failed to create homeSlide.");
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
        title="Do you want to continue adding this homeSlide?"
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
                  label="Image File"
                  defaultValue={initialData?.slide?.mediaUrl}
                  onFileChange={setFile}
                />

                <FormInputNumber
                  form={form}
                  name="displayOrder"
                  label="Display Order"
                  placeholder="Enter display order"
                />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
