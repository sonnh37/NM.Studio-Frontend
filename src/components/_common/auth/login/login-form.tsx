"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Status } from "@/types/models/business-result";
import { Role } from "@/types/entities/user";
import { authService } from "@/services/auth-service";
import { userService } from "@/services/user-serice";
import { tokenHelper } from "@/lib/utils/token-helper";
import { userContextHelper } from "@/lib/utils/user-context-helper";
import { Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

const emailSchema = z.string().email("Email không hợp lệ");
const usernameSchema = z
  .string()
  .min(1, "Tên người dùng không được để trống")
  .regex(/^[a-zA-Z0-9_.-]+$/, "Tên người dùng không hợp lệ");

const loginSchema = z.object({
  account: z.union([emailSchema, usernameSchema]),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      account: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      setIsLoading(true);
      const res = await authService.login(data.account, data.password);

      if (res.status === Status.OK && res.data) {
        tokenHelper.save(res.data);

        const resUser = await userService.getUserByContext();
        if (resUser.status === Status.OK && resUser.data) {
          userContextHelper.save(resUser.data);
          toast.success("Chào mừng bạn đến với Như My Studio!");

          if (resUser.data.role !== Role.Customer) {
            router.push("/dashboard");
            return;
          }
          router.push("/");
          return;
        }
      }

      toast.error(res.error?.detail || "Đăng nhập thất bại");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent p-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl min-w-xs"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <div className="h-px w-8 bg-neutral-300"></div>
            <div className="h-px w-12 bg-neutral-400 mx-2"></div>
            <div className="h-px w-8 bg-neutral-300"></div>
          </div>

          <h1 className="text-2xl font-light text-neutral-900 mb-2 tracking-tight">
            Đăng Nhập
          </h1>
          <p className="text-xs text-neutral-500 tracking-wide">
            Nhập thông tin đăng nhập của bạn
          </p>
        </div>

        <Form {...form}>
          <div className="space-y-6">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Email/Username Field */}
              <div className="space-y-1">
                <input
                  type="text"
                  {...form.register("account")}
                  placeholder="Email hoặc tên đăng nhập"
                  className="w-full px-0 py-2 text-sm border-0 border-b border-neutral-300 focus:outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400 bg-transparent"
                  disabled={isLoading}
                />
                {form.formState.errors.account && (
                  <p className="text-xs text-red-500 mt-1">
                    {form.formState.errors.account.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-1">
                <input
                  type="password"
                  {...form.register("password")}
                  placeholder="Mật khẩu"
                  className="w-full px-0 py-2 text-sm border-0 border-b border-neutral-300 focus:outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400 bg-transparent"
                  disabled={isLoading}
                />
                {form.formState.errors.password && (
                  <p className="text-xs text-red-500 mt-1">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => router.push("/forgot-password")}
                  className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors tracking-wide"
                  disabled
                >
                  Quên mật khẩu?
                </button>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                variant={"default"}
                className="w-full py-3 text-xs tracking-wider mb-1  transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-light mt-4 rounded-none border-0"
              >
                {isLoading ? (
                  <>
                    <Spinner />
                    ĐANG XỬ LÝ...
                  </>
                ) : (
                  "ĐĂNG NHẬP"
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-neutral-500">hoặc</span>
              </div>
            </div>

            {/* Register Button */}
            <Button
              type="button"
              // onClick={() => router.push("/register")}
              // whileHover={{ scale: 1.01 }}
              // whileTap={{ scale: 0.99 }}
              variant={"outline"}
              // disabled
              className="w-full py-3 text-xs tracking-wider mt-1 border border-neutral-300 text-neutral-900 hover:border-neutral-900 rounded-none transition-colors font-light"
            >
              TẠO TÀI KHOẢN MỚI
            </Button>
          </div>
        </Form>

        {/* Footer */}
        <div className="text-center mt-12 pt-6 border-t border-neutral-100">
          <p className="text-xs text-neutral-400 tracking-wide">
            © 2024 NHUMY STUDIO
          </p>
        </div>
      </motion.div>
    </div>
  );
};
