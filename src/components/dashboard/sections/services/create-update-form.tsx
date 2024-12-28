"use client";
import {ChevronLeft} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {useForm} from "react-hook-form";


import {ButtonLoading} from "@/components/common/button-loading";
import {FileUpload} from "@/components/custom/file-upload";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {usePreviousPath} from "@/hooks/use-previous-path";
import ConfirmationDialog, {
    FormInput,
    FormInputDate,
    FormInputEditor,
    FormInputNumber,
} from "@/lib/form-custom-shadcn";
import {serviceService} from "@/services/service-service";
import {ServiceCreateCommand, ServiceUpdateCommand} from "@/types/commands/service-command";
import {BusinessResult} from "@/types/response/business-result";
import {Service} from "@/types/service";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {useEffect, useRef, useState} from "react";
import {BsPlus} from "react-icons/bs";
import {toast} from "sonner";
import {z} from "zod";

interface ServiceFormProps {
    initialData: any | null;
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

export const ServiceForm: React.FC<ServiceFormProps> = ({initialData}) => {
    const [loading, setLoading] = useState(false);
    const [imgLoading, setImgLoading] = useState(false);
    const title = initialData ? "Edit service" : "Create service";
    const content = initialData ? "Edit a service." : "Add a new service";
    const toastMessage = initialData ? "Service updated." : "Service created.";
    const action = initialData ? "Save changes" : "Create";
    const [firebaseLink, setFirebaseLink] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // Lưu tạm file đã chọn
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
    const [pendingValues, setPendingValues] = useState<z.infer<
        typeof formSchema
    > | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const previousPath = usePreviousPath();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const handleFileUpload = (file: File | null) => {
        setFile(file);
    };

    useEffect(() => {
        if (initialData) {
            const parsedInitialData: ServiceUpdateCommand = {
                ...initialData,
                createdDate: initialData.createdDate
                    ? new Date(initialData.createdDate)
                    : new Date(),
            };

            form.reset(parsedInitialData);
            setFirebaseLink(parsedInitialData.src || "");
        }
    }, [initialData, form]);

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

        try {
            const createdValues: ServiceCreateCommand = {
                ...pendingValues,
                file: file,
            };
            const response = await serviceService.create(createdValues);
            return response;
        } catch (error: any) {
            console.error("Error creating service:", error);
            toast.error(error.message || "Failed to create service.");
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
                title="Do you want to continue adding this service?"
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
                                                render={({field}) => (
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
                                                        <FormMessage/>
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

                                                <FormInputNumber
                                                    form={form}
                                                    name="price"
                                                    label="Price"
                                                    placeholder="Enter price"
                                                    className="mt-2 w-full"
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
                                            name="src"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Blog Background</FormLabel>
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
                                                            <div
                                                                className="w-full mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                                                                <FileUpload onChange={handleFileUpload}/>
                                                            </div>
                                                            <FormMessage/>
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
                                                    <ChevronLeft/>
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
                                                    <BsPlus/>
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
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Archive Service</CardTitle>
                                        <CardDescription>
                                            Lipsum dolor sit amet, consectetur adipiscing elit.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div></div>
                                        <Button size="sm" variant="secondary">
                                            Archive Service
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                    <div className="grid auto-rows-max items-start">
                        <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-2">
                            <CardHeader>
                                <CardTitle>Service Edit</CardTitle>
                                <CardDescription>
                                    Lipsum dolor sit amet, consectetur adipiscing elit
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <FormInputEditor form={form} name="description"/>
                            </CardContent>
                        </Card>
                    </div>
                </form>
            </Form>
        </>
    );
};
