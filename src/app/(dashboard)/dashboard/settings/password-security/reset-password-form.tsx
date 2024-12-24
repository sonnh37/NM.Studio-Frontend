"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {toast} from "sonner";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {PasswordInput} from "@/components/ui/password-input";
import {User} from "@/types/user";
import userSerice from "@/services/user-serice";
import {UserUpdatePasswordCommand} from "@/types/commands/user-command";
import {useQueryClient} from "@tanstack/react-query";

var bcrypt = require("bcryptjs");

// Schema for password validation
const formSchema = z
    .object({
        password: z
            .string()
            .min(6, {message: "Password must be at least 6 characters long"})
            .regex(/[a-zA-Z0-9]/, {message: "Password must be alphanumeric"}),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

export default function ResetPasswordForm({user}: { user?: User }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const queryClient = useQueryClient();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            // Assuming an async reset password function
            if (user) {
                var hashedPassword = bcrypt.hashSync(values.password);
                const updatedValues: UserUpdatePasswordCommand = {
                    password: hashedPassword,
                };
                console.log("check_updatedValues", values.password);
                const response = await userSerice.updatePassword(updatedValues);
                if (response.status != 1) throw new Error(response.message);
                queryClient.invalidateQueries({
                    queryKey: ["fetchUser"],
                });
                toast.success(response.message);
            }
        } catch (error) {
            console.error("Error resetting password", error);
            toast.error("Failed to reset the password. Please try again.");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-4">
                    {/* New Password Field */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem className="grid gap-2">
                                <FormLabel htmlFor="password">New Password</FormLabel>
                                <FormControl>
                                    <PasswordInput
                                        id="password"
                                        placeholder="******"
                                        autoComplete="new-password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Confirm Password Field */}
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({field}) => (
                            <FormItem className="grid gap-2">
                                <FormLabel htmlFor="confirmPassword">
                                    Confirm Password
                                </FormLabel>
                                <FormControl>
                                    <PasswordInput
                                        id="confirmPassword"
                                        placeholder="******"
                                        autoComplete="new-password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit">Reset Password</Button>
            </form>
        </Form>
    );
}
