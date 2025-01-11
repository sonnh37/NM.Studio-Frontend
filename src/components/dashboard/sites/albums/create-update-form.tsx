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
import { albumService } from "@/services/album-service";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { toast } from "sonner";
import { z } from "zod";

import { ButtonLoading } from "@/components/_common/button-loading";
import { FileUpload } from "@/components/_common/custom/file-upload";
import { TypographyH3 } from "@/components/_common/typography/typography-h3";
import { TypographyP } from "@/components/_common/typography/typography-p";
import { usePreviousPath } from "@/hooks/use-previous-path";
import ConfirmationDialog, {
  FormInput,
  FormInputDate,
  FormInputTextArea,
} from "@/lib/form-custom-shadcn";
import { Album } from "@/types/album";
import {
  AlbumCreateCommand,
  AlbumUpdateCommand,
} from "@/types/commands/album-command";
import { BusinessResult } from "@/types/response/business-result";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";

interface AlbumFormProps {
  initialData: Album | null;
}

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required").nullable(),
  description: z.string().nullable().optional(),
  background: z.string().nullable().optional(),
  createdDate: z
    .date()
    .optional()
    .default(() => new Date()),
  createdBy: z.string().nullable().optional().default(null),
  lastUpdatedBy: z.string().nullable().optional().default(null),
  isDeleted: z.boolean().default(false),
});

export const AlbumForm: React.FC<AlbumFormProps> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Edit album" : "Create album";
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

  useEffect(() => {
    if (initialData) {
      setFirebaseLink(initialData.background || "");
    }
  }, [initialData]);

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
        const updatedValues: AlbumUpdateCommand = {
          ...values,
          file: file,
        };
        const response = await albumService.update(updatedValues);
        if (response.status != 1) throw new Error(response.message);
        queryClient.invalidateQueries({
          queryKey: ["fetchAlbumById", initialData.id],
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

  const handleCreateConfirmation = async (): Promise<BusinessResult<Album>> => {
    if (!pendingValues) {
      toast.error("No pending values to create album.");
      return Promise.reject(new Error("No pending values"));
    }
    setIsLoading(true);
    try {
      const createdValues: AlbumCreateCommand = {
        ...pendingValues,
        file: file,
      };
      const response = await albumService.create(createdValues);
      if (response.status !== 1) throw new Error(response.message);

      toast.success(response.message);
      setShowConfirmationDialog(false);
      setPendingValues(null);
      setIsLoading(false);

      return response;
    } catch (error: any) {
      console.error("Error creating album:", error);
      toast.error(error.message || "Failed to create album.");
      setShowConfirmationDialog(false);
      setPendingValues(null);
      setIsLoading(false);
      return Promise.reject(error);
    }
  };

  const HeaderForm = () => {
    return (
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="flex flex-row items-center gap-4">
          <Link href={previousPath}>
            <Button type="button" variant="outline">
              <IoReturnUpBackOutline />
            </Button>
          </Link>
          <TypographyH3 className="tracking-normal font-thin">
            {title}
          </TypographyH3>
          <TypographyP className="[&:not(:first-child)]:mt-0">
            {initialData
              ? "Last Updated: " + initialData.lastUpdatedDate
              : null}
          </TypographyP>
        </div>

        <div className="flex justify-end">
          {loading ? (
            <ButtonLoading
              size={"lg"}
              className={"w-full flex justify-center items-center"}
            />
          ) : (
            <Button
              className="flex justify-center items-center"
              size={"lg"}
              type="submit"
              disabled={loading}
            >
              {action}
            </Button>
          )}
        </div>
      </div>
    );
  };

  const MainCard = () => {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="grid gap-6">
            <div className="grid gap-3">
              <FormInput
                form={form}
                name="title"
                label="Title"
                placeholder="Enter title"
              />

              <FormInputTextArea
                form={form}
                name="description"
                label="Description"
                placeholder="Enter description"
              />

              <FormField
                control={form.control}
                name="background"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Background</FormLabel>
                    <FormControl>
                      <div className="grid gap-2">
                        {firebaseLink ? (
                          <>
                            <Image
                              alt="Picture"
                              className="w-[30%] rounded-md "
                              height={9999}
                              src={firebaseLink}
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
    );
  };

  const SubCard = () => {
    return <></>;
  };

  const InformationCard = () => {
    return (
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <FormInput
                form={form}
                name="createdBy"
                label="Created By"
                placeholder="N/A"
                disabled={true}
              />
            </div>
            <div className="grid gap-3">
              <Label>Created Date</Label>
              <Button
                type="button"
                disabled={true}
                variant={"outline"}
                className={cn(
                  "w-full flex flex-row justify-between pl-3 text-left font-normaltext-muted-foreground"
                )}
              >
                {initialData?.lastUpdatedDate ? (
                  format(initialData?.lastUpdatedDate, "dd/MM/yyyy")
                ) : (
                  <span>{format(new Date(), "dd/MM/yyyy")}</span>
                )}
                <CalendarIcon className="mr-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
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
        title="Do you want to continue adding this album?"
        description="This action cannot be undone. Are you sure you want to permanently delete this file from our servers?"
        confirmText="Yes"
        cancelText="No"
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-2">
            <HeaderForm />
          </div>
          <div className="grid gap-4">
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="grid gap-4 lg:col-span-2">
                <MainCard />
              </div>

              <div className="grid gap-4 h-fit">
                <InformationCard />
              </div>
            </div>
            <div>
              <SubCard />
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
