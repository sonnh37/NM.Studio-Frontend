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
import { serviceBookingService } from "@/services/service-booking-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { FileUpload } from "@/components/_common/custom/file-upload";
import { usePreviousPath } from "@/hooks/use-previous-path";
import ConfirmationDialog, {
  FormImageUpload,
  FormInput,
  FormInputDate,
  FormInputDateTimePicker,
  FormInputReactTipTapEditor,
  FormInputTextArea,
  FormSelectEnum,
  FormSelectObject,
  FormSwitch,
} from "@/lib/form-custom-shadcn";
import { ServiceBooking, ServiceBookingStatus } from "@/types/entities/service-booking";
import {
  ServiceBookingCreateCommand,
  ServiceBookingUpdateCommand,
} from "@/types/commands/service-booking-command";
import { BusinessResult } from "@/types/models/business-result";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HeaderForm } from "../../common/create-update-forms/header-form";
import { TypographyH1 } from "@/components/_common/typography/typography-h1";
import { getEnumOptions } from "@/lib/utils";
import { UserGetAllQuery } from "@/types/queries/user-query";
import { userService } from "@/services/user-serice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/use-debounce";
import { AuthorSelect } from "./author-select";

interface ServiceBookingFormProps {
  initialData: ServiceBooking | null;
}

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required").nullable(),
  slug: z.string().nullable().optional(),
  content: z.string().nullable().optional(),
  summary: z.string().nullable().optional(),
  thumbnail: z.string().nullable().optional(),
  bannerImage: z.string().nullable().optional(),
  status: z.nativeEnum(ServiceBookingStatus),
  isFeatured: z.boolean().default(false),
  viewCount: z.number().default(0),
  tags: z.string().nullable().optional(),
  authorId: z.string().nullable().optional(),
});

export const ServiceBookingForm: React.FC<ServiceBookingFormProps> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Update servicebooking" : "New servicebooking";
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
        const updatedValues: ServiceBookingUpdateCommand = {
          ...values,
          id: initialData.id,
          isDeleted: false,
        };
        const response = await serviceBookingService.update(updatedValues);
        if (response.status != 1) throw new Error(response.message);
        // queryClient.refetchQueries({
        //   queryKey: ["fetchServiceBookingById", initialData.id],
        // });
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

  const handleCreateConfirmation = async (): Promise<BusinessResult<ServiceBooking>> => {
    if (!pendingValues) {
      toast.error("No pending values to create servicebooking.");
      return Promise.reject(new Error("No pending values"));
    }
    setIsLoading(true);
    try {
      const createdValues: ServiceBookingCreateCommand = {
        ...pendingValues,
      };
      const response = await serviceBookingService.create(createdValues);
      if (response.status !== 1) throw new Error(response.message);

      toast.success(response.message);
      setShowConfirmationDialog(false);
      setPendingValues(null);
      setIsLoading(false);

      return response;
    } catch (error: any) {
      console.error("Error creating servicebooking:", error);
      toast.error(error.message || "Failed to create servicebooking.");
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
        title="Do you want to continue adding this servicebooking?"
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
                  description="If enabled, this servicebooking will be about page."
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
                  name="content"
                  label="Description"
                  placeholder="Enter description"
                />

                <FormImageUpload
                  form={form}
                  name="thumbnail"
                  label="Thumbnail"
                  onFileChange={setFile}
                />

                <FormImageUpload
                  form={form}
                  name="bannerImage"
                  label="Banner"
                  onFileChange={setFile2}
                />

                <FormSelectEnum
                  form={form}
                  name="status"
                  label="Status"
                  enumOptions={getEnumOptions(ServiceBookingStatus)}
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
