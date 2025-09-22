"use client";
import { TypographyH2 } from "@/components/_common/typography/typography-h2";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { userService } from "@/services/user-serice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Meteors } from "../../../ui/meteors";
import "./login.css";
import { authService } from "@/services/auth-service";
import { TypographyH3 } from "@/components/_common/typography/typography-h3";
import { TypographyH4 } from "@/components/_common/typography/typography-h4";
import { TypographyMuted } from "@/components/_common/typography/typography-muted";
import { Status } from "@/types/models/business-result";
import { tokenHelper } from "@/lib/helpers/token-helper";
import { userContextHelper } from "@/lib/helpers/user-context-helper";
import { Role } from "@/types/entities/user";

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
  const searchParams = useSearchParams();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      account: "",
      password: "",
    },
  });

  type FormSchema = z.infer<typeof loginSchema>;

  const onSubmit = (data: FormSchema) => {
    try {
      authService.login(data.account, data.password).then(async (res) => {
        if (res.status == Status.OK && res.data) {
          tokenHelper.save(res.data);

          const resUser = await userService.getUserByContext();
          if (resUser.status == Status.OK && resUser.data) {
            userContextHelper.save(resUser.data);
            toast.success("Chào mừng bạn đã đến với Như My Studio!");
            // await router.prefetch("/");
            if (resUser.data.role != Role.Customer.toString()) {
              router.push("/dashboard");
              return;
            }
            router.push("/");
            return;
          }
        }

        toast.warning(res.message);
        return;
      });
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <Form {...form}>
      <div className="form font-normal w-full max-w-xs rounded-md shadow-xl overflow-hidden z-[100] relative snap-start shrink-0 p-8 bg-opacity-80 bg-gray-900 r flex flex-col items-center justify-center gap-3 transition-all duration-300">
        <p className="text-white translate-x-[46%] -rotate-90 tracking-[20px] transition-all hover:translate-x-[50%] -translate-y-1/2  text-2xl absolute right-0">
          Nhu My
        </p>

        <div className="capitalize text-white w-full">
          <div className="pb-4">
            <TypographyH4 className="text-start text-base border-none">
              Đăng nhập vào tài khoản của bạn
            </TypographyH4>
          </div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3 w-full"
          >
            <FormField
              control={form.control}
              name={"account"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col items-start w-full">
                      {/*<label className="">Email</label>*/}
                      <input
                        type="text"
                        {...field}
                        placeholder="Enter Your Email"
                        className="w-full py-px pl-0 text-sm bg-transparent outline-none focus:ring-0 border-0 border-b-2 focus:outline-none "
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={"password"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col items-start w-full">
                      {/*<label className="font-semibold">Password</label>*/}
                      <input
                        type="password"
                        {...field}
                        placeholder="Enter Your Password"
                        className="w-full py-px pl-0 text-sm bg-transparent outline-none focus:ring-0 border-0 border-b-2  focus:outline-none"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="inline-flex pt-6 gap-3">
              <button
                type="submit"
                className="px-6 focus:outline-none focus:scale-110  text-base py-2 rounded-[5px] hover:scale-110 transition-all hover:transiton text-[#D9D9D9] bg-customPink shadow-customPink shadow-lg"
              >
                Đăng nhập
              </button>
              <button
                type="button"
                onClick={() => router.push("/register")}
                className="px-6 focus:outline-none focus:scale-110  text-base py-2 rounded-[5px] hover:scale-110 transition-all hover:transiton text-customPink bg-[#D9D9D9] shadow-customPink shadow-lg"
              >
                Đăng ký
              </button>
            </div>
          </form>
        </div>

        {/*<Meteors number={20} />*/}
      </div>
    </Form>
  );
};
