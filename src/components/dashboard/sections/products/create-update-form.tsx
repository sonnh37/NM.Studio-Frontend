"use client";
import { CalendarIcon, ChevronLeft, Upload } from "lucide-react";
import Image from "next/image";
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

import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { productService } from "@/services/product-service";

import { zodResolver } from "@hookform/resolvers/zod";
import { format, isValid, parse } from "date-fns";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { useRouter } from "next/navigation";
import { Const } from "@/lib/const";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import TimePicker from "react-time-picker";
import { storage } from "../../../../../firebase";
import { formatCurrency, getEnumOptions } from "@/lib/utils";
import { ProductStatus } from "@/types/product";
import {
  ProductCreateCommand,
  ProductUpdateCommand,
} from "@/types/commands/product-command";

interface ProductFormProps {
  initialData: any | null;
}

const formSchema = z.object({
  id: z.string().optional().default(""),
  sizeId: z.string().optional().default(""),
  colorId: z.string().optional().default(""),
  subCategoryId: z.string().optional().default(""),
  name: z.string().min(1, "Name is required").default(""),
  sku: z.string().optional().default(""),
  description: z.string().optional().default(""),
  price: z.number().optional().default(0),
  status: z
    .nativeEnum(ProductStatus)
    .optional()
    .default(ProductStatus.Unspecified),
  createdDate: z
    .date()
    .optional()
    .default(() => new Date()),
  createdBy: z.string().optional().default(""),
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
  const [date, setDate] = useState<Date>();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Lưu tạm file đã chọn

  // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     setFirebaseLink(URL.createObjectURL(file)); // Hiển thị preview
  //     setSelectedFile(file); // Lưu file vào state thay vì upload
  //   }
  // };

  // const handleImageDelete = () => {
  //   setFirebaseLink(""); // Xóa preview của hình ảnh
  //   setSelectedFile(null); // Đặt file về null để xóa file đã chọn
  //   form.setValue("backgroundImage", ""); // Xóa giá trị hình ảnh trong form nếu có
  // };

  // const uploadImageFirebase = async (values: z.infer<typeof formSchema>) => {
  //   if (selectedFile) {
  //     const storageRef = ref(storage, `Product/${selectedFile.name}`);
  //     const uploadTask = uploadBytesResumable(storageRef, selectedFile);

  //     const uploadPromise = new Promise<string>((resolve, reject) => {
  //       uploadTask.on(
  //         "state_changed",
  //         null,
  //         (error) => reject(error),
  //         () => {
  //           getDownloadURL(uploadTask.snapshot.ref).then((url) => resolve(url));
  //         }
  //       );
  //     });

  //     const downloadURL = await uploadPromise;
  //     return { ...values, backgroundImage: downloadURL }; // Trả về values đã cập nhật
  //   }
  //   return values; // Trả về values gốc nếu không có file
  // };
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
      } else {
        const createdValues: ProductCreateCommand = {
          ...values_,
        };
        const response = await productService.create(createdValues);
        if (response.status != 1) throw new Error(response.message);
        toast.success(response.message);
      }

      router.push(Const.DASHBOARD_SERVICE_URL);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (initialData) {
      console.log("check_init", initialData);
      const parsedInitialData = {
        ...initialData,
        createdDate: initialData.createdDate
          ? new Date(initialData.createdDate)
          : new Date(),
      };

      form.reset(parsedInitialData);
      setDate(parsedInitialData.createdDate);
      setFirebaseLink(parsedInitialData.backgroundImage || "");
    } else {
      setDate(new Date());
    }
  }, [initialData, form]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Gọi API lấy danh sách subjectId
  //       const response_subjects = await subjectService.fetchAll();
  //       setSubjects(response_subjects.data?.results!);
  //       console.log("check_subjects", response_subjects.data?.results!);
  //       // Gọi API lấy danh sách providerId
  //       const response_providers = await providerService.fetchAll();
  //       console.log("check_providers", response_providers.data?.results!);
  //       setProviders(response_providers.data?.results!);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Link href="/products">
                <Button variant="outline" size="icon" className="h-7 w-7">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Button>
              </Link>

              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Product Controller
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
                              : "Last Updated: " + initialData.updatedDate
                            : "New"}
                        </p>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Badge>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Link href="/products" passHref>
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push("/products");
                    }} // Ngăn chặn submit
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
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter name" {...field} />
                              </FormControl>
                              <FormDescription>
                                This is your public display name.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="sku"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Sku</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter sku" {...field} />
                              </FormControl>
                              <FormDescription>
                                This is your public display name.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter name" {...field} />
                              </FormControl>
                              <FormDescription>
                                This is your public display name.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field} // Kết nối field với input
                                  placeholder="Nhập mô tả..."
                                  className="mt-2" // Thêm khoảng cách trên nếu cần
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="status"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Status</FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={(value) => {
                                    console.log("Selected Value:", value);
                                    field.onChange(Number(value));
                                  }}
                                  value={field.value?.toString()}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {getEnumOptions(ProductStatus).map(
                                      (option) => (
                                        <SelectItem
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option.label}
                                        </SelectItem>
                                      )
                                    )}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormDescription>
                                Select the current status of the course.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* <FormField
                          control={form.control}
                          name="status"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Status</FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={(value) =>
                                    field.onChange(Number(value))
                                  } // Chuyển đổi string sang number
                                  value={field.value?.toString()} // Chuyển đổi number sang string
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem
                                      value={ProductStatus.Pending.toString()}
                                    >
                                      Pending
                                    </SelectItem>
                                    <SelectItem
                                      value={ProductStatus.Approved.toString()}
                                    >
                                      Approved
                                    </SelectItem>
                                    <SelectItem
                                      value={ProductStatus.Rejected.toString()}
                                    >
                                      Rejected
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormDescription>
                                Select the current status of the product.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        /> */}
                        {/* <FormField
                          control={form.control}
                          name="type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Type</FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={(value) =>
                                    field.onChange(Number(value))
                                  } // Chuyển đổi string sang number
                                  value={field.value?.toString()} // Chuyển đổi number sang string
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem
                                      value={ProductType.Online.toString()}
                                    >
                                      Online
                                    </SelectItem>
                                    <SelectItem
                                      value={ProductType.Offline.toString()}
                                    >
                                      Offline
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormDescription>
                                Select the current status of the product.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        /> */}
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => {
                            const inputRef = useRef<HTMLInputElement>(null);

                            return (
                              <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    ref={inputRef}
                                    placeholder="Nhập giá..."
                                    type="text"
                                    className="mt-2 w-full"
                                    min="0"
                                    value={
                                      field.value !== undefined
                                        ? formatCurrency(field.value)
                                        : ""
                                    }
                                    onChange={(e) => {
                                      const rawValue = e.target.value.replace(
                                        /[^0-9]/g,
                                        ""
                                      );
                                      const parsedValue =
                                        parseFloat(rawValue) || 0;

                                      // Cập nhật giá trị trong form
                                      field.onChange(parsedValue);

                                      // Giữ vị trí con trỏ
                                      if (inputRef.current) {
                                        const cursorPosition =
                                          e.target.selectionStart || 0;
                                        setTimeout(() => {
                                          inputRef.current?.setSelectionRange(
                                            cursorPosition,
                                            cursorPosition
                                          );
                                        }, 0);
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                      </div>

                      {/* <div className="grid grid-cols-2 gap-3">
                        <FormField
                          control={form.control}
                          name="subjectId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject</FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={(value) =>
                                    field.onChange(value)
                                  }
                                  value={field.value}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select subject" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {subjects.map((subject: Subject) => (
                                      <SelectItem
                                        key={subject.id}
                                        value={subject.id}
                                      >
                                        {subject.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormDescription>
                                Select the subject of the product.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="providerId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Provider</FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={(value) =>
                                    field.onChange(value)
                                  }
                                  value={field.value}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select provider" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {providers.map((provider: Provider) => (
                                      <SelectItem
                                        key={provider.id}
                                        value={provider.id}
                                      >
                                        {provider.website}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormDescription>
                                Select the provider for this product.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div> */}
                    </div>
                  </CardContent>
                </Card>
                {/* <Card
                  className="overflow-hidden"
                  x-chunk="dashboard-07-chunk-2"
                >
                  <CardHeader>
                    <CardTitle>Product Background</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="backgroundImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Background</FormLabel>
                          <FormControl>
                            <div className="grid gap-2">
                              {firebaseLink ? (
                                <>
                                  <Image
                                    alt="Product Background"
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
                                    className="flex aspect-square w-full items-center justify-center rounded-md bproduct bproduct-dashed"
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
                </Card> */}
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-3">
                  <CardHeader>
                    <CardTitle>Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="createdBy"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input disabled placeholder="N/A" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="createdDate"
                          render={({ field }) => {
                            const handleDateSelect = (selectedDate: any) => {
                              setDate(selectedDate);
                              field.onChange(
                                selectedDate
                                  ? new Date(selectedDate)
                                  : new Date()
                              );
                            };
                            return (
                              <FormItem>
                                <FormLabel>Created Date</FormLabel>
                                <FormControl>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        disabled
                                        variant={"outline"}
                                        className={`w-[280px] justify-start text-left font-normal ${
                                          !date ? "text-muted-foreground" : ""
                                        }`}
                                      >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? (
                                          format(date, "PPP")
                                        ) : (
                                          <span>Pick a date</span>
                                        )}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                      <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={handleDateSelect}
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* <Card x-chunk="dashboard-07-chunk-5">
                  <CardHeader>
                    <CardTitle>Quantity with time</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="soldProducts"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sold products</FormLabel>
                            <FormControl>
                              <Input
                                {...field} // Kết nối field với input
                                placeholder=""
                                type="number"
                                disabled // Đặt trường này ở trạng thái disabled
                                className="mt-2 w-full"
                                onChange={(e) =>
                                  field.onChange(
                                    parseFloat(e.target.value) || 0
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="totalSlots"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Total slots</FormLabel>
                            <FormControl>
                              <Input
                                {...field} // Kết nối field với input
                                placeholder="Enter number slots..."
                                type="number"
                                className="mt-2 w-full"
                                onChange={(e) =>
                                  field.onChange(
                                    parseFloat(e.target.value) || 0
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="totalSessions"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Total sessions</FormLabel>
                            <FormControl>
                              <Input
                                {...field} // Kết nối field với input
                                placeholder="Enter number sessions"
                                type="number"
                                className="mt-2 w-full"
                                onChange={(e) =>
                                  field.onChange(
                                    parseFloat(e.target.value) || 0
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="startTime"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Start Time</FormLabel>
                              <FormControl>
                                <TimePicker
                                  value={field.value}
                                  onChange={(value) => field.onChange(value)} 
                                  className="mt-2 w-full"
                                  clockIcon={null}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        name="endTime"
                        render={({ field }) => {
                          // const handleTimeChange = (value: any) => {
                          //   // Chuyển đổi giá trị từ TimePicker về định dạng hh:mm:ss
                          //   if (value) {
                          //     const [hours, minutes] = value.split(":");
                          //     const formattedTime = `${String(hours).padStart(
                          //       2,
                          //       "0"
                          //     )}:${String(minutes).padStart(2, "0")}:00`;
                          //     field.onChange(formattedTime);
                          //   } else {
                          //     field.onChange(null); // Xử lý trường hợp người dùng xóa thời gian
                          //   }
                          // };

                          return (
                            <FormItem>
                              <FormLabel>End Time</FormLabel>
                              <FormControl>
                                <TimePicker
                                  value={field.value}
                                  onChange={(value) => field.onChange(value)} 
                                  className="mt-2 w-full"
                                  clockIcon={null}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />

                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Start Date</FormLabel>
                              <FormControl>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant={"outline"}
                                      className={`w-[280px] justify-start text-left font-normal 
                                    }`}
                                    >
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {field.value ? (
                                        format(field.value, "dd/MM/yyyy")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0">
                                    <Calendar
                                      mode="single"
                                      selected={
                                        field.value
                                          ? new Date(field.value)
                                          : undefined
                                      }
                                      onSelect={(date_) =>
                                        field.onChange(date_)
                                      }
                                      className="mt-2 w-full"
                                    />
                                  </PopoverContent>
                                </Popover>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />

                      <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>End Date</FormLabel>
                              <FormControl>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant={"outline"}
                                      className={`w-[280px] justify-start text-left font-normal 
                                    }`}
                                    >
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {field.value ? (
                                        format(field.value, "dd/MM/yyyy")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0">
                                    <Calendar
                                      mode="single"
                                      selected={
                                        field.value
                                          ? new Date(field.value)
                                          : undefined
                                      }
                                      onSelect={(date_) =>
                                        field.onChange(date_)
                                      }
                                      className="mt-2 w-full"
                                    />
                                  </PopoverContent>
                                </Popover>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                  </CardContent>
                </Card> */}
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
