import { LoadingPageComponent } from "@/components/_common/loading-page";
import { TypographyH1 } from "@/components/_common/typography/typography-h1";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import { usePreviousPath } from "@/hooks/use-previous-path";
import { productService } from "@/services/product-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Archive, ChevronLeft, Layers2, Pen, Save, X } from "lucide-react";
import Link from "next/link";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Status } from "@/types/models/business-result";
import { TypographyH3 } from "@/components/_common/typography/typography-h3";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Product, ProductStatus } from "@/types/entities/product";
import { ProductVariant } from "@/types/entities/product-variant";
import { toast } from "sonner";
import { ProductUpdateCommand } from "@/types/cqrs/commands/product-command";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { FieldInput } from "@/lib/field-tanstack/field-input";

interface ProductOverviewProps {
  id: string;
}

const query_key = "productOverview";

const productFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Tên sản phẩm là bắt buộc"),
  sku: z.string().optional().nullable(),
  slug: z.string().optional().nullable(),
  // description: z.string().optional().nullable(),
  // material: z.string().optional().nullable(),
  // variants: z
  //   .array(
  //     z.object({
  //       id: z.string(),
  //       color: z.string().optional().nullable(),
  //       size: z.string().optional().nullable(),
  //       price: z.number().optional().nullable(),
  //       stockQuantity: z.number().optional().nullable(),
  //       sku: z.string().optional().nullable(),
  //     })
  //   )
  //   .optional(),
});

type ProductFormData = z.infer<typeof productFormSchema>;

