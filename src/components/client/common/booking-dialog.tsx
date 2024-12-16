"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalProvider,
  ModalTrigger,
  useModal,
} from "../../ui/animated-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IoCameraOutline } from "react-icons/io5";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  FormInput,
  FormInputDate,
  FormInputDateTimePicker,
  FormInputDateTimePickerV2,
  FormInputTextArea,
  FormSelectObject,
} from "@/lib/form-custom-shadcn";
import { Service } from "@/types/service";
import { useQuery } from "@tanstack/react-query";
import { ServiceGetAllQuery } from "@/types/queries/service-query";
import { serviceService } from "@/services/service-service";
import ErrorPage from "@/app/(client)/error/page";
import { bookingService } from "@/services/booking-service";
import { BookingCreateCommand } from "@/types/commands/booking-command";
import { BookingStatus } from "@/types/booking";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ButtonLoading } from "@/components/common/button-loading";
import { toLocalISOString } from "@/lib/utils";

const formSchema = z.object({
  email: z.string().email().nullable().optional(),
  fullName: z.string().min(1, "Họ và tên không được để trống"),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid phone number"),
  userId: z.string().nullable().optional(),
  serviceId: z.string().min(1, "Service ID is required").nullable().optional(),
  bookingDate: z.date(),
}); 

export function BookingDialog() {
  const [loading, setLoading] = useState(false);

  const query: ServiceGetAllQuery = {
    isPagination: false,
    isNotNullSlug: true,
    isDeleted: [false],
  };

  const { data: services = [], error } = useQuery({
    queryKey: ["fetchServices", query],
    queryFn: async () => {
      const res = await serviceService.fetchAll(query);
      return res.data?.results;
    },
  });

  if (error) {
    return <ErrorPage />;
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      console.log("check_form", values);
      const date = toLocalISOString(values.bookingDate)
      const updatedValues = {
        ...values,
        bookingDate: date
      };
      console.log("check_output", updatedValues);
      const response = await bookingService.create(updatedValues);
      if (response.status != 1) throw new Error(response.message);

      toast.success(response.message);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <IoCameraOutline className="text-[#FFF] cursor-pointer  text-[40px]" />
      </DialogTrigger>

      <DialogContent className="shadow-lg sm:max-w-[425px] md:max-w-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>
                <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center">
                  Vui lòng điền thông tin của bạn để
                  <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                    Như My
                  </span>{" "}
                  có thể liên hệ qua email và số điện thoại! ✈️
                </h4>
              </DialogTitle>
            </DialogHeader>

            <div className="mx-auto w-full">
              <div className="grid gap-1">
                <FormInputDateTimePickerV2
                  form={form}
                  disabled={false}
                  name="bookingDate"
                  label="Ngày hẹn"
                  placeholder="Chọn ngày"
                />

                {/* <FormInputDateTimePickerV2
                  form={form}
                  disabled={false}
                  name="bookingDate"
                  label="Ngày đến Nhu My Studio"
                  placeholder="Chọn ngày"
                /> */}

                <FormInput
                  form={form}
                  name="fullName"
                  label="Họ và tên"
                  placeholder="Nhập họ và tên"
                />

                <FormInput
                  form={form}
                  name="email"
                  label="Email (Nếu có)"
                  placeholder=""
                />

                <FormInput
                  form={form}
                  name="phone"
                  label="Số điện thoại"
                  placeholder="Nhập số điện thoại"
                />

                <FormSelectObject
                  form={form}
                  name="serviceId"
                  label="Dịch vụ"
                  options={services}
                  selectLabel="name"
                  selectValue="id"
                  placeholder="Chọn dịch vụ"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Đóng
                </Button>
              </DialogClose>
              {loading ? (
                <ButtonLoading />
              ) : (
                <Button type="submit" disabled={loading}>
                  Booking
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
