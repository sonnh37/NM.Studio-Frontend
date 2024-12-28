"use client";
import {ChevronLeft} from "lucide-react";
import Link from "next/link";
import {useForm} from "react-hook-form";

import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormMessage,} from "@/components/ui/form";
import {subCategoryService} from "@/services/sub-category-service";

import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useRef, useState} from "react";
import {toast} from "sonner";
import {z} from "zod";

import {usePreviousPath} from "@/hooks/use-previous-path";
import {Const} from "@/lib/const";
import ConfirmationDialog, {FormInput, FormInputDate, FormSelectObject,} from "@/lib/form-custom-shadcn";
import {useRouter} from "next/navigation";
import {Category} from "@/types/category";
import {categoryService} from "@/services/category-service";
import {SubCategoryCreateCommand, SubCategoryUpdateCommand} from "@/types/commands/category-command";

interface SubCategoryFormProps {
    initialData: any | null;
}

const formSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Name is required").nullable(),
    categoryId: z.string().nullable(),
    createdDate: z
        .date()
        .optional()
        .default(() => new Date()),
    createdBy: z.string().nullable().optional().default(null),
    isDeleted: z.boolean().default(false),
});

export const SubCategoryForm: React.FC<SubCategoryFormProps> = ({
                                                                    initialData,
                                                                }) => {
    const [loading, setLoading] = useState(false);
    const [imgLoading, setImgLoading] = useState(false);
    const title = initialData ? "Edit subcategory" : "Create subcategory";
    const description = initialData
        ? "Edit a subcategory."
        : "Add a new subcategory";
    const toastMessage = initialData
        ? "SubCategory updated."
        : "SubCategory created.";
    const action = initialData ? "Save changes" : "Create";
    const [firebaseLink, setFirebaseLink] = useState<string | null>(null);
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // Lưu tạm file đã chọn
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
    const [pendingValues, setPendingValues] = useState<z.infer<
        typeof formSchema
    > | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const selectedCategoryId = initialData ? initialData.categoryId : null;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const values_ = values;
            if (initialData) {
                const updatedValues: SubCategoryUpdateCommand = {
                    ...values_,
                };
                const response = await subCategoryService.update(updatedValues);
                if (response.status != 1) throw new Error(response.message);

                toast.success(response.message);
                router.push(Const.DASHBOARD_SUBCATEGORY_URL);
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
                const createdValues: SubCategoryCreateCommand = {
                    ...pendingValues,
                };

                const response = await subCategoryService.create(createdValues);
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

    const fetchCategories = async () => {
        const response = await categoryService.fetchAll();
        return response.data?.results;
    };

    useEffect(() => {
        if (initialData) {
            const parsedInitialData: SubCategoryUpdateCommand = {
                ...initialData,
                createdDate: initialData.createdDate
                    ? new Date(initialData.createdDate)
                    : new Date(),
            };

            form.reset({
                ...parsedInitialData,
            });
        }
    }, [initialData, form]);

    const [loading_, setLoading_] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading_(true); // Bắt đầu trạng thái loading
                const [categories] = await Promise.all([fetchCategories()]);
                setCategories(categories || []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading_(false); // Kết thúc trạng thái loading
            }
        };

        fetchData();
    }, []);

    const previousPath = usePreviousPath();

    if (loading_) {
        return <div>Loading categories...</div>; // Hiển thị giao diện chờ khi tải dữ liệu
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
                title="Do you want to continue adding this subcategory?"
                description="This action cannot be undone. Are you sure you want to permanently delete this file from our servers?"
                confirmText="Yes"
                cancelText="No"
            />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid flex-1 auto-rows-max gap-4">
                        <div className="flex items-center gap-4">
                            <Link href={previousPath}>
                                <Button variant="outline" size="icon" className="h-7 w-7">
                                    <ChevronLeft className="h-4 w-4"/>
                                    <span className="sr-only">Back</span>
                                </Button>
                            </Link>

                            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                                SubCategory Controller
                            </h1>
                            <Badge variant="outline" className="ml-auto sm:ml-0">
                                <FormField
                                    control={form.control}
                                    name="isDeleted"
                                    render={({field}) => (
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
                                            <FormMessage/>
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
                                        <CardTitle>SubCategory Details</CardTitle>
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

                                                <div className="grid grid-cols-2 gap-3">
                                                    <FormSelectObject
                                                        form={form}
                                                        name="categoryId"
                                                        label="Category"
                                                        description="Select the size for this product."
                                                        options={categories}
                                                        selectLabel="name"
                                                        selectValue="id"
                                                        placeholder="Select size"
                                                    />
                                                </div>
                                            </div>
                                        </div>
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
                    </div>
                </form>
            </Form>
        </>
    );
};
