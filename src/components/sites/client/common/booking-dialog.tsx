"use client";
import { ButtonLoading } from "@/components/_common/button-loading";
import ErrorSystem from "@/components/_common/errors/error-system";
import { LoadingPageComponent } from "@/components/_common/loading-page";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import {
  FormInput,
  FormInputDateTimePickerV2,
  FormInputDateTimePickerV3,
  FormSelectObject,
} from "@/lib/form-custom-shadcn";
import { toLocalISOString } from "@/lib/utils";
import { serviceBookingService } from "@/services/service-booking-service";
import { serviceService } from "@/services/service-service";
import { ServiceBookingCreateCommand } from "@/types/cqrs/commands/service-booking-command";
import { ServiceGetAllQuery } from "@/types/cqrs/queries/service-query";
import { Status } from "@/types/models/business-result";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoCameraOutline } from "react-icons/io5";
import { toast } from "sonner";
import { z } from "zod";

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
  const router = useRouter();

  const query: ServiceGetAllQuery = {
    pagination: {
      isPagingEnabled: false,
    },
    isDeleted: false,
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const {
    data: services = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchServices", query],
    queryFn: async () => {
      const res = await serviceService.getAll(query);
      return res.data?.results;
    },
    refetchOnWindowFocus: false,
  });

  if (isError) {
    console.log("Error fetching:", error);
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const date = toLocalISOString(values.bookingDate);
      const updatedValues: ServiceBookingCreateCommand = {
        ...values,
        appointmentDate: date,
      };
      const response = await serviceBookingService.create(updatedValues);
      if (response.status != Status.OK) {
        toast.error(response.error?.detail);
        return;
      }

      toast.success(
        "Booking thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất."
      );
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
        <span>
          <IoCameraOutline className="text-[#FFF] cursor-pointer text-[35px]" />
        </span>
      </DialogTrigger>

      <DialogContent className="shadow-lg sm:max-w-[425px] md:max-w-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center">
                Vui lòng điền thông tin của bạn để
                <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                  Như My
                </span>{" "}
                có thể liên hệ qua email và số điện thoại! ✈️
              </DialogTitle>
            </DialogHeader>

            <div className="mx-auto w-full">
              <div className="grid gap-1">
                <div className="flex justify-start gap-3">
                  <FormInputDateTimePickerV3
                    label={"Ngày hẹn"}
                    name={"bookingDate"}
                    form={form}
                  />
                </div>
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
