"use client";
import { Resolver, useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { mediaBaseService } from "@/services/media-base-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { usePreviousPath } from "@/hooks/use-previous-path";
import ConfirmationDialog, {
  FormInput,
  FormInputReactTipTapEditor,
  FormSelectEnum,
  FormSwitch,
  ImageUpload,
} from "@/lib/form-custom-shadcn";
import { MediaBase } from "@/types/entities/media-base";

import { TypographyH1 } from "@/components/_common/typography/typography-h1";
import { getEnumOptions } from "@/lib/utils";

import { BusinessResult, Status } from "@/types/models/business-result";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { HeaderForm } from "../../common/create-update-forms/header-form";
import { mediaUploadService } from "@/services/media-upload-service";

interface MediaBaseFormProps {
  initialData?: MediaBase | null;
}

const formSchema = z.object({
  id: z.string().optional(),
});

export const MediaBaseForm: React.FC<MediaBaseFormProps> = ({
  initialData,
}) => {
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Update mediaBase" : "New mediaBase";
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
    resolver: zodResolver(formSchema) as unknown as Resolver<
      z.infer<typeof formSchema>
    >,
    defaultValues: formSchema.parse(initialData ?? {}),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      if (initialData) {
        if (file) {
          const uploadResultThumb = await mediaUploadService.updateFile(
            file,
            "MediaBase",
            initialData.id
          );
          if (uploadResultThumb.status != Status.OK) {
            toast.error(uploadResultThumb.error?.detail);
            return;
          }
        }

        toast.success("MediaBase updated successfully.");
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
    BusinessResult<MediaBase>
  > => {
    if (!pendingValues) {
      toast.error("No pending values to create mediaBase.");
      return Promise.reject(new Error("No pending values"));
    }
    setIsLoading(true);
    try {
      if (file) {
        const uploadResultBg = await mediaUploadService.uploadFile(
          file2,
          "MediaBase"
        );

        if (uploadResultBg.status != Status.OK) {
          toast.error(uploadResultBg.error?.detail);
          return uploadResultBg;
        }

        toast.success("MediaBase created successfully.");
        setShowConfirmationDialog(false);
        setPendingValues(null);
        setIsLoading(false);

        return uploadResultBg;
      }

      return Promise.reject(new Error("No file to upload"));
    } catch (error: any) {
      console.error("Error creating mediaBase:", error);
      toast.error(error.message || "Failed to create mediaBase.");
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
        title="Do you want to continue adding this mediaBase?"
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
                  defaultValue={initialData?.mediaUrl}
                  onFileChange={setFile}
                />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
