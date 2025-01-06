"use client";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { BsPlus } from "react-icons/bs";

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
import { productService } from "@/services/product-service";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { ButtonLoading } from "@/components/_common/button-loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePreviousPath } from "@/hooks/use-previous-path";
import { Const } from "@/lib/constants/const";
import ConfirmationDialog, {
  FormInput,
  FormInputDate,
  FormInputNumber,
  FormInputTextArea,
  FormSelectEnum,
} from "@/lib/form-custom-shadcn";
import { getEnumOptions } from "@/lib/utils";
import { categoryService } from "@/services/category-service";
import { colorService } from "@/services/color-service";
import { sizeService } from "@/services/size-service";
import { Category, SubCategory } from "@/types/category";
import { Color } from "@/types/color";
import {
  ProductCreateCommand,
  ProductUpdateCommand,
} from "@/types/commands/product-command";
import { ProductStatus } from "@/types/product";
import { Size } from "@/types/size";
import { useRouter } from "next/navigation";

interface ProductFormProps {
  initialData: any | null;
}

const formSchema = z.object({
  id: z.string().optional(),
  subCategoryId: z.string().nullable().optional(),
  name: z.string().min(1, "Name is required").nullable(),
  sku: z.string().nullable(),
  description: z.string().nullable().optional(),
  price: z.number().nullable().default(0),
  status: z.nativeEnum(ProductStatus).nullable(),
  createdDate: z.date().optional().default(new Date()),
  createdBy: z.string().nullable().optional().default(null),
  isDeleted: z.boolean().default(false),
});

export const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const title = initialData ? "Edit product" : "Create product";
  const description = initialData ? "Edit a product." : "Add a new product";
  const toastMessage = initialData ? "Product updated." : "Product created.";
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
  const selectedCategoryId = initialData
    ? initialData.subCategory.categoryId
    : null;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const values_ = values;
      if (initialData) {
        const updatedValues: ProductUpdateCommand = {
          ...values_,
        };
        const response = await productService.update(updatedValues);
        if (response.status != 1) throw new Error(response.message);

        toast.success(response.message);
        router.push(Const.DASHBOARD_PRODUCT_URL);
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
        const createdValues: ProductCreateCommand = {
          ...pendingValues,
        };

        const response = await productService.create(createdValues);
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
    defaultValues: initialData
      ? {
          ...initialData,
          createdDate: initialData.createdDate
            ? new Date(initialData.createdDate)
            : new Date(),
        }
      : {},
  });

  useEffect(() => {
    if (initialData) {
      setFirebaseLink(initialData.thumbnail || "");
    }
  }, [initialData]);

  const fetchColors = async () => {
    const response = await colorService.fetchAll();
    return response.data?.results;
  };

  const fetchSizes = async () => {
    const response = await sizeService.fetchAll();
    return response.data?.results;
  };

  const fetchCategories = async () => {
    const response = await categoryService.fetchAll();
    return response.data?.results;
  };

  const [loading_, setLoading_] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading_(true); // Bắt đầu trạng thái loading
        const [colors, sizes, categories] = await Promise.all([
          fetchColors(),
          fetchSizes(),
          fetchCategories(),
        ]);
        setColors(colors!);
        setSizes(sizes!);
        setCategories(categories!);
        setSelectedCategory(selectedCategoryId);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading_(false); // Kết thúc trạng thái loading
      }
    };

    fetchData();
  }, [selectedCategoryId]);

  useEffect(() => {
    if (selectedCategory) {
      const category = categories.find((ca) => ca.id === selectedCategory);
      if (category) {
        setSubCategories(category.subCategories || []);
      } else {
        setSubCategories([]);
      }
    }
  }, [selectedCategory, categories]);

  const previousPath = usePreviousPath();

  if (loading_) {
    return <div>Loading data...</div>; // Hiển thị trạng thái chờ khi đang tải dữ liệu
  }

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
        title="Do you want to continue adding this product?"
        description="This action cannot be undone. Are you sure you want to permanently delete this file from our servers?"
        confirmText="Yes"
        cancelText="No"
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid flex-1 auto-rows-max gap-4">
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-4">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-4">
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
                        <FormInput
                          form={form}
                          name="sku"
                          label="Code"
                          description="This is your public display code."
                          placeholder="Enter code"
                        />

                        <FormInputTextArea
                          form={form}
                          name="description"
                          label="Description"
                          description="This is your public display description."
                          placeholder="Enter description"
                        />

                        <FormSelectEnum
                          form={form}
                          name="status"
                          label="Status"
                          description="Select the current status of the course."
                          enumOptions={getEnumOptions(ProductStatus)}
                          placeholder="Select status"
                        />

                        <FormInputNumber
                          form={form}
                          name="price"
                          label="Price"
                          placeholder="Enter price"
                          className="mt-2 w-full"
                        />

                        {/* <div className="grid grid-cols-2 gap-3">
                          <FormSelectObject
                            form={form}
                            name="sizeId"
                            label="Size"
                            description="Select the size for this product."
                            options={sizes}
                            selectLabel="name"
                            selectValue="id"
                            placeholder="Select size"
                          />

                          <FormSelectColor
                            form={form}
                            name="colorId"
                            label="Color"
                            description="Select the color for this product."
                            options={colors}
                            selectLabel="name"
                            selectValue="id"
                            placeholder="Select color"
                          />
                        </div> */}
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={(value) => {
                              setSelectedCategory(value);
                            }}
                            value={selectedCategory ?? undefined}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem
                                  key={category.id}
                                  value={category.id!}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                        <FormField
                          control={form.control}
                          name="subCategoryId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>SubCategory</FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={(value) =>
                                    field.onChange(value)
                                  }
                                  value={field.value ?? undefined} // Ensure the value is set correctly
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select subcategory" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {subCategories.map((subCategory) => (
                                      <SelectItem
                                        key={subCategory.id}
                                        value={subCategory.id!}
                                      >
                                        {subCategory.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
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
          </div>
        </form>
      </Form>
    </>
  );
};
