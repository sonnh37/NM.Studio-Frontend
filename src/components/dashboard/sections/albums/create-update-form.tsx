"use client";
import { ChevronLeft, Upload } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { albumService } from "@/services/album-service";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { useRouter } from "next/navigation";
import {
  AlbumCreateCommand,
  AlbumUpdateCommand,
} from "@/types/commands/album-command";
import { Color } from "@/types/color";
import { Size } from "@/types/size";
import { Category, SubCategory } from "@/types/category";
import ConfirmationDialog, {
  FormInput,
  FormInputDate,
  FormInputTextArea,
} from "@/lib/form-custom-shadcn";
import { usePreviousPath } from "@/hooks/use-previous-path";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../../../firebase";
import Image from "next/image";
import { FileUpload } from "@/components/custom/file-upload";
import { BusinessResult } from "@/types/response/business-result";
import { Album } from "@/types/album";
import { CreateCommand } from "@/types/commands/base-command";

interface AlbumFormProps {
  initialData: any | null;
}

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().nullable().optional(),
  background: z.string().nullable().optional(),
  createdDate: z
    .date()
    .optional()
    .default(() => new Date()),
  createdBy: z.string().nullable().optional().default(null),
  isDeleted: z.boolean().default(false),
});

export const AlbumForm: React.FC<AlbumFormProps> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const title = initialData ? "Edit album" : "Create album";
  const description = initialData ? "Edit a album." : "Add a new album";
  const toastMessage = initialData ? "Album updated." : "Album created.";
  const action = initialData ? "Save changes" : "Create";
  const [firebaseLink, setFirebaseLink] = useState<string | null>(null);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Lưu tạm file đã chọn
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [pendingValues, setPendingValues] = useState<z.infer<
    typeof formSchema
  > | null>(null);
  const previousPath = usePreviousPath();
  const [file, setFile] = useState<File | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleFileUpload = (file: File | null) => {
    setFile(file);
    console.log(file);
  };


  useEffect(() => {
    if (initialData) {
      const parsedInitialData = {
        ...initialData,
        createdDate: initialData.createdDate
          ? new Date(initialData.createdDate)
          : new Date(),
      };

      form.reset({
        ...parsedInitialData,
      });
      setFirebaseLink(parsedInitialData.background || "");
    }
  }, [initialData, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      if (initialData) {
        const response = await albumService.update(values);
        if (response.status != 1) throw new Error(response.message);

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

    try {
      const createdValues: CreateCommand = {
        ...pendingValues,
        file: file,
      };
      const response = await albumService.create(createdValues);
      return response;
    } catch (error: any) {
      console.error("Error creating album:", error);
      toast.error(error.message || "Failed to create album.");
      return Promise.reject(error); // Trả về lỗi để xử lý tiếp
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <ConfirmationDialog
        isLoading={isLoading}
        isOpen={showConfirmationDialog}
        onConfirm={async () => {
          setIsLoading(true);
          const res = await handleCreateConfirmation();
          if (res.status != 1) {
            toast.error(res.message);
            setIsLoading(false);
            return;
          }
          toast.success(res.message);
          setShowConfirmationDialog(false);
          setPendingValues(null);

          setIsLoading(false);
        }} // Đóng modal
        onClose={async () => {
          setIsLoading(true);
          const res = await handleCreateConfirmation();
          if (res.status != 1) {
            toast.error(res.message);
            setIsLoading(false);
            return;
          }
          toast.success(res.message);
          setShowConfirmationDialog(false);
          setPendingValues(null);
          setIsLoading(false);

          router.push(previousPath);
        }} // Đóng modal
        title="Do you want to continue adding this album?"
        description="This action cannot be undone. Are you sure you want to permanently delete this file from our servers?"
        confirmText="Yes"
        cancelText="No"
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Link href={previousPath}>
                <Button variant="outline" size="icon" className="h-7 w-7">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Button>
              </Link>

              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Album Controller
              </h1>
              <Badge variant="outline" className="ml-auto sm:ml-0">
                <FormField
                  control={form.control}
                  name="isDeleted"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <p>
                          {initialData
                            ? field.value
                              ? "Deleted"
                              : "Last Updated: " + initialData.lastUpdatedDate
                            : "New"}
                        </p>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Badge>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Link href="" passHref>
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(previousPath);
                    }}
                  >
                    Discard
                  </Button>
                </Link>
                <Button type="submit" size="sm" disabled={loading}>
                  {loading ? "Processing..." : action}
                </Button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle>Album Details</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <FormInput
                          form={form}
                          name="title"
                          label="Title"
                          description="This is your public display title."
                          placeholder="Enter title"
                        />

                        <FormInputTextArea
                          form={form}
                          name="description"
                          label="Description"
                          description="This is your public display description."
                          placeholder="Enter description"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className="overflow-hidden"
                  x-chunk="dashboard-07-chunk-2"
                >
                  <CardHeader>
                    <CardTitle>Picture</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="background"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Album Background</FormLabel>
                          <FormControl>
                            <div className="grid gap-2">
                              {firebaseLink ? (
                                <>
                                  <Image
                                    alt="Picture"
                                    className="aspect-square w-full rounded-md object-cover"
                                    height={300}
                                    src={firebaseLink}
                                    width={300}
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
                  </CardContent>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-3">
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
                        <FormInputDate
                          form={form}
                          name="createdDate"
                          label="Created Date"
                          disabled={true}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="grid gap-4 grid-cols-1 lg:gap-8">
              {/*<Card*/}
              {/*    className="overflow-hidden"*/}
              {/*    x-chunk="dashboard-07-chunk-2"*/}

              {/*>*/}
              {/*    <CardHeader>*/}
              {/*        <CardTitle>Photos</CardTitle>*/}
              {/*        <CardDescription>*/}
              {/*            Lipsum dolor sit amet, consectetur adipiscing elit*/}
              {/*        </CardDescription>*/}
              {/*    </CardHeader>*/}
              {/*    <CardContent>*/}
              {/*        <FormField*/}
              {/*            form={form}*/}
              {/*            name="albumXPhotos"*/}
              {/*            render={({field}) => (*/}
              {/*                <FormItem>*/}
              {/*                    <FormLabel>List</FormLabel>*/}
              {/*                    <FormControl>*/}
              {/*                        <div className="grid gap-2">*/}
              {/*                            <Tabs defaultValue="selected" className="w-full">*/}
              {/*                                <TabsList className="grid w-full grid-cols-2">*/}
              {/*                                    <TabsTrigger value="selected">Selected</TabsTrigger>*/}
              {/*                                    <TabsTrigger value="available">Available</TabsTrigger>*/}
              {/*                                </TabsList>*/}
              {/*                                <TabsContent value="selected">*/}
              {/*                                    <Card>*/}
              {/*                                        <DataTablePhotos*/}
              {/*                                            albumId={*/}
              {/*                                                initialData && initialData.id*/}
              {/*                                                    ? initialData.id*/}
              {/*                                                    : undefined*/}
              {/*                                            }*/}
              {/*                                            onChange={(pxcs) => {*/}
              {/*                                                field.onChange(pxcs);*/}
              {/*                                            }}*/}
              {/*                                            albumXPhotos={field.value ?? []}*/}
              {/*                                            tab={0}*/}
              {/*                                        />*/}
              {/*                                    </Card>*/}
              {/*                                </TabsContent>*/}
              {/*                                <TabsContent value="available">*/}
              {/*                                    <Card>*/}
              {/*                                        <DataTablePhotos*/}
              {/*                                            albumId={*/}
              {/*                                                initialData && initialData.id*/}
              {/*                                                    ? initialData.id*/}
              {/*                                                    : undefined*/}
              {/*                                            }*/}
              {/*                                            onChange={(pxcs) => {*/}
              {/*                                                field.onChange(pxcs);*/}
              {/*                                            }}*/}
              {/*                                            albumXPhotos={field.value ?? []}*/}
              {/*                                            tab={1}*/}
              {/*                                        />*/}
              {/*                                    </Card>*/}
              {/*                                </TabsContent>*/}
              {/*                            </Tabs>*/}
              {/*                            <FormMessage/>*/}
              {/*                        </div>*/}
              {/*                    </FormControl>*/}
              {/*                </FormItem>*/}
              {/*            )}*/}
              {/*        />*/}
              {/*    </CardContent>*/}
              {/*</Card>*/}
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
