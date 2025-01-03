"use client";
import {ChevronLeft} from "lucide-react";
import Link from "next/link";
import {useForm} from "react-hook-form";

import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {sizeService} from "@/services/size-service";

import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useRef, useState} from "react";
import {toast} from "sonner";
import {z} from "zod";

import {usePreviousPath} from "@/hooks/use-previous-path";
import {Const} from "@/lib/const";
import ConfirmationDialog, {FormInput, FormInputDate} from "@/lib/form-custom-shadcn";
import {useRouter} from "next/navigation";
import {SizeCreateCommand, SizeUpdateCommand} from "@/types/commands/size-command";

interface SizeFormProps {
    initialData: any | null;
}

const formSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Name is required").nullable(),
    createdDate: z
        .date()
        .optional()
        .default(() => new Date()),
    createdBy: z.string().nullable().optional().default(null),
    isDeleted: z.boolean().default(false),
});

export const SizeForm: React.FC<SizeFormProps> = ({initialData}) => {
    const [loading, setLoading] = useState(false);
    const [imgLoading, setImgLoading] = useState(false);
    const title = initialData ? "Edit size" : "Create size";
    const description = initialData ? "Edit a size." : "Add a new size";
    const toastMessage = initialData ? "Size updated." : "Size created.";
    const action = initialData ? "Save changes" : "Create";
    const [firebaseLink, setFirebaseLink] = useState<string | null>(null);
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // Lưu tạm file đã chọn
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
    const previousPath = usePreviousPath();
    const [pendingValues, setPendingValues] = useState<z.infer<
        typeof formSchema
    > | null>(null);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const values_ = values;
            if (initialData) {
                const updatedValues: SizeUpdateCommand = {
                    ...values_,
                };
                const response = await sizeService.update(updatedValues);
                if (response.status != 1) throw new Error(response.message);

                toast.success(response.message);
                router.push(Const.DASHBOARD_SIZE_URL);
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
                const createdValues: SizeCreateCommand = {
                    ...pendingValues,
                };

                const response = await sizeService.create(createdValues);
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
          setFirebaseLink(initialData.src || "");
        }
      }, [initialData]);


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
                title="Do you want to continue adding this size?"
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
                                Size Controller
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
                        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-4">
                            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-4">
                                <Card x-chunk="dashboard-07-chunk-0">
                                    <CardHeader>
                                        <CardTitle>Size Details</CardTitle>
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
