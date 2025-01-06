"use client";
import React, { useEffect } from "react";
import { Meteors } from "../../../ui/meteors";
import { Button } from "../../../ui/button";
import Link from "next/link";
import "./login.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import userSerice from "@/services/user-serice";
import { useRouter, useSearchParams } from "next/navigation";
import { LoginResponse } from "@/types/response/login-response";
import { useDispatch } from "react-redux";
import { setToken } from "@/lib/redux/slices/tokenSlice";
import { TypographyH1 } from "@/components/_common/typography/typography-h1";
import { TypographyH2 } from "@/components/_common/typography/typography-h2";

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
      // link localhost:3000
      userSerice.login(data.account, data.password).then((res) => {
        if (res.status != 1) {
          toast.warning(res.message);
          return;
        }
        // link localhost:3000      (access, refreshToken)

        window.location.reload();
        toast.success("Chào mừng bạn đã đến với Như My Studio!");
      });
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    // <Form {...form}>
    //   <div className="bg-gray-900 z-[100] overflow-hidden bg-opacity-80 p-8 rounded-none shadow-2xl transform  transition-all duration-500 max-w-md w-full">
    //     <TypographyH2 className="text-white text-center pb-8 border-none">
    //       Đăng nhập
    //     </TypographyH2>
    //     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
    //       <FormField
    //         control={form.control}
    //         name={"account"}
    //         render={({ field }) => (
    //           <FormItem>
    //             <FormControl>
    //               <div className="relative">
    //                 <input
    //                   type="text"
    //                   placeholder="Email or username"
    //                   {...field}
    //                   className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none transition-all duration-300"
    //                 />
    //                 <i className="fas fa-envelope absolute right-3 top-3 text-white"></i>
    //               </div>
    //             </FormControl>
    //             <FormMessage />
    //           </FormItem>
    //         )}
    //       />

    //       <FormField
    //         control={form.control}
    //         name={"password"}
    //         render={({ field }) => (
    //           <FormItem>
    //             <FormControl>
    //               <div className="relative">
    //                 <input
    //                   type="password"
    //                   placeholder="Password"
    //                   {...field}
    //                   className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
    //                 />
    //                 <i className="fas fa-lock absolute right-3 top-3 text-pink-500"></i>
    //               </div>
    //             </FormControl>
    //             <FormMessage />
    //           </FormItem>
    //         )}
    //       />

    //       <button className="cursor-pointer w-full text-lg text-zinc-200 flex gap-2 items-center bg-blue-600 justify-center px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all ease-in duration-200">
    //         {/* <svg
    //           className="w-6 fill-zinc-200"
    //           xmlns="http://www.w3.org/2000/svg"
    //           viewBox="0 0 50 50"
    //         >
    //           <path d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"></path>
    //         </svg> */}
    //         Let's Go
    //       </button>

    //       <div className="relative">
    //         <div className="flex justify-between ">
    //           <Button
    //             className="p-0 m-0 text-gray-400 font-extralight"
    //             variant={"link"}
    //           >
    //             <Link href={"/register"}>Bạn chưa có tài khoản?</Link>
    //           </Button>
    //           <Button
    //             className="p-0 m-0 text-gray-400 font-extralight"
    //             variant={"link"}
    //           >
    //             <Link href={"/forget"}>Quên mật khẩu?</Link>
    //           </Button>
    //         </div>
    //       </div>

    //       <div className="relative">
    //         <hr className="border-t-[0.5px] border-gray-400" />
    //       </div>
    //     </form>
    //     <div className="mt-8 text-center">
    //       <p className="text-gray-400">Hoặc đăng nhập với</p>
    //       <div className="flex justify-center space-x-4 mt-4">
    //         <a
    //           href="#"
    //           className="text-blue-500 hover:text-blue-600 transform hover:scale-125 transition-all duration-300"
    //         >
    //           <i className="fab fa-facebook-f text-2xl"></i>
    //         </a>
    //         <a
    //           href="#"
    //           className="text-blue-400 hover:text-blue-500 transform hover:scale-125 transition-all duration-300"
    //         >
    //           <i className="fab fa-twitter text-2xl"></i>
    //         </a>
    //         <a
    //           href="#"
    //           className="text-red-500 hover:text-red-600 transform hover:scale-125 transition-all duration-300"
    //         >
    //           <i className="fab fa-google text-2xl"></i>
    //         </a>
    //       </div>
    //     </div>
    //     <Meteors number={20} />
    //   </div>
    // </Form>
    <Form {...form}>
      <div className="form w-full max-w-xs rounded-md shadow-xl overflow-hidden z-[100] relative snap-start shrink-0 p-8 bg-opacity-80 bg-gray-900 r flex flex-col items-center justify-center gap-3 transition-all duration-300">
        <p className="text-white translate-x-[46%] -rotate-90 tracking-[20px] transition-all hover:translate-x-[50%] -translate-y-1/2 font-semibold text-2xl absolute right-0">
          Welcome
        </p>

        <div className="capitalize text-white w-full">
          <TypographyH2 className="text-start pb-8 border-none">
            Đăng nhập
          </TypographyH2>
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
                      <label className="test-lg font-semibold">Email</label>
                      <input
                        type="text"
                        {...field}
                        placeholder="Enter Your Email"
                        className="w-full py-px pl-0 text-sm bg-transparent outline-none focus:ring-0 border-0 border-b-2  focus:outline-none "
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
                      <label className="test-lg font-semibold">Password</label>
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

            {/* <div className="inline-flex pt-4 gap-2 items-center">
              <input
                type="checkbox"
                name=""
                id=""
                className="w-3 h-3 focus:border-0 focus:outline-none focus:accent-customPink checked:accent-customPink checked:text-customPink px-1 py-1"
                defaultChecked={false}
              />
              <p className="text-xs">
                By Signing Agree with
                <span className="font-semibold">Term &amp; Policy</span>
              </p>
            </div> */}

            <div className="inline-flex pt-6 gap-5">
              <button type="submit" className="px-6 focus:outline-none focus:scale-110 font-semibold text-base py-2 rounded-[5px] hover:scale-110 transition-all hover:transiton text-[#D9D9D9] bg-customPink shadow-customPink shadow-lg">
                Sign Up
              </button>
              <button type="button" onClick={() => router.push("/register")} className="px-6 focus:outline-none focus:scale-110 font-semibold text-base py-2 rounded-[5px] hover:scale-110 transition-all hover:transiton text-customPink bg-[#D9D9D9] shadow-customPink shadow-lg">
                Sign In
              </button>
            </div>
          </form>
        </div>

        <Meteors number={20} />
      </div>
    </Form>
  );
};
