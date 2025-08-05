"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { blogService } from "@/services/blog-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { toast } from "sonner";
import { z } from "zod";

import { ButtonLoading } from "@/components/_common/button-loading";
import { FileUpload } from "@/components/_common/custom/file-upload";
import { TypographyH3 } from "@/components/_common/typography/typography-h3";
import { TypographyP } from "@/components/_common/typography/typography-p";
import { Label } from "@/components/ui/label";
import { usePreviousPath } from "@/hooks/use-previous-path";
import ConfirmationDialog, {
  FormInput,
  FormInputPlateJsEditor,
  FormInputReactTipTapEditor,
  FormInputTextArea,
  FormSwitch,
} from "@/lib/form-custom-shadcn";
import { cn } from "@/lib/utils";
import { Blog } from "@/types/entities/blog";
import {
  BlogCreateCommand,
  BlogUpdateCommand,
} from "@/types/commands/blog-command";
import { BusinessResult } from "@/types/response/business-result";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { InformationBaseCard } from "../../common/create-update-forms/information-base-form";
import { HeaderForm } from "../../common/create-update-forms/header-form";

interface BlogFormProps {
  initialData: Blog | null;
}

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required").nullable(),
  content: z.string().nullable().optional(),
  thumbnail: z.string().nullable().optional(),
  createdDate: z.date().optional().default(new Date()),
  createdBy: z.string().nullable().optional().default(null),
  isDeleted: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
});

export const BlogForm: React.FC<BlogFormProps> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Edit blog" : "Create blog";
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
        const updatedValues: BlogUpdateCommand = {
          ...values,
          file: file,
        };
        const response = await blogService.update(updatedValues);
        if (response.status != 1) throw new Error(response.message);
        queryClient.invalidateQueries({
          queryKey: ["fetchBlogById", initialData.id],
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

  const handleCreateConfirmation = async (): Promise<BusinessResult<Blog>> => {
    if (!pendingValues) {
      toast.error("No pending values to create blog.");
      return Promise.reject(new Error("No pending values"));
    }
    setIsLoading(true);
    try {
      const createdValues: BlogCreateCommand = {
        ...pendingValues,
        file: file,
      };
      const response = await blogService.create(createdValues);
      if (response.status !== 1) throw new Error(response.message);

      toast.success(response.message);
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
          </div>
          <div className="grid gap-4">
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="grid gap-4 lg:col-span-2">
                {/* main */}
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <FormSwitch
                          form={form}
                          name="isFeatured"
                          label="Featured"
                          description="This is your public about home."
                        />

                        <FormInput
                          form={form}
                          name="title"
                          label="Title"
                          description="This is your public display title."
                          placeholder="Enter title"
                        />

                        <FormField
                          control={form.control}
                          name="thumbnail"
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
                                        src={field.value ?? "/image-notfound.jpg"}
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
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 h-fit">
                <InformationBaseCard form={form} initialData={initialData} />
              </div>
            </div>
            <div>
              {/* sub */}
              <Card className="overflow-x-hidden">
                <CardHeader>
                  <CardTitle>Editor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="">
                    <FormInputReactTipTapEditor form={form} name="content" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
