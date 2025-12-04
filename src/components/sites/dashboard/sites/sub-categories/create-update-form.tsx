"use client";
import { Resolver, useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { usePreviousPath } from "@/hooks/use-previous-path";
import ConfirmationDialog, {
  FormInput,
  FormSelectObject,
  FormSwitch,
} from "@/lib/utils/form-custom-shadcn";
import { SubCategory } from "@/types/entities/subcategory";

import { BusinessResult, Status } from "@/types/models/business-result";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { HeaderForm } from "../../common/create-update-forms/header-form";

import { TypographyH1 } from "@/components/_common/typography/typography-h1";
import { categoryService } from "@/services/category-service";
import { subCategoryService } from "@/services/sub-category-service";
import {
  SubCategoryCreateCommand,
  SubCategoryUpdateCommand,
} from "@/types/cqrs/commands/category-command";
import { CategoryGetAllQuery } from "@/types/cqrs/queries/category-query";

interface SubCategoryFormProps {
  initialData?: SubCategory | null;
}

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required").nullable(),
  slug: z.string().min(1, "Slug is required").nullable().optional(),
  categoryId: z.string().nullable().optional(),
  description: z.string().min(1, "Description is required").nullable(),
  isFeatured: z.boolean().default(false),
});

export const SubCategoryForm: React.FC<SubCategoryFormProps> = ({
  initialData,
}) => {
  const [loading, setLoading] = useState(false);
  const title = initialData?.id ? "Edit subcategory" : "Create subcategory";
  const action = initialData?.id ? "Save and continue" : "Create";
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
    resolver: zodResolver(formSchema) as unknown as Resolver<
      z.infer<typeof formSchema>
    >,
    defaultValues: formSchema.parse(initialData ?? {}),
  });

  const queryCategory: CategoryGetAllQuery = {
    pagination: {
      isPagingEnabled: false,
    },
  };

  const {
    data: categories = [],
    isFetching,
    error,
  } = useQuery({
    queryKey: ["query_category", queryCategory],
    queryFn: () => categoryService.getAll(queryCategory),
    select: (res) => res.data?.results,
    refetchOnWindowFocus: false,
  });

  if (error) return <div>Error loading data</div>;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      if (initialData?.id) {
        const command: SubCategoryUpdateCommand = {
          ...initialData,
          ...values,
        };

        const response = await subCategoryService.update(command);
        if (response.status != Status.OK)
          throw new Error(response.error?.detail);
        queryClient.refetchQueries({
          queryKey: ["fetchSubCategoryById", initialData.id],
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
    BusinessResult<SubCategory>
  > => {
    if (!pendingValues) {
      toast.error("No pending values to create subcategory.");
      return Promise.reject(new Error("No pending values"));
    }
    setIsLoading(true);
    try {
      const command: SubCategoryCreateCommand = {
        ...pendingValues,
      };
      const response = await subCategoryService.create(command);
      if (response.status != Status.OK) throw new Error(response.error?.detail);
      toast.success("Created!");
      setShowConfirmationDialog(false);
      setPendingValues(null);
      setIsLoading(false);

      return response;
    } catch (error: any) {
      console.error("Error creating subcategory:", error);
      toast.error(error.message || "Failed to create subcategory.");
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
        title="Do you want to continue adding this subcategory?"
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
                  description="If enabled, this subcategory will be about page."
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

                <FormSelectObject
                  form={form}
                  name="categoryId"
                  label="Thể loại"
                  options={categories}
                  selectLabel="name"
                  selectValue="id"
                  placeholder="Chọn thể loại"
                />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
