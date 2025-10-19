"use client";
import { useForm } from "react-hook-form";

import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { categoryService } from "@/services/category-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { usePreviousPath } from "@/hooks/use-previous-path";
import ConfirmationDialog, {
  FormInput,
  FormSwitch,
} from "@/lib/form-custom-shadcn";
import { Category } from "@/types/entities/category";

import { BusinessResult, Status } from "@/types/models/business-result";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { HeaderForm } from "../../common/create-update-forms/header-form";
import { InformationBaseCard } from "../../common/create-update-forms/information-base-form";
import {
  CategoryUpdateCommand,
  CategoryCreateCommand,
} from "@/types/cqrs/commands/category-command";
import { sl } from "date-fns/locale";
import { TypographyH1 } from "@/components/_common/typography/typography-h1";

interface CategoryFormProps {
  initialData: Category | null;
}

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required").nullable(),
  slug: z.string().min(1, "Slug is required").nullable().optional(),
  description: z.string().min(1, "Description is required").nullable(),
  isFeatured: z.boolean().default(false),
});

export const CategoryForm: React.FC<CategoryFormProps> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Edit category" : "Create category";
  const action = initialData ? "Save and continue" : "Create";
  const [firebaseLink, setFirebaseLink] = useState<string | null>(null);
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
        const command: CategoryUpdateCommand = {
          ...initialData,
          ...values,
        };

        const response = await categoryService.update(command);
        if (response.status != Status.OK)
          throw new Error(response.error?.detail);
        queryClient.refetchQueries({
          queryKey: ["fetchCategoryById", initialData.id],
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
    BusinessResult<Category>
  > => {
    if (!pendingValues) {
      toast.error("No pending values to create category.");
      return Promise.reject(new Error("No pending values"));
    }
    setIsLoading(true);
    try {
      const command: CategoryCreateCommand = {
        ...pendingValues,
      };
      const response = await categoryService.create(command);
      if (response.status != Status.OK) throw new Error(response.error?.detail);
      toast.success("Created!");
      setShowConfirmationDialog(false);
      setPendingValues(null);
      setIsLoading(false);

      return response;
    } catch (error: any) {
      console.error("Error creating category:", error);
      toast.error(error.message || "Failed to create category.");
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
        title="Do you want to continue adding this category?"
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
                  description="If enabled, this category will be about page."
                />

                <FormInput
                  form={form}
                  name="name"
                  label="Name"
                  placeholder="Enter name"
                />

                <FormInput
                  form={form}
                  name="slug"
                  label="Slug"
                  placeholder="Enter slug"
                />

                
                <FormInput
                  form={form}
                  name="description"
                  label="Description"
                  placeholder="Enter description"
                />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
