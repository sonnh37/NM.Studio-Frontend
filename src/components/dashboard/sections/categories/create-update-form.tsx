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
import { categoryService } from "@/services/category-service";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { useRouter } from "next/navigation";
import {
  CategoryCreateCommand,
  CategoryUpdateCommand,
} from "@/types/commands/category-command";
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
import { ButtonLoading } from "@/components/common/button-loading";
import { BsPlus } from "react-icons/bs";

interface CategoryFormProps {
  initialData: any | null;
}

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  description: z.string().nullable().optional(),
  background: z.string().nullable().optional(),
  createdDate: z
    .date()
    .optional()
    .default(() => new Date()),
  createdBy: z.string().nullable().optional().default(null),
  isDeleted: z.boolean().default(false),
});

export const CategoryForm: React.FC<CategoryFormProps> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const title = initialData ? "Edit category" : "Create category";
  const description = initialData ? "Edit a category." : "Add a new category";
  const toastMessage = initialData ? "Category updated." : "Category created.";
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
    form.setValue("background", "");
  };

  const uploadImageFirebase = async (values: z.infer<typeof formSchema>) => {
    if (selectedFile) {
      const storageRef = ref(storage, `Category/${selectedFile.name}`);
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
      return { ...values, background: downloadURL };
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
        const response = await categoryService.update(updatedValues);
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
    try {
      if (pendingValues) {
        const createdValues = {
          ...pendingValues,
        };

        const response = await categoryService.create(createdValues);
        if (response.status != 1) throw new Error(response.message);
        toast.success(response.message);
      }
      setShowConfirmationDialog(false);
      setPendingValues(null);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
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
      setFirebaseLink(parsedInitialData.background || "");
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
        title="Do you want to continue adding this category?"
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
                        <FormInput
                          form={form}
                          name="name"
                          label="Name"
                          description="This is your public display name."
                          placeholder="Enter name"
                        />
                      </div>
                    </div>
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
              {/*            name="categoryXPhotos"*/}
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
              {/*                                            categoryId={*/}
              {/*                                                initialData && initialData.id*/}
              {/*                                                    ? initialData.id*/}
              {/*                                                    : undefined*/}
              {/*                                            }*/}
              {/*                                            onChange={(pxcs) => {*/}
              {/*                                                field.onChange(pxcs);*/}
              {/*                                            }}*/}
              {/*                                            categoryXPhotos={field.value ?? []}*/}
              {/*                                            tab={0}*/}
              {/*                                        />*/}
              {/*                                    </Card>*/}
              {/*                                </TabsContent>*/}
              {/*                                <TabsContent value="available">*/}
              {/*                                    <Card>*/}
              {/*                                        <DataTablePhotos*/}
              {/*                                            categoryId={*/}
              {/*                                                initialData && initialData.id*/}
              {/*                                                    ? initialData.id*/}
              {/*                                                    : undefined*/}
              {/*                                            }*/}
              {/*                                            onChange={(pxcs) => {*/}
              {/*                                                field.onChange(pxcs);*/}
              {/*                                            }}*/}
              {/*                                            categoryXPhotos={field.value ?? []}*/}
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
