"use client";
import React, { useEffect } from "react";
import { Meteors } from "../../ui/meteors";
import { Button } from "../../ui/button";
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
import { setToken } from "@/lib/slices/tokenSlice";

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
      userSerice.login(data.account, data.password).then((res) => {
        if (res.status != 1) {
          toast.warning(res.message);
          return;
        }        

        router.push("/dashboard");
        toast.success("Chào mừng bạn đã đến với Như My Studio!");
      });
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <Form {...form}>
      <div className="bg-gray-900 z-[100] overflow-hidden bg-opacity-80 p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 max-w-md w-full">
        <h1 className="text-4xl text-neutral-200 font-extrabold text-center mb-8 animate-[neon-pulse_1.5s_infinite_alternate]">
          Đăng nhập
        </h1>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name={"account"}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Email or username"
                      {...field}
                      className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                    />
                    <i className="fas fa-envelope absolute right-3 top-3 text-pink-500"></i>
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
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Password"
                      {...field}
                      className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                    />
                    <i className="fas fa-lock absolute right-3 top-3 text-pink-500"></i>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 inline-block"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
          <div className="relative">
            <div className="flex justify-between ">
              <Button
                className="p-0 m-0 text-gray-400 font-extralight"
                variant={"link"}
              >
                <Link href={"/register"}>Bạn chưa có tài khoản?</Link>
              </Button>
              <Button
                className="p-0 m-0 text-gray-400 font-extralight"
                variant={"link"}
              >
                <Link href={"/forget"}>Quên mật khẩu?</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <hr className="border-t-[0.5px] border-gray-400" />
          </div>
        </form>
        <div className="mt-8 text-center">
          <p className="text-gray-400">Hoặc đăng nhập với</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a
              href="#"
              className="text-blue-500 hover:text-blue-600 transform hover:scale-125 transition-all duration-300"
            >
              <i className="fab fa-facebook-f text-2xl"></i>
            </a>
            <a
              href="#"
              className="text-blue-400 hover:text-blue-500 transform hover:scale-125 transition-all duration-300"
            >
              <i className="fab fa-twitter text-2xl"></i>
            </a>
            <a
              href="#"
              className="text-red-500 hover:text-red-600 transform hover:scale-125 transition-all duration-300"
            >
              <i className="fab fa-google text-2xl"></i>
            </a>
          </div>
        </div>
        <Meteors number={20} />
      </div>
    </Form>
  );
};
