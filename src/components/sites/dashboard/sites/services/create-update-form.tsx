"use client";
import { useForm } from "react-hook-form";

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
  FormInputReactTipTapEditor
} from "@/lib/form-custom-shadcn";
import {
  ServiceCreateCommand,
  ServiceUpdateCommand,
} from "@/types/commands/service-command";
import { BusinessResult } from "@/types/models/business-result";
import { Service } from "@/types/entities/service";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HeaderForm } from "../../common/create-update-forms/header-form";
import { InformationBaseCard } from "../../common/create-update-forms/information-base-form";

interface ServiceFormProps {
  initialData: Service | null;
}

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required").nullable(),
  description: z.string().nullable().optional(),
  src: z.string().nullable().optional(),
  price: z.number().nullable().default(0),
  createdDate: z.date().optional().default(new Date()),
  createdBy: z.string().nullable().optional().default(null),
  isDeleted: z.boolean().default(false),
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
        const updatedValues: ServiceUpdateCommand = {
          ...values,
          file: file,
        };
        const response = await serviceService.update(updatedValues);
        if (response.status != 1) throw new Error(response.message);
        queryClient.refetchQueries({
          queryKey: ["fetchServiceById", initialData.id],
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
    BusinessResult<Service>
  > => {
    if (!pendingValues) {
      toast.error("No pending values to create service.");
      return Promise.reject(new Error("No pending values"));
    }
    setIsLoading(true);
    try {
      const createdValues: ServiceCreateCommand = {
        ...pendingValues,
        file: file,
      };
      const response = await serviceService.create(createdValues);
      if (response.status !== 1) throw new Error(response.message);

      toast.success(response.message);
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
    <>
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
        title="Do you want to continue adding this service?"
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

                        <FormInputNumber
                          form={form}
                          name="price"
                          label="Price"
                          placeholder="Enter price"
                          className="mt-2 w-full"
                        />
                        <FormField
                          control={form.control}
                          name="src"
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
                                        src={
                                          field.value ?? "/image-notfound.png"
                                        }
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
                    <FormInputReactTipTapEditor form={form} name="description" />
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
