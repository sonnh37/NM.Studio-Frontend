'use client';
import {CalendarIcon, ChevronLeft, Upload,} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {useForm} from "react-hook-form";
import Swal from 'sweetalert2';

import {Badge} from "@/components/ui/badge";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

import {Input} from "@/components/ui/input";

import {Textarea} from "@/components/ui/textarea";

import {useEffect, useRef, useState} from "react";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Photo} from "@/types/photo";
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import {format} from "date-fns";
import {deleteObject, getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {z} from "zod";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {storage} from "../../../../../firebase";
import {Calendar} from "@/components/ui/calendar";

interface ProductFormProps {
    initialData: any | null;
}

const formSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    background: z.string().optional(),
    createdDate: z.date().optional(),
    createdBy: z.string().optional(),
    isDeleted: z.boolean(),
    photos: z.array(z.object({
        id: z.string().optional(),
        src: z.string().optional(),
        title: z.string().optional(),
    })).optional(),
});

export const ProductForm: React.FC<ProductFormProps> = ({
                                                          initialData
                                                      }) => {
    const [loading, setLoading] = useState(false);
    const [imgLoading, setImgLoading] = useState(false);
    const title = initialData ? 'Edit product' : 'Create product';
    const description = initialData ? 'Edit a product.' : 'Add a new product';
    const toastMessage = initialData ? 'Product updated.' : 'Product created.';
    const action = initialData ? 'Save changes' : 'Create';
    const [firebaseLink, setFirebaseLink] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [date, setDate] = useState<Date>();
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImgLoading(true);
            const storageRef = ref(storage, `Product/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100

                    //setProgressUpload(progress) // to show progress upload

                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused')
                            break
                        case 'running':
                            console.log('Upload is running')
                            break
                    }
                },
                (error) => {
                    // Xử lý lỗi
                    console.error(error);
                    setImgLoading(false);
                },
                () => {
                    // Upload hoàn tất, lấy URL ảnh
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImagePreview(downloadURL);
                        setFirebaseLink(downloadURL);
                        setImgLoading(false);
                        form.setValue("background", downloadURL);
                    });
                }
            );
        }
    };

    const handleImageDelete = () => {
        if (firebaseLink) {
            const imageRef = ref(storage, firebaseLink);

            deleteObject(imageRef)
                .then(() => {
                    // Remove the image from the state
                    setImagePreview(null);
                    setFirebaseLink(null);
                    form.setValue("background", "");
                    alert("Image successfully deleted!");
                })
                .catch((error) => {
                    console.error("Error deleting image:", error);
                    alert("Failed to delete image.");
                });
        }
    };


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true); // Bắt đầu trạng thái loading

            if (initialData) {
                // API cập nhật product
                const response = await axios.put(`https://localhost:7192/products`, values);
                Swal.fire({
                    title: 'Success!',
                    text: 'Product updated successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } else {
                // API tạo product
                const response = await axios.post('https://localhost:7192/products', values);
                Swal.fire({
                    title: 'Success!',
                    text: 'Product created successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error: any) {
            console.error(error);
            Swal.fire({
                title: 'Error!',
                text: error.response?.data?.message || 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } finally {
            setLoading(false); // Kết thúc trạng thái loading
        }
    };


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            background: "",
            createdBy: "N/A",
            createdDate: new Date(),
            photos: [],
            isDeleted: false
        },
    })

    useEffect(() => {
        if (initialData) {
            // Reset the form with initial data
            form.reset({
                id: initialData.id || "",
                title: initialData.title || "",
                description: initialData.description || +"",
                background: initialData.background || "",
                createdDate: initialData.createdDate ? new Date(initialData.createdDate) : new Date(),
                createdBy: initialData.createdBy || "",
                isDeleted: !!initialData.isDeleted,
                photos: initialData.photos || []
            });

            // Update local state for date
            setDate(initialData.createdDate ? new Date(initialData.createdDate) : new Date());

            // Update local state for image preview and link
            setImagePreview(initialData.background || "");
            setFirebaseLink(initialData.background || "");
        } else {
            setDate(new Date());
        }
    }, [initialData, form]);

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    <div className="grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard/product">
                                <Button variant="outline" size="icon" className="h-7 w-7">
                                    <ChevronLeft className="h-4 w-4"/>
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
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <p>{field.value ? 'Disactived' : 'Actived'}</p>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </Badge>
                            <div className="hidden items-center gap-2 md:ml-auto md:flex">
                                <Button variant="outline" size="sm">
                                    Discard
                                </Button>
                                <Button type="submit" size="sm" disabled={loading}>
                                    {loading ? 'Processing...' : action}
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
                                                    name="title"
                                                    render={({field}) => (
                                                        <FormItem>
                                                            <FormLabel>Title</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="shadcn" {...field} />
                                                            </FormControl>
                                                            <FormDescription>
                                                                This is your public display name.
                                                            </FormDescription>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="grid gap-3">
                                                <FormField
                                                    control={form.control}
                                                    name="description"
                                                    render={({field}) => (
                                                        <FormItem>
                                                            <FormLabel>Description</FormLabel>
                                                            <FormControl>
                                                                <Textarea placeholder="Product description" {...field} />
                                                            </FormControl>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card
                                    className="overflow-hidden" x-chunk="dashboard-07-chunk-2"
                                >
                                    <CardHeader>
                                        <CardTitle>Product Background</CardTitle>
                                        <CardDescription>
                                            Lipsum dolor sit amet, consectetur adipiscing elit
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <FormField control={form.control} name="background" render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Product Background</FormLabel>
                                                <FormControl>
                                                    <div className="grid gap-2">
                                                        {imagePreview ? (
                                                            <>
                                                                <Image
                                                                    alt="Product Background"
                                                                    className="aspect-square w-full rounded-md object-cover"
                                                                    height={300}
                                                                    src={imagePreview}
                                                                    width={300}
                                                                />
                                                                <p className="text-blue-500 underline" {...field}>
                                                                    <a href={firebaseLink!} target="_blank"
                                                                       rel="noopener noreferrer">
                                                                        {firebaseLink}
                                                                    </a>
                                                                </p>
                                                                <Button onClick={handleImageDelete}
                                                                        variant="destructive">
                                                                    Delete Image
                                                                </Button>
                                                            </>
                                                        ) : (
                                                            <div className="grid grid-cols-3 gap-2">
                                                                <button
                                                                    type="button"
                                                                    className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
                                                                    onClick={() => fileInputRef.current?.click()}
                                                                >
                                                                    <Upload className="h-4 w-4 text-muted-foreground"/>
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
                                                        <FormMessage/>
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        )}/>
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
                                                <FormField
                                                    control={form.control}
                                                    name="createdBy"
                                                    render={({field}) => (
                                                        <FormItem>
                                                            <FormLabel>Email</FormLabel>
                                                            <FormControl>
                                                                <Input disabled placeholder="N/A" {...field} />
                                                            </FormControl>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="grid gap-3">
                                                <FormField
                                                    control={form.control}
                                                    name="createdDate"
                                                    render={({field}) => {
                                                        const handleDateSelect = (selectedDate: any) => {
                                                            setDate(selectedDate);
                                                            field.onChange(selectedDate ? new Date(selectedDate) : new Date()); // Update form value
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
                                                                                className={`w-[280px] justify-start text-left font-normal ${!date ? "text-muted-foreground" : ""}`}
                                                                            >
                                                                                <CalendarIcon className="mr-2 h-4 w-4"/>
                                                                                {date ? format(date, "PPP") :
                                                                                    <span>Pick a date</span>}
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
                                                                <FormMessage/>
                                                            </FormItem>
                                                        )
                                                    }}
                                                />
                                            </div>

                                        </div>
                                    </CardContent>
                                </Card>
                                <Card x-chunk="dashboard-07-chunk-5">
                                    <CardHeader>
                                        <CardTitle>Archive Product</CardTitle>
                                        <CardDescription>
                                            Lipsum dolor sit amet, consectetur adipiscing elit.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div></div>
                                        <Button size="sm" variant="secondary">
                                            Archive Product
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-2 md:hidden">
                            <Button variant="outline" size="sm">
                                Discard
                            </Button>
                            <Button size="sm">Save Product</Button>
                        </div>
                    </div>
                </form>
            </Form>
        </>
    );
};
