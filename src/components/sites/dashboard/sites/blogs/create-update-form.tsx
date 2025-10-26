"use client";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { blogService } from "@/services/blog-service";
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
import { Blog, BlogStatus } from "@/types/entities/blog";

import { TypographyH1 } from "@/components/_common/typography/typography-h1";
import { getEnumOptions } from "@/lib/utils";
import {
  BlogCreateCommand,
  BlogUpdateCommand,
} from "@/types/cqrs/commands/blog-command";
import { BusinessResult, Status } from "@/types/models/business-result";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { HeaderForm } from "../../common/create-update-forms/header-form";
import { AuthorSelect } from "./author-select";
import { mediaUploadService } from "@/services/media-upload-service";

interface BlogFormProps {
  initialData?: Blog | null;
}

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required").nullable(),
  slug: z.string().nullable().optional(),
  content: z.string().nullable().optional(),
  summary: z.string().nullable().optional(),
  status: z.nativeEnum(BlogStatus),
  isFeatured: z.boolean().default(false),
  viewCount: z.number().default(0),
  tags: z.string().nullable().optional(),
  authorId: z.string().nullable().optional(),
});

export const BlogForm: React.FC<BlogFormProps> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Update blog" : "New blog";
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
        const command: BlogUpdateCommand = {
          ...initialData, ...values
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
            command.thumbnailId = uploadResultThumb.data.id;
          }
        }

        if (file2) {
          const uploadResultBg = await mediaUploadService.uploadFile(
            file2,
            "Blog"
          );
          if (uploadResultBg?.status == Status.OK && uploadResultBg?.data) {
            command.backgroundCoverId = uploadResultBg.data.id;
          }
        }

        const response = await blogService.update(command);
        if (response.status != Status.OK)
          throw new Error(response.error?.detail);
        // queryClient.refetchQueries({
        //   queryKey: ["fetchBlogById", initialData.id],
        // });
        toast.success("Blog updated successfully.");
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

  const handleCreateConfirmation = async (): Promise<BusinessResult<Blog>> => {
    if (!pendingValues) {
      toast.error("No pending values to create blog.");
      return Promise.reject(new Error("No pending values"));
    }
    setIsLoading(true);
    try {
      const command: BlogCreateCommand = {
        ...pendingValues,
      };
      if (file) {
        const uploadResultThumb = await mediaUploadService.uploadFile(
          file,
          "Blog"
        );
        if (uploadResultThumb?.status == Status.OK && uploadResultThumb?.data) {
          command.thumbnailId = uploadResultThumb.data.id;
        }
      }

      if (file2) {
        const uploadResultBg = await mediaUploadService.uploadFile(
          file2,
          "Blog"
        );
        if (uploadResultBg?.status == Status.OK && uploadResultBg?.data) {
          command.backgroundCoverId = uploadResultBg.data.id;
        }
      }

      const response = await blogService.create(command);
      if (response.status != Status.OK) throw new Error(response.error?.detail);

      toast.success("Blog created successfully.");
      setShowConfirmationDialog(false);
      setPendingValues(null);
      setIsLoading(false);

      return response;
    } catch (error: any) {
      console.error("Error creating blog:", error);
      toast.error(error.message || "Failed to create blog.");
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

                <FormSelectEnum
                  form={form}
                  name="status"
                  label="Status"
                  enumOptions={getEnumOptions(BlogStatus)}
                />

                <FormInput form={form} name="tags" label="Tags" />

                <AuthorSelect form={form} name="authorId" />

                <FormInputReactTipTapEditor form={form} name="content" />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
