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
import { photoService } from "@/services/photo-service";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { useRouter } from "next/navigation";
import {
  PhotoCreateCommand,
  PhotoUpdateCommand,
} from "@/types/commands/photo-command";
import { Color } from "@/types/color";
import { Size } from "@/types/size";
import { Category, SubCategory } from "@/types/category";
import ConfirmationDialog, {
  FormInput,
  FormInputDate,
  FormInputTextArea,
  FormSwitch,
} from "@/lib/form-custom-shadcn";
import { usePreviousPath } from "@/hooks/use-previous-path";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../../../firebase";
import Image from "next/image";
import { BsPlus } from "react-icons/bs";
import { ButtonLoading } from "@/components/common/button-loading";

interface PhotoFormProps {
  initialData: any | null;
}

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().nullable().optional(),
  src: z.string().nullable().optional(),
  href: z.string().nullable().optional(),
  tag: z.string().nullable().optional(),
  createdDate: z
    .date()
    .optional()
    .default(() => new Date()),
  createdBy: z.string().nullable().optional().default(null),
  isDeleted: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
});

export const PhotoForm: React.FC<PhotoFormProps> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const title = initialData ? "Edit photo" : "Create photo";
  const description = initialData ? "Edit a photo." : "Add a new photo";
  const toastMessage = initialData ? "Photo updated." : "Photo created.";
  const action = initialData ? "Save changes" : "Create";
  const [firebaseLink, setFirebaseLink] = useState<string | null>(null);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Lưu tạm file đã chọn
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [pendingValues, setPendingValues] = useState<z.infer<
    typeof formSchema
  > | null>(null);

  const [sizes, setSizes] = useState<Size[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  const previousPath = usePreviousPath();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFirebaseLink(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  const handleImageDelete = () => {
    setFirebaseLink("");
    setSelectedFile(null);
    form.setValue("src", "");
  };

  const uploadImageFirebase = async (values: z.infer<typeof formSchema>) => {
    if (selectedFile) {
      const storageRef = ref(storage, `Photo/${selectedFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      const uploadPromise = new Promise<string>((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => reject(error),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => resolve(url));
          }
        );
      });

      const downloadURL = await uploadPromise;
      return { ...values, src: downloadURL };
    }
    return values;
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const values_ = await uploadImageFirebase(values);
      if (initialData) {
        const updatedValues = {
          ...values_,
        };
        console.log("check_output", updatedValues);
        const response = await photoService.update(updatedValues);
        if (response.status != 1) throw new Error(response.message);

        toast.success(response.message);
        router.push(previousPath);
      } else {
        setPendingValues(values_);
        setShowConfirmationDialog(true);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateConfirmation = async () => {
    if (pendingValues) {
      const createdValues = {
        ...pendingValues,
      };
      const response = await photoService.create(createdValues);
      if (response.status != 1) throw new Error(response.message);
      toast.success(response.message);
    }
    setShowConfirmationDialog(false);
    setPendingValues(null);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

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
      setFirebaseLink(parsedInitialData.src || "");
    }
  }, [initialData, form]);

  return (
    <>
      <ConfirmationDialog
        isOpen={showConfirmationDialog}
        onConfirm={() => {
          handleCreateConfirmation();
          setShowConfirmationDialog(false);
        }} // Đóng modal
        onClose={() => {
          handleCreateConfirmation();
          setShowConfirmationDialog(false);
          router.push(previousPath);
        }} // Đóng modal
        title="Do you want to continue adding this photo?"
        description="This action cannot be undone. Are you sure you want to permanently delete this file from our servers?"
        confirmText="Yes"
        cancelText="No"
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid flex-1 auto-rows-max gap-4">
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card
                  x-chunk="dashboard-07-chunk-0"
                  className="shadow-lg drop-shadow-md"
                >
                  <CardHeader>
                    <CardTitle className="text-neutral-800">
                      {title}
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
                                    : "Last Updated: " +
                                      initialData.lastUpdatedDate
                                  : null}
                              </p>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <FormSwitch
                          form={form}
                          name="isFeatured"
                          label="Featured"
                          description="This is your public display."
                        />
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

                        <FormInput
                          form={form}
                          name="href"
                          label="Link to (if has)"
                          description="This is your public display href."
                          placeholder="Enter href"
                        />

                        <FormInput
                          form={form}
                          name="tag"
                          label="Tag"
                          description="This is your public display tag."
                          placeholder="Enter tag"
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
                    <CardTitle>Photo Src</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="src"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Src</FormLabel>
                          <FormControl>
                            <div className="grid gap-2">
                              {firebaseLink ? (
                                <>
                                  <Image
                                    alt="Photo Src"
                                    className="aspect-square w-full rounded-md object-cover"
                                    height={300}
                                    src={firebaseLink}
                                    width={300}
                                  />
                                  <Button
                                    onClick={handleImageDelete}
                                    variant="destructive"
                                  >
                                    Delete Image
                                  </Button>
                                </>
                              ) : (
                                <div className="grid grid-cols-3 gap-2">
                                  <button
                                    type="button"
                                    className="flex aspect-square w-full items-center justify-center rounded-md bphoto bphoto-dashed"
                                    onClick={() =>
                                      fileInputRef.current?.click()
                                    }
                                  >
                                    <Upload className="h-4 w-4 text-muted-foreground" />
                                    <span className="sr-only">Upload</span>
                                  </button>
                                </div>
                              )}
                              <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleImageChange}
                              />
                              <FormMessage />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-4">
                <Card className="p-2 gap-4 flex  shadow-sm drop-shadow-md">
                  <div className="grid grid-cols-3 justify-between w-full gap-2">
                    <div className="col-span-1">
                      <Link href={previousPath}>
                        <Button
                          variant="outline"
                          className="shadow-inner text-neutral-700 w-full"
                        >
                          <ChevronLeft />
                          Back
                        </Button>
                      </Link>
                    </div>

                    <div className="flex col-span-2 w-full">
                      {loading ? (
                        <ButtonLoading
                          className={
                            "shadow-inner w-full flex justify-center items-center"
                          }
                        />
                      ) : (
                        <Button
                          className="shadow-inner w-full flex justify-center items-center"
                          type="submit"
                          disabled={loading}
                        >
                          <BsPlus />
                          {action}
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
                <Card
                  x-chunk="dashboard-07-chunk-3"
                  className="shadow-lg drop-shadow-md"
                >
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
              {/*            name="photoXPhotos"*/}
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
              {/*                                            photoId={*/}
              {/*                                                initialData && initialData.id*/}
              {/*                                                    ? initialData.id*/}
              {/*                                                    : undefined*/}
              {/*                                            }*/}
              {/*                                            onChange={(pxcs) => {*/}
              {/*                                                field.onChange(pxcs);*/}
              {/*                                            }}*/}
              {/*                                            photoXPhotos={field.value ?? []}*/}
              {/*                                            tab={0}*/}
              {/*                                        />*/}
              {/*                                    </Card>*/}
              {/*                                </TabsContent>*/}
              {/*                                <TabsContent value="available">*/}
              {/*                                    <Card>*/}
              {/*                                        <DataTablePhotos*/}
              {/*                                            photoId={*/}
              {/*                                                initialData && initialData.id*/}
              {/*                                                    ? initialData.id*/}
              {/*                                                    : undefined*/}
              {/*                                            }*/}
              {/*                                            onChange={(pxcs) => {*/}
              {/*                                                field.onChange(pxcs);*/}
              {/*                                            }}*/}
              {/*                                            photoXPhotos={field.value ?? []}*/}
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
