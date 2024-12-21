"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FileUpload } from "@/components/custom/file-upload";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  FormInput,
  FormInputDateTimePicker,
  FormRadioGroup,
} from "@/lib/form-custom-shadcn";
import { getEnumOptions } from "@/lib/utils";
import { Gender, Role, User } from "@/types/user";
import Image from "next/image";
import { useEffect, useState } from "react";
import { UpdateCommand } from "@/types/commands/base-command";
import userSerice from "@/services/user-serice";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const profileFormSchema = z.object({
  id: z.string().optional(),
  firstName: z
    .string()
    .min(1, { message: "First name is required." })
    .max(50, { message: "First name must not exceed 50 characters." })
    .nullable()
    .optional(),

  lastName: z
    .string()
    .min(1, { message: "Last name is required." })
    .max(50, { message: "Last name must not exceed 50 characters." })
    .nullable()
    .optional(),

  imageUrl: z.string().nullable().optional(),

  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .optional(),

  dob: z
    .union([z.string(), z.date()]) // Chấp nhận cả string và Date
    .nullable()
    .optional(),

  address: z
    .string()
    .max(255, { message: "Address must not exceed 255 characters." })
    .nullable()
    .optional(),

  gender: z.nativeEnum(Gender).nullable().optional(),

  phone: z
    .string()
    .regex(/^[0-9]{10,15}$/, { message: "Please enter a valid phone number." })
    .nullable()
    .optional(),

  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." })
    .max(30, { message: "Username must not exceed 30 characters." })
    .optional(),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." })
    .optional(),

  role: z
    .nativeEnum(Role) // Thay thế các giá trị phù hợp với Role ở backend
    .nullable()
    .optional(),
});
type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm({ user }: { user?: User }) {
  const [firebaseLink, setFirebaseLink] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const handleFileUpload = (file: File | null) => {
    setFile(file);
    console.log(file);
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      form.reset(user);
      setFirebaseLink(user.imageUrl || "");
    }
  }, [user, form]);

  // const { fields, append } = useFieldArray({
  //   name: "urls",
  //   control: form.control,
  // });
  const queryClient = useQueryClient();

  async function onSubmit(data: ProfileFormValues) {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });

    const updatedValues: UpdateCommand = {
      ...data,
      file: file,
    };
    console.log("check_updatedValues", updatedValues);
    const response = await userSerice.update(updatedValues);
    if (response.status != 1) throw new Error(response.message);

    // toast.success(
    //   <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //     <code className="text-white">{JSON.stringify(updatedValues, null, 2)}</code>
    //   </pre>
    // );
    toast.success("Thay đổi của bạn đã lưu.")
    queryClient.invalidateQueries({
      queryKey: ["fetchUser"],
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* first last */}
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            <FormInput label="First name" name="firstName" form={form} />
          </div>
          <div className="col-span-1">
            <FormInput label="Last name" name="lastName" form={form} />
          </div>
        </div>
        {/* email */}
        <FormInput label="Email" name="email" form={form} />
        {/* picture */}
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Picture</FormLabel>
              <FormControl>
                <div className="grid gap-2">
                  {firebaseLink ? (
                    <>
                      <Image
                        alt="Picture"
                        className="aspect-square size-16 rounded-md object-cover"
                        height={9999}
                        src={firebaseLink}
                        width={9999}
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
        {/* Date */}
        <FormInputDateTimePicker label="Date" name="dob" form={form} />
        {/* Phone */}
        <FormInput label="Phone" name="phone" form={form} />
        {/* Sex */}
        <FormRadioGroup
          label="Sex"
          name="gender"
          form={form}
          enumOptions={getEnumOptions(Gender)}
        />
        {/* Address */}
        <FormInput label="Address" name="address" form={form} />

        {/* <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    URLs
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Add links to your website, blog, or social media profiles.
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: "" })}
          >
            Add URL
          </Button>
        </div> */}
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
}