export default function ProductOverview({ id }: ProductOverviewProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const previousPath = usePreviousPath();

  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, isFetching, error } = useQuery({
    queryKey: [query_key, id],
    queryFn: () =>
      productService.getById(id, ["category", "subCategory", "thumbnail"]),
    refetchOnWindowFocus: false,
  });

  const formId = "product-overview";
  const form = useForm({
    defaultValues: data?.data ? productFormSchema.parse(data.data) : undefined,
    validators: {
      onSubmit: productFormSchema,
    },
    onSubmit: async ({ value }) => {
      const updateData: ProductUpdateCommand = {
        ...data?.data,
        ...value,
        name: value.name,
        status: ProductStatus.Active,
      };

      await updateProductMutation.mutateAsync(updateData);
    },
  });

  const handleEdit = () => {
    // setIsEditing(true);
    router.push(`${id}/edit`);
  };

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  const updateProductMutation = useMutation({
    mutationFn: (productData: ProductUpdateCommand) =>
      productService.update(productData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [query_key, id] });
      toast.success("Cập nhật sản phẩm thành công");
      setIsEditing(false);
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast.error("Cập nhật sản phẩm thất bại");
      console.error("Update error:", error);
      setIsSubmitting(false);
    },
  });

  if (error) return <div>Error loading data</div>;
  if (isFetching) return <LoadingPageComponent />;
  if (data?.status != Status.OK || !data?.data) return <div>No data found</div>;

  const product = data.data;
  const { title } = { title: "Product Overview" };

  return (
    <div className="w-full max-w-xl md:max-w-2xl mx-auto">
      <div className="grid gap-4">
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="flex flex-row items-center">
            <Link href={previousPath}>
              <Button
                type="button"
                className="-ml-4 gap-1"
                variant="ghost"
                size="sm"
                disabled={isEditing}
              >
                <ChevronLeft />
                Back
              </Button>
            </Link>
          </div>
          <div className="flex justify-end">
            <ButtonGroup>
              <Button variant={"outline"} size={"icon-sm"} disabled={isEditing}>
                <Archive />
              </Button>
              <Button variant={"outline"} size={"icon-sm"} disabled={isEditing}>
                <Layers2 />
              </Button>

              {isEditing ? (
                <>
                  <Button
                    variant={"outline"}
                    size="icon-sm"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                  >
                    <X />
                  </Button>
                  <Button
                    variant={"outline"}
                    size="icon-sm"
                    type="submit"
                    disabled={isSubmitting}
                    form={formId}
                  >
                    <Save />
                  </Button>
                </>
              ) : (
                <Button variant={"outline"} size="icon-sm" onClick={handleEdit}>
                  <Pen />
                </Button>
              )}
            </ButtonGroup>
          </div>
        </div>
        <div>
          <TypographyH3>{title}</TypographyH3>
        </div>

        <div className="grid gap-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            id={formId}
          >
            {/* main */}
            <div className="grid gap-6">
              {/* Thông tin cơ bản */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <form.Field
                  name="name"
                  children={(field) => (
                    <FieldInput
                      field={field}
                      label="Name"
                      placeholder="Enter Name"
                      disabled={!isEditing}
                    />
                  )}
                />
                <form.Field
                  name="sku"
                  children={(field) => (
                    <FieldInput
                      field={field}
                      label="Sku"
                      placeholder="Enter SKU"
                      disabled={!isEditing}
                    />
                  )}
                />
              </div>

              {/* Slug và Category */}
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field>
                  <FieldLabel htmlFor="product-slug">Slug</FieldLabel>
                  <Input
                    id="product-slug"
                    placeholder="Đường dẫn SEO"
                    disabled={!isEditing}
                    {...form.register("slug")}
                  />
                </Field>
              </div> */}

              {/* Danh mục - Chỉ hiển thị, không chỉnh sửa */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field>
                  <FieldLabel htmlFor="product-category">
                    Danh mục chính
                  </FieldLabel>
                  <Input
                    id="product-category"
                    disabled
                    value={product.category?.name || "Chưa chọn danh mục"}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="product-subcategory">
                    Danh mục phụ
                  </FieldLabel>
                  <Input
                    id="product-subcategory"
                    disabled
                    value={
                      product.subCategory?.name || "Chưa chọn danh mục phụ"
                    }
                  />
                </Field>
              </div>

              {/* Material và Description */}
              <Field>
                <FieldLabel htmlFor="product-material">Chất liệu</FieldLabel>
                {/* <Input
                  id="product-material"
                  placeholder="Chất liệu sản phẩm"
                  disabled={!isEditing}
                  {...form.register("material")}
                /> */}
              </Field>

              <Field>
                <FieldLabel>Mô tả sản phẩm</FieldLabel>
                {/* <Textarea
                  className=""
                  disabled={!isEditing}
                  {...form.register("description")}
                /> */}
              </Field>

              {/* 🎯 Thông tin variants với form control */}
              {/* {form.watch("variants") && form.watch("variants")!.length > 0 && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Biến thể sản phẩm ({form.watch("variants")!.length})
                  </h3>
                  <div className="space-y-4">
                    {form.watch("variants")!.map((variant, index) => (
                      <div
                        key={variant.id}
                        className="border rounded-lg p-4 bg-gray-50"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <Field>
                            <FieldLabel>Màu sắc</FieldLabel>
                            <Input
                              disabled={!isEditing}
                              {...form.register(`variants.${index}.color`)}
                            />
                          </Field>
                          <Field>
                            <FieldLabel>Kích thước</FieldLabel>
                            <Input
                              disabled={!isEditing}
                              {...form.register(`variants.${index}.size`)}
                            />
                          </Field>
                          <Field>
                            <FieldLabel>Giá</FieldLabel>
                            <Input
                              disabled={!isEditing}
                              type="number"
                              {...form.register(`variants.${index}.price`, {
                                valueAsNumber: true,
                              })}
                            />
                          </Field>
                          <Field>
                            <FieldLabel>Tồn kho</FieldLabel>
                            <Input
                              disabled={!isEditing}
                              type="number"
                              {...form.register(
                                `variants.${index}.stockQuantity`,
                                {
                                  valueAsNumber: true,
                                }
                              )}
                            />
                          </Field>
                        </div>
                        {variant.sku && (
                          <Field className="mt-2">
                            <FieldLabel>SKU biến thể</FieldLabel>
                            <Input
                              disabled={!isEditing}
                              {...form.register(`variants.${index}.sku`)}
                            />
                          </Field>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )} */}

              {/* Hiển thị thumbnail nếu có */}
              {product.thumbnail && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Hình ảnh đại diện
                  </h3>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 h-32 border rounded-md overflow-hidden">
                      <img
                        src={
                          product.thumbnail.mediaUrl || "/image-notfound.png"
                        }
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <Field>
                        <FieldLabel>Tên file</FieldLabel>
                        <Input
                          disabled
                          value={
                            product.thumbnail.mediaUrl || "Không có tên file"
                          }
                        />
                      </Field>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
