"use client";
import { useForm } from "react-hook-form";

import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { subCategoryService } from "@/services/sub-category-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { usePreviousPath } from "@/hooks/use-previous-path";
import ConfirmationDialog, {
  FormInput,
  FormSelectObject,
} from "@/lib/form-custom-shadcn";
import { categoryService } from "@/services/category-service";
import { Category, SubCategory } from "@/types/category";
import {
  SubCategoryCreateCommand,
  SubCategoryUpdateCommand,
} from "@/types/commands/category-command";
import { BusinessResult } from "@/types/response/business-result";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { HeaderForm } from "../../common/create-update-forms/header-form";
import { InformationBaseCard } from "../../common/create-update-forms/information-base-form";

interface SubCategoryFormProps {
  initialData: SubCategory | null;
}

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required").nullable(),
  categoryId: z.string().nullable(),
  createdDate: z
    .date()
    .optional()
    .default(() => new Date()),
  createdBy: z.string().nullable().optional().default(null),
  isDeleted: z.boolean().default(false),
});

export const SubCategoryForm: React.FC<SubCategoryFormProps> = ({
  initialData,
}) => {
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Edit subCategory" : "Create subCategory";
  const action = initialData ? "Save and continue" : "Create";
  const router = useRouter();
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [pendingValues, setPendingValues] = useState<z.infer<
    typeof formSchema
  > | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const previousPath = usePreviousPath();
  const [file, setFile] = useState<File | null>(null);
  const queryClient = useQueryClient();
  const [categories, setCategories] = useState<Category[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          createdDate: initialData.createdDate
            ? new Date(initialData.createdDate)
            : new Date(),
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
        const updatedValues: SubCategoryUpdateCommand = {
          ...values,
          file: file,
        };
        const response = await subCategoryService.update(updatedValues);
        if (response.status != 1) throw new Error(response.message);
        queryClient.invalidateQueries({
          queryKey: ["fetchSubCategoryById", initialData.id],
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

  const handleCreateConfirmation = async (): Promise<
    BusinessResult<SubCategory>
  > => {
    if (!pendingValues) {
      toast.error("No pending values to create subCategory.");
      return Promise.reject(new Error("No pending values"));
    }
    setIsLoading(true);
    try {
      const createdValues: SubCategoryCreateCommand = {
        ...pendingValues,
        file: file,
      };
      const response = await subCategoryService.create(createdValues);
      if (response.status !== 1) throw new Error(response.message);

      toast.success(response.message);
      setShowConfirmationDialog(false);
      setPendingValues(null);
      setIsLoading(false);

      return response;
    } catch (error: any) {
      console.error("Error creating subCategory:", error);
      toast.error(error.message || "Failed to create subCategory.");
      setShowConfirmationDialog(false);
      setPendingValues(null);
      setIsLoading(false);
      return Promise.reject(error);
    }
  };

  const fetchCategories = async () => {
    const response = await categoryService.fetchAll();
    return response.data?.results;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categories] = await Promise.all([fetchCategories()]);
        setCategories(categories || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <ConfirmationDialog
        isLoading={isLoading}
        isOpen={showConfirmationDialog}
        onConfirm={handleCreateConfirmation}
        onClose={async () => {
          const res = await handleCreateConfirmation();
          if (res.status != 1) {
            return;
          }
          router.push(previousPath);
        }}
        title="Do you want to continue adding this subCategory?"
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
          </div>
          <div className="grid gap-4">
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="grid gap-4 lg:col-span-2">
                {/* main */}
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <FormInput
                          form={form}
                          name="name"
                          label="Name"
                          description="This is your public display name."
                          placeholder="Enter name"
                        />

                        <div className="grid grid-cols-2 gap-3">
                          <FormSelectObject
                            form={form}
                            name="categoryId"
                            label="Category"
                            description="Select the size for this product."
                            options={categories}
                            selectLabel="name"
                            selectValue="id"
                            placeholder="Select size"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 h-fit">
                <InformationBaseCard form={form} initialData={initialData} />
              </div>
            </div>
            <div>{/* sub */}</div>
          </div>
        </form>
      </Form>
    </>
  );
};
